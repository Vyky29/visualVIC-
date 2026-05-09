/** PNG empaquetado típico (ratio consistente en las tarjetas Pixto). */
const PIXTO_FOCUS_CARD_PNG_W = 739;
const PIXTO_FOCUS_CARD_PNG_H = 1022;

/**
 * Caja de diseño Focus Pixto (ancho × alto antes de `scale`), px de diseño.
 * El ancho queda fijo; el alto = proporción nativa del PNG + un **alargo solo vertical** (sin ensanchar).
 */
export const PIXTO_FOCUS_CARD_REF_WIDTH_PX = 390;

const PIXTO_FOCUS_CARD_NATIVE_HEIGHT_PX =
  (PIXTO_FOCUS_CARD_REF_WIDTH_PX * PIXTO_FOCUS_CARD_PNG_H) /
  PIXTO_FOCUS_CARD_PNG_W;

/**
 * Pixels extra solo en vertical (sin tocar el ancho); un poco más de alto = menos banda arriba/abajo al escalar.
 */
export const PIXTO_FOCUS_CARD_EXTRA_HEIGHT_PX = 90;

export const PIXTO_FOCUS_CARD_REF_HEIGHT_PX =
  PIXTO_FOCUS_CARD_NATIVE_HEIGHT_PX + PIXTO_FOCUS_CARD_EXTRA_HEIGHT_PX;

/**
 * En Focus, estirar solo hacia abajo el bitmap (ancla top + lados) para tapar la franja bajo el PNG.
 * `scaleY(1 + esto / REF_HEIGHT)`; no cambia el archivo ni el ancho lógico de la caja verde.
 */
export const FOCUS_PIXTO_PNG_BOTTOM_STRETCH_PX = 25;

/**
 * Tope opcional de escala (evita gigantismo en desktop). Usa un número alto para “solo pantalla”.
 */
export const PIXTO_FOCUS_CARD_MAX_SCALE = 100;
