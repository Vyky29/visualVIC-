# Fitness · 3D — brief for designer (bundle template)

Use this when commissioning a **sprite sheet / grid bundle** for the Physical · 3D pack.

## Final size per illustration

| Spec | Value |
|------|--------|
| **Illustration area (crop this)** | **531 × 648 px** (portrait) |
| **Label band (optional, below)** | **531 × 56 px** — name only, **not** part of the illustration |
| **Total cell (illustration + label)** | **531 × 704 px** |
| **Format** | PNG |
| **Colour** | sRGB |
| **Style** | Soft 3D render — same as reference grid (rounded volumes, gentle gradients, soft top light, subtle ground shadow) |
| **Content** | Single object or single clear action in the **top 531×648 zone only** |
| **Text in illustration** | None — no labels inside the 531×648 crop area |
| **Margins** | Object centred in illustration zone; occupies ~75–85% of **648 px** height |

This matches the PixtoLearn **illustration slot** inside the 744×1054 card shell.  
We **crop only the top 531×648 px**; the label band is for the designer’s reference and is discarded on import.

### Label band (for bundle sheets only)

When delivering a **grid / sprite sheet**, put the English name **below** each illustration:

| Spec | Value |
|------|--------|
| Position | Directly under the 531×648 illustration box |
| Height | **56 px** (or 48–64 px) |
| Background | Same as sheet gutter (white or dark grey) |
| Text | Centred, e.g. `BOSU`, `Kettlebell`, `Row machine` |
| Font | Simple sans-serif, ~22–28 px, neutral grey `#888888` |
| Rule | Text must **not overlap** the illustration — keep a clear horizontal line between zones |

**Per-cell layout:**

```
┌─────────────────────┐
│                     │
│   531 × 648 px      │  ← illustration (this is what we import)
│   3D object         │
│                     │
├─────────────────────┤
│      BOSU           │  ← 531 × 56 px label (discarded on crop)
└─────────────────────┘
     531 × 704 px total cell
```

Individual PNG files (531×648 only, no label) are still preferred.

## Recommended bundle layout

| Layout | Illustration canvas (crop) | With label band (designer sheet) |
|--------|---------------------------|----------------------------------|
| **4 columns × 5 rows** (20 items) | **2124 × 3240 px** | **2124 × 3520 px** (704 px row height) |
| **4 columns × 3 rows** (12 items) | **2124 × 1944 px** | **2124 × 2112 px** |

- **Gutter between cells:** 0 px (easiest to cut programmatically)  
  **or** 16 px white gutter if easier to see while designing.
- **Alternative (Retina / print):** 2× cells → **1062 × 1296 px** each; canvas **4248 × 6480 px** for 4×5.

## Easiest delivery (preferred)

Individual PNG files, one per slug, already **531 × 648 px** — no grid cutting needed.

Folder naming: `{slug}.png` (see list below).

## Full 3D catalogue (20 items)

### Core equipment (13)

| File | Subject |
|------|---------|
| `therapy-ball.png` | Blue therapy / stability ball on grey mat |
| `trampoline.png` | Mini rebounder trampoline |
| `step-platform.png` | Aerobic step platform |
| `treadmill.png` | Treadmill, side/three-quarter view |
| `exercise-machine.png` | Multi-gym / cable machine |
| `weights.png` | Dumbbell + weight plates |
| `row-machine.png` | Seated row machine |
| `skis.png` | Pair of skis with bindings |
| `exercise-bike.png` | Static spin bike |
| `exercise-mat.png` | Rolled purple yoga mat |
| `resistance-bands.png` | Resistance bands with handles |
| `foam-roller.png` | Blue textured foam roller |
| `stretching.png` | Person stretching on mat (or green stretch band if generic only) |

### Extras (7)

| File | Subject |
|------|---------|
| `bosu.png` | BOSU half-dome balance trainer |
| `kettlebell.png` | Cast-iron kettlebell |
| `medicine-ball.png` | Heavy medicine ball |
| `jump-rope.png` | Jump rope with handles |
| `punching-bag.png` | Hanging heavy bag |
| `agility-ladder.png` | Flat agility ladder on floor |
| `balance-board.png` | Wobble balance board |

## Background

- **Option A (best for app):** White `#FFFFFF` per cell — we trim and fit automatically.
- **Option B:** Dark rounded tile per cell (like current reference) — we trim dark edges on import.

## Import in repo

```bash
# Grid bundle (4×5 or 4×3) — edit CELLS in manifest first
node scripts/import-fitness-3d-reference-grid.mjs /path/to/bundle.png

# Designer bundle with label band (4×5, 531×704 cells → crop top 648)
node scripts/import-fitness-3d-designer-bundle.mjs /path/to/bundle.png
```

Output: `public/images/library-3d/{slug}.png`

## Reference

- Card geometry log: `docs/digital-card-size-log.md`
- Illustration frame constant: `531 × 648` (`GENERATED_PIXTO_ILLUSTRATION_FRAME`)
- Style reference: user 3D fitness grid (ChatGPT, Jun 2026)
