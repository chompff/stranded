// ============================================================
// BIRDS — a couple of white seagulls that lazily circle over the
// home beach, occasionally swoop down to land (beach / rock / water),
// perch a while, then take off and resume circling. Daytime only.
// They startle and fly off when the player gets close.
//
// Performance: 2–3 birds; ONE shared vertex-coloured material; geometry
// (body/head/beak/tail/wings) is built once and shared across the flock.
// Reused temp vectors; the landing raycast fires only when a target is
// *chosen* (not per frame).
// ============================================================
import * as THREE from 'three';
import { scene, ISLAND_RADIUS, HOME_BEACH_Z, terrainRefs } from './state.js';
import { dnc_state } from './sky-water.js';
import { getPlayerWorldPosition, isPlayerActive } from './player.js';

// ── Tunables ────────────────────────────────────────────────
const NUM_BIRDS      = 3;
const CIRCLE_CX      = 0;             // circle centre X (in front of the home camera)
const CIRCLE_CZ      = HOME_BEACH_Z;  // circle centre Z (over the home beach, in view)
const CIRCLE_CY      = 0;             // base height the altitude is added to
const ALT_MIN        = 11, ALT_MAX = 17;   // circling altitude range
const RADIUS_MIN     = 16, RADIUS_MAX = 26; // circling radius range
const ANG_SPEED_MIN  = 0.22, ANG_SPEED_MAX = 0.38; // rad/s (lazy)
const DESCEND_SPEED  = 9;             // units/s gliding down to land
const ASCEND_SPEED   = 11;            // units/s taking off
const BIRD_SCALE     = 0.8;
const WATER_Y        = 0;
const SCARE_RADIUS   = 9;             // player gets this close → the bird flees

const CIRCLE_TIME_MIN = 9,  CIRCLE_TIME_MAX = 20;  // seconds aloft before trying to land
const PERCH_TIME_MIN  = 5,  PERCH_TIME_MAX  = 13;  // seconds perched

// ── Shared resources (built once) ───────────────────────────
let birdMat = null;
let eyeMat = null;                    // dark, unlit — for crisp eyes
const staticGeos = [];                // body/head/beak/tail geometries (shared, vertex-coloured)
const eyeGeos = [];                   // eye geometries (shared, use eyeMat)
let wingGeoL = null, wingGeoR = null;
const birdsGroup = new THREE.Group();
const birds = [];

// ── Reused temporaries (no per-frame allocation) ────────────
const _ray = new THREE.Raycaster();
const _rayOrigin = new THREE.Vector3();
const _rayDir = new THREE.Vector3(0, -1, 0);
const _tmp = new THREE.Vector3();

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

// Paint every vertex of a geometry one solid colour (for the shared
// vertex-coloured material). Returns the geometry.
function paint(geo, r, g, b) {
  const n = geo.attributes.position.count;
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { col[i * 3] = r; col[i * 3 + 1] = g; col[i * 3 + 2] = b; }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return geo;
}

// A pointed gull wing with a slightly curved leading edge and a grey tip
// (vertex-coloured). Flat in the XZ plane, pivot at the shoulder (x=0).
function makeWing(mirror) {
  const s = mirror ? 1 : -1;             // mirror=true → right wing (+x)
  const P = new Float32Array([
    0,       0,  0.20,    // 0 shoulder leading
    0,       0, -0.34,    // 1 shoulder trailing
    s * 0.62, 0, 0.12,    // 2 mid leading (curve)
    s * 1.40, 0, -0.12,   // 3 tip
  ]);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(P, 3));
  geo.setIndex([0, 2, 3, 0, 3, 1]);
  geo.computeVertexNormals();
  const C = new Float32Array([
    1, 1, 1,
    1, 1, 1,
    0.96, 0.97, 0.99,
    0.50, 0.54, 0.60,    // grey wingtip
  ]);
  geo.setAttribute('color', new THREE.BufferAttribute(C, 3));
  return geo;
}

function makeTail() {
  // Flat triangular tail fanning out behind the body.
  const P = new Float32Array([
    -0.15, 0, -0.40,
     0.15, 0, -0.40,
     0.0,  0, -0.78,
  ]);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(P, 3));
  geo.computeVertexNormals();
  return paint(geo, 0.97, 0.98, 1.0);
}

function buildSharedResources() {
  birdMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    color: 0xffffff,
    emissive: 0x8d96a3,        // keeps undersides reading as pale, not black
    emissiveIntensity: 0.3,
    roughness: 0.9,
    metalness: 0.0,
    side: THREE.DoubleSide,
    transparent: true,          // opacity driven by the day/night fade
    opacity: 1,
  });

  // Body — elongated, tapered toward the tail.
  const body = new THREE.SphereGeometry(0.17, 9, 7);
  let bp = body.attributes.position;
  for (let i = 0; i < bp.count; i++) {
    const z = bp.getZ(i);
    const taper = z < 0 ? 1 + z * 0.6 : 1;   // pinch the rear
    bp.setXYZ(i, bp.getX(i) * 0.92 * taper, bp.getY(i) * 0.82, z * 2.3);
  }
  body.computeVertexNormals();
  paint(body, 0.98, 0.99, 1.0);

  // Head — small sphere up front.
  const head = new THREE.SphereGeometry(0.12, 8, 6);
  head.translate(0, 0.07, 0.45);
  paint(head, 1.0, 1.0, 1.0);

  // Beak — little cone, yellow/orange, pointing forward (+z).
  const beak = new THREE.ConeGeometry(0.045, 0.2, 6);
  beak.rotateX(Math.PI / 2);
  beak.translate(0, 0.05, 0.62);
  paint(beak, 1.0, 0.72, 0.16);

  staticGeos.length = 0;
  staticGeos.push(body, head, beak, makeTail());

  // Eyes — small dark beads on each side of the head (unlit, so they read
  // as real dark eyes rather than being washed out by the body's emissive).
  eyeMat = new THREE.MeshBasicMaterial({ color: 0x16161c, transparent: true, opacity: 1 });
  const eyeL = new THREE.SphereGeometry(0.032, 6, 5); eyeL.translate(-0.088, 0.115, 0.50);
  const eyeR = new THREE.SphereGeometry(0.032, 6, 5); eyeR.translate(0.088, 0.115, 0.50);
  eyeGeos.length = 0;
  eyeGeos.push(eyeL, eyeR);

  wingGeoL = makeWing(false);
  wingGeoR = makeWing(true);
}

function createBird() {
  const group = new THREE.Group();

  // Static parts (share one material).
  for (const g of staticGeos) group.add(new THREE.Mesh(g, birdMat));
  for (const g of eyeGeos) group.add(new THREE.Mesh(g, eyeMat));

  const leftWing = new THREE.Mesh(wingGeoL, birdMat);
  const rightWing = new THREE.Mesh(wingGeoR, birdMat);
  leftWing.position.y = 0.04;
  rightWing.position.y = 0.04;
  group.add(leftWing, rightWing);

  group.scale.setScalar(BIRD_SCALE);
  birdsGroup.add(group);

  const dir = Math.random() < 0.5 ? 1 : -1;
  const bird = {
    group, leftWing, rightWing,
    state: 'circle',
    angle: rand(0, Math.PI * 2),
    radius: rand(RADIUS_MIN, RADIUS_MAX),
    alt: rand(ALT_MIN, ALT_MAX),
    angSpeed: rand(ANG_SPEED_MIN, ANG_SPEED_MAX) * dir,
    bobPhase: rand(0, Math.PI * 2),
    flapPhase: rand(0, Math.PI * 2),
    flapAmp: 0.22,
    flapSpeed: 4.5,
    heading: 0,
    roll: 0,
    timer: rand(CIRCLE_TIME_MIN, CIRCLE_TIME_MAX),
    target: null,
    fleeing: false,
    _r: 0,                              // working orbital radius (eased during ascent)
    _y: 0,                              // working height (eased during ascent)
    pitch: 0,                           // body nose up/down (organic body language)
    _launch: 0,                         // seconds left in the take-off burst
    _descT: 0,                          // seconds elapsed in the current descent
    _vx: 0, _vy: 0, _vz: 0,             // velocity (for the steered landing swoop)
  };
  group.position.set(
    CIRCLE_CX + Math.cos(bird.angle) * bird.radius,
    CIRCLE_CY + bird.alt,
    CIRCLE_CZ + Math.sin(bird.angle) * bird.radius
  );
  bird._r = bird.radius;
  bird._y = CIRCLE_CY + bird.alt;
  birds.push(bird);
}

// True if the (active) player is within `radius` (horizontal) of a point.
function playerNear(x, z, radius) {
  if (!isPlayerActive()) return false;
  const p = getPlayerWorldPosition();
  const dx = x - p.x, dz = z - p.z;
  return dx * dx + dz * dz < radius * radius;
}

// Pick a landing spot near the home beach, avoiding the player. One
// downward ray decides type: terrain above water → beach/rock, else water.
function pickLandingTarget() {
  for (let attempt = 0; attempt < 8; attempt++) {
    const a = rand(0, Math.PI * 2);
    const r = rand(4, ISLAND_RADIUS + 9);
    const x = CIRCLE_CX + Math.cos(a) * r;
    const z = CIRCLE_CZ + Math.sin(a) * r;
    if (playerNear(x, z, SCARE_RADIUS + 4)) continue; // don't land on the player

    _rayOrigin.set(x, 80, z);
    _ray.set(_rayOrigin, _rayDir);
    let surfaceY = -Infinity;
    const bg = terrainRefs.blocksGroup;
    if (bg && bg.children.length) {
      const hits = _ray.intersectObjects(bg.children, true);
      if (hits.length) surfaceY = hits[0].point.y;
    }
    if (terrainRefs.slabMeshes && terrainRefs.slabMeshes.length) {
      const rh = _ray.intersectObjects(terrainRefs.slabMeshes, false);
      if (rh.length && rh[0].point.y > surfaceY) surfaceY = rh[0].point.y;
    }
    if (surfaceY > WATER_Y + 0.1) return { x, y: surfaceY + 0.12 * BIRD_SCALE, z, type: 'land' };
    // Float IN the surface — waterline crosses the lower body (riding the
    // swell). Height scales with the bird so the float depth stays proportional.
    return { x, y: WATER_Y + 0.075 * BIRD_SCALE, z, type: 'water' };
  }
  return null; // crowded — give up this round, keep circling
}

// Take off in a hurry, away from whatever spooked the bird.
function startFlee(bird) {
  bird.fleeing = true;
  enterAscent(bird);
  bird.flapAmp = 1.0;
  bird.flapPhase = 0;  // start on a strong downbeat
}

// Seed the orbital params from the current position so the climb spirals
// smoothly onto the circle (no corner when it merges into 'circle').
function enterAscent(bird) {
  const g = bird.group;
  bird.angle = Math.atan2(g.position.z - CIRCLE_CZ, g.position.x - CIRCLE_CX);
  bird._r = Math.hypot(g.position.x - CIRCLE_CX, g.position.z - CIRCLE_CZ);
  bird._y = g.position.y;
  bird.state = 'ascend';
  bird._launch = 0.5;     // brief launch burst (punchy push-off, not a stiff switch)
  bird.flapAmp = 0.6;     // snap the wings open immediately
  bird.flapPhase = 0;     // begin on a strong downbeat
}

function applyWings(bird, dt, ampTarget, speedTarget) {
  bird.flapAmp += (ampTarget - bird.flapAmp) * Math.min(1, dt * 4);
  bird.flapSpeed += (speedTarget - bird.flapSpeed) * Math.min(1, dt * 4);
  bird.flapPhase += bird.flapSpeed * dt;
  const flap = Math.sin(bird.flapPhase) * bird.flapAmp;
  const dihedral = 0.12;
  bird.leftWing.rotation.z = -(dihedral + flap);
  bird.rightWing.rotation.z = (dihedral + flap);
}

function faceTravel(bird, vx, vz, dt, rollTarget, pitchTarget) {
  if (vx * vx + vz * vz > 1e-4) {
    bird.heading = lerpAngle(bird.heading, Math.atan2(vx, vz), Math.min(1, dt * 4));
  }
  bird.roll += (rollTarget - bird.roll) * Math.min(1, dt * 2.5);
  bird.pitch += ((pitchTarget || 0) - bird.pitch) * Math.min(1, dt * 3);
  // +pitch = nose down, -pitch = nose up (bird faces +z)
  bird.group.rotation.set(bird.pitch, bird.heading, bird.roll);
}

// Orbit the circle centre. Both 'circle' and 'ascend' use this — only the
// ease rate (how fast working radius/height converge to the orbit) and the
// flapping differ — so ascent merges into circling with no discontinuity.
// Ease toward target, but cap the per-frame move so a big gap accelerates
// smoothly into a steady glide instead of lurching (proportional ease alone
// jumps when the gap is large, e.g. climbing out from a low take-off).
function approachVal(cur, target, k, cap) {
  let s = (target - cur) * k;
  if (s > cap) s = cap; else if (s < -cap) s = -cap;
  return cur + s;
}

function flyOrbit(bird, t, dt, easeK, pitchTarget, maxV) {
  const g = bird.group;
  const px = g.position.x, py = g.position.y, pz = g.position.z;
  bird.angle += bird.angSpeed * dt;
  const bob = Math.sin(t * 0.6 + bird.bobPhase) * 1.1;
  const cap = (maxV || 1e9) * dt;
  bird._r = approachVal(bird._r, bird.radius, easeK, cap);
  bird._y = approachVal(bird._y, CIRCLE_CY + bird.alt + bob, easeK, cap);
  g.position.x = CIRCLE_CX + Math.cos(bird.angle) * bird._r;
  g.position.z = CIRCLE_CZ + Math.sin(bird.angle) * bird._r;
  g.position.y = bird._y;
  if (dt > 1e-4) {   // remember velocity so a peel-off into descent carries momentum
    bird._vx = (g.position.x - px) / dt;
    bird._vy = (g.position.y - py) / dt;
    bird._vz = (g.position.z - pz) / dt;
  }
  faceTravel(bird, g.position.x - px, g.position.z - pz, dt, -0.28 * Math.sign(bird.angSpeed), pitchTarget || 0);
}

function updateBird(bird, t, dt) {
  const g = bird.group;

  if (bird.state === 'circle') {
    flyOrbit(bird, t, dt, Math.min(1, dt * 10), 0, 60);  // already on the orbit — tracks bob, holds radius
    applyWings(bird, dt, 0.22, 4.5);     // gentle glide — wings stay spread
    bird.timer -= dt;
    if (bird.timer <= 0) {
      const tgt = pickLandingTarget();
      if (tgt) { bird.target = tgt; bird.state = 'descend'; bird._descT = 0; }
      else bird.timer = rand(3, 6);      // crowded — try again soon
    }

  } else if (bird.state === 'descend') {
    const tg = bird.target;
    // Bail out if the player wandered under the landing spot.
    if (playerNear(tg.x, tg.z, SCARE_RADIUS)) { startFlee(bird); return; }
    const dx = tg.x - g.position.x, dy = tg.y - g.position.y, dz = tg.z - g.position.z;
    const dist = Math.hypot(dx, dy, dz);
    // Steer the existing (tangential) velocity toward the spot so it peels off
    // the orbit in a smooth arc, and slow down as it nears = a natural flare.
    bird._descT += dt;
    const closeness = 1 - smoothstep(0.4, 5, g.position.y - tg.y);
    if (dist > 1.8) {
      // Swoop: carry the orbital momentum at first (gentle peel-off), then
      // steer harder so it commits straight at the spot instead of orbiting.
      const w = Math.min(1, bird._descT / 0.5);
      const desiredSpeed = Math.max(2.2, Math.min(DESCEND_SPEED, dist * 1.5));
      const inv = 1 / dist;
      const steer = Math.min(1, dt * (1.6 + w * 9));
      bird._vx += (dx * inv * desiredSpeed - bird._vx) * steer;
      bird._vy += (dy * inv * desiredSpeed - bird._vy) * steer;
      bird._vz += (dz * inv * desiredSpeed - bird._vz) * steer;
      g.position.x += bird._vx * dt;
      g.position.y += bird._vy * dt;
      g.position.z += bird._vz * dt;
    } else {
      // Final settle: ease straight onto the spot (gentle, no crawl/orbit).
      const k = Math.min(1, dt * 5);
      g.position.x += dx * k;
      g.position.y += dy * k;
      g.position.z += dz * k;
      bird._vx = bird._vy = bird._vz = 0;
    }
    applyWings(bird, dt, 0.4 + closeness * 0.5, 7 + closeness * 7); // beat harder to flare
    // dive nose-down high up, then flare nose-up as it settles in
    faceTravel(bird, bird._vx, bird._vz, dt, 0, 0.18 + (-0.4 - 0.18) * closeness);
    if (dist < 0.18) {
      g.position.set(tg.x, tg.y, tg.z);
      bird._vx = bird._vy = bird._vz = 0;
      bird.state = 'land';
      bird.timer = rand(PERCH_TIME_MIN, PERCH_TIME_MAX);
    }

  } else if (bird.state === 'land') {
    // Startle and flee if the player comes near.
    if (playerNear(g.position.x, g.position.z, SCARE_RADIUS)) { startFlee(bird); return; }
    const tg = bird.target;
    applyWings(bird, dt, 0.04, 2);       // wings settle / fold
    if (tg.type === 'water') {
      // Ride the swell: gentle vertical bob + rocking + slow yaw drift, so it
      // looks like it's floating WITH the water rather than parked on it.
      const ph = bird.bobPhase;
      const swell = Math.sin(t * 0.8 + ph) * 0.06 + Math.sin(t * 0.47 + ph * 1.7) * 0.04;
      g.position.y = tg.y + swell;
      const rock = Math.sin(t * 0.7 + ph) * 0.06;
      bird.pitch = rock * 0.6;
      bird.roll = rock;
      g.rotation.set(bird.pitch, bird.heading + Math.sin(t * 0.23 + ph) * 0.06, bird.roll);
    } else {
      // Settle from the landing flare down to a level resting pose.
      bird.roll += (0 - bird.roll) * Math.min(1, dt * 3);
      bird.pitch += (0 - bird.pitch) * Math.min(1, dt * 3);
      g.rotation.set(bird.pitch, bird.heading, bird.roll);
    }
    bird.timer -= dt;
    if (bird.timer <= 0) enterAscent(bird);

  } else if (bird.state === 'ascend') {
    // Spiral up onto the orbit — same flyOrbit() as circling, just a slower
    // ease (the climb) and stronger flaps. Merges into 'circle' seamlessly.
    // A brief launch burst gives the take-off a punchy, organic push-off.
    if (bird._launch > 0) bird._launch -= dt;
    const launching = bird._launch > 0;
    const easeK = Math.min(1, dt * (bird.fleeing ? 2.6 : (launching ? 2.6 : 1.5)));
    const climb = launching ? 7 : (bird.fleeing ? 7 : 4.5);   // cap climb speed (u/s)
    flyOrbit(bird, t, dt, easeK, launching ? -0.55 : -0.28, climb);  // strong nose-up on launch, then ease off
    applyWings(bird, dt, launching ? 1.0 : (bird.fleeing ? 0.95 : 0.7), launching ? 18 : (bird.fleeing ? 16 : 12));
    const tgtY = CIRCLE_CY + bird.alt + Math.sin(t * 0.6 + bird.bobPhase) * 1.1;
    if (!launching && Math.abs(bird._r - bird.radius) < 0.6 && Math.abs(bird._y - tgtY) < 0.7) {
      bird.state = 'circle';
      bird.fleeing = false;
      bird.timer = rand(CIRCLE_TIME_MIN, CIRCLE_TIME_MAX);
    }
  }
}

// ============================================================
export function initBirds() {
  if (birds.length) return;          // idempotent
  buildSharedResources();
  scene.add(birdsGroup);
  for (let i = 0; i < NUM_BIRDS; i++) createBird();
}

export function updateBirds(t, dt) {
  if (!birds.length || !birdMat) return;

  const dayFactor = smoothstep(-3, 6, dnc_state.sunElevDeg);
  birdMat.opacity = dayFactor;
  if (eyeMat) eyeMat.opacity = dayFactor;
  if (dayFactor < 0.02) {
    if (birdsGroup.visible) birdsGroup.visible = false;
    return;                          // roosting — no work at night
  }
  if (!birdsGroup.visible) birdsGroup.visible = true;

  const cdt = Math.min(0.05, dt);
  for (let i = 0; i < birds.length; i++) updateBird(birds[i], t, cdt);
}
