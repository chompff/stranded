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
  loadSettings, saveSettings, applyPreset, detectPreset,
} from './settings-store.js';

const WEATHER_OPTS = [
  { v: 'auto', label: 'Auto' },
  { v: '0', label: 'Clear' },
  { v: '1', label: 'Cloudy' },
  { v: '2', label: 'Mist' },
  { v: '3', label: 'Rain' },
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
  _builtAA = !!S.gfx.antialias;
  _builtDetail = S.gfx.waterDetail;

  injectStyles();
  // Remove the legacy Music/Ambient button cluster wherever it was rendered.
  const legacy = document.getElementById('musicUI');
  if (legacy) legacy.remove();

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
        <div class="sip-h">Audio</div>
        <label class="sip-row"><span>Music</span><input type="checkbox" class="sip-sw" data-a="music"></label>
        <label class="sip-row"><span>Ambient</span><input type="checkbox" class="sip-sw" data-a="ambient"></label>
      </div>
      <div class="sip-sec">
        <div class="sip-h">Interface</div>
        <label class="sip-row"><span>Show time</span><input type="checkbox" class="sip-sw" data-u="showTime"></label>
        <label class="sip-row"><span>Hide settings wheel</span><input type="checkbox" class="sip-sw" data-u="hideGear"></label>
      </div>
      <div class="sip-sec">
        <div class="sip-h">Graphics</div>
        <div class="sip-row"><span>Quality</span>
          <select class="sip-sel" id="sipPreset">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="custom" disabled>Custom</option>
          </select>
        </div>
        <div class="sip-gauge" id="sipGauge">
          <svg viewBox="0 0 120 78" width="100%" height="78">
            <path d="M10,64 A50,50 0 0 1 110,64" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="9" stroke-linecap="round"></path>
            <path id="sipArc" d="M10,64 A50,50 0 0 1 110,64" fill="none" stroke="#5fd38a" stroke-width="9" stroke-linecap="round" stroke-dasharray="157.1" stroke-dashoffset="157.1" style="transition:stroke-dashoffset .4s ease, stroke .4s ease"></path>
            <text id="sipEst" x="60" y="50" text-anchor="middle" fill="#fff" font-size="20" font-weight="700">0%</text>
            <text id="sipFps" x="60" y="72" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10">– fps</text>
          </svg>
          <div class="sip-gcap">system load</div>
        </div>
        <div class="sip-row"><span>Frame rate</span>
          <select class="sip-sel" data-g="frameRate">
            <option value="24">24 fps</option><option value="30">30 fps</option><option value="60">60 fps</option>
          </select>
        </div>
        <div class="sip-row"><span>Resolution</span>
          <select class="sip-sel" data-g="resolution"><option value="half">Half</option><option value="full">Full</option></select>
        </div>
        <label class="sip-row"><span>Shadows</span><input type="checkbox" class="sip-sw" data-g="shadows"></label>
        <label class="sip-row"><span>Smooth water</span><input type="checkbox" class="sip-sw" data-g="waterNormals"></label>
        <label class="sip-row"><span>Pause when hidden</span><input type="checkbox" class="sip-sw" data-g="pauseHidden"></label>
        <label class="sip-row"><span>Antialiasing <em>reloads</em></span><input type="checkbox" class="sip-sw" data-g="antialias"></label>
        <div class="sip-row"><span>Water detail <em>reloads</em></span>
          <select class="sip-sel" data-g="waterDetail"><option value="low">Low</option><option value="high">High</option></select>
        </div>
      </div>
      <div class="sip-sec">
        <div class="sip-h">Weather</div>
        <div class="sip-row"><span>Sky</span>
          <select class="sip-sel" id="sipWeather">${WEATHER_OPTS.map(o => `<option value="${o.v}">${o.label}</option>`).join('')}</select>
        </div>
      </div>
    </div>`;
  // Insert the gear before the clock.
  hud.insertBefore(wrap, hud.firstChild);

  _panel = wrap.querySelector('#sipPanel');
  _wrap = wrap;
  _gauge = {
    arc: wrap.querySelector('#sipArc'),
    est: wrap.querySelector('#sipEst'),
    fps: wrap.querySelector('#sipFps'),
  };

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

  // Granular graphics controls
  wrap.querySelectorAll('[data-g]').forEach((el) => {
    el.addEventListener('change', () => {
      const k = el.dataset.g;
      let v;
      if (el.type === 'checkbox') {
        v = (k === 'waterNormals') ? (el.checked ? 'smooth' : 'throttled') : el.checked;
      } else {
        v = (k === 'frameRate') ? parseInt(el.value, 10) : el.value;
      }
      S.gfx[k] = v;
      S.gfxPreset = detectPreset();
      saveSettings();
      syncControls();
      updateGauge();
      if (needsReload()) { location.reload(); return; }
      applyGraphicsLive();
    });
  });

  // Preset selector
  wrap.querySelector('#sipPreset').addEventListener('change', (e) => {
    const name = e.target.value;
    if (name === 'custom') return;
    applyPreset(name);
    syncControls();
    updateGauge();
    if (needsReload()) { location.reload(); return; }
    applyGraphicsLive();
  });

  // Weather selector
  wrap.querySelector('#sipWeather').addEventListener('change', (e) => {
    S.weather = e.target.value === 'auto' ? 'auto' : parseInt(e.target.value, 10);
    saveSettings();
    applyWeather();
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
  const g = S.gfx;
  root.querySelector('[data-g="frameRate"]').value = String(g.frameRate);
  root.querySelector('[data-g="resolution"]').value = g.resolution;
  root.querySelector('[data-g="shadows"]').checked = !!g.shadows;
  root.querySelector('[data-g="waterNormals"]').checked = (g.waterNormals === 'smooth');
  root.querySelector('[data-g="pauseHidden"]').checked = !!g.pauseHidden;
  root.querySelector('[data-g="antialias"]').checked = !!g.antialias;
  root.querySelector('[data-g="waterDetail"]').value = g.waterDetail;
  const preset = detectPreset();
  const presetSel = root.querySelector('#sipPreset');
  const customOpt = presetSel.querySelector('option[value="custom"]');
  customOpt.disabled = (preset !== 'custom');
  presetSel.value = preset;
  root.querySelector('#sipWeather').value = String(S.weather);
}

// ============================================================
// Performance gauge
// ============================================================
const ARC_LEN = 157.1; // π · r (r=50) for the semicircle path
function updateGauge() {
  if (!_gauge) return;
  // Live, MEASURED load — window.__sipPerf is written each frame by main.js as
  // (this machine's per-frame work time / frame budget). Reflects YOUR hardware,
  // not an abstract estimate: a fast GPU reads low, a struggling one climbs.
  const p = window.__sipPerf || { loadPct: 0, fps: 0 };
  const load = Math.max(0, Math.min(100, p.loadPct || 0));
  _gauge.arc.style.strokeDashoffset = String(ARC_LEN * (1 - load / 100));
  _gauge.arc.style.stroke = load < 40 ? '#5fd38a' : load < 70 ? '#e6c14a' : '#e5705a';
  _gauge.est.textContent = load + '%';
  const fps = Math.round(p.fps || 0);
  _gauge.fps.textContent = fps > 0 ? '≈ ' + fps + ' fps' : '– fps';
}
function pollFps() { updateGauge(); }

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
  .sip-set.sip-hide-gear .sip-gear { opacity: 0; transition: opacity .25s ease; }
  .sip-set.sip-hide-gear:hover .sip-gear,
  .sip-set.sip-hide-gear.sip-panel-open .sip-gear { opacity: 1; }
  `;
  document.head.appendChild(st);
}
