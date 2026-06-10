// ============================================================
// ECOSYSTEM — GLB Model Pipeline, Flora Placement & Animation
// ============================================================
// Architecture:
//   1. Flora config is defined inline (coconut palm model, scale, sway, placement)
//   2. GLTFLoader loads the model once from assets/models/, caches the result
//   3. Placement clones the cached scene graph per instance
//   4. Grow-in animation, wind sway driven from config
// ============================================================

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  scene, ISLAND_Z, TILE_SIZE, heightmap,
  OCEAN_FLOOR_Y, camera, buildState, terrainRefs, clock
} from './state.js';
import { CORAL_TYPES, coralCache } from './reef.js';
// ─── Coconut Palm config (inlined, formerly species-registry.js) ────
export const PALM_CONFIG = {
  name: 'Coconut Palm', type: 'flora', icon: '🌴',
  model: 'FL-001.glb',
  scale: [2.5, 3.5],
  sway: { amp: 0.06, freq: 0.5 },
  placement: { surface: 'sand', minHeight: 1, underwater: false },
  placeholder: { color: 0x2D6B1E, height: 5, width: 0.3 },
};
export const FLORA_ID = 'FL-001';

// ─── Reusable raycaster for surface detection (avoid per-call new) ───
const _surfaceRay = new THREE.Raycaster();
const _surfaceOrigin = new THREE.Vector3();
const _surfaceDir = new THREE.Vector3(0, -1, 0);

// ─── Model cache ─────────────────────────────────────────────
export const modelCache = new Map(); // specId → { scene, animations }

// ─── GLTFLoader instance ─────────────────────────────────────
const gltfLoader = new GLTFLoader();

// ─── GLTFLoader-based model loading ──────────────────────────
// Loads .glb files from the assets/models/ directory using Three.js GLTFLoader.
// This replaces the inline base64 data URI loading for external model files.
function loadModelFromFile(filePath) {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      filePath,
      (gltf) => {
        resolve({ scene: gltf.scene, animations: gltf.animations || [] });
      },
      undefined,
      (err) => {
        reject(err);
      }
    );
  });
}

// ─── Preload flora model ─────────────────────────────────────
export async function preloadModels() {
  const url = `assets/models/${PALM_CONFIG.model}`;
  try {
    const result = await loadModelFromFile(url);
    modelCache.set(FLORA_ID, result);
  } catch (err) {
    console.warn(`[ecosystem] Failed to load model for ${FLORA_ID} (${url}):`, err);
  }
}

// ─── Utility ─────────────────────────────────────────────────
export function randRange(min, max) { return min + Math.random() * (max - min); }

// ─── Local helpers ───────────────────────────────────────────

// Deterministic hash noise (for per-instance variation)
function hashNoise(x, y, z) {
  let n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return n - Math.floor(n);
}

// Local getColumn — reads from imported heightmap Map directly
// (avoids circular dependency with terrain.js)
function getColumn(gx, gz) {
  return heightmap.get(gx + ',' + gz) || { rockHeight: 0, totalHeight: 0 };
}

// Warning UI (placement validation feedback)
function showWarning(msg) {
  let el = document.getElementById('buildWarning');
  if (!el) {
    el = document.createElement('div');
    el.id = 'buildWarning';
    el.style.cssText = 'position:fixed; bottom:180px; left:50%; transform:translateX(-50%); z-index:101; background:rgba(220,60,40,0.92); color:#fff; font:700 16px/1.3 "Tahiti",system-ui,sans-serif; padding:12px 24px; border-radius:20px; backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); pointer-events:none; transition:opacity 0.3s; letter-spacing:0.3px; text-shadow:0 1px 2px rgba(0,0,0,0.3);';
    document.body.appendChild(el);
  }
  el.textContent = '\u26A0 ' + msg;
  el.style.opacity = '1';
  clearTimeout(window._warningTimeout);
  window._warningTimeout = setTimeout(hideWarning, 2000);
}

function hideWarning() {
  clearTimeout(window._warningTimeout);
  const el = document.getElementById('buildWarning');
  if (el) el.style.opacity = '0';
}

// ─── Scene groups ────────────────────────────────────────────
export const floraGroup = new THREE.Group();
scene.add(floraGroup);
export const placedFlora = new Map(); // "gx,gz" → flora instance

// ─── Placeholder builder (used when model is null) ──────────
function buildPlaceholder(spec) {
  const group = new THREE.Group();
  const ph = spec.placeholder;
  // Trunk: slim cylinder
  const trunkH = ph.height * 0.7;
  const trunkGeo = new THREE.CylinderGeometry(ph.width * 0.3, ph.width * 0.4, trunkH, 6);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8B6914, roughness: 0.9 });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = trunkH / 2;
  trunk.castShadow = true;
  group.add(trunk);
  // Canopy: icosahedron
  const canopyR = ph.width * 1.5;
  const canopyGeo = new THREE.IcosahedronGeometry(canopyR, 0);
  const canopyMat = new THREE.MeshStandardMaterial({ color: ph.color, roughness: 0.8 });
  const canopy = new THREE.Mesh(canopyGeo, canopyMat);
  canopy.position.y = trunkH + canopyR * 0.5;
  canopy.castShadow = true;
  group.add(canopy);
  // "?" label plane
  const canvas = document.createElement('canvas');
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff80';
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = '#333';
  ctx.font = 'bold 48px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('?', 32, 32);
  const tex = new THREE.CanvasTexture(canvas);
  const labelGeo = new THREE.PlaneGeometry(0.5, 0.5);
  const labelMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide });
  const label = new THREE.Mesh(labelGeo, labelMat);
  label.position.y = trunkH + canopyR * 2;
  label.name = 'placeholder_label';
  group.add(label);
  return group;
}

// ─── Clone a cached model or build placeholder ──────────────
export function instantiateModel(specId) {
  // Check if it's a coral specId
  const coralType = CORAL_TYPES.find(ct => ct.id === specId);
  if (coralType) {
    const cached = coralCache.get(specId);
    if (!cached) return new THREE.Group();
    const clone = cached.scene.clone(true);
    clone.traverse(child => {
      if (child.isMesh) {
        // Share material from cached original — enables GPU batching
        child.castShadow = false;     // underwater corals don't cast shadows
        child.receiveShadow = false;
      }
    });
    return clone;
  }

  const spec = PALM_CONFIG;
  if (specId !== FLORA_ID) return new THREE.Group();

  if (modelCache.has(specId)) {
    const cached = modelCache.get(specId);
    const clone = cached.scene.clone(true);
    // Deep-clone materials so tinting per instance is possible
    clone.traverse(child => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.castShadow = true;
        // Flora should NOT receiveShadow — complex geometry causes shadow acne / self-darkening
        child.receiveShadow = (spec.type !== 'flora');
      }
    });
    return clone;
  }
  return buildPlaceholder(spec);
}

// Apply per-instance variation to a cloned model
function applyModelVariation(group, gx, gz) {
  // Slight random tilt for organic feel (±3 degrees)
  const tiltSeed = hashNoise(gx * 41.3, gz * 29.7, 3.3);
  const tiltSeed2 = hashNoise(gx * 17.1, gz * 53.9, 7.7);
  group.rotation.x = (tiltSeed - 0.5) * 0.05; // ±1.4°
  group.rotation.z = (tiltSeed2 - 0.5) * 0.05;
}

// ─── Flora placement ────────────────────────────────────────
export function placeFlora(specId, gx, gz) {
  const key = gx + ',' + gz;
  if (placedFlora.has(key)) removeFlora(gx, gz);

  // Check if placing a coral
  const coralType = CORAL_TYPES.find(ct => ct.id === specId);
  const isCoral = !!coralType;

  const spec = isCoral ? {
    scale: coralType.scale,
    sway: { amp: 0.02, freq: 0.3 },
    placement: { surface: 'any', minHeight: 0, underwater: true },
  } : PALM_CONFIG;
  if (!isCoral && specId !== FLORA_ID) return;

  const ts = TILE_SIZE;
  const col = getColumn(gx, gz);
  const surfaceY = OCEAN_FLOOR_Y + col.totalHeight * ts;

  // Position — random offset from tile center for natural look
  const jitterX = (hashNoise(gx * 7.1, gz * 11.3, 1) - 0.5) * ts * 0.7;
  const jitterZ = (hashNoise(gx * 9.7, gz * 5.3, 2) - 0.5) * ts * 0.7;
  const worldX = (gx + 0.5) * ts + jitterX;
  const worldZ = (gz + 0.5) * ts + ISLAND_Z + jitterZ;

  // For corals: raycast first to find underwater surface, then validate
  if (isCoral) {
    let actualY = null;
    const blocksGroup = terrainRefs.blocksGroup;
    if (blocksGroup) {
      _surfaceOrigin.set(worldX, 1, worldZ);
      _surfaceRay.set(_surfaceOrigin, _surfaceDir);
      // Include seabed for underwater surface detection (terrain only covers above-water)
      const targets = [...blocksGroup.children];
      if (terrainRefs.seabedMesh) targets.push(terrainRefs.seabedMesh);
      const hits = _surfaceRay.intersectObjects(targets, true);
      for (let h = 0; h < hits.length; h++) {
        if (hits[h].point.y < -0.3) {
          actualY = hits[h].point.y;
          break;
        }
      }
    }
    if (actualY === null) {
      showWarning('Must be underwater!'); return;
    }

    const model = instantiateModel(specId);
    const s = randRange(spec.scale[0], spec.scale[1]);
    model.userData.targetScale = s;
    model.scale.set(0, 0, 0);
    model.visible = false;
    model.rotation.y = hashNoise(gx * 13.7, gz * 17.3, 0) * Math.PI * 2;
    applyModelVariation(model, gx, gz);
    model.position.set(worldX, actualY, worldZ);
    floraGroup.add(model);

    placedFlora.set(key, {
      group: model, specId, gx, gz,
      targetScale: s,
      surfaceY: actualY,
      spawnTime: clock.getElapsedTime(),
      grown: false,
    });
    _spawnGrowParticles(worldX, worldZ, actualY, s, spec);
    return;
  }

  // ── Palm placement (non-coral) ──
  // Validate placement rules
  if (!spec.placement.underwater && surfaceY < 0.1) {
    showWarning('Too close to water!'); return;
  }
  if (spec.placement.minHeight && col.totalHeight < spec.placement.minHeight) {
    showWarning('Terrain too low! Need height ' + spec.placement.minHeight); return;
  }
  if (spec.placement.surface === 'sand' && col.rockHeight >= col.totalHeight && col.totalHeight > 0) {
    showWarning('Needs sand surface!'); return;
  }

  // Create instance
  const model = instantiateModel(specId);
  const s = randRange(spec.scale[0], spec.scale[1]);
  model.userData.targetScale = s;
  // Start invisible — reverse-crumble particles will reveal it
  model.scale.set(0, 0, 0);
  model.visible = false;

  // Random rotation + variation
  model.rotation.y = hashNoise(gx * 13.7, gz * 17.3, 0) * Math.PI * 2;
  applyModelVariation(model, gx, gz);

  // Raycast down to find actual mesh surface
  let actualY = surfaceY;
  const blocksGroup = terrainRefs.blocksGroup;
  if (blocksGroup) {
    _surfaceOrigin.set(worldX, surfaceY + 5, worldZ);
    _surfaceRay.set(_surfaceOrigin, _surfaceDir);
    const hits = _surfaceRay.intersectObjects(blocksGroup.children, true);
    if (hits.length > 0) {
      actualY = hits[0].point.y;
    }
  }
  // Skip placement if surface is below water — prevents trees in the ocean
  if (actualY < 0.05) return;
  model.position.set(worldX, actualY, worldZ);

  floraGroup.add(model);

  const flora = {
    group: model, specId, gx, gz,
    targetScale: s,
    stretchY: randRange(0.85, 1.15), // independent height variety (palms only)
    surfaceY: actualY,
    spawnTime: clock.getElapsedTime(),
    grown: false,
  };

  placedFlora.set(key, flora);

  // Spawn reverse-crumble particles (converge upward into tree)
  _spawnGrowParticles(worldX, worldZ, surfaceY, s, spec);
}

// ─── Growing flora — reverse-crumble particle effect ─────────
const growingParticles = [];
const _growGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const _growLeafMat = new THREE.MeshStandardMaterial({ color: 0x2D6B1E, roughness: 0.9 });
const _growBarkMat = new THREE.MeshStandardMaterial({ color: 0x8B6914, roughness: 0.9 });
const _growSandMat = new THREE.MeshStandardMaterial({ color: 0xd4b87a, roughness: 0.9 });

function _spawnGrowParticles(worldX, worldZ, surfaceY, treeScale, spec) {
  const count = 12;
  const treeH = treeScale * (spec.placeholder?.height || 3);
  const now = clock.getElapsedTime();
  const mats = [_growLeafMat, _growBarkMat, _growSandMat];

  for (let i = 0; i < count; i++) {
    const mat = mats[i % 3];
    const mesh = new THREE.Mesh(_growGeo, mat);
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const spread = 1.5 + Math.random() * 1.5;
    // Start positions: spread out around the base
    const startX = worldX + Math.cos(angle) * spread;
    const startZ = worldZ + Math.sin(angle) * spread;
    const startY = surfaceY + Math.random() * 0.3;
    mesh.position.set(startX, startY, startZ);
    mesh.scale.setScalar(0.15 + Math.random() * 0.2);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    scene.add(mesh);
    growingParticles.push({
      mesh,
      startX, startY, startZ,
      // Target: converge toward tree trunk/canopy center
      targetX: worldX + (Math.random() - 0.5) * 0.3,
      targetY: surfaceY + treeH * (0.3 + Math.random() * 0.7),
      targetZ: worldZ + (Math.random() - 0.5) * 0.3,
      startTime: now,
      duration: 0.5 + Math.random() * 0.3,
      spin: (Math.random() - 0.5) * 8,
      baseScale: mesh.scale.x,
    });
  }
}

function _tickGrowParticles(t) {
  for (let i = growingParticles.length - 1; i >= 0; i--) {
    const p = growingParticles[i];
    const elapsed = t - p.startTime;
    const progress = Math.min(1, elapsed / p.duration);
    // Ease-in quad — accelerates toward target
    const ease = progress * progress;

    // Lerp from start to target
    p.mesh.position.x = p.startX + (p.targetX - p.startX) * ease;
    p.mesh.position.y = p.startY + (p.targetY - p.startY) * ease;
    p.mesh.position.z = p.startZ + (p.targetZ - p.startZ) * ease;
    p.mesh.rotation.x += p.spin * 0.016;
    p.mesh.rotation.z += p.spin * 0.7 * 0.016;

    // Shrink as they converge
    const shrink = 1 - ease * 0.7;
    p.mesh.scale.setScalar(p.baseScale * shrink);

    if (progress >= 1) {
      scene.remove(p.mesh);
      growingParticles.splice(i, 1);
    }
  }
}

// ─── Dying flora (shrink + spin out animation) ─────────────
const dyingFlora = [];

export function removeFlora(gx, gz) {
  const key = gx + ',' + gz;
  const flora = placedFlora.get(key);
  if (!flora) return;

  // Move to dying list for animated removal
  placedFlora.delete(key);
  dyingFlora.push({
    group: flora.group,
    startTime: clock.getElapsedTime(),
    startScale: flora.group.scale.x,
    startScaleY: flora.group.scale.y, // keep height aspect through the death animation
    startY: flora.group.position.y,
  });
}

// ============================================================
// COCONUTS — shaken loose by hovering a palm
// ============================================================
// One shared geometry + material for the whole pool (GPU batching, zero
// per-frame allocations). A disturbed palm sometimes drops a coconut from
// its canopy: gravity fall, a couple of bounces on the sand, a short rest,
// then a shrink-out back into the pool (shared material — we fade by scale,
// not opacity, so no per-instance material clones).
const COCONUT_POOL_SIZE = 8;
const COCONUT_DROP_CHANCE = 0.03;  // per shake of a grown palm
const COCONUT_TREE_COOLDOWN = 5;   // seconds before the same palm can drop again
const COCONUT_GRAVITY = 14;        // a touch heavier than 9.8 — reads better at island scale
const COCONUT_BOUNCE = 0.35;       // vertical energy kept per bounce
const COCONUT_FRICTION = 0.55;     // horizontal energy kept per bounce
const COCONUT_REST_S = 2.2;        // pause on the sand before shrinking away
const COCONUT_SHRINK_S = 0.6;
const COCONUT_R = 0.16;

const _coconutGeo = new THREE.SphereGeometry(COCONUT_R, 10, 8);
_coconutGeo.scale(1, 1.18, 1); // slightly oval, like the real thing
const _coconutMat = new THREE.MeshLambertMaterial({ color: 0x5b4226 });
const _coconuts = []; // pool: { mesh, active, vx, vy, vz, restY, state, stateT, spinX, spinZ }

function _spawnCoconut(group, canopyY, t) {
  let c = _coconuts.find(k => !k.active);
  if (!c && _coconuts.length < COCONUT_POOL_SIZE) {
    const mesh = new THREE.Mesh(_coconutGeo, _coconutMat);
    mesh.castShadow = true;
    mesh.visible = false;
    scene.add(mesh);
    c = { mesh, active: false, vx: 0, vy: 0, vz: 0, restY: 0, state: 'fall', stateT: 0, spinX: 0, spinZ: 0 };
    _coconuts.push(c);
  }
  if (!c) return; // pool exhausted — skip this drop
  const s = group.scale.x || 1;
  c.active = true;
  c.state = 'fall';
  c.stateT = t;
  c.mesh.visible = true;
  c.mesh.scale.setScalar(1);
  c.mesh.position.set(
    group.position.x + (Math.random() - 0.5) * 0.7 * s,
    canopyY,
    group.position.z + (Math.random() - 0.5) * 0.7 * s
  );
  c.mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
  c.vx = (Math.random() - 0.5) * 0.6;
  c.vz = (Math.random() - 0.5) * 0.6;
  c.vy = 0;
  c.restY = group.position.y + COCONUT_R * 1.18;
  c.spinX = (Math.random() - 0.5) * 8;
  c.spinZ = (Math.random() - 0.5) * 8;
}

// Canopy height — measured once per palm via Box3 (a traverse, but only on
// the first drop of that palm; cached on the record afterwards).
const _canopyBox = new THREE.Box3();
function _canopyYFor(rec) {
  if (rec._canopyY === undefined) {
    _canopyBox.setFromObject(rec.group);
    // Drop from inside the crown, not the very tip
    rec._canopyY = rec.group.position.y + (_canopyBox.max.y - rec.group.position.y) * 0.82;
  }
  return rec._canopyY;
}

function _maybeDropCoconut(rec, t) {
  if (t - (rec._lastCoconut || -Infinity) < COCONUT_TREE_COOLDOWN) return;
  if (Math.random() > COCONUT_DROP_CHANCE) return;
  rec._lastCoconut = t;
  _spawnCoconut(rec.group, _canopyYFor(rec), t);
}

function _updateCoconuts(t, dt) {
  const cdt = Math.min(dt, 0.1); // clamp: stable physics after tab-refocus dt spikes
  for (let i = 0; i < _coconuts.length; i++) {
    const c = _coconuts[i];
    if (!c.active) continue;
    if (c.state === 'fall') {
      c.vy -= COCONUT_GRAVITY * cdt;
      c.mesh.position.x += c.vx * cdt;
      c.mesh.position.y += c.vy * cdt;
      c.mesh.position.z += c.vz * cdt;
      c.mesh.rotation.x += c.spinX * cdt;
      c.mesh.rotation.z += c.spinZ * cdt;
      if (c.mesh.position.y <= c.restY) {
        c.mesh.position.y = c.restY;
        if (Math.abs(c.vy) > 1.2) {
          c.vy = -c.vy * COCONUT_BOUNCE;   // thump — bounce
          c.vx *= COCONUT_FRICTION;
          c.vz *= COCONUT_FRICTION;
          c.spinX *= COCONUT_FRICTION;
          c.spinZ *= COCONUT_FRICTION;
        } else {
          c.state = 'rest';                // settled in the sand
          c.stateT = t;
        }
      }
    } else if (c.state === 'rest') {
      if (t - c.stateT >= COCONUT_REST_S) { c.state = 'shrink'; c.stateT = t; }
    } else { // shrink
      const k = 1 - Math.min(1, (t - c.stateT) / COCONUT_SHRINK_S);
      c.mesh.scale.setScalar(Math.max(0.001, k));
      if (k <= 0) { c.active = false; c.mesh.visible = false; }
    }
  }
}

function disturbTree(flora, t) {
  if (flora.disturbed) return;
  if (!flora.grown) return;
  flora.disturbed = t;
  _maybeDropCoconut(flora, t);
}

// ── Wild palms (the wallpaper's landing-page palms) ─────────
// At root the visible palms are plain scene children created by landing.js,
// not ecosystem flora — so they get their own lightweight records here.
// Hover detection uses a cheap ray–sphere test per palm: ~70 GLB clones
// through a geometry raycast would mean thousands of triangle tests per
// pointermove. Records sync lazily because the landing GLB loads async.
const _wildPalms = [];   // { group, baseRotX, baseRotZ, disturbed, sphereC, sphereR, _canopyY, _lastCoconut }
let _wildSrc = null;     // live array from landing.js (fills as the GLB loads)
const _wildVec = new THREE.Vector3();

export function adoptWildPalms(groups) {
  _wildSrc = groups || null;
}

function _syncWildPalms() {
  if (!_wildSrc || _wildSrc.length === _wildPalms.length) return;
  for (let i = _wildPalms.length; i < _wildSrc.length; i++) {
    const g = _wildSrc[i];
    _canopyBox.setFromObject(g);
    const topY = _canopyBox.max.y;
    const h = Math.max(0.5, topY - g.position.y);
    _wildPalms.push({
      group: g,
      baseRotX: g.rotation.x,
      baseRotZ: g.rotation.z,
      disturbed: null,
      sphereC: new THREE.Vector3(g.position.x, (g.position.y + topY) * 0.5, g.position.z),
      sphereR: Math.max(1.0, h * 0.4),
      _canopyY: g.position.y + h * 0.82,
    });
  }
}

// ── Flora hover detection (outside build mode) ──
const _floraHoverRay = new THREE.Raycaster();
const _floraHoverMouse = new THREE.Vector2();
let _lastDisturbedKey = null;

window.addEventListener('pointermove', (e) => {
  if (buildState.active) return;
  _floraHoverMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  _floraHoverMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  _floraHoverRay.setFromCamera(_floraHoverMouse, camera);
  const hits = _floraHoverRay.intersectObjects(floraGroup.children, true);
  if (hits.length > 0) {
    // Walk up to find the flora group root
    let obj = hits[0].object;
    while (obj.parent && obj.parent !== floraGroup) obj = obj.parent;
    // Find which flora this belongs to (palms only — skip corals)
    const t = clock.getElapsedTime();
    placedFlora.forEach((flora, key) => {
      if (flora.group === obj && key !== _lastDisturbedKey) {
        // Skip corals — no hover disturbance for underwater flora
        if (CORAL_TYPES.find(ct => ct.id === flora.specId)) return;
        _lastDisturbedKey = key;
        disturbTree(flora, t);
      }
    });
  } else {
    // Wild palms (wallpaper) — cheap ray–sphere tests, nearest hit wins
    _syncWildPalms();
    let best = null, bestIdx = -1, bestT = Infinity;
    const ro = _floraHoverRay.ray.origin, rd = _floraHoverRay.ray.direction;
    for (let i = 0; i < _wildPalms.length; i++) {
      const w = _wildPalms[i];
      _wildVec.subVectors(w.sphereC, ro);
      const tca = _wildVec.dot(rd);
      if (tca < 0) continue;
      const d2 = _wildVec.lengthSq() - tca * tca;
      if (d2 <= w.sphereR * w.sphereR && tca < bestT) { bestT = tca; best = w; bestIdx = i; }
    }
    if (best) {
      const key = 'wild:' + bestIdx;
      if (key !== _lastDisturbedKey) {
        _lastDisturbedKey = key;
        if (!best.disturbed) {
          const t = clock.getElapsedTime();
          // Capture the pose at disturb time — wild palms are not re-posed
          // by sway each frame, so the shake must return them exactly here.
          best.baseRotX = best.group.rotation.x;
          best.baseRotZ = best.group.rotation.z;
          best.disturbed = t;
          _maybeDropCoconut(best, t);
        }
      }
    } else {
      _lastDisturbedKey = null;
    }
  }
}, { passive: true });

// ─── Ecosystem Tick (called every frame from render loop) ───
export function ecosystemTick(t, dt) {
  // ── Flora: grow-in + sway ──
  placedFlora.forEach(flora => {
    const coralType = CORAL_TYPES.find(ct => ct.id === flora.specId);
    const isCoral = !!coralType;
    if (!isCoral && flora.specId !== FLORA_ID) return;
    const g = flora.group;

    if (!flora.grown) {
      const elapsed = Math.max(0, t - flora.spawnTime);
      const particlePhase = 0.15;
      const growDuration = 1.2;
      const s = flora.targetScale;

      if (elapsed < particlePhase) {
        g.visible = false;
      } else {
        g.visible = true;
        const bloomElapsed = elapsed - particlePhase;
        const progress = Math.min(1, bloomElapsed / growDuration);
        const ease = 1 - Math.pow(1 - progress, 4);
        const sy = flora.stretchY || 1; // corals carry no stretch
        const xz = s * (0.1 + 0.9 * ease);
        const y  = s * sy * (0.6 + 0.4 * ease);
        g.scale.set(xz, y, xz);
        g.position.y = flora.surfaceY;
        g.rotation.y += dt * 6 * (1 - ease);
        if (progress >= 1) {
          flora.grown = true;
          g.scale.set(s, s * sy, s);
        }
      }
    }

    if (isCoral) {
      // Coral current-sway — gentle underwater motion
      // Brain coral: rigid, no sway (it's a solid dome)
      // All others: slow, organic current sway
      const noSway = coralType.id === 'brain-coral';
      if (!noSway && flora.grown) {
        const swayAge = Math.max(0, t - flora.spawnTime - 1.5);
        const swayBlend = Math.min(1, swayAge / 1.0);
        if (swayBlend > 0) {
          const amp = 0.015 * swayBlend;
          const freq = 0.4;
          const px = g.position.x * 0.23;
          const pz = g.position.z * 0.19;
          // Slow, drifting underwater current motion
          g.rotation.x = Math.sin(t * freq + px) * amp;
          g.rotation.z = Math.cos(t * freq * 0.8 + pz) * amp * 0.7;
        }
      }
    } else {
      // Palm wind sway (layered waves for organic movement)
      if (PALM_CONFIG.sway) {
        const swayAge = Math.max(0, t - flora.spawnTime);
        const swayBlend = flora.grown ? Math.min(1, (swayAge - 1.8) / 1.0) : swayAge / 1.8 * 0.3;
        if (swayBlend > 0) {
          const amp = PALM_CONFIG.sway.amp * swayBlend;
          const freq = PALM_CONFIG.sway.freq;
          const px = g.position.x * 0.37;
          const pz = g.position.z * 0.29;
          const primary = Math.sin(t * freq + px) * amp;
          const secondary = Math.sin(t * freq * 2.3 + pz * 1.7) * amp * 0.3;
          const gust = Math.sin(t * 0.15 + px * 0.5) * amp * 0.5;
          g.rotation.x = primary + secondary;
          g.rotation.z = (Math.cos(t * freq * 0.7 + pz) * amp + gust) * 0.7;
        }
      }

      // Rotate placeholder labels to face camera
      g.traverse(child => {
        if (child.name === 'placeholder_label') {
          child.lookAt(camera.position);
        }
      });

      // ── Tree disturbance: shake (palms only, no corals) ──
      if (flora.disturbed) {
        const since = t - flora.disturbed;
        const shakeDuration = 1.2;
        if (since < shakeDuration) {
          const decay = 1 - since / shakeDuration;
          const shakeAmp = decay * 0.06;
          const shakeFreq = 14;
          g.rotation.x += Math.sin(t * shakeFreq) * shakeAmp;
          g.rotation.z += Math.cos(t * shakeFreq * 1.3) * shakeAmp * 0.8;
        } else {
          flora.disturbed = null;
        }
      }
    }
  });

  // ── Wild palms (wallpaper): hover shake + return to frozen pose ──
  _syncWildPalms();
  for (let i = 0; i < _wildPalms.length; i++) {
    const w = _wildPalms[i];
    if (!w.disturbed) continue;
    const since = t - w.disturbed;
    const shakeDuration = 1.2;
    if (since < shakeDuration) {
      const decay = 1 - since / shakeDuration;
      const shakeAmp = decay * 0.06;
      const shakeFreq = 14;
      w.group.rotation.x = w.baseRotX + Math.sin(t * shakeFreq) * shakeAmp;
      w.group.rotation.z = w.baseRotZ + Math.cos(t * shakeFreq * 1.3) * shakeAmp * 0.8;
    } else {
      w.group.rotation.x = w.baseRotX;
      w.group.rotation.z = w.baseRotZ;
      w.disturbed = null;
    }
  }

  // ── Coconuts: fall, bounce, rest, shrink away ──
  _updateCoconuts(t, dt);

  // ── Dying flora: shrink + spin out ──
  for (let i = dyingFlora.length - 1; i >= 0; i--) {
    const d = dyingFlora[i];
    const elapsed = t - d.startTime;
    const duration = 0.45; // fast & snappy
    const progress = Math.min(1, elapsed / duration);
    // Ease-in quad — starts slow, accelerates into ground
    const ease = progress * progress;
    const s = d.startScale * (1 - ease);
    const sy = (d.startScaleY || d.startScale) * (1 - ease);
    d.group.scale.set(s * 0.6, sy, s * 0.6); // squish X/Z first — tree narrows then vanishes
    d.group.position.y = d.startY - ease * 0.5; // sink slightly into ground
    d.group.rotation.y += dt * 6 * progress; // gentle spin accelerates
    if (progress >= 1) {
      floraGroup.remove(d.group);
      d.group.traverse(c => { if (c.geometry) c.geometry.dispose(); if (c.material) c.material.dispose(); });
      dyingFlora.splice(i, 1);
    }
  }

  // ── Growing flora: reverse-crumble particles converge upward ──
  _tickGrowParticles(t);
}
