// ============================================================
// BORA BORA — Sky, Water, Lighting & Day/Night Cycle Module
// ============================================================
import * as THREE from 'three';
import { scene, ISLAND_Z, ISLAND_RADIUS, OCEAN_FLOOR_Y, renderer, camera, buildState, HOME_BEACH_Z, ISLAND_SEED, terrainRefs } from './state.js';
import { waterSegments, loadSettings } from './settings-store.js';

// ============================================================
// SKY — canvas gradient background + soft cloud texture on dome
// ============================================================
// Step 1: Sky gradient background (same warm tropical palette)
const skyCanvas = document.createElement('canvas');
skyCanvas.width = 4; skyCanvas.height = 1024;
const skyCtx = skyCanvas.getContext('2d');
const skyGrad = skyCtx.createLinearGradient(0, 0, 0, 1024);
skyGrad.addColorStop(0.0, '#0a1e3a');
skyGrad.addColorStop(0.08, '#0e3468');
skyGrad.addColorStop(0.18, '#1a5090');
skyGrad.addColorStop(0.30, '#2670b8');
skyGrad.addColorStop(0.42, '#3890d0');
skyGrad.addColorStop(0.55, '#50a8e0');
skyGrad.addColorStop(0.67, '#72c0ec');
skyGrad.addColorStop(0.78, '#98d6f4');
skyGrad.addColorStop(0.88, '#bce6f8');
skyGrad.addColorStop(0.95, '#d8f0f4');
skyGrad.addColorStop(1.0, '#c8e4e0');
skyCtx.fillStyle = skyGrad;
skyCtx.fillRect(0, 0, 4, 1024);
scene.background = new THREE.CanvasTexture(skyCanvas);

// Step 2: Generate soft cloud texture on canvas
function generateCloudTexture(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, h);

  let seed = 42;
  function rand() { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646; }

  // Proper 2D gradient noise (Perlin improved) - no blocky artifacts
  const GRID = 256;
  const perm = new Uint8Array(GRID * 2);
  // 12 gradient directions (cube edge midpoints projected to 2D)
  const grads = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1],
                 [1,1],[-1,1],[1,-1],[-1,-1]];
  const permArr = [];
  for (let i = 0; i < GRID; i++) permArr.push(i);
  // Fisher-Yates shuffle with seeded random
  for (let i = GRID - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [permArr[i], permArr[j]] = [permArr[j], permArr[i]];
  }
  for (let i = 0; i < GRID; i++) { perm[i] = permArr[i]; perm[GRID + i] = permArr[i]; }

  // Quintic fade - smooth second derivative (Ken Perlin improved)
  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(a, b, t) { return a + t * (b - a); }
  function dot2(g, x, y) { return g[0] * x + g[1] * y; }

  function noise2D(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const fx = x - Math.floor(x);
    const fy = y - Math.floor(y);
    const u = fade(fx), v = fade(fy);
    const gi00 = perm[perm[X] + Y] % 12;
    const gi01 = perm[perm[X] + Y + 1] % 12;
    const gi10 = perm[perm[X + 1] + Y] % 12;
    const gi11 = perm[perm[X + 1] + Y + 1] % 12;
    const n00 = dot2(grads[gi00], fx, fy);
    const n10 = dot2(grads[gi10], fx - 1, fy);
    const n01 = dot2(grads[gi01], fx, fy - 1);
    const n11 = dot2(grads[gi11], fx - 1, fy - 1);
    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), v);
  }

  // FBM with 6 octaves + domain warping for organic shapes
  function fbm(x, y) {
    let val = 0, amp = 0.5, freq = 1;
    for (let i = 0; i < 6; i++) {
      val += amp * noise2D(x * freq, y * freq);
      freq *= 2.1; amp *= 0.48;
    }
    return val;
  }
  function warpedFbm(x, y) {
    // Domain warping — feed noise into itself for more natural shapes
    const warp = 0.7;
    const wx = x + warp * fbm(x + 1.7, y + 9.2);
    const wy = y + warp * fbm(x + 8.3, y + 2.8);
    return fbm(wx, wy);
  }

  // Render clouds into pixel buffer
  const imgData = ctx.createImageData(w, h);
  const data = imgData.data;
  const threshold = 0.02; // lower threshold = more cloud coverage
  const sunDx = 3.0, sunDy = -2.0; // sun offset for fake lighting

  // Wider horizon band (25-50% of texture)
  const bandTop = Math.floor(h * 0.25);
  const bandBot = Math.floor(h * 0.50);

  for (let py = bandTop; py < bandBot; py++) {
    const bandT = (py - bandTop) / (bandBot - bandTop);
    const edgeFade = Math.sin(bandT * Math.PI);

    for (let px = 0; px < w; px++) {
      // Higher frequency = more individual cloud formations across the sky
      const nx = px / w * 14;
      const ny = py / h * 6;

      const density = warpedFbm(nx, ny);

      // Soft edge — gradual ramp instead of hard cutoff
      const cloud = Math.min(1, Math.max(0, (density - threshold) / 0.18));

      if (cloud > 0.003) {
        // Fake volumetric lighting
        const litDensity = warpedFbm(nx + sunDx * 0.015, ny + sunDy * 0.015);
        const shadow = Math.min(1, Math.max(0, (litDensity - threshold) / 0.18));
        // Bright where sun hits, dark in thick parts
        const light = 1.0 - Math.min(1, shadow * 0.7);

        const brightness = 0.65 + light * 0.35;
        const alpha = cloud * cloud * edgeFade * 0.92; // squared for softer feathered edges

        const idx = (py * w + px) * 4;
        data[idx] = Math.floor(brightness * 255);
        data[idx + 1] = Math.floor(brightness * 255);
        data[idx + 2] = Math.floor(Math.min(1, brightness + 0.03) * 255);
        data[idx + 3] = Math.floor(alpha * 255);
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);

  // Double blur pass for ultra smooth cloud edges
  ctx.filter = 'blur(4px)';
  ctx.drawImage(c, 0, 0);
  ctx.filter = 'blur(3px)';
  ctx.drawImage(c, 0, 0);
  ctx.filter = 'none';

  return c;
}

const cloudCanvas = generateCloudTexture(2048, 1024);
const cloudTex = new THREE.CanvasTexture(cloudCanvas);
cloudTex.wrapS = THREE.RepeatWrapping;
cloudTex.wrapT = THREE.ClampToEdgeWrapping;

// Storm cloud texture — full overcast deck for rain weather state
function generateStormCloudTexture(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');

  // Start with a solid dark gray base that covers everything
  ctx.fillStyle = '#3a3e48';
  ctx.fillRect(0, 0, w, h);

  let seed = 77;
  function rand() { seed = (seed * 16807 + 0) % 2147483647; return (seed - 1) / 2147483646; }

  const GRID = 256;
  const perm = new Uint8Array(GRID * 2);
  const grads = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1],
                 [1,1],[-1,1],[1,-1],[-1,-1]];
  const permArr = [];
  for (let i = 0; i < GRID; i++) permArr.push(i);
  for (let i = GRID - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [permArr[i], permArr[j]] = [permArr[j], permArr[i]];
  }
  for (let i = 0; i < GRID; i++) { perm[i] = permArr[i]; perm[GRID + i] = permArr[i]; }

  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lerp(a, b, t) { return a + t * (b - a); }
  function dot2(g, x, y) { return g[0] * x + g[1] * y; }

  function noise2D(x, y) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const fx = x - Math.floor(x);
    const fy = y - Math.floor(y);
    const u = fade(fx), v = fade(fy);
    const gi00 = perm[perm[X] + Y] % 12;
    const gi01 = perm[perm[X] + Y + 1] % 12;
    const gi10 = perm[perm[X + 1] + Y] % 12;
    const gi11 = perm[perm[X + 1] + Y + 1] % 12;
    const n00 = dot2(grads[gi00], fx, fy);
    const n10 = dot2(grads[gi10], fx - 1, fy);
    const n01 = dot2(grads[gi01], fx, fy - 1);
    const n11 = dot2(grads[gi11], fx - 1, fy - 1);
    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), v);
  }

  function fbm(x, y) {
    let val = 0, amp = 0.5, freq = 1;
    for (let i = 0; i < 6; i++) {
      val += amp * noise2D(x * freq, y * freq);
      freq *= 2.1; amp *= 0.48;
    }
    return val;
  }
  function warpedFbm(x, y) {
    const warp = 0.8;
    const wx = x + warp * fbm(x + 1.7, y + 9.2);
    const wy = y + warp * fbm(x + 8.3, y + 2.8);
    return fbm(wx, wy);
  }

  // Paint noise variation over the solid base — two layers for contour detail
  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  // Full coverage — spans the entire texture, only gentle fade at very top
  for (let py = 0; py < h; py++) {
    const topFade = py < h * 0.12 ? py / (h * 0.12) : 1.0;

    for (let px = 0; px < w; px++) {
      // Layer 1: Large-scale cloud masses (low frequency)
      const lx = px / w * 6;
      const ly = py / h * 3;
      const largeMass = warpedFbm(lx, ly);

      // Layer 2: Finer detail / contours (higher frequency)
      const hx = px / w * 16;
      const hy = py / h * 8;
      const detail = fbm(hx + 3.1, hy + 7.4);

      // Combine: large masses set overall brightness, detail adds contour
      const combined = largeMass * 0.65 + detail * 0.35;
      const variation = combined * 0.5 + 0.5; // remap to 0..1

      // Wider brightness range for visible cloud structure
      const brightness = 0.18 + variation * 0.38; // range: 0.18–0.56

      // Alpha varies with cloud mass — thicker parts more opaque, thin parts slightly less
      const massAlpha = largeMass * 0.5 + 0.5; // 0..1
      const alpha = topFade * (0.82 + massAlpha * 0.18);

      const idx = (py * w + px) * 4;
      data[idx]     = Math.floor(brightness * 255);
      data[idx + 1] = Math.floor(brightness * 255);
      data[idx + 2] = Math.floor(Math.min(1, brightness + 0.04) * 255);
      data[idx + 3] = Math.floor(Math.max(0, Math.min(1, alpha)) * 255);
    }
  }

  ctx.putImageData(imgData, 0, 0);

  // Moderate blur — enough to smooth pixel noise but preserve cloud contours
  ctx.filter = 'blur(4px)';
  ctx.drawImage(c, 0, 0);
  ctx.filter = 'blur(3px)';
  ctx.drawImage(c, 0, 0);
  ctx.filter = 'none';

  return c;
}

const stormCanvas = generateStormCloudTexture(2048, 1024);
const stormTex = new THREE.CanvasTexture(stormCanvas);
stormTex.wrapS = THREE.RepeatWrapping;
stormTex.wrapT = THREE.ClampToEdgeWrapping;

// Cloud dome — sits just inside the sky background sphere
const cloudClipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0); // clip below Y=0
const cloudDomeGeo = new THREE.SphereGeometry(900, 64, 40);

// Add vertex colors for per-vertex sky gradient tinting (DNC)
const cdPos = cloudDomeGeo.attributes.position;
const cloudVertColors = new Float32Array(cdPos.count * 3);
for (let i = 0; i < cdPos.count; i++) {
  cloudVertColors[i * 3] = 1;
  cloudVertColors[i * 3 + 1] = 1;
  cloudVertColors[i * 3 + 2] = 1;
}
cloudDomeGeo.setAttribute('color', new THREE.BufferAttribute(cloudVertColors, 3));
const cloudVertElevation = new Float32Array(cdPos.count);
for (let i = 0; i < cdPos.count; i++) {
  const y = cdPos.getY(i);
  cloudVertElevation[i] = Math.max(0, Math.min(1, y / 900));
}

const cloudDomeMat = new THREE.MeshBasicMaterial({
  map: cloudTex,
  transparent: true,
  depthWrite: false,
  side: THREE.BackSide,
  clippingPlanes: [cloudClipPlane],
  vertexColors: true,
});
const cloudDome = new THREE.Mesh(cloudDomeGeo, cloudDomeMat);
scene.add(cloudDome);

const cloudState = { cover: 0, rain: false, domeRef: cloudDome, matRef: cloudDomeMat, texRef: cloudTex };
cloudDome.visible = false;  // Clear weather is default

// Mist — a secondary fog sphere with uniform white, only above water
const mistGeo = new THREE.SphereGeometry(890, 64, 40);
const mistMat = new THREE.MeshBasicMaterial({
  color: 0xdde4ea,
  transparent: true,
  opacity: 0,
  depthWrite: false,
  side: THREE.BackSide,
  fog: false,
  clippingPlanes: [cloudClipPlane],
});
const mistDome = new THREE.Mesh(mistGeo, mistMat);
scene.add(mistDome);

// Match directional light to sun position
// Match directional light to sun position

// ============================================================
// LIGHTING
// ============================================================
const sunLight = new THREE.DirectionalLight(0xffe8c0, 2.5);
sunLight.position.set(-15, 60, ISLAND_Z + 20);
sunLight.castShadow = loadSettings().gfx.shadows;
// Adaptive shadow quality: 1024 on mobile/tablet, 2048 on desktop
// Mobile GPUs (WKWebView/Safari) are bottlenecked by shadow map fill rate
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  || (navigator.maxTouchPoints > 1 && window.innerWidth < 1200);
const shadowRes = isMobile ? 1024 : 2048;
sunLight.shadow.mapSize.width = shadowRes;
sunLight.shadow.mapSize.height = shadowRes;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 500;
sunLight.shadow.camera.left = -130;
sunLight.shadow.camera.right = 130;
sunLight.shadow.camera.top = 130;
sunLight.shadow.camera.bottom = -60;
sunLight.shadow.bias = -0.0015;
sunLight.shadow.normalBias = 0.3;
// Point shadow camera at island so shadows land on seabed
sunLight.target.position.set(0, 0, ISLAND_Z);
scene.add(sunLight);
scene.add(sunLight.target);

scene.add(new THREE.HemisphereLight(0x60b8e0, 0xe8d8b0, 0.6));
// Ambient light for loaded models — ensures no face is ever pure black
scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const backLight = new THREE.DirectionalLight(0xffd0a0, 0.35);
backLight.position.set(20, 30, 40);
scene.add(backLight);

const underLight = new THREE.DirectionalLight(0x60e8e0, 0.6);
underLight.position.set(10, -5, -20);
scene.add(underLight);

const uwGlow1 = new THREE.PointLight(0x40d8c8, 0.4, 50);
uwGlow1.position.set(0, -6, ISLAND_Z);
scene.add(uwGlow1);
const uwGlow2 = new THREE.PointLight(0x60c8e8, 0.3, 60);
uwGlow2.position.set(-15, -8, ISLAND_Z - 10);
scene.add(uwGlow2);

// Moonlight — soft blue-white directional light, follows moon position during night
const moonLight = new THREE.DirectionalLight(0x8090b8, 0.0);
moonLight.position.set(0, 100, ISLAND_Z);
moonLight.castShadow = false;
scene.add(moonLight);

// ============================================================
// DAY/NIGHT CYCLE — state, celestial bodies, palettes
// INTEGRATION: dnc_ system drives sky, lighting, water tint, sun/moon
// ============================================================

// --- Timing (real-time clock sync) ---
// Phases map to real-world hours on the player's device:
//   Dawn  06:00 → 08:00  (2 hours)
//   Noon  08:00 → 19:00  (11 hours)
//   Dusk  19:00 → 21:00  (2 hours)
//   Night 21:00 → 06:00  (9 hours)
// All durations are equal in the internal 0-600 timeline so existing
// palette interpolation, blend zones, and phase transitions still work.
const DNC_DAWN_DUR  = 150;
const DNC_NOON_DUR  = 150;
const DNC_DUSK_DUR  = 150;
const DNC_NIGHT_DUR = 150;
const DNC_TOTAL     = DNC_DAWN_DUR + DNC_NOON_DUR + DNC_DUSK_DUR + DNC_NIGHT_DUR; // 600
const DNC_PHASES    = ['Dawn','Noon','Dusk','Night'];
const DNC_STARTS    = [0, DNC_DAWN_DUR, DNC_DAWN_DUR+DNC_NOON_DUR, DNC_DAWN_DUR+DNC_NOON_DUR+DNC_DUSK_DUR];
const DNC_DURS      = [DNC_DAWN_DUR, DNC_NOON_DUR, DNC_DUSK_DUR, DNC_NIGHT_DUR];

// --- Sun arc calibration per device class (adjustable via dev sliders) ---
// Runtime picks the active arc based on device; dev panel edits all three.
const sunArcConfigs = {
  mobile:  { azStart: -10, azEnd: 9.5, elevPeak: 32 },
  tablet:  { azStart: -31, azEnd: 30.5, elevPeak: 32 },
  desktop: { azStart: -33, azEnd: 35, elevPeak: 32 },
};

// --- Moon arc calibration per device class ---
// azCenter: azimuth center of moon drift, elevBase: base elevation, elevArc: elevation oscillation, azDrift: total azimuth sweep
const moonArcConfigs = {
  mobile:  { azCenter: 0, elevBase: 28, elevArc: 4, azDrift: 12 },
  tablet:  { azCenter: 0, elevBase: 24, elevArc: 5.5, azDrift: 40 },
  desktop: { azCenter: 0, elevBase: 24, elevArc: 5.5, azDrift: 40 },
};

// Detect device class — used at startup, can be overridden by dev panel
function detectDeviceClass() {
  const w = window.innerWidth, h = window.innerHeight;
  const short = Math.min(w, h);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice && short <= 500) return 'mobile';
  if (isTouchDevice) return 'tablet';
  return 'desktop';
}
let activeDeviceClass = detectDeviceClass();

// sunArcConfig is a live reference to whichever device class is active
const sunArcConfig = sunArcConfigs[activeDeviceClass];
const moonArcConfig = moonArcConfigs[activeDeviceClass];

function setActiveDeviceClass(cls) {
  activeDeviceClass = cls;
  // Copy active config values into the shared reference so all consumers see the change
  const src = sunArcConfigs[cls];
  sunArcConfig.azStart = src.azStart;
  sunArcConfig.azEnd = src.azEnd;
  sunArcConfig.elevPeak = src.elevPeak;
  // Moon arc
  const msrc = moonArcConfigs[cls];
  moonArcConfig.azCenter = msrc.azCenter;
  moonArcConfig.elevBase = msrc.elevBase;
  moonArcConfig.elevArc = msrc.elevArc;
  moonArcConfig.azDrift = msrc.azDrift;
}

// Real-world hour boundaries for each phase
const DNC_HOUR_RANGES = [
  [6, 8],    // Dawn:  06:00 → 08:00
  [8, 19],   // Noon:  08:00 → 19:00
  [19, 21],  // Dusk:  19:00 → 21:00
  [21, 30],  // Night: 21:00 → 30:00 (i.e. 06:00 next day)
];

// Convert device clock to cycleTime (0–600)
function dnc_clockToCycleTime() {
  const now = new Date();
  // Current time as fractional hours (0–24), e.g. 14:30 = 14.5
  let h = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  // Wrap post-midnight hours into the night range: 0–6 → 24–30
  if (h < 6) h += 24;
  // Find which phase this clock hour falls into
  for (let i = 0; i < 4; i++) {
    const [start, end] = DNC_HOUR_RANGES[i];
    if (h >= start && h < end) {
      const t = (h - start) / (end - start); // 0–1 progress within this phase
      return DNC_STARTS[i] + t * DNC_DURS[i];
    }
  }
  return 0; // fallback (shouldn't reach)
}

const dnc_state = {
  cycleTime: dnc_clockToCycleTime(), // synced to device clock
  phase: 0,              // 0=Dawn,1=Noon,2=Dusk,3=Night
  phaseT: 0,             // 0..1 progress within current phase
  paused: false,         // true when user forces a phase
  forcedPhase: -1,       // -1 = auto, 0..3 = forced
  forcedMoonPhase: -1,   // -1 = auto (real lunar), 0..7 = forced phase index
  _lastForcedMoon: -1,   // cache guard — prevents re-compositing every frame
  lastFrameTime: -1,     // for delta calculation
  sunAngle: 0,           // radians, 0=horizon east, PI/2=zenith, PI=horizon west
  sunElevDeg: 0,         // current sun elevation in degrees (for sky gradient)
  timeLapse: false,      // true = cycling 0–600 in 10 seconds, looping
};

// --- Sky gradient palettes (4 stops × 11 colors each) ---
const DNC_SKY_WARM = [
  {p:0.00, c:[12,15,45]},  {p:0.08, c:[25,20,60]},  {p:0.18, c:[50,30,75]},
  {p:0.30, c:[80,40,80]},  {p:0.42, c:[120,60,75]},  {p:0.55, c:[170,95,75]},
  {p:0.67, c:[210,140,90]},{p:0.78, c:[240,175,120]},{p:0.88, c:[255,200,150]},
  {p:0.95, c:[255,215,175]},{p:1.00, c:[250,200,165]},
];
const DNC_SKY_DAY = [
  {p:0.00, c:[10,30,58]},  {p:0.08, c:[14,52,104]}, {p:0.18, c:[26,80,144]},
  {p:0.30, c:[38,112,184]},{p:0.42, c:[56,144,208]}, {p:0.55, c:[80,168,224]},
  {p:0.67, c:[114,192,236]},{p:0.78, c:[152,214,244]},{p:0.88, c:[188,230,248]},
  {p:0.95, c:[216,240,244]},{p:1.00, c:[200,228,224]},
];
const DNC_SKY_DUSK = [
  {p:0.00, c:[10,12,40]},  {p:0.08, c:[20,18,55]},  {p:0.18, c:[40,22,65]},
  {p:0.30, c:[90,30,60]},  {p:0.42, c:[160,50,45]},  {p:0.55, c:[200,80,40]},
  {p:0.67, c:[230,120,50]},{p:0.78, c:[245,155,70]}, {p:0.88, c:[255,185,100]},
  {p:0.95, c:[255,200,130]},{p:1.00, c:[240,180,120]},
];
const DNC_SKY_NIGHT = [
  {p:0.00, c:[2,3,12]},    {p:0.08, c:[4,6,20]},    {p:0.18, c:[6,10,30]},
  {p:0.30, c:[8,14,38]},   {p:0.42, c:[10,18,44]},   {p:0.55, c:[12,22,50]},
  {p:0.67, c:[14,26,55]},  {p:0.78, c:[16,30,58]},   {p:0.88, c:[18,34,60]},
  {p:0.95, c:[16,30,52]},  {p:1.00, c:[12,24,42]},
];
const DNC_SKY_PALETTES = [DNC_SKY_WARM, DNC_SKY_DAY, DNC_SKY_DUSK, DNC_SKY_NIGHT];

// --- Water tint per phase ---
const DNC_WATER_DAWN = { r:1.4, g:0.85, b:0.88, specHex:0xffb8a0 };
const DNC_WATER_NOON = { r:1.0, g:1.0,  b:1.0,  specHex:0xffe8c0 };
const DNC_WATER_DUSK = { r:1.6, g:0.7,  b:0.65, specHex:0xff6030 };
const DNC_WATER_NIGHT= { r:0.3, g:0.4,  b:0.7,  specHex:0x4060a0 };
const DNC_WATER_TINTS = [DNC_WATER_DAWN, DNC_WATER_NOON, DNC_WATER_DUSK, DNC_WATER_NIGHT];

// --- Sun light settings per phase ---
const DNC_LIGHT_DAWN  = { col:0xffb080, int:2.2, hSky:0xd09870, hGnd:0xc0a080, hInt:0.45, exp:1.8 };
const DNC_LIGHT_NOON  = { col:0xffe8c0, int:2.5, hSky:0x60b8e0, hGnd:0xe8d8b0, hInt:0.6, exp:2.0 };
const DNC_LIGHT_DUSK  = { col:0xff7040, int:2.0, hSky:0xc06030, hGnd:0xa08060, hInt:0.35, exp:1.6 };
const DNC_LIGHT_NIGHT = { col:0x2040a0, int:0.0, hSky:0x101830, hGnd:0x080810, hInt:0.15, exp:0.8 };
const DNC_LIGHT_SETS  = [DNC_LIGHT_DAWN, DNC_LIGHT_NOON, DNC_LIGHT_DUSK, DNC_LIGHT_NIGHT];

// Reference to hemisphere light
let dnc_hemiLight = null;
scene.traverse(c => { if (!dnc_hemiLight && c.isHemisphereLight) dnc_hemiLight = c; });

// --- Celestial: Sun — billboard sprite with radial gradient ---
function dnc_makeSunTexture(size) {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const cx = size / 2, cy = size / 2;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cx);
  grad.addColorStop(0.00, 'rgba(255,255,250,1.0)');
  grad.addColorStop(0.04, 'rgba(255,250,220,1.0)');
  grad.addColorStop(0.08, 'rgba(255,235,160,0.95)');
  grad.addColorStop(0.14, 'rgba(255,210,100,0.8)');
  grad.addColorStop(0.22, 'rgba(255,180,60,0.55)');
  grad.addColorStop(0.35, 'rgba(255,140,30,0.3)');
  grad.addColorStop(0.50, 'rgba(255,100,15,0.12)');
  grad.addColorStop(0.70, 'rgba(255,70,5,0.04)');
  grad.addColorStop(1.00, 'rgba(255,40,0,0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return c;
}
function dnc_makeSunTextureHorizon(size) {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const cx = size / 2, cy = size / 2;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cx);
  grad.addColorStop(0.00, 'rgba(255,245,230,1.0)');
  grad.addColorStop(0.04, 'rgba(255,220,160,1.0)');
  grad.addColorStop(0.08, 'rgba(255,180,80,0.95)');
  grad.addColorStop(0.14, 'rgba(255,130,40,0.8)');
  grad.addColorStop(0.22, 'rgba(255,90,20,0.55)');
  grad.addColorStop(0.35, 'rgba(255,55,10,0.3)');
  grad.addColorStop(0.50, 'rgba(220,30,5,0.14)');
  grad.addColorStop(0.70, 'rgba(180,15,0,0.05)');
  grad.addColorStop(1.00, 'rgba(140,5,0,0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return c;
}
const dnc_sunTexZenith  = new THREE.CanvasTexture(dnc_makeSunTexture(512));
const dnc_sunTexHorizon = new THREE.CanvasTexture(dnc_makeSunTextureHorizon(512));
const dnc_sunSpriteMat = new THREE.SpriteMaterial({
  map: dnc_sunTexZenith,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  transparent: true,
  opacity: 1.0,
});
const dnc_sunSprite = new THREE.Sprite(dnc_sunSpriteMat);
dnc_sunSprite.scale.set(50, 50, 1);
dnc_sunSprite.position.set(0, 200, ISLAND_Z);
scene.add(dnc_sunSprite);

// --- Moon Phase (synced to real-world lunar cycle) ---
// Mean synodic month: 29.53058770576 days.
// Reference epoch: Jan 6 2000 18:14 UTC (known new moon).
// Returns { phase: 0–1 (0=new, 0.5=full), illumination: 0–1, name: string }
const _KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14, 0);
const _SYNODIC_MONTH = 29.53058770576;
const _MS_PER_DAY = 86400000;
function getMoonPhase(date) {
  const daysSinceNew = (date.getTime() - _KNOWN_NEW_MOON) / _MS_PER_DAY;
  const phase = (((daysSinceNew % _SYNODIC_MONTH) + _SYNODIC_MONTH) % _SYNODIC_MONTH) / _SYNODIC_MONTH;
  const illumination = (1 - Math.cos(phase * 2 * Math.PI)) / 2;
  let name;
  if      (phase < 0.0625) name = 'New Moon';
  else if (phase < 0.1875) name = 'Waxing Crescent';
  else if (phase < 0.3125) name = 'First Quarter';
  else if (phase < 0.4375) name = 'Waxing Gibbous';
  else if (phase < 0.5625) name = 'Full Moon';
  else if (phase < 0.6875) name = 'Waning Gibbous';
  else if (phase < 0.8125) name = 'Last Quarter';
  else if (phase < 0.9375) name = 'Waning Crescent';
  else                     name = 'New Moon';
  return { phase, illumination, name };
}

// Current moon phase — recalculated once at startup (updated daily in tick)
let _currentMoonPhase = getMoonPhase(new Date());
let _lastMoonPhaseDay = -1; // track which day we last rendered

// --- Celestial: Moon (real-phase synced) ---
function dnc_makeFullMoonTexture(size) {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const cx = size / 2, cy = size / 2;
  const moonR = size * 0.38;

  // Deterministic pseudo-random for consistent crater placement
  let _seed = 42;
  function srand() { _seed = (_seed * 16807 + 0) % 2147483647; return (_seed & 0x7fffffff) / 0x7fffffff; }

  // Base disc — warm grey-white
  ctx.beginPath();
  ctx.arc(cx, cy, moonR, 0, Math.PI * 2);
  ctx.fillStyle = 'rgb(210, 212, 218)';
  ctx.fill();
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, moonR, 0, Math.PI * 2);
  ctx.clip();

  // Maria (dark lunar seas) — the recognizable dark patches on the full moon
  const maria = [
    { x: -0.18, y: -0.30, rx: 0.22, ry: 0.16, c: 'rgba(120,125,140,0.55)' }, // Mare Imbrium
    { x:  0.05, y: -0.12, rx: 0.13, ry: 0.18, c: 'rgba(130,133,148,0.45)' }, // Mare Serenitatis
    { x:  0.18, y:  0.05, rx: 0.15, ry: 0.20, c: 'rgba(125,128,143,0.50)' }, // Mare Tranquillitatis
    { x: -0.05, y:  0.15, rx: 0.20, ry: 0.12, c: 'rgba(135,138,150,0.40)' }, // Mare Nubium
    { x: -0.25, y:  0.00, rx: 0.10, ry: 0.14, c: 'rgba(128,131,145,0.45)' }, // Mare Humorum
    { x:  0.10, y: -0.32, rx: 0.10, ry: 0.08, c: 'rgba(130,135,148,0.40)' }, // Mare Frigoris
    { x:  0.30, y:  0.05, rx: 0.08, ry: 0.12, c: 'rgba(125,130,142,0.50)' }, // Mare Crisium
    { x: -0.10, y:  0.30, rx: 0.12, ry: 0.08, c: 'rgba(132,135,148,0.35)' }, // Mare Cognitum
  ];
  for (const m of maria) {
    ctx.save();
    ctx.translate(cx + m.x * moonR, cy + m.y * moonR);
    ctx.rotate(srand() * 0.5 - 0.25);
    ctx.beginPath();
    ctx.ellipse(0, 0, m.rx * moonR, m.ry * moonR, 0, 0, Math.PI * 2);
    // Soft edges via radial gradient
    const mGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(m.rx, m.ry) * moonR);
    mGrad.addColorStop(0.0, m.c);
    mGrad.addColorStop(0.6, m.c);
    mGrad.addColorStop(1.0, m.c.replace(/[\d.]+\)$/, '0.0)'));
    ctx.fillStyle = mGrad;
    ctx.fill();
    ctx.restore();
  }

  // Craters — scattered across the surface
  for (let i = 0; i < 35; i++) {
    const angle = srand() * Math.PI * 2;
    const dist = srand() * 0.85;
    const crX = cx + Math.cos(angle) * dist * moonR;
    const crY = cy + Math.sin(angle) * dist * moonR;
    const crR = (1.5 + srand() * 5) * (size / 256);
    // Crater rim (slightly brighter ring)
    ctx.beginPath();
    ctx.arc(crX, crY, crR * 1.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(230,232,240,' + (0.15 + srand() * 0.15) + ')';
    ctx.fill();
    // Crater shadow (darker center)
    ctx.beginPath();
    ctx.arc(crX + crR * 0.2, crY + crR * 0.2, crR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(140,145,160,' + (0.2 + srand() * 0.2) + ')';
    ctx.fill();
  }

  // A few prominent bright ray craters (like Tycho, Copernicus)
  const rayCraters = [
    { x: -0.05, y: 0.32, r: 0.035 },  // Tycho
    { x: -0.20, y: -0.08, r: 0.03 },  // Copernicus
  ];
  for (const rc of rayCraters) {
    const rcX = cx + rc.x * moonR;
    const rcY = cy + rc.y * moonR;
    const rcR = rc.r * moonR;
    // Bright splash rays
    for (let r = 0; r < 6; r++) {
      const rayAngle = r * Math.PI / 3 + srand() * 0.3;
      const rayLen = rcR * (4 + srand() * 5);
      ctx.beginPath();
      ctx.moveTo(rcX, rcY);
      ctx.lineTo(rcX + Math.cos(rayAngle) * rayLen, rcY + Math.sin(rayAngle) * rayLen);
      ctx.lineWidth = rcR * 0.5;
      ctx.strokeStyle = 'rgba(220,222,235,0.12)';
      ctx.stroke();
    }
    // Bright center
    ctx.beginPath();
    ctx.arc(rcX, rcY, rcR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(235,237,248,0.7)';
    ctx.fill();
  }

  // Subtle noise texture for surface roughness
  const imgData = ctx.getImageData(0, 0, size, size);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const px = (i / 4) % size, py = Math.floor((i / 4) / size);
    const dx = px - cx, dy = py - cy;
    const distSq = dx * dx + dy * dy;
    if (distSq > moonR * moonR) continue;
    const noise = (srand() - 0.5) * 12;
    d[i] = Math.min(255, Math.max(0, d[i] + noise));
    d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + noise));
    d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // Limb darkening — edges dissolve into sky for distant, atmospheric look
  ctx.globalCompositeOperation = 'multiply';
  const limbGrad = ctx.createRadialGradient(cx, cy, moonR * 0.15, cx, cy, moonR);
  limbGrad.addColorStop(0.0, 'rgba(255,255,255,1.0)');
  limbGrad.addColorStop(0.5, 'rgba(245,246,250,1.0)');
  limbGrad.addColorStop(0.75, 'rgba(210,215,230,1.0)');
  limbGrad.addColorStop(0.9, 'rgba(140,150,180,1.0)');
  limbGrad.addColorStop(1.0, 'rgba(60,70,100,1.0)');
  ctx.fillStyle = limbGrad;
  ctx.fillRect(0, 0, size, size);

  // Restore clip region before edge fade (so fade can extend beyond moon disc)
  ctx.restore();

  // Soft edge fade — erode outer pixels to transparent for feathered edge
  ctx.globalCompositeOperation = 'destination-out';
  const edgeGrad = ctx.createRadialGradient(cx, cy, moonR * 0.82, cx, cy, moonR * 1.02);
  edgeGrad.addColorStop(0.0, 'rgba(0,0,0,0.0)');
  edgeGrad.addColorStop(1.0, 'rgba(0,0,0,0.7)');
  ctx.fillStyle = edgeGrad;
  ctx.fillRect(0, 0, size, size);

  ctx.globalCompositeOperation = 'source-over';

  return c;
}

function dnc_makeMoonGlowTexture(size) {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const cx = size / 2, cy = size / 2;
  // Outer glow — bright near the moon disc, fading out softly
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cx);
  grad.addColorStop(0.00, 'rgba(220, 225, 245, 0.7)');
  grad.addColorStop(0.06, 'rgba(200, 210, 240, 0.5)');
  grad.addColorStop(0.14, 'rgba(170, 185, 230, 0.3)');
  grad.addColorStop(0.25, 'rgba(140, 160, 215, 0.15)');
  grad.addColorStop(0.40, 'rgba(110, 135, 200, 0.06)');
  grad.addColorStop(0.60, 'rgba(80, 105, 180, 0.02)');
  grad.addColorStop(1.00, 'rgba(50, 70, 150, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return c;
}

// --- Moon phase shadow compositing (clipping mask approach) ---
// Uses canvas clip() to mask the lit portion of the moon, like a Photoshop clipping mask.
// The lit region is bounded by: the outer disc arc on the lit side, and the terminator
// ellipse on the shadow side. The terminator's semi-minor axis = |cos(phase * 2PI)| * moonR,
// producing the correct crescent/gibbous/quarter shapes.
const _moonPhaseCanvas = document.createElement('canvas');
_moonPhaseCanvas.width = 512; _moonPhaseCanvas.height = 512;
const _moonPhaseCtx = _moonPhaseCanvas.getContext('2d');

function dnc_applyMoonPhase(sourceCanvas, phase) {
  const size = 512;
  const cx = size / 2, cy = size / 2;
  const moonR = size * 0.38; // must match dnc_makeFullMoonTexture

  _moonPhaseCtx.clearRect(0, 0, size, size);

  // Near-full moon (>98% illumination) — skip clipping, draw full disc
  if (phase > 0.47 && phase < 0.53) {
    _moonPhaseCtx.drawImage(sourceCanvas, 0, 0, size, size);
    return _moonPhaseCanvas;
  }

  // Near-new moon (<2% illumination) — nothing visible
  if (phase < 0.02 || phase > 0.98) {
    return _moonPhaseCanvas;
  }

  const cosPhase = Math.cos(phase * 2 * Math.PI);
  // Terminator ellipse semi-minor axis (semi-major is always moonR)
  const termRx = Math.abs(cosPhase) * moonR;
  const waxing = phase <= 0.5;

  // Build the clipping path for the lit region only — no earthshine base
  // The lit region is the intersection (or union) of the outer disc and the terminator,
  // depending on whether we're in crescent (<quarter) or gibbous (>quarter) phase.
  _moonPhaseCtx.save();
  _moonPhaseCtx.beginPath();

  if (waxing) {
    // Waxing: right side is lit
    if (cosPhase >= 0) {
      _moonPhaseCtx.arc(cx, cy, moonR, -Math.PI / 2, Math.PI / 2, false);
      _moonPhaseCtx.ellipse(cx, cy, termRx, moonR, 0, Math.PI / 2, -Math.PI / 2, true);
    } else {
      _moonPhaseCtx.arc(cx, cy, moonR, -Math.PI / 2, Math.PI / 2, false);
      _moonPhaseCtx.moveTo(cx, cy + moonR); // break subpath to avoid clip-edge artifact
      _moonPhaseCtx.ellipse(cx, cy, termRx, moonR, 0, Math.PI / 2, -Math.PI / 2, false);
    }
  } else {
    // Waning: left side is lit
    if (cosPhase >= 0) {
      _moonPhaseCtx.arc(cx, cy, moonR, Math.PI / 2, -Math.PI / 2, false);
      _moonPhaseCtx.ellipse(cx, cy, termRx, moonR, 0, -Math.PI / 2, Math.PI / 2, true);
    } else {
      _moonPhaseCtx.arc(cx, cy, moonR, Math.PI / 2, -Math.PI / 2, false);
      _moonPhaseCtx.ellipse(cx, cy, termRx, moonR, 0, -Math.PI / 2, Math.PI / 2, false);
    }
  }

  _moonPhaseCtx.closePath();
  _moonPhaseCtx.clip();

  // Draw the full moon texture through the clipping mask — only lit portion shows
  _moonPhaseCtx.drawImage(sourceCanvas, 0, 0, size, size);
  _moonPhaseCtx.restore();

  // --- Feather the terminator edge ---
  // Walk along the terminator ellipse and erase a soft gradient into the lit side,
  // blurring only the shadow boundary (not the outer disc edge).
  const featherWidth = 10; // pixels of soft falloff
  const steps = 64;
  _moonPhaseCtx.save();
  // Clip to disc so feather can't bleed outside the moon
  _moonPhaseCtx.beginPath();
  _moonPhaseCtx.arc(cx, cy, moonR, 0, Math.PI * 2);
  _moonPhaseCtx.closePath();
  _moonPhaseCtx.clip();
  _moonPhaseCtx.globalCompositeOperation = 'destination-out';

  for (let i = 0; i < steps; i++) {
    const t = (i + 0.5) / steps; // 0..1 along the terminator
    const angle = -Math.PI / 2 + t * Math.PI; // top to bottom of the ellipse

    // Point on the terminator ellipse — use the shadow-side half
    // Crescent: terminator bulges toward lit side (waxing=right, waning=left)
    // Gibbous:  terminator bulges toward shadow side (waxing=left, waning=right)
    const featherOnRight = (waxing && cosPhase >= 0) || (!waxing && cosPhase < 0);
    const side = featherOnRight ? 1 : -1;
    const px = cx + side * Math.cos(angle) * termRx;
    const py = cy + Math.sin(angle) * moonR;

    // Feather direction: into the lit side (away from shadow)
    // For waxing, lit side is right (+X); for waning, lit side is left (-X)
    // For crescent (cosPhase>=0), terminator bulges toward lit side
    // For gibbous (cosPhase<0), terminator bulges toward shadow side
    const intoLit = waxing ? 1 : -1;

    // Radial gradient: from opaque (on the terminator) to transparent (into the lit area)
    const grad = _moonPhaseCtx.createRadialGradient(px, py, 0, px, py, featherWidth);
    grad.addColorStop(0, 'rgba(0,0,0,0.5)');
    grad.addColorStop(0.5, 'rgba(0,0,0,0.2)');
    grad.addColorStop(1, 'rgba(0,0,0,0.0)');
    _moonPhaseCtx.fillStyle = grad;
    _moonPhaseCtx.fillRect(px - featherWidth, py - featherWidth, featherWidth * 2, featherWidth * 2);
  }
  _moonPhaseCtx.restore();

  return _moonPhaseCanvas;
}

// Base full moon texture (procedural) — kept as source for phase compositing
const _moonBaseCanvas = dnc_makeFullMoonTexture(512);
let _moonBaseSource = _moonBaseCanvas; // swapped to PNG image once loaded

// Initial texture with current phase applied
const dnc_moonTex = new THREE.CanvasTexture(
  dnc_applyMoonPhase(_moonBaseCanvas, _currentMoonPhase.phase)
);
const dnc_moonSpriteMat = new THREE.SpriteMaterial({
  map: dnc_moonTex,
  blending: THREE.NormalBlending,
  depthWrite: false,
  transparent: true,
  opacity: 0.0,
});
new THREE.TextureLoader().load('./assets/moon.png', (tex) => {
  // Draw PNG onto a canvas so we can composite phase shadow onto it
  const img = tex.image;
  const pngCanvas = document.createElement('canvas');
  pngCanvas.width = 512; pngCanvas.height = 512;
  const pctx = pngCanvas.getContext('2d');
  pctx.drawImage(img, 0, 0, 512, 512);
  _moonBaseSource = pngCanvas;
  // Re-apply phase to the PNG source
  dnc_applyMoonPhase(pngCanvas, _currentMoonPhase.phase);
  dnc_moonTex.image = _moonPhaseCanvas;
  dnc_moonTex.needsUpdate = true;
});
const dnc_moonSprite = new THREE.Sprite(dnc_moonSpriteMat);
dnc_moonSprite.scale.set(18, 18, 1);
dnc_moonSprite.position.set(0, -200, ISLAND_Z);
dnc_moonSprite.visible = false;
dnc_moonSprite.renderOrder = -1;  // render after stars (-2) so moon occludes them
scene.add(dnc_moonSprite);

const dnc_moonGlowTex = new THREE.CanvasTexture(dnc_makeMoonGlowTexture(256));
const dnc_moonGlowMat = new THREE.SpriteMaterial({
  map: dnc_moonGlowTex,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  transparent: true,
  opacity: 0.0,
});
const dnc_moonGlowSprite = new THREE.Sprite(dnc_moonGlowMat);
dnc_moonGlowSprite.scale.set(80, 80, 1);
dnc_moonGlowSprite.position.set(0, -200, ISLAND_Z);
dnc_moonGlowSprite.visible = false;
dnc_moonGlowSprite.renderOrder = -1;  // same layer as moon disc
scene.add(dnc_moonGlowSprite);

// --- Celestial: Stars (GPU-twinkled, varied colors/sizes) ---
const _moonClipVec = new THREE.Vector3();  // reused for moon-to-clip projection
const STAR_COUNT = 2580; // 2500 procedural + 20 named bright + 60 constellation stars
const _starPos = new Float32Array(STAR_COUNT * 3);
const _starSizes = new Float32Array(STAR_COUNT);
const _starColors = new Float32Array(STAR_COUNT * 3);
const _starPhases = new Float32Array(STAR_COUNT);
const _starSpeeds = new Float32Array(STAR_COUNT);
const SKY_R = 480;

// Helper: convert RA (hours) + Dec (degrees) to sky sphere position
// Observer latitude -16 deg. Stars are placed on a sphere centered at origin.
function raDecToSky(raH, decDeg) {
  // Convert to radians
  const ra = raH / 24 * Math.PI * 2;
  const dec = decDeg * Math.PI / 180;
  const lat = -16 * Math.PI / 180;
  // Altitude & azimuth (simplified — hour angle ≈ 0 for "transit" placement)
  const sinAlt = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat);
  const alt = Math.asin(Math.max(-1, Math.min(1, sinAlt)));
  if (alt < -0.05) return null; // below horizon
  const cosAz = (Math.sin(dec) - sinAlt * Math.sin(lat)) / (Math.cos(alt) * Math.cos(lat) + 1e-10);
  const az = ra; // use RA directly as azimuth for spread across sky
  const phi = Math.PI / 2 - alt; // zenith=0, horizon=PI/2
  return {
    x: SKY_R * Math.sin(phi) * Math.cos(az),
    y: SKY_R * Math.cos(phi),
    z: SKY_R * Math.sin(phi) * Math.sin(az),
  };
}

// Procedural stars (0..2499) — realistic magnitude distribution
// Most stars are dim, a handful are bright, creating natural depth
for (let i = 0; i < 2500; i++) {
  const theta = Math.random() * Math.PI * 2;
  let phi;
  if (i < 800) {
    // Galactic plane cluster band — denser region across the sky
    phi = 0.25 + (Math.random() - 0.5) * 0.22;
  } else {
    phi = Math.random() * Math.PI * 0.48;
  }
  // Store as unit direction; will be offset from camera each frame
  const dx = Math.sin(phi) * Math.cos(theta);
  const dy = Math.cos(phi);
  const dz = Math.sin(phi) * Math.sin(theta);
  _starPos[i * 3]     = dx * SKY_R;
  _starPos[i * 3 + 1] = dy * SKY_R;
  _starPos[i * 3 + 2] = dz * SKY_R;

  // Size distribution: mostly pinpoints, a few medium, rare bright ones
  const sizeRoll = Math.random();
  _starSizes[i] = sizeRoll < 0.60 ? 0.6 + Math.random() * 0.6    // pinpoint: ~60%
                 : sizeRoll < 0.85 ? 1.2 + Math.random() * 1.0    // small: ~25%
                 : sizeRoll < 0.96 ? 2.2 + Math.random() * 1.3    // medium: ~11%
                 : 3.5 + Math.random() * 1.5;                      // bright: ~4%

  // Color temperature distribution
  const temp = Math.random();
  if (temp < 0.25) { // warm/golden
    _starColors[i * 3] = 1.0; _starColors[i * 3 + 1] = 0.82 + Math.random() * 0.08; _starColors[i * 3 + 2] = 0.60 + Math.random() * 0.15;
  } else if (temp < 0.65) { // neutral white
    _starColors[i * 3] = 1.0; _starColors[i * 3 + 1] = 0.95 + Math.random() * 0.05; _starColors[i * 3 + 2] = 0.90 + Math.random() * 0.1;
  } else { // blue-white (hot stars)
    _starColors[i * 3] = 0.72 + Math.random() * 0.1; _starColors[i * 3 + 1] = 0.80 + Math.random() * 0.1; _starColors[i * 3 + 2] = 1.0;
  }

  _starPhases[i] = Math.random() * Math.PI * 2;
  _starSpeeds[i] = 0.3 + Math.random() * 2.0;
}

// Named bright stars (2500..2519) — approximate positions for Bora Bora's sky
const _brightStars = [
  // [RA hours, Dec degrees, size, R, G, B]
  [6.75, -17, 6.0, 0.7, 0.8, 1.0],    // Sirius (brightest star)
  [6.40, -53, 5.5, 1.0, 0.95, 0.8],    // Canopus
  [14.66, -61, 5.0, 1.0, 0.92, 0.7],   // Alpha Centauri
  [1.63, -57, 4.5, 0.75, 0.82, 1.0],   // Achernar
  [22.96, -30, 4.0, 1.0, 1.0, 1.0],    // Fomalhaut
  [16.49, -26, 4.5, 1.0, 0.6, 0.3],    // Antares (red)
  [13.42, -11, 4.0, 0.75, 0.8, 1.0],   // Spica
  [5.24, -8, 5.0, 0.7, 0.8, 1.0],      // Rigel
  [5.92, 7, 5.0, 1.0, 0.65, 0.3],      // Betelgeuse (orange)
  [4.60, 16, 4.0, 1.0, 0.75, 0.45],    // Aldebaran
  [7.75, 28, 3.5, 1.0, 0.82, 0.55],    // Pollux
  [19.85, 9, 4.0, 1.0, 1.0, 0.95],     // Altair
  [12.44, -63, 4.5, 0.75, 0.82, 1.0],  // Acrux (Southern Cross)
  [12.79, -60, 4.0, 0.75, 0.82, 1.0],  // Mimosa (Southern Cross)
  [14.06, -60, 4.5, 0.7, 0.78, 1.0],   // Hadar
  [7.65, 5, 4.0, 1.0, 0.95, 0.75],     // Procyon
  [10.14, 12, 3.5, 0.78, 0.84, 1.0],   // Regulus
  [14.26, 19, 4.0, 1.0, 0.72, 0.35],   // Arcturus (orange)
  [18.62, 39, 3.5, 0.78, 0.85, 1.0],   // Vega (low on horizon)
  [20.69, 45, 3.0, 1.0, 1.0, 0.95],    // Deneb (barely visible)
];
for (let j = 0; j < _brightStars.length; j++) {
  const i = 2500 + j;
  const [raH, decDeg, sz, r, g, b] = _brightStars[j];
  const pos = raDecToSky(raH, decDeg);
  if (pos) {
    _starPos[i * 3] = pos.x; _starPos[i * 3 + 1] = pos.y; _starPos[i * 3 + 2] = pos.z;
  } else {
    // Below horizon — place at horizon edge
    const az = raH / 24 * Math.PI * 2;
    _starPos[i * 3] = SKY_R * Math.cos(az); _starPos[i * 3 + 1] = 5; _starPos[i * 3 + 2] = SKY_R * Math.sin(az);
  }
  _starSizes[i] = sz;
  _starColors[i * 3] = r; _starColors[i * 3 + 1] = g; _starColors[i * 3 + 2] = b;
  _starPhases[i] = Math.random() * Math.PI * 2;
  _starSpeeds[i] = 0.3 + Math.random() * 0.5; // bright stars twinkle slower
}

// Constellation member stars (2520+) — additional stars needed to draw proper stick figures
// Each: [RA hours, Dec degrees, size, R, G, B, label]
// These are the dimmer members that complete famous constellation shapes
const _constellStars = [
  // --- ORION (indices 0-6, global 2520-2526) ---
  // Existing: Rigel=bright[7]=2507, Betelgeuse=bright[8]=2508
  [5.42, -1.2, 2.8, 0.75, 0.82, 1.0],    // 0: Mintaka (Belt left)
  [5.60, -1.95, 3.0, 0.78, 0.84, 1.0],   // 1: Alnilam (Belt center)
  [5.68, -1.94, 2.8, 0.75, 0.82, 1.0],   // 2: Alnitak (Belt right)
  [5.42, 6.35, 3.2, 0.72, 0.80, 1.0],    // 3: Bellatrix (right shoulder)
  [5.80, -9.67, 2.8, 0.70, 0.78, 1.0],   // 4: Saiph (left foot)
  // --- SCORPIUS (indices 5-13, global 2525-2533) ---
  // Existing: Antares=bright[5]=2505
  [16.01, -22.6, 2.5, 0.78, 0.82, 1.0],  // 5: Dschubba (head top)
  [16.09, -19.8, 2.2, 0.80, 0.84, 1.0],  // 6: Graffias/Acrab (head)
  [16.36, -25.6, 2.0, 0.78, 0.80, 1.0],  // 7: Pi Scorpii (below head)
  [16.84, -34.3, 2.3, 0.76, 0.80, 1.0],  // 8: Epsilon Sco (body)
  [17.20, -37.3, 2.0, 0.74, 0.78, 1.0],  // 9: Mu1 Sco (lower body)
  [17.42, -37.1, 2.0, 0.74, 0.78, 1.0],  // 10: Zeta Sco
  [17.56, -37.0, 2.5, 0.78, 0.82, 1.0],  // 11: Eta Sco (tail curve)
  [17.62, -43.0, 3.0, 0.80, 0.85, 1.0],  // 12: Sargas (tail)
  [17.71, -39.0, 3.2, 0.72, 0.80, 1.0],  // 13: Shaula (stinger)
  // --- CRUX / Southern Cross (indices 14-15, global 2534-2535) ---
  // Existing: Acrux=bright[12]=2512, Mimosa=bright[13]=2513
  [12.52, -57.1, 3.0, 1.0, 0.70, 0.35],  // 14: Gacrux (top, orange)
  [12.25, -58.7, 2.5, 0.75, 0.82, 1.0],  // 15: Delta Crucis (left)
  // --- CANIS MAJOR (indices 16-19, global 2536-2539) ---
  // Existing: Sirius=bright[0]=2500
  [6.38, -18.0, 2.8, 0.72, 0.80, 1.0],   // 16: Mirzam
  [7.14, -26.4, 2.5, 1.0, 0.92, 0.70],   // 17: Wezen
  [6.98, -29.0, 2.8, 0.72, 0.78, 1.0],   // 18: Adhara
  [7.40, -29.3, 2.2, 0.70, 0.78, 1.0],   // 19: Aludra
  // --- TAURUS (indices 20-22, global 2540-2542) ---
  // Existing: Aldebaran=bright[9]=2509
  [5.44, 28.6, 2.8, 0.72, 0.78, 1.0],    // 20: Elnath (horn tip)
  [4.33, 15.6, 2.2, 1.0, 0.90, 0.70],    // 21: Hyadum I (V cluster)
  [4.48, 19.2, 2.0, 0.85, 0.82, 0.70],   // 22: Theta2 Tau (V cluster)
  // --- LEO (indices 23-27, global 2543-2547) ---
  // Existing: Regulus=bright[16]=2516
  [11.24, 20.5, 2.5, 0.80, 0.85, 1.0],   // 23: Denebola (tail)
  [10.33, 19.8, 2.2, 0.85, 0.88, 1.0],   // 24: Zosma
  [10.28, 23.4, 2.0, 0.80, 0.84, 1.0],   // 25: Theta Leo
  [10.14, 16.8, 2.2, 0.82, 0.86, 1.0],   // 26: Eta Leo (near Regulus)
  [9.88, 26.0, 2.0, 0.78, 0.82, 1.0],    // 27: Mu Leo
  // --- GEMINI (indices 28-30, global 2548-2550) ---
  // Existing: Pollux=bright[10]=2510
  [7.58, 32.0, 3.0, 0.80, 0.85, 1.0],    // 28: Castor
  [6.73, 25.1, 2.0, 0.82, 0.85, 1.0],    // 29: Mebsuta
  [6.38, 22.5, 2.0, 0.80, 0.84, 1.0],    // 30: Tejat
  // --- CENTAURUS pointers (indices 31-32, global 2551-2552) ---
  // Existing: Alpha Cen=bright[2]=2502, Hadar=bright[14]=2514
  [13.93, -42.1, 2.5, 0.78, 0.82, 1.0],  // 31: Menkent
  [14.11, -36.4, 2.0, 0.75, 0.80, 1.0],  // 32: Eta Centauri
  // --- URSA MAJOR / Big Dipper (indices 33-39, global 2553-2559) ---
  // "De Grote Beer" — the famous pan/saucepan shape, low on northern horizon from Bora Bora
  [11.06, 61.75, 3.5, 1.0, 0.90, 0.65],  // 33: Dubhe (α UMa, front of bowl)
  [11.03, 56.38, 3.2, 0.82, 0.85, 1.0],  // 34: Merak (β UMa, bottom of bowl)
  [11.90, 53.69, 3.0, 0.82, 0.85, 1.0],  // 35: Phecda (γ UMa, bottom-back of bowl)
  [12.26, 57.03, 2.8, 0.80, 0.84, 1.0],  // 36: Megrez (δ UMa, top-back of bowl)
  [12.90, 55.96, 3.2, 0.82, 0.86, 1.0],  // 37: Alioth (ε UMa, handle start)
  [13.40, 54.93, 3.2, 0.82, 0.86, 1.0],  // 38: Mizar (ζ UMa, handle middle)
  [13.79, 49.31, 3.0, 0.80, 0.84, 1.0],  // 39: Alkaid (η UMa, handle end)
];
for (let j = 0; j < _constellStars.length; j++) {
  const i = 2520 + j;
  const [raH, decDeg, sz, r, g, b] = _constellStars[j];
  const pos = raDecToSky(raH, decDeg);
  if (pos) {
    _starPos[i * 3] = pos.x; _starPos[i * 3 + 1] = pos.y; _starPos[i * 3 + 2] = pos.z;
  } else {
    const az = raH / 24 * Math.PI * 2;
    _starPos[i * 3] = SKY_R * Math.cos(az); _starPos[i * 3 + 1] = 5; _starPos[i * 3 + 2] = SKY_R * Math.sin(az);
  }
  _starSizes[i] = sz;
  _starColors[i * 3] = r; _starColors[i * 3 + 1] = g; _starColors[i * 3 + 2] = b;
  _starPhases[i] = Math.random() * Math.PI * 2;
  _starSpeeds[i] = 0.3 + Math.random() * 0.5;
}

const dnc_starGeo = new THREE.BufferGeometry();
dnc_starGeo.setAttribute('position', new THREE.BufferAttribute(_starPos, 3));
dnc_starGeo.setAttribute('aSize', new THREE.BufferAttribute(_starSizes, 1));
dnc_starGeo.setAttribute('aColor', new THREE.BufferAttribute(_starColors, 3));
dnc_starGeo.setAttribute('aPhase', new THREE.BufferAttribute(_starPhases, 1));
dnc_starGeo.setAttribute('aSpeed', new THREE.BufferAttribute(_starSpeeds, 1));

const _starVert = `
  uniform float uTime;
  uniform float uOpacity;
  uniform float uPixelRatio;
  uniform vec4 uMoonClip;
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;
  attribute float aSpeed;
  varying vec3 vColor;
  varying float vTwinkle;
  varying float vSize;
  varying vec2 vScreenPos;
  void main() {
    vColor = aColor;
    // Dual-wave twinkle — some stars barely flicker, others pulse noticeably
    float t1 = sin(uTime * aSpeed + aPhase) * 0.5 + 0.5;
    float t2 = sin(uTime * aSpeed * 1.7 + aPhase * 2.3) * 0.5 + 0.5;
    vTwinkle = 0.5 + 0.5 * t1 * t2;
    vSize = aSize;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    // Direct pixel sizing — aSize IS the screen pixel diameter
    gl_PointSize = aSize * uPixelRatio;
    gl_Position = projectionMatrix * mvPosition;
    vScreenPos = gl_Position.xy / gl_Position.w;
  }
`;
const _starFrag = `
  uniform float uOpacity;
  uniform vec4 uMoonClip;
  varying vec3 vColor;
  varying float vTwinkle;
  varying float vSize;
  varying vec2 vScreenPos;
  void main() {
    // Discard stars behind the moon disc (uMoonClip = moonScreenX, moonScreenY, radius, active)
    if (uMoonClip.w > 0.5) {
      float dMoon = length(vScreenPos - uMoonClip.xy);
      if (dMoon < uMoonClip.z) discard;
    }
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    if (dist > 0.5) discard;
    // Bright core with soft glow halo — bigger stars get a wider glow
    float core = exp(-dist * dist * 18.0);   // tight bright center
    float glow = exp(-dist * dist * 5.0);    // softer halo
    float alpha = mix(glow, core, 0.6);
    // Brighter stars get boosted intensity (non-linear)
    float brightBoost = 1.0 + step(5.0, vSize) * 0.4;
    gl_FragColor = vec4(vColor * vTwinkle * brightBoost, alpha * uOpacity * vTwinkle);
  }
`;

const dnc_starMat = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uOpacity: { value: 0 },
    uPixelRatio: { value: renderer.getPixelRatio() },
    uMoonClip: { value: new THREE.Vector4(0, 0, 0, 0) },
  },
  vertexShader: _starVert,
  fragmentShader: _starFrag,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
const dnc_stars = new THREE.Points(dnc_starGeo, dnc_starMat);
dnc_stars.renderOrder = -2;  // render before moon so stars don't show through
scene.add(dnc_stars);


// --- Celestial: Shooting Stars ---
const SHOOT_SEGMENTS = 20;
const _shootPos = new Float32Array(SHOOT_SEGMENTS * 3);
const _shootAlpha = new Float32Array(SHOOT_SEGMENTS);
const _shootGeo = new THREE.BufferGeometry();
_shootGeo.setAttribute('position', new THREE.BufferAttribute(_shootPos, 3));
_shootGeo.setAttribute('aAlpha', new THREE.BufferAttribute(_shootAlpha, 1));

const _shootVert = `
  attribute float aAlpha;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const _shootFrag = `
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(1.0, 0.98, 0.9, vAlpha);
  }
`;

const _shootMat = new THREE.ShaderMaterial({
  vertexShader: _shootVert,
  fragmentShader: _shootFrag,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
const dnc_shootLine = new THREE.Line(_shootGeo, _shootMat);
dnc_shootLine.visible = false;
dnc_shootLine.frustumCulled = false;
scene.add(dnc_shootLine);

// Shooting star state (pre-allocated, reused)
const _shootState = {
  active: false,
  startTime: 0,
  duration: 0,
  startPos: [0, 0, 0],
  dir: [0, 0, 0],
  speed: 0,
  nextSpawnTime: 0,
  spawnCount: 0,
};

// --- Night Horizon Glow (ambient atmospheric glow at night) ---
// A subtle deep-blue/indigo band at the horizon that appears during night
const _nightGlowGeo = new THREE.CylinderGeometry(500, 500, 30, 48, 6, true);
const _ngPos = _nightGlowGeo.attributes.position;
const _ngAlphas = new Float32Array(_ngPos.count);
const _ngColors = new Float32Array(_ngPos.count * 3);
for (let i = 0; i < _ngPos.count; i++) {
  const y = _ngPos.getY(i);
  const ny = (y + 15) / 30; // 0 at bottom, 1 at top
  // Peak glow just above the waterline (~30% height), soft falloff above
  const peak = 0.30;
  const spread = 0.22;
  _ngAlphas[i] = Math.exp(-((ny - peak) * (ny - peak)) / (2 * spread * spread));
  // Deep blue-indigo color — slight warmth near horizon
  const warmth = Math.exp(-((ny - 0.25) * (ny - 0.25)) / 0.08);
  _ngColors[i * 3]     = 0.08 + warmth * 0.10;  // R: touch of warm near waterline
  _ngColors[i * 3 + 1] = 0.10 + warmth * 0.05;  // G: slight green
  _ngColors[i * 3 + 2] = 0.25 + (1 - ny) * 0.10; // B: deeper blue toward bottom
}
_nightGlowGeo.setAttribute('aAlpha', new THREE.BufferAttribute(_ngAlphas, 1));

const _nightGlowVert = `
  attribute float aAlpha;
  attribute vec3 color;
  varying float vAlpha;
  varying vec3 vCol;
  void main() {
    vAlpha = aAlpha;
    vCol = color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const _nightGlowFrag = `
  uniform float uOpacity;
  varying float vAlpha;
  varying vec3 vCol;
  void main() {
    gl_FragColor = vec4(vCol, vAlpha * uOpacity);
  }
`;
_nightGlowGeo.setAttribute('color', new THREE.BufferAttribute(_ngColors, 3));
const _nightGlowMat = new THREE.ShaderMaterial({
  uniforms: { uOpacity: { value: 0 } },
  vertexShader: _nightGlowVert,
  fragmentShader: _nightGlowFrag,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  side: THREE.BackSide,
});
const dnc_nightGlow = new THREE.Mesh(_nightGlowGeo, _nightGlowMat);
dnc_nightGlow.position.set(0, -4, 0); // slightly below waterline center
dnc_nightGlow.renderOrder = -3; // behind stars and moon
scene.add(dnc_nightGlow);

// ============================================================
// UNDERWATER BACKDROP
// ============================================================
const uwBgCanvas = document.createElement('canvas');
uwBgCanvas.width = 4; uwBgCanvas.height = 512;
const uwBgCtx = uwBgCanvas.getContext('2d');
const uwGrad = uwBgCtx.createLinearGradient(0, 0, 0, 512);
uwGrad.addColorStop(0.0, '#28d8cc');
uwGrad.addColorStop(0.15, '#20c0b4');
uwGrad.addColorStop(0.35, '#18a89c');
uwGrad.addColorStop(0.55, '#109080');
uwGrad.addColorStop(0.75, '#087868');
uwGrad.addColorStop(1.0, '#046050');
uwBgCtx.fillStyle = uwGrad;
uwBgCtx.fillRect(0, 0, 4, 512);
const uwBgTex = new THREE.CanvasTexture(uwBgCanvas);

const uwBackdrop = new THREE.Mesh(
  new THREE.CylinderGeometry(250, 250, 40, 32, 1, true),
  new THREE.MeshBasicMaterial({ map: uwBgTex, side: THREE.BackSide, depthWrite: false })
);
uwBackdrop.position.set(0, -20, 0);
scene.add(uwBackdrop);

// ============================================================
// HORIZON GLOW — wide translucent band at the waterline that picks up sky colors
// ============================================================
const horizGlowGeo = new THREE.CylinderGeometry(520, 520, 18, 64, 8, true);
const hgPos = horizGlowGeo.attributes.position;
const hgColors = new Float32Array(hgPos.count * 4);
for (let i = 0; i < hgPos.count; i++) {
  const y = hgPos.getY(i);
  const ny = (y + 9) / 18;
  const peak = 0.35;
  const spread = 0.28;
  const alpha = Math.exp(-((ny - peak) * (ny - peak)) / (2 * spread * spread));
  hgColors[i * 4]     = 1.0;
  hgColors[i * 4 + 1] = 0.7;
  hgColors[i * 4 + 2] = 0.5;
  hgColors[i * 4 + 3] = alpha * 0.6;
}
horizGlowGeo.setAttribute('color', new THREE.BufferAttribute(hgColors, 4));
const horizGlowMat = new THREE.MeshBasicMaterial({
  vertexColors: true,
  transparent: true,
  depthWrite: false,
  side: THREE.BackSide,
  blending: THREE.NormalBlending,
});
const horizGlow = new THREE.Mesh(horizGlowGeo, horizGlowMat);
horizGlow.position.set(0, 0, 0);
horizGlow.renderOrder = 0;
scene.add(horizGlow);

// Store original horizon glow alpha per-vertex for DNC tinting
const dnc_horizGlowBaseAlpha = new Float32Array(hgPos.count);
for (let i = 0; i < hgPos.count; i++) {
  dnc_horizGlowBaseAlpha[i] = hgColors[i * 4 + 3];
}

// ============================================================
// WATER SURFACE
// ============================================================
const [_wSegW, _wSegH] = waterSegments();  // Settings → Graphics → Water detail (low/high)
const waterGeo = new THREE.PlaneGeometry(1200, 1200, _wSegW, _wSegH);
// Vertex colors — radial gradient: shallow turquoise near island, deep blue at edges
const waterColors = new Float32Array(waterGeo.attributes.position.count * 3);
const wPositions = waterGeo.attributes.position;
for (let i = 0; i < wPositions.count; i++) {
  const x = wPositions.getX(i);
  const y = wPositions.getY(i);
  const dist = Math.sqrt(x * x + y * y);
  const t = Math.min(1, dist / 500);
  let r, g, b;
  if (t < 0.3) {
    r = 0.09; g = 0.75; b = 0.72;
  } else {
    const s = (t - 0.3) / 0.7;
    r = 0.09 + (0.04 - 0.09) * s;
    g = 0.75 + (0.30 - 0.75) * s;
    b = 0.72 + (0.50 - 0.72) * s;
  }
  waterColors[i * 3] = r;
  waterColors[i * 3 + 1] = g;
  waterColors[i * 3 + 2] = b;
}
waterGeo.setAttribute('color', new THREE.BufferAttribute(waterColors, 3));

// INTEGRATION: Store original water colors for DNC tinting
const dnc_waterBaseColors = new Float32Array(waterColors.length);
dnc_waterBaseColors.set(waterColors);

const waterMat = new THREE.MeshPhysicalMaterial({
  vertexColors: true,
  transparent: true,
  opacity: 0.55,
  roughness: 0.01,
  metalness: 0.25,
  clearcoat: 1.0,
  side: THREE.DoubleSide,
  depthWrite: false,
});
// Clipping plane to prevent water from rendering between camera and waterline divider
const waterClipPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
waterMat.clippingPlanes = [waterClipPlane];
const waterSurface = new THREE.Mesh(waterGeo, waterMat);
waterSurface.rotation.x = -Math.PI / 2;
waterSurface.position.set(0, 0, ISLAND_Z);
waterSurface.renderOrder = 1;
scene.add(waterSurface);

// Sun specular highlight on water — additive billboard that follows wave
const sunSpecVert = `
  #include <clipping_planes_pars_vertex>
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = viewMatrix * wp;
    gl_Position = projectionMatrix * mvPosition;
    #include <clipping_planes_vertex>
  }
`;
const sunSpecFrag = `
  #include <clipping_planes_pars_fragment>
  uniform float uTime;
  uniform vec3 uSunDir;
  uniform vec3 uCamPos;
  uniform vec3 uSunColor;
  uniform float uSunIntensity;
  uniform vec3 uSunWorldPos;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    #include <clipping_planes_fragment>
    vec3 viewDir = normalize(uCamPos - vWorldPos);
    vec3 sunDir = normalize(uSunDir);
    float sunElev = clamp(sunDir.y, 0.0, 1.0);
    float lowSun = 1.0 - sunElev;

    // === GLITTER PATH GEOMETRY ===
    // Project sun & camera onto water plane
    vec2 sunXZ = uSunWorldPos.xz;
    vec2 camXZ = uCamPos.xz;
    vec2 pathAxis = normalize(sunXZ - camXZ);
    vec2 fragRel = vWorldPos.xz - camXZ;

    // Decompose fragment position into along-path and perpendicular
    float along = dot(fragRel, pathAxis);
    float perp = abs(dot(fragRel, vec2(-pathAxis.y, pathAxis.x)));

    // Path width: narrows dramatically at low sun (physics: width/length = sin(elev))
    // At near-zero elevation: very tight column ~5-10 units wide
    // At zenith: wide circular spread ~150 units
    float pathHalfWidth = max(3.0, 150.0 * sunElev * sunElev + 5.0);

    // Lateral falloff: sharp Gaussian for the column edges
    float lateralSharp = mix(1.5, 0.4, lowSun * lowSun); // sharper at low sun
    float lateral = exp(-pow(perp / pathHalfWidth, lateralSharp));

    // Distance from sun projected on water
    float distToSun = length(vWorldPos.xz - sunXZ);
    // Along-path falloff: bright near sun, fading toward camera
    float pathReach = mix(150.0, 500.0, lowSun);
    float alongFade = exp(-distToSun * distToSun / (pathReach * pathReach));
    // Keep some light even far from sun for the long column look
    float alongBase = mix(0.0, 0.15, lowSun) * exp(-distToSun / 800.0);
    float alongTotal = max(alongFade, alongBase);

    // Column mask: strongest at low sun
    float columnMask = lateral * alongTotal;

    // === WAVE-PERTURBED SPECULAR ===
    vec3 n = vNormal;
    float t = uTime;
    // Multi-octave wave perturbation
    float perturbAmt = 0.05 + lowSun * 0.15;
    n.x += sin(vWorldPos.x * 1.5 + t * 2.2) * perturbAmt
         + cos(vWorldPos.z * 1.0 + t * 1.6) * perturbAmt * 0.7
         + sin(vWorldPos.x * 3.8 + t * 3.5) * perturbAmt * 0.35
         + cos(vWorldPos.x * 8.0 + t * 5.0) * perturbAmt * 0.15;
    n.z += cos(vWorldPos.x * 1.3 + t * 1.8) * perturbAmt * 0.8
         + sin(vWorldPos.z * 1.7 + t * 1.3) * perturbAmt * 0.6
         + cos(vWorldPos.z * 4.2 + t * 3.0) * perturbAmt * 0.3
         + sin(vWorldPos.z * 9.0 + t * 4.5) * perturbAmt * 0.12;
    n = normalize(n);

    // Blinn-Phong specular: tight at high sun, broader at low
    vec3 halfDir = normalize(sunDir + viewDir);
    float specExp = mix(16.0, 180.0, sunElev);
    float spec = pow(max(dot(n, halfDir), 0.0), specExp);

    // Broad diffuse glow for column body
    float glowExp = mix(2.0, 10.0, sunElev);
    float glowStr = mix(0.6, 0.1, sunElev);
    float glow = pow(max(dot(n, halfDir), 0.0), glowExp) * glowStr;

    // === HORIZONTAL WAVE STRIATIONS ===
    // Bands of brightness across the column from wave crests
    float striation1 = sin(vWorldPos.z * 0.8 + t * 1.5) * 0.5 + 0.5;
    float striation2 = sin(vWorldPos.z * 2.2 - t * 0.8) * 0.5 + 0.5;
    float striation3 = sin(vWorldPos.z * 5.5 + t * 2.5) * 0.5 + 0.5;
    float striations = striation1 * 0.5 + striation2 * 0.3 + striation3 * 0.2;
    // Striations more visible at low sun along the column
    float striationMix = lowSun * lowSun * lateral * 0.6;
    float striationMod = mix(1.0, 0.3 + striations * 1.4, striationMix);

    // Fresnel: more reflective at grazing angles
    float fresnel = pow(1.0 - max(dot(viewDir, n), 0.0), 2.0 + sunElev * 2.0);

    // === SPARKLE GLINTS ===
    float sparkleScale = mix(3.5, 6.0, sunElev);
    vec2 sparkleUV = floor(vWorldPos.xz * sparkleScale + t * 1.2);
    float sp1 = hash(sparkleUV);
    float sp2 = hash(sparkleUV + vec2(37.0, 59.0));
    float sparkleThresh = mix(0.85, 0.95, sunElev);
    float sparkle = step(sparkleThresh, sp1) * (0.5 + 0.5 * sp2);
    // Sparkles concentrate within the column
    sparkle *= mix(0.1, 1.0, lateral);
    // Extra bright sparkles near the sun
    sparkle *= (0.4 + 0.6 * alongFade);

    // === FINAL COMBINE ===
    float base = (spec * 1.4 + glow + sparkle * 0.7) * (0.2 + fresnel * 0.8);
    base *= striationMod;

    // At low sun: column mask strongly shapes the light into a path
    // At high sun: more uniform specular
    float columnInfluence = lowSun * lowSun * 0.9 + 0.1;
    float shaped = base * mix(1.0, columnMask * 2.5, columnInfluence);

    float total = clamp(shaped * uSunIntensity, 0.0, 1.5);

    gl_FragColor = vec4(uSunColor * total, total);
  }
`;
const sunSpecMat = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uSunDir: { value: new THREE.Vector3(0.5, 0.8, 0.3) },
    uCamPos: { value: new THREE.Vector3() },
    uSunColor: { value: new THREE.Vector3(1.0, 0.95, 0.85) },
    uSunIntensity: { value: 0.75 },
    uSunWorldPos: { value: new THREE.Vector3(0, 200, 0) },
  },
  vertexShader: sunSpecVert,
  fragmentShader: sunSpecFrag,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  side: THREE.DoubleSide,
  clipping: true,
  clippingPlanes: [waterClipPlane],
});
const sunSpecPlane = new THREE.Mesh(waterGeo.clone(), sunSpecMat);
sunSpecPlane.rotation.x = -Math.PI / 2;
sunSpecPlane.position.set(0, 0.05, ISLAND_Z);
sunSpecPlane.renderOrder = 2;
sunSpecPlane.visible = false; // INTEGRATION: starts hidden, dnc_update shows it only during noon
scene.add(sunSpecPlane);

// --- Moon specular on water (same full-quality shader as sun, driven softer by intensity) ---
const _moonSpecFrag = `
  #include <clipping_planes_pars_fragment>
  uniform float uTime;
  uniform vec3 uMoonDir;
  uniform vec3 uCamPos;
  uniform vec3 uMoonColor;
  uniform float uMoonIntensity;
  uniform vec3 uMoonWorldPos;
  varying vec3 vWorldPos;
  varying vec3 vNormal;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    #include <clipping_planes_fragment>
    vec3 viewDir = normalize(uCamPos - vWorldPos);
    vec3 lightDir = normalize(uMoonDir);
    float lightElev = clamp(lightDir.y, 0.0, 1.0);
    float lowLight = 1.0 - lightElev;

    // === GLITTER PATH GEOMETRY ===
    vec2 lightXZ = uMoonWorldPos.xz;
    vec2 camXZ = uCamPos.xz;
    vec2 pathAxis = normalize(lightXZ - camXZ);
    vec2 fragRel = vWorldPos.xz - camXZ;

    float along = dot(fragRel, pathAxis);
    float perp = abs(dot(fragRel, vec2(-pathAxis.y, pathAxis.x)));

    float pathHalfWidth = max(3.0, 150.0 * lightElev * lightElev + 5.0);

    float lateralSharp = mix(1.5, 0.4, lowLight * lowLight);
    float lateral = exp(-pow(perp / pathHalfWidth, lateralSharp));

    float distToLight = length(vWorldPos.xz - lightXZ);
    float pathReach = mix(150.0, 500.0, lowLight);
    float alongFade = exp(-distToLight * distToLight / (pathReach * pathReach));
    float alongBase = mix(0.0, 0.15, lowLight) * exp(-distToLight / 800.0);
    float alongTotal = max(alongFade, alongBase);

    float columnMask = lateral * alongTotal;

    // === WAVE-PERTURBED SPECULAR ===
    vec3 n = vNormal;
    float t = uTime;
    float perturbAmt = 0.05 + lowLight * 0.15;
    n.x += sin(vWorldPos.x * 1.5 + t * 2.2) * perturbAmt
         + cos(vWorldPos.z * 1.0 + t * 1.6) * perturbAmt * 0.7
         + sin(vWorldPos.x * 3.8 + t * 3.5) * perturbAmt * 0.35
         + cos(vWorldPos.x * 8.0 + t * 5.0) * perturbAmt * 0.15;
    n.z += cos(vWorldPos.x * 1.3 + t * 1.8) * perturbAmt * 0.8
         + sin(vWorldPos.z * 1.7 + t * 1.3) * perturbAmt * 0.6
         + cos(vWorldPos.z * 4.2 + t * 3.0) * perturbAmt * 0.3
         + sin(vWorldPos.z * 9.0 + t * 4.5) * perturbAmt * 0.12;
    n = normalize(n);

    vec3 halfDir = normalize(lightDir + viewDir);
    float specExp = mix(16.0, 180.0, lightElev);
    float spec = pow(max(dot(n, halfDir), 0.0), specExp);

    float glowExp = mix(2.0, 10.0, lightElev);
    float glowStr = mix(0.6, 0.1, lightElev);
    float glow = pow(max(dot(n, halfDir), 0.0), glowExp) * glowStr;

    // === HORIZONTAL WAVE STRIATIONS ===
    float striation1 = sin(vWorldPos.z * 0.8 + t * 1.5) * 0.5 + 0.5;
    float striation2 = sin(vWorldPos.z * 2.2 - t * 0.8) * 0.5 + 0.5;
    float striation3 = sin(vWorldPos.z * 5.5 + t * 2.5) * 0.5 + 0.5;
    float striations = striation1 * 0.5 + striation2 * 0.3 + striation3 * 0.2;
    float striationMix = lowLight * lowLight * lateral * 0.6;
    float striationMod = mix(1.0, 0.3 + striations * 1.4, striationMix);

    float fresnel = pow(1.0 - max(dot(viewDir, n), 0.0), 2.0 + lightElev * 2.0);

    // === SPARKLE GLINTS ===
    float sparkleScale = mix(3.5, 6.0, lightElev);
    vec2 sparkleUV = floor(vWorldPos.xz * sparkleScale + t * 1.2);
    float sp1 = hash(sparkleUV);
    float sp2 = hash(sparkleUV + vec2(37.0, 59.0));
    float sparkleThresh = mix(0.85, 0.95, lightElev);
    float sparkle = step(sparkleThresh, sp1) * (0.5 + 0.5 * sp2);
    sparkle *= mix(0.1, 1.0, lateral);
    sparkle *= (0.4 + 0.6 * alongFade);

    // === FINAL COMBINE ===
    float base = (spec * 1.4 + glow + sparkle * 0.7) * (0.2 + fresnel * 0.8);
    base *= striationMod;

    float columnInfluence = lowLight * lowLight * 0.9 + 0.1;
    float shaped = base * mix(1.0, columnMask * 2.5, columnInfluence);

    float total = clamp(shaped * uMoonIntensity, 0.0, 1.0);

    gl_FragColor = vec4(uMoonColor * total, total);
  }
`;

const moonSpecMat = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uMoonDir: { value: new THREE.Vector3(0, 1, 0) },
    uCamPos: { value: new THREE.Vector3() },
    uMoonColor: { value: new THREE.Vector3(0.6, 0.65, 0.85) },
    uMoonIntensity: { value: 0.0 },
    uMoonWorldPos: { value: new THREE.Vector3(0, 200, 0) },
  },
  vertexShader: sunSpecVert,
  fragmentShader: _moonSpecFrag,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  side: THREE.DoubleSide,
  clipping: true,
  clippingPlanes: [waterClipPlane],
});
// Same resolution as sun specular for matching glimmer quality
const moonSpecPlane = new THREE.Mesh(waterGeo.clone(), moonSpecMat);
moonSpecPlane.rotation.x = -Math.PI / 2;
moonSpecPlane.position.set(0, 0.04, ISLAND_Z);
moonSpecPlane.renderOrder = 2;
moonSpecPlane.visible = false;
scene.add(moonSpecPlane);

// Pre-allocated vectors for per-frame use (avoid new allocations in dnc_update)
const _sunDirVec = new THREE.Vector3();
const _moonDirVec = new THREE.Vector3();

// Waterline contact strip — fat band where water "touches" the lens
const wlGeo = new THREE.PlaneGeometry(800, 0.35, 80, 6);
// Vertex alpha gradient — sharp center, quick falloff
const wlColors = new Float32Array(wlGeo.attributes.position.count * 4);
const wlPos = wlGeo.attributes.position;
for (let i = 0; i < wlPos.count; i++) {
  const y = wlPos.getY(i); // -0.175 to +0.175
  const dist = Math.abs(y) / 0.175; // 0 at center, 1 at edge
  const alpha = Math.max(0, 1.0 - dist * dist * dist); // cubic falloff — sharp
  wlColors[i * 4] = 0.09;     // match water surface shallow turquoise
  wlColors[i * 4 + 1] = 0.75;
  wlColors[i * 4 + 2] = 0.72;
  wlColors[i * 4 + 3] = alpha * 0.6;
}
wlGeo.setAttribute('color', new THREE.BufferAttribute(wlColors, 4));
const wlMat = new THREE.MeshBasicMaterial({
  vertexColors: true,
  transparent: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  blending: THREE.NormalBlending,
});
const waterline = new THREE.Mesh(wlGeo, wlMat);
waterline.position.set(0, 0, 0);
waterline.renderOrder = 3;
scene.add(waterline);

// Store original waterline Y positions for wave animation
const wlOrigY = new Float32Array(wlGeo.attributes.position.count);
for (let i = 0; i < wlGeo.attributes.position.count; i++) {
  wlOrigY[i] = wlGeo.attributes.position.getY(i);
}

const wPos = waterGeo.attributes.position;
const wOrigZ = new Float32Array(wPos.count);
for (let i = 0; i < wPos.count; i++) wOrigZ[i] = wPos.getZ(i);

// ============================================================
// SEABED — Procedural ocean floor with island-aware undulation
// ============================================================
// Seeded PRNG (Mulberry32) for deterministic floor generation
function _sbMulberry32(seed) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Pre-built noise table for fast deterministic sampling
const _sbNoiseSize = 4096;
const _sbNoise = new Float32Array(_sbNoiseSize);
{
  const rng = _sbMulberry32(ISLAND_SEED * 2654435761 + 1);  // sub-seed: noise table
  for (let i = 0; i < _sbNoiseSize; i++) _sbNoise[i] = rng();
}

// Hash-based noise lookup — returns 0..1 for any (x,z) coordinate
function sbNoise(x, z) {
  // Use large primes to avoid visible grid patterns
  return _sbNoise[((Math.floor(x * 7919) + Math.floor(z * 104729)) & 0x7FFFFFFF) % _sbNoiseSize];
}

// Smooth value noise — bilinear interpolation of hash noise for gentle contours
function sbSmoothNoise(x, z, freq) {
  const fx = x * freq, fz = z * freq;
  const ix = Math.floor(fx), iz = Math.floor(fz);
  const tx = fx - ix, tz = fz - iz;
  // Smoothstep for less grid-like interpolation
  const sx = tx * tx * (3 - 2 * tx);
  const sz = tz * tz * (3 - 2 * tz);
  const n00 = sbNoise(ix, iz);
  const n10 = sbNoise(ix + 1, iz);
  const n01 = sbNoise(ix, iz + 1);
  const n11 = sbNoise(ix + 1, iz + 1);
  const a = n00 + (n10 - n00) * sx;
  const b = n01 + (n11 - n01) * sx;
  return a + (b - a) * sz;
}

// ============================================================
// BATHYMETRIC ZONE SYSTEM — A through E depth zones
// ============================================================
// Zones define the depth profile radiating outward from the island.
// Each zone has a target depth (world Y) and the distances between
// zones vary per seed for organic, non-concentric shapes.
//
// Zone layout (world Y coordinates, water surface = 0):
//   A:  0 to  -2  — Shallow lagoon shelf (pure white sand)
//   B: -2 to  -3  — Transition shelf (light cream sand)
//   C: -3 to  -7  — Main lagoon floor (warm tan sand)
//   D: -7 to -12  — Drop-off slope (darker sand)
//   E: -12 to -15 — Deep reef wall (dark floor)
//
// Since seabed mesh sits at Y = -11 (OCEAN_FLOOR_Y), displacement offsets:
//   Zone A center (-1):   displacement = +10
//   Zone B center (-2.5): displacement = +8.5
//   Zone C center (-5):   displacement = +6
//   Zone D center (-9.5): displacement = +1.5
//   Zone E center (-13.5): displacement = -2.5

// Island strip in local seabed coordinates
const _islandLocalYmin = -(ISLAND_Z + 146 * 2);   // = -242
const _islandLocalYmax = -(ISLAND_Z + (-54) * 2);  // = 158
const _islandHalfWidthX = 5;

// ── Seed-varying zone boundary distances from island ──
// Angular noise makes boundaries organic, not concentric circles.
// ASYMMETRIC: front (toward camera) drops deep fast for visual interest;
// left/right sides get the full A→E lagoon shelf progression.
const _zoneRng = _sbMulberry32(ISLAND_SEED * 1597334677 + 2);  // sub-seed: zone boundaries

// Base distances for LEFT/RIGHT sides (wide lagoon shelf → abyss at map edge)
const _sideDistA = 5;     // A: white sand strip near shore
const _sideDistB = 30;    // B: wider transition shelf
const _sideDistC = 250;   // C: very wide lagoon floor — keeps dark zones beyond viewing angle
const _sideDistD = 500;   // D: wide slope — abyss hidden from all viewing angles
// Beyond D = zone E (reef wall → abyss)

// Base distances for REAR (behind island, away from camera) — wide shelf, no visible abyss
const _rearDistA = 5;     // A: same as sides near shore
const _rearDistB = 18;    // B: same transition
const _rearDistC = 250;   // C: very wide lagoon — reef wall pushed far behind island
const _rearDistD = 500;   // D: extremely long slope — abyss completely hidden from camera

// Base distances for FRONT (toward camera) — steep drop for most of the island
const _frontDistA = 0.5;  // A: almost no white sand — water starts fast
const _frontDistB = 3;    // B: slight transition shelf
const _frontDistC = 40;   // C: moderate shelf — prevents dark zones being visible from Home Beach
const _frontDistD = 400;  // D: wide slope — abyss far beyond camera view
// Beyond D = zone E (abyss)

// HOME BEACH distances — gentle slope but NOT protruding from the coastline
// Mellowness comes from wider B/C (gentler depth gradient), not from pushing A far out
const _homeDistA = 1;     // A: same-ish as regular front — no visible tongue
const _homeDistB = 8;     // B: wider transition — gentle ease into water
const _homeDistC = 30;    // C: broad lagoon shelf — gameplay space
const _homeDistD = 500;   // D: very gradual slope — abyss completely hidden from Home Beach
// Home Beach center in seabed local Y — near the right edge where the player washes ashore
const _homeBeachLocalY = _islandLocalYmax - (_islandLocalYmax - _islandLocalYmin) * 0.2; // ≈ 78
const _homeBeachHalfWidth = 80; // ±80 units — covers actual Home Beach area, rest of front uses steeper profile

// Guaranteed bay adjacent to Home Beach — always present regardless of seed.
// Creates a deep cut just to the "left" of Home Beach (toward island interior),
// ensuring every island has a reef-rich bay visible from the primary viewport.
const _homeBayCenter = _homeBeachLocalY - _homeBeachHalfWidth; // ≈ -2 in local Y (flush with Home Beach edge)
const _homeBayHalfWidth = 25; // 50u total bay width

// Per-angle noise table for warping zone boundaries (64 angular samples)
const _zoneBoundaryNoise = new Float32Array(64);
{ for (let i = 0; i < 64; i++) _zoneBoundaryNoise[i] = _zoneRng(); }

// Look up boundary warp for a given direction from island center
function _zoneBoundaryWarp(lx, ly) {
  const angle = Math.atan2(ly - (_islandLocalYmin + _islandLocalYmax) * 0.5, lx);
  const t = ((angle + Math.PI) / (2 * Math.PI)) * 64;
  const idx = Math.floor(t) & 63;
  const frac = t - Math.floor(t);
  const a = _zoneBoundaryNoise[idx];
  const b = _zoneBoundaryNoise[(idx + 1) & 63];
  return a + (b - a) * frac; // returns 0..1
}

// Target displacement for each zone (seabed local Z = worldY + 11)
const _zoneDepthA = 10;    // world Y = -1   (very shallow — wading depth)
const _zoneDepthB = 5;     // world Y = -6   (snorkel / freedive depth)
const _zoneDepthC = -8;    // world Y = -19  (deep lagoon floor — room for tall reefs)
const _zoneDepthD = -18;   // world Y = -29  (reef wall slope)
const _zoneDepthE = -30;   // world Y = -41  (abyss — plummets into darkness)

const seabedGeo = new THREE.PlaneGeometry(1800, 1800, 140, 140);
const sbp = seabedGeo.attributes.position;

for (let i = 0; i < sbp.count; i++) {
  const lx = sbp.getX(i), ly = sbp.getY(i);

  // Distance from island strip (nearest point on the rectangle)
  const clampedY = Math.max(_islandLocalYmin, Math.min(_islandLocalYmax, ly));
  const dx = Math.max(0, Math.abs(lx) - _islandHalfWidthX);
  const dy = ly - clampedY;
  const distFromIsland = Math.sqrt(dx * dx + dy * dy);

  // ── Directional factor: front vs rear vs sides ──
  // Island is a long strip along local Y (-142 to +58), narrow on X (±5).
  // Camera is at positive local X looking toward the island.
  //
  // FRONT  = off the long side TOWARD camera (lx > +5)  → drops steep/fast
  // REAR   = off the long side AWAY from camera (lx < -5) → wide shelf, no visible abyss
  // SIDES  = off the ENDS of the strip (ly beyond -142 or +58) → full A→E lagoon shelf
  //
  const absDx = Math.max(0, Math.abs(lx) - _islandHalfWidthX);
  const absDy = Math.max(0, ly - _islandLocalYmax, _islandLocalYmin - ly);
  const totalOff = absDx + absDy + 0.01;
  // Raw directional ratio: 1 when entirely off the long sides, 0 when off the ends
  const longSideRatio = Math.min(1, Math.max(0, (absDx / totalOff - 0.15) / 0.4));
  // Front: camera side (lx > 0), Rear: away from camera (lx < 0)
  const isCameraSide = lx > _islandHalfWidthX ? 1.0 : (lx > 0 ? lx / (_islandHalfWidthX + 0.01) : 0.0);
  const isRearSide = lx < -_islandHalfWidthX ? 1.0 : (lx < 0 ? -lx / (_islandHalfWidthX + 0.01) : 0.0);
  const frontFactor = longSideRatio * isCameraSide;
  const rearFactor = longSideRatio * isRearSide;
  const sideFactor = 1 - frontFactor - rearFactor;

  // Warp zone boundaries using angular noise (±15% variation — organic but safe from island)
  const warp = _zoneBoundaryWarp(lx, ly);
  const warpMul = 0.85 + warp * 0.3; // 0.85..1.15

  // Shelf tongue variation — smooth sine-based indentations along the island perimeter.
  // Creates organic fingers of shallow sand that reach further into the water,
  // and pinch-points where the shelf drops off sooner. Strongest effect on
  // shallow zones (A/B), diminishing for deeper zones (C/D) which are already far out.
  const perimCoord = clampedY; // position along the island strip
  const shelfT1 = Math.sin(perimCoord * 0.025 + 2.3) * 0.35;
  const shelfT2 = Math.sin(perimCoord * 0.058 + 5.7) * 0.22;
  const shelfT3 = Math.sin(perimCoord * 0.011 + 0.9) * 0.20;
  const shelfWarp = 1.0 + shelfT1 + shelfT2 + shelfT3; // ~0.23 to ~1.77

  // Home Beach factor: mellow slope at the gameplay center of the front
  // smoothstep from 1 (at center) to 0 (at ±homeBeachHalfWidth from center)
  const homeRawDist = Math.abs(ly - _homeBeachLocalY);
  const homeFactor = frontFactor * Math.max(0, Math.min(1,
    1 - (homeRawDist - _homeBeachHalfWidth * 0.4) / (_homeBeachHalfWidth * 0.6)));

  // ── Front-side shelf variation ──
  // Organic, irregular variation along the camera-facing front edge using seeded noise.
  // Creates natural "bays" (narrow shelf → darker water) and "points" (wide shelf → turquoise).
  // Frozen at both island tips so Home Beach end + far end are untouched.
  const tipDist = Math.min(ly - _islandLocalYmin, _islandLocalYmax - ly);
  const tipFreeze = Math.min(1, Math.max(0, (tipDist - 30) / 60)); // 0 near tips, 1 in middle
  // Phase-warped multi-sine with lateral curvature.
  // 5 sine waves at irrational frequency ratios (never repeats over island length).
  // Noise-driven phase warp breaks visual regularity.
  // Distance-based lateral curve (lx) makes tongues sweep to the side
  // as they extend outward, instead of pointing straight out from the island.
  const pw = (sbSmoothNoise(300, perimCoord, 0.008) - 0.5) * 60; // ±30u phase warp
  const curve = lx * 0.12; // lateral curvature — tongues bend with distance from island
  const sv1 = Math.sin((perimCoord + pw + curve) * 0.079 + ISLAND_SEED * 0.73) * 0.40;
  const sv2 = Math.sin((perimCoord - pw * 0.6 + curve * 0.6) * 0.127 + ISLAND_SEED * 1.29) * 0.22;
  const sv3 = Math.sin((perimCoord + pw * 0.3 + curve * 0.3) * 0.041 + ISLAND_SEED * 2.17) * 0.30;
  const sv4 = Math.sin(perimCoord * 0.199 + ISLAND_SEED * 3.11 + pw * 0.05) * 0.10;
  const sv5 = Math.sin(perimCoord * 0.023 + ISLAND_SEED * 4.51) * 0.25;
  const shelfVar = sv1 + sv2 + sv3 + sv4 + sv5;
  let frontShelfBoost = Math.max(0.12, 1.0 + shelfVar * 1.8 * tipFreeze * frontFactor);

  // ── Guaranteed bay adjacent to Home Beach ──
  // Smoothstep override: force frontShelfBoost low in the bay zone,
  // creating a permanent deep cut visible from the primary viewport.
  {
    const bayDist = Math.abs(perimCoord - _homeBayCenter);
    const bayT = Math.max(0, 1.0 - bayDist / _homeBayHalfWidth);
    const bayInfluence = bayT * bayT * (3 - 2 * bayT) * frontFactor; // smoothstep, front-face only
    frontShelfBoost = frontShelfBoost * (1 - bayInfluence) + 0.12 * bayInfluence;
  }

  // Blend: home beach (gentle) vs regular front (steep) vs rear (wide) vs sides (lagoon shelf)
  const regFront = frontFactor - homeFactor;  // remaining non-home front factor
  const baseA = (_homeDistA * homeFactor + _frontDistA * regFront + _rearDistA * rearFactor + _sideDistA * sideFactor);
  const baseB = (_homeDistB * homeFactor + _frontDistB * regFront + _rearDistB * rearFactor + _sideDistB * sideFactor);
  const baseC = (_homeDistC * homeFactor + _frontDistC * regFront + _rearDistC * rearFactor + _sideDistC * sideFactor);
  const baseD = (_homeDistD * homeFactor + _frontDistD * regFront + _rearDistD * rearFactor + _sideDistD * sideFactor);
  // Shelf tongues + front shelf variation affect shallow zones most, deep zones least
  const dA = baseA * warpMul * shelfWarp * frontShelfBoost;
  const dB = baseB * warpMul * shelfWarp * frontShelfBoost;
  const dC = baseC * warpMul * (1.0 + (shelfWarp - 1.0) * 0.3) * frontShelfBoost;
  const dD = baseD * warpMul * (1.0 + (shelfWarp - 1.0) * 0.15);  // D unchanged — keeps abyss stable

  // Determine zone and compute base depth via smoothstep transitions
  let baseDepth;
  if (distFromIsland <= dA) {
    baseDepth = _zoneDepthA;
  } else if (distFromIsland <= dB) {
    const t = (distFromIsland - dA) / (dB - dA);
    const s = t * t * (3 - 2 * t);
    baseDepth = _zoneDepthA + (_zoneDepthB - _zoneDepthA) * s;
  } else if (distFromIsland <= dC) {
    const t = (distFromIsland - dB) / (dC - dB);
    const s = t * t * (3 - 2 * t);
    baseDepth = _zoneDepthB + (_zoneDepthC - _zoneDepthB) * s;
  } else if (distFromIsland <= dD) {
    const t = (distFromIsland - dC) / (dD - dC);
    const s = t * t * (3 - 2 * t);
    baseDepth = _zoneDepthC + (_zoneDepthD - _zoneDepthC) * s;
  } else {
    // Reef wall drop-off: steep cliff then abyssal plain
    // First 15 units = near-vertical wall (D→E fast), then levels off
    const wallDist = 15;
    const rawT = Math.min(1, (distFromIsland - dD) / wallDist);
    // Steeper-than-smoothstep curve for cliff-like drop
    const s = rawT < 0.5
      ? 4 * rawT * rawT * rawT
      : 1 - 4 * (1 - rawT) * (1 - rawT) * (1 - rawT);
    baseDepth = _zoneDepthD + (_zoneDepthE - _zoneDepthD) * s;
  }

  // Multi-octave noise — amplitude scales with depth (shallow = ripples, deep = big features)
  // depthNorm: 1.0 = zone A (shallowest), 0.0 = zone E (deepest)
  const depthNorm = (baseDepth - _zoneDepthE) / (_zoneDepthA - _zoneDepthE);
  // Noise fades in from zone D onward — zones A/B/C stay clean white sand
  // depthNorm at zone D boundary ≈ 0.30; smoothstep from 0.35→0.15 for gradual onset
  const deepNoiseFade = Math.max(0, Math.min(1, (0.35 - depthNorm) / 0.20));
  const ampScale = (0.3 + (1 - depthNorm) * 0.8) * deepNoiseFade;
  // Detail scale — high-freq octaves also gated by deepNoiseFade
  const detailScale = deepNoiseFade;

  const n1 = (sbSmoothNoise(lx, ly, 0.008) - 0.5) * 5.5 * ampScale;   // large rolling hills
  const n2 = (sbSmoothNoise(lx + 300, ly + 300, 0.022) - 0.5) * 3.2 * ampScale;  // mid features
  const n3 = (sbSmoothNoise(lx + 700, ly + 700, 0.055) - 0.5) * 1.8 * detailScale;  // small bumps
  const n4 = (sbSmoothNoise(lx + 1100, ly + 1100, 0.14) - 0.5) * 0.7 * detailScale; // fine detail

  // Sand ripples — parallel ridges in shallow zone (A/B), fade out in deeper water
  // Runs roughly perpendicular to shoreline; slight angle noise breaks up uniformity
  const rippleStrength = Math.max(0, depthNorm - 0.55) / 0.45; // 0 below zone B, 1 in zone A
  const rippleAngleWarp = sbSmoothNoise(lx + 500, ly + 500, 0.01) * 0.4; // subtle direction variation
  const rippleCoord = lx * (0.95 + rippleAngleWarp) + ly * 0.3; // mostly perpendicular to front edge
  const ripple = Math.sin(rippleCoord * 1.6) * 0.18 * rippleStrength * rippleStrength;

  // Coral / reef patches — thresholded noise creates scattered raised mounds.
  // Mimics real tropical reefs: discrete coral outcrops surrounded by flat sand.
  // Active in zones B–D; fades out in shallow A (clean sand) and deep E (abyss).
  //   depthNorm: A=1.0, B≈0.96, C≈0.89, D≈0.76, E=0.0
  const reefFadeShallow = 1.0 - Math.max(0, Math.min(1, (depthNorm - 0.95) / 0.05));
  const reefFadeDeep = Math.max(0, Math.min(1, depthNorm / 0.5));
  const reefZoneFactor = reefFadeShallow * reefFadeDeep;

  let reefHeight = 0;
  if (reefZoneFactor > 0.01) {
    // Low-freq noise → patch locations (~50-70 unit blobs)
    const coralNoise = sbSmoothNoise(lx + 2000, ly + 2000, 0.018);
    const coralThreshold = 0.42;  // top ~58% of noise becomes patches — patchy but common
    if (coralNoise > coralThreshold) {
      const coralPatch = (coralNoise - coralThreshold) / (1.0 - coralThreshold);
      // Quadratic rise — patches are rounded mounds, not sharp bumps
      const moundHeight = coralPatch * coralPatch * 4.5;
      // Higher-freq roughness WITHIN patches — coral texture
      const roughness = (sbSmoothNoise(lx + 3000, ly + 3000, 0.08) - 0.5) * 1.4 * coralPatch;
      // Second roughness octave for finer bumps
      const roughness2 = (sbSmoothNoise(lx + 5000, ly + 5000, 0.18) - 0.5) * 0.6 * coralPatch;
      reefHeight = (moundHeight + roughness + roughness2) * reefZoneFactor;
    }
  }

  let h = baseDepth + n1 + n2 + n3 + n4 + ripple + reefHeight;
  h = Math.max(-32, Math.min(9, h)); // seabed Y = -11 + h; cap at Y=-2 so nothing pokes above waves

  // Island underwater slope — seabed owns ALL underwater terrain.
  // Terrain uses strict && culling: no faces render below h=4.8 (~Y=-1.4).
  // Seabed must fill the gap seamlessly.
  //
  // Flat platform at displacement 11 (Y=0, waterline) within the terrain's
  // footprint (distFromIsland < 15), then smooth slope outward.  This puts
  // the seabed right at the water surface under the island, guaranteeing
  // no gap between terrain edge and seabed regardless of tongue warp.
  //
  // The outer distance varies with frontShelfBoost on the camera-facing front:
  //   Bay (low boost → narrow shelf): lift ends at ~20u → deep water close to shore
  //   Point (high boost → wide shelf): lift extends to ~120u → turquoise shelf reaches out
  //   Rear/sides/tips (boost=1.0): outer=50u → unchanged from original
  const liftBoostClamped = Math.max(0.15, Math.min(3.0, frontShelfBoost));
  const liftOuter = 15 + 35 * liftBoostClamped; // 20.25 (bay) to 120 (wide shelf)
  if (distFromIsland < liftOuter) {
    let liftFactor;
    if (distFromIsland < 15) {
      liftFactor = 1.0; // full lift — covers entire terrain footprint
    } else {
      const t = (distFromIsland - 15) / (liftOuter - 15); // 0 at 15, 1 at liftOuter
      const s = t * t * (3 - 2 * t);        // smoothstep
      liftFactor = 1.0 - s;
    }
    const islandFloor = 10.8 * liftFactor;
    h = Math.max(h, islandFloor);
  }

  // Rear seabed lift — raise seabed behind the island to shallow depth.
  // From Home Beach the camera looks OVER the island; raising the rear seabed
  // creates a bright shallow "wall" that hides the deep zones/abyss behind.
  if (rearFactor > 0.01 && distFromIsland > 15) {
    const rearRamp = Math.min(1, (distFromIsland - 15) / 80);
    const rearSmooth = rearRamp * rearRamp * (3 - 2 * rearRamp);
    const rearLift = rearFactor * rearSmooth * 8; // lift to ~worldY=-3 (shallow turquoise)
    h = Math.max(h, rearLift);
  }

  // Edge abyss — force seabed to drop into darkness before water plane ends.
  // Water is 1200×1200 centered at (0, ISLAND_Z=-50), so in seabed local coords
  // (seabed centered at world Z=0) the water covers:
  //   local X: ±600,  local Y: -550 to +650
  // Uses noise-warped radial distance for organic cliff edges instead of a
  // geometric square. Start dropping ~460 from center, fully zone E by ~590.
  // Depth fog (Y=-15 to -38) hides the transition.
  const edgeAbyssStart = 460;
  const edgeAbyssEnd   = 590;
  const edgeAbyssRange = edgeAbyssEnd - edgeAbyssStart;
  const edgeR = Math.sqrt(lx * lx + ly * ly);
  // Angular noise + multi-frequency spatial noise → irregular, organic boundary
  const edgeWarpVal = (_zoneBoundaryWarp(lx, ly) - 0.5) * 50;
  const edgeNoise1 = (sbSmoothNoise(lx + 4000, ly + 4000, 0.007) - 0.5) * 70;
  const edgeNoise2 = (sbSmoothNoise(lx + 6000, ly + 6000, 0.019) - 0.5) * 30;
  const edgeDistFromCenter = edgeR - edgeWarpVal - edgeNoise1 - edgeNoise2;
  if (edgeDistFromCenter > edgeAbyssStart) {
    const t = Math.min(1, (edgeDistFromCenter - edgeAbyssStart) / edgeAbyssRange);
    const s = t * t * (3 - 2 * t); // smoothstep
    h = h + (_zoneDepthE - h) * s;
  }

  sbp.setZ(i, h);
}
seabedGeo.computeVertexNormals();

// ============================================================
// SEABED HEIGHT LOOKUP GRID — 141×141 flat array for depth-based water colors
// ============================================================
const _sbGridCols = 141, _sbGridRows = 141;
const _sbHeightGrid = new Float32Array(_sbGridCols * _sbGridRows);
for (let i = 0; i < sbp.count; i++) {
  _sbHeightGrid[i] = sbp.getZ(i);
}

// Bilinear sampling: world (X, Z) → interpolated seabed displacement h
function sampleSeabedHeight(worldX, worldZ) {
  const col = (worldX + 900) * 140 / 1800;
  const row = (worldZ + 900) * 140 / 1800;
  const c0 = Math.max(0, Math.min(139, Math.floor(col)));
  const r0 = Math.max(0, Math.min(139, Math.floor(row)));
  const c1 = Math.min(140, c0 + 1);
  const r1 = Math.min(140, r0 + 1);
  const tc = col - c0, tr = row - r0;
  const h00 = _sbHeightGrid[r0 * 141 + c0];
  const h10 = _sbHeightGrid[r0 * 141 + c1];
  const h01 = _sbHeightGrid[r1 * 141 + c0];
  const h11 = _sbHeightGrid[r1 * 141 + c1];
  return h00 + (h10 - h00) * tc + (h01 - h00) * tr + (h00 - h10 - h01 + h11) * tc * tr;
}

// ============================================================
// VERTEX COLORS — zone-based palette (A = pure white sand → E = abyss)
// ============================================================
// Zone A: pure white sand (1.0, 1.0, 1.0) — matches island sand material
// Zone B: light cream sand (0.88, 0.84, 0.75)
// Zone C: warm tan sand (0.72, 0.66, 0.55)
// Zone D: darker cool sand (0.45, 0.42, 0.38)
// Reef wall: dark blue-grey (0.18, 0.20, 0.25)
// Zone E: near-black abyss (0.06, 0.07, 0.10)
const sbColors = new Float32Array(sbp.count * 3);
{
  const colorRng = _sbMulberry32(ISLAND_SEED * 3266489917 + 3);  // sub-seed: vertex colors
  for (let i = 0; i < sbp.count; i++) {
    const d = sbp.getZ(i); // displacement offset

    // Sand patch noise for subtle variation within zones
    const lx = sbp.getX(i), ly = sbp.getY(i);
    const patchNoise = sbSmoothNoise(lx + 500, ly + 500, 0.04);
    const patchShift = (patchNoise - 0.5) * 0.06;

    // Per-vertex randomness
    const r1 = (colorRng() - 0.5) * 0.015;
    const r2 = (colorRng() - 0.5) * 0.012;
    const r3 = (colorRng() - 0.5) * 0.015;

    // Re-sample coral patch noise for color tinting (same params as displacement)
    const coralColorNoise = sbSmoothNoise(lx + 2000, ly + 2000, 0.018);
    const coralColorThreshold = 0.42;
    const coralTint = coralColorNoise > coralColorThreshold
      ? (coralColorNoise - coralColorThreshold) / (1.0 - coralColorThreshold) : 0;

    // Two-range color: lagoon sand (D→A) and abyss darkness (E→D)
    let cr, cg, cb;
    if (d >= _zoneDepthD) {
      // Lagoon zones: D (0.45, 0.42, 0.38) → A (1.0, 1.0, 1.0)
      // Zone A matches island sand material (pure white) for seamless blend at all light angles
      const zf = Math.min(1, (d - _zoneDepthD) / (_zoneDepthA - _zoneDepthD));
      const t = Math.max(0, Math.min(1, zf + patchShift));
      const tc = t * t * (3 - 2 * t);
      cr = 0.45 + tc * 0.55;  // 0.45 → 1.0
      cg = 0.42 + tc * 0.58;  // 0.42 → 1.0
      cb = 0.38 + tc * 0.62;  // 0.38 → 1.0

      // Coral patch tint — darken toward warm brown in reef areas (zones B-D)
      // depthNorm-based zone mask: no tint in Zone A, full in B-D
      const dn = Math.min(1, (d - _zoneDepthE) / (_zoneDepthA - _zoneDepthE));
      const tintZone = 1.0 - Math.max(0, Math.min(1, (dn - 0.95) / 0.05));
      if (coralTint > 0 && tintZone > 0) {
        const tintStrength = coralTint * tintZone * 0.4;  // noticeable — max 40% shift
        cr = cr * (1 - tintStrength) + 0.50 * tintStrength;  // warm brown
        cg = cg * (1 - tintStrength) + 0.40 * tintStrength;
        cb = cb * (1 - tintStrength) + 0.30 * tintStrength;
      }
    } else {
      // Abyss: E (0.04, 0.08, 0.22) → D (0.35, 0.38, 0.42)
      const af = Math.min(1, (d - _zoneDepthE) / (_zoneDepthD - _zoneDepthE));
      const t = Math.max(0, Math.min(1, af + patchShift * 0.3));
      const tc = t * t * (3 - 2 * t);
      // Deep ocean blue at the bottom, cool blue-grey near the wall edge
      cr = 0.04 + tc * 0.31;  // 0.04 → 0.35
      cg = 0.08 + tc * 0.30;  // 0.08 → 0.38
      cb = 0.22 + tc * 0.20;  // 0.22 → 0.42
    }

    sbColors[i * 3]     = Math.min(1, Math.max(0, cr + r1));
    sbColors[i * 3 + 1] = Math.min(1, Math.max(0, cg + r2));
    sbColors[i * 3 + 2] = Math.min(1, Math.max(0, cb + r3));
  }
}
seabedGeo.setAttribute('color', new THREE.BufferAttribute(sbColors, 3));

const seabedMat = new THREE.MeshStandardMaterial({
  vertexColors: true, roughness: 0.92, metalness: 0,
});
// Depth fog + seafloor noise — deep vertices fade into dark ocean blue void,
// with per-pixel noise for natural sand/sediment texture
seabedMat.onBeforeCompile = (shader) => {
  // Add world-position varying
  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `#include <common>
     varying vec3 vSeabedWorldPos;`
  );
  shader.vertexShader = shader.vertexShader.replace(
    '#include <worldpos_vertex>',
    `#include <worldpos_vertex>
     vSeabedWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;`
  );
  // Blend toward deep ocean blue + sand noise
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `#include <common>
     varying vec3 vSeabedWorldPos;

     // Simple 2D hash noise for seafloor texture
     float sbHash(vec2 p) {
       return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
     }
     float sbNoise2D(vec2 p) {
       vec2 i = floor(p);
       vec2 f = fract(p);
       f = f * f * (3.0 - 2.0 * f); // smoothstep
       float a = sbHash(i);
       float b = sbHash(i + vec2(1.0, 0.0));
       float c = sbHash(i + vec2(0.0, 1.0));
       float d = sbHash(i + vec2(1.0, 1.0));
       return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
     }`
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <dithering_fragment>',
    `#include <dithering_fragment>
     {
       // --- Seafloor sand/sediment noise ---
       // Two octaves: large patches + fine grain
       // Fades in from zone B — no noise on island sand (zone A), smooth onset
       vec2 sbUv = vSeabedWorldPos.xz;
       float n1 = sbNoise2D(sbUv * 0.15) - 0.5;  // broad patches (~7m)
       float n2 = sbNoise2D(sbUv * 0.6)  - 0.5;  // fine grain (~1.7m)
       float noiseFade = smoothstep(-7.0, -12.0, vSeabedWorldPos.y); // 0 at reef edge (zone D), 1 at deep reef (zone E)
       float sandNoise = (n1 * 0.12 + n2 * 0.06) * noiseFade;
       gl_FragColor.rgb += sandNoise;

       // --- Depth fog: starts at y=-15, fully opaque by y=-38 ---
       float fogDepth = smoothstep(-15.0, -38.0, vSeabedWorldPos.y);
       vec3 abyssBlue = vec3(0.03, 0.07, 0.20);
       gl_FragColor.rgb = mix(gl_FragColor.rgb, abyssBlue, fogDepth);
     }`
  );
};
const seabed = new THREE.Mesh(seabedGeo, seabedMat);
seabed.rotation.x = -Math.PI/2; seabed.position.y = -11; seabed.receiveShadow = false;
scene.add(seabed);
terrainRefs.seabedMesh = seabed; // expose for underwater raycasts (coral, dive)

// ============================================================
// DEPTH-BASED WATER COLORS — replace radial gradient with seabed-sampled depth
// Turquoise over shallow shelf, dark blue over abyss, reflecting actual topography
// ============================================================
for (let i = 0; i < wPos.count; i++) {
  const lx = wPos.getX(i), ly = wPos.getY(i);
  const worldX = lx;
  const worldZ = ISLAND_Z - ly;   // water local Y → world Z
  const h = sampleSeabedHeight(worldX, worldZ);
  // h: ~10 = shallow wading (zone A), ~5 = snorkel, -8 = deep lagoon, -30 = abyss
  // Normalize to 0..1 where 1 = shallowest, 0 = deepest
  const depthT = Math.max(0, Math.min(1, (h + 30) / 40));  // -30→0, +10→1

  // Color gradient: abyss (dark blue) → deep (blue) → shallow (turquoise)
  let r, g, b;
  if (depthT > 0.7) {
    // Shallow (turquoise) — h > ~-2
    const s = (depthT - 0.7) / 0.3;
    r = 0.05 + s * 0.05;    // 0.05 → 0.10
    g = 0.50 + s * 0.30;    // 0.50 → 0.80
    b = 0.55 + s * 0.20;    // 0.55 → 0.75
  } else if (depthT > 0.35) {
    // Mid-depth (teal) — h ~-16 to ~-2
    const s = (depthT - 0.35) / 0.35;
    r = 0.03 + s * 0.02;    // 0.03 → 0.05
    g = 0.25 + s * 0.25;    // 0.25 → 0.50
    b = 0.45 + s * 0.10;    // 0.45 → 0.55
  } else {
    // Deep/abyss (dark blue) — h < ~-16
    const s = depthT / 0.35;
    r = 0.02 + s * 0.01;    // 0.02 → 0.03
    g = 0.10 + s * 0.15;    // 0.10 → 0.25
    b = 0.30 + s * 0.15;    // 0.30 → 0.45
  }

  const idx = i * 3;
  waterColors[idx] = r;
  waterColors[idx + 1] = g;
  waterColors[idx + 2] = b;
  dnc_waterBaseColors[idx] = r;
  dnc_waterBaseColors[idx + 1] = g;
  dnc_waterBaseColors[idx + 2] = b;
}
waterGeo.attributes.color.needsUpdate = true;

// ============================================================
// ABYSS FLOOR — large flat plane at abyss depth, suggests infinite ocean
// Sits below the main seabed; only visible where seabed mesh doesn't cover.
// Matches depth fog color so the transition is seamless. 1 draw call.
// ============================================================
const abyssFloorGeo = new THREE.PlaneGeometry(4000, 4000, 1, 1);
const abyssFloorMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 1, metalness: 0 });
// Same depth fog as seabed — at Y=-42 the fog is fully opaque, so the
// base color doesn't matter. Both materials go through identical tone
// mapping / gamma, ensuring a seamless color match.
abyssFloorMat.onBeforeCompile = (shader) => {
  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `#include <common>
     varying vec3 vAbyssWorldPos;`
  );
  shader.vertexShader = shader.vertexShader.replace(
    '#include <worldpos_vertex>',
    `#include <worldpos_vertex>
     vAbyssWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;`
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `#include <common>
     varying vec3 vAbyssWorldPos;`
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <dithering_fragment>',
    `#include <dithering_fragment>
     {
       float fogDepth = smoothstep(-15.0, -38.0, vAbyssWorldPos.y);
       vec3 abyssBlue = vec3(0.03, 0.07, 0.20);
       gl_FragColor.rgb = mix(gl_FragColor.rgb, abyssBlue, fogDepth);
     }`
  );
};
const abyssFloor = new THREE.Mesh(abyssFloorGeo, abyssFloorMat);
abyssFloor.rotation.x = -Math.PI / 2;
abyssFloor.position.y = -42;  // just below abyss depth (-41)
scene.add(abyssFloor);

// ============================================================
// GOD RAYS — dense thin parallel light shafts from surface to seabed
// Single InstancedMesh: 3570 instances, 1 draw call
// ============================================================
const RAYS_X = 85, RAYS_Z = 42, RAY_COUNT = RAYS_X * RAYS_Z;

// Shared geometry — tapered beam, pivot at TOP (y=0) so rays hang from water surface
const rayH = 10;
const rayBaseW = 0.06;
const rayShape = new Float32Array([
  -rayBaseW/2, 0, 0,           rayBaseW/2, 0, 0,           // top (water surface)
  -rayBaseW*0.8, -rayH/2, 0,   rayBaseW*0.8, -rayH/2, 0,  // mid
  -rayBaseW/3, -rayH, 0,       rayBaseW/3, -rayH, 0,       // bottom (seabed)
]);
const rayIndices = [0,2,1, 1,2,3, 2,4,3, 3,4,5];
const rayGeo = new THREE.BufferGeometry();
rayGeo.setAttribute('position', new THREE.BufferAttribute(rayShape, 3));
rayGeo.setIndex(rayIndices);

// Per-instance attributes: phase, baseOpacity, widthScale
const rayPhases = new Float32Array(RAY_COUNT);
const rayBaseOps = new Float32Array(RAY_COUNT);
const rayWidthScales = new Float32Array(RAY_COUNT);

// Build instance matrices + per-instance data
const rayDummy = new THREE.Object3D();
const godRayMat = new THREE.ShaderMaterial({
  uniforms: {
    uTime:      { value: 0 },
    uCloudDim:  { value: 1.0 },
    uDncMul:    { value: 1.0 },
    uColor:     { value: new THREE.Color(0xb0f8f0) },
    uSunX:      { value: 0.0 },
  },
  vertexShader: `
    attribute float aPhase;
    attribute float aBaseOp;
    attribute float aWidthScale;
    uniform float uTime;
    uniform float uCloudDim;
    uniform float uDncMul;
    uniform float uSunX;
    varying float vOpacity;

    void main() {
      // Dual-sine opacity pulse
      float pulse = 0.4 + sin(uTime * 0.25 + aPhase) * 0.35
                        + sin(uTime * 0.6 + aPhase * 1.7) * 0.25;
      vOpacity = aBaseOp * max(0.0, pulse) * uCloudDim * uDncMul;

      // Sun-relative tilt: rays fan out from sun position
      float worldX = instanceMatrix[3][0];
      float dx = worldX - uSunX;
      float tilt = clamp(dx / 400.0, -1.0, 1.0) * 0.15;

      // Subtle sway on top
      float sway = sin(uTime * 0.5 + aPhase) * 0.008
                 + sin(uTime * 1.1 + aPhase * 2.3) * 0.003;
      float totalRot = tilt + sway;
      float cs = cos(totalRot);
      float sn = sin(totalRot);

      // Scale width per-instance, apply tilt+sway rotation
      vec3 p = position;
      p.x *= aWidthScale;
      vec3 swayed = vec3(p.x * cs - p.y * sn, p.x * sn + p.y * cs, p.z);

      vec4 worldPos = instanceMatrix * vec4(swayed, 1.0);
      gl_Position = projectionMatrix * viewMatrix * worldPos;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying float vOpacity;
    void main() {
      gl_FragColor = vec4(uColor, vOpacity);
    }
  `,
  transparent: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  blending: THREE.AdditiveBlending,
});

const godRayMesh = new THREE.InstancedMesh(rayGeo, godRayMat, RAY_COUNT);
godRayMesh.frustumCulled = false;

for (let ix = 0; ix < RAYS_X; ix++) {
  for (let iz = 0; iz < RAYS_Z; iz++) {
    const idx = ix * RAYS_Z + iz;
    const w = 0.03 + Math.random() * 0.06;
    rayWidthScales[idx] = w / rayBaseW;
    rayBaseOps[idx] = 0.015 + Math.random() * 0.02;
    rayPhases[idx] = Math.random() * Math.PI * 2;

    const cellW = 800 / RAYS_X, cellZ = 400 / RAYS_Z;
    rayDummy.position.set(
      -400 + ix * cellW + (Math.random() - 0.5) * cellW * 0.7,
      0,
      -5 - iz * cellZ - Math.random() * cellZ * 0.7
    );
    rayDummy.rotation.set(0, Math.random() * Math.PI, 0);
    rayDummy.updateMatrix();
    godRayMesh.setMatrixAt(idx, rayDummy.matrix);
  }
}
godRayMesh.instanceMatrix.needsUpdate = true;

// Attach per-instance attributes
rayGeo.setAttribute('aPhase', new THREE.InstancedBufferAttribute(rayPhases, 1));
rayGeo.setAttribute('aBaseOp', new THREE.InstancedBufferAttribute(rayBaseOps, 1));
rayGeo.setAttribute('aWidthScale', new THREE.InstancedBufferAttribute(rayWidthScales, 1));

scene.add(godRayMesh);

// Backward-compatible export (lightRays kept as alias for external refs)
const lightRays = godRayMesh;

// ============================================================
// CAUSTICS — GLSL shader on full seabed overlay (GPU-rendered, smooth)
// ============================================================
const causticVertShader = `
  varying vec2 vUv;
  varying float vDepthFade;
  void main() {
    vUv = uv;
    // World Y for depth-based caustic fade (plane at y=-11, rotated -PI/2)
    vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    // Fade caustics: full at y=-5, gone by y=-30 (light reaches the deep lagoon floor)
    vDepthFade = smoothstep(-30.0, -5.0, worldPos.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const causticFragShader = `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uCausticScale;
  varying vec2 vUv;
  varying float vDepthFade;

  // Simple 2D hash
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  // Voronoi edge detection — returns brightness at cell edges
  float voronoi(vec2 uv, float time) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    float d1 = 1.0, d2 = 1.0;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = vec2(float(x), float(y));
        vec2 point = hash(i + neighbor);
        // Animate points
        point = 0.5 + 0.5 * sin(time * 0.4 + 6.2831 * point);
        vec2 diff = neighbor + point - f;
        float dist = length(diff);
        if (dist < d1) { d2 = d1; d1 = dist; }
        else if (dist < d2) { d2 = dist; }
      }
    }
    return d2 - d1;
  }

  void main() {
    // Two layers at different scales and speeds for complexity
    float scale1 = 149.0 * uCausticScale;
    float scale2 = 114.0 * uCausticScale;
    float v1 = voronoi(vUv * scale1, uTime);
    float v2 = voronoi(vUv * scale2 + vec2(3.7, 1.3), uTime * 0.7);

    // Sharp caustic lines from cell edges
    float c1 = smoothstep(0.0, 0.12, v1);
    float c2 = smoothstep(0.0, 0.10, v2);

    // Combine: bright where edges are (invert so edges = bright)
    float caustic = (1.0 - c1) * 0.6 + (1.0 - c2) * 0.4;
    caustic = pow(caustic, 1.5) * 1.2;

    vec3 color = vec3(0.6, 0.95, 1.0) * caustic;
    gl_FragColor = vec4(color, caustic * 0.12 * uIntensity * vDepthFade);
  }
`;

const causticMat = new THREE.ShaderMaterial({
  uniforms: { uTime: { value: 0 }, uIntensity: { value: 1.0 }, uCausticScale: { value: 3.0 } },
  vertexShader: causticVertShader,
  fragmentShader: causticFragShader,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  polygonOffset: true,
  polygonOffsetFactor: -1,
  polygonOffsetUnits: -1,
});

const causticPlane = new THREE.Mesh(
  seabedGeo.clone(),  // same displaced terrain as seabed
  causticMat
);
causticPlane.rotation.x = -Math.PI / 2;
causticPlane.position.set(0, -11, 0);
causticPlane.renderOrder = 2;
scene.add(causticPlane);

// ============================================================
// FLOATING PARTICLES
// ============================================================
const particleCount = 500;
const particleGeo = new THREE.BufferGeometry();
const pPos = new Float32Array(particleCount*3);
const pAlpha = new Float32Array(particleCount);
for (let i = 0; i < particleCount; i++) {
  pPos[i*3] = (Math.random()-0.5)*200;
  pPos[i*3+1] = -1-Math.random()*10;
  pPos[i*3+2] = (Math.random()-0.5)*200;
  pAlpha[i] = 0.5;
}
particleGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
particleGeo.setAttribute('alpha', new THREE.BufferAttribute(pAlpha, 1));
const particleMat = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: {
    uScale: { value: renderer.domElement.height * renderer.getPixelRatio() * 0.5 },
    uSize: { value: 0.15 },
    uColor: { value: new THREE.Color(0xa0f0e8) },
  },
  vertexShader: `
    attribute float alpha;
    varying float vAlpha;
    uniform float uSize;
    uniform float uScale;
    void main() {
      vAlpha = alpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = max(1.0, uSize * (uScale / -mv.z));
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0) discard;
      float soft = 1.0 - d * d;
      gl_FragColor = vec4(uColor, vAlpha * soft);
    }
  `,
});
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// ============================================================
// RAIN — falling rain drops particle system (hidden by default)
// ============================================================
const RAIN_COUNT = 1500;
const rainGeo = new THREE.BufferGeometry();
const rainPos = new Float32Array(RAIN_COUNT * 3);
const rainAlpha = new Float32Array(RAIN_COUNT);
const rainVelocities = new Float32Array(RAIN_COUNT);
for (let i = 0; i < RAIN_COUNT; i++) {
  rainPos[i * 3]     = (Math.random() - 0.5) * 200;
  rainPos[i * 3 + 1] = 5 + Math.random() * 55;      // Y: 5–60 (above camera)
  rainPos[i * 3 + 2] = (Math.random() - 0.5) * 200;
  rainAlpha[i] = 0.5 + Math.random() * 0.2;
  rainVelocities[i] = 0.4 + Math.random() * 0.3;     // fall speed variance
}
rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
rainGeo.setAttribute('alpha', new THREE.BufferAttribute(rainAlpha, 1));

const rainMat = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false,
  blending: THREE.NormalBlending,
  uniforms: {
    uScale: { value: renderer.domElement.height * renderer.getPixelRatio() * 0.5 },
    uSize: { value: 0.45 },
    uColor: { value: new THREE.Color(0xe8eef4) },
  },
  vertexShader: `
    attribute float alpha;
    varying float vAlpha;
    uniform float uSize;
    uniform float uScale;
    void main() {
      vAlpha = alpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = max(2.0, uSize * (uScale / -mv.z));
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    varying float vAlpha;
    void main() {
      // Vertical rain streak — narrow in X, elongated in Y
      float dx = abs(gl_PointCoord.x - 0.5) * 2.0;
      float dy = abs(gl_PointCoord.y - 0.5) * 2.0;
      // Narrow horizontal (streak shape) — sharp falloff in X
      float xFade = 1.0 - smoothstep(0.0, 0.35, dx);
      // Softer vertical falloff — tapers at top and bottom
      float yFade = 1.0 - dy * dy;
      float streak = xFade * yFade;
      if (streak < 0.01) discard;
      gl_FragColor = vec4(uColor, vAlpha * streak * 0.65);
    }
  `,
});
const rainParticles = new THREE.Points(rainGeo, rainMat);
rainParticles.visible = false; // hidden until Rain weather state
scene.add(rainParticles);

// ============================================================
// BIOLUMINESCENCE — glowing plankton on water surface at night
// GPU point cloud with per-particle twinkle phase, concentrated near Home Beach.
// ============================================================
const BIOLUM_COUNT = 300;
const _bioGeo = new THREE.BufferGeometry();
const _bioPos = new Float32Array(BIOLUM_COUNT * 3);
const _bioPhase = new Float32Array(BIOLUM_COUNT);   // twinkle phase offset
const _bioSpeed = new Float32Array(BIOLUM_COUNT);   // twinkle speed

for (let i = 0; i < BIOLUM_COUNT; i++) {
  // Scatter near Home Beach — elongated along X, narrower along Z
  _bioPos[i * 3]     = (Math.random() - 0.5) * 160;          // X spread
  _bioPos[i * 3 + 1] = 0.05 + Math.random() * 0.08;          // just above water surface
  _bioPos[i * 3 + 2] = HOME_BEACH_Z + (Math.random() - 0.5) * 80; // Z near Home Beach
  _bioPhase[i] = Math.random() * Math.PI * 2;                 // random phase offset
  _bioSpeed[i] = 0.3 + Math.random() * 0.7;                   // twinkle speed variation
}
_bioGeo.setAttribute('position', new THREE.BufferAttribute(_bioPos, 3));
_bioGeo.setAttribute('aPhase', new THREE.BufferAttribute(_bioPhase, 1));
_bioGeo.setAttribute('aSpeed', new THREE.BufferAttribute(_bioSpeed, 1));

const _bioMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: {
    uTime:    { value: 0 },
    uOpacity: { value: 0 },  // driven by DNC — 0 during day, 1 at night
    uScale:   { value: renderer.domElement.height * renderer.getPixelRatio() * 0.5 },
  },
  vertexShader: `
    attribute float aPhase;
    attribute float aSpeed;
    uniform float uTime;
    uniform float uOpacity;
    uniform float uScale;
    varying float vAlpha;
    void main() {
      // Twinkle: each particle pulses at its own rate + phase
      float pulse = sin(uTime * aSpeed + aPhase);
      // Remap -1..1 to 0..1, then bias toward off (most particles dim most of the time)
      float glow = pulse * 0.5 + 0.5;
      glow = glow * glow * glow; // cubic falloff — brief bright flashes, long dim periods
      vAlpha = glow * uOpacity;

      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = max(1.0, (1.5 + glow * 2.5) * (uScale / -mv.z));
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: `
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0) discard;
      float soft = 1.0 - d * d;
      // Cyan-green bioluminescent color
      vec3 color = vec3(0.15, 0.85, 0.75);
      gl_FragColor = vec4(color, vAlpha * soft);
    }
  `,
});

const _bioPoints = new THREE.Points(_bioGeo, _bioMat);
_bioPoints.visible = false;
_bioPoints.renderOrder = 2; // above water surface
scene.add(_bioPoints);

// --- Inject underwater caustics into rock & sand materials ---
// Uses world-space coordinates to seamlessly match the seabed caustic overlay
const causticUniforms = { uCausticTime: { value: 0 }, uCausticIntensity: { value: 1.0 }, uCausticScale: { value: 3.0 } };

// ============================================================
// DNC HELPER FUNCTIONS & dnc_update
// ============================================================
function dnc_lerpColor3(a, b, t) {
  return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t];
}
function dnc_lerpVal(a, b, t) { return a + (b - a) * t; }
function dnc_lerpHex(hexA, hexB, t) {
  const rA=(hexA>>16)&0xff, gA=(hexA>>8)&0xff, bA=hexA&0xff;
  const rB=(hexB>>16)&0xff, gB=(hexB>>8)&0xff, bB=hexB&0xff;
  const r=Math.round(rA+(rB-rA)*t), g=Math.round(gA+(gB-gA)*t), b=Math.round(bA+(bB-bA)*t);
  return (r<<16)|(g<<8)|b;
}

// Smoothstep for gentle phase transitions
function dnc_smoothstep(t) { return t * t * (3 - 2 * t); }

// Interpolate a full sky palette between two phase palettes
function dnc_interpSkyPalette(palA, palB, t) {
  const result = [];
  for (let i = 0; i < palA.length; i++) {
    result.push({ p: palA[i].p, c: dnc_lerpColor3(palA[i].c, palB[i].c, t) });
  }
  return result;
}

// Paint the sky canvas from a palette
function dnc_paintSky(palette) {
  skyCtx.clearRect(0, 0, 4, 1024);
  const grad = skyCtx.createLinearGradient(0, 0, 0, 1024);
  for (const stop of palette) {
    const [r,g,b] = stop.c;
    grad.addColorStop(stop.p, `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`);
  }
  skyCtx.fillStyle = grad;
  skyCtx.fillRect(0, 0, 4, 1024);

  // When cloud dome is visible, paint the bottom of the sky canvas to match the
  // fog/water color so the seam between fogged water and unfogged background is invisible.
  // The scene background is NOT affected by THREE.FogExp2, so we must manually match it.
  if (cloudDome.visible) {
    // Use the current fog color if fog is active, otherwise the palette horizon
    let fr, fg, fb;
    if (scene.fog) {
      const fc = scene.fog.color;
      fr = Math.round(fc.r * 255);
      fg = Math.round(fc.g * 255);
      fb = Math.round(fc.b * 255);
    } else {
      const hc = palette[palette.length - 1].c;
      fr = Math.round(hc[0] * 0.4);
      fg = Math.round(hc[1] * 0.4);
      fb = Math.round(hc[2] * 0.4);
    }
    const horizGrad = skyCtx.createLinearGradient(0, 860, 0, 1024);
    horizGrad.addColorStop(0, 'rgba(0,0,0,0)');
    horizGrad.addColorStop(0.4, `rgba(${fr},${fg},${fb},0.4)`);
    horizGrad.addColorStop(1, `rgb(${fr},${fg},${fb})`);
    skyCtx.fillStyle = horizGrad;
    skyCtx.fillRect(0, 860, 4, 164);
  }

  scene.background.needsUpdate = true;
}

// Underwater backdrop tint (cylindrical gradient below water)
// skyPal = the current interpolated sky palette, so we can read its horizon color
function dnc_tintUWBackdrop(t01, skyPal) {
  // Blend sky horizon with original water color so it stays aquatic during daytime
  const skyHorizon = skyPal[skyPal.length - 1].c;
  // Original water backdrop top color: #28d8cc = [40, 216, 204]
  const waterTop = [40, 216, 204];
  // How much sky influence: warm/dark skies (dawn/dusk/night) dominate,
  // bright blue daytime skies blend more toward water color
  const skyBrightness = (skyHorizon[0] + skyHorizon[1] + skyHorizon[2]) / (255 * 3);
  const skyInfluence = Math.max(0.15, 1.0 - skyBrightness * 0.9); // less sky during bright day
  const topCol = dnc_lerpColor3(waterTop, skyHorizon, skyInfluence);

  // Darken for bottom
  const botR = topCol[0] * 0.06;
  const botG = topCol[1] * 0.10;
  const botB = topCol[2] * 0.16;

  uwBgCtx.clearRect(0, 0, 4, 512);
  const g = uwBgCtx.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, `rgb(${Math.round(topCol[0])},${Math.round(topCol[1])},${Math.round(topCol[2])})`);
  g.addColorStop(0.15, `rgb(${Math.round(topCol[0]*0.75)},${Math.round(topCol[1]*0.78)},${Math.round(topCol[2]*0.80)})`);
  g.addColorStop(0.45, `rgb(${Math.round(topCol[0]*0.25)},${Math.round(topCol[1]*0.30)},${Math.round(topCol[2]*0.35)})`);
  g.addColorStop(1, `rgb(${Math.round(botR)},${Math.round(botG)},${Math.round(botB)})`);
  uwBgCtx.fillStyle = g;
  uwBgCtx.fillRect(0, 0, 4, 512);
  uwBgTex.needsUpdate = true;
}

// Sample a sky palette at arbitrary position t (0=zenith, 1=horizon)
// The palette stops go from p=0 (top/zenith) to p=1 (bottom/horizon)
function dnc_sampleSkyPalette(palette, t) {
  t = Math.max(0, Math.min(1, t));
  // Find the two stops that bracket t
  for (let i = 0; i < palette.length - 1; i++) {
    if (t <= palette[i + 1].p) {
      const range = palette[i + 1].p - palette[i].p;
      const localT = range > 0 ? (t - palette[i].p) / range : 0;
      return dnc_lerpColor3(palette[i].c, palette[i + 1].c, localT);
    }
  }
  return palette[palette.length - 1].c;
}

let dnc_lastSkyUpdate = 0;
const DNC_SKY_UPDATE_INTERVAL = 0.15; // seconds between sky redraws (perf)

function dnc_update(elapsedTime) {
  // Delta time
  if (dnc_state.lastFrameTime < 0) dnc_state.lastFrameTime = elapsedTime;
  const dt = elapsedTime - dnc_state.lastFrameTime;
  dnc_state.lastFrameTime = elapsedTime;

  // === MOON PHASE — recalculate once per calendar day ===
  const today = new Date();
  const dayKey = today.getFullYear() * 10000 + today.getMonth() * 100 + today.getDate();
  if (dayKey !== _lastMoonPhaseDay) {
    _lastMoonPhaseDay = dayKey;
    _currentMoonPhase = getMoonPhase(today);
    // Re-composite phase shadow onto the base moon texture
    dnc_applyMoonPhase(_moonBaseSource, _currentMoonPhase.phase);
    dnc_moonTex.image = _moonPhaseCanvas;
    dnc_moonTex.needsUpdate = true;
  }

  // Dev override: force a specific moon phase (0-7 index → phase 0-1)
  if (dnc_state.forcedMoonPhase >= 0 && dnc_state.forcedMoonPhase !== dnc_state._lastForcedMoon) {
    dnc_state._lastForcedMoon = dnc_state.forcedMoonPhase;
    // Map dropdown index to center of each phase band:
    // 0=New(0.0), 1=WaxCrescent(0.125), 2=FirstQ(0.25), 3=WaxGibbous(0.375),
    // 4=Full(0.5), 5=WanGibbous(0.625), 6=LastQ(0.75), 7=WanCrescent(0.875)
    const forcedPhaseVal = dnc_state.forcedMoonPhase * 0.125;
    const forcedIllum = (1 - Math.cos(forcedPhaseVal * 2 * Math.PI)) / 2;
    const phaseNames = ['New Moon','Waxing Crescent','First Quarter','Waxing Gibbous',
                        'Full Moon','Waning Gibbous','Last Quarter','Waning Crescent'];
    _currentMoonPhase = {
      phase: forcedPhaseVal,
      illumination: forcedIllum,
      name: phaseNames[dnc_state.forcedMoonPhase]
    };
    dnc_applyMoonPhase(_moonBaseSource, forcedPhaseVal);
    dnc_moonTex.image = _moonPhaseCanvas;
    dnc_moonTex.needsUpdate = true;
  } else if (dnc_state.forcedMoonPhase < 0 && dnc_state._lastForcedMoon >= 0) {
    // Switched back to auto — re-apply real lunar phase
    dnc_state._lastForcedMoon = -1;
    _currentMoonPhase = getMoonPhase(today);
    dnc_applyMoonPhase(_moonBaseSource, _currentMoonPhase.phase);
    dnc_moonTex.image = _moonPhaseCanvas;
    dnc_moonTex.needsUpdate = true;
  }

  // Sync cycle time to device clock (unless paused/forced by dev slider)
  if (!dnc_state.paused) {
    dnc_state.cycleTime = dnc_clockToCycleTime();
  }

  // Time lapse mode: advance cycleTime at 60 units/sec (full cycle in 10s)
  if (dnc_state.timeLapse) {
    // Cap dt to prevent large jumps from frame drops or GC pauses
    const tlDt = Math.min(dt, 0.05);
    dnc_state.cycleTime += tlDt * 60;
    if (dnc_state.cycleTime >= DNC_TOTAL) dnc_state.cycleTime -= DNC_TOTAL;
  }

  // Determine current phase and progress
  let ct = dnc_state.cycleTime;
  let phase = 3, phaseT = 0;
  for (let i = 0; i < 4; i++) {
    if (ct < DNC_STARTS[i] + DNC_DURS[i]) {
      phase = i;
      phaseT = (ct - DNC_STARTS[i]) / DNC_DURS[i];
      break;
    }
  }
  dnc_state.phase = phase;
  dnc_state.phaseT = phaseT;

  const nextPhase = (phase + 1) % 4;

  // Blend zone: last 20% of each phase cross-fades into next
  const blendZone = 0.2;
  let crossBlend = 0;
  if (phaseT > (1 - blendZone)) {
    crossBlend = dnc_smoothstep((phaseT - (1 - blendZone)) / blendZone);
  }

  // === SUN TRAJECTORY — proper east-to-west arc ===
  // sunProgress: 0 = sunrise (east horizon), 0.5 = zenith (high noon), 1.0 = sunset (west horizon)
  // During night, sun travels below the horizon from west → east for next sunrise.
  let sunProgress; // 0..1 across the daytime arc, or sub-zero for below-horizon night travel
  let sunBelowHorizon = false; // true when sun is in night transit (below horizon)
  if (phase === 0) { // Dawn — sun rises from below horizon
    sunProgress = -0.06 + phaseT * 0.21; // -0.06 → 0.15 (rises through horizon)
  } else if (phase === 1) { // Noon — main arc across sky
    sunProgress = 0.15 + phaseT * 0.7; // 0.15 → 0.85
  } else if (phase === 2) { // Dusk — sun descends below horizon
    sunProgress = 0.85 + phaseT * 0.21; // 0.85 → 1.06 (dips below horizon)
  } else { // Night — sun continues below horizon from west (1.06) → east (1.94 ≈ next dawn's -0.06)
    // Smoothly traverse from the sunset position to the next sunrise position
    // phaseT 0→1 maps sunProgress from 1.06 → 1.94
    sunProgress = 1.06 + phaseT * 0.88; // 1.06 → 1.94
    sunBelowHorizon = true;
  }

  const sunDist = 380;
  let sunX, sunY, sunZ;

  if (!sunBelowHorizon) {
    // Home camera (East orientation, angle=PI/2) looks from (75,0.3,-100) toward (0,8.5,-100)
    // i.e. along the -X axis.  Screen-right = +Z, screen-left = -Z.
    // Sun rises from azStart (screen-left), arcs overhead, sets at azEnd (screen-right).
    const azSweep = sunArcConfig.azStart - sunArcConfig.azEnd;
    const azimuthDeg = sunArcConfig.azStart - sunProgress * azSweep;
    const azimuth = azimuthDeg * Math.PI / 180;
    // Elevation: smooth arc peaking at elevPeak at midday
    const rawElev = Math.sin(sunProgress * Math.PI);
    const elevDeg = rawElev * sunArcConfig.elevPeak;
    const elevRad = elevDeg * Math.PI / 180;

    // Direction offset: sun placed in the -X direction (behind island as seen from East camera)
    // Azimuth sweeps along Z (screen left-right), depth is along -X
    sunX = -Math.cos(azimuth) * sunDist;              // deep in -X (behind island)
    sunY = Math.sin(elevRad) * sunDist;
    sunZ = Math.sin(azimuth) * sunDist;               // lateral sweep along Z

    // Horizon fade: sun sprite can't be clipped by water geometry, so we fade opacity.
    const horizFade = Math.min(1, Math.max(0, (sunY + 12) / 20));

    // Camera-relative: sun follows the camera so it feels infinitely far (no parallax)
    dnc_sunSprite.position.set(
      camera.position.x + sunX,
      sunY,
      camera.position.z + sunZ
    );
    dnc_sunSprite.visible = (horizFade > 0.01);
    dnc_sunSpriteMat.opacity = horizFade;
    dnc_state.sunElevDeg = elevDeg;

    // Swap texture: use horizon (redder) version when sun is low
    const peakElev = sunArcConfig.elevPeak;
    const normElev = Math.max(0, elevDeg) / Math.max(1, peakElev);
    const horizonFactor = 1 - normElev;
    if (horizonFactor > 0.6) {
      dnc_sunSpriteMat.map = dnc_sunTexHorizon;
    } else {
      dnc_sunSpriteMat.map = dnc_sunTexZenith;
    }
    dnc_sunSpriteMat.needsUpdate = true;

    // Scale: larger when near horizon (atmospheric magnification), flattened vertically
    const baseScale = 50;
    const horizScale = baseScale + horizonFactor * horizonFactor * 120;
    const pulse = 1.0 + Math.sin(elapsedTime * 0.5) * 0.02;
    const vertSquash = 1.0 - horizonFactor * horizonFactor * 0.25;
    dnc_sunSprite.scale.set(horizScale * pulse, horizScale * vertSquash * pulse, 1);

  } else {
    // Night: sun travels below horizon from sunset (azEnd) back to sunrise (azStart)
    // sunProgress goes 1.0 → 2.0 during night
    const nightAzSweep = sunArcConfig.azStart - sunArcConfig.azEnd;
    const nightAzDeg = sunArcConfig.azEnd + (sunProgress - 1.0) * nightAzSweep; // azEnd → azStart
    const nightAzimuth = nightAzDeg * Math.PI / 180;

    // Elevation: dip below horizon mid-night, smooth at boundaries
    // At sunProgress=1.0 (night start): sin(PI)=0 → elevDeg=0 (horizon, matches dusk end)
    // At sunProgress=1.5 (midnight):    sin(1.5PI)=-1 → elevDeg=-20 (deepest)
    // At sunProgress=2.0 (night end):   sin(2PI)=0 → elevDeg=0 (horizon, matches dawn start)
    const rawElev = Math.sin(sunProgress * Math.PI);
    const elevDeg = rawElev * 20; // 0 at boundaries, -20 at midnight
    const elevRad = elevDeg * Math.PI / 180;

    // Compute direction offset (below horizon but continuous with daytime arc)
    sunX = -Math.cos(nightAzimuth) * sunDist;
    sunY = Math.sin(elevRad) * sunDist;
    sunZ = Math.sin(nightAzimuth) * sunDist;

    // Camera-relative (even though invisible, keeps specular/lighting math consistent)
    dnc_sunSprite.position.set(
      camera.position.x + sunX,
      sunY,
      camera.position.z + sunZ
    );

    dnc_sunSprite.visible = false;
    dnc_state.sunElevDeg = elevDeg;
  }

  // === MOON POSITION ===
  // Subtle drift above Home Beach — barely perceptible movement across the night.
  // Small azimuth drift (~12° total) and gentle elevation arc (~4°).
  const moonDist = 400;
  const nightT = (phase === 3) ? phaseT
               : (phase === 2 && phaseT > 0.85) ? 0   // entering night: start of arc
               : (phase === 0 && phaseT < 0.2) ? 1     // leaving night: end of arc
               : 0;

  // Elevation: sits high at elevBase°, gentle elevArc° oscillation (peaks mid-night)
  const moonElevOsc = Math.sin(nightT * Math.PI) * moonArcConfig.elevArc;
  let moonElevDeg = moonArcConfig.elevBase + moonElevOsc;
  const moonElevRad = moonElevDeg * Math.PI / 180;
  // Azimuth: drifts azDrift° total centered on azCenter over the night
  const moonAzDeg = moonArcConfig.azCenter + (nightT - 0.5) * moonArcConfig.azDrift;
  const moonAzimuth = moonAzDeg * Math.PI / 180;

  // Direction offset: moon placed in -X direction (behind island from East camera),
  // same coordinate system as the sun so they share the same sky.
  const moonX = -Math.cos(moonAzimuth) * moonDist;
  const moonY = Math.sin(moonElevRad) * moonDist;
  const moonZ = Math.sin(moonAzimuth) * moonDist;
  // Direction unit vector for specular shimmer — must match the offset direction
  const moonDirX = -Math.cos(moonAzimuth) * Math.cos(moonElevRad);
  const moonDirY = Math.sin(moonElevRad);
  const moonDirZ = Math.sin(moonAzimuth) * Math.cos(moonElevRad);

  // Opacity fade: appears late in dusk, full at night, gone early in dawn
  let moonFade = 0;
  if (phase === 3) {
    moonFade = 1;
  } else if (phase === 2 && phaseT > 0.85) {
    moonFade = (phaseT - 0.85) / 0.15; // 0→1 over last 15% of dusk
  } else if (phase === 0 && phaseT < 0.2) {
    moonFade = 1 - phaseT / 0.2; // 1→0 over first 20% of dawn
  }
  moonFade = moonFade * moonFade * (3 - 2 * moonFade); // smoothstep for gentle fade

  const moonVisible = moonFade > 0.01;
  dnc_moonSprite.visible = moonVisible;
  dnc_moonGlowSprite.visible = moonVisible;
  if (moonVisible) {
    // Camera-relative: moon follows the camera so it feels infinitely far (no parallax)
    dnc_moonSprite.position.set(
      camera.position.x + moonX,
      moonY,
      camera.position.z + moonZ
    );
    dnc_moonGlowSprite.position.set(
      camera.position.x + moonX,
      moonY,
      camera.position.z + moonZ
    );
    dnc_moonSpriteMat.opacity = moonFade * 0.85;
    // Glow scales with illumination² — aggressive falloff so crescents have no visible halo
    const glowIllum = _currentMoonPhase.illumination * _currentMoonPhase.illumination;
    dnc_moonGlowMat.opacity = moonFade * 0.6 * glowIllum;
  }
  const moonHorizFade = moonFade; // alias for downstream systems
  // Store for moonlight specular
  dnc_state.moonX = moonX;
  dnc_state.moonY = moonY;
  dnc_state.moonZ = moonZ;
  dnc_state.moonElevDeg = moonElevDeg;
  dnc_state.moonVisible = moonVisible;
  dnc_state.moonPhase = _currentMoonPhase.phase;
  dnc_state.moonIllumination = _currentMoonPhase.illumination;
  dnc_state.moonPhaseName = _currentMoonPhase.name;

  // === STARS ===
  // Full brightness at night, smooth fade during dusk/dawn
  const starTarget = (phase === 3) ? 1.0
                   : (phase === 2 && phaseT > 0.6) ? (phaseT - 0.6) / 0.4
                   : (phase === 0 && phaseT < 0.4) ? (1 - phaseT / 0.4)
                   : 0;
  dnc_starMat.uniforms.uOpacity.value = starTarget;
  dnc_starMat.uniforms.uTime.value = elapsedTime;
  // Camera-relative: stars move with camera so they feel infinitely far (no parallax)
  dnc_stars.position.copy(camera.position);
  dnc_stars.rotation.y = elapsedTime * 0.001;
  // Moon clip mask — project moon center to NDC so star shader can discard behind it
  if (moonVisible) {
    _moonClipVec.set(camera.position.x + moonX, moonY, camera.position.z + moonZ).project(camera);
    // Moon sprite is 18 units at 400 distance. Angular radius in NDC ≈ (scale/2) / dist * projFactor
    const moonAngSize = (18 * 0.5) / moonDist * (camera.projectionMatrix.elements[5]);
    // Scale clip radius by illumination — stars shine through during new moon
    dnc_starMat.uniforms.uMoonClip.value.set(_moonClipVec.x, _moonClipVec.y, moonAngSize * 1.3 * _currentMoonPhase.illumination, _currentMoonPhase.illumination > 0.05 ? 1.0 : 0.0);
  } else {
    dnc_starMat.uniforms.uMoonClip.value.w = 0.0;
  }

  // === NIGHT HORIZON GLOW ===
  // Subtle atmospheric glow at the horizon during night — follows star fade timing
  _nightGlowMat.uniforms.uOpacity.value = cloudDome.visible ? 0 : starTarget * 0.35;

  // === BIOLUMINESCENCE === (disabled — will be re-added later)
  // const bioTarget = starTarget;
  // _bioMat.uniforms.uOpacity.value = bioTarget;
  // _bioMat.uniforms.uTime.value = elapsedTime;
  // _bioPoints.visible = bioTarget > 0.01;
  _bioPoints.visible = false;

  // === SHOOTING STARS ===
  if (phase === 3) {
    if (!_shootState.active) {
      if (_shootState.nextSpawnTime === 0) {
        // First entry into night — schedule first meteor
        _shootState.nextSpawnTime = elapsedTime + 10 + Math.random() * 20;
        _shootState.spawnCount = 0;
      }
      if (elapsedTime >= _shootState.nextSpawnTime && _shootState.spawnCount < 4) {
        _shootState.active = true;
        _shootState.startTime = elapsedTime;
        _shootState.duration = 0.4 + Math.random() * 0.4;
        // Random start position on upper sky
        const sTheta = Math.random() * Math.PI * 2;
        const sPhi = 0.05 + Math.random() * 0.3;
        const sR = 475;
        _shootState.startPos[0] = sR * Math.sin(sPhi) * Math.cos(sTheta);
        _shootState.startPos[1] = sR * Math.cos(sPhi);
        _shootState.startPos[2] = sR * Math.sin(sPhi) * Math.sin(sTheta);
        // Direction: downward bias
        const dTheta = (Math.random() - 0.5) * 0.8;
        const dPhi = 0.1 + Math.random() * 0.3;
        _shootState.dir[0] = Math.cos(sTheta + dTheta) * dPhi * sR;
        _shootState.dir[1] = -Math.abs(dPhi) * sR * 0.5;
        _shootState.dir[2] = Math.sin(sTheta + dTheta) * dPhi * sR;
        _shootState.speed = 300 + Math.random() * 200;
        dnc_shootLine.visible = true;
        _shootState.spawnCount++;
        // Schedule next
        const remNight = DNC_NIGHT_DUR * (1 - phaseT);
        _shootState.nextSpawnTime = elapsedTime + 5 + Math.random() * Math.max(5, remNight / Math.max(1, 4 - _shootState.spawnCount));
      }
    }
    if (_shootState.active) {
      const sElapsed = elapsedTime - _shootState.startTime;
      const sProgress = sElapsed / _shootState.duration;
      if (sProgress >= 1.0) {
        _shootState.active = false;
        dnc_shootLine.visible = false;
      } else {
        const posArr = _shootGeo.attributes.position.array;
        const alpArr = _shootGeo.attributes.aAlpha.array;
        const invR = _shootState.speed / 475;
        for (let si = 0; si < SHOOT_SEGMENTS; si++) {
          const segT = Math.max(0, sProgress - (si / SHOOT_SEGMENTS) * 0.15);
          posArr[si * 3]     = _shootState.startPos[0] + _shootState.dir[0] * segT * invR;
          posArr[si * 3 + 1] = _shootState.startPos[1] + _shootState.dir[1] * segT * invR;
          posArr[si * 3 + 2] = _shootState.startPos[2] + _shootState.dir[2] * segT * invR;
          const headFade = 1.0 - (si / SHOOT_SEGMENTS);
          const lifeFade = sProgress < 0.1 ? sProgress / 0.1 : sProgress > 0.7 ? (1 - sProgress) / 0.3 : 1.0;
          alpArr[si] = headFade * headFade * lifeFade * 0.9;
        }
        _shootGeo.attributes.position.needsUpdate = true;
        _shootGeo.attributes.aAlpha.needsUpdate = true;
      }
    }
  } else {
    if (_shootState.active) { _shootState.active = false; dnc_shootLine.visible = false; }
    _shootState.spawnCount = 0;
    _shootState.nextSpawnTime = 0;
  }

  // === SKY GRADIENT — driven by sun elevation ===
  // Natural Rayleigh scattering: warm colors ONLY when sun is within ~8° of horizon.
  // Rest of the time sky is blue. At night, dark navy.
  //   Sun < -6°:     night (dark navy)
  //   Sun -6° to 0°: twilight (night → warm)
  //   Sun 0° to 8°:  golden hour (warm horizon colors)
  //   Sun 8° to 18°: transition (warm → blue) — fairly quick
  //   Sun > 18°:     clear blue daytime
  if (elapsedTime - dnc_lastSkyUpdate > DNC_SKY_UPDATE_INTERVAL) {
    dnc_lastSkyUpdate = elapsedTime;
    const elev = dnc_state.sunElevDeg;
    // Pick warm palette: dawn (rising) or dusk (setting) based on sun direction
    const warmPal = (!sunBelowHorizon && sunProgress < 0.5) || (sunBelowHorizon && sunProgress > 1.5) ? DNC_SKY_WARM : DNC_SKY_DUSK;

    let skyPal;
    if (elev < -6) {
      // Full night
      skyPal = DNC_SKY_NIGHT;
    } else if (elev < 0) {
      // Twilight: night → warm
      const t = dnc_smoothstep((elev + 6) / 6); // 0 at -6°, 1 at 0°
      skyPal = dnc_interpSkyPalette(DNC_SKY_NIGHT, warmPal, t);
    } else if (elev < 8) {
      // Golden hour: warm colors — brief window
      skyPal = warmPal;
    } else if (elev < 18) {
      // Quick transition: warm → blue daytime
      const t = dnc_smoothstep((elev - 8) / 10); // 0 at 8°, 1 at 18°
      skyPal = dnc_interpSkyPalette(warmPal, DNC_SKY_DAY, t);
    } else {
      // Full daytime blue
      skyPal = DNC_SKY_DAY;
    }
    dnc_paintSky(skyPal);

    // Also update underwater backdrop — pass current sky palette so it matches
    dnc_tintUWBackdrop(crossBlend, skyPal);

    // === HORIZON GLOW — tint the glow band to match sky bottom palette ===
    // Read directly from the current interpolated sky palette
    const hCol = skyPal[skyPal.length - 1].c; // horizon color from sky
    // Intensity: brighter when sky has warm colors (dawn/dusk), subtle when blue/dark
    // Derive from color warmth — more red/orange = more intense glow
    const warmth = (hCol[0] - hCol[2]) / 255; // positive = warm, negative = cool
    const brightness = (hCol[0] + hCol[1] + hCol[2]) / (255 * 3);
    let hInt = Math.max(0.02, Math.min(0.9, warmth * 1.2 + brightness * 0.15));
    // Suppress horizon glow when cloud dome is visible (bleeds through translucent clouds)
    // Full zero during rain — even trace warm tones create a visible line against grey sky
    if (cloudState.rain) hInt = 0;
    else if (cloudDome.visible) hInt *= 0.05;
    const hgArr = horizGlowGeo.attributes.color.array;
    for (let i = 0; i < hgPos.count; i++) {
      hgArr[i * 4]     = hCol[0] / 255;
      hgArr[i * 4 + 1] = hCol[1] / 255;
      hgArr[i * 4 + 2] = hCol[2] / 255;
      hgArr[i * 4 + 3] = dnc_horizGlowBaseAlpha[i] * hInt;
    }
    horizGlowGeo.attributes.color.needsUpdate = true;

    // === WATERLINE STRIP — tinted to match water surface (same DNC water tint) ===
    const wlArr = wlGeo.attributes.color.array;
    const wA2 = DNC_WATER_TINTS[phase];
    const wB2 = DNC_WATER_TINTS[nextPhase];
    const wlTintR = dnc_lerpVal(wA2.r, wB2.r, crossBlend);
    const wlTintG = dnc_lerpVal(wA2.g, wB2.g, crossBlend);
    const wlTintB = dnc_lerpVal(wA2.b, wB2.b, crossBlend);
    for (let i = 0; i < wlPos.count; i++) {
      wlArr[i * 4]     = Math.min(1, 0.09 * wlTintR);
      wlArr[i * 4 + 1] = Math.min(1, 0.75 * wlTintG);
      wlArr[i * 4 + 2] = Math.min(1, 0.72 * wlTintB);
    }
    wlGeo.attributes.color.needsUpdate = true;

    // === CLOUD DOME — per-vertex sky gradient tint ===
    // Each vertex samples the sky palette at its elevation
    // Elevation 0 (horizon) → palette position ~1.0, Elevation 1 (zenith) → palette position ~0.0
    const cvColors = cloudDomeGeo.attributes.color.array;
    // Slight brightness boost so clouds aren't just the exact sky color
    // but instead look like illuminated objects catching the sky light
    // Cross-blend between phases for smooth transitions (especially Night→Dawn)
    const cloudBrightValues = [1.15, 1.3, 1.15, 0.6]; // Dawn, Noon, Dusk, Night
    const cloudBright = dnc_lerpVal(cloudBrightValues[phase], cloudBrightValues[nextPhase], crossBlend);

    // === Directional sun tint on clouds ===
    // Warm tint toward sun, slight dimming away — simple and effective
    let sunDirActive = false;
    let sdx = 0, sdy = 1, sdz = 0;
    let tintR = 1, tintG = 0.9, tintB = 0.7;
    let tintStrength = 0;

    if (cloudState.cover > 0 && cloudDome.visible && dnc_state.sunElevDeg > -2) {
      sunDirActive = true;
      const elevGate = Math.min(1, Math.max(0, (dnc_state.sunElevDeg + 2) / 7));
      tintStrength = elevGate * (cloudState.rain ? 0.08 : 0.18);

      // Tint color from DNC light phase
      const tLA = DNC_LIGHT_SETS[phase];
      const tLB = DNC_LIGHT_SETS[nextPhase];
      const tCol = dnc_lerpHex(tLA.col, tLB.col, crossBlend);
      tintR = ((tCol >> 16) & 0xff) / 255;
      tintG = ((tCol >> 8) & 0xff) / 255;
      tintB = (tCol & 0xff) / 255;

      // Sun direction in dome-local space
      const swx = camera.position.x + sunX;
      const swy = sunY;
      const swz = camera.position.z + sunZ;
      const dRotY = cloudDome.rotation.y;
      const cR = Math.cos(dRotY), sR = Math.sin(dRotY);
      const slx =  swx * cR + swz * sR;
      const sly =  swy;
      const slz = -swx * sR + swz * cR;
      const sLen = Math.sqrt(slx * slx + sly * sly + slz * slz);
      sdx = slx / sLen; sdy = sly / sLen; sdz = slz / sLen;
    }

    for (let i = 0; i < cdPos.count; i++) {
      const elev = cloudVertElevation[i];
      const palPos = 1.0 - elev;
      const col = dnc_sampleSkyPalette(skyPal, palPos);
      let r = (col[0] / 255) * cloudBright;
      let g = (col[1] / 255) * cloudBright;
      let b = (col[2] / 255) * cloudBright;

      if (sunDirActive) {
        const vx = cdPos.getX(i), vy = cdPos.getY(i), vz = cdPos.getZ(i);
        const vLen = Math.sqrt(vx * vx + vy * vy + vz * vz);
        const cosTheta = (vx * sdx + vy * sdy + vz * sdz) / vLen;
        // t: 0 (away from sun) to 1 (toward sun)
        const t = cosTheta * 0.5 + 0.5;
        // Warm tint toward sun
        r += t * tintStrength * tintR;
        g += t * tintStrength * tintG;
        b += t * tintStrength * tintB;
      }

      cvColors[i * 3]     = Math.min(1, r);
      cvColors[i * 3 + 1] = Math.min(1, g);
      cvColors[i * 3 + 2] = Math.min(1, b);
    }
    cloudDomeGeo.attributes.color.needsUpdate = true;
  }

  // === LIGHTING ===
  const lA = DNC_LIGHT_SETS[phase];
  const lB = DNC_LIGHT_SETS[nextPhase];
  const cloudMul = 1.0 - cloudState.cover * 0.5; // weather dimming
  // Shadow contrast factors — reduce fill lights when sun is low for dramatic shadows
  const elevFill = Math.max(0, Math.min(1, dnc_state.sunElevDeg / 40));
  const shadowContrast = 0.4 + elevFill * 0.6; // 0.4 at horizon, 1.0 when sun is high

  // Sun directional light
  sunLight.color.setHex(dnc_lerpHex(lA.col, lB.col, crossBlend));
  // Gate sunlight intensity by sun elevation — prevents premature specular on water
  // during late-night crossBlend into dawn while the sun is still deep below horizon.
  // Ramp: 0 when sun ≤ -2°, full when sun ≥ 3° (matches sun sprite appearance)
  const sunElevGate = Math.min(1, Math.max(0, (dnc_state.sunElevDeg + 2) / 5));
  sunLight.intensity = dnc_lerpVal(lA.int, lB.int, crossBlend) * cloudMul * sunElevGate;
  // Move sunLight to match sun position — proper directional tracking for realistic shadows
  // Sun position is always computed (even below horizon at night) for smooth transitions
  {
    const shadowDist = 80;
    
    // Get the actual sun direction vector — sunX/Y/Z are camera-relative offsets
    const dirX = sunX;
    const dirY = Math.max(sunY, 0.5); // tiny min to avoid zero
    const dirZ = sunZ;
    const dirLen = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
    
    // Normalized direction
    const nx = dirX / dirLen;
    const ny = dirY / dirLen;
    const nz = dirZ / dirLen;
    
    // Place light along this direction from the target
    sunLight.position.set(
      nx * shadowDist,
      ny * shadowDist,
      ISLAND_Z + nz * shadowDist
    );
    
    // Dynamically adjust shadow camera frustum based on sun elevation
    if (!sunBelowHorizon) {
      const elevNorm = Math.max(0, Math.min(1, dnc_state.sunElevDeg / 72));
      const frustumScale = 1.0 + (1.0 - elevNorm) * 1.2;
      const baseFrustum = 130;
      sunLight.shadow.camera.left   = -baseFrustum * frustumScale;
      sunLight.shadow.camera.right  =  baseFrustum * frustumScale;
      sunLight.shadow.camera.top    =  baseFrustum * frustumScale;
      sunLight.shadow.camera.bottom = -baseFrustum * frustumScale * 0.5;
      sunLight.shadow.camera.far    = 300 * frustumScale;
      sunLight.shadow.camera.updateProjectionMatrix();
    }
  }

  // Hemisphere light — reduce when sun is low for shadow contrast
  if (dnc_hemiLight) {
    dnc_hemiLight.color.setHex(dnc_lerpHex(lA.hSky, lB.hSky, crossBlend));
    dnc_hemiLight.groundColor.setHex(dnc_lerpHex(lA.hGnd, lB.hGnd, crossBlend));
    const hemiBase = dnc_lerpVal(lA.hInt, lB.hInt, crossBlend);
    // Reduce hemisphere fill when sun is low to deepen shadows
    const hemiShadowMul = 0.5 + elevFill * 0.5; // 0.5 at horizon, 1.0 at zenith
    dnc_hemiLight.intensity = hemiBase * hemiShadowMul;
  }

  // Back & under lights dim at night and dawn/dusk for shadow contrast
  const nightDim = (phase === 3) ? 0.1 : (phase === 2 ? dnc_lerpVal(0.6, 0.1, crossBlend) : (phase === 0 ? dnc_lerpVal(0.5, 1, phaseT) : 1));
  backLight.intensity = 0.3 * nightDim * cloudMul * shadowContrast;
  underLight.intensity = 0.4 * nightDim * shadowContrast;
  uwGlow1.intensity = (phase === 3) ? 0.15 : 0.4 * cloudMul;
  uwGlow2.intensity = (phase === 3) ? 0.1 : 0.3 * cloudMul;

  // Moonlight — directional, follows moon direction
  if (moonElevDeg > 0 && moonHorizFade > 0.01) {
    moonLight.position.set(moonDirX * 100, Math.max(moonDirY * 100, 5), moonDirZ * 100);
    moonLight.intensity = 0.2 * moonHorizFade * (0.3 + Math.min(1, moonElevDeg / 40) * 0.7) * _currentMoonPhase.illumination;
    const moonColorT = Math.min(1, moonElevDeg / 50);
    moonLight.color.setRGB(
      (0x80 + moonColorT * 0x10) / 255,
      (0x88 + moonColorT * 0x08) / 255,
      (0xa0 + moonColorT * 0x18) / 255
    );
  } else {
    moonLight.intensity = 0;
  }

  // Tone mapping exposure
  renderer.toneMappingExposure = dnc_lerpVal(lA.exp, lB.exp, crossBlend);

  // Dynamic fog color: darken at night for rain/mist weather
  if (scene.fog) {
    // Night fog is much darker; dawn/dusk fade between day and night
    const dayFog = cloudState.rain ? 0x8090a0 : 0xc0d0d8;
    const nightFog = cloudState.rain ? 0x1a2030 : 0x405060;
    let fogBlend; // 0 = night, 1 = day
    if (phase === 3) fogBlend = 0;
    else if (phase === 1) fogBlend = 1;
    else if (phase === 0) fogBlend = Math.min(1, phaseT * 2); // dawn: ramp up
    else fogBlend = 1 - crossBlend; // dusk: ramp down
    scene.fog.color.setHex(dnc_lerpHex(nightFog, dayFog, fogBlend));
  }

  // Rain particles: darken at night so streaks aren't bright white against dark sky
  if (cloudState.rain) {
    const dayRain  = 0xe8eef4; // original light blue-white
    const nightRain = 0x7888a0; // muted blue-grey, visible but not bright
    let rainBlend; // 0 = night, 1 = day
    if (phase === 3) rainBlend = 0;
    else if (phase === 1) rainBlend = 1;
    else if (phase === 0) rainBlend = Math.min(1, phaseT * 2);
    else rainBlend = 1 - crossBlend;
    const rc = dnc_lerpHex(nightRain, dayRain, rainBlend);
    rainMat.uniforms.uColor.value.setHex(rc);
  }

  // God rays: dimmer at night, brighter at noon
  const rayTimeMul = (phase === 3) ? 0.05 : (phase === 0 || phase === 2) ? 0.5 : 1.0;
  godRayMat.uniforms.uDncMul.value = rayTimeMul;

  // Caustics: dim at night (always active, including build mode)
  // Caustic intensity: full during day, dim at night (moonlit), smooth fade during dusk & dawn
  let causticTimeMul;
  if (phase === 3) {
    causticTimeMul = 0.30;
  } else if (phase === 2) {
    causticTimeMul = dnc_lerpVal(1.0, 0.30, crossBlend); // dusk: 1.0 → 0.30
  } else if (phase === 0) {
    // Dawn: smoothly ramp from night-level (0.30) to full (1.0) over the phase
    causticTimeMul = dnc_lerpVal(0.30, 1.0, Math.min(1, phaseT * 2.0)); // reaches 1.0 at 50% through dawn
  } else {
    causticTimeMul = 1.0; // noon: full
  }
  const causticIntensity = causticTimeMul * cloudMul;
  causticMat.uniforms.uIntensity.value = causticIntensity;
  dnc_state.causticIntensity = causticIntensity;

  // Sun specular plane: visible during daytime + dawn/dusk for sun shimmer on water
  // Hidden during rain — full overcast deck blocks direct sunlight
  {
    // Horizon fade: smooth ramp based on sun elevation
    // Specular starts just before the sun disc crests the horizon (-1°),
    // reaches full intensity at +5° — prevents premature shimmer during dark sky
    const horizonFade = (!sunBelowHorizon && !cloudState.rain)
      ? Math.min(1, Math.max(0, (dnc_state.sunElevDeg + 1) / 6)) // -1° → 5° maps to 0 → 1
      : 0;

    if (horizonFade > 0.001) {
      sunSpecPlane.visible = true;
      // Sun elevation: 0=horizon, 1=zenith
      const normElev2 = Math.max(0, Math.min(1, dnc_state.sunElevDeg / 72));
      // Intensity: much stronger at low sun for dramatic glitter path column
      // Cloud cover dims it but doesn't remove it — light still penetrates overcast
      const cloudDim = 1.0 - cloudState.cover * 0.55; // 0.45 at full cover vs 1.0 clear
      const shimmerIntensity = (1.8 - normElev2 * 1.2) * cloudDim * horizonFade;
      sunSpecMat.uniforms.uSunIntensity.value = shimmerIntensity;
      // Color: deep orange-red at horizon, neutral white-gold at zenith
      // When cloudy, desaturate slightly toward silver-white
      const cloudDesat = cloudState.cover * 0.4;
      const sr = 1.0;
      const sg = dnc_lerpVal(0.45, 0.95, normElev2) + cloudDesat * (1.0 - dnc_lerpVal(0.45, 0.95, normElev2));
      const sb = dnc_lerpVal(0.15, 0.85, normElev2) + cloudDesat * (1.0 - dnc_lerpVal(0.15, 0.85, normElev2));
      sunSpecMat.uniforms.uSunColor.value.set(sr, sg, sb);
    } else {
      sunSpecPlane.visible = false;
    }
  }
  // Update sun direction in specular shader — sunX/Y/Z are now camera-relative offsets
  _sunDirVec.set(sunX, Math.max(sunY, 1), sunZ).normalize();
  sunSpecMat.uniforms.uSunDir.value.copy(_sunDirVec);
  // Sun world pos for glitter path: project far along the sun direction from camera
  sunSpecMat.uniforms.uSunWorldPos.value.set(
    camera.position.x + _sunDirVec.x * sunDist,
    sunY,
    camera.position.z + _sunDirVec.z * sunDist
  );

  // === MOON SPECULAR ON WATER ===
  if (moonVisible && moonElevDeg > 0 && !cloudState.rain) {
    moonSpecPlane.visible = true;
    // Use the pure direction vector (already normalized) — moon is camera-relative
    _moonDirVec.set(moonDirX, moonDirY, moonDirZ);
    moonSpecMat.uniforms.uMoonDir.value.copy(_moonDirVec);
    // Project far along direction from camera for glitter path axis
    moonSpecMat.uniforms.uMoonWorldPos.value.set(
      camera.position.x + moonDirX * moonDist,
      moonDirY * moonDist,
      camera.position.z + moonDirZ * moonDist
    );
    const moonNormElev = Math.max(0, Math.min(1, moonElevDeg / 65));
    moonSpecMat.uniforms.uMoonIntensity.value = 1.0 * moonHorizFade * (0.6 + moonNormElev * 0.4) * _currentMoonPhase.illumination;
  } else {
    moonSpecPlane.visible = false;
  }

  // === WATER TINT ===
  const wA = DNC_WATER_TINTS[phase];
  const wB = DNC_WATER_TINTS[nextPhase];
  const wr = dnc_lerpVal(wA.r, wB.r, crossBlend);
  const wg = dnc_lerpVal(wA.g, wB.g, crossBlend);
  const wb = dnc_lerpVal(wA.b, wB.b, crossBlend);
  // Expose tint for per-frame foam pass in main.js
  dnc_state.waterTintR = wr;
  dnc_state.waterTintG = wg;
  dnc_state.waterTintB = wb;
  const wColors = waterGeo.attributes.color.array;
  // During rain/fog, blend far-edge water vertices toward the fog color
  // so the water-to-sky seam at the horizon is invisible
  const hasFogBlend = cloudState.rain && scene.fog;
  let fogR, fogG, fogB;
  if (hasFogBlend) {
    fogR = scene.fog.color.r; fogG = scene.fog.color.g; fogB = scene.fog.color.b;
  }
  for (let i = 0; i < wPos.count; i++) {
    let cr = Math.min(1, dnc_waterBaseColors[i*3]   * wr);
    let cg = Math.min(1, dnc_waterBaseColors[i*3+1] * wg);
    let cb = Math.min(1, dnc_waterBaseColors[i*3+2] * wb);
    if (hasFogBlend) {
      const x = wPos.getX(i), y = wPos.getY(i);
      const edgeDist = Math.max(Math.abs(x), Math.abs(y));
      // Blend toward fog color starting at 400 units, fully fog-colored at 600
      if (edgeDist > 400) {
        const t = Math.min(1, (edgeDist - 400) / 200);
        cr = cr + (fogR - cr) * t;
        cg = cg + (fogG - cg) * t;
        cb = cb + (fogB - cb) * t;
      }
    }
    wColors[i*3]   = cr;
    wColors[i*3+1] = cg;
    wColors[i*3+2] = cb;
  }
  waterGeo.attributes.color.needsUpdate = true;

  // Water opacity: slightly more transparent at noon, more opaque at night
  const waterOpacityTarget = (phase === 3) ? 0.65 : (phase === 1) ? 0.50 : 0.55;
  waterMat.opacity = dnc_lerpVal(waterMat.opacity, waterOpacityTarget, 0.02);

  // Water roughness + clearcoat: increase during rain to kill PBR specular from sunLight
  // Clearcoat produces strong Fresnel reflections at grazing angles even with high roughness
  const roughTarget = cloudState.rain ? 0.8 : 0.01;
  const ccTarget = cloudState.rain ? 0.0 : 1.0;
  waterMat.roughness = dnc_lerpVal(waterMat.roughness, roughTarget, 0.05);
  waterMat.clearcoat = dnc_lerpVal(waterMat.clearcoat, ccTarget, 0.05);

  // Cloud dome tint: per-vertex sky gradient (updated in sky block above)
  // — moved into throttled sky update for performance —

  // Cloud vertex colors: sample sky palette at each vertex's elevation
  // This runs inside the throttled sky update block further up, but we also
  // need the skyPal reference. So we store the last computed palette.
  // (see dnc_updateCloudColors call in sky update block)

  // Mist dome color
  const mistTints = [0xe0c8b0, 0xdde4ea, 0xd0a888, 0x202840];
  mistMat.color.setHex(dnc_lerpHex(mistTints[phase], mistTints[nextPhase], crossBlend));

  // Update UI labels + slider position
  // During time lapse, throttle DOM updates to ~10/sec to reduce layout/paint overhead
  const dncLabel = document.getElementById('dncPhaseLabel');
  const dncTimeLabel = document.getElementById('dncTimeLabel');
  const dncSliderEl = document.getElementById('dncSlider');
  const phaseIcons = ['🌅','☀️','🌇','🌙'];

  const tlThrottle = dnc_state.timeLapse && dnc_state._tlUITime !== undefined
    && (elapsedTime - dnc_state._tlUITime) < 0.1;
  if (dnc_state.timeLapse) dnc_state._tlUITime = tlThrottle ? dnc_state._tlUITime : elapsedTime;

  if (dncLabel && !tlThrottle) {
    const txt = phaseIcons[phase] + ' ' + DNC_PHASES[phase];
    if (dncLabel.textContent !== txt) dncLabel.textContent = txt;
  }
  if (dncTimeLabel && !tlThrottle) {
    // Display simulated time — reverse-map cycleTime back to clock hours
    // This tracks the slider position, not the real clock
    let simHour = 6; // fallback: dawn start
    for (let i = 0; i < 4; i++) {
      const phStart = DNC_STARTS[i];
      const phEnd = phStart + DNC_DURS[i];
      if (ct >= phStart && ct < phEnd) {
        const t = (ct - phStart) / DNC_DURS[i];
        const [hStart, hEnd] = DNC_HOUR_RANGES[i];
        simHour = hStart + t * (hEnd - hStart);
        break;
      }
    }
    // Wrap 24–30 back to 0–6
    if (simHour >= 24) simHour -= 24;
    const hh = Math.floor(simHour);
    const mm = Math.floor((simHour - hh) * 60);
    dncTimeLabel.textContent = String(hh).padStart(2,'0') + ':' + String(mm).padStart(2,'0');
  }
  // Sync slider (only when not being dragged by user, or during time lapse)
  if (dncSliderEl && !tlThrottle && (!dnc_state.paused || dnc_state.timeLapse)) {
    dncSliderEl.value = ct;
  }
}

// ============================================================
// EXPORTS
// ============================================================
export {
  // Cloud system
  cloudState,
  cloudDome,

  // Lighting
  sunLight,
  dnc_hemiLight,
  backLight,
  underLight,
  uwGlow1,
  uwGlow2,

  // DNC state & constants
  dnc_state,
  DNC_TOTAL,
  DNC_PHASES,
  DNC_STARTS,
  DNC_DURS,

  // Water
  waterSurface,
  waterMat,
  waterGeo,
  wPos,
  wOrigZ,
  dnc_waterBaseColors,

  // Sun specular
  sunSpecPlane,
  sunSpecMat,
  waterClipPlane,

  // Waterline
  waterline,
  wlGeo,
  wlOrigY,
  wlPos,

  // Horizon glow
  horizGlow,
  dnc_horizGlowBaseAlpha,

  // Caustics
  causticMat,
  causticUniforms,

  // God rays
  lightRays,
  godRayMat,

  // Particles
  particles,
  particleCount,

  // Rain
  rainParticles,
  RAIN_COUNT,
  rainVelocities,
  stormTex,
  cloudTex,

  // Celestial bodies
  dnc_sunSprite,
  dnc_moonSprite,
  dnc_stars,
  dnc_sunTexZenith,
  dnc_sunTexHorizon,

  // Moon specular
  moonSpecPlane,
  moonSpecMat,

  // Moonlight
  moonLight,

  // Underwater backdrop
  uwBackdrop,

  // Seabed
  seabed,
  sampleSeabedHeight,

  // Mist
  mistDome,
  mistMat,

  // Sun arc calibration
  sunArcConfig,
  sunArcConfigs,
  // Moon arc calibration
  moonArcConfig,
  moonArcConfigs,
  setActiveDeviceClass,
  detectDeviceClass,

  // DNC update function
  dnc_update,
};
