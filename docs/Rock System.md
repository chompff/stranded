# Rock System — Procedural Island Rocks

**Layer:** 2 (Island Features)
**Status:** In progress
**File:** `src/rocks.js` (to be created)

---

## Design Goals

- Populate the entire island and coastline with natural-looking rocks
- Zero external assets — fully procedural geometry from Three.js primitives
- Seed-driven: same ISLAND_SEED = identical rock layout every time
- Performance-first: InstancedMesh, LOD tiers, stay within mobile budget

## Performance Budget

| Metric | Target |
|--------|--------|
| Draw calls | 2 (1 per LOD tier) |
| Triangles | < 25K total |
| Memory | < 20KB |
| Load time | < 5ms (geometry generation) |

## Architecture

```
rocks.js
  ├── generateRockVariants(seed)     → 5-8 base geometries with noise displacement
  ├── computeRockPlacements(seed)    → position/rotation/scale/variant for every rock
  ├── createRockInstances(scene)     → InstancedMesh per LOD tier
  └── updateRockLOD(cameraPos)       → per-frame: re-bucket instances by distance
```

## LOD Tiers

| Tier | Camera Distance | Base Geometry | Faces/rock |
|------|----------------|---------------|------------|
| Near | 0–80 | IcosahedronGeometry(1, 2) + noise | ~80 |
| Mid | 80–300 | IcosahedronGeometry(1, 1) + noise | ~20 |
| Far | 300+ | Culled (hidden by depth fog) | 0 |

## Shape Generation

- Start from IcosahedronGeometry (chosen for even vertex distribution)
- Displace each vertex with seed-driven noise for organic shapes
- Pre-generate 5-8 shape variants (different noise seeds)
- Assign variants randomly per placement

## Placement Zones (future — zone-aware scattering)

| Zone | Rock Style | Size Range | Density |
|------|-----------|------------|---------|
| Home Beach | Small, jagged, partially buried | 0.3–1.0 | Low (subtle) |
| Coastline | Mixed sizes, tide-worn | 0.5–2.0 | Medium |
| Reef/Underwater | Rounded boulders, clustered | 1.0–3.0 | Medium-high |
| Cliff faces | Angular, stacked | 1.5–4.0 | High |
| Inland/jungle | Mossy, scattered | 0.5–2.0 | Low |

## Step-by-Step Build Plan

Each step gets creative sign-off before proceeding:

1. **Single rock shape** — one procedural rock on screen, tune jaggedness
2. **Shape variants** — 5-8 variants displayed side by side, pick favorites
3. **Material & color** — stone color, roughness, tint variation per instance
4. **Beach placement** — scatter on home beach, tune density/size/burial depth
5. **InstancedMesh + LOD** — convert to instanced rendering, add distance tiers
6. **Full island scattering** — extend placement rules to all zones
7. **Underwater rocks** — reef boulders and submerged stones
8. **Polish** — shadow receiving, ambient occlusion tint, final tuning

## References

- See `docs/Rock Randomization Reference.md` for seeded noise techniques from reef-generator v1
- Mulberry32 PRNG already in `sky-water.js` (`_sbMulberry32`)
- ISLAND_SEED from `state.js`
