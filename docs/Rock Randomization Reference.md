# Rock Randomization Reference

**Captured from**: reef-generator.js (v1, removed to do layered approach)
**Purpose**: Document the rock/terrain sculpting technique that produced good visual results, for reuse in future layered procedural generation.

---

## What Worked Well

The seeded noise-driven rock placement created natural-looking underwater terrain. Key techniques:

### Seeded PRNG (Mulberry32)
```javascript
function mulberry32(seed) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
```
- Deterministic: same seed = identical output every time
- Fast: single function call per random number

### Pre-built Noise Table
```javascript
let _noiseTable = [];
function buildNoiseTable(rng, size) {
  _noiseTable = new Array(size);
  for (let i = 0; i < size; i++) _noiseTable[i] = rng();
}

function seededNoise(x, z) {
  return _noiseTable[((x * 7919 + z * 104729) & 0x7FFFFFFF) % _noiseTable.length];
}
```
- Pre-compute 4096 random values
- Hash grid coordinates into table index using large primes (7919, 104729)
- Different primes for different noise "channels" (e.g., `gx * 31, gz * 47` vs `gx * 67, gz * 23`)

### Zone-Based Height Assignment
The island has distance-based zones from the island edge:
- **Close (dist 2-3)**: Tall formations, ~20% gaps, rock ridges
- **Mid (dist 4-8)**: Mix of bumps and flats, noise-driven mound clusters
- **Far (dist 9-14)**: Sparse, low formations, mostly bare floor

Each zone uses noise thresholds to decide rock vs sand:
```javascript
// Example: Patch Reefs zone
const patchNoise = seededNoise(gx * 113, gz * 89);
if (patchNoise > 0.35) {
  // Rock mound — taller
  targetH = 2 + Math.floor(tileNoise * 2.5); // h=2-4
  mat = 'rock';
} else {
  // Sand between mounds — lower
  targetH = 1 + Math.floor(tileNoise2 * 1.5); // h=1-2
  mat = 'sand';
}
```

### Per-Tile Variation via Multiple Noise Channels
Each tile samples noise with different prime multipliers to get independent random values:
```javascript
const tileNoise  = seededNoise(gx * 31, gz * 47);  // primary decision
const tileNoise2 = seededNoise(gx * 67, gz * 23);  // height variation
const zNoise1    = seededNoise(0, gz);              // z-dependent width variation
```
This prevents visible patterns/grids since each decision uses different noise.

### Height Protection
Never overwrites existing taller terrain (protects user builds and island):
```javascript
if (curH >= targetH) continue;
```

### Snapshot & Restore
Before modifying any tile, snapshot the original heightmap entry:
```javascript
if (!reefPrevHeights.has(key)) {
  const existing = heightmap.get(key);
  reefPrevHeights.set(key, existing ? { ...existing } : null);
}
```
This allows clean undo/clear by restoring all snapshots and calling `rebuildFormation()`.

---

## Performance Issues to Avoid in Future

1. **~897 individual coral mesh clones = ~897 draw calls** — Use InstancedMesh instead
2. **Raycast per-coral at startup** against all terrain children — expensive O(n*m)
3. **Double sway animation** — reef-generator tick + ecosystem tick both running
4. **`CORAL_TYPES.find()` in hot loop** — use a Map for O(1) lookup
5. **`traverse()` in hot loop** — cache references at creation time
6. **Single `rebuildFormation()` call** for hundreds of heightmap changes is fine (it batches), but the marching cubes rebuild is inherently expensive — plan for it

---

## Layered Approach (Next Iteration)

Instead of generating everything at once, build layers independently:
1. **Ocean floor** — randomize base terrain heights
2. **Sand** — add sand deposits on top of floor
3. **Rocks** — place rock formations (using the technique above)
4. **Coral** — place on rocks using InstancedMesh for performance
5. **Wildlife** — future layer

Each layer should be tunable and visually verifiable before adding the next.
