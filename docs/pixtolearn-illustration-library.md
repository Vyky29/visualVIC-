# PixtoLearn illustration library — organisational model

This document defines how illustration content is organised in the platform.  
**It is documentation only.** It does not change app behaviour, card geometry, routines, screens, or navigation.

Three approaches coexist:

| # | Layer | Status | Purpose |
|---|--------|--------|---------|
| 1 | **Generic Library** | Active | Reusable object/place/transport assets for any user |
| 2 | **Personalised Routines** | Active (pilot) | Participant appears in illustrations — reference for engagement |
| 3 | **Future AI Personalised Engine** | Planned | Photo + step → auto-generated personalised illustration |

---

## 1. Generic Library (reusable assets)

### Purpose

Build a long-term PixtoLearn visual library: clear, neurodiversity-friendly icons that work across routines, packs, and users.

### Rules

- **No participant** in the image.
- Show the **object, place, transport, item, or resource** only.
- Flat 2D vector style, white background, centred, 531×648 reference area.
- Reusable everywhere — not tied to one person.

### Day Centre — generic schedule subjects

| Step | Subject |
|------|---------|
| Music | Tambourine / music resources |
| Cafe | Coffee and pastry |
| Bus | Red London double-decker bus (side view) |
| Westfield | Shopping bags / shopping symbol |
| Black nail varnish | Nail varnish bottle |
| McDonald's | Meal set (burger, fries, bag) |
| Bean bag | Blue bean bag |
| Cab | Black London taxi (side view) |
| Home | House (no people) |
| Finish | Green tick + finish flag |

### Where assets live today

```
public/cards/day centre/general/          ← Generic Library (canonical owner for object/place art)
public/cards/day centre/ikram/scenes/     ← Personalised scenes only (Ikram visible)
```

Legacy generic PNGs may still exist under `ikram/scenes/` on disk — they are **not** owned by the Ikram Library; routing points to `general/` instead.

### App wiring (unchanged)

- Pack label: **At the day centre**
- Data: `src/lib/cards/day-centre-general-cards.ts`
- URLs: `dayCentreGeneralImageUrl(slug)` → `general/{slug}.png`

### Generation scripts (dev tooling)

| Script | Output |
|--------|--------|
| `scripts/import-day-centre-general-reference-grid.mjs` | **Level 1** reference grid → `general/` (premium art) |
| `scripts/generate-day-centre-general-schedule.mjs` | **Level 1** SVG fallback → `general/` only |
| `scripts/generate-day-centre-general-activities.mjs` | Activity & material cards (puzzles, cooking, painting…) → `general/` |
| `scripts/generate-day-centre-general-fitness.mjs` | Fitness equipment & stretching (therapy ball, treadmill, skis…) → `general/` |
| `scripts/generate-pixtolearn-bus.mjs` | London bus → Ikram scenes + `general/bus.png` |
| `scripts/generate-day-centre-general-home.mjs` | House only → `general/home.png` (superseded by schedule script) |
| `scripts/generate-day-centre-placeholders.mjs` | Legacy general placeholders |
| `scripts/pixtolearn-london-bus.mjs` | Shared bus SVG module |
| `scripts/pixtolearn-illustration-prompt.md` | Master prompt + subject lines |

---

## 2. Personalised Routines (current pilot)

### Purpose

Highly personalised routines where the **participant is inside** the illustration — for recognition, engagement, and ownership.

### Rules

- Use the participant's **face, hairstyle, skin tone, and proportions** (from reference photos / avatar).
- Show the participant **doing the activity** or **with the key object/place**.
- Pilot scope: **Ikram · Day Centre** only.
- Serves as the **reference model** for how future AI-generated personalised art should look.

### Ikram · Day Centre — personalised intent

| Step | Personalised subject |
|------|----------------------|
| Music | Ikram playing / enjoying music |
| Cafe | Ikram at the cafe |
| Bus | Ikram boarding the bus |
| Westfield | Ikram at Westfield |
| Black nail varnish | Ikram holding black nail varnish |
| McDonald's | Ikram at McDonald's |
| Bean bag | Ikram relaxing on the bean bag |
| Cab | Ikram entering a black cab |
| Home | Ikram at home with her **black cat** |
| Finish | Ikram completing the routine |

Plus the **4×6 PECS grid** (toilet, wash hands, bus, taxi, walking, shopping, etc.) — Ikram in pink sweatshirt performing each activity.

### Where assets live today

```
public/cards/day centre/ikram/scenes/     ← Schedule + PECS scene illustrations
public/cards/day centre/ikram/            ← Root copies + communication cards
public/avatars/ikram-cartoon.png          ← Avatar reference (pink sweatshirt)
public/avatars/ikram-cartoon-leopard.png  ← Avatar variant
public/cards/day centre/ikram/_references/ ← Source photos
```

### App wiring (library ownership)

- Pack label: **Ikram · day centre**
- Data: `src/lib/cards/day-centre-ikram-cards.ts`
- **Library picker:** `DAY_CENTRE_IKRAM_LIBRARY_SEQUENCE` — personalised cards only
- **Generic asset slugs:** `DAY_CENTRE_IKRAM_GENERIC_ASSET_SLUGS` — resolve via `general/{slug}.png` (no Ikram in image)
- **Personalised scenes:** all other PECS / schedule steps with Ikram visible → `ikram/scenes/{slug}.png`
- **Routines:** `at-the-day-centre` → `dayCentreGeneralImageUrlForStep`; `ikram-day-centre` → `dayCentreIkramScheduleImageUrlForStep` (always `ikram/scenes/`)

### Generation scripts (dev tooling)

| Script | Role |
|--------|------|
| `scripts/reframe-all-ikram-scenes.mjs` | Crop PECS/scene raws → 531×648 / 531×663 |
| `scripts/reframe-ikram-home-center.mjs` | Ikram + black cat → home scenes |
| `scripts/import-ikram-photos.mjs` | Reference photos + cartoon avatar |
| `scripts/ikram-pecs-grid-manifest.mjs` | PECS slug list |
| `scripts/generate-ikram-pink-pack-logo.mjs` | Pack logo |

Raw sources (outside repo by default):

```
~/.cursor/projects/Users-victor-cursor-visualVIC/assets/
  ikram-pecs-{slug}-raw.png
  ikram-scene-{slug}-raw.png
  ikram-home-black-cat-v2-raw.png
```

---

## 3. Future AI Personalised Engine (not implemented)

### Vision

```
Participant photo  +  Routine step  +  PixtoLearn generation engine
                              ↓
              Automatically generated personalised illustration
```

Examples:

- Bus + child photo → child boarding a bus  
- Home + child photo → child at home  

### Constraints (for future work)

- Output must match **current personalised pilot** quality: centred framing, 531×648 / 531×663, same card shell, participant consistency across steps.
- Generic library assets remain the **fallback** and the **style anchor** for objects/places when personalisation is off.
- **No implementation in this phase** — Ikram pilot is the behavioural and visual reference.

---

## Coexistence map (Day Centre)

```
┌─────────────────────────────────────────────────────────────┐
│                    PixtoLearn platform                       │
├─────────────────────┬───────────────────┬─────────────────┤
│ 1. Generic Library  │ 2. Personalised   │ 3. Future AI    │
│    (reusable)       │    (Ikram pilot)  │    (planned)    │
├─────────────────────┼───────────────────┼─────────────────┤
│ general/*.png       │ ikram/scenes/*    │ —               │
│ Object / place only │ Participant in    │ Photo + step →  │
│ Any user            │ scene             │ generated art   │
└─────────────────────┴───────────────────┴─────────────────┘
```

### Important distinction: Home

| Layer | Home illustration |
|-------|---------------------|
| Generic | Simple **house** — `general/home.png` |
| Personalised (Ikram) | **Ikram + black cat** on sofa — `ikram/scenes/home.png` |

Same slug (`home`), different packs, different art — by design.

---

## Clean-up rule (ownership)

| Rule | Implementation |
|------|----------------|
| Ikram appears in image | Ikram Library (`DAY_CENTRE_IKRAM_LIBRARY_SEQUENCE`) |
| No participant in image | Generic Library (`DAY_CENTRE_IKRAM_GENERIC_ASSET_SLUGS` → `general/`) |
| Do not delete files | PNGs on disk unchanged; only URL routing and library listing |

### Generic asset slugs (library picker only — not used in Ikram routine)

`music`, `cafe`, `bus`, `bus-return`, `westfield`, `black-nail-varnish`, `mcdonalds`, `bean-bag`, `cab`, `finished`, `supermarket`, `community-centre`

The **Ikram · day centre** 10-step routine always resolves `ikram/scenes/{slug}.png`. The **Day centre** routine always resolves `general/{slug}.png`.

## What this document does **not** change

- Card components, dimensions, or templates  
- Schedule / Focus / player screens or layouts  
- Routine step lists or navigation  
- PNG files on disk  

For prompt text and per-subject lines, see `scripts/pixtolearn-illustration-prompt.md`.
