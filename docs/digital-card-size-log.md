# Digital card size log

Reference for **original PNG**, **locked digital** (744×1054), and **where each screen scales it**.

> **Product rule (agreed):**  
> **Focus Mode on mobile = the largest card** — what the user should feel as “full size”.  
> The **locked digital card** (744×1054 geometry) is the **same design**, but shown **smaller** in Schedule NOW/NEXT, First & Then (portrait + landscape mini), and other previews.  
> Focus may render **slightly larger** than the strict locked frame when the slot allows it (`GeneratedPixtoFocusSlotScale` fits 384×520 into the stage).

---

## 1. Original (designer PNG)

| Asset | Size (px) | Notes |
|-------|-----------|--------|
| Illustration canvas (“yellow block”) | **531 × 648** | `GENERATED_PIXTO_ILLUSTRATION_FRAME` |
| Typical full-bleed Pixto PNG | **739 × 1022** | Bundled cards; used for legacy Focus PNG path |
| Focus PNG logical box | **390 × ~630** | `PIXTO_FOCUS_CARD_REF_*` (+90px extra height on PNG focus) |

**Source:** `src/components/experimental/GeneratedPixtoCard.tsx`, `src/lib/constants/pixto-focus-card.ts`

---

## 2. Locked digital card (master geometry)

Single HTML/CSS frame — **do not resize zones independently**; scale the whole card.

| Zone | Size (px) | Constant |
|------|-----------|----------|
| **Full card** | **744 × 1054** | `GENERATED_PIXTO_CARD_SIZE` |
| Top block (illustration shell) | 744 × 794 | `GENERATED_PIXTO_TOP_LAYOUT_H` |
| Illustration slot | 531 × 648 | `GENERATED_PIXTO_ILLUSTRATION_FRAME` |
| Title band (default) | 744 × 166 | `GENERATED_PIXTO_TITLE_ZONE_H` |
| Title band (Schedule WOW) | 744 × 177 | `GENERATED_PIXTO_WOW_TITLE_ZONE_H` |
| Category ribbon | 744 × 94 | `GENERATED_PIXTO_CATEGORY_BAND_H` |

**Schedule NOW / NEXT** use WOW title band (177px) inside the same 744×1054 frame.

**Scaler:** `GeneratedPixtoSlotScale` — uniform `scale = min(slotW/744, slotH/1054)`.

---

## 3. Focus Mode — largest on phone (reference)

### 3a. Generated digital cards (HTML shell)

New **3-zone Focus frame** (illustration flex + fixed text/footer):

| Zone | Size (px) | Constant |
|------|-----------|----------|
| **Full card** | **384 × 560** | `GENERATED_PIXTO_FOCUS_FIXED_ZONE` in `generated-pixto-card-sizes.ts` |
| Illustration area | flex 1 (~**388px** inner) | pads 32/20/12 — **~69%** of card height |
| Action text | 384 × **72** | `actionH` |
| Footer ribbon | 384 × **56** | `footerH` |

**Stage cap (parent width):**

| Mode | Max width | File |
|------|-----------|------|
| Default | `min(100%, 28rem)` → **448px** | `FocusMode.tsx` → `FocusCardStage` |
| Expanded cards option | `min(94vw, 540px)` | same |

**Scaler:** `GeneratedPixtoFocusSlotScale` — **width-first** (`stageW/384`) when height allows; else `min(sx,sy)`.

**Schedule caps** derive from Focus width: NOW = **75%**, NEXT = **~70%** (`generated-pixto-card-sizes.ts`).

**Example — iPhone ~390px wide, ~780px tall stage:**

| | Design px | Rendered ≈ |
|---|-----------|------------|
| Width | 384 | **390** (width-limited, scale ≈ 1.02) |
| Height | 520 | **528** |

→ This is the **target “full mobile” feel**.

### 3b. Legacy Focus PNG cards (bundled image)

| | px |
|---|-----|
| Logical box | **390 × ~630** | `PIXTO_FOCUS_CARD_REF_WIDTH_PX` × `PIXTO_FOCUS_CARD_REF_HEIGHT_PX` |
| Bottom stretch | +25px scaleY | `FOCUS_PIXTO_PNG_BOTTOM_STRETCH_PX` |

### 3c. Old Focus geometry (744-based, still in constants)

| Zone | px |
|------|-----|
| Top block | 744 × 881 | `GENERATED_PIXTO_FOCUS_TOP_LAYOUT_H` |
| Illustration | 531 × **663** | `GENERATED_PIXTO_FOCUS_ILLUSTRATION_FRAME` |
| Title | 744 × 318 | `GENERATED_PIXTO_FOCUS_TITLE_ZONE_H` |
| Ribbon | 744 × 175 | `GENERATED_PIXTO_FOCUS_CATEGORY_BAND_H` |

Used in generated-card-demo labels; **player Focus uses 384×520** since the 3-zone Focus layout.

---

## 4. Smaller uses of locked digital (744×1054)

### Schedule Player — NOW

| | px |
|---|-----|
| **Total card (visible)** | **288 × 420** | `GENERATED_PIXTO_SCHEDULE_NOW_W` × `GENERATED_PIXTO_SCHEDULE_NOW_H` |
| Design frame scaled | 384 × 560 @ 75% | same 3-zone geometry as Focus |
| vs Focus width | **75%** | 288/384 |

**Slot:** fixed `288×420` box + `GeneratedPixtoFocusSlotScale` + `focusPresentation`.

### Schedule Player — NEXT

| | px |
|---|-----|
| **Total card (visible)** | **268 × 392** | `GENERATED_PIXTO_SCHEDULE_NEXT_W` × `GENERATED_PIXTO_SCHEDULE_NEXT_H` |
| Design frame scaled | 384 × 560 @ ~69.8% | same 3-zone geometry as Focus |
| vs Focus width | **70%** | 268/384 |

Slightly smaller than NOW (same geometry, narrower cap).

### First & Then — portrait intro (mini, pink 3-zone)

| | px |
|---|-----|
| **Fixed slot** | **268 × 392** | `PIXTO_CARD_SLOTS.firstThenPortrait` (= NEXT) |
| Geometry | 384 × 560 @ 70% | `GeneratedPixtoCard` `focusPresentation` |

### First & Then — Focus landscape (liked pink)

| | px |
|---|-----|
| **Per card** | **384 × 560** | `PIXTO_CARD_SLOTS.firstThenLandscape` |
| Scene | 2 cards + gap + sidebar | scaled to fit landscape viewport (`scale ≤ 1`) |

### Thumbnails (`PIXTO_CARD_SLOTS`)

| Slot | px | Use |
|------|-----|-----|
| `thumbMd` | 68 × 88 | Home continue |
| `thumbSm` | 52 × 68 | Schedule done |
| `thumbNav` | 72 × 72 | Player index |
| `thumbGallery` | 84 × 100 (5/6) | Library grid |

---

## 5. Hierarchy summary (width at typical phone)

```
Focus Mode (generated)     ████████████████████  ~390px   ← LARGEST (reference)
Focus Mode (expanded opt)  ██████████████████████ ~540px cap
Schedule NOW               ██████████████        288px
Schedule NEXT              █████████████         268px
First & Then portrait      ████████              ~200–280px (dynamic)
Locked digital design      (744px = 100% in Figma/code, never shown full width on phone)
```

**Height** follows the same order if aspect ratio is preserved (uniform scale).

---

## 6. Ratio cheat sheet

| Comparison | Ratio |
|------------|-------|
| Focus design W / Locked digital W | 384/744 = **51.6%** |
| Focus design H / Locked digital H | 520/1054 = **49.3%** |
| NOW cap / Focus design W | 288/384 = **75%** |
| NEXT cap / Focus design W | 268/384 = **70%** |
| NOW cap / Locked digital W | 288/744 = **38.7%** |

---

## 7. Code map — `PIXTO_CARD_SLOTS` in `generated-pixto-card-sizes.ts`

| Slot | px | Screen |
|------|-----|--------|
| `focus` | 384×560 (stage-capped) | Focus Mode |
| `now` | 288×420 | Schedule AHORA |
| `next` | 268×392 | Schedule SIGUIENTE, `/first-then` |
| `firstThenLandscape` | 384×560 | First & Then demo Focus |
| `firstThenPortrait` | 268×392 | First & Then demo intro |
| `thumbMd` / `thumbSm` / `thumbNav` / `thumbGallery` | see §4 | Home, done, player, library |

---

## 8. Open alignment notes

1. **Two Focus geometries coexist in constants:** legacy 744-based zones vs current **384×520** 3-zone shell. Player uses **384×520**.
2. **User intent:** locked **744×1054** stays the design master; **Focus on phone** is the **visible maximum**; everything else scales **down** from that experience.
3. Next implementation step (when ready): encode caps as `% of Focus rendered width` so NOW/NEXT/mini stay in sync if Focus stage changes.

**Last synced with code:** commit `da6cf91` (post size revert).
