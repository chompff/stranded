# Install-modal screenshots

Drop the screenshots referenced by the install modal (`src/cta.js`) into this
folder with these exact filenames. Until a file exists, its `<img>` slot hides
itself automatically (onerror), so missing images are harmless.

| File | Shown in | Suggested content |
|---|---|---|
| `lively-store.png` | Windows · Lively, step 1 | Lively Wallpaper's Microsoft Store page |
| `lively-add-url.png` | Windows · Lively, step 2 | Lively's "+ Add Wallpaper" dialog with the URL pasted |

Keep them small (~800px wide, compressed PNG or JPG) — they load lazily inside
the modal only.

**Important — two locations.** `vite build` does NOT copy this folder. Runtime-
fetched assets in this repo live as committed copies in BOTH places (same as
`assets/models/FL-001.glb` ⇄ `dist/assets/models/`):

1. `assets/install/<file>` — source of truth, served by the dev server
2. `dist/assets/install/<file>` — committed build artifact, served in production

Copy each image to both paths before shipping.
