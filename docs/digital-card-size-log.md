# Digital card size log

Reference for **original PNG**, **locked digital** (744×1054), and **where each screen scales it**.

> **Product rule (agreed):**  
> **Focus Mode on mobile = the largest card** — what the user should feel as “full size”.  
> The **locked digital card** (744×1054 geometry) is the **same design**, but shown **smaller** in Schedule NOW/NEXT, First & Then (portrait + landscape mini), and other previews.  
> Focus may render **slightly larger** than the strict locked frame when the slot allows it (`GeneratedPixtoFocusSlotScale` fits 384×560 into the stage).

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

## 3. Focus routine card — LOCKED (agreed perfect digital)

**Source of truth:** `GENERATED_PIXTO_FOCUS_ROUTINE_CARD_LOCKED` in `src/lib/constants/generated-pixto-card-sizes.ts`

**Applies to:** routine Focus Mode (`/focus/...`, `FocusMode.tsx`), `GeneratedPixtoFocusFixedZoneCard`, first-then-demo Focus landscape (`FOCUS_LANDSCAPE` aliases same constants). **Does not** change Schedule NOW/NEXT geometry.

### 3a. Card shell (384 × 560 design px)

| Zone | Size (px) | Constant / field |
|------|-----------|------------------|
| **Full card** | **384 × 560** | `designW` × `designH` |
| Illustration slot padding | top **38**, sides **40**, bottom **0** | `illustPadTop` / `illustPadX` / `illustPadBottom` |
| **Illustration render box** (locked) | **304 × 370** | width = 384−80 inset; `illustrationRenderBoxH` **370** |
| Illustration render inset | top **24**, left **8**, right **18** | `illustrationRenderInset` |
| White title band | **96** tall, **3 lines**, font **28** | `actionH`, `actionMaxLines`, `actionTitleFontPx` |
| Category ribbon footer | **56** | `footerH` — fill from `categoryColour` (Day Centre **#E05C9A** pink; Hotel **#8C1E2E** red; Airport **#F9DD9E** yellow; Finish **#9aa3a8** grey) |
| Pack mark (logo) | **44 × 44** | `packMarkSize` |
| Pack mark position | top **20**, right **24** | `packMarkTop`, `packMarkRight` |

**Behaviour:** extra title height steals only from the flex illustration slot; illustration **render px stay 370** and sit **flush** on the white title band (`items-end`, `object-bottom`). Card total height **560** never changes.

**Stage cap (scaled on phone):**

| Mode | Max width | Constant |
|------|-----------|----------|
| Default | **448** (28rem) | `stageMaxW` |
| Expanded option | **540** | `stageExpandedMaxW` |

**Scaler:** `GeneratedPixtoFocusSlotScale` + `FocusRoutineIllustrationImage` — uniform scale of the 384×560 frame.

**Schedule caps** (separate geometry, 744×1054 WOW): NOW **288**, NEXT **218**.

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

Used in generated-card-demo labels only; **player Focus uses 384×560** (`GENERATED_PIXTO_FOCUS_ROUTINE_CARD_LOCKED`).

---

## 4. Smaller uses of locked digital (744×1054)

### Schedule Player — NOW

| | px |
|---|-----|
| Agreed **max width** | **288** | `GENERATED_PIXTO_SCHEDULE_NOW_W` |
| Height at max width | **~408** | 288 × (1054/744) |
| vs Focus width | **75%** | 288/384 |
| vs locked digital width | **39%** | 288/744 |

**Slot:** hero aspect `744/1054` or `GeneratedPixtoSlotScale` inside hero cell.

### Schedule Player — NEXT

| | px |
|---|-----|
| Agreed **max width** | **218** | `GENERATED_PIXTO_SCHEDULE_NEXT_W` |
| Height at max width | **~309** | 218 × (1054/744) |
| vs Focus width | **~57%** | 218/384 |

Slightly smaller than NOW (same geometry, narrower cap).

### First & Then — portrait intro (mini)

| | px |
|---|-----|
| Design frame | **744 × 1054** | `MiniDigitalWowCard` inside `FirstThenPortraitCardCell` |
| Scale | `min(cellW/744, cellH/1054)` | fits grid cell (~½ screen height) |
| Typical rendered | **~200–280 wide** | depends on viewport; not fixed px |

Both FIRST and THEN cells use the **same** scaler → **same mini size**.

### First & Then — Focus landscape

| | px |
|---|-----|
| Design per card | **384 × 560** | `FOCUS_LANDSCAPE` → `GENERATED_PIXTO_FOCUS_FIXED_ZONE` |
| Scene | 2 cards + gap + sidebar | scaled to fit landscape viewport (`scale ≤ 1`) |

Same locked Focus routine geometry as `/focus/...`; whole scene shrinks on small landscape screens.

---

## 5. Hierarchy summary (width at typical phone)

```
Focus Mode (generated)     ████████████████████  ~390px   ← LARGEST (reference)
Focus Mode (expanded opt)  ██████████████████████ ~540px cap
Schedule NOW               ██████████████        288px
Schedule NEXT              ███████████           218px
First & Then portrait      ████████              ~200–280px (dynamic)
Locked digital design      (744px = 100% in Figma/code, never shown full width on phone)
```

**Height** follows the same order if aspect ratio is preserved (uniform scale).

---

## 6. Ratio cheat sheet

| Comparison | Ratio |
|------------|-------|
| Focus design W / Locked digital W | 384/744 = **51.6%** |
| Focus design H / Locked digital H | 560/1054 = **53.1%** |
| NOW cap / Focus design W | 288/384 = **75%** |
| NEXT cap / Focus design W | 218/384 = **~57%** |
| NOW cap / Locked digital W | 288/744 = **38.7%** |

---

## 7. Code map (where size is decided)

| Screen | Component | Design px | Width cap / behaviour |
|--------|-----------|-----------|------------------------|
| Focus (schedule/player) | `FocusCardStage` + `GeneratedPixtoFocusSlotScale` + `GeneratedPixtoFocusFixedZoneCard` | **384×560** locked | 28rem / 540px stage |
| Schedule NOW | `SwipeableStepCard` + `GeneratedPixtoSlotScale` | 744×1054 | max **288px** |
| Schedule NEXT | same | 744×1054 | max **218px** |
| First & Then portrait | `FirstThenPortraitCardCell` | 744×1054 | cell fit (mini) |
| First & Then Focus landscape | `FirstThenFocusLandscapeLayout` + `FocusRoutineIllustrationImage` | **384×560** ×2 | scene scale |
| Demo / QA | `/generated-card-demo` | all constants | preview widths |

---

## 8. Open alignment notes

1. **Two Focus geometries coexist in constants:** legacy 744-based zones (demo labels) vs **locked 384×560** routine shell (`GENERATED_PIXTO_FOCUS_ROUTINE_CARD_LOCKED`). Player + first-then Focus use the locked shell only.
2. **User intent:** **Focus routine card** geometry is frozen (Jun 2026); **744×1054** stays schedule/NOW/NEXT master; Focus on phone is the visible maximum width experience.
3. NOW/NEXT caps are fixed px (**288** / **218**), not % of Focus — do not change unless product asks.

**Last synced with code:** uncommitted — `generated-pixto-card-sizes.ts` + `GeneratedPixtoCard.tsx` + `first-then-demo` + this doc.
