# AI Assistant Rules

**Scope discipline is non-negotiable.** When given a task, complete *exactly* that task — nothing more, nothing less.

- **Never refactor, optimize, or "improve" code that wasn't asked about.** If the request is "fix X", touch only the code required to fix X.
- **Never change behavior, speeds, timings, or values** unless explicitly asked. Even small "improvements" can break a carefully tuned feel.
- **Never add framerate-independence, caching, or performance fixes** as a side-effect of an unrelated change.
- **If something adjacent looks wrong**, mention it — don't fix it silently.
- **Every change must trace back to a specific user request.** If you can't point to where the user asked for it, don't do it.

This project is built on carefully tuned values and interconnected systems. A "small improvement" in one place can cascade into broken behavior elsewhere. Ship what was asked for, nothing more.

## Performance is a First-Class Requirement

This game must run smoothly on **all devices** — phones, tablets, low-end laptops, not just gaming PCs. If something hampers on a 4090, it absolutely cannot ship.

- **Push back on requests** that would hurt performance at scale (hundreds of objects, large terrains, mobile GPUs).
- **Flag draw call counts, per-frame allocations, and expensive materials** when you see them — even in existing code.
- **Avoid per-object materials** — shared/instanced materials enable GPU batching.
- **Avoid per-frame `new` allocations** (Raycaster, Vector3, etc.) — reuse objects.
- **Avoid `traverse()` in hot loops** — cache references at creation time instead.
- **Every feature must scale.** A system that works for 5 objects but breaks at 50 is not acceptable.

## Game Modes

The game has two modes: **Play** (gameplay) and **Dev** (developer).

- **Always start in Play mode.** Play mode is the default — no URL params needed.
- Dev mode is activated via `?dev=1` URL param or the temporary toggle button, stored in `sessionStorage`.
- In Play mode the camera height is fixed at 1.5, no rotation, no tilt.
- A/D (arrow left/right): sideways strafe (camera slides left/right, no rotation).
- W/S (arrow up/down) + scroll wheel + pinch: forward/backward zoom, clamped between -28.5 (in / closest) and -7.5 (out / furthest).
- All build tools, weather toggles, camera debug, DNC slider, and keyboard shortcuts (B, C, Q, E) are dev-only.
- Music button and mode toggle button are visible in both modes.

## Browser Automation — OFF LIMITS

**Do not use Chrome automation tools, computer use tools, or screenshot capture tools at any point.** They slow everything down and are not worth the overhead.

- Never use `mcp__Claude_in_Chrome__*` tools (navigate, screenshot, read_page, find, computer, etc.).
- Never trigger screenshot capture yourself — even if it seems like the faster option.
- When you need to see the current state of the screen, **ask the user to paste a screenshot manually**. Wait for the user to provide the image before proceeding.

## Dev Server

**Always ensure the Vite dev server is running** at the start of a session. The game must be reachable at `http://localhost:5173/` at all times.

- On session start, check if port 5173 is already in use. If so, verify it's responding (HTTP 200). If it's a zombie process, kill it first.
- If no server is running, start one: `cd <project-root> && npx vite --port 5173`
- Run it in the background so it stays alive throughout the session.
- Never leave the user with a dead link.
- After the server is confirmed running, tell the user the URL is ready so they can open it in Chrome themselves.

## "Let's work" Command

When the user says **"Let's work"**, immediately spin up the dev environment:

1. Start the Vite dev server (or verify it's already running on port 5173).
2. Tell the user to open **`http://localhost:5173/game.html?dev=1`** — **not** the landing page, and **never** with `guest=1` (it kills dev mode).
3. Ask the user to paste a screenshot so you can confirm the dev toolbar is visible before reporting ready.

This is the shortcut to get straight into the dev build with full tools.

## Deployment

The game is hosted on **Vercel** and live at **https://stranded.live**.

- The project is already linked (`.vercel/project.json` exists).
- To deploy to production: `npx vercel --prod` from the Game folder.
- Node.js lives at `/c/Program Files/nodejs` — add it to `PATH` if needed: `export PATH="/c/Program Files/nodejs:$PATH"`
- Vercel builds via `vite build` and serves from `dist/`.

## Documentation

Project documentation lives in `docs/` within this Game folder:

- **Game Design Document.md** — Vision, narrative, progression, core systems, art direction
- **Technical Approach.md** — Architecture decisions, rendering stack, performance budgets, project structure
- **Work Packages.md** — Build order, deliverables, milestones
- **Bora Bora Architecture.html** — Infrastructure design for multiplayer/backend (future)

When making changes that affect game design, camera behavior, DNC timing, device support, or platform strategy, **update the relevant docs to stay in sync with the code.**
