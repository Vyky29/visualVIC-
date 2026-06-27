#!/usr/bin/env node
/**
 * Generate public/review/card-catalog.html — interactive card audit at NOW size (531×648).
 *
 * Served as a static file by Next.js, so it is reachable in production at:
 *   https://<your-domain>/review/card-catalog.html
 *
 * Locally: `npm run dev` → http://localhost:3000/review/card-catalog.html
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
// Served from public/ so it is reachable in production at /review/card-catalog.html.
const outDir = path.join(root, "public", "review");
const outFile = path.join(outDir, "card-catalog.html");

function loadCatalogJson() {
  const raw = execFileSync(
    "npx",
    ["tsx", "scripts/card-review-print-json.ts"],
    { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
  return JSON.parse(raw);
}

function buildHtml(catalog) {
  const embedded = JSON.stringify(catalog).replace(/</g, "\\u003c");
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>PixtoLearn · Revisión de tarjetas</title>
  <style>
    :root {
      --now-w: 531px;
      --now-h: 648px;
      --thumb-scale: 0.34;
      --thumb-w: calc(var(--now-w) * var(--thumb-scale));
      --thumb-h: calc(var(--now-h) * var(--thumb-scale));
      --bg: #f6f3ee;
      --ink: #1a1a1a;
      --muted: #6b6560;
      --border: #ddd6cc;
      --keep: #2e7d32;
      --redo: #e65100;
      --digitalizar: #1565c0;
      --papelera: #c62828;
      --unset: #9e9e9e;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
      background: var(--bg);
      color: var(--ink);
      line-height: 1.4;
    }
    header {
      position: sticky;
      top: 0;
      z-index: 20;
      background: rgba(246, 243, 238, 0.96);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border);
      padding: 14px 18px 12px;
    }
    h1 { margin: 0 0 4px; font-size: 1.25rem; }
    .sub { margin: 0; color: var(--muted); font-size: 0.9rem; }
    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
      margin-top: 12px;
    }
    .toolbar input[type="search"],
    .toolbar select {
      padding: 8px 10px;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: #fff;
      font: inherit;
    }
    .toolbar input[type="search"] { min-width: 220px; flex: 1 1 220px; }
    button {
      font: inherit;
      border: 1px solid var(--border);
      background: #fff;
      border-radius: 8px;
      padding: 8px 12px;
      cursor: pointer;
    }
    button:hover { background: #faf8f5; }
    button.primary {
      background: #1e4a73;
      border-color: #1e4a73;
      color: #fff;
    }
    button.primary:hover { background: #163a5c; }
    .stats {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
      font-size: 0.85rem;
      color: var(--muted);
    }
    .stats strong { color: var(--ink); }
    main { padding: 16px 18px 48px; max-width: 1600px; margin: 0 auto; }
    .category-block { margin-bottom: 28px; }
    .category-title {
      font-size: 1.05rem;
      font-weight: 700;
      margin: 0 0 10px;
      padding-bottom: 6px;
      border-bottom: 2px solid #1e4a73;
    }
    .section-block { margin: 18px 0 22px; }
    .section-title {
      font-size: 0.95rem;
      font-weight: 650;
      margin: 0 0 8px;
      color: #333;
    }
    .subgroup-title {
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--muted);
      margin: 12px 0 8px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 14px;
    }
    .card {
      background: #fff;
      border: 2px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .card[data-status="keep"] { border-color: var(--keep); }
    .card[data-status="redo"] { border-color: var(--redo); }
    .card[data-status="digitalizar"] { border-color: var(--digitalizar); }
    .card[data-status="papelera"] { border-color: var(--papelera); opacity: 0.82; }
    .thumb-wrap {
      width: 100%;
      aspect-ratio: 531 / 648;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid var(--border);
      overflow: hidden;
    }
    .thumb-wrap img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: #fff;
    }
    .meta { padding: 10px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
    .slug {
      font-size: 0.72rem;
      color: var(--muted);
      word-break: break-all;
    }
    .title-input {
      width: 100%;
      font: inherit;
      font-weight: 600;
      padding: 6px 8px;
      border: 1px solid var(--border);
      border-radius: 6px;
    }
    .notes-input {
      width: 100%;
      font: inherit;
      font-size: 0.82rem;
      padding: 6px 8px;
      border: 1px solid var(--border);
      border-radius: 6px;
      resize: vertical;
      min-height: 44px;
    }
    .actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }
    .actions button {
      padding: 7px 4px;
      font-size: 0.74rem;
      font-weight: 600;
    }
    .actions button.active-keep {
      background: #e8f5e9;
      border-color: var(--keep);
      color: var(--keep);
    }
    .actions button.active-redo {
      background: #fff3e0;
      border-color: var(--redo);
      color: var(--redo);
    }
    .actions button.active-digitalizar {
      background: #e3f2fd;
      border-color: var(--digitalizar);
      color: var(--digitalizar);
    }
    .actions button.active-papelera {
      background: #ffebee;
      border-color: var(--papelera);
      color: var(--papelera);
    }
    .hidden { display: none !important; }
    .hint {
      margin-top: 8px;
      font-size: 0.82rem;
      color: var(--muted);
    }
    .empty-msg {
      padding: 24px;
      text-align: center;
      color: var(--muted);
    }
    @media (max-width: 640px) {
      .grid { grid-template-columns: 1fr 1fr; gap: 10px; }
      header { padding: 12px; }
    }
  </style>
</head>
<body>
  <header>
    <h1>Revisión de tarjetas · PixtoLearn</h1>
    <p class="sub">Ilustraciones a tamaño NOW (${catalog.cardSize.width}×${catalog.cardSize.height}). Marca cada tarjeta y edita el nombre como en la app.</p>
    <p class="sub" style="margin-top:6px"><strong>Keep</strong> = ya está bien · <strong>Redo</strong> = rehacer ilustración · <strong>Digitalizar</strong> = quitar ribete y logo, recortar a ilustración y agrandar · <strong>Papelera</strong> = no la necesitamos</p>
    <div class="toolbar">
      <input id="search" type="search" placeholder="Buscar nombre o slug…" />
      <select id="filter-category">
        <option value="">Todas las categorías</option>
        <option value="self-care">Self-care</option>
        <option value="home">Home</option>
        <option value="activity">Activity</option>
      </select>
      <select id="filter-status">
        <option value="">Todos los estados</option>
        <option value="unset">Sin marcar</option>
        <option value="keep">Keep</option>
        <option value="redo">Redo</option>
        <option value="digitalizar">Digitalizar</option>
        <option value="papelera">Papelera</option>
      </select>
      <button type="button" id="btn-save-local">Guardar en navegador</button>
      <button type="button" class="primary" id="btn-export">Descargar JSON</button>
      <label><button type="button" id="btn-import-label">Cargar JSON</button><input id="btn-import" type="file" accept="application/json,.json" class="hidden" /></label>
    </div>
    <div class="stats" id="stats"></div>
    <p class="hint">En producción: <code>/review/card-catalog.html</code>. Cuando termines, descarga el JSON y pásamelo para actualizar el repo.</p>
  </header>
  <main id="main"></main>
  <script id="catalog-data" type="application/json">${embedded}</script>
  <script>
    const STORAGE_KEY = "pixtolearn-card-review-v2";
    const catalog = JSON.parse(document.getElementById("catalog-data").textContent);
    const state = new Map(catalog.cards.map((c) => [c.pickId, { ...c }]));

    function loadSaved() {
      try {
        const raw =
          localStorage.getItem(STORAGE_KEY) ||
          localStorage.getItem("pixtolearn-card-review-v1");
        if (!raw) return;
        const saved = JSON.parse(raw);
        for (const row of saved.cards || []) {
          const cur = state.get(row.pickId);
          if (!cur) continue;
          if (row.label != null) cur.label = row.label;
          if (row.status != null) cur.status = row.status;
          if (row.notes != null) cur.notes = row.notes;
        }
      } catch (e) {
        console.warn("Could not load saved review", e);
      }
    }

    function persistLocal() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(exportPayload()));
    }

    function exportPayload() {
      return {
        version: 1,
        exportedAt: new Date().toISOString(),
        sourceGeneratedAt: catalog.generatedAt,
        cardSize: catalog.cardSize,
        cards: [...state.values()].map((c) => ({
          pickId: c.pickId,
          slug: c.slug,
          sectionId: c.sectionId,
          sectionLabel: c.sectionLabel,
          category: c.category,
          status: c.status || "",
          label: c.label,
          originalLabel: catalog.cards.find((x) => x.pickId === c.pickId)?.label ?? c.label,
          notes: c.notes || "",
          imageUrl: c.imageUrl,
          imagePath: c.imagePath,
        })),
      };
    }

    function updateStats() {
      const rows = [...state.values()];
      const counts = { keep: 0, redo: 0, digitalizar: 0, papelera: 0, unset: 0 };
      for (const r of rows) {
        const k = r.status || "unset";
        counts[k] = (counts[k] || 0) + 1;
      }
      document.getElementById("stats").innerHTML =
        "<span><strong>" + rows.length + "</strong> tarjetas</span>" +
        "<span>Keep: <strong>" + counts.keep + "</strong></span>" +
        "<span>Redo: <strong>" + counts.redo + "</strong></span>" +
        "<span>Digitalizar: <strong>" + counts.digitalizar + "</strong></span>" +
        "<span>Papelera: <strong>" + counts.papelera + "</strong></span>" +
        "<span>Sin marcar: <strong>" + counts.unset + "</strong></span>";
    }

    function matchesFilters(card) {
      const q = document.getElementById("search").value.trim().toLowerCase();
      const cat = document.getElementById("filter-category").value;
      const st = document.getElementById("filter-status").value;
      if (cat && card.category !== cat) return false;
      if (st === "unset" && card.status) return false;
      if (st && st !== "unset" && card.status !== st) return false;
      if (!q) return true;
      return (
        card.label.toLowerCase().includes(q) ||
        card.slug.toLowerCase().includes(q) ||
        card.pickId.toLowerCase().includes(q) ||
        (card.sectionLabel || "").toLowerCase().includes(q)
      );
    }

    function setStatus(pickId, status) {
      const card = state.get(pickId);
      if (!card) return;
      card.status = card.status === status ? "" : status;
      persistLocal();
      render();
    }

    function renderCard(card) {
      const el = document.createElement("article");
      el.className = "card";
      el.dataset.status = card.status || "";
      el.dataset.pickId = card.pickId;
      if (!matchesFilters(card)) el.classList.add("hidden");

      const img = document.createElement("img");
      img.src = encodeURI(card.imageUrl);
      img.alt = card.label;
      img.loading = "lazy";
      img.onerror = () => {
        img.alt = "Imagen no encontrada";
        img.style.opacity = "0.35";
      };

      const thumb = document.createElement("div");
      thumb.className = "thumb-wrap";
      thumb.appendChild(img);

      const title = document.createElement("input");
      title.className = "title-input";
      title.value = card.label;
      title.addEventListener("input", () => {
        card.label = title.value;
        persistLocal();
        updateStats();
      });

      const notes = document.createElement("textarea");
      notes.className = "notes-input";
      notes.placeholder = "Notas (opcional)";
      notes.value = card.notes || "";
      notes.addEventListener("input", () => {
        card.notes = notes.value;
        persistLocal();
      });

      const slug = document.createElement("div");
      slug.className = "slug";
      slug.textContent = card.pickId;

      const actions = document.createElement("div");
      actions.className = "actions";
      for (const [label, value, cls] of [
        ["Keep", "keep", "active-keep"],
        ["Redo", "redo", "active-redo"],
        ["Digitalizar", "digitalizar", "active-digitalizar"],
        ["Papelera", "papelera", "active-papelera"],
      ]) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = label;
        if (card.status === value) btn.classList.add(cls);
        btn.addEventListener("click", () => setStatus(card.pickId, value));
        actions.appendChild(btn);
      }

      const meta = document.createElement("div");
      meta.className = "meta";
      meta.append(slug, title, notes, actions);
      el.append(thumb, meta);
      return el;
    }

    function render() {
      const main = document.getElementById("main");
      main.innerHTML = "";
      const rows = [...state.values()];
      let anyVisible = false;

      const byCategory = new Map();
      for (const card of rows) {
        if (!byCategory.has(card.category)) byCategory.set(card.category, []);
        byCategory.get(card.category).push(card);
      }

      for (const category of ["self-care", "home", "activity"]) {
        const catCards = byCategory.get(category) || [];
        if (!catCards.length) continue;

        const catBlock = document.createElement("section");
        catBlock.className = "category-block";
        const catTitle = document.createElement("h2");
        catTitle.className = "category-title";
        catTitle.textContent = catCards[0].categoryLabel + " (" + category + ")";
        catBlock.appendChild(catTitle);

        const bySection = new Map();
        for (const card of catCards) {
          const key = card.sectionId + "::" + card.sectionLabel;
          if (!bySection.has(key)) bySection.set(key, []);
          bySection.get(key).push(card);
        }

        for (const [, sectionCards] of bySection) {
          const sectionBlock = document.createElement("div");
          sectionBlock.className = "section-block";
          const sectionTitle = document.createElement("h3");
          sectionTitle.className = "section-title";
          sectionTitle.textContent = sectionCards[0].sectionLabel;
          sectionBlock.appendChild(sectionTitle);

          const bySubgroup = new Map();
          for (const card of sectionCards) {
            const sg = card.subgroupLabel || "";
            if (!bySubgroup.has(sg)) bySubgroup.set(sg, []);
            bySubgroup.get(sg).push(card);
          }

          for (const [sg, sgCards] of bySubgroup) {
            if (sg) {
              const sgTitle = document.createElement("div");
              sgTitle.className = "subgroup-title";
              sgTitle.textContent = sg;
              sectionBlock.appendChild(sgTitle);
            }
            const grid = document.createElement("div");
            grid.className = "grid";
            for (const card of sgCards) {
              const el = renderCard(card);
              if (!el.classList.contains("hidden")) anyVisible = true;
              grid.appendChild(el);
            }
            sectionBlock.appendChild(grid);
          }
          catBlock.appendChild(sectionBlock);
        }
        main.appendChild(catBlock);
      }

      if (!anyVisible) {
        const empty = document.createElement("p");
        empty.className = "empty-msg";
        empty.textContent = "Ninguna tarjeta coincide con los filtros.";
        main.appendChild(empty);
      }
      updateStats();
    }

    document.getElementById("search").addEventListener("input", render);
    document.getElementById("filter-category").addEventListener("change", render);
    document.getElementById("filter-status").addEventListener("change", render);
    document.getElementById("btn-save-local").addEventListener("click", () => {
      persistLocal();
      alert("Guardado en este navegador.");
    });
    document.getElementById("btn-export").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(exportPayload(), null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "card-review-" + new Date().toISOString().slice(0, 10) + ".json";
      a.click();
      URL.revokeObjectURL(a.href);
    });
    document.getElementById("btn-import-label").addEventListener("click", () => {
      document.getElementById("btn-import").click();
    });
    document.getElementById("btn-import").addEventListener("change", async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        for (const row of data.cards || []) {
          const cur = state.get(row.pickId);
          if (!cur) continue;
          if (row.label != null) cur.label = row.label;
          if (row.status != null) cur.status = row.status;
          if (row.notes != null) cur.notes = row.notes;
        }
        persistLocal();
        render();
        alert("JSON cargado.");
      } catch (err) {
        alert("No se pudo leer el JSON.");
      }
      e.target.value = "";
    });

    loadSaved();
    render();
  </script>
</body>
</html>`;
}

const catalog = loadCatalogJson();
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, buildHtml(catalog), "utf8");
console.log(`Wrote ${outFile} (${catalog.cards.length} cards)`);
