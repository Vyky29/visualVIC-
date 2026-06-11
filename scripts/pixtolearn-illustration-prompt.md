# PixtoLearn illustration — master prompt

> **Organisation:** Three illustration layers (Generic Library · Personalised Routines · Future AI) are documented in [`docs/pixtolearn-illustration-library.md`](../docs/pixtolearn-illustration-library.md). This file covers generation prompts and dev scripts only.

## Master prompt (auto-generation)

```
Create a clean PixtoLearn style illustration.

White background.
Transparent background if possible.
No floor.
No shadows.
No text.
No labels.
No border.
No decorative elements.

The illustration must be centred and occupy most of the canvas.

Flat 2D vector style.
Simple shapes.
Clean outlines.
Friendly educational appearance.
Neurodiversity-friendly.
Bright but soft colours.
Consistent proportions.
High clarity.
Easy to recognise at a glance.

Illustration size should be optimised for PixtoLearn cards (531 x 648 reference area).

The subject should be shown isolated, without unnecessary scenery.

Prefer a single clear object or landmark over a complete environment or scene.
```

## Subject lines — Ikram Saturday schedule

| Slug | Subject |
|------|---------|
| `music` | A red tambourine and a colourful maraca with two simple musical notes. |
| `cafe` | A coffee cup on a saucer with a croissant on a small plate. |
| `bus` | A classic London red double decker bus viewed from the side. |
| `westfield` | A simplified Westfield shopping centre entrance building. |
| `black-nail-varnish` | A bottle of black nail varnish with the brush slightly visible. |
| `mcdonalds` | A McDonald's takeaway meal including fries, burger and takeaway bag. |
| `bus-return` | The same classic London red double decker bus viewed from the side. |
| `bean-bag` | A large comfortable blue bean bag. |
| `cab` | A classic London black taxi viewed from the side. |
| `home` (Ikram pack) | Ikram on sofa with black cat — `reframe-ikram-home-center.mjs` → `ikram/scenes/home.png` |
| `home` (General pack) | Simple family home icon only — `generate-day-centre-general-home.mjs` → `general/home.png` |
| `finished` | A large green tick next to a finish flag. |

## Subject lines — Day Centre activities & materials (generic, no people)

**Rule:** show **objects and materials only** — not Ikram, not hands performing actions.

### Materials — kitchen

| Slug | Subject |
|------|---------|
| `apron` | A pink cooking apron with neck straps. |
| `mixing-bowl` | A large light-blue mixing bowl. |
| `wooden-spoon` | A wooden spoon with oval bowl and handle. |
| `rolling-pin` | A wooden rolling pin with handles. |
| `cheese-grater` | A box cheese grater with a small cheese wedge. |
| `vegetable-peeler` | A green-handled peeler beside an orange vegetable. |
| `chopping-board` | A wooden chopping board with tomato and pepper pieces. |
| `tomato-sauce` | A jar of tomato sauce with label area blank. |

### Materials — art & craft

| Slug | Subject |
|------|---------|
| `paintbrush` | A paintbrush with blue bristles. |
| `paint-palette` | A white artist palette with colourful paint blobs and thumb hole. |
| `scissors` | Safety scissors with rounded tips. |
| `glue-stick` | A yellow glue stick with white cap. |
| `coloured-paper` | A small stack of coloured paper sheets. |

### Activities — cognitive & sensory

| Slug | Subject |
|------|---------|
| `jigsaw-puzzle` | Four interlocking jigsaw pieces in bright colours. |
| `sorting-trays` | Three trays with one red circle, one blue square, one green triangle. |
| `matching-cards` | Two picture cards showing the same orange circle. |
| `play-dough` | Three blobs of play dough in pink, yellow and blue. |

### Activities — cooking, food & art (until Oct)

| Slug | Subject |
|------|---------|
| `pizza` | A whole pizza with cheese and pepperoni toppings. |
| `cooking` | A cooking pot with wooden spoon and orange food inside. |
| `painting` | A paint palette and paintbrush together. |
| `peeling` | A vegetable peeler beside a partly peeled orange vegetable. |

```bash
node scripts/generate-day-centre-general-activities.mjs
```

## Subject lines — Day Centre fitness & stretching (generic, no people)

### Fitness — equipment

| Slug | Subject |
|------|---------|
| `therapy-ball` | A large blue therapy / exercise ball. |
| `trampoline` | A small rebounder trampoline with safety frame. |
| `step-platform` | Three pink aerobic step platforms stacked. |
| `treadmill` | A treadmill viewed from the side with display panel. |
| `exercise-machine` | A generic seated gym / cable exercise machine. |
| `skis` | A pair of skis with bindings, side by side. |
| `exercise-bike` | A static exercise bike (máquina estática). |

### Fitness — stretching

| Slug | Subject |
|------|---------|
| `exercise-mat` | A rolled purple exercise / yoga mat. |
| `resistance-bands` | Three resistance bands with handles. |
| `foam-roller` | A blue foam roller cylinder. |
| `stretching` | A green stretch band loop (no person). |

```bash
node scripts/generate-day-centre-general-fitness.mjs
```

## Regenerate (dev)

```bash
# Vector schedule cards (transparent PNG)
node scripts/generate-ikram-schedule-illustrations.mjs

# Home — Ikram + black cat (from reference photos)
node scripts/reframe-ikram-home-center.mjs
```

Outputs: `public/cards/day centre/ikram/scenes/{slug}.png` (+ `-focus.png`).
