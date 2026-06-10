// ============================================================
// SETTINGS STORE — pure model + persistence (NO imports)
// ============================================================
// Loaded early by state.js and sky-water.js so the renderer and water
// geometry can be built from the saved/preset values (antialias, pixel
// ratio and water-detail are fixed at construction). The UI lives in
// settings.js. Keep this file dependency-free to avoid import cycles.
// ============================================================

const LS_KEY = 'sipSettings';

// Low-power preset is the default when launched as a wallpaper (?wallpaper=1).
export const WALLPAPER = new URLSearchParams(window.location.search).get('wallpaper') === '1';

// Graphics presets → granular values. "custom" = user-tweaked (not listed).
export const GFX_PRESETS = {
  low:    { frameRate: 24, resolution: 'half', shadows: false, pauseHidden: false,  waterNormals: 'throttled', antialias: false, waterDetail: 'low'  },
  medium: { frameRate: 30, resolution: 'full', shadows: false, pauseHidden: false,  waterNormals: 'smooth',    antialias: false, waterDetail: 'high' },
  high:   { frameRate: 60, resolution: 'full', shadows: true,  pauseHidden: false, waterNormals: 'smooth',    antialias: true,  waterDetail: 'high' },
};
export const GFX_KEYS = ['frameRate', 'resolution', 'shadows', 'pauseHidden', 'waterNormals', 'antialias', 'waterDetail'];

function defaults() {
  const preset = 'high'; // full quality by default; the scan or the gear can step it down
  return {
    music: false,        // OFF by default
    ambient: false,      // OFF by default
    showTime: false,     // clock hidden by default (Interface → Show time)
    hideGear: false,     // settings wheel visible by default (hover-reveal when hidden)
    showPlayer: false,   // character hidden by default (Interface → Show character)
    weather: 'auto',     // 'auto' | 0..3
    gfxPreset: preset,
    gfx: { ...GFX_PRESETS[preset] },
  };
}

let _s = null;

export function loadSettings() {
  if (_s) return _s;
  let s = defaults();
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      s = { ...s, ...saved, gfx: { ...s.gfx, ...(saved.gfx || {}) } };
    }
  } catch (e) { /* ignore corrupt storage */ }
  _s = s;
  return s;
}

export function getSettings() { return loadSettings(); }

export function saveSettings() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(loadSettings())); } catch (e) { /* private mode */ }
}

// Snap the gfx block to a named preset.
export function applyPreset(name) {
  const s = loadSettings();
  if (!GFX_PRESETS[name]) return;
  s.gfxPreset = name;
  s.gfx = { ...GFX_PRESETS[name] };
  saveSettings();
}

// Which preset (if any) the current gfx matches exactly, else 'custom'.
export function detectPreset() {
  const g = loadSettings().gfx;
  for (const name of Object.keys(GFX_PRESETS)) {
    const p = GFX_PRESETS[name];
    if (GFX_KEYS.every(k => g[k] === p[k])) return name;
  }
  return 'custom';
}

// ---- Construction-time helpers (read by state.js / sky-water.js) ----
export function initialPixelRatio() {
  return loadSettings().gfx.resolution === 'half' ? 1 : Math.min(window.devicePixelRatio || 1, 2);
}
export function initialAntialias() {
  return !!loadSettings().gfx.antialias;
}
export function waterSegments() {
  // [widthSegments, heightSegments] for the 1200×1200 water/spec planes.
  return loadSettings().gfx.waterDetail === 'low' ? [48, 36] : [80, 60];
}
export function frameInterval() {
  const r = loadSettings().gfx.frameRate;
  return r >= 60 ? 0 : 1 / r; // 60 = uncapped (full display refresh)
}

// ---- Performance estimate (0..100) from a gfx block ----
// Rough analytical model from the perf-budget table: work scales ~linearly
// with frame rate; pixel count is ~4× at full res; shadows/AA/detail/normals
// add fixed slices. Used to drive the predictive gauge as the user toggles.
export function perfEstimate(gfx) {
  const g = gfx || loadSettings().gfx;
  let p = 0;
  p += (g.frameRate / 60) * 40;            // frames/sec scales everything
  p += g.resolution === 'full' ? 25 : 6;   // fragment count (~4× on HiDPI)
  p += g.shadows ? 12 : 0;                  // extra shadow pass
  p += g.antialias ? 6 : 0;                 // MSAA resolve
  p += g.waterDetail === 'high' ? 8 : 3;    // water/spec vertex + normal work
  p += g.waterNormals === 'smooth' ? 5 : 2; // per-frame computeVertexNormals
  return Math.max(0, Math.min(100, Math.round(p)));
}
