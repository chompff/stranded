# Coral Reef Scatter System — Implementation Prompt

## Context

The stone slab reef structure is complete. The seabed has a tiered slab system (large/medium/small scattered slabs + composite base clusters) placed via `slab-scatter.js` using a reef mask and depth zones. A `REEF_FOOTPRINT` map tracks every slab's position (`ON_ROCK` / `NEAR_ROCK` cells with `topY` data), but it's currently private to `slab-scatter.js` and not exported.

Seven optimized coral GLB models exist in `assets/models/coral/optimized/`:
`tube-coral`, `cauliflower`, `staghorn`, `cup-coral`, `brain-coral`, `colony-cluster`, `branching-bush`

A coral catalog exists in `src/reef.js` with species metadata (scale ranges, icons) and a `preloadCorals()` function using GLTFLoader. This function is **never called** — it needs to be hooked up.

`src/ecosystem.js` has manual coral placement logic (dev toolbar), but it creates individual scene objects per coral — **not viable for dense placement** (hundreds of draw calls).

## Goal

Build a **dense, biologically accurate, packed reef wall** using InstancedMesh for performance. The reef should feel alive, colorful, and look like a healthy tropical coral ecosystem. Coral only — no seaweed/kelp in this pass.

## Architecture

### New file: `src/coral-scatter.js`

Dedicated scatter system following the same pattern as `slab-scatter.js`:
- Runs at init time, zero per-frame CPU cost for placement
- One `InstancedMesh` per coral species (7 draw calls total for ALL coral)
- Shader-based current sway animation via `onBeforeCompile` (GPU-driven, free)

### Required exports from `slab-scatter.js`

The coral scatter needs to read the slab footprint to know where to place coral:
- `REEF_FOOTPRINT` — the Map of `"cellX,cellZ" → { type: 'ON_ROCK'|'NEAR_ROCK', topY }`
- `getReefMask(wx, wz)` — reef density at a world position (0-1)
- `FOOTPRINT_CELL` — grid cell size (currently 2 world units)

These are currently private. Export them.

### GLB → InstancedMesh Pipeline

1. Load each coral GLB via GLTFLoader (reuse `preloadCorals()` from reef.js or inline)
2. Traverse the loaded scene to extract geometry + material from each mesh child
3. Create InstancedMesh per coral type (pre-allocate max instance count)
4. Set per-instance transforms (position, rotation, scale) and color tints

If a coral model has multiple child meshes, merge them into one geometry or create one InstancedMesh per child. The models are optimized so they should be 1-2 meshes each.

## Placement Rules

### Biological Depth Zonation

Real tropical reefs have species stratification by depth. The game's seabed zones:
- Zone A: h=+10 (1m deep) — too shallow, no coral
- Zone B: h=+5 (6m deep) — shallow reef
- Zone C: h=-8 (19m deep) — main reef
- Zone D: h=-18 (29m deep) — deep reef
- Zone E: h=-30 (41m deep) — too deep/dark

| Depth | h range | Species | Rationale |
|-------|---------|---------|-----------|
| Shallow (B) | +5 to -3 | `staghorn`, `branching-bush` | Fast-growing, need maximum sunlight |
| Mid (B-C) | -3 to -12 | `cauliflower`, `tube-coral`, `brain-coral` | Moderate light tolerance |
| Deep (C-D) | -12 to -22 | `cup-coral`, `colony-cluster` | Shade-tolerant, encrusting forms |

### Density Targets (Packed Reef Wall)

- **ON_ROCK cells**: 60-80% coverage. Coral grows directly on slab surfaces. Use `topY` from footprint to place coral at the correct height on top of slabs.
- **NEAR_ROCK cells**: 30-50% coverage. Coral on seabed in the transition zone around slabs.
- **Open reef mask areas** (no footprint but mask > 0): 10-20% sparse coral on bare seabed between slab clusters.

### Per-Species Placement

From `reef.js` CORAL_TYPES, each species has a scale range (min/max). Use these for size variation. Additional rules:
- `brain-coral`: Always upright, no tilt, slow-growing look — place fewer but larger
- `staghorn`: Can lean slightly, fragile branching — place in clusters of 3-5
- `branching-bush`: Similar to staghorn, slightly denser
- `cauliflower`: Compact mounds, moderate tilt OK
- `tube-coral`: Tall and thin, slight lean, place near slab edges
- `cup-coral`: Small, place in crevices (ON_ROCK preferred)
- `colony-cluster`: Encrusting, flatten against surface, large footprint

### Transform Variation

Per instance:
- **Rotation Y**: Full 360 random
- **Tilt** (rotation X/Z): ±5-15 degrees (species-dependent, brain-coral: 0)
- **Scale**: Within species min/max from reef.js, uniform XYZ
- **Color tint**: Slight per-instance hue/saturation shift for natural variety + depth attenuation

## Animation: Shader Current Sway

Inject via `material.onBeforeCompile`:
- Vertex displacement: `sin(worldPos.x * freq + time * speed) * amplitude`
- Different phase per instance (use world position as seed)
- Amplitude by species:
  - `staghorn`, `branching-bush`: 0.15 (most sway — flexible branches)
  - `tube-coral`: 0.10 (moderate — tall and thin)
  - `cauliflower`, `cup-coral`, `colony-cluster`: 0.05 (minimal — compact forms)
  - `brain-coral`: 0.01 (nearly static — massive and rigid)
- Sway increases with vertex height (base stays planted, tips move most)

## Performance Budget

| Metric | Target |
|--------|--------|
| Draw calls | 7-14 (one InstancedMesh per coral mesh, 7 species) |
| Total instances | 800-1500 |
| Triangle count | ~200-500K (depends on model complexity) |
| Per-frame CPU | Near zero (shader animation only) |
| Init time | < 2 seconds (including GLB loads) |

## Integration

### main.js

```javascript
import { initCoralScatter } from './coral-scatter.js';

// In init sequence, AFTER initSlabScatter() completes:
await initCoralScatter();
```

Coral scatter must run AFTER slab scatter because it reads REEF_FOOTPRINT which is populated during slab placement.

### Cleanup

The existing `ecosystem.js` coral placement (manual dev tool) can coexist — it's for individual placement in dev mode. The scatter system handles the automatic dense reef population.

`reef.js` `preloadCorals()` may be called by coral-scatter.js directly, or its loading logic can be inlined. Either way, the GLB loading happens once and models are cached.

## Key Files

| File | Role |
|------|------|
| `src/coral-scatter.js` | **NEW** — main coral scatter system |
| `src/slab-scatter.js` | Export REEF_FOOTPRINT, getReefMask, FOOTPRINT_CELL |
| `src/reef.js` | Coral species catalog, GLB loader/cache |
| `src/ecosystem.js` | Manual coral placement (dev tool, keep as-is) |
| `src/sky-water.js` | `sampleSeabedHeight()` for depth queries |
| `src/main.js` | Hook up `initCoralScatter()` after slab scatter |
| `assets/models/coral/optimized/*.glb` | 7 coral models |

## Testing

- Verify all 7 species appear at correct depths
- Check no coral floats above slabs or clips through them
- Confirm sway animation looks natural (branching moves, brain stays still)
- Performance: maintain 60fps on mid-range hardware with full reef
- Try multiple seeds to ensure variety across different island layouts
