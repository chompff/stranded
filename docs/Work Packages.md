# Bora Bora - Work Packages
**Version:** 2.0
**Date:** February 14, 2026

---

## Build Order

```
WP1 --> WP2 --> WP3    = Playable demo (arrive on island, walk around)
  |
  v
WP4 --> WP5 --> WP7    = Core loop (gather, craft, build, wait, return)
  |
  v
WP6 --> WP8 --> WP9    = Depth (exploration, story, weather)
  |
  v
WP10                   = Social (multiplayer, visits, trading)
```

---

## WP1 - The Stage
**Goal:** 3D island world that looks gorgeous and runs on mobile.

**Deliverables:**
- New project scaffold built on existing prototype (Vite, Three.js, clean src/ structure)
- Carry over all production-ready systems: DNC engine, sky renderer, cloud dome, celestial bodies, water surface, lighting rig, caustics
- Retain existing heightmap builder as a dev tool / island designer (orbit camera, terrain painting, material tools — dev mode only)
- Pre-author island terrain mesh using the island designer, then bake as static mesh for the game
- Island terrain with distinct zone shapes (beach, jungle, river, mountain, cave, peak)
- Fixed "Living Diorama" camera — one carefully composed angle, zoom + pan only, no player rotation
- Sun arc left-to-right across the sky, moon arc at night — both visible from the fixed perspective
- Per-device-class sun arc calibration (mobile/tablet/desktop) — each arc tuned to stay within the viewport for that device class
- Real-time 24h DNC synced to player's local clock (fixed tropical hours: 06:00 dawn, 08:00-19:00 day, 19:00 dusk, 21:00-06:00 night)
- Portrait orientation lock on mobile devices (landscape for tablet/desktop)
- Mobile performance optimization pass:
  - Device class detection (mobile/tablet/desktop) using touch + screen width heuristic
  - Quality presets (shadow map sizing, DPR cap, water resolution)
  - Frustum culling for off-screen objects
  - LOD system scaffold (swap models at distance)
- Performance verified on real mobile device (target: 60fps on 2020 mid-range phone)
- Draw call budget monitoring (< 50 on mobile, < 80 on desktop)

**Depends on:** Nothing (first package)
**Estimated scope:** Large

---

## WP2 - The Character
**Goal:** A player avatar and pet that exist in the world.

**Deliverables:**
- Simple avatar creator (skin tone, hair style, basic outfit)
- Player 3D model (GLB) — idle, walk animations (start with placeholder colored box if needed)
- Walk system: tap a location, character walks there along terrain surface
- Pet selection screen (dog / cat / parrot)
- Pet 3D model (GLB) with idle animation (start with placeholder if needed)
- Pet follow behavior (walks behind player, pauses when player stops)
- Character and pet correctly positioned on terrain surface (raycast placement)
- Shared materials per model type (no per-instance materials)

**Depends on:** WP1 (needs the stage to walk on)
**Estimated scope:** Medium

---

## WP3 - The Arrival (Tutorial)
**Goal:** The first 10-15 minute experience. Player arrives, boat wrecks, builds first shelter.

**Deliverables:**
- Boat approach cinematic (boat model moves toward island, storm overlay)
- Storm effect (rain particles, screen shake, darkened sky via DNC override)
- Boat wreck: boat model breaks apart on the beach
- Driftwood spawns on beach (3 pieces, GLB models or placeholder boxes)
- Tap-to-gather interaction (tap driftwood, character walks to it, picks it up)
- Basic inventory (counter: "Wood: 3/3")
- First crafting action: build lean-to shelter from 3 wood
- Shelter appears on beach with construction animation (foundation > frame > complete)
- First campfire: automatic after shelter (or guided)
- Night falls, fire glows, pet sleeps nearby
- Dawn: light sweeps across the island from the left, revealing it stretching into the unknown
- "Tutorial complete" — free play begins

**Depends on:** WP2 (needs character + pet)
**Estimated scope:** Large (lots of scripted sequences)

---

## WP4 - Survival Core
**Goal:** The fundamental survival systems that create the "come back" loop.

**Deliverables:**
- Needs system: hunger, thirst, warmth, rest (decay over real time)
- Needs HUD (4 bars, always visible, minimal design — HTML/CSS overlay)
- Resource definitions: wood, stone, fiber, coconut, fish, water
- Gathering actions: tap tree (shake for coconut), tap debris (collect wood), tap ocean zone (fish)
- Gathering timers (short: 5-30 seconds)
- Resource drops with pickup animation
- Eating/drinking actions (tap food in inventory to consume)
- Warmth affected by fire proximity and time of day (DNC-driven)
- Rest mechanic: tap shelter to sleep (fast-forwards a few in-game hours)
- Pet needs: hunger and happiness bars
- Pet feeding: share food from inventory
- Pet happiness: interaction (tap pet to play)
- Visual consequences: player model hunches when hungry, shivers when cold, pet whimpers when sad

**Depends on:** WP3 (needs the world + basic inventory)
**Estimated scope:** Large

---

## WP5 - Crafting & Building
**Goal:** Turn resources into tools, structures, and upgrades.

**Deliverables:**
- Crafting menu UI (list of available recipes based on inventory — HTML/CSS overlay)
- Recipe system (JSON-defined: inputs, output, build time)
- Real-time build timers (display countdown, persist across sessions)
- Construction stages (foundation > frame > complete) with GLB models for each stage
- Structure placement: tap a valid zone, structure builds there (raycast to terrain surface)
- Tool crafting: fishing rod, machete, pickaxe, torch
- Tools unlock new gathering actions (fishing rod = catch fish, machete = cut vines)
- Structure upgrades: lean-to > wooden hut > stone house
- Campfire: provides warmth radius, fire particle effect, cooks food

**Depends on:** WP4 (needs resources to craft with)
**Estimated scope:** Large

---

## WP6 - The Island (World & Exploration)
**Goal:** A rich, explorable island with distinct zones.

**Deliverables:**
- Zone system: Home Beach, Jungle, River, Mountain, Cave, Peak
- Zone-specific terrain shapes, vegetation (GLB flora models), ambient lighting
- Fog-of-war: unexplored zones hidden/teased (3D fog or overlay)
- Zone unlock requirements (machete for jungle, pickaxe for mountain, etc.)
- Zone-specific resources (jungle fruits, river clay, mountain stone, cave ore)
- Zone-specific ambient wildlife (decorative GLB fauna: birds, crabs, monkeys, goats — using existing ecosystem pipeline)
- Discovery moments: first time entering a new zone triggers narrative beat
- Lore objects hidden in zones (carved stones, old journals, mysterious artifacts)
- Zone transition effects (clearing undergrowth, crossing river)

**Depends on:** WP5 (needs tools to unlock zones)
**Estimated scope:** Large

---

## WP7 - Time & Persistence
**Goal:** The game runs in real time, even when the player is away.

**Deliverables:**
- Save system (LocalStorage + IndexedDB)
- Auto-save on every meaningful action + every 60 seconds
- Load game on startup (restore full world state)
- Offline progression calculator:
  - Deplete needs based on elapsed time
  - Complete crafting/building timers
  - Grow crops/trees that matured
  - Roll weather events
  - Apply storm damage
- "While you were away..." summary screen on return
- Real-time clock display (in-game "days on island" counter)
- Graceful handling of time jumps (player gone for a week)
- Catch-up mechanic: needs don't fully deplete — floor at 10% even after long absence (no softlock)

**Depends on:** WP4 + WP5 (needs systems to persist)
**Estimated scope:** Medium-Large

---

## WP8 - Narrative Layer
**Goal:** Story, personality, emotional connection.

**Deliverables:**
- Diary system: entries appear at milestones (first night, first storm, first week)
- Diary UI: readable log, styled like a handwritten journal (HTML/CSS overlay)
- Messages in bottles: random wash-up events with lore text
- Bottle collection tracking
- Milestone story beats with special visuals/text
- Character internal monologue (short text popups during key moments)
- Progression stage transitions (Castaway > Settler > Islander) with narrative ceremony
- Pet personality moments (reactive text based on pet type + situation)
- Narrative tone guide implementation (warm, reflective, sometimes humorous)

**Depends on:** WP6 (needs enough world to tell stories about)
**Estimated scope:** Medium

---

## WP9 - Weather & Events
**Goal:** Dynamic world that feels alive and sometimes threatening.

**Deliverables:**
- ~~Weather state machine: Clear > Cloudy > Rain > Storm~~ **DONE** — Markov chain rotation with smooth crossfade transitions (systems/weather.js)
- ~~Weather transitions with visual effects (clouds darken, rain particles, lightning flash)~~ **DONE** — 30-60s crossfade lerps cloud dome, fog, rain, god rays
- Rain: fills water collectors, douses exposed fires, cools player
- Storm: damages structures (percentage-based), washes up loot, dramatic visuals
- Storm recovery: repair actions, beachcombing for washed-up items
- Heat wave: thirst depletes faster
- Wind: affects flora sway amplitude (existing sway system), particle direction
- Weather prediction hints (clouds building, pet behavior changes before storm)
- Seasonal variation (optional: longer days in summer, more rain in monsoon)
- Random events: rare resource spawn, wild animal sighting, mysterious light at night

**Depends on:** WP7 (weather events happen in real time, including offline)
**Estimated scope:** Medium-Large

---

## WP10 - Social (Future)
**Goal:** Other players can see and interact with your island.

**Deliverables:**
- Player profile / island ID system
- Island visit: browse other players' islands (read-only Living Diorama view)
- Rating system: rate visited islands
- Leaderboard: "Most Beautiful Island" rankings
- Trading: send/receive resources with friends
- Guest infrastructure: dock (allows visitors), guest hut, paths, decorations
- Visitor log: see who visited your island
- Social currency earned from visits
- Privacy controls: public / friends-only / private island

**Depends on:** WP1-WP9 (needs a complete single-player game first)
**Estimated scope:** Very Large (requires backend/server infrastructure)

---

## Summary Table

| WP | Name | Depends On | Scope | Priority |
|----|------|-----------|-------|----------|
| 1 | The Stage | - | Large | Immediate |
| 2 | The Character | WP1 | Medium | Immediate |
| 3 | The Arrival | WP2 | Large | Immediate |
| 4 | Survival Core | WP3 | Large | High |
| 5 | Crafting & Building | WP4 | Large | High |
| 6 | The Island | WP5 | Large | Medium |
| 7 | Time & Persistence | WP4+5 | Medium-Large | High |
| 8 | Narrative Layer | WP6 | Medium | Medium |
| 9 | Weather & Events | WP7 | Medium-Large | Medium |
| 10 | Social | WP1-9 | Very Large | Future |

---

## Milestone Targets

**Milestone 1 - "Proof of Life"** (WP1 + WP2)
> A character and pet standing on a beautiful 3D island — Living Diorama perspective, real-time DNC synced to your clock, ocean, sun arcing across the sky. Runs on mobile. Screenshot-worthy.

**Milestone 2 - "First Night"** (WP3)
> The complete arrival experience. Playable 15-minute demo. Emotionally compelling.

**Milestone 3 - "The Loop"** (WP4 + WP5 + WP7)
> Core gameplay works. Gather, craft, build, save, close browser, come back, things happened. This is the game.

**Milestone 4 - "The World"** (WP6 + WP8 + WP9)
> Full island to explore, stories to find, weather to survive. A complete single-player experience.

**Milestone 5 - "Paradise"** (WP10)
> Social features. Share your island with the world.
