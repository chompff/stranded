// ============================================================
// SEALIFE — a sea turtle that cruises the mid-lagoon, periodically rises
// to the surface to breathe (shell cresting the waterline for a few bobbing
// seconds), and every few minutes makes a slow close pass through the
// foreground shallows.
//
// Surface-first: composed to read from the fixed wallpaper camera as big,
// calm, dark-olive silhouettes gliding through the clear turquoise.
//
// House style (mirrors fish.js): procedural + instanced — 2 draw calls
// total (one InstancedMesh for both bodies: shell + head + tail merged;
// one for all 8 flippers). The geometry lives behind buildTurtleGeos() so
// a GLB body can replace it later without touching behaviour. Gentle veer
// away from the cursor-on-water point (the wallpaper's one input) and from
// the underwater diver; daytime-biased like the birds — at night the sim
// is skipped entirely. Zero per-frame allocations; floor raycasts
// amortised.
// ============================================================
import * as THREE from 'three';
import { scene, camera, terrainRefs, OCEAN_FLOOR_Y, buildState } from './state.js';
import { dnc_state } from './sky-water.js';
import { getPlayerWorldPosition, isPlayerActive, isPlayerUnderwater } from './player.js';

// ── Shared helpers (house style, mirrored from fish.js) ─────
function rand(a, b) { return a + Math.random() * (b - a); }
function smoothstep(e0, e1, x) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}
function lerpAngle(a, b, t) {
  let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (d < -Math.PI) d += Math.PI * 2;
  return a + d * t;
}
function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

// Merge indexed geometries (position + normal) into one BufferGeometry.
function mergeGeos(geos) {
  let vCount = 0, iCount = 0;
  for (const g of geos) {
    vCount += g.attributes.position.count;
    iCount += g.index ? g.index.count : g.attributes.position.count;
  }
  const pos = new Float32Array(vCount * 3);
  const nor = new Float32Array(vCount * 3);
  const idx = new Uint32Array(iCount);
  let vo = 0, io = 0;
  for (const g of geos) {
    const gp = g.attributes.position, gn = g.attributes.normal;
    for (let i = 0; i < gp.count; i++) {
      pos[(vo + i) * 3] = gp.getX(i);
      pos[(vo + i) * 3 + 1] = gp.getY(i);
      pos[(vo + i) * 3 + 2] = gp.getZ(i);
      nor[(vo + i) * 3] = gn.getX(i);
      nor[(vo + i) * 3 + 1] = gn.getY(i);
      nor[(vo + i) * 3 + 2] = gn.getZ(i);
    }
    if (g.index) {
      for (let i = 0; i < g.index.count; i++) idx[io + i] = vo + g.index.getX(i);
      io += g.index.count;
    } else {
      for (let i = 0; i < gp.count; i++) idx[io + i] = vo + i;
      io += gp.count;
    }
    vo += gp.count;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  geo.setIndex(new THREE.BufferAttribute(idx, 1));
  return geo;
}

// ── Reused temporaries (no per-frame allocation anywhere) ───
const _ray = new THREE.Raycaster();
const _rayOrigin = new THREE.Vector3();
const _rayDir = new THREE.Vector3(0, -1, 0);
const _acc = new THREE.Vector3();
const _player = new THREE.Vector3();
const _v1 = new THREE.Vector3();
const _m1 = new THREE.Matrix4();
const _m2 = new THREE.Matrix4();
const _mLocal = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _euler = new THREE.Euler();
const _color = new THREE.Color();
const _scaleV = new THREE.Vector3(1, 1, 1);

// Raycast straight down to the seabed/slabs at (x,z). Sparingly called.
function sampleFloor(x, z) {
  _rayOrigin.set(x, 50, z);
  _ray.set(_rayOrigin, _rayDir);
  let floorY = -Infinity;
  if (terrainRefs.seabedMesh) {
    const sh = _ray.intersectObject(terrainRefs.seabedMesh, false);
    if (sh.length > 0) floorY = sh[0].point.y;
  }
  if (terrainRefs.slabMeshes && terrainRefs.slabMeshes.length > 0) {
    const rh = _ray.intersectObjects(terrainRefs.slabMeshes, false);
    if (rh.length > 0 && rh[0].point.y > floorY) floorY = rh[0].point.y;
  }
  return floorY > -Infinity ? floorY : null;
}

// ── Cursor-on-water (the wallpaper's one input) ─────────────
// pointermove stores NDC only; the water-plane point is computed at most
// once per frame in updateSealife. Fresh for a short window after the move.
let _curNdcX = 0, _curNdcY = 0, _curMovedAt = -1e9, _curDirty = false;
const _cursorPt = new THREE.Vector3();   // where the cursor ray meets y=0
let _cursorFresh = false;
window.addEventListener('pointermove', (e) => {
  if (buildState.active) return;
  _curNdcX = (e.clientX / window.innerWidth) * 2 - 1;
  _curNdcY = -(e.clientY / window.innerHeight) * 2 + 1;
  _curDirty = true;
}, { passive: true });

function refreshCursorPoint(nowMs) {
  if (_curDirty) { _curMovedAt = nowMs; _curDirty = false; }
  _cursorFresh = (nowMs - _curMovedAt) < 2500;
  if (!_cursorFresh) return;
  _v1.set(_curNdcX, _curNdcY, 0.5).unproject(camera);
  _v1.sub(camera.position).normalize();
  if (_v1.y > -1e-4) { _cursorFresh = false; return; }  // looking up — no water hit
  const t = -camera.position.y / _v1.y;
  _cursorPt.copy(camera.position).addScaledVector(_v1, t);
}

// Generic "steer away from a point" helper. Adds to _acc.
function fleeFrom(px, py, pz, pos, radius, weight) {
  const dx = pos.x - px, dy = pos.y - py, dz = pos.z - pz;
  const d2 = dx * dx + dy * dy + dz * dz;
  const r2 = radius * radius;
  if (d2 < r2 && d2 > 1e-4) {
    const d = Math.sqrt(d2);
    const s = weight * (1 - d / radius);
    const inv = 1 / d;
    _acc.x += dx * inv * s;
    _acc.y += dy * inv * s;
    _acc.z += dz * inv * s;
    return true;
  }
  return false;
}

// ============================================================
// SEA TURTLES
// ============================================================
const TURTLE_COUNT = 1;
const TURTLE_HOME = { cx: 38, cz: -150, rx: 9, rz: 10 };   // mid-lagoon ellipse — kept clear of the shoreline
const TURTLE_DEPTH_MIN = -2.0, TURTLE_DEPTH_MAX = -0.9;     // cruise band — rides high, reads from the surface
const TURTLE_SPEED = 0.85;
const TURTLE_TURN = 1.4;
const TURTLE_BREATH_GAP = [55, 115];   // s between breaths
const TURTLE_BREATH_HOLD = [2.6, 4.0]; // s at the surface
const TURTLE_PASS_GAP = [200, 420];    // s between foreground close passes
const TURTLE_PASS_X = 20;              // the shallows lane the pass swims along (clear of the waterline strip)
const TURTLE_SURFACE_Y = -0.12;        // shell crests the waterline here

const turtles = [];
const turtleGroup = new THREE.Group();
let turtleMat = null, turtleBodyInst = null, turtleFlipInst = null;
let _turtleFloorCursor = 0;

// Standard sealife material: white base tinted per-instance, gentle emissive
// lift so nothing goes pure black in the dim underwater light.
function makeSeaMat(emissive) {
  return new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: emissive || 0x1c2733,
    emissiveIntensity: 0.3,
    roughness: 0.55,
    metalness: 0.0,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1,
  });
}

// Shell + head + tail as one merged body; one flipper geometry instanced
// 4× per turtle (front pair large, rear pair scaled down via the matrix).
function buildTurtleGeos() {
  const shell = new THREE.SphereGeometry(0.52, 10, 8);
  const sp = shell.attributes.position;
  for (let i = 0; i < sp.count; i++) {
    const y = sp.getY(i);
    // dome top, flat-ish plastron
    sp.setXYZ(i, sp.getX(i) * 0.86, y > 0 ? y * 0.5 : y * 0.22, sp.getZ(i) * 1.08);
  }
  shell.computeVertexNormals();
  const head = new THREE.SphereGeometry(0.145, 8, 6);
  head.scale(0.8, 0.7, 1.1);
  head.translate(0, 0.02, 0.66);
  const tail = new THREE.ConeGeometry(0.07, 0.22, 6);
  tail.rotateX(Math.PI / 2);            // point backwards
  tail.translate(0, -0.02, -0.62);
  const body = mergeGeos([shell, head, tail]);

  // Paddle: flattened teardrop, root at origin (hinge), sweeping outward +X.
  const flip = new THREE.SphereGeometry(0.3, 7, 5);
  const fp = flip.attributes.position;
  for (let i = 0; i < fp.count; i++) {
    const x = fp.getX(i);
    fp.setXYZ(i, (x + 0.3) * 0.95, fp.getY(i) * 0.10, fp.getZ(i) * (0.42 - x * 0.25));
  }
  flip.computeVertexNormals();
  return { body, flipper: flip };
}

function initTurtles() {
  const geos = buildTurtleGeos();
  turtleMat = makeSeaMat(0x14201a);
  turtleBodyInst = new THREE.InstancedMesh(geos.body, turtleMat, TURTLE_COUNT);
  turtleFlipInst = new THREE.InstancedMesh(geos.flipper, turtleMat, TURTLE_COUNT * 4);
  for (const im of [turtleBodyInst, turtleFlipInst]) {
    im.frustumCulled = false;
    im.castShadow = false;
    im.receiveShadow = false;
    turtleGroup.add(im);
  }
  scene.add(turtleGroup);

  const shellShades = [0x5f7d52, 0x55764e];
  for (let i = 0; i < TURTLE_COUNT; i++) {
    const a = rand(0, Math.PI * 2);
    turtles.push({
      pos: new THREE.Vector3(
        TURTLE_HOME.cx + Math.cos(a) * TURTLE_HOME.rx * 0.6,
        rand(TURTLE_DEPTH_MIN, TURTLE_DEPTH_MAX),
        TURTLE_HOME.cz + Math.sin(a) * TURTLE_HOME.rz * 0.6
      ),
      vel: new THREE.Vector3(0.2, 0, 0.2),
      heading: rand(0, Math.PI * 2), pitch: 0, roll: 0,
      wp: new THREE.Vector3(), wpSet: false,
      mode: 'cruise',                 // cruise | rise | breathe | dive | pass
      modeT: 0,
      breatheAt: 0, passAt: 0, passDir: 1,
      flapPhase: rand(0, Math.PI * 2),
      scale: i === 0 ? 1.0 : 0.82,    // adult; any extra turtles come younger/smaller
      floorY: OCEAN_FLOOR_Y,
    });
    _color.setHex(shellShades[i % shellShades.length]);
    turtleBodyInst.setColorAt(i, _color);
    _color.setHex(0x6f8f60);
    for (let k = 0; k < 4; k++) turtleFlipInst.setColorAt(i * 4 + k, _color);
  }
  if (turtleBodyInst.instanceColor) turtleBodyInst.instanceColor.needsUpdate = true;
  if (turtleFlipInst.instanceColor) turtleFlipInst.instanceColor.needsUpdate = true;
}

// Flipper local hinges: [±x offset, z offset, rear?]
const FLIP_SLOTS = [
  { x: 0.42, z: 0.30, rear: false, side: 1 },
  { x: -0.42, z: 0.30, rear: false, side: -1 },
  { x: 0.34, z: -0.42, rear: true, side: 1 },
  { x: -0.34, z: -0.42, rear: true, side: -1 },
];

function writeTurtleMatrices(i) {
  const tu = turtles[i];
  _euler.set(tu.pitch, tu.heading, tu.roll);
  _q.setFromEuler(_euler);
  _scaleV.setScalar(tu.scale);
  _m1.compose(tu.pos, _q, _scaleV);
  turtleBodyInst.setMatrixAt(i, _m1);
  // Flippers: hinge at the shell rim; front pair sweeps (rowing), rear pair
  // trails with a smaller, lagged stroke.
  const sweepF = Math.sin(tu.flapPhase) * 0.55;
  const sweepR = Math.sin(tu.flapPhase - 0.9) * 0.25;
  for (let k = 0; k < 4; k++) {
    const sl = FLIP_SLOTS[k];
    const sweep = (sl.rear ? sweepR : sweepF) * sl.side;
    _euler.set(sl.rear ? 0.15 : -0.1, sweep * (sl.rear ? 0.6 : 1), sweep * 0.5);
    _q.setFromEuler(_euler);
    _v1.set(sl.x, -0.02, sl.z);
    _scaleV.set(sl.side * (sl.rear ? 0.55 : 1), 1, sl.rear ? 0.6 : 1);
    _mLocal.compose(_v1, _q, _scaleV);
    _m2.multiplyMatrices(_m1, _mLocal);
    turtleFlipInst.setMatrixAt(i * 4 + k, _m2);
  }
}

function pickTurtleWaypoint(tu) {
  const a = rand(0, Math.PI * 2);
  const r = Math.sqrt(Math.random());
  tu.wp.set(
    TURTLE_HOME.cx + Math.cos(a) * TURTLE_HOME.rx * r,
    rand(TURTLE_DEPTH_MIN, TURTLE_DEPTH_MAX),
    TURTLE_HOME.cz + Math.sin(a) * TURTLE_HOME.rz * r
  );
  tu.wpSet = true;
}

function updateTurtles(t, dt, playerActive) {
  // Amortised floor sampling — one turtle every few frames is plenty.
  const tc = turtles[_turtleFloorCursor % TURTLE_COUNT];
  if ((_turtleFloorCursor & 3) === 0) {
    const fy = sampleFloor(tc.pos.x, tc.pos.z);
    if (fy !== null) tc.floorY = fy;
  }
  _turtleFloorCursor++;

  for (let i = 0; i < TURTLE_COUNT; i++) {
    const tu = turtles[i];
    if (tu.breatheAt === 0) tu.breatheAt = t + rand(TURTLE_BREATH_GAP[0], TURTLE_BREATH_GAP[1]);
    if (tu.passAt === 0) tu.passAt = t + rand(TURTLE_PASS_GAP[0], TURTLE_PASS_GAP[1]);

    // ── Mode transitions ──
    if (tu.mode === 'cruise') {
      if (t >= tu.breatheAt) { tu.mode = 'rise'; }
      else if (t >= tu.passAt) {
        tu.mode = 'pass';
        tu.passDir = Math.random() < 0.5 ? 1 : -1;
        tu.wp.set(TURTLE_PASS_X, -0.8, TURTLE_HOME.cz - 14 * tu.passDir);
        tu.wpSet = true;
      } else if (!tu.wpSet || _v1.subVectors(tu.wp, tu.pos).length() < 1.6) {
        pickTurtleWaypoint(tu);
      }
    } else if (tu.mode === 'rise') {
      tu.wp.set(tu.pos.x, TURTLE_SURFACE_Y, tu.pos.z);
      if (tu.pos.y > TURTLE_SURFACE_Y - 0.12) {
        tu.mode = 'breathe';
        tu.modeT = t + rand(TURTLE_BREATH_HOLD[0], TURTLE_BREATH_HOLD[1]);
      }
    } else if (tu.mode === 'breathe') {
      // Drift at the surface, shell bobbing in the waterline.
      tu.wp.set(tu.pos.x + Math.sin(tu.heading) * 2, TURTLE_SURFACE_Y, tu.pos.z + Math.cos(tu.heading) * 2);
      if (t >= tu.modeT) {
        tu.mode = 'dive';
        tu.breatheAt = t + rand(TURTLE_BREATH_GAP[0], TURTLE_BREATH_GAP[1]);
      }
    } else if (tu.mode === 'dive') {
      tu.wp.set(tu.pos.x, rand(TURTLE_DEPTH_MIN, TURTLE_DEPTH_MAX), tu.pos.z);
      if (tu.pos.y < TURTLE_DEPTH_MAX + 0.2) { tu.mode = 'cruise'; pickTurtleWaypoint(tu); }
    } else if (tu.mode === 'pass') {
      // Swim the shallows lane parallel to the beach, then head home.
      if (_v1.subVectors(tu.wp, tu.pos).length() < 1.8) {
        if (Math.abs(tu.wp.z - (TURTLE_HOME.cz - 14 * tu.passDir)) < 2) {
          tu.wp.set(TURTLE_PASS_X, -0.8, TURTLE_HOME.cz + 14 * tu.passDir); // traverse the lane
        } else {
          tu.mode = 'cruise';
          tu.passAt = t + rand(TURTLE_PASS_GAP[0], TURTLE_PASS_GAP[1]);
          pickTurtleWaypoint(tu);
        }
      }
    }

    // ── Steering: seek waypoint + gentle reactions ──
    _acc.set(0, 0, 0);
    _v1.subVectors(tu.wp, tu.pos);
    const dist = _v1.length();
    if (dist > 1e-3) {
      _v1.multiplyScalar(1 / dist);
      const urge = tu.mode === 'rise' || tu.mode === 'dive' ? 1.6 : 1.0;
      _acc.addScaledVector(_v1, TURTLE_TURN * urge);
    }
    if (playerActive) fleeFrom(_player.x, _player.y, _player.z, tu.pos, 7.0, 2.5);
    if (_cursorFresh && tu.mode !== 'breathe') fleeFrom(_cursorPt.x, _cursorPt.y, _cursorPt.z, tu.pos, 6.0, 1.2);

    tu.vel.addScaledVector(_acc, dt);
    const maxSp = tu.mode === 'pass' ? TURTLE_SPEED * 0.8 : TURTLE_SPEED;
    const sp = tu.vel.length();
    if (sp > maxSp) tu.vel.multiplyScalar(maxSp / sp);
    tu.pos.addScaledVector(tu.vel, dt);

    // Volume clamps: never beach, never fly.
    const floorHard = tu.floorY + 0.55;
    if (tu.pos.y < floorHard) { tu.pos.y = floorHard; if (tu.vel.y < 0) tu.vel.y = 0; }
    const ceil = tu.mode === 'rise' || tu.mode === 'breathe' ? TURTLE_SURFACE_Y + 0.05 : -0.6;
    if (tu.pos.y > ceil) { tu.pos.y = ceil; if (tu.vel.y > 0) tu.vel.y = 0; }
    // Surface bob while breathing
    if (tu.mode === 'breathe') tu.pos.y = TURTLE_SURFACE_Y + Math.sin(t * 1.7 + i) * 0.045;

    // ── Orientation: slow turns, pitch with vertical travel, mild bank ──
    const v = tu.vel;
    const hsp = Math.hypot(v.x, v.z);
    if (hsp > 1e-3) {
      const targetHeading = Math.atan2(v.x, v.z);
      const prev = tu.heading;
      tu.heading = lerpAngle(tu.heading, targetHeading, Math.min(1, dt * 1.1));
      let dH = ((tu.heading - prev + Math.PI) % (Math.PI * 2)) - Math.PI;
      const rollTarget = clamp(-dH * 4, -0.3, 0.3);
      tu.roll += (rollTarget - tu.roll) * Math.min(1, dt * 2);
    }
    const spd = v.length();
    const pitchTarget = spd > 1e-3 ? clamp(-v.y / spd * 0.9, -0.6, 0.6) : 0;
    tu.pitch += (pitchTarget - tu.pitch) * Math.min(1, dt * 2);

    // ── Flippers: strokes come in bouts — row, then glide ──
    const bout = 0.35 + 0.65 * smoothstep(-0.2, 0.6, Math.sin(t * 0.45 + i * 2.1));
    tu.flapPhase += dt * (1.6 + spd * 1.2) * bout;

    writeTurtleMatrices(i);
  }
  turtleBodyInst.instanceMatrix.needsUpdate = true;
  turtleFlipInst.instanceMatrix.needsUpdate = true;
}

// ============================================================
// PUBLIC API
// ============================================================
let _inited = false;

export function initSealife() {
  if (_inited) return;
  _inited = true;
  initTurtles();
}

export function updateSealife(t, dt) {
  if (!_inited) return;

  // Day/night gate — diurnal like the birds and the reef school.
  const dayFactor = smoothstep(-3, 6, dnc_state.sunElevDeg);
  turtleMat.opacity = dayFactor;
  if (dayFactor < 0.02) {
    if (turtleGroup.visible) turtleGroup.visible = false;
    return;                              // the lagoon sleeps — skip the sim
  }
  if (!turtleGroup.visible) turtleGroup.visible = true;

  const cdt = Math.min(0.05, dt);
  refreshCursorPoint(performance.now());
  const playerActive = isPlayerActive() && isPlayerUnderwater();
  if (playerActive) _player.copy(getPlayerWorldPosition());

  updateTurtles(t, cdt, playerActive);
}
