// ============================================================
// BORA BORA — Main Entry Point
// Wires modules together, sets up animation loop & event handlers
// ============================================================
import * as THREE from 'three';

import {
  scene, renderer, camera, ISLAND_Z, ISLAND_RADIUS, HOME_BEACH_Z,
  camOrbit, camOff, setCamOff, keysHeld, buildState, buildCamRefs,
  callbacks, clock, CAM_ORBIT_RADIUS, CAM_WL_RATIO,
  floraToolState, resize, buildTools,
  orbitLookY, setOrbitLookY,
  gameplayZoom, setGameplayZoom,
  buildZoom, setBuildZoom,
  ISLAND_SEED
} from './state.js';

import {
  dnc_update, cloudState, sunLight, sunSpecPlane, sunSpecMat,
  waterGeo, wPos, wOrigZ, waterSurface, waterMat,
  waterline as waterlineMesh, wlOrigY, wlPos, waterClipPlane,
  causticMat, causticUniforms, lightRays, godRayMat, particles, particleCount,
  dnc_state, dnc_sunSprite, mistMat, DNC_STARTS, DNC_DURS,
  moonSpecPlane, moonSpecMat,
  sunArcConfig, sunArcConfigs, moonArcConfig, moonArcConfigs, setActiveDeviceClass, detectDeviceClass,
  rainParticles, RAIN_COUNT, rainVelocities, stormTex, cloudTex,
  dnc_waterBaseColors
} from './sky-water.js';

import {
  rebuildFormation, updateDragPreview, tickCrumbleParticles,
  islandExtent, causticUniforms as terrainCausticUniforms,
  getTerrainHeight
} from './terrain.js';

import {
  ecosystemTick, placeFlora, removeFlora, preloadModels
} from './ecosystem.js';

import { updateRockLOD, initRocks } from './rocks.js'; // Procedural rock system (Layer 2)
import { initSlabScatter } from './slab-scatter.js'; // Stone slab placement (Layer 3)
import { initBirds, updateBirds } from './birds.js'; // Circling/landing seagulls (daytime)
import { initFish, updateFish } from './fish.js'; // Schooling reef fish over the reef (daytime)

import { getPanLimit, rotateCam, cycleCam } from './camera.js';

import { buildBuildMenu, toggleBuildMode, updateBuildCameraPosition } from './ui.js';
import { isDev } from './mode.js';
import { initPlayer, updatePlayer, getPlayerWorldPosition, setPlayerVisible, isPlayerUnderwater } from './player.js';

// Expose player visibility toggle for dev UI in game.html
window._setPlayerVisible = setPlayerVisible;
window._isPlayerUnderwater = isPlayerUnderwater;
import {
  weatherInit, weatherUpdate, weatherState, weatherSetCallbacks,
  weatherForceState, WEATHER_NAMES
} from './systems/weather.js';

// ============================================================
// Wire cross-module callbacks (avoids circular dependencies)
// ============================================================
callbacks.removeFlora = removeFlora;
callbacks.placeFlora = placeFlora;
callbacks.rebuildFormation = rebuildFormation;
callbacks.updateDragPreview = updateDragPreview;

// ============================================================
// Initialize UI
// ============================================================
buildBuildMenu();

// ============================================================
// Mode gate — show dev UI or gameplay UI based on ?dev=1
// ============================================================
function initModeUI() {
  const devUI = document.getElementById('devUI');
  if (devUI) devUI.style.display = isDev() ? 'flex' : 'none';
  const gameUI = document.getElementById('gameUI');
  if (gameUI) gameUI.style.display = isDev() ? 'none' : 'block';
}
initModeUI();

// ============================================================
// Lock mobile devices to portrait orientation
// ============================================================
if (detectDeviceClass() === 'mobile') {
  try {
    screen.orientation.lock('portrait').catch(() => {});
  } catch (_) { /* API not supported */ }
}

// Viewport offset: shift view so waterline sits at dead center on mobile
const mobileZOffset = -5;

// Always start at Home Beach — new game, returning player, new seed, any mode
const _fromLanding = !!window._seamlessTransition;
if (_fromLanding) {
  // Coming from landing page — camOrbit.pan values already set by
  // landing.js setupCamera() to match the player-follow position.
  delete window._seamlessTransition;
} else {
  // Consistent Home Beach framing for all entry paths
  camOrbit.panZ = HOME_BEACH_Z + mobileZOffset;
  camOrbit.panTargetZ = HOME_BEACH_Z + mobileZOffset;
  camOrbit.currentAngle = Math.PI / 2;
  camOrbit.targetAngle = Math.PI / 2;
  if (!isDev()) {
    // Pre-set panX to match the gameplayZoom forward component so there's
    // no camera drift on the first frame (the animate loop computes this same value)
    const sinA = Math.sin(camOrbit.currentAngle);
    camOrbit.panX = gameplayZoom * sinA;
    camOrbit.panTargetX = gameplayZoom * sinA;
  } else {
    camOrbit.panX = 0;
    camOrbit.panTargetX = 0;
  }
}

// Caustic scale slider (inside Caustics Calibration panel)
const causticScaleRange = document.getElementById('causticScaleRange');
const causticScaleVal = document.getElementById('causticScaleVal');
if (causticScaleRange) {
  causticScaleRange.addEventListener('input', () => {
    const v = parseFloat(causticScaleRange.value);
    causticScaleVal.textContent = v.toFixed(1);
    causticMat.uniforms.uCausticScale.value = v;
    causticUniforms.uCausticScale.value = v;
    terrainCausticUniforms.uCausticScale.value = v;
  });
}

// ============================================================
// Touch event handlers — zoom/pan on mobile
// ============================================================
let touchY = 0, touchStartX = 0, touchCount = 0;
window.addEventListener('touchstart', e => {
  touchY = e.touches[0].clientY;
  touchStartX = e.touches[0].clientX;
  touchCount = e.touches.length;
}, { passive: true });

window.addEventListener('touchmove', e => {
  if (e.touches.length === 2) {
    if (isDev()) {
      // Two-finger pan (dev only)
      const rawDx = (e.touches[0].clientX - touchStartX) * 0.05;
      const rawDz = (e.touches[0].clientY - touchY) * 0.05;
      const ca = camOrbit.currentAngle;
      const cosA = Math.cos(ca), sinA = Math.sin(ca);
      camOrbit.panTargetX -= (rawDx * cosA + rawDz * sinA);
      camOrbit.panTargetZ -= (-rawDx * sinA + rawDz * cosA);
      const touchMaxPan = getPanLimit();
      camOrbit.panTargetX = Math.max(-touchMaxPan, Math.min(touchMaxPan, camOrbit.panTargetX));
      camOrbit.panTargetZ = Math.max(-touchMaxPan, Math.min(touchMaxPan, camOrbit.panTargetZ));
    } else {
      // Pinch zoom (gameplay) — vertical two-finger drag = forward/backward
      const pinchDy = (touchY - e.touches[0].clientY) * 0.15;
      setGameplayZoom(gameplayZoom + pinchDy);
    }
    touchStartX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  } else if (e.touches.length === 1 && !buildState.active) {
    if (isDev()) {
      // Single-finger zoom (dev — scroll equivalent)
      let newZoom = buildZoom + (touchY - e.touches[0].clientY) * 0.002;
      newZoom = Math.max(-0.7, Math.min(0.8, newZoom));
      setBuildZoom(newZoom);
    }
    touchY = e.touches[0].clientY;
  }
}, { passive: true });

// ============================================================
// Keyboard event handlers
// ============================================================

// Track held keys for smooth WASD movement (skip when typing in inputs)
const _isTyping = () => { const t = document.activeElement?.tagName; return t === 'INPUT' || t === 'TEXTAREA'; };
window.addEventListener('keydown', (e) => { if (!_isTyping()) keysHeld[e.key.toLowerCase()] = true; });
window.addEventListener('keyup', (e) => { keysHeld[e.key.toLowerCase()] = false; });

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  // Everything below is dev-only
  if (!isDev()) return;
  if (k === 'c') {
    if (buildState.active) {
      buildState._prevTopTarget = 0;
      toggleBuildMode();
    } else {
      cycleCam();
    }
  }
  else if (k === 'q') rotateCam(-1);       // Q = rotate camera 90° left
  else if (k === 'e') rotateCam(1);        // E = rotate camera 90° right
  else if (k === 'b') toggleBuildMode();
  else if (k === 'z' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); /* undo removed — terrain no longer editable */ }
  else if (k === '0') { buildTools.height = 0; if (buildState.active) buildBuildMenu(); }
  else if (k === '1') { buildTools.height = 1; if (buildState.active) buildBuildMenu(); }
  else if (k === '2') { buildTools.height = 2; if (buildState.active) buildBuildMenu(); }
  else if (k === '3') { buildTools.height = 3; if (buildState.active) buildBuildMenu(); }
  else if (k === '4') { buildTools.height = 4; if (buildState.active) buildBuildMenu(); }
  else if (k === '5') { buildTools.height = 5; if (buildState.active) buildBuildMenu(); }
  else if (k === '6') { buildTools.height = 6; if (buildState.active) buildBuildMenu(); }
  else if (k === '7') { buildTools.height = 7; if (buildState.active) buildBuildMenu(); }
  else if (k === '8') { buildTools.height = 8; if (buildState.active) buildBuildMenu(); }
  else if (k === '9') { buildTools.height = 9; if (buildState.active) buildBuildMenu(); }
  else if (k === '[') { buildTools.brush = Math.max(1, buildTools.brush - 1); if (buildState.active) buildBuildMenu(); }
  else if (k === ']') { buildTools.brush = Math.min(3, buildTools.brush + 1); if (buildState.active) buildBuildMenu(); }
  else if (k === 'f' && buildState.active) {
    buildTools.tool = buildTools.tool === 'flatten' ? 'raise' : 'flatten';
    buildBuildMenu();
  }
  else if (k === 'r' && buildState.active) {
    if (floraToolState.mode === 'flora') {
      floraToolState.selectedSpecies = 'REMOVE';
    } else {
      buildTools.material = buildTools.material === 'rock' ? 'sand' : 'rock';
    }
    buildBuildMenu();
  }
});

// ============================================================
// Cloud / Weather visual system
// ============================================================
let rainActive = false;

// Target values for each weather state — used by both instant and lerped transitions
const WEATHER_TARGETS = [
  // 0: Clear — no clouds, no mist
  { cover: 0, domeVisible: false, domeMap: 'cloud', domeOpacity: 1.0,
    mistOpacity: 0, fogDensity: 0, fogColor: 0xc0d0d8, godRays: true, rain: false },
  // 1: Cloudy — clouds visible, slightly translucent
  { cover: 0.6, domeVisible: true, domeMap: 'cloud', domeOpacity: 0.75,
    mistOpacity: 0, fogDensity: 0, fogColor: 0xc0d0d8, godRays: true, rain: false },
  // 2: Mist — fog only, no clouds, no god rays
  { cover: 0.8, domeVisible: false, domeMap: 'cloud', domeOpacity: 1.0,
    mistOpacity: 0.15, fogDensity: 0.008, fogColor: 0xc0d0d8, godRays: false, rain: false },
  // 3: Rain — storm clouds + rain + fog
  { cover: 0.75, domeVisible: true, domeMap: 'storm', domeOpacity: 0.92,
    mistOpacity: 0.06, fogDensity: 0.004, fogColor: 0x8090a0, godRays: false, rain: true },
];

// Snapshot of current visual values for lerping
const _weatherVisuals = {
  cover: 0, domeOpacity: 1.0, mistOpacity: 0, fogDensity: 0, godRayAlpha: 1.0,
};

/** Apply a weather state instantly (no lerp). Used for init and dev override. */
function setCloudState(state) {
  const t = WEATHER_TARGETS[state];

  rainParticles.visible = t.rain;
  rainActive = t.rain;
  cloudState.rain = t.rain;
  cloudState.cover = t.cover;
  cloudState.domeRef.visible = t.domeVisible;
  cloudState.matRef.map = t.domeMap === 'storm' ? stormTex : cloudTex;
  cloudState.matRef.opacity = t.domeOpacity;
  cloudState.matRef.needsUpdate = true;
  mistMat.opacity = t.mistOpacity;
  lightRays.visible = t.godRays;

  if (t.fogDensity > 0) {
    scene.fog = new THREE.FogExp2(t.fogColor, t.fogDensity);
  } else {
    scene.fog = null;
  }

  // Sync visual snapshot
  _weatherVisuals.cover = t.cover;
  _weatherVisuals.domeOpacity = t.domeOpacity;
  _weatherVisuals.mistOpacity = t.mistOpacity;
  _weatherVisuals.fogDensity = t.fogDensity;
  _weatherVisuals.godRayAlpha = t.godRays ? 1.0 : 0.0;
}

/** Snapshot current visuals before starting a lerp */
function _snapshotVisuals() {
  _weatherVisuals.cover = cloudState.cover;
  _weatherVisuals.domeOpacity = cloudState.matRef.opacity;
  _weatherVisuals.mistOpacity = mistMat.opacity;
  _weatherVisuals.fogDensity = scene.fog ? scene.fog.density : 0;
  _weatherVisuals.godRayAlpha = lightRays.visible ? 1.0 : 0.0;
}

/** Lerp between two weather states at progress t (0→1) */
function _lerpWeatherVisuals(fromState, toState, progress) {
  const from = WEATHER_TARGETS[fromState];
  const to = WEATHER_TARGETS[toState];
  // Smooth ease-in-out
  const t = progress * progress * (3 - 2 * progress);

  // Cloud cover
  cloudState.cover = from.cover + (to.cover - from.cover) * t;

  // Cloud dome — show it if either state uses it
  cloudState.domeRef.visible = from.domeVisible || to.domeVisible;

  // Dome opacity lerp
  const fromDomeOp = from.domeVisible ? from.domeOpacity : 0;
  const toDomeOp = to.domeVisible ? to.domeOpacity : 0;
  cloudState.matRef.opacity = fromDomeOp + (toDomeOp - fromDomeOp) * t;
  cloudState.matRef.needsUpdate = true;

  // Switch dome texture at halfway point
  if (from.domeMap !== to.domeMap) {
    cloudState.matRef.map = (t < 0.5)
      ? (from.domeMap === 'storm' ? stormTex : cloudTex)
      : (to.domeMap === 'storm' ? stormTex : cloudTex);
    cloudState.matRef.needsUpdate = true;
  }

  // Mist opacity
  mistMat.opacity = from.mistOpacity + (to.mistOpacity - from.mistOpacity) * t;

  // Fog density
  const fromFog = from.fogDensity;
  const toFog = to.fogDensity;
  const fogD = fromFog + (toFog - fromFog) * t;
  if (fogD > 0.0001) {
    if (!scene.fog) {
      scene.fog = new THREE.FogExp2(to.fogColor, fogD);
    } else {
      scene.fog.density = fogD;
    }
  } else {
    scene.fog = null;
  }

  // God rays fade
  const fromGR = from.godRays ? 1.0 : 0.0;
  const toGR = to.godRays ? 1.0 : 0.0;
  const grAlpha = fromGR + (toGR - fromGR) * t;
  lightRays.visible = grAlpha > 0.01;

  // Rain particles — ramp in/out
  if (to.rain && !from.rain) {
    // Fading INTO rain — show particles partway through
    rainParticles.visible = t > 0.4;
    rainActive = t > 0.4;
    cloudState.rain = t > 0.6;
  } else if (from.rain && !to.rain) {
    // Fading OUT of rain — hide particles partway through
    rainParticles.visible = t < 0.6;
    rainActive = t < 0.6;
    cloudState.rain = t < 0.4;
  } else {
    rainParticles.visible = to.rain;
    rainActive = to.rain;
    cloudState.rain = to.rain;
  }
}

// ============================================================
// Weather system integration — wire callbacks
// ============================================================
weatherSetCallbacks({
  onStateChange(fromState, toState) {
    // Transition starting — snapshot current visuals
    _snapshotVisuals();
  },
  onTransitionTick(fromState, toState, progress) {
    // Lerp visuals each frame during crossfade
    _lerpWeatherVisuals(fromState, toState, progress);
  },
  onTransitionEnd(newState) {
    // Snap to final values to avoid floating-point drift
    setCloudState(newState);
  },
});

// Initialize weather system
weatherInit();
// Apply initial state
setCloudState(weatherState.current);

// ============================================================
// Wire up UI buttons (module scripts are deferred — DOM is ready)
// ============================================================
document.getElementById('weatherSelect').addEventListener('change', (e) => {
  const val = e.target.value;
  if (val === 'auto') {
    // Resume Markov chain auto-rotation
    weatherForceState(-1);
  } else {
    const stateId = parseInt(val);
    // Dev weather dropdown forces state and pauses auto-rotation
    weatherForceState(stateId);
    setCloudState(stateId);
  }
});
document.getElementById('moonPhaseSelect').addEventListener('change', (e) => {
  const val = e.target.value;
  if (val === 'auto') {
    dnc_state.forcedMoonPhase = -1;
  } else {
    dnc_state.forcedMoonPhase = parseInt(val);
  }
});
document.getElementById('btnRotLeft').addEventListener('click', () => rotateCam(-1));
document.getElementById('btnRotRight').addEventListener('click', () => rotateCam(1));
document.getElementById('btnTopDown').addEventListener('click', cycleCam);
document.getElementById('btnBuild').addEventListener('click', toggleBuildMode);

// --- Seed regeneration (dev mode) ---
const seedLabel = document.getElementById('seedLabel');
seedLabel.textContent = `Seed: ${ISLAND_SEED}`;

function reloadWithSeed(seed) {
  sessionStorage.setItem('sipSeed', String(seed));
  camOrbit.panX = 0;
  camOrbit.panZ = HOME_BEACH_Z;
  camOrbit.panTargetX = 0;
  camOrbit.panTargetZ = HOME_BEACH_Z;
  camOrbit.currentAngle = Math.PI / 2;
  camOrbit.targetAngle = Math.PI / 2;
  location.reload();
}

document.getElementById('btnNewSeed').addEventListener('click', () => {
  reloadWithSeed(Math.floor(Math.random() * 999999) + 1);
});

// Click seed label → inline edit: type a seed number, Enter to apply, Escape to cancel
seedLabel.addEventListener('click', () => {
  if (seedLabel.querySelector('input')) return; // already editing
  const input = document.createElement('input');
  input.type = 'number';
  input.value = ISLAND_SEED;
  input.min = 1;
  input.max = 999999;
  input.style.cssText = 'width:64px;background:rgba(0,0,0,0.5);color:#fff;border:1px solid rgba(255,255,255,0.4);border-radius:3px;font:500 11px/1 monospace;padding:1px 3px;text-align:center;';
  seedLabel.textContent = 'Seed: ';
  seedLabel.appendChild(input);
  input.focus();
  input.select();

  function commit() {
    const val = parseInt(input.value, 10);
    if (val && val > 0 && val <= 999999 && val !== ISLAND_SEED) {
      reloadWithSeed(val);
    } else {
      // Restore label if unchanged or invalid
      seedLabel.textContent = `Seed: ${ISLAND_SEED}`;
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); commit(); }
    if (e.key === 'Escape') { e.preventDefault(); seedLabel.textContent = `Seed: ${ISLAND_SEED}`; }
    e.stopPropagation(); // prevent game hotkeys while typing
  });
  input.addEventListener('blur', commit);
});

// ============================================================
// Day/Night cycle slider + dropdown control
// ============================================================
const dncSlider = document.getElementById('dncSlider');
const dncSelect = document.getElementById('dncSelect');
const dncTimeLapseBtn = document.getElementById('dncTimeLapse');
let dncSliderDragging = false;

// Helper: reset time-lapse button to default appearance
function _resetTimeLapseBtn() {
  if (!dncTimeLapseBtn) return;
  dnc_state.timeLapse = false;
  dncTimeLapseBtn.style.background = 'rgba(0,0,0,0.3)';
  dncTimeLapseBtn.textContent = '⏩ Time Lapse';
}

dncSlider.addEventListener('input', (e) => {
  dncSliderDragging = true;
  dnc_state.paused = true;
  dnc_state.cycleTime = parseFloat(e.target.value);
  dncSelect.value = 'auto'; // show auto but paused
  _resetTimeLapseBtn();
});
dncSlider.addEventListener('change', (e) => {
  // Keep time paused at the user's chosen position
  dncSliderDragging = false;
});
dncSlider.addEventListener('dblclick', () => {
  dnc_state.paused = false;
  dnc_state.forcedPhase = -1;
  dncSelect.value = 'auto';
  _resetTimeLapseBtn();
});

dncSelect.addEventListener('change', (e) => {
  const val = e.target.value;
  _resetTimeLapseBtn();
  if (val === 'auto') {
    dnc_state.paused = false;
    dnc_state.forcedPhase = -1;
  } else {
    const phaseIdx = parseInt(val);
    dnc_state.paused = true;
    dnc_state.forcedPhase = phaseIdx;
    // Jump to middle of the forced phase for best visual
    dnc_state.cycleTime = DNC_STARTS[phaseIdx] + DNC_DURS[phaseIdx] * 0.4;
    dncSlider.value = dnc_state.cycleTime;
  }
});

// Time Lapse button — cycles 0–600 in 10 seconds, looping
dncTimeLapseBtn.addEventListener('click', () => {
  dnc_state.timeLapse = !dnc_state.timeLapse;
  if (dnc_state.timeLapse) {
    dnc_state.paused = true;       // stop wall-clock sync
    dnc_state.forcedPhase = -1;    // no forced phase
    dncTimeLapseBtn.style.background = 'rgba(255,180,60,0.5)';
    dncTimeLapseBtn.textContent = '⏩ Time Lapse ●';
  } else {
    dnc_state.paused = false;      // resume wall-clock sync
    dncTimeLapseBtn.style.background = 'rgba(0,0,0,0.3)';
    dncTimeLapseBtn.textContent = '⏩ Time Lapse';
    dncSelect.value = 'auto';
  }
});

// ============================================================
// SHORE FOAM — precompute per-vertex shore proximity (one-time)
// ============================================================
const _foamShoreFade = new Float32Array(wPos.count);
const _foamShoreIdx = [];
for (let i = 0; i < wPos.count; i++) {
  const lx = wPos.getX(i), ly = wPos.getY(i);
  const h = getTerrainHeight(lx, ISLAND_Z - ly);
  if (h > 1.5) {
    const fade = Math.min(1, (h - 1.5) / 4.0);
    _foamShoreFade[i] = fade * fade; // quadratic — concentrates foam near shore
    _foamShoreIdx.push(i);
  }
}

// ============================================================
// ANIMATE — Main render loop
// ============================================================
let _lastAnimateTime = -1;
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const dt = _lastAnimateTime < 0 ? 0 : t - _lastAnimateTime;
  _lastAnimateTime = t;

  // INTEGRATION: Day/night cycle update — drives all time-of-day visuals
  dnc_update(t);

  // INTEGRATION: Weather state machine — Markov chain auto-rotation
  weatherUpdate(dt);

  // Shared wave function — takes world-space X, Z and returns Y displacement
  // Water plane is rotated -PI/2 around X and offset to ISLAND_Z,
  // so its local (x, y) maps to world (x, ISLAND_Z - y).
  // This function works in world XZ directly.
  function waveY(wx, wz, time) {
    // Map to water plane local coords: localX = wx, localY = -(wz - ISLAND_Z)
    const lx = wx;
    const ly = -(wz - ISLAND_Z);
    return Math.sin(lx * 0.15 + time * 1.2) * 0.18
      + Math.cos(ly * 0.12 + time * 0.9) * 0.12
      + Math.sin(lx * 0.4 + ly * 0.3 + time * 1.8) * 0.06
      + Math.cos(lx * 0.08 + time * 0.4) * 0.25;
  }

  // Rain ripple factor — computed once per frame, used in all wave loops
  const rainRipple = rainActive ? 1.0 : 0.0;

  // Water waves — kabbelen: gentle overlapping ripples
  for (let i=0;i<wPos.count;i++) {
    const x=wPos.getX(i),y=wPos.getY(i);
    wPos.setZ(i, wOrigZ[i]
      + Math.sin(x * 0.15 + t * 1.2) * 0.18
      + Math.cos(y * 0.12 + t * 0.9) * 0.12
      + Math.sin(x * 0.4 + y * 0.3 + t * 1.8) * 0.06
      + Math.cos(x * 0.08 + t * 0.4) * 0.25
      + (Math.sin(x * 2.5 + t * 8.0) * 0.02
       + Math.sin(y * 3.0 + t * 7.0) * 0.015) * rainRipple
    );
  }
  wPos.needsUpdate=true; waterGeo.computeVertexNormals();

  // Shore foam — brighten near-shore vertices toward white based on wave crest
  {
    const fc = waterGeo.attributes.color.array;
    const tR = dnc_state.waterTintR || 1;
    const tG = dnc_state.waterTintG || 1;
    const tB = dnc_state.waterTintB || 1;
    for (let j = 0; j < _foamShoreIdx.length; j++) {
      const i = _foamShoreIdx[j];
      const waveZ = wPos.getZ(i) - wOrigZ[i];
      const crest = Math.max(0, waveZ * 2.5);
      const foam = Math.min(1, _foamShoreFade[i] * (0.5 + 0.5 * crest));
      fc[i*3]   = Math.min(1, dnc_waterBaseColors[i*3]   * tR + foam * 0.85);
      fc[i*3+1] = Math.min(1, dnc_waterBaseColors[i*3+1] * tG + foam * 0.80);
      fc[i*3+2] = Math.min(1, dnc_waterBaseColors[i*3+2] * tB + foam * 0.70);
    }
    waterGeo.attributes.color.needsUpdate = true;
  }

  // Sun specular plane — sync geometry with water waves + update uniforms
  const spPos = sunSpecPlane.geometry.attributes.position;
  for (let i = 0; i < spPos.count; i++) {
    const x = spPos.getX(i), y = spPos.getY(i);
    spPos.setZ(i,
      Math.sin(x * 0.15 + t * 1.2) * 0.18
      + Math.cos(y * 0.12 + t * 0.9) * 0.12
      + Math.sin(x * 0.4 + y * 0.3 + t * 1.8) * 0.06
      + Math.cos(x * 0.08 + t * 0.4) * 0.25
      + (Math.sin(x * 2.5 + t * 8.0) * 0.02
       + Math.sin(y * 3.0 + t * 7.0) * 0.015) * rainRipple
    );
  }
  spPos.needsUpdate = true;
  sunSpecPlane.geometry.computeVertexNormals();
  sunSpecMat.uniforms.uTime.value = t;
  sunSpecMat.uniforms.uCamPos.value.copy(camera.position);

  // Moon specular plane — sync geometry with water waves (only during night)
  if (moonSpecPlane.visible) {
    const mpPos = moonSpecPlane.geometry.attributes.position;
    for (let i = 0; i < mpPos.count; i++) {
      const x = mpPos.getX(i), y = mpPos.getY(i);
      mpPos.setZ(i,
        Math.sin(x * 0.15 + t * 1.2) * 0.18
        + Math.cos(y * 0.12 + t * 0.9) * 0.12
        + Math.sin(x * 0.4 + y * 0.3 + t * 1.8) * 0.06
        + Math.cos(x * 0.08 + t * 0.4) * 0.25
        + (Math.sin(x * 2.5 + t * 8.0) * 0.02
         + Math.sin(y * 3.0 + t * 7.0) * 0.015) * rainRipple
      );
    }
    mpPos.needsUpdate = true;
    moonSpecPlane.geometry.computeVertexNormals();
    moonSpecMat.uniforms.uTime.value = t;
    moonSpecMat.uniforms.uCamPos.value.copy(camera.position);
  }

  // God rays — GPU-driven via uniforms (1 draw call for 3570 instances)
  const cloudCover = cloudState.cover;
  godRayMat.uniforms.uTime.value = t;
  godRayMat.uniforms.uCloudDim.value = 1.0 - cloudCover * 0.7;
  godRayMat.uniforms.uSunX.value = dnc_sunSprite.position.x;

  // Cloud dome — slow rotation for wind drift
  cloudState.domeRef.rotation.y = t * 0.003;
  // INTEGRATION: sunLight.intensity now driven by dnc_update(), not hardcoded here

  // Caustics — update shader time + sync terrain intensity with seabed
  causticMat.uniforms.uTime.value = t;
  causticUniforms.uCausticTime.value = t;
  terrainCausticUniforms.uCausticTime.value = t;
  if (dnc_state.causticIntensity !== undefined) {
    terrainCausticUniforms.uCausticIntensity.value = dnc_state.causticIntensity;
  }

  // Particles — drift upward, fade out near surface, reset at top
  const pp=particles.geometry.attributes.position.array;
  const pa=particles.geometry.attributes.alpha.array;
  const fadeStart = -3.0, fadeEnd = -0.5;
  for(let i=0;i<particleCount;i++){
    pp[i*3]+=Math.sin(t*0.2+i)*0.003;
    pp[i*3+1]+=0.003+Math.sin(t*0.3+i*0.5)*0.001;
    pp[i*3+2]+=Math.cos(t*0.15+i)*0.002;
    const y = pp[i*3+1];
    if (y > fadeStart) {
      pa[i] = 0.5 * Math.max(0, (fadeEnd - y) / (fadeEnd - fadeStart));
    } else {
      pa[i] = 0.5;
    }
    if(y > fadeEnd){pp[i*3+1]=-11;pp[i*3]=(Math.random()-0.5)*200;pp[i*3+2]=(Math.random()-0.5)*200;pa[i]=0.5;}
  }
  particles.geometry.attributes.position.needsUpdate=true;
  particles.geometry.attributes.alpha.needsUpdate=true;

  // Rain particles — fall downward, respawn above camera
  if (rainActive) {
    const rp = rainParticles.geometry.attributes.position.array;
    for (let i = 0; i < RAIN_COUNT; i++) {
      rp[i * 3 + 1] -= rainVelocities[i];   // fall at per-particle speed
      rp[i * 3] += 0.01;                      // slight wind drift
      if (rp[i * 3 + 1] < 0) {
        rp[i * 3]     = camera.position.x + (Math.random() - 0.5) * 120;
        rp[i * 3 + 1] = 20 + Math.random() * 40;
        rp[i * 3 + 2] = camera.position.z + (Math.random() - 0.5) * 120;
      }
    }
    rainParticles.geometry.attributes.position.needsUpdate = true;
  }

  // Ecosystem tick
  const ecoDt = Math.min(0.05, t - (window._lastEcoT || t));
  ecosystemTick(t, ecoDt);
  tickCrumbleParticles(ecoDt);
  updateBirds(t, ecoDt);
  updateFish(t, ecoDt);
  window._lastEcoT = t;

  // Player update (movement, surface following, rotation)
  let playerOffX = 0, playerOffZ = 0;
  if (!isDev()) {
    updatePlayer(dt);

    // Camera follow: offset from home beach based on player movement from spawn
    const pp = getPlayerWorldPosition();
    playerOffX = pp.x;                         // spawn X = 0, so offset = position
    playerOffZ = pp.z - (-155);                 // spawn Z = -155 (island edge)
  } else if (window._devPlayerOn) {
    // Dev mode with player toggled on — update player but don't move camera
    updatePlayer(dt);
  }

  // Camera orbit + top-down system
  const breathe = Math.sin(t * 0.3) * 0.01;
  const sway = Math.sin(t * 0.15) * 0.08;

  // --- A/D smooth orbit (both modes) + WASD pan (dev only) ---
  if (isDev()) {
    // Dev: full WASD pan
    const panSpeed = 1.2;
    let panDx = 0, panDz = 0;
    if (keysHeld['w'] || keysHeld['arrowup']) panDz -= panSpeed;
    if (keysHeld['s'] || keysHeld['arrowdown']) panDz += panSpeed;
    if (keysHeld['a'] || keysHeld['arrowleft']) panDx -= panSpeed;
    if (keysHeld['d'] || keysHeld['arrowright']) panDx += panSpeed;

    if (panDx !== 0 || panDz !== 0) {
      const ca = camOrbit.currentAngle;
      const cosA = Math.cos(ca), sinA = Math.sin(ca);
      camOrbit.panTargetX += (panDx * cosA + panDz * sinA);
      camOrbit.panTargetZ += (-panDx * sinA + panDz * cosA);
      const maxPan = getPanLimit();
      camOrbit.panTargetX = Math.max(-maxPan, Math.min(maxPan, camOrbit.panTargetX));
      camOrbit.panTargetZ = Math.max(-maxPan, Math.min(maxPan, camOrbit.panTargetZ));
    }
  } else {
    // Gameplay: A/D = sideways strafe, W/S + scroll + pinch = forward/backward zoom
    const ca = camOrbit.currentAngle;
    const cosA = Math.cos(ca), sinA = Math.sin(ca);

    // A/D strafe (perpendicular to look direction) — accumulates
    const strafeSpeed = 0.8;
    const strafing = (keysHeld['a'] || keysHeld['arrowleft'] || keysHeld['d'] || keysHeld['arrowright']);
    if (keysHeld['a'] || keysHeld['arrowleft']) camOrbit._gpStrafe = (camOrbit._gpStrafe || 0) - strafeSpeed;
    if (keysHeld['d'] || keysHeld['arrowright']) camOrbit._gpStrafe = (camOrbit._gpStrafe || 0) + strafeSpeed;

    // Smooth re-center after tap-to-walk (cancel if player strafes manually)
    if (strafing) camOrbit._recentering = false;
    if (camOrbit._recentering) {
      camOrbit._gpStrafe = (camOrbit._gpStrafe || 0) * 0.93;
      if (Math.abs(camOrbit._gpStrafe) < 0.1) {
        camOrbit._gpStrafe = 0;
        camOrbit._recentering = false;
      }
    }

    // W/S forward zoom (along look direction toward island) — clamped absolute
    // W = zoom in (more negative), S = zoom out (less negative)
    const zoomSpeed = 0.5;
    const zooming = (keysHeld['w'] || keysHeld['arrowup'] || keysHeld['s'] || keysHeld['arrowdown']);
    if (keysHeld['w'] || keysHeld['arrowup']) setGameplayZoom(gameplayZoom - zoomSpeed);
    if (keysHeld['s'] || keysHeld['arrowdown']) setGameplayZoom(gameplayZoom + zoomSpeed);

    // Compose pan from strafe (sideways) + gameplayZoom (forward) + Home Beach + player offset
    // Sideways: (cosA, -sinA), Forward (toward island at this angle): (sinA, cosA)
    const strafe = camOrbit._gpStrafe || 0;
    const fwdX = gameplayZoom * sinA, fwdZ = gameplayZoom * cosA;
    camOrbit.panTargetX = playerOffX + strafe * cosA + fwdX;
    camOrbit.panTargetZ = HOME_BEACH_Z + mobileZOffset + playerOffZ + strafe * (-sinA) + fwdZ;

    // Clamp pan — asymmetric: more room to the left (+Z) than right (-Z)
    const maxPan = getPanLimit();
    const maxPanLeft = 220;   // +Z = screen-left (island extends this way)
    const maxPanRight = 220;  // -Z = screen-right (right tip of island + ocean)
    const wasAtEdge = Math.abs(camOrbit.panTargetX) >= maxPan
      || camOrbit.panTargetZ >= maxPanLeft || camOrbit.panTargetZ <= -maxPanRight;
    camOrbit.panTargetX = Math.max(-maxPan, Math.min(maxPan, camOrbit.panTargetX));
    camOrbit.panTargetZ = Math.max(-maxPanRight, Math.min(maxPanLeft, camOrbit.panTargetZ));

    // Back-solve: strafe = dot(panTarget - base - fwd, sideways) where sideways = (cosA, -sinA)
    camOrbit._gpStrafe = (camOrbit.panTargetX - playerOffX - fwdX) * cosA + (camOrbit.panTargetZ - HOME_BEACH_Z - mobileZOffset - playerOffZ - fwdZ) * (-sinA);

    // Rubber-band: when keys released at edge, nudge back by 1 unit
    let bounced = false;
    if (!strafing && wasAtEdge) {
      camOrbit._gpStrafe += (camOrbit._gpStrafe > 0 ? -1 : 1);
      bounced = true;
    }
    if (!zooming) {
      if (gameplayZoom < -28.5) { setGameplayZoom(-28.5 + 1); bounced = true; }
      else if (gameplayZoom > -7.5) { setGameplayZoom(-7.5 - 1); bounced = true; }
    }
    // Recompose pan targets after bounce so lerp picks up the new position
    if (bounced) {
      const fwdX2 = gameplayZoom * sinA, fwdZ2 = gameplayZoom * cosA;
      camOrbit.panTargetX = playerOffX + camOrbit._gpStrafe * cosA + fwdX2;
      camOrbit.panTargetZ = HOME_BEACH_Z + mobileZOffset + playerOffZ + camOrbit._gpStrafe * (-sinA) + fwdZ2;
    }
  }

  // Smooth pan lerp
  camOrbit.panX += (camOrbit.panTargetX - camOrbit.panX) * 0.08;
  camOrbit.panZ += (camOrbit.panTargetZ - camOrbit.panZ) * 0.08;

  // Clamp pan when transitioning to tighter stage (fast pull-back)
  const currentMaxPan = getPanLimit();
  if (Math.abs(camOrbit.panTargetX) > currentMaxPan) {
    camOrbit.panTargetX += (Math.sign(camOrbit.panTargetX) * currentMaxPan - camOrbit.panTargetX) * 0.15;
  }
  // Z clamp: asymmetric in gameplay (more room to the left = +Z)
  const currentMaxPanLeft = isDev() ? currentMaxPan : 110;
  const currentMaxPanRight = isDev() ? currentMaxPan : 110;
  if (camOrbit.panTargetZ > currentMaxPanLeft) {
    camOrbit.panTargetZ += (currentMaxPanLeft - camOrbit.panTargetZ) * 0.15;
  } else if (camOrbit.panTargetZ < -currentMaxPanRight) {
    camOrbit.panTargetZ += (-currentMaxPanRight - camOrbit.panTargetZ) * 0.15;
  }

  // Smoothly animate orbit angle toward target (critically-damped lerp)
  const angleDelta = camOrbit.targetAngle - camOrbit.currentAngle;
  if (Math.abs(angleDelta) > 0.001) {
    camOrbit.currentAngle += angleDelta * 0.04; // smooth lerp
  } else {
    camOrbit.currentAngle = camOrbit.targetAngle;
  }
  const angle = camOrbit.currentAngle;

  // Smoothly animate camera blend (0 = orbit, 1 = builder, 2 = overhead)
  const topDelta = camOrbit.topTarget - camOrbit.topBlend;
  if (Math.abs(topDelta) > 0.001) {
    camOrbit.topBlend += topDelta * 0.06;
  } else {
    camOrbit.topBlend = camOrbit.topTarget;
  }
  const tb = camOrbit.topBlend;

  // Continuous easing across full 0–2 range (no piecewise stutter)
  // Normalize tb to 0–1 range based on actual start→end distance
  const segFrom = tb <= 1 ? 0 : 1;
  const localT = tb <= 1 ? Math.max(0, Math.min(1, tb)) : Math.max(0, Math.min(1, tb - 1));
  // Use simple cubic ease for smoother pass-through (no pause at midpoint)
  const eased = localT;

  // --- Three camera keyframes ---
  // Base pivot: island center of mass + user pan offset
  const pivotX = islandExtent.centerX + camOrbit.panX;
  const pivotZ = ISLAND_Z + islandExtent.centerZ + camOrbit.panZ;
  // DEBUG — remove after centering is confirmed
  if (!window._pivotLogged) { window._pivotLogged = true; console.log('[PIVOT DEBUG] ISLAND_Z:', ISLAND_Z, 'centerZ:', islandExtent.centerZ, 'panZ:', camOrbit.panZ, '=> pivotZ:', pivotZ); }
  // buildZoom: -0.7 (closest) to 0.8 (furthest), 0 = default
  const zoomScale = 1 + buildZoom;  // 0.3 to 1.8
  const builderDist = CAM_ORBIT_RADIUS * 0.45 * zoomScale;
  const builderHeight = (32 + camOff * 5) * zoomScale;

  // Stage 0: Orbit (with pan) — waterline cinematic view
  const orbitRawY = 0.3 + breathe + camOff * 1.5;
  const orbitPos = {
    x: Math.sin(angle) * CAM_ORBIT_RADIUS + sway + pivotX,
    y: Math.max(0.3, orbitRawY), // never below waterline
    z: Math.cos(angle) * CAM_ORBIT_RADIUS + pivotZ,
  };
  const orbitLook = { x: pivotX, y: orbitLookY + camOff * 2.0, z: pivotZ };
  const orbitFov = 50;

  // Stage 1: Builder (elevated angle, with pan)
  const builderPos = {
    x: Math.sin(angle) * builderDist + pivotX,
    y: builderHeight,
    z: Math.cos(angle) * builderDist + pivotZ,
  };
  const builderLook = {
    x: pivotX,
    y: 6,
    z: pivotZ,
  };
  const builderFov = 55;

  // Stage 2: Overhead (straight down, with pan)
  const topPos = {
    x: pivotX,
    y: (55 + camOff * 10) * zoomScale,
    z: pivotZ,
  };
  const topLook = {
    x: pivotX,
    y: 0,
    z: pivotZ,
  };
  const topFov = 75;

  // Select keyframe pair
  const posA = segFrom === 0 ? orbitPos : builderPos;
  const posB = segFrom === 0 ? builderPos : topPos;
  const lookA = segFrom === 0 ? orbitLook : builderLook;
  const lookB = segFrom === 0 ? builderLook : topLook;
  const fovA = segFrom === 0 ? orbitFov : builderFov;
  const fovB = segFrom === 0 ? builderFov : topFov;

  // Interpolate
  camera.position.set(
    posA.x + (posB.x - posA.x) * eased,
    posA.y + (posB.y - posA.y) * eased,
    posA.z + (posB.z - posA.z) * eased,
  );

  // Up vector: (0,1,0) for orbit and builder, rotates to compass in overhead
  // Only rotate up during segment 1→2
  if (segFrom === 1 && eased > 0.01) {
    const upX = -Math.sin(angle) * eased;
    const upY = 1 - eased;
    const upZ = -Math.cos(angle) * eased;
    const len = Math.sqrt(upX*upX + upY*upY + upZ*upZ) || 1;
    camera.up.set(upX/len, upY/len, upZ/len);
  } else if (segFrom === 0 || eased < 0.01) {
    camera.up.set(0, 1, 0);
  }
  // If fully in overhead (tb >= 2), lock up vector
  if (tb >= 1.99) {
    camera.up.set(-Math.sin(angle), 0, -Math.cos(angle));
  }

  const lx = lookA.x + (lookB.x - lookA.x) * eased;
  const ly = lookA.y + (lookB.y - lookA.y) * eased;
  const lz = lookA.z + (lookB.z - lookA.z) * eased;
  camera.lookAt(lx, ly, lz);

  camera.fov = fovA + (fovB - fovA) * eased;
  camera.updateProjectionMatrix();

  // Global easing value for waterline etc (0 at orbit, 1 at fully overhead)
  const te = tb <= 1 ? eased * 0.5 : 0.5 + eased * 0.5;

  // Waterline strip — positioned at orbit location with kabbelen wave animation
  // Ensure waterline never overlaps terrain: use precomputed directional extents
  const wlDefault = CAM_ORBIT_RADIUS * (1 - CAM_WL_RATIO);
  const camDirX = Math.sin(angle);
  const camDirZ = Math.cos(angle);
  // Interpolate directional extent from cached cardinal maxima
  const dirExtent = Math.abs(camDirX) * islandExtent.extentX + Math.abs(camDirZ) * islandExtent.extentZ;
  const wlFromIsland = Math.max(wlDefault, dirExtent + 10);
  waterlineMesh.position.set(
    Math.sin(angle) * wlFromIsland + pivotX,
    0,
    Math.cos(angle) * wlFromIsland + pivotZ
  );
  waterlineMesh.rotation.y = angle;
  waterlineMesh.visible = te < 0.15 && !buildState.active;
  waterlineMesh.material.opacity = te < 0.05 ? 1 : Math.max(0, 1 - (te - 0.05) / 0.1);

  // Kabbelen — waterline strip samples the SAME wave function as the water surface
  // Convert each strip vertex to world-space, sample waveY, apply as Y offset
  const cosA = Math.cos(angle), sinA = Math.sin(angle);
  const wlWx = waterlineMesh.position.x, wlWz = waterlineMesh.position.z;
  for (let i = 0; i < wlPos.count; i++) {
    const lx = wlPos.getX(i); // local X along the strip
    // Strip is rotated by `angle` around Y — local X maps to world offset
    const worldX = wlWx + lx * cosA;
    const worldZ = wlWz - lx * sinA;
    const wave = waveY(worldX, worldZ, t);
    wlPos.setY(i, wlOrigY[i] + wave);
  }
  wlPos.needsUpdate = true;

  // Single vertical clip plane on water — placed exactly at the waterline strip.
  // No Y-clip needed since water and strip now share identical wave motion.
  const clipNx = -Math.sin(angle);
  const clipNz = -Math.cos(angle);
  // Place clip plane right at the strip position (with tiny offset toward island
  // so water meets the strip flush rather than stopping short)
  const clipDist = wlFromIsland - 0.1;
  const clipPx = Math.sin(angle) * clipDist + pivotX;
  const clipPz = Math.cos(angle) * clipDist + pivotZ;
  const clipConst = -(clipNx * clipPx + clipNz * clipPz);
  waterClipPlane.normal.set(clipNx, 0, clipNz);
  waterClipPlane.constant = clipConst;

  if (te >= 0.4 || buildState.active) {
    waterMat.clippingPlanes = [];
    sunSpecMat.clippingPlanes = [];
    moonSpecMat.clippingPlanes = [];
  } else {
    waterMat.clippingPlanes = [waterClipPlane];
    sunSpecMat.clippingPlanes = [waterClipPlane];
    moonSpecMat.clippingPlanes = [waterClipPlane];
  }

  // Update viewport debug lines + sun/moon arc traces
  updateViewportDebugLines();
  updateSunArcTraces();
  updateMoonArcTraces();

  // Rock LOD — update instance visibility based on camera distance
  updateRockLOD(camera);

  // Render — use build camera if active, otherwise main camera
  if (buildCamRefs.usingBuildCamera && buildCamRefs.buildCamera) {
    updateBuildCameraPosition();
    renderer.render(scene, buildCamRefs.buildCamera);
  } else {
    renderer.render(scene, camera);
  }
}

// ============================================================
// Device viewport definitions — grouped by category
// Mobile = portrait, Tablet & Desktop = landscape
// ============================================================
const DEVICE_CATALOG = {
  mobile: [
    { id: 'iphone15',     w: 393,  h: 852,  label: 'iPhone 15 / 16' },
    { id: 'iphone15pm',   w: 430,  h: 932,  label: 'iPhone 15 Pro Max' },
    { id: 'iphoneSE',     w: 375,  h: 667,  label: 'iPhone SE' },
    { id: 'pixel8',       w: 412,  h: 932,  label: 'Pixel 8' },
    { id: 'galaxyS24',    w: 360,  h: 780,  label: 'Galaxy S24' },
    { id: 'galaxyS24u',   w: 412,  h: 915,  label: 'Galaxy S24 Ultra' },
  ],
  tablet: [
    { id: 'ipad109',      w: 1180, h: 820,  label: 'iPad 10.9"' },
    { id: 'ipadAir13',    w: 1366, h: 1024, label: 'iPad Air 13"' },
    { id: 'ipadPro11',    w: 1194, h: 834,  label: 'iPad Pro 11"' },
    { id: 'ipadPro129',   w: 1366, h: 1024, label: 'iPad Pro 12.9"' },
    { id: 'galaxyTabS9',  w: 1340, h: 800,  label: 'Galaxy Tab S9' },
    { id: 'ipadMini',     w: 1133, h: 744,  label: 'iPad Mini' },
  ],
  desktop: [
    { id: 'fhd',          w: 1920, h: 1080, label: '1920 x 1080 (FHD)' },
    { id: 'qhd',          w: 2560, h: 1440, label: '2560 x 1440 (QHD)' },
    { id: 'uwqhd',        w: 3440, h: 1440, label: '3440 x 1440 (UW)' },
    { id: 'macbook14',    w: 1512, h: 982,  label: 'MacBook Pro 14"' },
    { id: 'macbook16',    w: 1728, h: 1117, label: 'MacBook Pro 16"' },
    { id: '4k',           w: 3840, h: 2160, label: '3840 x 2160 (4K)' },
  ],
};

// Category colors
const CAT_COLORS = { mobile: 0xff3333, tablet: 0x33ff66, desktop: 0x3388ff };
const SUN_DIST = 380;
const VP_FOV = 50;

// Active device selection per category
const activeDevices = { mobile: 'iphone15', tablet: 'ipad109', desktop: 'fhd' };

// Build a viewport rect from 4 thin quad strips (visible thickness at any distance)
// Each edge is a narrow plane with 2 triangles. Returns a Group with 4 children.
const VP_LINE_THICKNESS = 3.0; // world units — visible at 380 distance
function makeViewportRect(color) {
  const mat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, depthTest: false, transparent: true, opacity: 0.8, fog: false });
  const group = new THREE.Group();
  group.renderOrder = 9999;
  // 4 edges: each is a PlaneGeometry(1,1) that we'll position/scale per frame
  for (let i = 0; i < 4; i++) {
    const geo = new THREE.BufferGeometry();
    // 4 verts, 2 triangles
    const positions = new Float32Array(4 * 3);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setIndex([0, 1, 2, 2, 3, 0]);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    group.add(mesh);
  }
  group.visible = false;
  scene.add(group);
  return group;
}

// One rect per category
const viewportRects = {
  mobile:  makeViewportRect(CAT_COLORS.mobile),
  tablet:  makeViewportRect(CAT_COLORS.tablet),
  desktop: makeViewportRect(CAT_COLORS.desktop),
};

// Sun arc trace lines — one per device class (3 arcs)
const ARC_COLORS = { mobile: 0xff6600, tablet: 0x66ff33, desktop: 0x3399ff };
function makeArcLine(color, segments = 64) {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array((segments + 1) * 3);
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.LineBasicMaterial({ color, depthTest: false, transparent: true, opacity: 0.7, fog: false });
  const line = new THREE.Line(geo, mat);
  line.renderOrder = 9998;
  line.frustumCulled = false;
  line.visible = false;
  scene.add(line);
  return line;
}
const arcLines = {
  mobile:  makeArcLine(ARC_COLORS.mobile),
  tablet:  makeArcLine(ARC_COLORS.tablet),
  desktop: makeArcLine(ARC_COLORS.desktop),
};

// Moon arc trace lines — white, one per device class
const MOON_DIST = 400;
const moonArcLines = {
  mobile:  makeArcLine(0xffffff),
  tablet:  makeArcLine(0xffffff),
  desktop: makeArcLine(0xffffff),
};

// Reusable vectors (avoid per-frame allocations)
const _vpFwd = new THREE.Vector3();
const _vpRight = new THREE.Vector3();
const _vpUp = new THREE.Vector3();
const _vpCenter = new THREE.Vector3();
const _vpCorner = new THREE.Vector3();

function getDeviceAspect(category) {
  const dev = DEVICE_CATALOG[category].find(d => d.id === activeDevices[category]);
  if (!dev) return 1;
  // Mobile = portrait (w < h), Tablet & Desktop = landscape (w > h)
  return category === 'mobile' ? dev.w / dev.h : dev.w / dev.h;
}

// Reusable corners for viewport quads
const _vpBL = new THREE.Vector3();
const _vpBR = new THREE.Vector3();
const _vpTR = new THREE.Vector3();
const _vpTL = new THREE.Vector3();

function setQuadEdge(mesh, a, b, thicknessDir, thickness) {
  // Build a quad strip from point a to point b, offset by thicknessDir * thickness/2
  const pos = mesh.geometry.attributes.position.array;
  const halfT = thickness / 2;
  // v0 = a - offset, v1 = b - offset, v2 = b + offset, v3 = a + offset
  pos[0]  = a.x - thicknessDir.x * halfT; pos[1]  = a.y - thicknessDir.y * halfT; pos[2]  = a.z - thicknessDir.z * halfT;
  pos[3]  = b.x - thicknessDir.x * halfT; pos[4]  = b.y - thicknessDir.y * halfT; pos[5]  = b.z - thicknessDir.z * halfT;
  pos[6]  = b.x + thicknessDir.x * halfT; pos[7]  = b.y + thicknessDir.y * halfT; pos[8]  = b.z + thicknessDir.z * halfT;
  pos[9]  = a.x + thicknessDir.x * halfT; pos[10] = a.y + thicknessDir.y * halfT; pos[11] = a.z + thicknessDir.z * halfT;
  mesh.geometry.attributes.position.needsUpdate = true;
}

function updateViewportDebugLines() {
  const halfVFov = (VP_FOV / 2) * Math.PI / 180;
  const halfH = Math.tan(halfVFov) * SUN_DIST;

  camera.getWorldDirection(_vpFwd);
  _vpRight.crossVectors(_vpFwd, camera.up).normalize();
  _vpUp.crossVectors(_vpRight, _vpFwd).normalize();
  _vpCenter.copy(camera.position).addScaledVector(_vpFwd, SUN_DIST);

  for (const cat of ['mobile', 'tablet', 'desktop']) {
    const group = viewportRects[cat];
    if (!group.visible) continue;
    const aspect = getDeviceAspect(cat);
    const halfW = halfH * aspect;

    // Compute 4 corners
    _vpBL.copy(_vpCenter).addScaledVector(_vpRight, -halfW).addScaledVector(_vpUp, -halfH);
    _vpBR.copy(_vpCenter).addScaledVector(_vpRight, halfW).addScaledVector(_vpUp, -halfH);
    _vpTR.copy(_vpCenter).addScaledVector(_vpRight, halfW).addScaledVector(_vpUp, halfH);
    _vpTL.copy(_vpCenter).addScaledVector(_vpRight, -halfW).addScaledVector(_vpUp, halfH);

    const edges = group.children;
    // Bottom edge (BL → BR): thickness in up direction
    setQuadEdge(edges[0], _vpBL, _vpBR, _vpUp, VP_LINE_THICKNESS);
    // Right edge (BR → TR): thickness in right direction
    setQuadEdge(edges[1], _vpBR, _vpTR, _vpRight, VP_LINE_THICKNESS);
    // Top edge (TR → TL): thickness in up direction
    setQuadEdge(edges[2], _vpTR, _vpTL, _vpUp, VP_LINE_THICKNESS);
    // Left edge (TL → BL): thickness in right direction
    setQuadEdge(edges[3], _vpTL, _vpBL, _vpRight, VP_LINE_THICKNESS);
  }
}

function updateSunArcTraces() {
  const SEGMENTS = 64;
  for (const cat of ['mobile', 'tablet', 'desktop']) {
    const line = arcLines[cat];
    if (!line.visible) continue;
    const cfg = sunArcConfigs[cat];
    const pos = line.geometry.attributes.position.array;
    const azSweep = cfg.azStart - cfg.azEnd;

    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;
      const azDeg = cfg.azStart - t * azSweep;
      const azRad = azDeg * Math.PI / 180;
      const rawElev = Math.sin(t * Math.PI);
      const elevDeg = rawElev * cfg.elevPeak;
      const elevRad = elevDeg * Math.PI / 180;

      pos[i * 3]     = camera.position.x + (-Math.cos(azRad) * SUN_DIST);
      pos[i * 3 + 1] = Math.sin(elevRad) * SUN_DIST;
      pos[i * 3 + 2] = camera.position.z + (Math.sin(azRad) * SUN_DIST);
    }
    line.geometry.attributes.position.needsUpdate = true;
  }
}

function updateMoonArcTraces() {
  const SEGMENTS = 64;
  for (const cat of ['mobile', 'tablet', 'desktop']) {
    const line = moonArcLines[cat];
    if (!line.visible) continue;
    const cfg = moonArcConfigs[cat];
    const pos = line.geometry.attributes.position.array;

    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS; // 0 = night start, 1 = night end
      const elevOsc = Math.sin(t * Math.PI) * cfg.elevArc;
      const elevDeg = cfg.elevBase + elevOsc;
      const elevRad = elevDeg * Math.PI / 180;
      const azDeg = cfg.azCenter + (t - 0.5) * cfg.azDrift;
      const azRad = azDeg * Math.PI / 180;

      pos[i * 3]     = camera.position.x + (-Math.cos(azRad) * MOON_DIST);
      pos[i * 3 + 1] = Math.sin(elevRad) * MOON_DIST;
      pos[i * 3 + 2] = camera.position.z + (Math.sin(azRad) * MOON_DIST);
    }
    line.geometry.attributes.position.needsUpdate = true;
  }
}

// ============================================================
// Sun arc calibration — wire to HTML panel (created in index.html)
// ============================================================
function syncSlidersToCategory(cat) {
  const cfg = sunArcConfigs[cat];
  const sl = (id) => document.getElementById(id);
  sl('slAzStart').value = cfg.azStart;  sl('sacAzS').textContent = cfg.azStart;
  sl('slAzEnd').value = cfg.azEnd;      sl('sacAzE').textContent = cfg.azEnd;
  sl('slElevPeak').value = cfg.elevPeak; sl('sacElP').textContent = cfg.elevPeak;
}

// Shared hide flags — when true, that panel's 3D overlays are forced invisible
// Start hidden so dev mode opens clean
let sunArcHidden = true;
let moonArcHidden = true;

function initSunArcPanel() {
  const panel = document.getElementById('sunArcDebug');
  if (!panel || !isDev()) return;

  // Collapse toggle
  document.getElementById('sunArcHeader').addEventListener('click', () => {
    const body = document.getElementById('sunArcBody');
    const toggle = document.getElementById('sunArcToggle');
    const isOpen = body.style.display !== 'none';
    body.style.display = isOpen ? 'none' : 'block';
    toggle.textContent = isOpen ? '\u25B6' : '\u25BC';
  });

  // Hide toggle — hides all sun arc lines + viewport rects from this panel
  const hideBtn = document.getElementById('sunArcHide');
  // Set initial visual state to match sunArcHidden=true
  hideBtn.textContent = '\uD83D\uDC41 Show';
  hideBtn.style.opacity = '0.5';
  hideBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sunArcHidden = !sunArcHidden;
    hideBtn.textContent = sunArcHidden ? '\uD83D\uDC41 Show' : '\uD83D\uDC41 Hide';
    hideBtn.style.opacity = sunArcHidden ? '0.5' : '1';
    for (const c of ['mobile', 'tablet', 'desktop']) {
      if (sunArcHidden) {
        viewportRects[c].visible = false;
        arcLines[c].visible = false;
      }
    }
    if (!sunArcHidden) switchTab(editingCat); // restore active tab's overlays
  });

  // Switch active tab — shows that category's viewport, arc, device dropdown
  let editingCat = 'mobile';
  function switchTab(cat) {
    editingCat = cat;
    // Update tab highlight
    for (const c of ['mobile', 'tablet', 'desktop']) {
      document.getElementById('sacTab_' + c).style.background = c === cat ? 'rgba(255,255,255,0.25)' : 'transparent';
      // Show/hide viewport dropdown for this category
      const vpSel = document.getElementById('vpSel_' + c);
      if (vpSel) vpSel.style.display = c === cat ? 'flex' : 'none';
      // Show/hide viewport rect + arc line (respect hide flag)
      viewportRects[c].visible = !sunArcHidden && (c === cat);
      arcLines[c].visible = !sunArcHidden && (c === cat);
    }
    syncSlidersToCategory(cat);
    setActiveDeviceClass(cat);
  }

  for (const cat of ['mobile', 'tablet', 'desktop']) {
    document.getElementById('sacTab_' + cat).addEventListener('click', () => switchTab(cat));
  }

  // Slider → active category config sync
  const bindSlider = (sliderId, prop, labelId) => {
    document.getElementById(sliderId).addEventListener('input', e => {
      const val = parseFloat(e.target.value);
      sunArcConfigs[editingCat][prop] = val;
      document.getElementById(labelId).textContent = val;
      setActiveDeviceClass(editingCat);
    });
  };
  bindSlider('slAzStart', 'azStart', 'sacAzS');
  bindSlider('slAzEnd', 'azEnd', 'sacAzE');
  bindSlider('slElevPeak', 'elevPeak', 'sacElP');

  // Device dropdowns per category
  for (const cat of ['mobile', 'tablet', 'desktop']) {
    const sel = document.getElementById('devSel_' + cat);
    if (!sel) continue;
    sel.addEventListener('change', e => {
      activeDevices[cat] = e.target.value;
      // Sync MoonArc + Viewport panel dropdowns
      const macSel = document.getElementById('macDevSel_' + cat);
      if (macSel) macSel.value = e.target.value;
      const vpSel = document.getElementById('vpDevSel_' + cat);
      if (vpSel) vpSel.value = e.target.value;
    });
  }

  // Init to detected device class tab
  switchTab(detectDeviceClass());
}
initSunArcPanel();

// ============================================================
// Standalone Viewport Calibration panel
// ============================================================
// Per-category toggle state (all off by default)
const vpToggles = { mobile: false, tablet: false, desktop: false };

function initVpCalibPanel() {
  const panel = document.getElementById('vpCalibDebug');
  if (!panel || !isDev()) return;

  // Collapse toggle
  document.getElementById('vpCalibHeader').addEventListener('click', () => {
    const body = document.getElementById('vpCalibBody');
    const toggle = document.getElementById('vpCalibToggle');
    const isOpen = body.style.display !== 'none';
    body.style.display = isOpen ? 'none' : 'flex';
    toggle.textContent = isOpen ? '\u25B6' : '\u25BC';
  });

  // Per-category viewport toggles — checkbox-style buttons
  for (const cat of ['mobile', 'tablet', 'desktop']) {
    const btn = document.getElementById('vpToggle_' + cat);
    if (!btn) continue;
    const check = btn.querySelector('span');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      vpToggles[cat] = !vpToggles[cat];
      check.style.display = vpToggles[cat] ? 'block' : 'none';
      btn.style.background = vpToggles[cat] ? 'rgba(255,255,255,0.15)' : 'transparent';
      viewportRects[cat].visible = vpToggles[cat];
    });
  }

  // Device dropdowns — syncs with SunArc + MoonArc panel dropdowns
  for (const cat of ['mobile', 'tablet', 'desktop']) {
    const sel = document.getElementById('vpDevSel_' + cat);
    if (!sel) continue;
    sel.value = activeDevices[cat];
    sel.addEventListener('change', e => {
      activeDevices[cat] = e.target.value;
      const sacSel = document.getElementById('devSel_' + cat);
      if (sacSel) sacSel.value = e.target.value;
      const macSel = document.getElementById('macDevSel_' + cat);
      if (macSel) macSel.value = e.target.value;
    });
  }
}
initVpCalibPanel();

// ============================================================
// Moon arc calibration — wire to HTML panel
// ============================================================
function syncMoonSlidersToCategory(cat) {
  const cfg = moonArcConfigs[cat];
  const sl = (id) => document.getElementById(id);
  sl('slMoonAzCenter').value = cfg.azCenter;  sl('macAzC').textContent = cfg.azCenter;
  sl('slMoonAzDrift').value = cfg.azDrift;    sl('macAzD').textContent = cfg.azDrift;
  sl('slMoonElevBase').value = cfg.elevBase;  sl('macElB').textContent = cfg.elevBase;
  sl('slMoonElevArc').value = cfg.elevArc;    sl('macElA').textContent = cfg.elevArc;
}

function initMoonArcPanel() {
  const panel = document.getElementById('moonArcDebug');
  if (!panel || !isDev()) return;

  // Collapse toggle
  document.getElementById('moonArcHeader').addEventListener('click', () => {
    const body = document.getElementById('moonArcBody');
    const toggle = document.getElementById('moonArcToggle');
    const isOpen = body.style.display !== 'none';
    body.style.display = isOpen ? 'none' : 'block';
    toggle.textContent = isOpen ? '\u25B6' : '\u25BC';
  });

  // Hide toggle — hides all moon arc lines + viewport rects from this panel
  const hideBtn = document.getElementById('moonArcHide');
  // Set initial visual state to match moonArcHidden=true
  hideBtn.textContent = '\uD83D\uDC41 Show';
  hideBtn.style.opacity = '0.5';
  hideBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    moonArcHidden = !moonArcHidden;
    hideBtn.textContent = moonArcHidden ? '\uD83D\uDC41 Show' : '\uD83D\uDC41 Hide';
    hideBtn.style.opacity = moonArcHidden ? '0.5' : '1';
    for (const c of ['mobile', 'tablet', 'desktop']) {
      if (moonArcHidden) {
        viewportRects[c].visible = false;
        moonArcLines[c].visible = false;
      }
    }
    if (!moonArcHidden) switchTab(editingCat); // restore active tab's overlays
  });

  // Switch active tab — shows that category's viewport, moon arc line, device dropdown
  let editingCat = 'mobile';
  function switchTab(cat) {
    editingCat = cat;
    for (const c of ['mobile', 'tablet', 'desktop']) {
      document.getElementById('macTab_' + c).style.background = c === cat ? 'rgba(255,255,255,0.25)' : 'transparent';
      // Show/hide viewport dropdown for this category
      const vpSel = document.getElementById('macVpSel_' + c);
      if (vpSel) vpSel.style.display = c === cat ? 'flex' : 'none';
      // Show/hide viewport rect + moon arc line (respect hide flag)
      viewportRects[c].visible = !moonArcHidden && (c === cat);
      moonArcLines[c].visible = !moonArcHidden && (c === cat);
    }
    syncMoonSlidersToCategory(cat);
    setActiveDeviceClass(cat);
  }

  for (const cat of ['mobile', 'tablet', 'desktop']) {
    document.getElementById('macTab_' + cat).addEventListener('click', () => switchTab(cat));
  }

  // Slider → active category config sync
  const bindSlider = (sliderId, prop, labelId) => {
    document.getElementById(sliderId).addEventListener('input', e => {
      const val = parseFloat(e.target.value);
      moonArcConfigs[editingCat][prop] = val;
      document.getElementById(labelId).textContent = val;
      setActiveDeviceClass(editingCat);
    });
  };
  bindSlider('slMoonAzCenter', 'azCenter', 'macAzC');
  bindSlider('slMoonAzDrift', 'azDrift', 'macAzD');
  bindSlider('slMoonElevBase', 'elevBase', 'macElB');
  bindSlider('slMoonElevArc', 'elevArc', 'macElA');

  // Device dropdowns per category — sync with other panels
  for (const cat of ['mobile', 'tablet', 'desktop']) {
    const sel = document.getElementById('macDevSel_' + cat);
    if (!sel) continue;
    sel.addEventListener('change', e => {
      activeDevices[cat] = e.target.value;
      // Sync SunArc + Viewport panel dropdowns
      const sacSel = document.getElementById('devSel_' + cat);
      if (sacSel) sacSel.value = e.target.value;
      const vpSel = document.getElementById('vpDevSel_' + cat);
      if (vpSel) vpSel.value = e.target.value;
    });
  }

  // Init to detected device class tab
  switchTab(detectDeviceClass());
}
initMoonArcPanel();


// Expose camera calibration for debug sliders
window._camDbg = {
  setCamOff,
  setOrbitLookY,
  getCamOff: () => camOff,
  getOrbitLookY: () => orbitLookY,
  getCamPos: () => ({ x: camera.position.x.toFixed(1), y: camera.position.y.toFixed(2), z: camera.position.z.toFixed(1) }),
  getPanX: () => camOrbit.panTargetX,
  getPanZ: () => camOrbit.panTargetZ,
  setPanX: (v) => { camOrbit.panTargetX = v; },
  setPanZ: (v) => { camOrbit.panTargetZ = v; },
};

// If coming from landing page, stop its render loop right before we start ours
// so there is zero rendering gap (no frozen frames).
if (_fromLanding && window._landingCleanup) {
  window._landingCleanup();
}

// Init player character (independent of GLB preload — uses capsule placeholder)
initPlayer();

// Init procedural rocks (must run after all modules so terrainRefs.seabedMesh exists)
initRocks();

// Start the animation loop
animate();

// Kick off model preloading, then place starter trees
// Skip tree spawning when coming from the landing page — landing palms are
// already in the scene and serve as the game's trees.
if (!_fromLanding) {
  preloadModels().then(() => {
    // Scatter palm trees across the doubled island (gz -54 to +146)
    // Layout: player at edge (gz -54) → white sand (gz -53 to -44) → dense palms
    const treePlacements = [
      // ── Clear beach at right edge (gz -54 to -44) — NO trees, player spawn area ──

      // ── Dense palm grove starts at gz -43, tightly packed ──
      { gx: 0, gz: -43 }, { gx: 1, gz: -42 }, { gx: -1, gz: -41 },
      { gx: 0, gz: -40 }, { gx: 1, gz: -39 }, { gx: -1, gz: -38 },
      { gx: 0, gz: -37 }, { gx: -1, gz: -36 }, { gx: 1, gz: -35 },
      { gx: 0, gz: -34 }, { gx: 1, gz: -33 }, { gx: -1, gz: -32 },
      { gx: 0, gz: -31 }, { gx: -1, gz: -30 }, { gx: 1, gz: -29 },
      { gx: 0, gz: -28 }, { gx: 1, gz: -27 }, { gx: -1, gz: -26 },
      { gx: 0, gz: -25 }, { gx: -1, gz: -24 }, { gx: 1, gz: -23 },
      { gx: 0, gz: -22 }, { gx: 1, gz: -21 }, { gx: -1, gz: -20 },
      { gx: 0, gz: -19 }, { gx: -1, gz: -18 }, { gx: 1, gz: -17 },
      { gx: 0, gz: -16 }, { gx: 1, gz: -15 }, { gx: -1, gz: -14 },
      { gx: 0, gz: -13 }, { gx: -1, gz: -12 }, { gx: 1, gz: -11 },
      { gx: 0, gz: -10 }, { gx: 1, gz: -9 },  { gx: -1, gz: -8 },
      { gx: 0, gz: -7 },  { gx: -1, gz: -6 }, { gx: 1, gz: -5 },
      { gx: 0, gz: -4 },  { gx: 1, gz: -3 },  { gx: -1, gz: -2 },
      // ── Dense continues through mid-island (gz 0 to +50) ──
      { gx: 0, gz: 0 },   { gx: -1, gz: 1 },  { gx: 1, gz: 2 },
      { gx: 0, gz: 3 },   { gx: 1, gz: 4 },   { gx: -1, gz: 5 },
      { gx: 0, gz: 7 },   { gx: -1, gz: 9 },  { gx: 1, gz: 11 },
      { gx: 0, gz: 13 },  { gx: 1, gz: 15 },  { gx: -1, gz: 17 },
      { gx: 0, gz: 19 },  { gx: -1, gz: 21 }, { gx: 1, gz: 23 },
      { gx: 0, gz: 25 },  { gx: 1, gz: 27 },  { gx: -1, gz: 29 },
      { gx: 0, gz: 31 },  { gx: -1, gz: 33 }, { gx: 1, gz: 35 },
      { gx: 0, gz: 37 },  { gx: 1, gz: 39 },  { gx: -1, gz: 41 },
      { gx: 0, gz: 43 },  { gx: -1, gz: 45 }, { gx: 1, gz: 47 },
      { gx: 0, gz: 49 },
      // ── Dense continues (gz 51 to +100) ──
      { gx: 1, gz: 51 },  { gx: -1, gz: 53 }, { gx: 0, gz: 55 },
      { gx: -1, gz: 57 }, { gx: 1, gz: 59 },  { gx: 0, gz: 61 },
      { gx: 1, gz: 63 },  { gx: -1, gz: 65 }, { gx: 0, gz: 67 },
      { gx: -1, gz: 69 }, { gx: 1, gz: 71 },  { gx: 0, gz: 73 },
      { gx: 1, gz: 75 },  { gx: -1, gz: 77 }, { gx: 0, gz: 79 },
      { gx: -1, gz: 81 }, { gx: 1, gz: 83 },  { gx: 0, gz: 85 },
      { gx: 1, gz: 87 },  { gx: -1, gz: 89 }, { gx: 0, gz: 91 },
      { gx: -1, gz: 93 }, { gx: 1, gz: 95 },  { gx: 0, gz: 97 },
      { gx: 1, gz: 99 },
      // ── Dense continues (gz 101 to +146) ──
      { gx: -1, gz: 101 }, { gx: 0, gz: 103 }, { gx: 1, gz: 105 },
      { gx: -1, gz: 107 }, { gx: 0, gz: 109 }, { gx: 1, gz: 111 },
      { gx: -1, gz: 113 }, { gx: 0, gz: 115 }, { gx: 1, gz: 117 },
      { gx: -1, gz: 119 }, { gx: 0, gz: 121 }, { gx: 1, gz: 123 },
      { gx: -1, gz: 125 }, { gx: 0, gz: 127 }, { gx: 1, gz: 129 },
      { gx: -1, gz: 131 }, { gx: 0, gz: 133 }, { gx: 1, gz: 135 },
      { gx: -1, gz: 137 }, { gx: 0, gz: 139 }, { gx: 1, gz: 141 },
      { gx: -1, gz: 143 }, { gx: 0, gz: 145 },
    ];
    treePlacements.forEach(({ gx, gz }) => placeFlora('FL-001', gx, gz));

    // Flora placement done
  });
}

// Place stone slabs on seabed + coves
initSlabScatter();

// Seagulls — circle the island and land (daytime only)
initBirds();

// Reef fish — school over the reef rocks, scatter from the diver (daytime only)
initFish();
