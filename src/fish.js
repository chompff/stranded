// ============================================================
// FISH — a school of small tropical reef fish that shoals over the rock/coral
// reef on the seabed using real boids (separation + alignment + cohesion),
// wanders gently, and stays anchored to a reef volume. When the diver comes
// near underwater the school parts and scatters, then reforms once they leave.
// Daytime-biased like the birds (fades with sun elevation).
//
// This is the first reef creature; it's written as a self-contained, tunable
// module so later creatures can follow the same shape.
//
// Performance: the WHOLE school is just 3 draw calls regardless of how many
// fish there are — body, tail and eyes are each ONE InstancedMesh, with
// per-instance colour (monotone shades) and per-instance matrices computed on
// the CPU each frame (no allocations). Boids is O(n²) cheap vector maths; the
// floor raycast is amortised to ONE fish per frame, round-robin.
// ============================================================
import * as THREE from 'three';
import { scene, terrainRefs, OCEAN_FLOOR_Y } from './state.js';
import { dnc_state } from './sky-water.js';
import { getPlayerWorldPosition, isPlayerActive, isPlayerUnderwater } from './player.js';
import { isCursorFresh, cursorWater } from './sealife.js';   // shared cursor-on-water point

// ── Tunables ────────────────────────────────────────────────
const NUM_FISH       = 45;
// Reef anchor — the volume the school shoals around. Sits over the
// shore-parallel rock reef in front of the home beach (camera looks +X from
// ~Z -150). Easy to reposition by eye: nudge REEF_CX / REEF_CZ.
const REEF_CX        = 36;            // anchor centre X — pulled toward the camera into the near-foreground shallows (lower X = nearer; was 54 over the offshore reef)
const REEF_CZ        = -150;          // anchor centre Z (in front of home beach — screen centre)
const REEF_CLEARANCE = 4.6;           // anchor band height above the reef floor (rides high in the water column)
const ANCHOR_RADIUS  = 6.5;           // horizontal radius of the shoaling volume — tightened so the school holds the foreground strip instead of drifting out of frame (was 8.5)
const ANCHOR_BAND    = 1.8;           // vertical half-extent of the shoaling band (tight — stays up in view)

const FISH_SCALE     = 0.40;          // overall size multiplier (~0.24m long — a fraction of a gull)
const SURFACE_Y      = -0.5;          // never rise above this (stay under the surface)
const FLOOR_CLEAR    = 2.0;           // soft floor avoidance kicks in below floor+this
const FLOOR_MIN      = 0.7;           // hard clamp — never sink below floor+this

// Boid weights / limits (gentle, organic — keep speeds & turn-rates low)
const MAX_SPEED      = 2.0;
const MIN_SPEED      = 0.45;
const PERCEPTION     = 4.0;           // neighbour search radius
const SEP_DIST       = 1.5;           // personal-space radius
const COH_W          = 0.55;          // pull toward local centre
const ALI_W          = 1.1;           // match neighbours' heading
const SEP_W          = 2.6;           // avoid crowding
const WANDER_W       = 0.9;           // idle drift
const ANCHOR_W       = 1.6;           // pull back toward the reef volume
const FLOOR_W        = 6.0;           // push up off the floor
const SURFACE_W      = 5.0;           // push down off the surface
const FLEE_W         = 26.0;          // steer-away from the diver (the scatter)
const SCARE_RADIUS   = 9.0;           // diver this close (underwater) → school parts
const TURN_RATE      = 3.0;           // heading/orientation easing

// Cursor scatter — the pointer-on-water (the wallpaper's one input) bolts the
// school, the same reflex as the diver scare but from the surface point above.
const CURSOR_SCARE_R = 7.0;           // pointer this close (horizontally above) → bolt
const CURSOR_FLEE_W  = 24.0;          // snappy scatter (mirrors the diver's FLEE_W)

// Precomputed squares
const PERCEPTION2 = PERCEPTION * PERCEPTION;
const SEP2        = SEP_DIST * SEP_DIST;
const SCARE2      = SCARE_RADIUS * SCARE_RADIUS;
const CURSOR_SCARE2 = CURSOR_SCARE_R * CURSOR_SCARE_R;

const TAIL_HINGE_Z = -0.27;           // local Z the caudal fin pivots about

// ── Shared resources (built once) ───────────────────────────
const fishGroup = new THREE.Group();  // container — visibility toggles the school
const fish = [];
let bodyGeo = null, tailGeo = null, eyeGeo = null;
let fishMat = null, eyeMat = null;    // ONE body/tail material, one eye material
let bodyInst = null, tailInst = null, eyeInst = null; // 3 InstancedMeshes = 3 draw calls
let _floorCursor = 0;                 // round-robin index for the per-frame floor raycast
let _anchorY = OCEAN_FLOOR_Y + REEF_CLEARANCE; // band centre (set from init raycast)

// Monotone reef-fish shades (muted blue-silver) — subtle variation only, for
// now. Applied per-instance via instanceColor (multiplies the white material).
const PALETTE = [0x6f8eac, 0x5b7794, 0x8aa3bd];

// ── Reused temporaries (no per-frame allocation) ────────────
const _ray = new THREE.Raycaster();
const _rayOrigin = new THREE.Vector3();
const _rayDir = new THREE.Vector3(0, -1, 0);
const _acc = new THREE.Vector3();
const _coh = new THREE.Vector3();
const _ali = new THREE.Vector3();
const _sep = new THREE.Vector3();
const _player = new THREE.Vector3();
const _cursor = new THREE.Vector3();
const _scaleV = new THREE.Vector3(FISH_SCALE, FISH_SCALE, FISH_SCALE);
const _mBody = new THREE.Matrix4();
const _mTail = new THREE.Matrix4();
const _tailLocal = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _euler = new THREE.Euler();
const _color = new THREE.Color();

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

// Merge indexed geometries (position + normal) into one shared BufferGeometry,
// so body+dorsal and the two eyes are each a single instanced geometry.
function mergeGeos(geos) {
  let vCount = 0, iCount = 0;
  for (const g of geos) {
    vCount += g.attributes.position.count;
    iCount += g.index ? g.index.count : g.attributes.position.count;
  }
  const pos = new Float32Array(vCount * 3);
  const nor = new Float32Array(vCount * 3);
  const idx = new Uint16Array(iCount);
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

function buildSharedResources() {
  // Body — elongated, tall and laterally flattened (tropical reef-fish shape),
  // tapered toward the tail.
  const body = new THREE.SphereGeometry(0.25, 9, 7);
  const bp = body.attributes.position;
  for (let i = 0; i < bp.count; i++) {
    const z = bp.getZ(i);
    const taper = z < 0 ? 1 + z * 1.6 : 1;          // pinch the rear toward the tail
    bp.setXYZ(i, bp.getX(i) * 0.34 * taper, bp.getY(i) * 0.72 * taper, z * 1.18);
  }
  body.computeVertexNormals();

  // Dorsal fin — a low triangular sail along the top of the back (YZ plane).
  const dorsal = new THREE.BufferGeometry();
  dorsal.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
    0,  0.16,  0.12,   // front base
    0,  0.16, -0.18,   // rear base
    0,  0.34, -0.04,   // peak
  ]), 3));
  dorsal.computeVertexNormals();

  bodyGeo = mergeGeos([body, dorsal]);

  // Caudal (tail) fin — pivots at the body rear, wiggles around Y. Root at the
  // local origin so the instance matrix can hinge it at TAIL_HINGE_Z.
  tailGeo = new THREE.BufferGeometry();
  tailGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
    0,  0.00,  0.00,   // root (hinge)
    0,  0.18, -0.26,   // upper tip
    0, -0.18, -0.26,   // lower tip
  ]), 3));
  tailGeo.computeVertexNormals();

  // Eyes — two tiny dark beads seated on the head surface (body nose is at
  // z≈0.295, so these sit just behind it on the upper flank, not floating).
  const eyeL = new THREE.SphereGeometry(0.022, 6, 5); eyeL.translate(-0.060, 0.05, 0.19);
  const eyeR = new THREE.SphereGeometry(0.022, 6, 5); eyeR.translate( 0.060, 0.05, 0.19);
  eyeGeo = mergeGeos([eyeL, eyeR]);

  // One body/tail material (white base; the per-instance colour tints it) and
  // one dark eye material. Opacity on both is driven by the day/night fade.
  fishMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x1c2733,             // gentle lift in the dim underwater light, not glowing
    emissiveIntensity: 0.3,
    roughness: 0.55,
    metalness: 0.0,
    side: THREE.DoubleSide,         // thin body & fins read from both sides
    transparent: true,
    opacity: 1,
  });
  eyeMat = new THREE.MeshBasicMaterial({ color: 0x14130f, transparent: true, opacity: 1 });
}

// Compose a fish's body + tail + eye instance matrices from its current state.
function writeMatrices(f, i) {
  _euler.set(f.pitch, f.heading, f.roll);
  _q.setFromEuler(_euler);
  _mBody.compose(f.pos, _q, _scaleV);
  bodyInst.setMatrixAt(i, _mBody);
  eyeInst.setMatrixAt(i, _mBody);           // eyes are baked into the head — share the body transform
  _tailLocal.makeRotationY(f.tailWiggle);   // swish about the hinge…
  _tailLocal.setPosition(0, 0, TAIL_HINGE_Z); // …then offset to the body rear
  _mTail.multiplyMatrices(_mBody, _tailLocal);
  tailInst.setMatrixAt(i, _mTail);
}

function createFish(i) {
  // Seed near the anchor with a spread.
  const a = rand(0, Math.PI * 2);
  const r = rand(0, ANCHOR_RADIUS);
  const heading = rand(0, Math.PI * 2);
  const f = {
    pos: new THREE.Vector3(
      REEF_CX + Math.cos(a) * r,
      _anchorY + rand(-ANCHOR_BAND, ANCHOR_BAND),
      REEF_CZ + Math.sin(a) * r
    ),
    vel: new THREE.Vector3(Math.sin(heading) * MIN_SPEED, 0, Math.cos(heading) * MIN_SPEED),
    heading,
    pitch: 0,
    roll: 0,
    tailWiggle: 0,
    wigglePhase: rand(0, Math.PI * 2),
    wanderAngle: heading,
    bobPhase: rand(0, Math.PI * 2),
    floorY: OCEAN_FLOOR_Y,               // last sampled reef-floor height under this fish
  };
  fish.push(f);

  // Per-instance shade (monotone palette) — set once.
  _color.setHex(PALETTE[i % PALETTE.length]);
  bodyInst.setColorAt(i, _color);
  tailInst.setColorAt(i, _color);
}

// Raycast straight down to the reef floor (seabed mesh + rock slabs) at (x,z).
// Returns a Y, or null on a miss. Mirrors player.js getSurfaceHeight's seabed
// + slab pattern. Called sparingly (round-robin / once at init).
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

// Smoothly orient a fish along its travel, banking into turns and pitching
// with vertical motion. Fish faces +Z (like the birds).
function faceTravel(f, dt) {
  const v = f.vel;
  const speed = v.length();
  if (speed > 1e-3) {
    const targetHeading = Math.atan2(v.x, v.z);
    const prev = f.heading;
    f.heading = lerpAngle(f.heading, targetHeading, Math.min(1, dt * TURN_RATE));
    // Bank into the turn from the heading change this frame.
    let dH = ((f.heading - prev + Math.PI) % (Math.PI * 2)) - Math.PI;
    const rollTarget = Math.max(-0.5, Math.min(0.5, -dH * 6));
    f.roll += (rollTarget - f.roll) * Math.min(1, dt * 2.5);
    // Pitch nose toward vertical travel (+pitch = nose down, faces +Z).
    const pitchTarget = Math.max(-0.5, Math.min(0.5, -v.y / speed * 0.6));
    f.pitch += (pitchTarget - f.pitch) * Math.min(1, dt * 3);
  }
}

function updateFish_(t, dt, playerActive, cursorActive) {
  const n = fish.length;

  for (let i = 0; i < n; i++) {
    const fi = fish[i];
    const pi = fi.pos;
    _acc.set(0, 0, 0);
    _coh.set(0, 0, 0);
    _ali.set(0, 0, 0);
    _sep.set(0, 0, 0);
    let count = 0;

    // ── Boids: separation + alignment + cohesion over neighbours ──
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      const pj = fish[j].pos;
      const dx = pi.x - pj.x, dy = pi.y - pj.y, dz = pi.z - pj.z;
      const d2 = dx * dx + dy * dy + dz * dz;
      if (d2 < PERCEPTION2) {
        _coh.add(pj);
        _ali.add(fish[j].vel);
        count++;
        if (d2 < SEP2 && d2 > 1e-5) {
          const inv = 1 / d2;             // stronger the closer they crowd
          _sep.x += dx * inv; _sep.y += dy * inv; _sep.z += dz * inv;
        }
      }
    }
    if (count > 0) {
      _coh.divideScalar(count).sub(pi);    // toward local centre
      _acc.addScaledVector(_coh, COH_W);
      _ali.divideScalar(count);            // average neighbour velocity
      _acc.addScaledVector(_ali, ALI_W);
    }
    _acc.addScaledVector(_sep, SEP_W);

    // ── Wander: a slowly drifting idle heading + gentle vertical bob ──
    fi.wanderAngle += (Math.random() - 0.5) * 2.4 * dt;
    _acc.x += Math.sin(fi.wanderAngle) * WANDER_W;
    _acc.z += Math.cos(fi.wanderAngle) * WANDER_W;
    _acc.y += Math.sin(t * 0.5 + fi.bobPhase) * 0.25 * WANDER_W;

    // ── Anchor pull: stay near the reef volume (horizontal + vertical band) ──
    const ax = REEF_CX - pi.x, az = REEF_CZ - pi.z;
    const hDist = Math.hypot(ax, az);
    if (hDist > ANCHOR_RADIUS) {
      const over = (hDist - ANCHOR_RADIUS) / ANCHOR_RADIUS;
      const inv = 1 / (hDist || 1);
      _acc.x += ax * inv * ANCHOR_W * (1 + over);
      _acc.z += az * inv * ANCHOR_W * (1 + over);
    }
    const dyBand = _anchorY - pi.y;
    if (Math.abs(dyBand) > ANCHOR_BAND) {
      _acc.y += Math.sign(dyBand) * ANCHOR_W * 0.8;
    }

    // ── Floor avoidance (raycast-sampled floor) & surface avoidance ──
    const floorSoft = fi.floorY + FLOOR_CLEAR;
    if (pi.y < floorSoft) {
      _acc.y += (floorSoft - pi.y) * FLOOR_W;
    }
    if (pi.y > SURFACE_Y) {
      _acc.y -= (pi.y - SURFACE_Y) * SURFACE_W;
    }

    // ── Player avoidance — the "part & scatter" (only underwater & near) ──
    if (playerActive) {
      const dpx = pi.x - _player.x, dpy = pi.y - _player.y, dpz = pi.z - _player.z;
      const dp2 = dpx * dpx + dpy * dpy + dpz * dpz;
      if (dp2 < SCARE2 && dp2 > 1e-4) {
        const dp = Math.sqrt(dp2);
        const strength = FLEE_W * (1 - dp / SCARE_RADIUS); // hardest up close
        const inv = 1 / dp;
        _acc.x += dpx * inv * strength;
        _acc.y += dpy * inv * strength;
        _acc.z += dpz * inv * strength;
      }
    }

    // ── Cursor avoidance — bolt from the pointer-on-water (the wallpaper input) ──
    if (cursorActive) {
      const cdx = pi.x - _cursor.x, cdy = pi.y - _cursor.y, cdz = pi.z - _cursor.z;
      const cd2 = cdx * cdx + cdy * cdy + cdz * cdz;
      if (cd2 < CURSOR_SCARE2 && cd2 > 1e-4) {
        const cd = Math.sqrt(cd2);
        const strength = CURSOR_FLEE_W * (1 - cd / CURSOR_SCARE_R); // hardest right under the pointer
        const inv = 1 / cd;
        _acc.x += cdx * inv * strength;
        _acc.y += cdy * inv * strength;
        _acc.z += cdz * inv * strength;
      }
    }

    // ── Integrate velocity, clamp speed ──
    fi.vel.addScaledVector(_acc, dt);
    let sp = fi.vel.length();
    if (sp > MAX_SPEED) fi.vel.multiplyScalar(MAX_SPEED / sp);
    else if (sp < MIN_SPEED && sp > 1e-4) fi.vel.multiplyScalar(MIN_SPEED / sp);

    // ── Move, then hard-clamp inside the floor↔surface volume ──
    pi.addScaledVector(fi.vel, dt);
    const floorHard = fi.floorY + FLOOR_MIN;
    if (pi.y < floorHard) { pi.y = floorHard; if (fi.vel.y < 0) fi.vel.y = 0; }
    if (pi.y > SURFACE_Y + 0.3) { pi.y = SURFACE_Y + 0.3; if (fi.vel.y > 0) fi.vel.y = 0; }

    // ── Orientation + tail wiggle (speed-scaled), then write instance matrices ──
    faceTravel(fi, dt);
    sp = fi.vel.length();
    fi.wigglePhase += (3.5 + sp * 3.0) * dt;
    fi.tailWiggle = Math.sin(fi.wigglePhase) * (0.35 + sp * 0.12);
    writeMatrices(fi, i);
  }

  bodyInst.instanceMatrix.needsUpdate = true;
  tailInst.instanceMatrix.needsUpdate = true;
  eyeInst.instanceMatrix.needsUpdate = true;
}

// ============================================================
export function initFish() {
  if (fish.length) return;             // idempotent
  buildSharedResources();

  // 3 InstancedMeshes = 3 draw calls for the entire school, any size.
  bodyInst = new THREE.InstancedMesh(bodyGeo, fishMat, NUM_FISH);
  tailInst = new THREE.InstancedMesh(tailGeo, fishMat, NUM_FISH);
  eyeInst  = new THREE.InstancedMesh(eyeGeo, eyeMat, NUM_FISH);
  for (const im of [bodyInst, tailInst, eyeInst]) {
    im.frustumCulled = false;          // small roaming school — geometry-origin culling would pop it out
    im.castShadow = false;
    im.receiveShadow = false;
    fishGroup.add(im);
  }
  scene.add(fishGroup);

  // Establish the shoaling band height from the reef floor at the anchor.
  const f = sampleFloor(REEF_CX, REEF_CZ);
  if (f !== null) _anchorY = f + REEF_CLEARANCE;

  for (let i = 0; i < NUM_FISH; i++) createFish(i);
  if (bodyInst.instanceColor) bodyInst.instanceColor.needsUpdate = true;
  if (tailInst.instanceColor) tailInst.instanceColor.needsUpdate = true;

  // Seed initial matrices so the first rendered frame is correct.
  for (let i = 0; i < fish.length; i++) writeMatrices(fish[i], i);
  bodyInst.instanceMatrix.needsUpdate = true;
  tailInst.instanceMatrix.needsUpdate = true;
  eyeInst.instanceMatrix.needsUpdate = true;
}

export function updateFish(t, dt) {
  if (!fish.length || !fishMat) return;

  // Daytime fade — diurnal like the birds. Hide entirely at night (no work).
  const dayFactor = smoothstep(-3, 6, dnc_state.sunElevDeg);
  fishMat.opacity = dayFactor;
  eyeMat.opacity = dayFactor;
  if (dayFactor < 0.02) {
    if (fishGroup.visible) fishGroup.visible = false;
    return;                            // sheltered for the night — skip the sim
  }
  if (!fishGroup.visible) fishGroup.visible = true;

  // Amortised floor sampling — refresh ONE fish's floor height per frame.
  const fc = fish[_floorCursor % fish.length];
  const fy = sampleFloor(fc.pos.x, fc.pos.z);
  if (fy !== null) fc.floorY = fy;
  _floorCursor++;

  // Player position once per frame; only reacts when the diver is underwater.
  const playerActive = isPlayerActive() && isPlayerUnderwater();
  if (playerActive) _player.copy(getPlayerWorldPosition());

  // Cursor-on-water (shared with the turtle) — the school bolts away from it.
  const cursorActive = isCursorFresh();
  if (cursorActive) _cursor.copy(cursorWater());

  const cdt = Math.min(0.05, dt);
  updateFish_(t, cdt, playerActive, cursorActive);
}
