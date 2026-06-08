# Bora Bora — Paradise Island Builder

A lightweight 3D island-builder game built with Three.js. Players sculpt terrain, plant flora, and watch ecosystems grow — then share their islands with the world.

---

## Vision

- A **lightweight game** that runs on every platform — browsers, Steam, iOS, Android, Switch, PS5.
- Everyone builds an island and walks it with an avatar.
- Host visitors on your island or explore others. Islands are persistent social spaces — like interactive chat servers.
- Activities and minigames to play together.
- Every island gets a **shareable code** so anyone can visit anytime.
- Islands can be **rated and ranked** — discover the best creations from the community.

## Architecture Philosophy

**Thick Client, Thin Server.** All rendering, terrain generation, physics, and animation run entirely on the player's device. The server is just a database + message relay. This means server costs scale with *connections and storage*, not compute — orders of magnitude cheaper.

The client is built on **Three.js / WebGL**, making it the most portable 3D engine available. The same core code wraps into platform-specific shells:

| Platform | Shell | Priority |
|---|---|---|
| Browser (WebGL 2) | Direct — no wrapper needed | Ship first |
| iOS / Android | Capacitor.js native wrapper | Ship first |
| Steam / Desktop | Tauri (Rust, ~3 MB binary) | Fast follow |
| Switch / PS5 | Certified web engines (NWF, WebMAF) | Strategic |

One engine, one codebase, all platforms.

## Project Structure

```
bora-bora/
├── index.html                 # Slim shell: canvas, UI markup, CSS, importmap
├── README.md                  # This file
├── package.json               # Dev dependencies (vite, serve)
│
├── src/
│   ├── main.js                # Entry point — init, animation loop, event wiring
│   ├── state.js               # Shared state — scene, renderer, camera refs, constants
│   ├── sky-water.js           # Procedural sky, clouds, mist, water, caustics, god rays, day/night cycle
│   ├── terrain.js             # Heightmap, marching cubes, build brushes, materials, undo
│   ├── ecosystem.js           # Model loader, flora/fauna placement, animation tick
│   ├── camera.js              # Orbit, builder, overhead modes, transitions
│   └── ui.js                  # Build menu, toolbar, music player, HUD
│
├── assets/
│   ├── models/                # GLB files — one per species
│   │   ├── FL-001.glb         #   Coconut Palm
│   │   └── ...                #   (more as modeled)
│   ├── audio/
│   │   └── ambient.mp3        # Background music
│   ├── fonts/
│   │   └── tahiti.otf         # Custom UI font
│   └── cursor.svg             # Custom cursor
│
└── dist/                      # Build output (gitignored)
    ├── index.html             #   Single-file game build
    └── viewer.html            #   Stripped-down website/showcase build
```

### Why This Structure?

The original prototype was a **single 5+ MB HTML file** with all code, models, audio, and fonts embedded as base64. This worked brilliantly for rapid prototyping but hits limits as the project grows:

| Single-file | Modular |
|---|---|
| Chokes AI assistants with megabytes of base64 in context | Clean code files that AI reads and edits efficiently |
| Browser must download entire file before rendering anything | Assets load in parallel; player sees the ocean in <1 second |
| Adding a new model means pasting ~200 KB of base64 into JS | Drop a .glb file into `assets/models/` |
| One file to scroll through (~5,000 lines) | Focused files (~200–1,400 lines each) |
| Base64 encoding adds 33% size overhead to every binary asset | Raw binary files — smaller and cached independently |
| Can't produce stripped-down variants | Multiple build targets from one codebase |

### Module Dependency Graph

```
index.html
  └── src/main.js
        ├── src/state.js          ← shared scene, renderer, constants
        ├── src/sky-water.js      ← imports state
        ├── src/terrain.js        ← imports state
        ├── src/ecosystem.js      ← imports state
        ├── src/camera.js         ← imports state
        └── src/ui.js             ← imports state, terrain, ecosystem, camera
```

All modules import from `state.js` for shared references (scene, renderer, camera, constants). No circular dependencies. `main.js` wires everything together.

## Key Systems

### Terrain
- **Heightmap** stored as a sparse Map (`"gx,gz"` → `{rockHeight, totalHeight}`)
- **Marching cubes** isosurface extraction produces a unified mesh
- Two materials: rock and sand, both with underwater **caustic shader injection**
- Build tools: paint rock/sand, raise/lower height, undo stack

### Ecosystem
- Flora config inlined in `ecosystem.js` — each species owns its own animations and behaviors
- GLB model loading with caching, placement, grow-in particles, wind sway
- **Auto-animation by mesh name**: `wingLeft`/`wingRight` → flap, `tail` → sway, `bell` → pulse, etc.

### Day/Night Cycle
- 600-second full cycle: Dawn (100s) → Noon (280s) → Dusk (100s) → Night (120s)
- Drives: sky gradient, cloud tint, water color, sun/moon position, lighting intensity, star visibility

### Water
- Procedural wave surface with shared wave function
- Voronoi caustics (GLSL shader on seabed overlay)
- God rays: tapered triangles from surface to seabed
- Underwater backdrop cylinder with gradient

### Camera
- Three stages: Orbit (exploration) → Builder (elevated editing) → Overhead (top-down)
- Compass rotation, WASD pan, scroll zoom, smooth lerp transitions

## Development

### Prerequisites
- Node.js 18+ (for the dev server)
- A modern browser (Chrome, Firefox, Edge, Safari)

### Getting Started

```bash
# Install dev dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser. Vite serves ES modules directly — no build step during development. Hot module reload keeps the feedback loop fast.

### Building for Distribution

```bash
# Full game — single HTML file
npm run build

# Website viewer — stripped-down showcase version
npm run build:viewer
```

The build output in `dist/` is a self-contained HTML file with all JS, CSS, and assets inlined. Deploy anywhere — no server required for the static build.

## Performance Budget

- **Target**: 60 fps on mid-range hardware
- **Triangle budget**: ~100,000 tris for the full ecosystem
- **Per-model target**: <1,000 tris (low-poly aesthetic)
- **Sky updates**: throttled to every 0.15s
- **Future optimization**: batch identical models into `InstancedMesh`

## Multiplayer Architecture (Future)

```
Client (Three.js)  ←→  WebSocket  ←→  Presence Server  ←→  Redis Pub/Sub
                        HTTPS      ←→  REST API         ←→  PostgreSQL + S3/R2
```

- **Island data**: sparse heightmap + object list (~5–50 KB gzipped JSON), stored in S3/R2
- **Shareable codes**: human-friendly format like `CORAL-7X` (8 chars, ~2.8T combinations)
- **Real-time sync**: position updates at 10 Hz, delta-compressed binary, ~40 bytes each
- **Player cap**: 20–30 per island instance
- **Cost target**: $5–25/mo at launch (single VM + free-tier services)

See `Bora Bora Architecture.html` for the full infrastructure blueprint.

## License

All rights reserved. Sharksock LLC, 2025–2026.
