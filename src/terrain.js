// ============================================================
// BORA BORA — Terrain Module
// Analytical terrain mesh, materials, island generation
// ============================================================
import * as THREE from 'three';
import {
  scene, ISLAND_Z, OCEAN_FLOOR_Y, TILE_SIZE, BUILD_RADIUS,
  heightmap, buildState, buildTools, terrainRefs, floraToolState, callbacks, camOrbit
} from './state.js';

// ============================================================
// TERRAIN CORE
// ============================================================

// Terrain mesh container — raycasters depend on this group
const blocksGroup = new THREE.Group();
scene.add(blocksGroup);

// --- Get column data at (gx, gz) — backward compat for ecosystem/ui ---
function getColumn(gx, gz) {
  return heightmap.get(gx + ',' + gz) || { rockHeight: 0, totalHeight: 0 };
}

// ============================================================
// NOISE FUNCTIONS
// ============================================================

function hashNoise(x, y, z) {
  let n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return n - Math.floor(n);
}
function hashNoise2(x, y, z) {
  let n = Math.sin(x * 269.5 + y * 183.3 + z * 337.1) * 43758.5453;
  return n - Math.floor(n);
}

function fractalNoise(x, y, z, octaves, persistence) {
  let val = 0, amp = 1, freq = 1, maxVal = 0;
  for (let o = 0; o < octaves; o++) {
    val += (hashNoise(x*freq, y*freq, z*freq) - 0.5) * amp;
    maxVal += amp;
    amp *= persistence;
    freq *= 2.1;
  }
  return val / maxVal;
}

// ============================================================
// MATERIALS
// ============================================================

const sharedRockMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0.22, 0.21, 0.19), // dark warm grey — volcanic
  roughness: 0.88,
  metalness: 0.04,
  flatShading: false,
});

const sharedSandMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color(1.0, 1.0, 1.0), // pristine white sand
  roughness: 0.92,
  metalness: 0,
  flatShading: false,
});

// --- Inject underwater caustics into rock & sand materials ---
// Uses world-space coordinates to seamlessly match the seabed caustic overlay
const causticUniforms = { uCausticTime: { value: 0 }, uCausticIntensity: { value: 1.0 }, uCausticScale: { value: 3.0 } };

function injectCaustics(mat) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uCausticTime = causticUniforms.uCausticTime;
    shader.uniforms.uCausticIntensity = causticUniforms.uCausticIntensity;
    shader.uniforms.uCausticScale = causticUniforms.uCausticScale;

    // Add varying for world position
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>
       varying vec3 vWorldPos;`
    );
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
       vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;`
    );

    // Add caustic functions to fragment shader - GPU-safe Voronoi (Dave Hoskins hash, no sin*43758)
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
       uniform float uCausticTime;
       uniform float uCausticIntensity;
       uniform float uCausticScale;
       varying vec3 vWorldPos;

       vec2 safeHash22(vec2 p) {
         vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
         p3 += dot(p3, p3.yzx + 33.33);
         return fract((p3.xx + p3.yz) * p3.zy);
       }

       float causticVoronoi(vec2 uv, float t) {
         vec2 i = floor(uv);
         vec2 f = fract(uv);
         float d1 = 1.0;
         float d2 = 1.0;
         for (int y = -1; y <= 1; y++) {
           for (int x = -1; x <= 1; x++) {
             vec2 neighbor = vec2(float(x), float(y));
             vec2 point = safeHash22(i + neighbor);
             point = 0.5 + 0.5 * sin(t * 0.4 + 6.2831 * point);
             vec2 diff = neighbor + point - f;
             float dist = length(diff);
             if (dist < d1) { d2 = d1; d1 = dist; }
             else if (dist < d2) { d2 = dist; }
           }
         }
         return d2 - d1;
       }`
    );

    // Add caustics - bright lines on submerged rock
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `#include <dithering_fragment>
       {
         float uwd = clamp(-vWorldPos.y / 3.0, 0.0, 1.0);
         if (uwd > 0.0 && uCausticIntensity > 0.0) {
           vec2 wUv = vWorldPos.xz / 800.0 + 0.5;
           float v1 = causticVoronoi(wUv * 149.0 * uCausticScale, uCausticTime);
           float v2 = causticVoronoi(wUv * 114.0 * uCausticScale + vec2(3.7, 1.3), uCausticTime * 0.7);
           float c1 = smoothstep(0.0, 0.12, v1);
           float c2 = smoothstep(0.0, 0.10, v2);
           float caustic = (1.0 - c1) * 0.6 + (1.0 - c2) * 0.4;
           caustic = clamp(caustic, 0.0, 1.0);
           caustic = caustic * caustic * caustic;
           float bright = caustic * 0.15 * uwd * uCausticIntensity;
           gl_FragColor.rgb = gl_FragColor.rgb + bright * vec3(1.0, 1.0, 1.0);
           gl_FragColor.rgb = min(gl_FragColor.rgb, vec3(1.0));
         }
       }`
    );
  };
}

injectCaustics(sharedRockMat);

// Sand gets pre-lighting white→tan gradient + post-lighting caustics
(function injectSandShader() {
  sharedSandMat.onBeforeCompile = (shader) => {
    shader.uniforms.uCausticTime = causticUniforms.uCausticTime;
    shader.uniforms.uCausticIntensity = causticUniforms.uCausticIntensity;
    shader.uniforms.uCausticScale = causticUniforms.uCausticScale;

    // Add varying for world position
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>
       varying vec3 vWorldPos;`
    );
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
       vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;`
    );

    // Add caustic + color blend functions
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
       uniform float uCausticTime;
       uniform float uCausticIntensity;
       uniform float uCausticScale;
       varying vec3 vWorldPos;

       vec2 safeHash22(vec2 p) {
         vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
         p3 += dot(p3, p3.yzx + 33.33);
         return fract((p3.xx + p3.yz) * p3.zy);
       }

       float causticVoronoi(vec2 uv, float t) {
         vec2 i = floor(uv);
         vec2 f = fract(uv);
         float d1 = 1.0;
         float d2 = 1.0;
         for (int y = -1; y <= 1; y++) {
           for (int x = -1; x <= 1; x++) {
             vec2 neighbor = vec2(float(x), float(y));
             vec2 point = safeHash22(i + neighbor);
             point = 0.5 + 0.5 * sin(t * 0.4 + 6.2831 * point);
             vec2 diff = neighbor + point - f;
             float dist = length(diff);
             if (dist < d1) { d2 = d1; d1 = dist; }
             else if (dist < d2) { d2 = dist; }
           }
         }
         return d2 - d1;
       }`
    );

    // Caustics on the thin submerged band (Y=0 to ~-1.4) of the terrain mesh.
    // Terrain no longer extends deep underwater — seabed owns that.
    // No depth tint or depth fog needed (terrain stays in zone A white sand range).
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `#include <dithering_fragment>
       {
         float uwd = clamp(-vWorldPos.y / 3.0, 0.0, 1.0);
         if (uwd > 0.0 && uCausticIntensity > 0.0) {
           vec2 wUv = vWorldPos.xz / 800.0 + 0.5;
           float v1 = causticVoronoi(wUv * 149.0 * uCausticScale, uCausticTime);
           float v2 = causticVoronoi(wUv * 114.0 * uCausticScale + vec2(3.7, 1.3), uCausticTime * 0.7);
           float c1 = smoothstep(0.0, 0.12, v1);
           float c2 = smoothstep(0.0, 0.10, v2);
           float caustic = (1.0 - c1) * 0.6 + (1.0 - c2) * 0.4;
           caustic = clamp(caustic, 0.0, 1.0);
           caustic = caustic * caustic * caustic;
           float bright = caustic * 0.15 * uwd * uCausticIntensity;
           gl_FragColor.rgb = gl_FragColor.rgb + bright * vec3(1.0, 1.0, 1.0);
           gl_FragColor.rgb = min(gl_FragColor.rgb, vec3(1.0));
         }
       }`
    );
  };
})();

// ============================================================
// ISLAND SHAPE — Analytical Height Function
// ============================================================

// Island geometry constants (module-scope for getTerrainHeight access)
const plateauRx = 1;      // half-width of flat top (2 tiles along x)
const plateauZmin = -54;   // right end (screen-right)
const plateauZmax = 146;   // left end (extending +z = screen-left)
const slopeWidth = 20;    // tiles of gradual slope — wide natural underwater sand shelf

// --- Elevation spine profile: gentle organic undulation on a flat baseline ---
function getTargetHeight(gz) {
  if (gz <= -35) return 6;                    // Home Beach — flat

  // Blend factor: 0 at gz=-35, 1 at gz=-25 (10-tile fade-in)
  const blend = Math.min(1, (gz + 35) / 10);
  const b = blend * blend * (3 - 2 * blend); // smoothstep

  // Gentle organic undulation: layered sine waves
  const wave1 = Math.sin(gz * 0.06) * 0.35;
  const wave2 = Math.sin(gz * 0.14 + 2.0) * 0.2;
  const wave3 = Math.sin(gz * 0.03 + 5.0) * 0.25;
  const undulation = Math.max(0, wave1 + wave2 + wave3);

  return 6 + b * undulation;
}

// --- Continuous terrain height at any world-space (wx, wz) point ---
// Returns height in grid units (0 = no terrain). Multiply by TILE_SIZE
// and add OCEAN_FLOOR_Y to get world Y.
function getTerrainHeight(worldX, worldZ) {
  const gx = worldX / TILE_SIZE;
  const gz = (worldZ - ISLAND_Z) / TILE_SIZE;

  // Distance from plateau edge (0 = on plateau, >0 = on slope)
  const dx = Math.max(0, Math.abs(gx) - plateauRx);
  const dz = (gz < plateauZmin) ? (plateauZmin - gz) : (gz > plateauZmax) ? (gz - plateauZmax) : 0;

  // Subtle slope width variation — organic shoreline, not dramatic bulges.
  // The real shelf indentations live in the seabed (sky-water.js); this just
  // softens the terrain edge so it doesn't look perfectly machined.
  const perimCoord = (dx > dz) ? gz : gx;
  const tongue1 = Math.sin(perimCoord * 0.32 + 1.7) * 0.10;
  const tongue2 = Math.sin(perimCoord * 0.71 + 4.1) * 0.06;
  const tongue3 = Math.sin(perimCoord * 0.13 + 0.5) * 0.08;
  const tongueWarp = 1.0 + tongue1 + tongue2 + tongue3; // ~0.76 to ~1.24
  const localSlope = slopeWidth * tongueWarp;

  const edgeDist = Math.sqrt((dx / localSlope) ** 2 + (dz / localSlope) ** 2);

  if (edgeDist >= 1.1) return 0; // outside island

  const peakH = getTargetHeight(gz);

  let h;
  if (dx === 0 && dz === 0) {
    h = peakH; // on the plateau spine
  } else {
    // Parabolic beach entry: bias falloff so the slope is gentler where land
    // meets water, giving waves a wider wash zone on the sand.
    // pow < 1 flattens the waterline approach; 1.0 = original smoothstep.
    const falloff = Math.max(0, 1 - edgeDist);
    const f = Math.pow(falloff, 0.8);
    const s = f * f * (3 - 2 * f);
    h = peakH * s;
  }

  return h;
}

// ============================================================
// TERRAIN MESH — Analytical Displaced Plane
// ============================================================

let currentRockMesh = null;
let currentSandMesh = null;

// Track island extent for dynamic camera pan limits
const islandExtent = { radius: 20, centerX: 0, centerZ: 0, extentX: 20, extentZ: 20 };

function updateIslandExtent() {
  const ts = TILE_SIZE;
  const outerRx = (plateauRx + slopeWidth) * ts;
  const zMin = (plateauZmin - slopeWidth) * ts + ISLAND_Z;
  const zMax = (plateauZmax + slopeWidth) * ts + ISLAND_Z;

  islandExtent.centerX = 0;
  islandExtent.centerZ = (zMin + zMax) / 2;
  islandExtent.extentX = outerRx;
  islandExtent.extentZ = (zMax - zMin) / 2;
  islandExtent.radius = Math.max(20, Math.sqrt(outerRx * outerRx + islandExtent.extentZ * islandExtent.extentZ) + 10);
}

function getOrbitPanLimit() {
  return Math.min(islandExtent.radius * 1.5, 200);
}

function getBuilderPanLimit() {
  return Math.max(50, Math.min(islandExtent.radius * 3, BUILD_RADIUS * TILE_SIZE * 0.7));
}

function getOverheadPanLimit() {
  return Math.max(50, Math.min(islandExtent.radius * 3, BUILD_RADIUS * TILE_SIZE * 0.7));
}

function getPanLimit() {
  if (camOrbit.topTarget === 0) return getOrbitPanLimit();
  if (camOrbit.topTarget === 1) return getBuilderPanLimit();
  return getOverheadPanLimit();
}

// --- Build smooth analytical terrain mesh ---
function buildAnalyticalTerrain() {
  const ts = TILE_SIZE;
  const margin = 3.0;
  const maxSlope = slopeWidth * 1.3; // account for tongue warp (max ~1.24)
  const outerRx = plateauRx + maxSlope + margin;
  const outerZmin = plateauZmin - maxSlope - margin;
  const outerZmax = plateauZmax + maxSlope + margin;

  const worldMinX = -outerRx * ts;
  const worldMaxX = outerRx * ts;
  const worldMinZ = outerZmin * ts + ISLAND_Z;
  const worldMaxZ = outerZmax * ts + ISLAND_Z;

  const width = worldMaxX - worldMinX;
  const depth = worldMaxZ - worldMinZ;

  // Resolution: 1.0 world unit per vertex — single draw call, ~47k verts before culling.
  // Above-water plateau is narrow (4 wu) so smooth normals handle it fine.
  // Underwater slope is gentle (40 wu wide) so 1.0 step captures the shape well.
  const step = 1.0;
  const resX = Math.ceil(width / step);
  const resZ = Math.ceil(depth / step);

  const geo = new THREE.PlaneGeometry(width, depth, resX, resZ);
  geo.rotateX(-Math.PI / 2); // lay flat on XZ plane

  const pos = geo.attributes.position.array;
  const centerX = (worldMinX + worldMaxX) / 2;
  const centerZ = (worldMinZ + worldMaxZ) / 2;

  // Track which vertices have terrain (for face culling)
  const vertCount = pos.length / 3;
  const hasHeight = new Uint8Array(vertCount);

  // Displace each vertex by the analytical height function
  for (let i = 0; i < pos.length; i += 3) {
    // Offset from PlaneGeometry center to world position
    pos[i] += centerX;      // x
    pos[i + 2] += centerZ;  // z

    const h = getTerrainHeight(pos[i], pos[i + 2]);
    if (h > 4.8) {
      pos[i + 1] = OCEAN_FLOOR_Y + h * ts;
      hasHeight[i / 3] = 1;
    } else {
      // Below threshold — vertex won't be part of any rendered face (see
      // && culling below).  Park at ocean floor; position doesn't matter.
      pos[i + 1] = OCEAN_FLOOR_Y;
      hasHeight[i / 3] = 0;
    }
  }

  // Strict culling — remove ANY face that has a below-threshold vertex.
  // This eliminates all underwater terrain geometry (no cliffs, no shelves,
  // no tongue artifacts).  The seabed's island floor lift fills the gap.
  const oldIndex = geo.index ? geo.index.array : null;
  if (oldIndex) {
    const newIndices = [];
    for (let i = 0; i < oldIndex.length; i += 3) {
      const a = oldIndex[i], b = oldIndex[i + 1], c = oldIndex[i + 2];
      if (hasHeight[a] && hasHeight[b] && hasHeight[c]) {
        newIndices.push(a, b, c);
      }
    }
    geo.setIndex(newIndices);
  }

  geo.computeVertexNormals();

  const mesh = new THREE.Mesh(geo, sharedSandMat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function rebuildFormation() {
  // Remove old meshes
  if (currentRockMesh) {
    blocksGroup.remove(currentRockMesh);
    currentRockMesh.geometry.dispose();
    currentRockMesh = null;
  }
  if (currentSandMesh) {
    blocksGroup.remove(currentSandMesh);
    currentSandMesh.geometry.dispose();
    currentSandMesh = null;
  }

  // Build smooth analytical terrain (sand only — no rock for natural island)
  currentSandMesh = buildAnalyticalTerrain();
  if (currentSandMesh) blocksGroup.add(currentSandMesh);

  updateIslandExtent();

  // Update terrainRefs for cross-module access
  terrainRefs.currentRockMesh = currentRockMesh;
  terrainRefs.currentSandMesh = currentSandMesh;
}

// --- Populate heightmap for backward-compat getColumn() queries ---
function placeStarterIsland() {
  const maxSlope = slopeWidth * 1.3; // account for tongue warp
  const outerRx = plateauRx + maxSlope;
  const outerZmin = plateauZmin - maxSlope;
  const outerZmax = plateauZmax + maxSlope;

  for (let x = -Math.ceil(outerRx); x <= Math.ceil(outerRx); x++) {
    for (let z = Math.floor(outerZmin); z <= Math.ceil(outerZmax); z++) {
      const wx = x * TILE_SIZE;
      const wz = z * TILE_SIZE + ISLAND_Z;
      const h = getTerrainHeight(wx, wz);
      if (h <= 0) continue;

      heightmap.set(x + ',' + z, { rockHeight: 0, totalHeight: h });
    }
  }
}

// Helper used by ui.js for material assignment
function getBlockMat(type) {
  return type === 'rock' ? sharedRockMat : sharedSandMat;
}

// ============================================================
// BUILD SYSTEM STUBS — Dev UI compatibility
// Terrain is no longer editable, but the dev build menu still
// calls these for flora placement and brush management.
// ============================================================

function isTileInBounds(gx, gz) {
  return Math.abs(gx) <= BUILD_RADIUS && Math.abs(gz) <= BUILD_RADIUS;
}

function applyBrush(centerGX, centerGZ) {
  if (!isTileInBounds(centerGX, centerGZ)) return;
  const r = Math.floor(buildTools.brush / 2);
  for (let dz = -r; dz <= r; dz++) {
    for (let dx = -r; dx <= r; dx++) {
      const gx = centerGX + dx;
      const gz = centerGZ + dz;
      if (!isTileInBounds(gx, gz)) continue;
      const cellKey = gx + ',' + gz;
      if (buildState.paintedCells.has(cellKey)) continue;
      buildState.paintedCells.add(cellKey);

      // Flora mode: place or remove flora
      if (floraToolState.mode === 'flora') {
        if (floraToolState.selectedSpecies === 'REMOVE') {
          if (callbacks.removeFlora) callbacks.removeFlora(gx, gz);
        } else {
          if (callbacks.placeFlora) callbacks.placeFlora(floraToolState.selectedSpecies, gx, gz);
        }
      }
      // Terrain editing removed — terrain is analytical
    }
  }
}

// No-ops — terrain undo/preview no longer needed
function saveUndoSnapshot() {}
function undoPlace() {}
function clearDragPreview() {}
function updateDragPreview() {}
function updateBrushCursorSize() {}
function tickCrumbleParticles() {}

// ============================================================
// MODULE INIT
// ============================================================

// Wire up terrainRefs for cross-module access
terrainRefs.blocksGroup = blocksGroup;
terrainRefs.sharedRockMat = sharedRockMat;
terrainRefs.sharedSandMat = sharedSandMat;

// Place starter island & build terrain mesh
placeStarterIsland();
rebuildFormation();

// ============================================================
// EXPORTS
// ============================================================
export {
  getColumn,
  getTerrainHeight,
  rebuildFormation,
  sharedRockMat,
  sharedSandMat,
  causticUniforms,
  blocksGroup,
  islandExtent,
  updateIslandExtent,
  getOrbitPanLimit,
  getBuilderPanLimit,
  getOverheadPanLimit,
  getPanLimit,
  hashNoise,
  hashNoise2,
  fractalNoise,
  getBlockMat,
  injectCaustics,
  // Build system stubs (dev UI compat)
  isTileInBounds,
  applyBrush,
  saveUndoSnapshot,
  undoPlace,
  clearDragPreview,
  updateDragPreview,
  updateBrushCursorSize,
  updateBrushCursorSize as updateBrushCursor,
  tickCrumbleParticles,
};
