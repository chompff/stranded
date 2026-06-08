// ============================================================
// rocks.js — Procedural rock system (Layer 2: Island Features)
// ============================================================
// Steps 1-6: Shape generation, 5 approved variants, seeded scatter
// across full island, per-instance tint, InstancedMesh.
// ============================================================

import * as THREE from 'three';
import { scene, ISLAND_SEED, ISLAND_Z, terrainRefs } from './state.js';
import { getTerrainHeight } from './terrain.js';

// ── Mulberry32 PRNG (same as sky-water.js) ──
function mulberry32(seed) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Seeded 3D noise for vertex displacement ──
function seededNoise3D(rng, tableSize) {
  const table = new Float32Array(tableSize);
  for (let i = 0; i < tableSize; i++) table[i] = rng() * 2 - 1; // -1..+1
  return function (x, y, z) {
    const idx = ((Math.abs(x * 7919 + y * 104729 + z * 52711) | 0) % tableSize + tableSize) % tableSize;
    return table[idx];
  };
}

/**
 * Generate a single procedural rock geometry.
 * @param {number} seed - Unique seed for this rock shape
 * @param {number} detail - Icosahedron subdivision level (1=low, 2=high)
 * @param {number} jaggedness - Vertex displacement strength (0.1=smooth, 0.5=very jagged)
 * @returns {THREE.BufferGeometry}
 */
export function generateRockGeometry(seed, detail = 2, jaggedness = 0.25) {
  const geo = new THREE.IcosahedronGeometry(1, detail);
  const pos = geo.attributes.position;
  const rng = mulberry32(seed);
  const noise = seededNoise3D(rng, 4096);

  // Two octaves of displacement for natural look
  const freqLo = 1.8;   // large-scale lumps
  const freqHi = 4.5;   // small-scale jaggedness
  const ampLo = jaggedness;
  const ampHi = jaggedness * 0.35;

  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.set(pos.getX(i), pos.getY(i), pos.getZ(i));

    // Sample noise at two frequencies
    const n1 = noise(v.x * freqLo * 100, v.y * freqLo * 100, v.z * freqLo * 100);
    const n2 = noise(v.x * freqHi * 100 + 500, v.y * freqHi * 100 + 500, v.z * freqHi * 100 + 500);

    // Displace along normal (which for a unit sphere = the vertex direction)
    const displacement = 1 + n1 * ampLo + n2 * ampHi;

    // Flatten bottom slightly so rocks sit naturally on ground
    let yScale = 1.0;
    if (v.y < -0.3) {
      yScale = 0.6; // squash the bottom
    }

    pos.setXYZ(i, v.x * displacement, v.y * displacement * yScale, v.z * displacement);
  }

  geo.computeVertexNormals();
  return geo;
}

// ── Raycast to find actual surface Y (terrain + seabed) ──
function getRealSurfaceY(wx, wz) {
  const bg = terrainRefs.blocksGroup;
  if (!bg || bg.children.length === 0) return null;
  const targets = [...bg.children];
  if (terrainRefs.seabedMesh) targets.push(terrainRefs.seabedMesh);
  const ray = new THREE.Raycaster(new THREE.Vector3(wx, 50, wz), new THREE.Vector3(0, -1, 0));
  const hits = ray.intersectObjects(targets, true);
  return hits.length > 0 ? hits[0].point.y : null;
}

// ── Deterministic position-based hash noise (seed-aware) ──
function hashNoise(x, y, z) {
  let n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7 + ISLAND_SEED * 0.1731) * 43758.5453;
  return n - Math.floor(n);
}

// ── 5 approved shape variants ──
const variants = [
  { seed: ISLAND_SEED * 1234567 + 1, jagged: 0.10 }, // smooth
  { seed: ISLAND_SEED * 2345678 + 2, jagged: 0.13 }, // gentle
  { seed: ISLAND_SEED * 3456789 + 3, jagged: 0.15 }, // mild
  { seed: ISLAND_SEED * 4567890 + 4, jagged: 0.18 }, // moderate
  { seed: ISLAND_SEED * 5678901 + 5, jagged: 0.22 }, // rough
];

// ── Geometries: detail=2 per variant (~180 tris each, ~100 rocks = 18k tris total) ──
const rockGeos = variants.map(v => generateRockGeometry(v.seed, 2, v.jagged));

// Base material config
const BASE_COLOR = new THREE.Color(0x8a8578);
const rockMat = new THREE.MeshStandardMaterial({
  color: 0x8a8578, roughness: 0.85, metalness: 0.02, flatShading: true,
});

// ── Island-only scan extents ──
const SCAN_X_MIN = -80;
const SCAN_X_MAX = 80;
const SCAN_Z_MIN = -220;
const SCAN_Z_MAX = 310;
const SPAWN_X = 0;
const SPAWN_Z = -155;
const SPAWN_CLEAR = 3;

// ── Zone definitions: surfaceY-based classification ──
// Uniform grid step of 6; density controls effective spacing per zone.
const GRID_STEP = 6;
const ZONES = {
  homeBeach:      { density: 0.22, scaleMin: 0.3, scaleMax: 1.0, burialMin: 0.15, burialMax: 0.40, hueShift: 0,      lShift: 0.16 },
  interior:       { density: 0.09, scaleMin: 0.4, scaleMax: 1.2, burialMin: 0.20, burialMax: 0.45, hueShift: 0.02,   lShift: 0.12 },
  coastlineLower: { density: 0.60, scaleMin: 0.8, scaleMax: 2.5, burialMin: 0.05, burialMax: 0.20, hueShift: -0.015, lShift: 0.10 },
};

function classifyZone(surfaceY, wz) {
  if (surfaceY < -0.5) return null;                           // underwater — skip
  if (surfaceY <= 0.3) return ZONES.coastlineLower;           // near waterline
  if (surfaceY <= 1.5) {
    if (wz <= -120) return ZONES.homeBeach;                   // Home Beach flat
    return null;                                              // slopes — no rocks (clean tropical look)
  }
  if (wz <= -120) return ZONES.homeBeach;                     // Home Beach plateau
  return ZONES.interior;                                      // island interior
}

// ── Data collection: placements grouped by variant index ──
const placements = variants.map(() => []);

function collectPlacements() {
  for (let wx = SCAN_X_MIN; wx <= SCAN_X_MAX; wx += GRID_STEP) {
    for (let wz = SCAN_Z_MIN; wz <= SCAN_Z_MAX; wz += GRID_STEP) {
      const jitterX = (hashNoise(wx * 7.1, wz * 11.3, 1) - 0.5) * GRID_STEP * 0.7;
      const jitterZ = (hashNoise(wx * 9.7, wz * 5.3, 2) - 0.5) * GRID_STEP * 0.7;
      const px = wx + jitterX;
      const pz = wz + jitterZ;

      // Skip near player spawn
      const dx = px - SPAWN_X;
      const dz = pz - SPAWN_Z;
      if (dx * dx + dz * dz < SPAWN_CLEAR * SPAWN_CLEAR) continue;

      // Raycast surface
      const surfaceY = getRealSurfaceY(px, pz);
      if (surfaceY === null) continue;

      // Sky rock prevention: two checks to eliminate floating rocks.
      // 1) Cross-reference raycast Y with analytical terrain height.
      //    Glitch triangles at terrain edges produce raycast hits far above
      //    the actual terrain surface. Skip if they disagree by > 1 unit.
      const OCEAN_FLOOR = -11;
      const analyticalY = getTerrainHeight(px, pz) * 2 + OCEAN_FLOOR; // grid units → world Y
      if (surfaceY > analyticalY + 1.0) continue;

      // 2) Wider neighbor check: terrain must exist at all 4 cardinal offsets (±4 units).
      //    Catches rocks on thin terrain slivers at the island edge.
      if (surfaceY > 0.5) {
        const h1 = getTerrainHeight(px + 4, pz);
        const h2 = getTerrainHeight(px - 4, pz);
        const h3 = getTerrainHeight(px, pz + 4);
        const h4 = getTerrainHeight(px, pz - 4);
        if (h1 <= 0 || h2 <= 0 || h3 <= 0 || h4 <= 0) continue;
      }

      // Classify zone
      const zone = classifyZone(surfaceY, pz);
      if (!zone) continue;

      // Large-scale rock-free patches (~30% of island has no rocks)
      // Low-frequency noise creates organic blob-shaped clearings
      const patchN = hashNoise(wx * 0.08, wz * 0.05, 10);
      if (patchN < 0.30) continue;

      // Density filter (zone-specific threshold)
      const densityN = hashNoise(wx * 3.1, wz * 5.7, 0);
      if (densityN > zone.density) continue;

      // Per-instance variation seeded by grid position
      const varIdx = Math.floor(hashNoise(wx * 13.7, wz * 17.3, 3) * variants.length) % variants.length;
      const scaleN = hashNoise(wx * 19.3, wz * 7.9, 5);
      const scale = zone.scaleMin + scaleN * (zone.scaleMax - zone.scaleMin);
      const burialFrac = zone.burialMin + hashNoise(wx * 29.1, wz * 13.3, 6) * (zone.burialMax - zone.burialMin);

      placements[varIdx].push({
        px, pz, surfaceY,
        scale,
        burialDepth: scale * burialFrac,
        rotY: hashNoise(wx * 41.3, wz * 29.7, 7) * Math.PI * 2,
        tiltX: (hashNoise(wx * 37.1, wz * 43.9, 8) - 0.5) * 0.104,
        tiltZ: (hashNoise(wx * 53.3, wz * 19.1, 9) - 0.5) * 0.104,
        tintShift: (hashNoise(wx * 23.1, wz * 31.7, 4) - 0.5) * zone.lShift,
        hueShift: zone.hueShift,
      });
    }
  }
}

// ── InstancedMesh arrays (one per variant, 5 draw calls total) ──
const meshes = [];
const _dummy = new THREE.Object3D();
const _tintColor = new THREE.Color();

function buildInstanceMeshes() {
  for (let v = 0; v < variants.length; v++) {
    const group = placements[v];
    const count = group.length;
    if (count === 0) { meshes.push(null); continue; }

    const im = new THREE.InstancedMesh(rockGeos[v], rockMat.clone(), count);
    im.castShadow = true;
    im.receiveShadow = true;

    for (let i = 0; i < count; i++) {
      const p = group[i];
      _dummy.position.set(p.px, p.surfaceY - p.burialDepth, p.pz);
      _dummy.rotation.set(p.tiltX, p.rotY, p.tiltZ);
      _dummy.scale.setScalar(p.scale);
      _dummy.updateMatrix();
      im.setMatrixAt(i, _dummy.matrix);

      // Per-instance tint color (hue shift for zone feel, lightness for variation)
      _tintColor.copy(BASE_COLOR).offsetHSL(p.hueShift || 0, 0, p.tintShift);
      im.setColorAt(i, _tintColor);
    }

    im.instanceMatrix.needsUpdate = true;
    im.instanceColor.needsUpdate = true;
    scene.add(im);
    meshes.push(im);
  }
}

// ── No per-frame update needed (kept as no-op for main.js compatibility) ──
export function updateRockLOD() {}

// ── Initialize (exported so main.js can call after all modules load) ──
export function initRocks() {
  collectPlacements();
  buildInstanceMeshes();
}
