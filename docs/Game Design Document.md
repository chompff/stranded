# Bora Bora - Game Design Document
**Version:** 2.0
**Date:** February 14, 2026
**Status:** Vision & Concept

---

## 1. Concept

**Bora Bora** is a 3D survival life sim where the player, disillusioned with modern society, arrives on a deserted tropical island and must build a new life from nothing. The game runs in real time — building a shelter takes hours, growing a tree takes days. The player must return regularly to tend their island, care for their pet, and survive.

**Genre:** Survival / Life Sim / Idle
**Platform:** Cross-platform (browser-based, mobile-friendly, PWA-ready)
**Perspective:** 3D "Living Diorama" — fixed camera angle, no rotation. The island is always framed the same way, like a beautiful miniature world you peer into.
**Core Loop:** Gather > Craft > Build > Wait > Return > Maintain

---

## 2. Narrative

### Premise
The player is fed up with modern life. They take a boat to escape civilization, accompanied only by their chosen pet. A storm hits, the boat wrecks on the shore of a deserted island. There is no going back. You must build paradise from scratch.

### Tone
Reflective, warm, sometimes humorous. A mix of survival tension and peaceful island beauty. The narrator (internal monologue or diary) captures the player's evolving relationship with solitude, nature, and self-reliance.

### The Ironic Arc
Over time, the player literally rebuilds a version of the society they escaped — but on their own terms. From castaway to island mogul, the journey mirrors civilization itself.

### Narrative Devices
- **Internal diary/monologue** — the player's thoughts at key milestones
- **Messages in bottles** — wash up randomly with lore, quests, hints from other "castaways"
- **Milestone story beats** — first shelter, first storm survived, first week, first visitor

---

## 3. Progression Arc

| Stage | Name | Description |
|-------|------|-------------|
| 1 | **Castaway** | Pure survival. Shelter, fire, food. Just staying alive. |
| 2 | **Settler** | Stability achieved. Permanent structures, farming, exploring deeper. |
| 3 | **Islander** | Comfort. Functional and beautiful island. Luxury items, decoration. |
| 4 | **Paradise Host** | Social endgame. Other players visit. Guest huts, dock, tiki bar. Reputation currency. |
| 5 | **Island Mogul** | Micro-civilization. Tourist economy, rare items, legendary island status. |

---

## 4. The Arrival (Tutorial / First Session)

The first session is 10-15 minutes and serves as both tutorial and emotional hook:

1. **Cinematic:** Boat approaches island. Storm builds. Boat wrecks on the beach.
2. **Wash ashore:** Player character and pet wake up on the beach among wreckage.
3. **Guided actions:** Gather 3 driftwood from the beach. Build a lean-to shelter. Light first fire.
4. **First night:** DNC cycles to dusk/night. Fire crackles. Pet curls up nearby. Stars come out.
5. **Dawn:** Player sees the island stretching beyond — jungle, mountains, the unknown. The adventure begins.

The boat washes away in the storm. It cannot be repaired. Later in the game, the player can build a new boat as an advanced crafting milestone.

---

## 5. World Structure

The island is a 3D landmass with distinct zones. The player explores by walking through the world and rotating the camera around the island:

```
[Ocean] [Home Beach] [Jungle] [River] [Mountain] [Cave] [Peak]
  <--      START       --->    --->     --->       --->   --->
```

- **Home Beach:** The player's landing zone and base camp. This is the main stage — the small, always-visible area framed by the Living Diorama camera where the player washes ashore, builds their first shelter, and always returns to. Driftwood, coconuts, fish, crabs. Open and safe. The moon rises above Home Beach at night, synced to the real-world lunar cycle.
- **Jungle:** Dense undergrowth requiring a machete to clear. Fruits, vines, monkeys, birds. Wood resources.
- **River:** Fresh water source. Fishing. Requires bridge to cross.
- **Mountain:** Stone, ore, goats. Requires pickaxe to carve through rock.
- **Cave:** Shelter from storms, rare minerals, mystery lore. Dark — requires torch.
- **Peak:** Endgame zone. Panoramic view. Rare resources. Spiritual/narrative payoff.

Each zone is gated by tool/resource requirements, creating natural progression.

Unexplored areas are hidden by fog/vegetation — the player literally carves their way forward.

---

## 6. Core Systems

### 6.1 Needs System
The player has four needs that decay over real time:

| Need | Depletes | Consequence of Neglect |
|------|----------|----------------------|
| **Hunger** | ~6 hours to empty | Slower actions, eventual collapse |
| **Thirst** | ~4 hours to empty | Faster depletion than hunger |
| **Warmth** | Faster at night/rain | Shivering, slower recovery |
| **Rest** | ~16 hours to empty | Must sleep in shelter to restore |

**No permadeath.** Neglect makes everything slower and sadder, not fatal. The pet gets visibly distressed. The motivation is emotional, not punitive.

### 6.2 Resources

| Resource | Source | Zone |
|----------|--------|------|
| Driftwood | Beach debris | Home Beach |
| Coconut | Palm trees (tap to shake) | Home Beach |
| Fish | Ocean/river (fishing action) | Home Beach, River |
| Fresh Water | River, rain collection | River, anywhere (rain) |
| Fiber/Vine | Jungle plants | Jungle |
| Fruit | Jungle trees | Jungle |
| Stone | Mountain rocks | Mountain |
| Clay | Riverbank | River |
| Ore | Cave deposits | Cave |
| Rare Crystal | Deep cave | Cave |

### 6.3 Crafting

Crafting uses gathered resources and takes real time:

| Item | Materials | Build Time |
|------|-----------|------------|
| Lean-to Shelter | 3 driftwood | 5 minutes (tutorial) |
| Campfire | 2 wood + 1 stone | 2 minutes |
| Fishing Rod | 1 wood + 1 fiber | 10 minutes |
| Machete | 2 stone + 1 wood + 1 fiber | 30 minutes |
| Wooden Hut | 10 wood + 5 fiber | 4 hours |
| Water Collector | 3 wood + 2 fiber + 1 clay | 1 hour |
| Stone House | 20 stone + 10 wood | 2 days |
| Boat (endgame) | 30 wood + 10 fiber + 5 ore | 7 days |

Build times are real-world time. Structures show visual construction stages (foundation > frame > complete) as 3D models that swap at each stage.

### 6.4 Pet System

Player chooses one pet at game start:

| Pet | Personality | Functional Bonus |
|-----|-------------|-----------------|
| **Dog** | Loyal, energetic | Finds buried items, guards camp, barks at danger |
| **Cat** | Independent, curious | Catches small prey, explores ahead, finds hidden paths |
| **Parrot** | Chatty, colorful | Spots distant resources, mimics sounds, warns of weather |

The pet has its own needs:
- **Hunger:** Must be fed from player's resources
- **Happiness:** Interaction, play, shelter
- **Health:** Gets sick if neglected too long

The pet follows the player as a 3D model with idle animations, reacts to events (storms, nightfall, food). It's your only companion — the emotional core of the game.

---

## 7. Interaction Model

**Zone-based, tap-to-interact:**

- The island is divided into interactive zones/hotspots
- Tap a location: character walks there
- Tap an object: context action (shake tree, pick up item, craft, build)
- No complex platforming, no jump mechanics
- Drag/swipe to scroll the view (if the island extends beyond one screen)
- Pinch to zoom in/out
- Fixed camera perspective — no rotation, no orbit. The island is always seen from the same angle (Living Diorama).
- **Mobile is portrait-only.** Orientation is locked to portrait on mobile devices. The diorama composition, sun arc, and UI are all designed for portrait framing. Landscape on mobile would waste horizontal space around the compact island and break the immersive "window into a miniature world" feeling. Tablets and desktops use landscape.

This keeps it accessible, mobile-friendly, and focused on the simulation rather than dexterity.

---

## 8. Real-Time & Persistence

### While Playing
- Actions have short timers (seconds to minutes)
- Gathering is immediate or near-immediate
- Crafting/building shows progress in real time

### While Away
- Needs continue to deplete (hunger, thirst, etc.)
- Crops/trees continue growing
- Weather events can occur (storms damage structures)
- Pet needs continue to deplete
- Timers on crafting/building continue ticking

### Returning
- "While you were away..." summary screen
- Shows what happened: crops ready, storm damage, pet status
- Immediately gives the player meaningful things to do

### Notifications (Future - PWA)
- "Your coconut tree is ready to harvest!"
- "A storm is approaching your island!"
- "Your dog misses you..."
- Opt-in, not aggressive. Respectful of the player's real life.

---

## 9. Day/Night Cycle

Synced to the player's real-world local clock (24-hour cycle). When you open the app, the island matches your time of day. Fixed tropical hours — the same sunrise and sunset everywhere in the world, because you're on a tropical island.

| Phase | Real Time (approx) | Effect |
|-------|-------------------|--------|
| **Dawn** | 06:00 - 08:00 | Warmth rises, visibility increases. Sun rises on the left of screen. |
| **Day** | 08:00 - 19:00 | Full visibility, warm, best for exploration. Sun arcs across the sky left to right. |
| **Dusk** | 19:00 - 21:00 | Fire becomes important, pet gets anxious. Sun sets on the right. |
| **Night** | 21:00 - 06:00 | Cold (warmth drops faster), limited visibility, need fire/shelter. Moon arcs across the sky above Home Beach. |

The DNC creates natural rhythm — explore by day, tend camp by evening, rest at night. Opening the app at different times of day gives you different moods and experiences.

### Real Moon Phase Sync
The in-game moon is synced to the real-world lunar cycle. If it's a full moon outside your window, it's a full moon on your island. The phase is calculated from the synodic month (29.53 days) using a known new moon epoch — pure math, no API calls, accurate to ~1 day. The terminator shadow (the line between light and dark) is painted onto the moon texture as a proper elliptical projection. Moonlight intensity, water specular shimmer, and glow halo all scale with the illumination fraction — a crescent moon casts barely any light, while a full moon bathes Home Beach in soft blue-white.

The DNC engine provides: 4-phase cycle with 11-stop sky gradients, procedural sun/moon with real lunar phase, 2580-star GPU point cloud, shooting stars, cloud dome, and a 7-light rig — all running on the real-time 24h clock.

---

## 10. Weather System

Weather runs on the real-time 24h clock via a **Markov chain state machine**. Each weather state lasts a random real-world duration, then the system rolls a new state using probability-weighted transitions. Weather changes are never scripted or predictable — the island feels alive.

### Weather States

| State | Target % | Duration Range | Visual |
|-------|----------|---------------|--------|
| **Clear** | ~55% | 45–180 min | Blue skies, full sun, god rays |
| **Cloudy** | ~25% | 30–120 min | Cloud dome visible, slightly dimmed light |
| **Mist** | ~10% | 15–45 min | Fog, no clouds, mysterious atmosphere |
| **Rain** | ~10% | 8–25 min | Storm clouds, rain particles, fog |

### Transition Flow
Weather flows naturally between states. Rain almost never follows clear skies directly — clouds build first. After rain, clouds linger or mist settles before clearing. Transitions crossfade over 30–60 seconds (cloud dome fades, fog density lerps, rain ramps in/out).

### Time-of-Day Bias
Tropical weather patterns create soft biases (not deterministic schedules):
- **Morning (05–08):** Mist slightly more likely, rain slightly less likely
- **Afternoon (12–17):** Rain slightly more likely, mist slightly less likely
- **Evening (18–20):** Clear slightly more likely (golden hour clearing)
- **Night:** Neutral — anything can happen

### Gameplay Effects (Future)
- **Rain:** Fills water collectors, douses unprotected fires, cools player
- **Storm (Future):** Damages structures, washes up loot, pet hides, dramatic visuals
- **Heat Wave (Future):** Thirst depletes faster, some crops wither

Storms are the key disruptive event — they create urgency (reinforce structures!) and reward (beachcombing after storm for washed-up items).

---

## 11. Social Features (Future - Stage 4+)

- **Island visits:** Other players can visit your island (read-only or limited interaction)
- **Trading:** Exchange resources or items with other players
- **Reputation:** "Most Beautiful Island" rankings, visitor ratings
- **Guest infrastructure:** Build dock, guest huts, paths, decorations to attract visitors
- **Tourist economy:** Earn social currency from visits

This is the Clash of Clans endgame layer — parked for later, but the architecture should allow for it.

---

## 12. Monetization (Future)

Parked for later design. Possibilities to explore:
- Cosmetic items (decorations, pet outfits, avatar customization)
- Time-skip tokens (ethical concern: the waiting IS the game)
- Seasonal content packs
- No pay-to-win. The island is earned through patience.

---

## 13. Art Direction

**The Living Diorama:**
- A fixed-perspective 3D world — like peering into a beautiful miniature tropical island. The camera never moves or rotates; the island is always perfectly composed in frame.
- The sun arcs across the sky from left to right in real time (synced to the player's local clock). The moon follows its own arc at night. You see both rise and set from this single perspective. The sun arc is calibrated independently for mobile (portrait), tablet (landscape), and desktop (landscape) to ensure the sun never leaves the visible viewport on any device class.
- 3D rendered world — sky, ocean, clouds, terrain, lighting — all in Three.js with real-time shadows and atmospheric effects
- 3D models (GLB) for characters, pets, structures, flora, and fauna
- Warm, lush palette. The existing prototype's lighting rig (hemisphere light, backfill, underwater glow) gives everything a rich, cinematic tropical feel
- Procedural sky with real day/night transitions — golden dawns, bright noons, fiery dusks, starlit nights
- Underwater caustics on the seabed, specular reflections on the water surface, god rays through clouds

**Color Palette:**
- Ocean: Deep teals to turquoise, with DNC-driven tinting (golden at dawn, cool blue at night)
- Sand: Pristine white above waterline, warm tan below
- Rock: Dark volcanic grey-brown
- Jungle: Rich emeralds and lime greens
- Sky: Full DNC range from dawn pinks to midnight deep blue (11 gradient stops per phase)
- UI: Translucent, minimal, organic shapes (driftwood aesthetic)

---

## 14. Audio Direction (Future)

- Ambient ocean waves, bird calls, wind, crackling fire
- Gentle acoustic guitar soundtrack (think Jack Johnson meets Stardew Valley)
- Pet sounds: barks, purrs, squawks
- Weather sounds: rain on leaves, thunder, wind howling
- UI sounds: organic taps, craft completion chimes
