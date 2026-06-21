// ============================================================
// campfire.js — Evening campfire on the Home Beach
// ============================================================
// A single, fixed hero campfire. Always present as a cold fire pit
// (ring of stones + crossed driftwood logs). At dusk it IGNITES — flames,
// glowing coal bed, rising embers, a subtle smoke plume, and one warm
// flickering point light all fade in — and dies back out by dawn. The
// "ignite" level is driven entirely by the sun's elevation (dnc_state),
// so it tracks the device-clock day/night cycle with everything else.
//
// PERFORMANCE (one fixed object — never instanced at scale):
//  • ~9 draw calls total: instanced stones (1), 3 log meshes, coal bed (1),
//    3 additive flame quads, ember Points (1), smoke Points (1).
//  • Shared materials, no per-frame `new` allocations (temps are module-scope).
//  • When the fire is out (full daylight) all dynamic parts are hidden and
//    their per-frame work is skipped — only the cold pit remains.
//  • One extra PointLight (no shadow casting) — the scene already runs 6.
//
// AUDIO: a procedural Web-Audio crackle (filtered-noise bed + random pops),
// so there is no asset to ship or 404. Master volume follows the ignite
// level, so even when enabled it stays silent until evening. Folded into the
// Settings → Audio → Ambient toggle (off by default, and force-muted on the
// wallpaper per the silence rules in settings.js).
// ============================================================

import * as THREE from 'three';
import { scene, camera, renderer, terrainRefs, TILE_SIZE, OCEAN_FLOOR_Y } from './state.js';
import { getTerrainHeight } from './terrain.js';
import { dnc_state } from './sky-water.js';

// ── Placement (tunable) ─────────────────────────────────────
// Home Beach, just off the player spawn (0, -155) / camera home (z -150),
// nudged camera-right so it frames without blocking centre. Easy to move.
const FIRE_X = 5.0;
const FIRE_Z = -149.0;

// ── Warm light (tunable) ────────────────────────────────────
const FIRE_LIGHT_COLOR = 0xff6a1e;   // ember orange
const FIRE_LIGHT_INTENSITY = 2.4;    // peak (multiplied by ignite × flicker)
const FIRE_LIGHT_DISTANCE = 16;      // small pool — lights nearby sand/logs/player only

// ── Crackle volume (tunable) ────────────────────────────────
const FIRE_VOLUME = 0.5;             // master gain at full ignite

// ── Module state ────────────────────────────────────────────
let _group = null;          // root group, positioned on the sand
let _coalMat = null;        // coal-bed shader (uTime, uIgnite, uFlicker)
let _coalMesh = null;       // coal-bed mesh (for visibility toggling)
let _flameMats = [];        // per-layer flame shaders
let _flameGroup = null;     // billboarded flame layers
let _light = null;
let _embers = null;         // {points, pos, alpha, vel, phase}
let _smoke = null;          // {points, pos, alpha, vel, phase}
let _ignite = 0;            // 0 = out (day) … 1 = full (night)

// Reused temps — never allocate in the frame loop.
const _camDir = new THREE.Vector3();

// ── Helpers ─────────────────────────────────────────────────
function smoothstep(e0, e1, x) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

// Raycast down for the true sand surface Y (matches rocks.js), with an
// analytical fallback so we never end up floating or buried if the raycast misses.
function surfaceY(wx, wz) {
  const bg = terrainRefs.blocksGroup;
  if (bg && bg.children.length) {
    const targets = [...bg.children];
    if (terrainRefs.seabedMesh) targets.push(terrainRefs.seabedMesh);
    const ray = new THREE.Raycaster(new THREE.Vector3(wx, 50, wz), new THREE.Vector3(0, -1, 0));
    const hits = ray.intersectObjects(targets, true);
    if (hits.length) return hits[0].point.y;
  }
  return getTerrainHeight(wx, wz) * TILE_SIZE + OCEAN_FLOOR_Y;
}

// ── Flame shader — procedural, additive, no texture ─────────
// A single quad whose base sits on the logs (geometry translated so v=0 is the
// bottom). Rising turbulence + sway carve a licking flame silhouette; the
// colour ramps white-yellow core → orange → deep red tips. uPhase de-syncs the
// three stacked layers so the fire reads as volume, not a flat decal.
function makeFlameMaterial(phase, additive = true) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    uniforms: {
      uTime: { value: 0 },
      uIgnite: { value: 0 },
      uPhase: { value: phase },
      uAdditive: { value: additive ? 1.0 : 0.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uIgnite;
      uniform float uPhase;
      uniform float uAdditive;
      varying vec2 vUv;

      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        float a = hash(i), b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      void main() {
        vec2 uv = vUv;
        float t = uTime + uPhase;

        // Rising turbulence (two octaves, scrolling upward).
        float n = noise(vec2(uv.x * 4.0 + uPhase, uv.y * 6.0 - t * 3.0)) * 0.5
                + noise(vec2(uv.x * 9.0 + 5.0, uv.y * 13.0 - t * 5.0)) * 0.25;

        // Horizontal sway grows toward the tip.
        float sway = (noise(vec2(uv.y * 3.0 - t * 2.0, uPhase)) - 0.5) * 0.20 * uv.y;
        float dx = abs(uv.x - 0.5 + sway);

        // Half-width: widest low, pinching to a point at the top, roughened by noise.
        float hw = 0.40 * (1.0 - uv.y) * (0.55 + 0.45 * uv.y);
        hw *= 0.80 + n * 0.55;

        float body = smoothstep(hw, hw * 0.30, dx);
        float tip  = 0.82 + n * 0.42;                              // flickering top edge
        float vfade = smoothstep(0.0, 0.12, uv.y) * (1.0 - smoothstep(tip * 0.70, tip, uv.y));
        float mask = body * vfade;
        if (mask < 0.01) discard;

        // Hot core toward the centre-base.
        float core = mask * smoothstep(hw, 0.0, dx) * (1.0 - uv.y * 0.6);
        vec3 col = mix(vec3(0.85, 0.16, 0.02), vec3(1.0, 0.52, 0.12), mask);
        col = mix(col, vec3(1.0, 0.83, 0.42), core);
        col = mix(col, vec3(1.0, 0.96, 0.78), smoothstep(0.55, 1.0, core));

        float a = mask * uIgnite;
        if (uAdditive > 0.5) {
          gl_FragColor = vec4(col * a, a);                         // additive glow / licks
        } else {
          // Opaque core: the dense body fully covers the background, so the
          // horizon seam no longer shows through. Edges stay soft/feathered.
          float bodyA = clamp(mask * 1.8, 0.0, 1.0) * uIgnite;
          gl_FragColor = vec4(col, bodyA);
        }
      }
    `,
  });
}

// ── Coal bed — flat additive disc of glowing embers under the logs ─
function makeCoalBed() {
  const geo = new THREE.CircleGeometry(0.5, 24);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uIgnite: { value: 0 }, uFlicker: { value: 1 } },
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: `
      uniform float uTime; uniform float uIgnite; uniform float uFlicker;
      varying vec2 vUv;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      void main() {
        float r = length(vUv - 0.5) * 2.0;
        if (r > 1.0) discard;
        // Mottled coals — cells of hotter/cooler embers, slow shimmer.
        vec2 cell = floor((vUv - 0.5) * 9.0);
        float heat = hash(cell);
        heat *= 0.6 + 0.4 * sin(uTime * 3.0 + heat * 30.0);
        float glow = pow(1.0 - r, 1.6) * (0.5 + 0.7 * heat);
        vec3 col = mix(vec3(0.7, 0.10, 0.02), vec3(1.0, 0.55, 0.15), heat);
        float a = glow * uIgnite * uFlicker;
        gl_FragColor = vec4(col * a, a);
      }
    `,
  });
  const m = new THREE.Mesh(geo, mat);
  m.rotation.x = -Math.PI / 2;     // lie flat on the sand
  m.position.y = 0.05;
  _coalMat = mat;
  return m;
}

// ── Soft round Points (shared shape for embers + smoke) ─────
function makePoints(count, color, blending, baseSize, baseAlpha) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const alpha = new Float32Array(count);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('alpha', new THREE.BufferAttribute(alpha, 1));
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending,
    uniforms: {
      uScale: { value: renderer.domElement.height * renderer.getPixelRatio() * 0.5 },
      uSize: { value: baseSize },
      uColor: { value: new THREE.Color(color) },
    },
    vertexShader: `
      attribute float alpha;
      varying float vAlpha;
      uniform float uSize; uniform float uScale;
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
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;     // small cloud near a fixed point — keep it simple
  return { points, pos, alpha, geo, baseAlpha };
}

// Spawn one ember at the fire base (small disc), with upward speed + drift.
function spawnEmber(e, i) {
  const a = Math.random() * Math.PI * 2;
  const r = Math.random() * 0.30;
  e.pos[i * 3]     = Math.cos(a) * r;
  e.pos[i * 3 + 1] = 0.12 + Math.random() * 0.18;
  e.pos[i * 3 + 2] = Math.sin(a) * r;
  e.vel[i] = 0.008 + Math.random() * 0.014;      // rise speed (frame-based, like dust)
  e.phase[i] = Math.random() * Math.PI * 2;
  e.life[i] = 0.6 + Math.random() * 0.8;         // seconds-ish before reset (height-gated too)
  e.alpha[i] = 0;
}

function spawnSmoke(s, i) {
  const a = Math.random() * Math.PI * 2;
  const r = Math.random() * 0.25;
  s.pos[i * 3]     = Math.cos(a) * r;
  s.pos[i * 3 + 1] = 1.2 + Math.random() * 0.4;  // starts just off the flame tips (~1.4)
  s.pos[i * 3 + 2] = Math.sin(a) * r;
  s.vel[i] = 0.005 + Math.random() * 0.008;      // slower than embers
  s.phase[i] = Math.random() * Math.PI * 2;
  s.alpha[i] = 0;
}

// ── Build everything ────────────────────────────────────────
export function initCampfire() {
  const groundY = surfaceY(FIRE_X, FIRE_Z);

  _group = new THREE.Group();
  _group.position.set(FIRE_X, groundY, FIRE_Z);
  scene.add(_group);

  // — Cold pit: ring of stones (1 instanced draw call) —
  const stoneGeo = new THREE.IcosahedronGeometry(0.17, 0);
  const sp = stoneGeo.attributes.position;
  for (let i = 0; i < sp.count; i++) {                 // squash slightly so they sit naturally
    sp.setY(i, sp.getY(i) * 0.7);
  }
  stoneGeo.computeVertexNormals();
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x6f675c, roughness: 0.9, metalness: 0.02, flatShading: true });
  const RING = 9, ringR = 0.55;
  const stones = new THREE.InstancedMesh(stoneGeo, stoneMat, RING);
  stones.castShadow = true; stones.receiveShadow = true;
  const dummy = new THREE.Object3D();
  for (let i = 0; i < RING; i++) {
    const a = (i / RING) * Math.PI * 2;
    const jr = ringR + (Math.sin(a * 3.1) * 0.04);
    dummy.position.set(Math.cos(a) * jr, 0.02 + Math.sin(a * 5.0) * 0.03, Math.sin(a) * jr);
    dummy.rotation.set(a * 1.7, a * 2.3, a);
    dummy.scale.setScalar(0.8 + ((i * 37) % 10) / 22);
    dummy.updateMatrix();
    stones.setMatrixAt(i, dummy.matrix);
  }
  stones.instanceMatrix.needsUpdate = true;
  _group.add(stones);

  // — Crossed driftwood logs (charred) —
  const logGeo = new THREE.CylinderGeometry(0.075, 0.09, 1.15, 8);
  logGeo.rotateZ(Math.PI / 2);                         // lay the cylinder horizontal (axis → X)
  const logMat = new THREE.MeshStandardMaterial({ color: 0x35261a, roughness: 0.95, metalness: 0.0, flatShading: true });
  for (let i = 0; i < 3; i++) {
    const log = new THREE.Mesh(logGeo, logMat);
    log.rotation.y = (i / 3) * Math.PI;                // 0°, 60°, 120° crossing
    log.position.y = 0.13 + i * 0.05;                  // slight teepee stack
    log.castShadow = true; log.receiveShadow = true;
    _group.add(log);
  }

  // — Coal bed —
  _coalMesh = makeCoalBed();
  _group.add(_coalMesh);

  // — Flames: an opaque core + billboarded additive licks —
  _flameGroup = new THREE.Group();
  _flameGroup.position.y = 0.16;                       // base sits on the logs
  // Short and a touch wider — a contained campfire flame, not a tall spike.
  // First layer is the OPAQUE CORE (normal blend) that covers the background so
  // the horizon seam can't show through; the rest are additive glow/licks.
  const flameSpecs = [
    { w: 1.05, h: 1.05, x: 0.0,   phase: 0.0, additive: false }, // opaque core
    { w: 1.25, h: 1.25, x: 0.0,   phase: 0.6, additive: true },  // main glow
    { w: 0.9,  h: 1.0,  x: -0.14, phase: 2.3, additive: true },
    { w: 0.8,  h: 0.82, x: 0.15,  phase: 4.7, additive: true },
  ];
  for (const f of flameSpecs) {
    const geo = new THREE.PlaneGeometry(f.w, f.h);
    geo.translate(f.x, f.h / 2, 0);                    // origin at the flame base
    const mat = makeFlameMaterial(f.phase, f.additive);
    _flameMats.push(mat);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.renderOrder = f.additive ? 1 : 0;             // core first, glow over it
    _flameGroup.add(mesh);
  }
  _group.add(_flameGroup);

  // — Embers (rising, additive, warm) —
  _embers = makePoints(48, 0xffb24a, THREE.AdditiveBlending, 0.5, 1);
  _embers.vel = new Float32Array(48);
  _embers.phase = new Float32Array(48);
  _embers.life = new Float32Array(48);
  for (let i = 0; i < 48; i++) spawnEmber(_embers, i);
  _group.add(_embers.points);

  // — Smoke (subtle, grey, normal blend) —
  _smoke = makePoints(28, 0x9a958c, THREE.NormalBlending, 1.7, 0.12);
  _smoke.vel = new Float32Array(28);
  _smoke.phase = new Float32Array(28);
  for (let i = 0; i < 28; i++) spawnSmoke(_smoke, i);
  _group.add(_smoke.points);

  // — Warm flickering light —
  _light = new THREE.PointLight(FIRE_LIGHT_COLOR, 0, FIRE_LIGHT_DISTANCE);
  _light.position.set(0, 0.6, 0);
  _light.castShadow = false;                           // perf: never a second shadow pass
  _group.add(_light);

  // Start hidden until the first update sets the ignite level.
  setDynamicVisible(false);
}

function setDynamicVisible(v) {
  if (_flameGroup) _flameGroup.visible = v;
  if (_coalMesh) _coalMesh.visible = v;
  if (_embers) _embers.points.visible = v;
  if (_smoke) _smoke.points.visible = v;
  if (_light) _light.visible = v;
}

// ── Per-frame update ────────────────────────────────────────
export function updateCampfire(t, dt) {
  if (!_group) return;

  // Ignite level from sun elevation: full fire once the sun is below ~-2°,
  // fully out by ~+5° — so it lights at dusk and dies by dawn.
  _ignite = 1 - smoothstep(-2, 5, dnc_state.sunElevDeg);

  // Coal bed lives one tier "warmer" than the flames — a faint glow lingers
  // a touch into twilight. We still cut everything when essentially out.
  if (_ignite < 0.01) {
    setDynamicVisible(false);
    return;
  }
  setDynamicVisible(true);

  // Flicker — layered sines + a little noise, shared by light + coal bed.
  const flicker = 0.72
    + 0.16 * Math.sin(t * 17.0)
    + 0.08 * Math.sin(t * 29.3 + 1.7)
    + 0.04 * Math.sin(t * 53.0 + 0.5);

  // Flames
  for (const m of _flameMats) {
    m.uniforms.uTime.value = t;
    m.uniforms.uIgnite.value = _ignite;
  }
  // Billboard the flames yaw-only toward the camera (stay upright).
  _camDir.subVectors(camera.position, _group.position);
  _flameGroup.rotation.y = Math.atan2(_camDir.x, _camDir.z);

  // Coal bed
  if (_coalMat) {
    _coalMat.uniforms.uTime.value = t;
    _coalMat.uniforms.uIgnite.value = _ignite;
    _coalMat.uniforms.uFlicker.value = flicker;
  }

  // Light
  _light.intensity = FIRE_LIGHT_INTENSITY * _ignite * flicker;

  // Embers — rise, drift, twinkle, reset (frame-based, like the dust particles).
  {
    const p = _embers.pos, al = _embers.alpha, vel = _embers.vel, ph = _embers.phase, life = _embers.life;
    for (let i = 0; i < 48; i++) {
      p[i * 3 + 1] += vel[i];
      p[i * 3]     += Math.sin(t * 1.6 + ph[i]) * 0.004;
      p[i * 3 + 2] += Math.cos(t * 1.3 + ph[i]) * 0.004;
      life[i] -= dt;
      const y = p[i * 3 + 1];
      // Fade in low, fade out as it climbs; twinkle.
      const rise = Math.min(1, y / 0.35);
      const fade = Math.max(0, 1 - (y - 0.35) / 0.95);   // gone by ~1.3
      const twinkle = 0.6 + 0.4 * Math.sin(t * 12.0 + ph[i]);
      al[i] = rise * fade * twinkle * _ignite;
      if (y > 1.5 || life[i] <= 0) spawnEmber(_embers, i);
    }
    _embers.geo.attributes.position.needsUpdate = true;
    _embers.geo.attributes.alpha.needsUpdate = true;
  }

  // Smoke — slower rise, wider drift, fades out high. Kept subtle.
  {
    const p = _smoke.pos, al = _smoke.alpha, vel = _smoke.vel, ph = _smoke.phase;
    for (let i = 0; i < 28; i++) {
      p[i * 3 + 1] += vel[i];
      p[i * 3]     += Math.sin(t * 0.7 + ph[i]) * 0.010;
      p[i * 3 + 2] += Math.cos(t * 0.6 + ph[i]) * 0.008;
      const y = p[i * 3 + 1];
      const rise = Math.min(1, (y - 1.2) / 0.6);       // fade in just above the flames
      const fade = Math.max(0, 1 - (y - 1.9) / 1.4);   // thin out as it climbs (gone by ~3.3)
      al[i] = Math.max(0, rise) * fade * _smoke.baseAlpha * _ignite;
      if (y > 3.3) spawnSmoke(_smoke, i);
    }
    _smoke.geo.attributes.position.needsUpdate = true;
    _smoke.geo.attributes.alpha.needsUpdate = true;
  }

  // Audio master tracks the ignite level (silent by day even if toggled on).
  updateCrackleLevel(_ignite);
}

// ============================================================
// Procedural crackle (Web Audio) — no asset, gated by Settings toggle.
// ============================================================
let _audio = null;        // { ctx, master }
let _audioOn = false;
let _popTimer = null;

function ensureAudio() {
  if (_audio) return _audio;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Bed: looping brown-ish noise through a lowpass — the soft "rush" of fire.
  const len = Math.floor(ctx.sampleRate * 2);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    last = (last + 0.02 * w) / 1.02;
    d[i] = last * 3.0;
  }
  const bed = ctx.createBufferSource();
  bed.buffer = buf; bed.loop = true;
  const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
  const bedGain = ctx.createGain(); bedGain.gain.value = 0.45;
  bed.connect(lp); lp.connect(bedGain); bedGain.connect(master);
  bed.start();

  _audio = { ctx, master };
  return _audio;
}

// One short bandpassed noise "snap", then schedule the next at a random gap.
function popOnce() {
  if (!_audioOn || !_audio) return;
  const { ctx, master } = _audio;
  // Skip making nodes while the fire is essentially out — keeps it free by day.
  if (_ignite > 0.04) {
    const len = Math.floor(ctx.sampleRate * 0.06);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass'; bp.frequency.value = 1100 + Math.random() * 2600; bp.Q.value = 4;
    const g = ctx.createGain();
    const now = ctx.currentTime;
    const peak = 0.12 + Math.random() * 0.5;
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(peak, now + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.05 + Math.random() * 0.08);
    src.connect(bp); bp.connect(g); g.connect(master);
    src.start(now); src.stop(now + 0.2);
  }
  _popTimer = setTimeout(popOnce, 40 + Math.random() * 260);
}

function updateCrackleLevel(ignite) {
  if (!_audioOn || !_audio) return;
  // Smooth the master toward FIRE_VOLUME × ignite (avoids zipper noise).
  const target = FIRE_VOLUME * ignite;
  const g = _audio.master.gain;
  g.value += (target - g.value) * 0.08;
}

// Called by settings.js when the Ambient toggle changes (or on wallpaper mute).
export function setCampfireAudio(on) {
  if (on) {
    const a = ensureAudio();
    if (!a) return;
    if (a.ctx.state === 'suspended') a.ctx.resume().catch(() => {});
    _audioOn = true;
    if (!_popTimer) popOnce();
  } else {
    _audioOn = false;
    if (_popTimer) { clearTimeout(_popTimer); _popTimer = null; }
    if (_audio) _audio.master.gain.value = 0;
  }
}
// Cross-module hook (settings.js calls this without importing — mirrors
// window._setPlayerVisible / window._isPlayerUnderwater in this codebase).
window._setCampfireAudio = setCampfireAudio;
