// ============================================================
// SETTINGS MENU — player-facing gear → dropdown
// ============================================================
// Sections: Audio (Music / Ambient, both OFF by default) · Graphics
// (Low/Medium/High presets + Custom granular controls + an animated SVG
// performance gauge with a live FPS readout) · Weather (Auto + states).
// Time of day is intentionally NOT exposed — it stays locked to the device
// clock (see dnc_update). Initialized once from main.js, so it appears on
// the direct game page AND the landing→"Enter paradise now" guest path.
// ============================================================
import { renderer, scene, resize, gfxRuntime, callbacks } from './state.js';
import { sunLight } from './sky-water.js';
import {
  loadSettings, saveSettings, applyPreset, detectPreset, WALLPAPER,
} from './settings-store.js';
// Single source of truth for the version stamp (bottom of the panel):
// package.json's "version" — bumped on every /ship-it (see CLAUDE.md).
import { version as APP_VERSION } from '../package.json';

const WEATHER_OPTS = [
  { v: 'local', label: 'Local', icon: '📍' },
  { v: 'auto', label: 'Auto', icon: 'Auto' },
  { v: '0', label: 'Clear', icon: '☀️' },
  { v: '1', label: 'Cloudy', icon: '☁️' },
  { v: '2', label: 'Mist', icon: '🌫️' },
  { v: '3', label: 'Rain', icon: '🌧️' },
];

let S = null;                 // the settings object (shared with the store)
let _builtAA = false;         // antialias the renderer was constructed with
let _builtDetail = 'high';    // water detail the geometry was built with
let _panel = null, _wrap = null, _gauge = null, _fpsTimer = null, _lastPollT = 0, _lastPollFrames = 0;

// ── Audio state ─────────────────────────────────────────────
let _bgMusic = null, _ambAbove = null, _ambBelow = null;
let _ambVolA = 0, _ambVolB = 0, _ambRaf = null;

export function initSettings() {
  S = loadSettings();
  // One-time migration: the clock is hidden-by-default now (standard setting).
  // Clears a legacy saved "on" once; the Interface toggle still works and
  // sticks for anyone who deliberately re-enables it.
  if (S.migClockOff !== 1) { S.migClockOff = 1; S.showTime = false; saveSettings(); }
  // One-time migration: real local weather ('local') is the new default Sky
  // mode. Move anyone still on the old default ('auto', procedural) onto it
  // once; a deliberate pick (a fixed sky, or re-selecting Auto) sticks.
  if (S.migWeatherLocal !== 1) {
    S.migWeatherLocal = 1;
    if (S.weather === 'auto') S.weather = 'local';
    saveSettings();
  }
  // Wallpaper boots are born silent: on the wallpaper page (root, or any
  // page with ?wallpaper=1) saved audio toggles are ignored at startup.
  // The gear still works for the session — but a desktop wallpaper can
  // never wake up with sound (e.g. after stray forwarded clicks toggled
  // audio in a previous run).
  if (window._isWallpaper || WALLPAPER) {
    S.music = false;
    S.ambient = false;
    // Wallpaper hosts (Lively) suspend/resume the page WITHOUT reloading it,
    // so boot-time silence alone is not enough: whenever the wallpaper is
    // hidden or comes back into view, audio is forced off again. On the
    // wallpaper, sound can NEVER auto-resume — it only plays after a fresh,
    // explicit toggle in the gear during the current stretch of visibility.
    document.addEventListener('visibilitychange', () => {
      S.music = false;
      S.ambient = false;
      saveSettings();
      applyAudioState();
      if (_panel) syncControls();
    });
  }
  _builtAA = !!S.gfx.antialias;
  _builtDetail = S.gfx.waterDetail;

  injectStyles();
  setupAudio();
  buildUI();
  applyGraphicsLive();        // apply persisted live settings on load
  applyInterface();           // clock visibility + settings-wheel auto-hide
  applyAudioState();          // start/stop audio to match saved (default: off)
  // Weather is applied by main.js after the weather system inits (see callbacks.setWeather).
  if (callbacks.setWeather) callbacks.setWeather(S.weather);
}

// ============================================================
// Audio
// ============================================================
function setupAudio() {
  _bgMusic = document.getElementById('bgMusic');
  _ambAbove = document.getElementById('ambAbove');
  _ambBelow = document.getElementById('ambBelow');
  if (_bgMusic) { _bgMusic.volume = 0.6; _bgMusic.loop = true; }
  if (_ambAbove) { _ambAbove.volume = 0; _ambAbove.loop = true; }
  if (_ambBelow) { _ambBelow.volume = 0; _ambBelow.loop = true; }

  // ENFORCEMENT — the last word on playback. Chromium resumes media at the
  // ELEMENT level when a frozen page thaws (and wallpaper hosts / hardware
  // media keys can do the same), bypassing our state entirely: the music
  // came back after window switches in Lively even though S.music was false
  // and the toggle showed off. So: if ANYTHING starts playback while the
  // matching toggle is off, kill it on the spot. A legitimate toggle sets
  // S.music/S.ambient true BEFORE calling play(), so it passes untouched.
  const guardPlayback = (el, isOn) => {
    if (!el) return;
    el.addEventListener('play', () => {
      if (!isOn()) {
        el.pause();
        try { el.currentTime = 0; } catch (e) {}
      }
    });
  };
  guardPlayback(_bgMusic, () => !!(S && S.music));
  guardPlayback(_ambAbove, () => !!(S && S.ambient));
  guardPlayback(_ambBelow, () => !!(S && S.ambient));
}

function ambientCrossfade() {
  if (!S.ambient) return;
  const underwater = window._isPlayerUnderwater ? window._isPlayerUnderwater() : false;
  const aT = underwater ? 0.0 : 0.35;
  const bT = underwater ? 0.35 : 0.0;
  _ambVolA += (aT - _ambVolA) * 0.05;
  _ambVolB += (bT - _ambVolB) * 0.05;
  if (Math.abs(_ambVolA - aT) < 0.002) _ambVolA = aT;
  if (Math.abs(_ambVolB - bT) < 0.002) _ambVolB = bT;
  if (_ambAbove) _ambAbove.volume = _ambVolA;
  if (_ambBelow) _ambBelow.volume = _ambVolB;
  _ambRaf = requestAnimationFrame(ambientCrossfade);
}

function applyAudioState() {
  // Music
  if (_bgMusic) {
    if (S.music) _bgMusic.play().catch(() => {});
    else { _bgMusic.pause(); try { _bgMusic.currentTime = 0; } catch (e) {} }
  }
  // Ambient
  if (_ambAbove && _ambBelow) {
    if (S.ambient) {
      _ambVolA = 0; _ambVolB = 0; _ambAbove.volume = 0; _ambBelow.volume = 0;
      _ambAbove.play().catch(() => {});
      _ambBelow.play().catch(() => {});
      if (!_ambRaf) _ambRaf = requestAnimationFrame(ambientCrossfade);
    } else {
      if (_ambRaf) { cancelAnimationFrame(_ambRaf); _ambRaf = null; }
      _ambAbove.pause(); _ambBelow.pause();
      _ambAbove.volume = 0; _ambBelow.volume = 0;
    }
  }
}

// ============================================================
// Graphics — apply
// ============================================================
function applyGraphicsLive() {
  const g = S.gfx;
  // Frame-rate cap (read by main.js animate loop)
  gfxRuntime.frameInterval = g.frameRate >= 60 ? 0 : 1 / g.frameRate;
  // Resolution / pixel ratio
  renderer.setPixelRatio(g.resolution === 'half' ? 1 : Math.min(window.devicePixelRatio || 1, 2));
  resize();
  // Shadows (live toggle needs a material recompile)
  applyShadows(g.shadows);
  // Pause-when-hidden + water-normal throttle (read by main.js)
  gfxRuntime.pauseHidden = !!g.pauseHidden;
  gfxRuntime.throttleNormals = (g.waterNormals === 'throttled');
}

function applyShadows(on) {
  renderer.shadowMap.enabled = !!on;
  if (sunLight) sunLight.castShadow = !!on;
  renderer.shadowMap.needsUpdate = true;
  // Recompile materials so shadow code is added/removed.
  scene.traverse((o) => {
    if (!o.material) return;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    for (const m of mats) m.needsUpdate = true;
  });
}

// Antialias + water-detail are fixed at construction; changing them reloads.
function needsReload() {
  return (!!S.gfx.antialias !== _builtAA) || (S.gfx.waterDetail !== _builtDetail);
}

// ============================================================
// Weather
// ============================================================
function applyWeather() {
  if (callbacks.setWeather) callbacks.setWeather(S.weather);
}

// Interface: top-right clock visibility + settings-wheel auto-hide (hover to reveal).
function applyInterface() {
  const clock = document.getElementById('clock');
  if (clock) clock.style.display = (S.showTime !== false) ? '' : 'none';
  if (_wrap) _wrap.classList.toggle('sip-hide-gear', !!S.hideGear);
  // Player character on/off (hides the avatar; tap-to-walk is gated on it too)
  if (window._setPlayerVisible) window._setPlayerVisible(S.showPlayer !== false);
}

// ============================================================
// UI
// ============================================================
function buildUI() {
  const hud = document.getElementById('hud');
  if (!hud) return;

  const wrap = document.createElement('div');
  wrap.className = 'sip-set';
  wrap.innerHTML = `
    <button class="sip-gear" id="sipGear" aria-label="Settings" title="Settings">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    </button>
    <div class="sip-panel" id="sipPanel" hidden>
      <div class="sip-sec">
        <div class="sip-h">Weather</div>
        <div class="sip-row"><span>Sky</span></div>
        <div class="sip-seg" id="sipWeather">
          ${WEATHER_OPTS.map(o => `<button type="button" data-w="${o.v}" title="${o.label}">${o.icon}</button>`).join('')}
        </div>
      </div>
      <div class="sip-sec">
        <div class="sip-h">Audio</div>
        <label class="sip-row"><span>Music</span><input type="checkbox" class="sip-sw" data-a="music"></label>
        <label class="sip-row"><span>Ambient</span><input type="checkbox" class="sip-sw" data-a="ambient"></label>
      </div>
      <div class="sip-sec">
        <div class="sip-h">Interface</div>
        <label class="sip-row"><span>Show time</span><input type="checkbox" class="sip-sw" data-u="showTime"></label>
        <label class="sip-row"><span>Hide settings wheel</span><input type="checkbox" class="sip-sw" data-u="hideGear"></label>
        <label class="sip-row"><span>Show character</span><input type="checkbox" class="sip-sw" data-u="showPlayer"></label>
      </div>
      <div class="sip-sec">
        <div class="sip-h">Graphics</div>
        <div class="sip-row"><span>Quality</span></div>
        <div class="sip-seg" id="sipPreset">
          <button type="button" data-p="low">Low</button>
          <button type="button" data-p="medium">Medium</button>
          <button type="button" data-p="high">High</button>
          <button type="button" data-p="custom">Custom</button>
        </div>
        <div class="sip-gauge" id="sipGauge" title="Estimated share of this device's total CPU the game is using — the dial fills toward the 5% wallpaper budget.">
          <svg viewBox="0 0 120 78" width="100%" height="78">
            <path d="M10,64 A50,50 0 0 1 110,64" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="9" stroke-linecap="round"></path>
            <path id="sipArc" d="M10,64 A50,50 0 0 1 110,64" fill="none" stroke="#5fd38a" stroke-width="9" stroke-linecap="round" stroke-dasharray="157.1" stroke-dashoffset="157.1" style="transition:stroke-dashoffset .4s ease, stroke .4s ease"></path>
            <text id="sipEst" x="60" y="50" text-anchor="middle" fill="#fff" font-size="20" font-weight="700">0%</text>
            <text x="60" y="72" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10">system load</text>
          </svg>
          <div class="sip-gcap" id="sipFps">(– FPS)</div>
        </div>
        <button class="sip-scan" id="sipScan" data-tip="Benchmarks each quality preset on this device for a few seconds and keeps the best one that stays under 5% of total CPU.">Scan this device</button>
        <div id="sipCustomRows">
          <div class="sip-row"><span>Frame rate</span>
            <button type="button" class="sip-cyc" data-g="frameRate"></button>
          </div>
          <div class="sip-row"><span>Resolution</span>
            <button type="button" class="sip-cyc" data-g="resolution"></button>
          </div>
          <label class="sip-row"><span>Shadows</span><input type="checkbox" class="sip-sw" data-g="shadows"></label>
          <label class="sip-row"><span>Smooth water</span><input type="checkbox" class="sip-sw" data-g="waterNormals"></label>
          <label class="sip-row"><span>Pause when hidden</span><input type="checkbox" class="sip-sw" data-g="pauseHidden"></label>
          <label class="sip-row"><span>Antialiasing <em>reloads</em></span><input type="checkbox" class="sip-sw" data-g="antialias"></label>
          <div class="sip-row"><span>Water detail <em>reloads</em></span>
            <button type="button" class="sip-cyc" data-g="waterDetail"></button>
          </div>
        </div>
      </div>
      <div class="sip-ver">v${APP_VERSION}</div>
    </div>`;
  // Insert the gear before the clock.
  hud.insertBefore(wrap, hud.firstChild);

  _panel = wrap.querySelector('#sipPanel');
  _wrap = wrap;
  _gauge = {
    arc: wrap.querySelector('#sipArc'),
    est: wrap.querySelector('#sipEst'),
    fps: wrap.querySelector('#sipFps'),
    wrap: wrap.querySelector('#sipGauge'),
  };
  _gauge.baseTitle = _gauge.wrap.getAttribute('title') || '';

  // Open / close
  const gear = wrap.querySelector('#sipGear');
  gear.addEventListener('click', (e) => { e.stopPropagation(); togglePanel(); });
  _panel.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('click', () => { if (!_panel.hidden) togglePanel(false); });

  // Audio toggles
  wrap.querySelectorAll('[data-a]').forEach((el) => {
    el.addEventListener('change', () => {
      S[el.dataset.a] = el.checked;
      saveSettings();
      applyAudioState();
    });
  });

  // Interface toggles (Show time / Hide settings wheel)
  wrap.querySelectorAll('[data-u]').forEach((el) => {
    el.addEventListener('change', () => {
      S[el.dataset.u] = el.checked;
      saveSettings();
      applyInterface();
    });
  });

  // Granular graphics controls. The dropdowns are single-click cycle buttons:
  // native <select> popups don't receive forwarded clicks under wallpaper
  // hosts (Lively/Wallpaper Engine), while plain buttons work everywhere.
  function commitGfx(k, v) {
    S.gfx[k] = v;
    S.gfxPreset = 'custom'; // granular controls live in Custom mode
    saveSettings();
    syncControls();
    updateGauge();
    // Only the two construction-locked rows (labelled "reloads") may force a
    // reload — and only when their new value actually differs from how the
    // page was built. Preset drift from deferred scans/choices never does.
    if ((k === 'antialias' || k === 'waterDetail') && needsReload()) { location.reload(); return; }
    applyGraphicsLive();
  }
  wrap.querySelectorAll('input[data-g]').forEach((el) => {
    el.addEventListener('change', () => {
      const k = el.dataset.g;
      commitGfx(k, (k === 'waterNormals') ? (el.checked ? 'smooth' : 'throttled') : el.checked);
    });
  });
  const GFX_CYCLES = {
    frameRate: [24, 30, 60],
    resolution: ['half', 'full'],
    waterDetail: ['low', 'high'],
  };
  wrap.querySelectorAll('button[data-g]').forEach((el) => {
    el.addEventListener('click', () => {
      const k = el.dataset.g;
      const opts = GFX_CYCLES[k];
      const idx = opts.indexOf(S.gfx[k]);
      commitGfx(k, opts[(idx + 1) % opts.length]);
    });
  });

  // Scan button — explicit, user-triggered graphics benchmark
  const scanBtn = wrap.querySelector('#sipScan');
  scanBtn.addEventListener('click', async () => {
    if (scanBtn.disabled) return;
    scanBtn.disabled = true;
    scanBtn.textContent = 'scanning…';
    const res = await autoTune();
    if (!res) {
      scanBtn.textContent = 'Scan this device';
      scanBtn.disabled = false;
      return;
    }
    const label = res.preset.charAt(0).toUpperCase() + res.preset.slice(1);
    scanBtn.textContent = label + ' · ≈' + res.sysPct.toFixed(1) + '% of total CPU';
    // Deliberately NO reload here: the chosen preset is saved + applied live,
    // except antialias / water detail (fixed at construction) — those two
    // silently complete on the next natural page load.
    setTimeout(() => {
      scanBtn.textContent = 'Scan this device';
      scanBtn.disabled = false;
    }, 4000);
  });

  // Quality — radio segments: one click straight to the target preset, and
  // NEVER a forced reload. Antialias / water detail are construction-locked,
  // so (like the scan) they complete silently on the next natural page load;
  // everything else from the preset applies live.
  wrap.querySelectorAll('#sipPreset [data-p]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.p;
      if (name === 'custom') {
        // Unlock the granular controls, pre-populated with the current values —
        // nothing changes until the player tweaks a row.
        S.gfxPreset = 'custom';
        saveSettings();
        syncControls();
        return;
      }
      applyPreset(name);
      syncControls();
      updateGauge();
      applyGraphicsLive();
    });
  });

  // Sky — radio segments with icons (Auto · ☀️ · ☁️ · 🌫️ · 🌧️)
  wrap.querySelectorAll('#sipWeather [data-w]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.w;
      S.weather = (v === 'auto' || v === 'local') ? v : parseInt(v, 10);
      saveSettings();
      applyWeather();
      syncControls();
    });
  });

  syncControls();
  updateGauge();
}

function togglePanel(force) {
  const open = (force === undefined) ? _panel.hidden : force;
  _panel.hidden = !open;
  if (_wrap) _wrap.classList.toggle('sip-panel-open', open);
  if (open) {
    updateGauge();
    _lastPollT = 0;
    pollFps();
    _fpsTimer = setInterval(pollFps, 500);
  } else if (_fpsTimer) {
    clearInterval(_fpsTimer); _fpsTimer = null;
  }
}

// Reflect S into every control + the preset select.
function syncControls() {
  const root = _panel;
  root.querySelector('[data-a="music"]').checked = !!S.music;
  root.querySelector('[data-a="ambient"]').checked = !!S.ambient;
  root.querySelector('[data-u="showTime"]').checked = S.showTime !== false;
  root.querySelector('[data-u="hideGear"]').checked = !!S.hideGear;
  root.querySelector('[data-u="showPlayer"]').checked = S.showPlayer !== false;
  const g = S.gfx;
  root.querySelector('[data-g="frameRate"]').textContent = g.frameRate + ' fps';
  root.querySelector('[data-g="resolution"]').textContent = g.resolution === 'half' ? 'Half' : 'Full';
  root.querySelector('[data-g="shadows"]').checked = !!g.shadows;
  root.querySelector('[data-g="waterNormals"]').checked = (g.waterNormals === 'smooth');
  root.querySelector('[data-g="pauseHidden"]').checked = !!g.pauseHidden;
  root.querySelector('[data-g="antialias"]').checked = !!g.antialias;
  root.querySelector('[data-g="waterDetail"]').textContent = g.waterDetail === 'low' ? 'Low' : 'High';
  const choice = (S.gfxPreset === 'custom') ? 'custom' : detectPreset();
  root.querySelectorAll('#sipPreset [data-p]').forEach((b) => {
    b.classList.toggle('on', b.dataset.p === choice);
  });
  // Granular rows are Custom-only — named presets keep the panel compact.
  const customRows = root.querySelector('#sipCustomRows');
  if (customRows) customRows.style.display = (choice === 'custom') ? '' : 'none';
  root.querySelectorAll('#sipWeather [data-w]').forEach((b) => {
    b.classList.toggle('on', String(b.dataset.w) === String(S.weather));
  });
}

// ============================================================
// Performance gauge
// ============================================================
const ARC_LEN = 157.1; // π · r (r=50) for the semicircle path
function updateGauge() {
  if (!_gauge) return;
  // Live, MEASURED load — window.__sipPerf is written each frame by main.js as
  // (this machine's per-frame work time / frame budget). Displayed as the share
  // of TOTAL system CPU — the same unit the scan button and OS task managers
  // report — and the dial fills toward the 5% wallpaper budget.
  const p = window.__sipPerf || { loadPct: 0, fps: 0 };
  const load = Math.max(0, Math.min(100, p.loadPct || 0)); // % of one core's frame budget
  const sys = sysPctFromLoad(load);                        // % of total system CPU
  const budgetFrac = Math.max(0, Math.min(1, sys / TUNE_TARGET_SYS_PCT));
  _gauge.arc.style.strokeDashoffset = String(ARC_LEN * (1 - budgetFrac));
  _gauge.arc.style.stroke = budgetFrac < 0.6 ? '#5fd38a' : budgetFrac < 0.9 ? '#e6c14a' : '#e5705a';
  _gauge.est.textContent = sys.toFixed(1) + '%';
  const fps = Math.round(p.fps || 0);
  _gauge.fps.textContent = fps > 0 ? '(' + fps + ' FPS)' : '(– FPS)';
  if (_gauge.wrap) {
    _gauge.wrap.title = _gauge.baseTitle + ' Frame budget used: ' + load + '%.';
  }
}
function pollFps() { updateGauge(); }

// ============================================================
// Graphics scan — user-triggered benchmark (Settings → Graphics → Scan)
// ============================================================
// Runs ONLY when the player clicks "Scan this device" — never at boot, so
// loading stays fast (the Low default already guarantees a cheap wallpaper).
// Benchmarks each preset's real cost on THIS machine (window.__sipPerf:
// smoothed main-thread ms vs frame budget), converts it to a share of TOTAL
// system CPU via navigator.hardwareConcurrency (TUNE_OVERHEAD covers the
// browser's GPU/compositor processes, which the main-thread metric can't
// see), and keeps the best preset under the wallpaper budget.
const TUNE_TARGET_SYS_PCT = 5;   // hard ceiling: % of total system CPU for the wallpaper
const TUNE_OVERHEAD = 1.25;      // browser GPU/compositor processes (unmeasurable from JS)
const TUNE_SETTLE_MS = 800;      // let the work EMA converge after a preset switch
const TUNE_SAMPLES = 5;          // readings averaged per measurement
const TUNE_SAMPLE_GAP_MS = 120;
const PRESET_LADDER = ['high', 'medium', 'low']; // best first

let _scanning = false;
const _sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// gauge loadPct (% of one core's frame budget) → % of total system capacity
function sysPctFromLoad(loadPct) {
  return (loadPct * TUNE_OVERHEAD) / (navigator.hardwareConcurrency || 4);
}

async function measureSysPct() {
  await _sleep(TUNE_SETTLE_MS);
  let sum = 0, n = 0;
  for (let i = 0; i < TUNE_SAMPLES; i++) {
    await _sleep(TUNE_SAMPLE_GAP_MS);
    const p = window.__sipPerf;
    if (p && p.loadPct) { sum += p.loadPct; n++; }
  }
  return n ? sysPctFromLoad(sum / n) : 0; // no frames measurable → treat as free
}

function tuneApply(name) {
  applyPreset(name);       // snaps S.gfx to the preset + persists
  applyGraphicsLive();     // live knobs apply now; antialias/water-detail need a reload
  syncControls();
  updateGauge();
}

async function autoTune() {
  if (_scanning || document.hidden) return null; // hidden tab → rAF throttled, bad samples
  _scanning = true;
  try {
    let chosen = PRESET_LADDER[0];
    let sys = 0;
    for (const name of PRESET_LADDER) {
      tuneApply(name);
      chosen = name;
      sys = await measureSysPct();
      if (sys < TUNE_TARGET_SYS_PCT) break; // best preset under budget — keep it
    }
    console.info('[stranded] scan: preset "' + chosen + '" ≈ ' + sys.toFixed(1)
      + '% of total CPU (budget ' + TUNE_TARGET_SYS_PCT + '%)');
    return { preset: chosen, sysPct: sys };
  } finally {
    _scanning = false;
  }
}

// ============================================================
// Styles
// ============================================================
function injectStyles() {
  if (document.getElementById('sipSetStyle')) return;
  const st = document.createElement('style');
  st.id = 'sipSetStyle';
  st.textContent = `
  .sip-set { position: relative; display: flex; align-items: center; }
  .sip-gear {
    display: inline-flex; align-items: center; justify-content: center;
    width: 40px; height: 40px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.6); background: rgba(0,0,0,0.3);
    color: #fff; cursor: pointer; backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px); transition: background .2s, transform .2s;
  }
  .sip-gear:hover { background: rgba(0,0,0,0.5); }
  .sip-gear:active { transform: scale(0.94); }
  .sip-panel {
    position: absolute; top: calc(100% + 10px); right: 0;
    width: 260px; max-height: 80vh; overflow-y: auto;
    background: rgba(12,16,24,0.82); backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.15);
    border-radius: 16px; padding: 14px 16px; z-index: 300;
    box-shadow: 0 12px 40px rgba(0,0,0,0.45);
    font: 400 13px/1.3 system-ui, -apple-system, sans-serif; color: #fff;
  }
  .sip-panel[hidden] { display: none; }
  .sip-sec { padding: 4px 0 10px; }
  .sip-sec + .sip-sec { border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px; }
  .sip-h { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(255,255,255,0.5); margin-bottom: 8px; }
  .sip-row { display: flex; align-items: center; justify-content: space-between;
    gap: 10px; padding: 6px 0; cursor: pointer; }
  .sip-row span { display: inline-flex; align-items: baseline; gap: 6px; }
  .sip-row em { font-style: normal; font-size: 9px; text-transform: uppercase;
    letter-spacing: 0.05em; color: rgba(255,255,255,0.4);
    border: 1px solid rgba(255,255,255,0.25); border-radius: 6px; padding: 1px 4px; }
  .sip-sel { background: rgba(0,0,0,0.35); color: #fff; border: 1px solid rgba(255,255,255,0.25);
    border-radius: 8px; padding: 5px 8px; font: inherit; cursor: pointer; outline: none; }
  .sip-sel option { background: #1a2230; color: #fff; }
  .sip-sw { appearance: none; -webkit-appearance: none; position: relative;
    width: 38px; height: 22px; border-radius: 12px; background: rgba(255,255,255,0.2);
    cursor: pointer; transition: background .2s; flex-shrink: 0; }
  .sip-sw::after { content: ''; position: absolute; top: 2px; left: 2px;
    width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .2s; }
  .sip-sw:checked { background: #5fd38a; }
  .sip-sw:checked::after { transform: translateX(16px); }
  .sip-gauge { text-align: center; margin: 4px 0 10px; }
  .sip-gcap { font-size: 10px; color: rgba(255,255,255,0.45); margin-top: -8px; }
  .sip-scan {
    display: block; width: 100%; margin: 4px 0 10px;
    padding: 7px 10px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.08); color: #fff;
    font: 600 11px/1 system-ui, sans-serif; letter-spacing: 0.03em;
    cursor: pointer; transition: background .2s;
    position: relative;
  }
  .sip-scan:hover:not(:disabled) { background: rgba(255,255,255,0.18); }
  .sip-scan:disabled { opacity: 0.6; cursor: default; }
  /* Cycle buttons — wallpaper-safe replacement for <select> dropdowns:
     click advances to the next option, so there is no popup to lose
     forwarded clicks in (Lively / Wallpaper Engine). */
  .sip-cyc {
    appearance: none;
    -webkit-appearance: none;
    border: 1px solid rgba(255,255,255,0.25);
    background: rgba(0,0,0,0.35);
    color: #fff;
    border-radius: 10px;
    padding: 7px 12px;
    min-width: 92px;
    font: 600 12px/1 system-ui, sans-serif;
    text-align: center;
    cursor: pointer;
    transition: background .2s;
  }
  .sip-cyc::after { content: ' ›'; opacity: 0.55; }
  .sip-cyc:hover { background: rgba(255,255,255,0.12); }
  /* Segmented radio row (Quality) — one click straight to the target,
     no cycling through intermediate presets */
  .sip-seg { display: flex; gap: 4px; margin: 2px 0 10px; }
  .sip-seg button {
    flex: 1; padding: 7px 2px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.25);
    background: rgba(0,0,0,0.35); color: #fff;
    font: 600 10.5px/1 system-ui, sans-serif;
    cursor: pointer; transition: background .2s, color .2s;
  }
  .sip-seg button:hover { background: rgba(255,255,255,0.12); }
  .sip-seg button.on {
    background: rgba(255,255,255,0.88); color: #16202a; border-color: #fff;
  }
  #sipWeather button { font-size: 14px; padding: 5px 2px; }
  /* Custom tooltip (styled, replaces the native title bubble) */
  .sip-scan::after {
    content: attr(data-tip);
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%) translateY(2px);
    width: 210px;
    padding: 8px 10px;
    border-radius: 10px;
    background: rgba(8, 14, 18, 0.96);
    border: 1px solid rgba(255,255,255,0.14);
    box-shadow: 0 6px 18px rgba(0,0,0,0.35);
    color: rgba(255,255,255,0.85);
    font: 400 10.5px/1.45 system-ui, sans-serif;
    letter-spacing: 0.01em;
    text-align: left;
    white-space: normal;
    pointer-events: none;
    opacity: 0;
    transition: opacity .18s ease, transform .18s ease;
    z-index: 5;
  }
  .sip-scan::before {
    content: '';
    position: absolute;
    bottom: calc(100% + 3px);
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: rgba(8, 14, 18, 0.96);
    pointer-events: none;
    opacity: 0;
    transition: opacity .18s ease;
    z-index: 5;
  }
  .sip-scan:hover:not(:disabled)::after,
  .sip-scan:hover:not(:disabled)::before {
    opacity: 1;
    transition-delay: .25s;
  }
  .sip-scan:hover:not(:disabled)::after { transform: translateX(-50%) translateY(0); }
  /* Version stamp at the bottom of the panel */
  .sip-ver {
    text-align: center;
    font: 400 10px/1 system-ui, sans-serif;
    color: rgba(255,255,255,0.28);
    letter-spacing: 0.06em;
    margin: 10px 0 2px;
    user-select: none;
    -webkit-user-select: none;
  }
  .sip-set.sip-hide-gear .sip-gear { opacity: 0; transition: opacity .25s ease; }
  .sip-set.sip-hide-gear:hover .sip-gear,
  .sip-set.sip-hide-gear.sip-panel-open .sip-gear { opacity: 1; }
  `;
  document.head.appendChild(st);
}
