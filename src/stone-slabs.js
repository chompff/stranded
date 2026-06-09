// ============================================================
// stone-slabs.js — Marching Cubes stone slab generation
// ============================================================
// Ported from old terrain.js rock painter. Generates organic volcanic
// rock formations from procedural block clusters using:
//   1. Binary fill + neighbor density borrowing
//   2. 3D Gaussian blur (separable 3-pass)
//   3. Noise perturbation for craggy detail
//   4. Marching cubes isosurface extraction
//   5. Vertex displacement + Laplacian smoothing
//
// Each variant is a pre-generated BufferGeometry centered at origin,
// ready for InstancedMesh in slab-scatter.js.
// ============================================================

import * as THREE from 'three';

// ── Hash noise (identical to old terrain.js) ──
function hashNoise(x, y, z) {
  let n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return n - Math.floor(n);
}

// ── Marching Cubes lookup tables ──
const MC_EDGE_TABLE = [0x0,0x109,0x203,0x30a,0x406,0x50f,0x605,0x70c,0x80c,0x905,0xa0f,0xb06,0xc0a,0xd03,0xe09,0xf00,0x190,0x99,0x393,0x29a,0x596,0x49f,0x795,0x69c,0x99c,0x895,0xb9f,0xa96,0xd9a,0xc93,0xf99,0xe90,0x230,0x339,0x33,0x13a,0x636,0x73f,0x435,0x53c,0xa3c,0xb35,0x83f,0x936,0xe3a,0xf33,0xc39,0xd30,0x3a0,0x2a9,0x1a3,0xaa,0x7a6,0x6af,0x5a5,0x4ac,0xbac,0xaa5,0x9af,0x8a6,0xfaa,0xea3,0xda9,0xca0,0x460,0x569,0x663,0x76a,0x66,0x16f,0x265,0x36c,0xc6c,0xd65,0xe6f,0xf66,0x86a,0x963,0xa69,0xb60,0x5f0,0x4f9,0x7f3,0x6fa,0x1f6,0xff,0x3f5,0x2fc,0xdfc,0xcf5,0xfff,0xef6,0x9fa,0x8f3,0xbf9,0xaf0,0x650,0x759,0x453,0x55a,0x256,0x35f,0x55,0x15c,0xe5c,0xf55,0xc5f,0xd56,0xa5a,0xb53,0x859,0x950,0x7c0,0x6c9,0x5c3,0x4ca,0x3c6,0x2cf,0x1c5,0xcc,0xfcc,0xec5,0xdcf,0xcc6,0xbca,0xac3,0x9c9,0x8c0,0x8c0,0x9c9,0xac3,0xbca,0xcc6,0xdcf,0xec5,0xfcc,0xcc,0x1c5,0x2cf,0x3c6,0x4ca,0x5c3,0x6c9,0x7c0,0x950,0x859,0xb53,0xa5a,0xd56,0xc5f,0xf55,0xe5c,0x15c,0x55,0x35f,0x256,0x55a,0x453,0x759,0x650,0xaf0,0xbf9,0x8f3,0x9fa,0xef6,0xfff,0xcf5,0xdfc,0x2fc,0x3f5,0xff,0x1f6,0x6fa,0x7f3,0x4f9,0x5f0,0xb60,0xa69,0x963,0x86a,0xf66,0xe6f,0xd65,0xc6c,0x36c,0x265,0x16f,0x66,0x76a,0x663,0x569,0x460,0xca0,0xda9,0xea3,0xfaa,0x8a6,0x9af,0xaa5,0xbac,0x4ac,0x5a5,0x6af,0x7a6,0xaa,0x1a3,0x2a9,0x3a0,0xd30,0xc39,0xf33,0xe3a,0x936,0x83f,0xb35,0xa3c,0x53c,0x435,0x73f,0x636,0x13a,0x33,0x339,0x230,0xe90,0xf99,0xc93,0xd9a,0xa96,0xb9f,0x895,0x99c,0x69c,0x795,0x49f,0x596,0x29a,0x393,0x99,0x190,0xf00,0xe09,0xd03,0xc0a,0xb06,0xa0f,0x905,0x80c,0x70c,0x605,0x50f,0x406,0x30a,0x203,0x109,0x0];

const MC_TRI_TABLE = [[-1],[0,8,3,-1],[0,1,9,-1],[1,8,3,9,8,1,-1],[1,2,10,-1],[0,8,3,1,2,10,-1],[9,2,10,0,2,9,-1],[2,8,3,2,10,8,10,9,8,-1],[3,11,2,-1],[0,11,2,8,11,0,-1],[1,9,0,2,3,11,-1],[1,11,2,1,9,11,9,8,11,-1],[3,10,1,11,10,3,-1],[0,10,1,0,8,10,8,11,10,-1],[3,9,0,3,11,9,11,10,9,-1],[9,8,10,10,8,11,-1],[4,7,8,-1],[4,3,0,7,3,4,-1],[0,1,9,8,4,7,-1],[4,1,9,4,7,1,7,3,1,-1],[1,2,10,8,4,7,-1],[3,4,7,3,0,4,1,2,10,-1],[9,2,10,9,0,2,8,4,7,-1],[2,10,9,2,9,7,2,7,3,7,9,4,-1],[8,4,7,3,11,2,-1],[11,4,7,11,2,4,2,0,4,-1],[9,0,1,8,4,7,2,3,11,-1],[4,7,11,9,4,11,9,11,2,9,2,1,-1],[3,10,1,3,11,10,7,8,4,-1],[1,11,10,1,4,11,1,0,4,7,11,4,-1],[4,7,8,9,0,11,9,11,10,11,0,3,-1],[4,7,11,4,11,9,9,11,10,-1],[9,5,4,-1],[9,5,4,0,8,3,-1],[0,5,4,1,5,0,-1],[8,5,4,8,3,5,3,1,5,-1],[1,2,10,9,5,4,-1],[3,0,8,1,2,10,4,9,5,-1],[5,2,10,5,4,2,4,0,2,-1],[2,10,5,3,2,5,3,5,4,3,4,8,-1],[9,5,4,2,3,11,-1],[0,11,2,0,8,11,4,9,5,-1],[0,5,4,0,1,5,2,3,11,-1],[2,1,5,2,5,8,2,8,11,4,8,5,-1],[10,3,11,10,1,3,9,5,4,-1],[4,9,5,0,8,1,8,10,1,8,11,10,-1],[5,4,0,5,0,11,5,11,10,11,0,3,-1],[5,4,8,5,8,10,10,8,11,-1],[9,7,8,5,7,9,-1],[9,3,0,9,5,3,5,7,3,-1],[0,7,8,0,1,7,1,5,7,-1],[1,5,3,3,5,7,-1],[9,7,8,9,5,7,10,1,2,-1],[10,1,2,9,5,0,5,3,0,5,7,3,-1],[8,0,2,8,2,5,8,5,7,10,5,2,-1],[2,10,5,2,5,3,3,5,7,-1],[7,9,5,7,8,9,3,11,2,-1],[9,5,7,9,7,2,9,2,0,2,7,11,-1],[2,3,11,0,1,8,1,7,8,1,5,7,-1],[11,2,1,11,1,7,7,1,5,-1],[9,5,8,8,5,7,10,1,3,10,3,11,-1],[5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1],[11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1],[11,10,5,7,11,5,-1],[10,6,5,-1],[0,8,3,5,10,6,-1],[9,0,1,5,10,6,-1],[1,8,3,1,9,8,5,10,6,-1],[1,6,5,2,6,1,-1],[1,6,5,1,2,6,3,0,8,-1],[9,6,5,9,0,6,0,2,6,-1],[5,9,8,5,8,2,5,2,6,3,2,8,-1],[2,3,11,10,6,5,-1],[11,0,8,11,2,0,10,6,5,-1],[0,1,9,2,3,11,5,10,6,-1],[5,10,6,1,9,2,9,11,2,9,8,11,-1],[6,3,11,6,5,3,5,1,3,-1],[0,8,11,0,11,5,0,5,1,5,11,6,-1],[3,11,6,0,3,6,0,6,5,0,5,9,-1],[6,5,9,6,9,11,11,9,8,-1],[5,10,6,4,7,8,-1],[4,3,0,4,7,3,6,5,10,-1],[1,9,0,5,10,6,8,4,7,-1],[10,6,5,1,9,7,1,7,3,7,9,4,-1],[6,1,2,6,5,1,4,7,8,-1],[1,2,5,5,2,6,3,0,4,3,4,7,-1],[8,4,7,9,0,5,0,6,5,0,2,6,-1],[7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1],[3,11,2,7,8,4,10,6,5,-1],[5,10,6,4,7,2,4,2,0,2,7,11,-1],[0,1,9,4,7,8,2,3,11,5,10,6,-1],[9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1],[8,4,7,3,11,5,3,5,1,5,11,6,-1],[5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1],[0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1],[6,5,9,6,9,11,4,7,9,7,11,9,-1],[10,4,9,6,4,10,-1],[4,10,6,4,9,10,0,8,3,-1],[10,0,1,10,6,0,6,4,0,-1],[8,3,1,8,1,6,8,6,4,6,1,10,-1],[1,4,9,1,2,4,2,6,4,-1],[3,0,8,1,2,9,2,4,9,2,6,4,-1],[0,2,4,4,2,6,-1],[8,3,2,8,2,4,4,2,6,-1],[10,4,9,10,6,4,11,2,3,-1],[0,8,2,2,8,11,4,9,10,4,10,6,-1],[3,11,2,0,1,6,0,6,4,6,1,10,-1],[6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1],[9,6,4,9,3,6,9,1,3,11,6,3,-1],[8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1],[3,11,6,3,6,0,0,6,4,-1],[6,4,8,11,6,8,-1],[7,10,6,7,8,10,8,9,10,-1],[0,7,3,0,10,7,0,9,10,6,7,10,-1],[10,6,7,1,10,7,1,7,8,1,8,0,-1],[10,6,7,10,7,1,1,7,3,-1],[1,2,6,1,6,8,1,8,9,8,6,7,-1],[2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1],[7,8,0,7,0,6,6,0,2,-1],[7,3,2,6,7,2,-1],[2,3,11,10,6,8,10,8,9,8,6,7,-1],[2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1],[1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1],[11,2,1,11,1,7,10,6,1,6,7,1,-1],[8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1],[0,9,1,11,6,7,-1],[7,8,0,7,0,6,3,11,0,11,6,0,-1],[7,11,6,-1],[7,6,11,-1],[3,0,8,11,7,6,-1],[0,1,9,11,7,6,-1],[8,1,9,8,3,1,11,7,6,-1],[10,1,2,6,11,7,-1],[1,2,10,3,0,8,6,11,7,-1],[2,9,0,2,10,9,6,11,7,-1],[6,11,7,2,10,3,10,8,3,10,9,8,-1],[7,2,3,6,2,7,-1],[7,0,8,7,6,0,6,2,0,-1],[2,7,6,2,3,7,0,1,9,-1],[1,6,2,1,8,6,1,9,8,8,7,6,-1],[10,7,6,10,1,7,1,3,7,-1],[10,7,6,1,7,10,1,8,7,1,0,8,-1],[0,3,7,0,7,10,0,10,9,6,10,7,-1],[7,6,10,7,10,8,8,10,9,-1],[6,8,4,11,8,6,-1],[3,6,11,3,0,6,0,4,6,-1],[8,6,11,8,4,6,9,0,1,-1],[9,4,6,9,6,3,9,3,1,11,3,6,-1],[6,8,4,6,11,8,2,10,1,-1],[1,2,10,3,0,11,0,6,11,0,4,6,-1],[4,11,8,4,6,11,0,2,9,2,10,9,-1],[10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1],[8,2,3,8,4,2,4,6,2,-1],[0,4,2,4,6,2,-1],[1,9,0,2,3,4,2,4,6,4,3,8,-1],[1,9,4,1,4,2,2,4,6,-1],[8,1,3,8,6,1,8,4,6,6,10,1,-1],[10,1,0,10,0,6,6,0,4,-1],[4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1],[10,9,4,6,10,4,-1],[4,9,5,7,6,11,-1],[0,8,3,4,9,5,11,7,6,-1],[5,0,1,5,4,0,7,6,11,-1],[11,7,6,8,3,4,3,5,4,3,1,5,-1],[9,5,4,10,1,2,7,6,11,-1],[6,11,7,1,2,10,0,8,3,4,9,5,-1],[7,6,11,5,4,10,4,2,10,4,0,2,-1],[3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1],[7,2,3,7,6,2,5,4,9,-1],[9,5,4,0,8,6,0,6,2,6,8,7,-1],[3,6,2,3,7,6,1,5,0,5,4,0,-1],[6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1],[9,5,4,10,1,6,1,7,6,1,3,7,-1],[1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1],[4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,-1],[7,6,10,7,10,8,5,4,10,4,8,10,-1],[6,9,5,6,11,9,11,8,9,-1],[3,6,11,0,6,3,0,5,6,0,9,5,-1],[0,11,8,0,5,11,0,1,5,5,6,11,-1],[6,11,3,6,3,5,5,3,1,-1],[1,2,10,9,5,11,9,11,8,11,5,6,-1],[0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1],[11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1],[6,11,3,6,3,5,2,10,3,10,5,3,-1],[5,8,9,5,2,8,5,6,2,3,8,2,-1],[9,5,6,9,6,0,0,6,2,-1],[1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1],[1,5,6,2,1,6,-1],[1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1],[10,1,0,10,0,6,9,5,0,5,6,0,-1],[0,3,8,5,6,10,-1],[10,5,6,-1],[11,5,10,7,5,11,-1],[11,5,10,11,7,5,8,3,0,-1],[5,11,7,5,10,11,1,9,0,-1],[10,7,5,10,11,7,9,8,1,8,3,1,-1],[11,1,2,11,7,1,7,5,1,-1],[0,8,3,1,2,7,1,7,5,7,2,11,-1],[9,7,5,9,2,7,9,0,2,2,11,7,-1],[7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1],[2,5,10,2,3,5,3,7,5,-1],[8,2,0,8,5,2,8,7,5,10,2,5,-1],[9,0,1,5,10,3,5,3,7,3,10,2,-1],[9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1],[1,3,5,3,7,5,-1],[0,8,7,0,7,1,1,7,5,-1],[9,0,3,9,3,5,5,3,7,-1],[9,8,7,5,9,7,-1],[5,8,4,5,10,8,10,11,8,-1],[5,0,4,5,11,0,5,10,11,11,3,0,-1],[0,1,9,8,4,10,8,10,11,10,4,5,-1],[10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1],[2,5,1,2,8,5,2,11,8,4,5,8,-1],[0,4,11,0,11,3,4,5,11,2,11,1,5,1,11,-1],[0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1],[9,4,5,2,11,3,-1],[2,5,10,3,5,2,3,4,5,3,8,4,-1],[5,10,2,5,2,4,4,2,0,-1],[3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1],[5,10,2,5,2,4,1,9,2,9,4,2,-1],[8,4,5,8,5,3,3,5,1,-1],[0,4,5,1,0,5,-1],[8,4,5,8,5,3,9,0,5,0,3,5,-1],[9,4,5,-1],[4,11,7,4,9,11,9,10,11,-1],[0,8,3,4,9,7,9,11,7,9,10,11,-1],[1,10,11,1,11,4,1,4,0,7,4,11,-1],[3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1],[4,11,7,9,11,4,9,2,11,9,1,2,-1],[9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1],[11,7,4,11,4,2,2,4,0,-1],[11,7,4,11,4,2,8,3,4,3,2,4,-1],[2,9,10,2,7,9,2,3,7,7,4,9,-1],[9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1],[3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1],[1,10,2,8,7,4,-1],[4,9,1,4,1,7,7,1,3,-1],[4,9,1,4,1,7,0,8,1,8,7,1,-1],[4,0,3,7,4,3,-1],[4,8,7,-1],[9,10,8,10,11,8,-1],[3,0,9,3,9,11,11,9,10,-1],[0,1,10,0,10,8,8,10,11,-1],[3,1,10,11,3,10,-1],[1,2,11,1,11,9,9,11,8,-1],[3,0,9,3,9,11,1,2,9,2,11,9,-1],[0,2,11,8,0,11,-1],[3,2,11,-1],[2,3,8,2,8,10,10,8,9,-1],[9,10,2,0,9,2,-1],[2,3,8,2,8,10,0,1,8,1,10,8,-1],[1,10,2,-1],[1,3,8,9,1,8,-1],[0,9,1,-1],[0,3,8,-1],[]];

// ── Core marching cubes ──
function marchingCubes(field, dims, isoLevel) {
  const [nx, ny, nz] = dims;
  const vertices = [];

  function getField(ix, iy, iz) {
    if (ix < 0 || ix >= nx || iy < 0 || iy >= ny || iz < 0 || iz >= nz) return 0;
    return field[ix + iy * nx + iz * nx * ny];
  }

  function interp(v1, v2, val1, val2) {
    if (Math.abs(val1 - isoLevel) < 0.00001) return v1.slice();
    if (Math.abs(val2 - isoLevel) < 0.00001) return v2.slice();
    if (Math.abs(val1 - val2) < 0.00001) return v1.slice();
    const mu = (isoLevel - val1) / (val2 - val1);
    return [v1[0]+mu*(v2[0]-v1[0]), v1[1]+mu*(v2[1]-v1[1]), v1[2]+mu*(v2[2]-v1[2])];
  }

  for (let iz = 0; iz < nz-1; iz++) {
    for (let iy = 0; iy < ny-1; iy++) {
      for (let ix = 0; ix < nx-1; ix++) {
        const vals = [
          getField(ix,iy,iz), getField(ix+1,iy,iz),
          getField(ix+1,iy+1,iz), getField(ix,iy+1,iz),
          getField(ix,iy,iz+1), getField(ix+1,iy,iz+1),
          getField(ix+1,iy+1,iz+1), getField(ix,iy+1,iz+1)
        ];

        let cubeIndex = 0;
        for (let c = 0; c < 8; c++) if (vals[c] < isoLevel) cubeIndex |= (1 << c);
        if (MC_EDGE_TABLE[cubeIndex] === 0) continue;

        const corners = [
          [ix,iy,iz],[ix+1,iy,iz],[ix+1,iy+1,iz],[ix,iy+1,iz],
          [ix,iy,iz+1],[ix+1,iy,iz+1],[ix+1,iy+1,iz+1],[ix,iy+1,iz+1]
        ];

        const edgePairs = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
        const edgeVerts = [];
        for (let e = 0; e < 12; e++) {
          if (MC_EDGE_TABLE[cubeIndex] & (1 << e)) {
            const [a, b] = edgePairs[e];
            edgeVerts[e] = interp(corners[a], corners[b], vals[a], vals[b]);
          }
        }

        const tris = MC_TRI_TABLE[cubeIndex];
        for (let t = 0; t < tris.length; t++) {
          if (tris[t] === -1) break;
          vertices.push(...edgeVerts[tris[t]]);
        }
      }
    }
  }
  return new Float32Array(vertices);
}

/**
 * Build a marching-cubes reef rock geometry from a block cluster.
 * Exact same pipeline as old terrain.js: binary fill → borrow → blur → noise → MC → displace → smooth.
 * Output is centered at origin, unit scale (caller applies world transform).
 *
 * @param {Array<{gx:number, gz:number, gy:number}>} blocks - Grid positions
 * @param {number} samplesPerTile - MC resolution (7 = original quality)
 * @returns {THREE.BufferGeometry|null}
 */
export function buildReefRockGeometry(blocks, samplesPerTile = 7) {
  if (blocks.length === 0) return null;

  const blockSet = new Set();
  for (const b of blocks) blockSet.add(b.gx+','+b.gz+','+b.gy);

  let minGX = Infinity, maxGX = -Infinity;
  let minGZ = Infinity, maxGZ = -Infinity;
  let minGY = Infinity, maxGY = -Infinity;
  for (const b of blocks) {
    if (b.gx < minGX) minGX = b.gx; if (b.gx > maxGX) maxGX = b.gx;
    if (b.gz < minGZ) minGZ = b.gz; if (b.gz > maxGZ) maxGZ = b.gz;
    if (b.gy < minGY) minGY = b.gy; if (b.gy > maxGY) maxGY = b.gy;
  }

  // Pad for blur + borrow overflow
  const pad = 2;
  minGX -= pad; maxGX += pad + 1;
  minGZ -= pad; maxGZ += pad + 1;
  minGY -= pad; maxGY += pad + 1;

  const rangeX = maxGX - minGX;
  const rangeY = maxGY - minGY;
  const rangeZ = maxGZ - minGZ;

  const nx = Math.ceil(rangeX * samplesPerTile) + 1;
  const ny = Math.ceil(rangeY * samplesPerTile) + 1;
  const nz = Math.ceil(rangeZ * samplesPerTile) + 1;
  const total = nx * ny * nz;

  const stepX = rangeX / (nx - 1);
  const stepY = rangeY / (ny - 1);
  const stepZ = rangeZ / (nz - 1);

  // ====== STEP 1: Binary fill + neighbor density borrowing ======
  const field = new Float32Array(total);

  for (const b of blocks) {
    const x0 = Math.max(0, Math.floor((b.gx - minGX) * samplesPerTile));
    const x1 = Math.min(nx-1, Math.ceil((b.gx + 1 - minGX) * samplesPerTile));
    const y0 = Math.max(0, Math.floor((b.gy - minGY) * samplesPerTile));
    const y1 = Math.min(ny-1, Math.ceil((b.gy + 1 - minGY) * samplesPerTile));
    const z0 = Math.max(0, Math.floor((b.gz - minGZ) * samplesPerTile));
    const z1 = Math.min(nz-1, Math.ceil((b.gz + 1 - minGZ) * samplesPerTile));

    for (let iz = y0; iz <= y1; iz++) {
      for (let iy = z0; iy <= z1; iy++) {
        for (let ix = x0; ix <= x1; ix++) {
          field[ix + iz * nx + iy * nx * ny] = 1.0;
        }
      }
    }

    // Borrow into empty neighbors
    for (const [ddx, ddy, ddz] of [[1,0,0],[-1,0,0],[0,0,1],[0,0,-1],[0,1,0],[0,-1,0]]) {
      const nk = (b.gx+ddx)+','+(b.gz+ddz)+','+(b.gy+ddy);
      if (blockSet.has(nk)) continue;

      const borrowFrac = 0.2 + hashNoise(b.gx*17+ddx*7, b.gz*13+ddz*5, b.gy*11+ddy*3) * 0.4;
      const nbx = b.gx + ddx, nbz = b.gz + ddz, nby = b.gy + ddy;
      const bx0 = Math.max(0, Math.floor((nbx - minGX) * samplesPerTile));
      const bx1 = Math.min(nx-1, Math.ceil((nbx + 1 - minGX) * samplesPerTile));
      const by0 = Math.max(0, Math.floor((nby - minGY) * samplesPerTile));
      const by1 = Math.min(ny-1, Math.ceil((nby + 1 - minGY) * samplesPerTile));
      const bz0 = Math.max(0, Math.floor((nbz - minGZ) * samplesPerTile));
      const bz1 = Math.min(nz-1, Math.ceil((nbz + 1 - minGZ) * samplesPerTile));

      for (let iy = by0; iy <= by1; iy++) {
        for (let iz = bz0; iz <= bz1; iz++) {
          for (let ix = bx0; ix <= bx1; ix++) {
            const wx = minGX + ix * stepX;
            const wy = minGY + iy * stepY;
            const wz = minGZ + iz * stepZ;
            const localX = wx - (nbx + 0.5);
            const localY = wy - (nby + 0.5);
            const localZ = wz - (nbz + 0.5);

            let t;
            if (ddx !== 0) t = (ddx > 0) ? (localX + 0.5) : (0.5 - localX);
            else if (ddz !== 0) t = (ddz > 0) ? (localZ + 0.5) : (0.5 - localZ);
            else t = (ddy > 0) ? (localY + 0.5) : (0.5 - localY);

            if (t >= 0 && t <= borrowFrac) {
              const falloff = 1.0 - (t / borrowFrac);
              const val = falloff * falloff * 0.9;
              const idx = ix + iy * nx + iz * nx * ny;
              field[idx] = Math.max(field[idx], val);
            }
          }
        }
      }
    }
  }

  // ====== STEP 2: 3D Gaussian blur (separable 3-pass) ======
  const blurRadius = 3;
  const kernel = [];
  const sigma = blurRadius * 0.5;
  let kernelSum = 0;
  for (let i = -blurRadius; i <= blurRadius; i++) {
    const w = Math.exp(-(i*i) / (2*sigma*sigma));
    kernel.push(w);
    kernelSum += w;
  }
  for (let i = 0; i < kernel.length; i++) kernel[i] /= kernelSum;

  const temp1 = new Float32Array(total);
  const temp2 = new Float32Array(total);

  // Blur X
  for (let iz = 0; iz < nz; iz++) {
    for (let iy = 0; iy < ny; iy++) {
      for (let ix = 0; ix < nx; ix++) {
        let sum = 0;
        for (let k = -blurRadius; k <= blurRadius; k++) {
          const jx = Math.min(Math.max(ix + k, 0), nx - 1);
          sum += field[jx + iy * nx + iz * nx * ny] * kernel[k + blurRadius];
        }
        temp1[ix + iy * nx + iz * nx * ny] = sum;
      }
    }
  }
  // Blur Y
  for (let iz = 0; iz < nz; iz++) {
    for (let iy = 0; iy < ny; iy++) {
      for (let ix = 0; ix < nx; ix++) {
        let sum = 0;
        for (let k = -blurRadius; k <= blurRadius; k++) {
          const jy = Math.min(Math.max(iy + k, 0), ny - 1);
          sum += temp1[ix + jy * nx + iz * nx * ny] * kernel[k + blurRadius];
        }
        temp2[ix + iy * nx + iz * nx * ny] = sum;
      }
    }
  }
  // Blur Z
  for (let iz = 0; iz < nz; iz++) {
    for (let iy = 0; iy < ny; iy++) {
      for (let ix = 0; ix < nx; ix++) {
        let sum = 0;
        for (let k = -blurRadius; k <= blurRadius; k++) {
          const jz = Math.min(Math.max(iz + k, 0), nz - 1);
          sum += temp2[ix + iy * nx + jz * nx * ny] * kernel[k + blurRadius];
        }
        field[ix + iy * nx + iz * nx * ny] = sum;
      }
    }
  }

  // ====== STEP 3: Noise perturbation for craggy detail ======
  for (let iz = 0; iz < nz; iz++) {
    for (let iy = 0; iy < ny; iy++) {
      for (let ix = 0; ix < nx; ix++) {
        const idx = ix + iy * nx + iz * nx * ny;
        const d = field[idx];
        if (d > 0.02 && d < 0.8) {
          const wx = minGX + ix * stepX;
          const wy = minGY + iy * stepY;
          const wz = minGZ + iz * stepZ;
          const noise = (hashNoise(wx*4.1+33, wy*3.3+33, wz*4.7+33) - 0.5) * 0.18;
          const fine = (hashNoise(wx*9.3+66, wy*7.7+66, wz*10.1+66) - 0.5) * 0.08;
          field[idx] += noise + fine;
        }
      }
    }
  }

  // ====== STEP 4: Marching cubes extraction ======
  const isoLevel = 0.25;
  const verts = marchingCubes(field, [nx, ny, nz], isoLevel);
  if (verts.length === 0) return null;

  // Convert grid coords to local coords centered at block cluster center
  const centerGX = (minGX + maxGX) * 0.5;
  const centerGY = (minGY + maxGY) * 0.5;
  const centerGZ = (minGZ + maxGZ) * 0.5;

  for (let i = 0; i < verts.length; i += 3) {
    let wx = minGX + verts[i] * stepX;
    let wy = minGY + verts[i+1] * stepY;
    let wz = minGZ + verts[i+2] * stepZ;

    // Light vertex displacement for surface detail
    const str = 0.04;
    wx += (hashNoise(wx*8.3, wy*7.1, wz*9.7) - 0.5) * str;
    wy += (hashNoise(wx*9.1+77, wy*8.3+77, wz*7.7+77) - 0.5) * str * 0.3;
    wz += (hashNoise(wx*7.7+155, wy*9.7+155, wz*8.1+155) - 0.5) * str;

    // Center at origin (caller positions via InstancedMesh)
    verts[i]   = wx - centerGX;
    verts[i+1] = wy - centerGY;
    verts[i+2] = wz - centerGZ;
  }

  // ====== STEP 5: Laplacian smoothing (3 passes) ======
  const smoothPasses = 3;
  const smoothFactor = 0.5;
  const vertCount = verts.length / 3;
  const triCount = vertCount / 3;

  // Weld vertices for adjacency
  const vertMap = new Int32Array(vertCount);
  const canonical = [];
  const gridWeld = new Map();

  for (let i = 0; i < vertCount; i++) {
    const x = verts[i*3], y = verts[i*3+1], z = verts[i*3+2];
    const key = Math.round(x*100)+'_'+Math.round(y*100)+'_'+Math.round(z*100);
    if (gridWeld.has(key)) {
      vertMap[i] = gridWeld.get(key);
    } else {
      const ci = canonical.length / 3;
      canonical.push(x, y, z);
      gridWeld.set(key, ci);
      vertMap[i] = ci;
    }
  }

  const uniqueCount = canonical.length / 3;
  const neighbors = new Array(uniqueCount);
  for (let i = 0; i < uniqueCount; i++) neighbors[i] = new Set();

  for (let t = 0; t < triCount; t++) {
    const a = vertMap[t*3], b = vertMap[t*3+1], c = vertMap[t*3+2];
    neighbors[a].add(b); neighbors[a].add(c);
    neighbors[b].add(a); neighbors[b].add(c);
    neighbors[c].add(a); neighbors[c].add(b);
  }

  const pos = new Float32Array(canonical);
  const tmp = new Float32Array(pos.length);

  for (let pass = 0; pass < smoothPasses; pass++) {
    tmp.set(pos);
    for (let i = 0; i < uniqueCount; i++) {
      const nbrs = neighbors[i];
      if (nbrs.size === 0) continue;
      let ax = 0, ay = 0, az = 0;
      for (const n of nbrs) {
        ax += pos[n*3]; ay += pos[n*3+1]; az += pos[n*3+2];
      }
      ax /= nbrs.size; ay /= nbrs.size; az /= nbrs.size;
      tmp[i*3]   = pos[i*3]   + (ax - pos[i*3])   * smoothFactor;
      tmp[i*3+1] = pos[i*3+1] + (ay - pos[i*3+1]) * smoothFactor;
      tmp[i*3+2] = pos[i*3+2] + (az - pos[i*3+2]) * smoothFactor;
    }
    pos.set(tmp);
  }

  // Write smoothed positions back
  for (let i = 0; i < vertCount; i++) {
    const ci = vertMap[i];
    verts[i*3]   = pos[ci*3];
    verts[i*3+1] = pos[ci*3+1];
    verts[i*3+2] = pos[ci*3+2];
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
  geo.computeVertexNormals();
  return geo;
}

/**
 * Generate procedural block clusters for reef bed rock variants.
 * Each cluster is a small arrangement of blocks that produces a
 * unique organic rock formation when run through buildReefRockGeometry.
 *
 * @param {number} seed - Base seed for deterministic generation
 * @param {number} count - Number of variants to generate
 * @returns {Array<THREE.BufferGeometry>}
 */
export function generateReefRockVariants(seed, count = 8) {
  const variants = [];

  // Pre-defined cluster patterns — organic arrangements of blocks
  // Each pattern produces a different rock shape
  const patterns = [
    // Pattern 0: Low wide mound (3x3 base, 1 block high center)
    [{gx:0,gz:0,gy:0},{gx:1,gz:0,gy:0},{gx:-1,gz:0,gy:0},{gx:0,gz:1,gy:0},{gx:0,gz:-1,gy:0},{gx:1,gz:1,gy:0},{gx:-1,gz:-1,gy:0},{gx:0,gz:0,gy:1}],
    // Pattern 1: Tall narrow spire
    [{gx:0,gz:0,gy:0},{gx:0,gz:0,gy:1},{gx:0,gz:0,gy:2},{gx:1,gz:0,gy:0},{gx:0,gz:1,gy:0}],
    // Pattern 2: L-shaped ridge
    [{gx:0,gz:0,gy:0},{gx:1,gz:0,gy:0},{gx:2,gz:0,gy:0},{gx:0,gz:1,gy:0},{gx:0,gz:2,gy:0},{gx:0,gz:0,gy:1},{gx:1,gz:0,gy:1}],
    // Pattern 3: Flat shelf (wide, single layer)
    [{gx:0,gz:0,gy:0},{gx:1,gz:0,gy:0},{gx:-1,gz:0,gy:0},{gx:0,gz:1,gy:0},{gx:0,gz:-1,gy:0},{gx:1,gz:1,gy:0},{gx:-1,gz:1,gy:0},{gx:1,gz:-1,gy:0},{gx:-1,gz:-1,gy:0}],
    // Pattern 4: Twin peaks
    [{gx:0,gz:0,gy:0},{gx:0,gz:0,gy:1},{gx:0,gz:0,gy:2},{gx:2,gz:0,gy:0},{gx:2,gz:0,gy:1},{gx:1,gz:0,gy:0}],
    // Pattern 5: Boulder cluster (compact, multi-height)
    [{gx:0,gz:0,gy:0},{gx:1,gz:0,gy:0},{gx:0,gz:1,gy:0},{gx:1,gz:1,gy:0},{gx:0,gz:0,gy:1},{gx:1,gz:0,gy:1},{gx:0,gz:1,gy:1},{gx:0,gz:0,gy:2}],
    // Pattern 6: Spine/ridge (linear, variable height)
    [{gx:0,gz:0,gy:0},{gx:1,gz:0,gy:0},{gx:2,gz:0,gy:0},{gx:3,gz:0,gy:0},{gx:1,gz:0,gy:1},{gx:2,gz:0,gy:1}],
    // Pattern 7: Scattered low rocks
    [{gx:0,gz:0,gy:0},{gx:2,gz:1,gy:0},{gx:-1,gz:2,gy:0},{gx:1,gz:-1,gy:0},{gx:0,gz:0,gy:1}],
  ];

  for (let i = 0; i < count; i++) {
    const patternIdx = i % patterns.length;
    // Offset block positions by seed-derived values to get unique noise patterns
    const offsetX = Math.floor(hashNoise(seed + i * 7.3, i * 13.7, 0) * 1000);
    const offsetZ = Math.floor(hashNoise(seed + i * 11.1, i * 17.3, 1) * 1000);
    const offsetY = Math.floor(hashNoise(seed + i * 5.9, i * 19.1, 2) * 1000);

    const blocks = patterns[patternIdx].map(b => ({
      gx: b.gx + offsetX,
      gz: b.gz + offsetZ,
      gy: b.gy + offsetY,
    }));

    const geo = buildReefRockGeometry(blocks, 7);
    if (geo) variants.push(geo);
  }

  return variants;
}

// ── Tier constants (exported for slab-scatter.js footprint/height calculations) ──
export const LARGE_WORLD_SCALE = 2.5;
export const MEDIUM_WORLD_SCALE = 2.0;
export const SMALL_WORLD_SCALE = 1.5;

export const LARGE_HEIGHT_BLOCKS = 3.5;
export const MEDIUM_HEIGHT_BLOCKS = 1.8;
export const SMALL_HEIGHT_BLOCKS = 0.8;

export const LARGE_FOOTPRINT = 6;   // world units radius
export const MEDIUM_FOOTPRINT = 4;
export const SMALL_FOOTPRINT = 2;

// ── Large core block patterns (12-22 blocks, 3-4 high) ──
const LARGE_PATTERNS = [
  // L0: Wide mesa — 4x4 base + raised center + peak
  (function() {
    const b = [];
    for (let x = 0; x < 4; x++) for (let z = 0; z < 4; z++) b.push({gx:x,gz:z,gy:0});
    // Raised center
    b.push({gx:1,gz:1,gy:1},{gx:2,gz:1,gy:1},{gx:1,gz:2,gy:1},{gx:2,gz:2,gy:1});
    // Peak
    b.push({gx:1,gz:2,gy:2});
    return b;
  })(),

  // L1: Spine ridge — 6 long, staggered heights
  [
    {gx:0,gz:0,gy:0},{gx:1,gz:0,gy:0},{gx:2,gz:0,gy:0},{gx:3,gz:0,gy:0},{gx:4,gz:0,gy:0},{gx:5,gz:0,gy:0},
    {gx:0,gz:1,gy:0},{gx:1,gz:1,gy:0},{gx:2,gz:1,gy:0},{gx:3,gz:1,gy:0},{gx:4,gz:1,gy:0},{gx:5,gz:1,gy:0},
    {gx:1,gz:0,gy:1},{gx:2,gz:0,gy:1},{gx:3,gz:0,gy:1},{gx:4,gz:0,gy:1},
    {gx:2,gz:0,gy:2},{gx:3,gz:0,gy:2},
  ],

  // L2: Double peak — two pillars bridged by shelf
  [
    {gx:0,gz:0,gy:0},{gx:0,gz:1,gy:0},{gx:1,gz:0,gy:0},{gx:1,gz:1,gy:0},
    {gx:0,gz:0,gy:1},{gx:0,gz:1,gy:1},{gx:0,gz:0,gy:2},
    {gx:3,gz:0,gy:0},{gx:3,gz:1,gy:0},{gx:4,gz:0,gy:0},{gx:4,gz:1,gy:0},
    {gx:3,gz:0,gy:1},{gx:3,gz:1,gy:1},{gx:4,gz:0,gy:2},
    {gx:2,gz:0,gy:0},{gx:2,gz:1,gy:0},
  ],

  // L3: Massive mound — 3x3x2 core + flanking
  [
    // 3x3 base
    {gx:0,gz:0,gy:0},{gx:1,gz:0,gy:0},{gx:2,gz:0,gy:0},
    {gx:0,gz:1,gy:0},{gx:1,gz:1,gy:0},{gx:2,gz:1,gy:0},
    {gx:0,gz:2,gy:0},{gx:1,gz:2,gy:0},{gx:2,gz:2,gy:0},
    // 3x3 second layer
    {gx:0,gz:0,gy:1},{gx:1,gz:0,gy:1},{gx:2,gz:0,gy:1},
    {gx:0,gz:1,gy:1},{gx:1,gz:1,gy:1},{gx:2,gz:1,gy:1},
    {gx:0,gz:2,gy:1},{gx:1,gz:2,gy:1},{gx:2,gz:2,gy:1},
    // Top cap
    {gx:1,gz:1,gy:2},{gx:0,gz:1,gy:2},{gx:1,gz:0,gy:2},{gx:1,gz:2,gy:2},
    // Flanking
    {gx:-1,gz:1,gy:0},{gx:3,gz:1,gy:0},{gx:1,gz:-1,gy:0},{gx:1,gz:3,gy:0},
  ],
];

// ── Small rubble block patterns (1-3 blocks, 1 high) ──
const SMALL_PATTERNS = [
  // S0: Single block
  [{gx:0,gz:0,gy:0}],
  // S1: Twin flat
  [{gx:0,gz:0,gy:0},{gx:1,gz:0,gy:0}],
  // S2: L-corner
  [{gx:0,gz:0,gy:0},{gx:1,gz:0,gy:0},{gx:0,gz:1,gy:0}],
  // S3: Triplet line
  [{gx:0,gz:0,gy:0},{gx:1,gz:0,gy:0},{gx:2,gz:0,gy:0}],
];

/**
 * Generate tiered reef rock variants: Large, Medium, Small.
 * Each tier uses different block patterns at different MC resolutions.
 * All deterministic from seed.
 *
 * @param {number} seed - ISLAND_SEED
 * @returns {{ large: THREE.BufferGeometry[], medium: THREE.BufferGeometry[], small: THREE.BufferGeometry[] }}
 */
export function generateTieredReefRockVariants(seed) {
  const result = { large: [], medium: [], small: [] };

  // ── Large cores (4 variants) ──
  for (let i = 0; i < LARGE_PATTERNS.length; i++) {
    const offsetX = Math.floor(hashNoise(seed + i * 7.3 + 100, i * 13.7, 0) * 1000);
    const offsetZ = Math.floor(hashNoise(seed + i * 11.1 + 100, i * 17.3, 1) * 1000);
    const offsetY = Math.floor(hashNoise(seed + i * 5.9 + 100, i * 19.1, 2) * 1000);

    const blocks = LARGE_PATTERNS[i].map(b => ({
      gx: b.gx + offsetX, gz: b.gz + offsetZ, gy: b.gy + offsetY,
    }));

    const geo = buildReefRockGeometry(blocks, 5);  // perf: was 7 — large rocks keep moderate detail
    if (geo) result.large.push(geo);
  }

  // ── Medium outcrops (5 variants) — reuse existing patterns 0-4 ──
  const mediumPatterns = [
    [{gx:0,gz:0,gy:0},{gx:1,gz:0,gy:0},{gx:-1,gz:0,gy:0},{gx:0,gz:1,gy:0},{gx:0,gz:-1,gy:0},{gx:1,gz:1,gy:0},{gx:-1,gz:-1,gy:0},{gx:0,gz:0,gy:1}],
    [{gx:0,gz:0,gy:0},{gx:0,gz:0,gy:1},{gx:0,gz:0,gy:2},{gx:1,gz:0,gy:0},{gx:0,gz:1,gy:0}],
    [{gx:0,gz:0,gy:0},{gx:1,gz:0,gy:0},{gx:2,gz:0,gy:0},{gx:0,gz:1,gy:0},{gx:0,gz:2,gy:0},{gx:0,gz:0,gy:1},{gx:1,gz:0,gy:1}],
    [{gx:0,gz:0,gy:0},{gx:1,gz:0,gy:0},{gx:-1,gz:0,gy:0},{gx:0,gz:1,gy:0},{gx:0,gz:-1,gy:0},{gx:1,gz:1,gy:0},{gx:-1,gz:1,gy:0},{gx:1,gz:-1,gy:0},{gx:-1,gz:-1,gy:0}],
    [{gx:0,gz:0,gy:0},{gx:0,gz:0,gy:1},{gx:0,gz:0,gy:2},{gx:2,gz:0,gy:0},{gx:2,gz:0,gy:1},{gx:1,gz:0,gy:0}],
  ];

  for (let i = 0; i < mediumPatterns.length; i++) {
    const offsetX = Math.floor(hashNoise(seed + i * 7.3 + 200, i * 13.7, 0) * 1000);
    const offsetZ = Math.floor(hashNoise(seed + i * 11.1 + 200, i * 17.3, 1) * 1000);
    const offsetY = Math.floor(hashNoise(seed + i * 5.9 + 200, i * 19.1, 2) * 1000);

    const blocks = mediumPatterns[i].map(b => ({
      gx: b.gx + offsetX, gz: b.gz + offsetZ, gy: b.gy + offsetY,
    }));

    const geo = buildReefRockGeometry(blocks, 4);  // perf: was 7 — medium outcrops
    if (geo) result.medium.push(geo);
  }

  // ── Small rubble (4 variants) ──
  for (let i = 0; i < SMALL_PATTERNS.length; i++) {
    const offsetX = Math.floor(hashNoise(seed + i * 7.3 + 300, i * 13.7, 0) * 1000);
    const offsetZ = Math.floor(hashNoise(seed + i * 11.1 + 300, i * 17.3, 1) * 1000);
    const offsetY = Math.floor(hashNoise(seed + i * 5.9 + 300, i * 19.1, 2) * 1000);

    const blocks = SMALL_PATTERNS[i].map(b => ({
      gx: b.gx + offsetX, gz: b.gz + offsetZ, gy: b.gy + offsetY,
    }));

    const geo = buildReefRockGeometry(blocks, 3);  // perf: was 7 — small rubble (most numerous); coarse is fine
    if (geo) result.small.push(geo);
  }

  return result;
}
