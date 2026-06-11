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

## Regenerate (dev)

```bash
# Vector schedule cards (transparent PNG)
node scripts/generate-ikram-schedule-illustrations.mjs

# Home — Ikram + black cat (from reference photos)
node scripts/reframe-ikram-home-center.mjs
```

Outputs: `public/cards/day centre/ikram/scenes/{slug}.png` (+ `-focus.png`).
