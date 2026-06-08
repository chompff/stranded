# Bora Bora - Technical Approach
**Version:** 2.0
**Date:** February 14, 2026
**Status:** Architecture Decision Record

---

## 1. Decision: Full 3D Three.js (Optimized for Mobile)

### What we chose
Keep Three.js as a full 3D renderer — the same stack that powers the current prototype. The atmosphere, water, terrain, lighting, and ecosystem all stay 3D. Characters, pets, and gameplay objects are 3D models (GLB). We achieve mobile performance through targeted optimizations, not by stripping the visual identity.

### Why
- **Visual quality is the product.** The prototype already looks and feels exceptional — warm lighting, caustics, procedural clouds, a full day/night cycle with real shadows. Downgrading to 2D sprites behind a 3D sky killed the magic. The feel is non-negotiable.
- **Existing work is production-grade.** The DNC engine, sky renderer, water system, cloud dome, star field, caustics, and ecosystem pipeline are already built and proven. Rebuilding any of this in a simpler stack means months of work to get back to where we are today.
- **3D can run on mobile.** The prototype already follows strong performance discipline — shared materials, zero per-frame allocations, GPU-driven effects, capped pixel ratio. The path to mobile is optimization, not replacement.
- **3D models are accessible.** GLB models can be sourced from asset stores, AI-generated, or hand-modeled. The ecosystem pipeline already handles loading, caching, and animation.

### What we rejected
- **Hybrid 2.5D (3D sky + 2D sprites):** Killed the visual quality. Sprites looked flat against the rich 3D atmosphere. The contrast was jarring, not charming. The prototype's beauty comes from everything living in the same 3D space.
- **PixiJS / Phaser (pure 2D):** Starts from zero. Loses everything that makes Bora Bora visually distinctive.
- **Unity / Unreal:** Can't run in a browser without massive WASM builds. Breaks the "open a URL and play" accessibility.

---

## 2. Mobile Optimization Strategy

The prototype runs well on desktop. The path to mobile is a targeted set of optimizations, not a rewrite.

### Tier 1: Immediate (WP1)
| Optimization | Impact | Effort |
|-------------|--------|--------|
| Shadow map 4096 -> 1024 on mobile (detect via `navigator.maxTouchPoints`) | ~50 MB VRAM savings | Low |
| DPR cap at 1.5 on mobile (currently 2.0) | 44% fewer pixels | Low |
| LOD system: swap GLB models for simplified versions at distance | Fewer triangles | Medium |
| Frustum culling: skip rendering off-screen flora/fauna | Fewer draw calls | Medium |
| Reduce water plane resolution on mobile (fewer vertices) | Less CPU wave calc | Low |

### Tier 2: As Needed
| Optimization | Impact | Effort |
|-------------|--------|--------|
| GPU instancing for repeated flora (same mesh, many placements) | Batch draw calls | Medium |
| Texture atlas for similar models (share one texture across species) | Fewer texture swaps | Medium |
| Simplified caustics shader on mobile (fewer Voronoi iterations) | Less GPU cost | Low |
| Disable shooting stars and bubbles on mobile | Less particle overhead | Low |
| Throttle ecosystem tick to every 2nd frame on mobile | Less CPU per frame | Low |

### Tier 3: If Performance Still Needs Work
| Optimization | Impact | Effort |
|-------------|--------|--------|
| Bake terrain lighting (pre-compute, no real-time shadows) | Eliminate shadow pass | High |
| Offscreen canvas for cloud dome (render at half res) | Less fill rate | Medium |
| Web Worker for offline progression calculation | Unblock main thread | Medium |

### Detection
```javascript
// Device class detection (used for sun arc selection, viewport calibration, orientation lock)
function detectDeviceClass() {
  const w = window.innerWidth, h = window.innerHeight;
  const short = Math.min(w, h);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice && short <= 500) return 'mobile';
  if (isTouchDevice) return 'tablet';
  return 'desktop';
}

// Low-end detection for quality presets
const isLowEnd = isMobile && (navigator.hardwareConcurrency || 4) <= 4;
```
Quality presets (`high`, `medium`, `low`) applied at startup. Player can override in settings.

### Orientation Lock
Mobile devices are locked to **portrait** orientation via `screen.orientation.lock('portrait')`. The diorama composition, sun arc, and UI are designed for portrait framing on mobile. Tablets and desktops use landscape. This is enforced at startup in `main.js`.

---

## 3. Platform Strategy

### Primary: Browser (Cross-Platform)
- Runs in any modern browser (Chrome, Safari, Firefox, Edge)
- Desktop: mouse/keyboard input
- Mobile: touch input
- Same codebase, responsive layout
- No app store submission, no install friction

### Future: PWA (Progressive Web App)
- "Add to home screen" on mobile for app-like experience
- Service worker for offline capability (load cached assets)
- Push notifications for real-time events ("Your crops are ready!")
- Still a web app — no native code needed

### Future: Capacitor/TWA Wrapper
- If we want App Store / Play Store presence
- Wraps the web app in a native shell
- Gives access to native notifications, in-app purchases
- Same codebase, just wrapped

---

## 4. Project Structure

```
bora-bora/
  index.html              -- Shell HTML, canvas, UI containers
  vite.config.js          -- Vite dev server config
  package.json            -- Dependencies (three.js, vite)
  assets/
    models/               -- GLB models (flora, fauna, structures, characters)
    audio/                -- Sound effects, music (future)
    fonts/                -- Custom typefaces
    textures/             -- Shared textures, atlases
  src/
    main.js               -- Entry point, game loop, scene setup, camera logic, orientation lock
    state.js              -- Global game state, renderer, camera, constants
    sky-water.js           -- Sky gradient, DNC, water, caustics, lighting, celestial bodies, sun arc configs
    terrain.js            -- Island terrain mesh, material system, caustics injection
    ecosystem.js          -- GLB model loading, flora/fauna placement, animation (species config inlined)
    camera.js             -- Pan limits, rotation helpers (camera logic lives in main.js)
    mode.js               -- Dev/Play mode detection (?dev=1 URL param, sessionStorage)
    ui.js                 -- Build toolbar, weather controls, HUD
    systems/
      weather.js          -- Markov chain weather state machine, transitions, offline catch-up
    game/
      world.js            -- Zone definitions, hotspots, fog-of-war
      player.js           -- Player character (3D model), movement, state
      pet.js              -- Pet (3D model), AI, follow behavior, needs
      needs.js            -- Hunger, thirst, warmth, rest system
      inventory.js        -- Item storage, backpack UI
      crafting.js         -- Recipe system, build timers
      resources.js        -- Resource definitions, gathering logic
      time.js             -- Real-time clock, offline progression calc
      narrative.js        -- Diary entries, bottles, story beats
    ui/
      hud.js              -- Needs bars, inventory shortcut, clock
      menu.js             -- Crafting menu, inventory screen
      dialogue.js         -- Narrative text display, diary
      tutorial.js         -- First-session guided flow
    utils/
      save.js             -- LocalStorage / IndexedDB persistence
      notify.js           -- Notification system (future PWA)
      math.js             -- Shared math utilities
      perf.js             -- Device detection, quality presets, LOD management
```

---

## 5. Rendering Architecture

### What We Keep from the Prototype (Everything)

| System | Source | Status |
|--------|--------|--------|
| **DNC engine** | sky-water.js | Production-ready. 4-phase cycle (dawn/noon/dusk/night), 11-stop sky gradients, smooth transitions. |
| **Sky renderer** | sky-water.js | Production-ready. Procedural gradient background, cloud dome (FBM + domain warping), mist layer. |
| **Celestial bodies** | sky-water.js | Production-ready. Procedural sun (zenith + horizon textures), moon with craters, 2580-star GPU point cloud with twinkle, shooting stars. |
| **Water surface** | sky-water.js | Production-ready. Dual-sine wave plane, sun/moon specular reflections, clipping system. |
| **Lighting rig** | sky-water.js | Production-ready. 7 lights (sun directional + shadow, hemisphere, ambient, backfill, underlight, 2x underwater point). All DNC-driven. |
| **Terrain system** | terrain.js | Needs adaptation. Heightmap + marching cubes works for builder, but island shape will be pre-authored for the game. Caustics injection stays. |
| **Ecosystem pipeline** | ecosystem.js | Production-ready. GLB loading with caching, per-species animation, sway/orbit/drift patterns. Species config inlined. |
| **Camera system** | camera.js + main.js | Adapted. Fixed "Living Diorama" perspective in Play mode (no rotation, strafe + zoom only). Dev mode retains orbit, builder, and overhead camera stages. Camera logic lives primarily in main.js; camera.js provides pan limits and rotation helpers. |
| **Cloud/weather states** | main.js + systems/weather.js | Production-ready. Markov chain weather rotation (clear/cloudy/mist/rain) with smooth crossfade transitions. Time-of-day biased probabilities. |

### What We Adapt

| System | Change |
|--------|--------|
| **Terrain** | Pre-authored island mesh replaces free-form heightmap painting at runtime. The existing heightmap builder (marching cubes, brush tools, material painting) stays as a **dev tool / island designer** for authoring island shapes. Designed islands are baked into static meshes for the game. Caustics shader injection stays. |
| **Camera** | Fixed "Living Diorama" perspective — one carefully chosen angle, no player rotation or orbit. The sun arcs left-to-right across the sky, the moon follows at night, both visible from this single viewpoint. Zoom (scroll/pinch) and pan (drag/swipe) only. Orbit camera retained in dev/island-designer mode. The sun arc is calibrated independently per device class (mobile/tablet/desktop) to fit within each viewport. |
| **DNC timing** | Real-time 24h clock mapping. `new Date()` drives phase selection — fixed tropical hours (06:00 dawn, 08:00-19:00 day, 19:00 dusk, 21:00-06:00 night). Internally mapped to a 0-600 timeline with equal-duration phases for smooth palette interpolation. Debug slider stays for dev use. |
| **Build system** | Repurposed from terrain painting to structure placement. Player taps a zone, selects a structure, places it on the terrain surface. No voxel editing at runtime. |
| **Interaction model** | Mouse/tap raycasting against zone hotspots instead of terrain grid. Single raycast on click (not per-frame). |

### Layer Stack (back to front)

```
Layer 0: Sky gradient (full-screen quad, shader-driven, DNC)
Layer 1: Stars + Moon + Sun (point sprites / billboards)
Layer 2: Cloud dome (procedural FBM texture, DNC-tinted vertex colors)
Layer 3: Ocean surface (wave shader, specular reflections, clipping)
Layer 4: Island terrain (pre-authored mesh, rock + sand materials, caustics)
Layer 5: Flora (GLB models, wind sway animation)
Layer 6: Structures (GLB models, construction stages)
Layer 7: Player + Pet (GLB models, animated)
Layer 8: Fauna (GLB models, movement patterns)
Layer 9: Particles (campfire sparks, rain, leaves, crumble)
Layer 10: UI overlay (HTML/CSS, not Three.js)
```

### Materials Strategy
- **Terrain:** `MeshStandardMaterial` (rock + sand), shared instances, caustics via `onBeforeCompile` shader injection
- **Flora/Fauna:** `MeshStandardMaterial` from GLB imports, shared per species via cached scene cloning
- **Water:** Custom `ShaderMaterial` (procedural waves, foam, reflections)
- **Sky/Clouds:** `MeshBasicMaterial` (no lighting needed for sky elements)
- **Particles:** `MeshStandardMaterial` or `PointsMaterial`, pooled
- **Stars:** Custom `ShaderMaterial` (GPU twinkle, point rendering)
- **No MeshPhysicalMaterial anywhere.** `MeshStandardMaterial` is the ceiling.

---

## 6. Procedural Island Generation

Every island is procedurally generated through a layered pipeline. Each layer builds on top of the previous ones, from raw terrain shape up to atmospheric effects. The layers are executed in order during world creation.

### Layer Stack

| Layer | Name | Description | Status |
|-------|------|-------------|--------|
| **0** | **Bathymetry & Seabed** | Ocean floor depth, sand ripples, underwater terrain contour | Done |
| **1** | **Island Shape** | Heightmap silhouette, elevation profile, coastline outline | Done |
| **2** | **Island Features** | Freshwater pool, river, cliff face, cave entrance, rock formations | Planned |
| **3** | **Reef & Underwater** | Coral clusters, kelp beds, starfish, shells, underwater rocks | Planned |
| **4** | **Flora** | Palm trees, jungle canopy, undergrowth, bushes, grass patches | Partial (palms placed) |
| **5** | **Props & Resources** | Driftwood, coconuts, harvestable stone, ore deposits, small rocks | Planned |
| **6** | **Fauna** | Fish schools, crabs, birds, monkeys, goats (species from ecosystem.js) | Planned |
| **7** | **Atmosphere & Weather** | Cloud cover, rain, fog, wind, Markov weather state machine | Done |

### Layer 0 — Bathymetry & Seabed
The ocean floor is generated as a sloped terrain descending from the island's coastline. Sand ripples are applied as a procedural displacement pattern on the seabed mesh. Caustic light projections are injected via shader (`onBeforeCompile`) onto both seabed and island sand surfaces.

### Layer 1 — Island Shape (Elevation Profile)
The island heightmap is built from a flat baseline (height 6) with discrete elevation features placed along the island's length axis (gz). The current profile uses two asymmetric hills on a 70% flat baseline:

- **Home Beach** (gz ≤ -35): Always flat at baseline height — the player's starting area
- **Transition zone**: 10-tile smoothstep blend from flat into rolling terrain
- **Hill placement**: Each hill is defined by start/peak/end positions and a maximum height. The peak is offset from center so slopes are asymmetric (steeper on one side, gentler on the other). Smoothstep interpolation creates organic curves.
- **Height range**: Baseline 6, peaks up to 8.5. Heights span multiple integer levels so the cone-slope sand mesh (slopeRate 0.45, ~24° angles) creates smooth multi-level gradients rather than binary steps.

The elevation profile is the foundation that all subsequent layers build on — flora placement respects height, features like pools sit in valleys, and fauna has terrain-aware pathfinding.

### Layer 2 — Island Features (Planned)
Structural terrain features placed after the base shape:
- **Freshwater pool**: Small water-filled indentation near Home Beach (first feature to implement — every island needs a water source near spawn)
- **River/stream**: Optional channel cutting through elevated terrain
- **Cliff face**: Vertical rock exposure on one side of a hill
- **Cave entrance**: Hollow carved into a hillside (progression gate — requires torch)
- **Rock formations**: Large decorative boulders and outcrops

Features are placed relative to the elevation profile — pools in valleys, cliffs on steep faces, caves in hillsides.

### Layer 3 — Reef & Underwater (Planned)
Underwater decorative and interactive elements:
- **Coral clusters**: Branching and brain coral on the seabed (decorative, later harvestable)
- **Kelp beds**: Tall swaying vegetation in deeper water
- **Shells & starfish**: Small scattered props on sand near the waterline
- **Underwater rocks**: Submerged boulders creating reef structure

Coral is classified here (not in flora) because it belongs to the underwater ecosystem and follows reef placement logic rather than land-based vegetation rules.

### Layer 4 — Flora (Partial)
Land vegetation placed on the terrain surface:
- **Palm trees**: Currently placed along the island spine (done)
- **Jungle canopy**: Dense tall trees on elevated sections (planned)
- **Undergrowth**: Ferns, small plants filling gaps between trees (planned)
- **Bushes**: Medium vegetation at jungle edges (planned)
- **Grass patches**: Low ground cover on flat baseline areas (planned)

Flora density and species vary by elevation — palms on low/flat areas, denser jungle on hills.

### Layer 5 — Props & Resources (Planned)
Harvestable and decorative objects:
- **Driftwood**: Scattered on beaches (gatherable for wood)
- **Coconuts**: Fallen near palm trees (food source)
- **Stone deposits**: Small rock clusters (gatherable for stone)
- **Ore deposits**: Rare mineral veins on hillsides/caves (advanced resource)
- **Small rocks/pebbles**: Decorative scatter on paths and beaches

### Layer 6 — Fauna (Planned)
Living creatures using the existing ecosystem pipeline (ecosystem.js):
- **Fish**: Schools in shallow and deep water (harvestable with rod)
- **Crabs**: Scuttle on beaches near waterline
- **Birds**: Perch in trees, fly overhead
- **Monkeys**: Inhabit jungle canopy on hills
- **Goats**: Roam elevated terrain

Each species has terrain-awareness — fish stay in water, crabs on sand, monkeys in trees.

### Layer 7 — Atmosphere & Weather
Dynamic environmental effects driven by real-time clock and Markov state machine:
- **Weather states**: Clear → Cloudy → Rain → Storm (with smooth crossfade transitions)
- **Cloud dome**: Procedural FBM texture, DNC-tinted
- **Rain particles**: Intensity driven by weather state
- **Fog/mist**: Distance-based, weather-modulated
- **Wind**: Affects flora sway amplitude and particle direction

### Progression Gates
The procedural system supports gameplay progression through terrain-based barriers:
1. **Terrain barriers**: Hills and elevation changes create natural obstacles
2. **Tide/weather gates**: Areas accessible only at low tide or calm weather
3. **Dense vegetation**: Jungle sections requiring tools (machete) to clear

Every island is generated with a guaranteed water source near Home Beach and at least two elevated landmarks to explore towards. The procedural pipeline ensures playability while maintaining visual variety.

---

## 7. Performance Budget

### 7.1 Device Generation Table

Our minimum target is the iPhone 12 (2020, A14). Anything older is a bonus. The table below shows what each generation can handle at 60fps in Safari WebGL.

| Generation | Example Devices | Chip | GPU TFLOPS | Our Target | Status |
|-----------|----------------|------|-----------|------------|--------|
| 2018 | iPhone XS/XR | A12 | ~0.6 | Best-effort (30fps OK) | Bonus |
| 2019 | iPhone 11 | A13 | ~1.0 | Best-effort (45fps OK) | Bonus |
| **2020** | **iPhone 12** | **A14** | **~0.65** | **60fps — this is our floor** | **Minimum** |
| 2021 | iPhone 13 / 13 Pro | A15 | ~4.5-5.2 | 60fps, comfortable | Supported |
| 2022 | iPhone 14 / 14 Pro | A15-A16 | ~5.2-6.0 | 60fps, headroom | Supported |
| 2023 | iPhone 15 / 15 Pro | A16-A17 | ~6.0-7.2 | 60fps, full quality | Supported |
| 2024 | iPhone 16 / 16 Pro | A18 | ~8.4-10.0 | 60fps, full quality | Supported |
| 2025 | iPhone 17 (projected) | A19 | ~12+ | 60fps, full quality | Supported |

**Why iPhone 12 (2020) as the floor:** It's 5 years old in 2025, still widely used, and represents the low end of what people actually play games on today. Anything older is increasingly rare.

**Safari WebGL overhead:** Safari translates WebGL calls to Metal internally. This adds ~2-5x overhead versus native. Draw calls are the #1 bottleneck — not triangles, not shaders. Every draw call costs significantly more on Safari than on desktop Chrome.

### 7.2 Performance Budget (per frame at 60fps)

| Metric | Desktop | Mobile (iPhone 12+) | Mobile (iPhone 13 Pro+) |
|--------|---------|-------------------|----------------------|
| Draw calls | < 100 | **< 50** | < 75 |
| Triangles (visible) | < 200,000 | **< 100,000** | < 150,000 |
| Texture memory | < 300 MB | **< 100 MB** | < 150 MB |
| Max texture size | 4096x4096 | **2048x2048** | 2048x2048 |
| Shadow map | 4096x4096 | **1024x1024** | 2048x2048 |
| DPR | Native (capped at 2) | **Capped at 1.5** | Capped at 2 |
| Overdraw | < 4x | **< 2x** | < 3x |
| Fragment shader ops | Unlimited | **< 30 ALU** | < 50 ALU |
| Per-frame allocations | Zero | **Zero** | Zero |
| JS bundle | < 300KB gz | **< 300KB gz** | < 300KB gz |
| Total assets (initial) | < 15 MB | **< 8 MB** | < 10 MB |

**The critical number is draw calls.** On Safari mobile, each draw call has heavy CPU overhead. Staying under 50 on our minimum target device is more important than triangle count.

### 7.3 How We Hit This Budget

**Draw Call Reduction (highest impact):**
- Shared materials per species/type — every object that shares a material can be batched by the GPU
- `THREE.InstancedMesh` for repeated flora (50 palm trees = 1 draw call, not 50)
- Merge static terrain geometry — the entire island bakes to as few meshes as possible
- Texture atlases — multiple models share one texture = one material = one batch
- Target: all flora and fauna combined should cost < 10 draw calls via instancing

**Model Complexity Control:**
- Low-poly 3D models — target 500-2000 triangles per object (trees, structures, characters)
- LOD system: simpler meshes at distance, full detail only when zoomed in
- No subdivision surfaces, no tessellation — what you model is what you render
- Decorative fauna (birds, crabs) can be < 200 triangles each

**Shader Discipline:**
- `MeshStandardMaterial` is the ceiling — no `MeshPhysicalMaterial` anywhere
- `MeshBasicMaterial` for anything that doesn't need lighting (sky, clouds, UI elements)
- Use `mediump` precision in fragment shaders on mobile
- Caustics shader: reduce Voronoi iterations on mobile (2 instead of 4)
- Move calculations from fragment to vertex shader where possible
- Minimize texture lookups per fragment (max 2-4)

**Texture Memory Management:**
- Max texture size 2048x2048 on mobile (even if GPU reports 4096 support — Safari crashes)
- Compress textures: JPEG for diffuse, PNG-8 where alpha is needed
- Use mipmaps sparingly (they 1.33x memory usage)
- Lazy-load zone assets — only load textures for the zone the player is in
- Release textures for off-screen zones

**Fill Rate / Overdraw:**
- Minimize transparent objects (transparency disables depth-write, causes overdraw)
- Sort opaque objects front-to-back (Three.js does this by default)
- The fixed diorama camera helps here — we know exactly what's in frame and can optimize the scene composition
- Cloud dome and sky elements use `depthWrite: false` (already implemented)

**CPU / Memory Discipline:**
- Zero `new` allocations in the render loop — reuse all vectors, raycasters, matrices
- Object pooling for particles (pre-allocate, recycle)
- Single raycast on tap (not per-frame)
- Cache GLB model scene graphs — one load per species, clone for instances
- `requestAnimationFrame` only — no `setInterval`, no `setTimeout` in game loop

**Mobile-Specific Optimizations:**
- Device detection at startup: `navigator.maxTouchPoints > 0` for mobile, `navigator.hardwareConcurrency` for CPU cores
- Quality presets applied automatically: `high` (desktop), `medium` (modern mobile), `low` (older mobile)
- Disable shooting stars and bubbles on low-end devices
- Throttle ecosystem animation tick to every 2nd frame on low-end
- Reduce water plane vertex count on mobile (fewer CPU wave calculations)

**Monitoring:**
- `renderer.info.render.calls` — draw call count per frame (log to dev console)
- `renderer.info.render.triangles` — triangle count per frame
- `renderer.info.memory.textures` — loaded texture count
- Performance overlay in dev mode showing FPS, draw calls, triangles in real-time

---

## 8. Persistence & Save System

### Primary: LocalStorage + IndexedDB
- Game state serialized to JSON
- Saved on every meaningful action (place item, complete craft, etc.)
- Auto-save every 60 seconds
- IndexedDB for larger data (inventory, world state)

### Data Structure (conceptual)
```json
{
  "version": "1.0",
  "created": "2026-02-14T10:00:00Z",
  "lastPlayed": "2026-02-14T18:30:00Z",
  "player": {
    "name": "...",
    "avatar": { "skin": 2, "hair": 3, "outfit": 1 },
    "position": { "zone": "beach", "x": 150, "z": 30 },
    "needs": { "hunger": 0.7, "thirst": 0.5, "warmth": 0.9, "rest": 0.6 }
  },
  "pet": {
    "type": "dog",
    "name": "Buddy",
    "needs": { "hunger": 0.8, "happiness": 0.6 },
    "position": { "x": 155, "z": 32 }
  },
  "inventory": [ { "id": "wood", "qty": 5 } ],
  "world": {
    "zones": { "beach": { "unlocked": true }, "jungle": { "unlocked": false } },
    "structures": [ { "id": "lean-to", "x": 200, "z": 25, "state": "complete" } ],
    "resources": [ { "id": "palm-1", "state": "harvested", "regrowAt": "2026-02-15T06:00:00Z" } ]
  },
  "crafting": {
    "active": { "id": "wooden-hut", "startedAt": "...", "completesAt": "..." }
  },
  "narrative": {
    "stage": "castaway",
    "diary": [],
    "bottlesFound": []
  },
  "stats": {
    "daysOnIsland": 3,
    "itemsCrafted": 7,
    "stormsSurvived": 1
  }
}
```

### Offline Progression Calculation
When the player returns, `time.js` calculates what happened:
1. Read `lastPlayed` timestamp
2. Calculate elapsed real-time
3. Tick needs depletion (hunger, thirst, etc.)
4. Complete any crafting timers that finished
5. Grow any crops/trees that matured
6. Roll for weather events (storms during absence)
7. Apply storm damage if applicable
8. Present "While you were away..." summary

---

## 9. Input Handling

### Desktop
- **Click** on hotspot: walk to + interact
- **Click + drag** on background: pan/scroll view
- **Scroll wheel**: zoom in/out
- **Keyboard**: debug/island-designer only (orbit, time skip, terrain tools, etc.)

### Mobile
- **Tap** on hotspot: walk to + interact
- **Swipe** on background: pan/scroll view
- **Pinch**: zoom in/out
- **Long press**: inspect item/object (tooltip)
- **Orientation**: Portrait only. Locked via `screen.orientation.lock('portrait')` at startup. Tablets use landscape.

### Zone/Hotspot System
- The world is divided into tappable zones (not pixel-precise)
- Each zone has a bounding area and a list of possible actions
- Tapping triggers: player walk animation > arrive > action menu or auto-action
- Raycast against zone colliders on tap (single raycast, not per-frame)
- No platforming, no jumping, no real-time combat

---

## 10. Development Workflow

### Same as current prototype
- **Dev server:** Vite on `localhost:5173`
- **Hot reload:** Edit code, see changes instantly
- **Browser testing:** Chrome DevTools, mobile emulation
- **Real device testing:** Connect phone to same network, access via local IP
- **File structure:** ES modules, no build framework beyond Vite
- **Version control:** Manual backups (zip) or future git

### Asset Pipeline
- **3D Models:** GLB format (industry standard, compact, supports materials + animations)
- **Terrain:** Pre-authored using the existing heightmap builder, then exported/baked as static mesh
- **Audio:** MP3/OGG files loaded on demand (future)
- **Data:** JSON files for recipes, dialogue, zone definitions
- **Textures:** PNG/JPEG, compressed, atlas where possible

---

## 11. Risk Register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Three.js too heavy on old phones | High | Tiered quality presets, aggressive LOD, real device testing from WP1 |
| 3D model production bottleneck | Medium | Start with placeholders (colored boxes already supported), GLB asset stores, AI-assisted modeling |
| Real-time timers feel punishing | High | Generous timers, no permadeath, "catch-up" mechanics for returning players |
| Save data corruption/loss | High | Versioned saves, backup to cloud (future), graceful fallback |
| Scope creep (too many features) | High | Strict WP phasing, playable demo first, features earn their way in |
| Browser storage limits | Low | IndexedDB is generous (50MB+), compress save data |
| Shadow map VRAM on mobile | Medium | Dynamic shadow map sizing (1024 on mobile, 4096 on desktop) |
| Too many draw calls with many structures | Medium | GPU instancing, shared materials, LOD culling, draw call budget monitoring |
