import type { DayCentreLibrarySectionId } from "@/lib/cards/day-centre-library-sections";
import { dayCentreLibraryGroupFromSectionId } from "@/lib/cards/day-centre-library-sections";
import {
  effectiveDigitalUiLang,
  type CardLanguageCode,
} from "@/lib/preferences/card-language-preference";
import {
  libraryAirportHotelLabel,
  libraryDayCentreIkramLabel,
  libraryDayCentreSerineLabel,
  libraryDayCentreAyaanLabel,
  libraryDayCentreEmmanuelLabel,
  libraryDayCentreCyrusLabel,
  libraryDayCentreTimiLabel,
  libraryDayCentreFolderLabel,
} from "@/lib/i18n/pixto-digital-locale";
import type { DayCentreLibraryGroup } from "@/lib/cards/day-centre-library-groups";
import type { IkramLibraryGroup } from "@/lib/cards/ikram-library-groups";
import type { MiniGymLibraryDimension } from "@/lib/cards/mini-gym-library-groups";
import type { PhysicalLibraryGroup } from "@/lib/cards/physical-library-groups";
import type { DayCentreFolderId } from "@/lib/routines/day-centre-folders";
import type { RoutineVisualTone } from "@/lib/utils/routine-accent";

function isEs(lang: CardLanguageCode): boolean {
  return effectiveDigitalUiLang(lang) === "es";
}

export type BottomNavKey = "home" | "library" | "templates" | "saved" | "menu";

export function bottomNavLabel(key: BottomNavKey, lang: CardLanguageCode): string {
  if (!isEs(lang)) {
    const en: Record<BottomNavKey, string> = {
      home: "Home",
      library: "Library",
      templates: "Templates",
      saved: "Saved",
      menu: "Menu",
    };
    return en[key];
  }
  const es: Record<BottomNavKey, string> = {
    home: "Inicio",
    library: "Biblioteca",
    templates: "Plantillas",
    saved: "Guardados",
    menu: "Menú",
  };
  return es[key];
}

export type DashboardPackCategory = "self-care" | "home" | "activity";

export function dashboardPackCategoryTitle(
  cat: DashboardPackCategory,
  lang: CardLanguageCode,
): string {
  if (!isEs(lang)) {
    const en: Record<DashboardPackCategory, string> = {
      "self-care": "Self care",
      home: "Home",
      activity: "Sports",
    };
    return en[cat];
  }
  const es: Record<DashboardPackCategory, string> = {
    "self-care": "Cuidado personal",
    home: "Casa",
    activity: "Deportes",
  };
  return es[cat];
}

export function dashboardRoutinesSectionTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Rutinas" : "Routines";
}

export function dashboardExtrasSectionTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Centro de día" : "Day centre";
}

export function dashboardTailoredSchedulesSectionTitle(
  lang: CardLanguageCode,
): string {
  return isEs(lang) ? "Rutinas a medida" : "Tailored schedules";
}

export function tailoredParticipantSchedulesIntro(
  participantName: string,
  lang: CardLanguageCode,
): string {
  if (!isEs(lang)) {
    return `Choose a schedule for ${participantName}. More can be added over time.`;
  }
  return `Elige una rutina para ${participantName}. Se irán añadiendo más con el tiempo.`;
}

export function dayCentreFolderSchedulesIntro(
  folderName: string,
  lang: CardLanguageCode,
  folderId?: DayCentreFolderId,
): string {
  if (folderId === "mixed") {
    if (!isEs(lang)) {
      return "Schedules built in Planner by staff. You can delete them at any time.";
    }
    return "Rutinas creadas en el Planner por el equipo. Se pueden borrar en cualquier momento.";
  }
  if (!isEs(lang)) {
    return `Choose a ${folderName} schedule. More can be added over time.`;
  }
  return `Elige una rutina de ${folderName}. Se irán añadiendo más con el tiempo.`;
}

export function dayCentreMixedFolderEmptyLead(lang: CardLanguageCode): string {
  if (!isEs(lang)) {
    return "No staff schedules yet. Open Planner, pick cards from the library, and save a routine — it will appear here.";
  }
  return "Aún no hay rutinas del equipo. Abre el Planner, elige tarjetas en la biblioteca y guarda — aparecerá aquí.";
}

export function dayCentreMixedOpenPlannerButton(lang: CardLanguageCode): string {
  return isEs(lang) ? "Abrir Planner" : "Open Planner";
}

export function dayCentreMixedDeleteScheduleButton(lang: CardLanguageCode): string {
  return isEs(lang) ? "Borrar" : "Delete";
}

export function dayCentreFoldersIntro(lang: CardLanguageCode): string {
  if (!isEs(lang)) {
    return "Choose a folder — mini gym, bouldering, cooking, community outings, or staff schedules in Mixed.";
  }
  return "Elige una carpeta — mini gym, boulder, cocina, salidas a la comunidad, o rutinas del equipo en Mixta.";
}

export function dashboardPhysicalActivitySectionTitle(
  lang: CardLanguageCode,
): string {
  return isEs(lang) ? "Actividad física" : "Physical Activity";
}

export function dashboardSchedulePlayerTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Reproductor de rutina" : "Schedule Player";
}

export function dashboardAllRoutinesLink(lang: CardLanguageCode): string {
  return isEs(lang) ? "Todas las rutinas" : "All routines";
}

export function dashboardContinueLabel(lang: CardLanguageCode): string {
  return isEs(lang) ? "Continuar" : "Continue";
}

export function dashboardFeaturedStepsHint(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "pasos · abre Enfoque cuando quieras"
    : "steps · tap for Focus anytime";
}

export function dashboardStepsWord(lang: CardLanguageCode): string {
  return isEs(lang) ? "pasos" : "steps";
}

export function dashboardRoutineCountLabel(
  count: number,
  lang: CardLanguageCode,
): string {
  if (!isEs(lang)) {
    return `${count} ${count === 1 ? "routine" : "routines"}`;
  }
  return `${count} ${count === 1 ? "rutina" : "rutinas"}`;
}

export function dashboardHeaderHome(lang: CardLanguageCode): string {
  return isEs(lang) ? "Inicio" : "Home";
}

export function dashboardFirstThenCardEyebrow(lang: CardLanguageCode): string {
  return isEs(lang) ? "Primero / Después" : "First & Then";
}

export function dashboardFirstThenCardTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Solo dos pasos" : "Two steps only";
}

export function dashboardFirstThenMuchieHomeTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Casa con Muchie" : "Home with Muchie";
}

export function dashboardFirstThenMuchieHomeHint(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Taxi y casa — demo Primero / Después"
    : "Cab and home — First & Then demo";
}

export function firstThenDemoIkramHomeThenTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "casa con muchie" : "home with muchie";
}

export function ikramFirstThenPackTitle(
  packId: "ikram-sit-walk" | "ikram-toilet-hub" | "ikram-cab-home",
  lang: CardLanguageCode,
): string {
  if (packId === "ikram-sit-walk") {
    return isEs(lang) ? "Sentarse → Caminar" : "Sit down → Walk";
  }
  if (packId === "ikram-toilet-hub") {
    return isEs(lang) ? "Baño → Sala hub" : "Toilet → Hub room";
  }
  return isEs(lang) ? "Taxi → Casa con Muchie" : "Cab → Home with Muchie";
}

export function playerKindFirstThen(lang: CardLanguageCode): string {
  return isEs(lang) ? "Primero / Después" : "First & Then";
}

export function dashboardNoPreview(lang: CardLanguageCode): string {
  return isEs(lang) ? "Sin vista previa" : "No preview";
}

export function accordionOpenCloseAria(open: boolean, lang: CardLanguageCode): string {
  if (!isEs(lang)) return open ? "Close" : "Open";
  return open ? "Cerrar" : "Abrir";
}

export type LibraryPackSectionId =
  | "bt"
  | "shower"
  | "dress-on"
  | "dress-off"
  | "core"
  | "airport"
  | "hotel"
  | "dcfolderminigym"
  | "dcfolderbouldering"
  | "dcfolderpremium"
  | DayCentreLibrarySectionId
  | "dcikram"
  | "dcserine"
  | "dcayaan"
  | "dcemmanuel"
  | "dccyrus"
  | "dctimi"
  | "physical"
  | "climb"
  | "swim";

export function libraryPackSectionTitle(
  section: LibraryPackSectionId,
  lang: CardLanguageCode,
): string {
  if (section === "airport") return libraryAirportHotelLabel("airport", lang);
  if (section === "hotel") return libraryAirportHotelLabel("hotel", lang);
  if (section === "dcfolderminigym")
    return libraryDayCentreFolderLabel("mini-gym", lang);
  if (section === "dcfolderbouldering")
    return libraryDayCentreFolderLabel("bouldering", lang);
  const dayCentreGroup = dayCentreLibraryGroupFromSectionId(section);
  if (dayCentreGroup) return dayCentreLibraryGroupLabel(dayCentreGroup, lang);
  if (section === "dcfolderpremium")
    return libraryDayCentreFolderLabel("premium", lang);
  if (section === "dcikram") return libraryDayCentreIkramLabel(lang);
  if (section === "dcserine") return libraryDayCentreSerineLabel(lang);
  if (section === "dcayaan") return libraryDayCentreAyaanLabel(lang);
  if (section === "dcemmanuel") return libraryDayCentreEmmanuelLabel(lang);
  if (section === "dccyrus") return libraryDayCentreCyrusLabel(lang);
  if (section === "dctimi") return libraryDayCentreTimiLabel(lang);
  if (section === "physical") {
    return isEs(lang) ? "Actividad física" : "Physical Activity";
  }
  if (isEs(lang)) {
    switch (section) {
      case "bt":
        return "Lavarse los dientes";
      case "shower":
        return "Ducha";
      case "dress-on":
        return "Vestirse";
      case "dress-off":
        return "Desvestirse";
      case "core":
        return "Básicos";
      case "climb":
        return "Escalada";
      case "swim":
        return "Natación";
      default:
        return section;
    }
  }
  switch (section) {
    case "bt":
      return "Brushing teeth";
    case "shower":
      return "Shower";
    case "dress-on":
      return "Dressing";
    case "dress-off":
      return "Undressing";
    case "core":
      return "Core";
    case "climb":
      return "Climbing";
    case "swim":
      return "Swimming";
    default:
      return section;
  }
}

export function libraryStepCountBadge(count: number, lang: CardLanguageCode): string {
  if (!isEs(lang)) {
    return `${count} ${count === 1 ? "step" : "steps"}`;
  }
  return `${count} ${count === 1 ? "paso" : "pasos"}`;
}

export function libraryObjectCountBadge(count: number, lang: CardLanguageCode): string {
  if (!isEs(lang)) {
    return `${count} ${count === 1 ? "object" : "objects"}`;
  }
  return `${count} ${count === 1 ? "objeto" : "objetos"}`;
}

export type ShellHeaderKey =
  | "home"
  | "library"
  | "planner"
  | "schedulePlayer"
  | "menu"
  | "savedLibrary"
  | "routineTemplates"
  | "routineBuilder"
  | "routine"
  | "profile"
  | "generatedCardDemo"
  | "newRoutine"
  | "signIn"
  | "createAccount";

export function shellHeaderTitle(key: ShellHeaderKey, lang: CardLanguageCode): string {
  if (!isEs(lang)) {
    const en: Record<ShellHeaderKey, string> = {
      home: "Home",
      library: "Library",
      planner: "Planner",
      schedulePlayer: "Schedule Player",
      menu: "Menu",
      savedLibrary: "Saved library",
      routineTemplates: "Routine templates",
      routineBuilder: "Routine builder",
      routine: "Routine",
      profile: "Profile",
      generatedCardDemo: "Generated card demo",
      newRoutine: "New routine",
      signIn: "Sign in",
      createAccount: "Create account",
    };
    return en[key];
  }
  const es: Record<ShellHeaderKey, string> = {
    home: "Inicio",
    library: "Biblioteca",
    planner: "Planner",
    schedulePlayer: "Reproductor de rutina",
    menu: "Menú",
    savedLibrary: "Guardados",
    routineTemplates: "Plantillas de rutina",
    routineBuilder: "Editor de rutinas",
    routine: "Rutina",
    profile: "Perfil",
    generatedCardDemo: "Demo tarjeta generada",
    newRoutine: "Nueva rutina",
    signIn: "Entrar",
    createAccount: "Crear cuenta",
  };
  return es[key];
}

export type MenuSectionKey = "routines" | "prototype";

export function menuSectionTitle(key: MenuSectionKey, lang: CardLanguageCode): string {
  return isEs(lang)
    ? key === "routines"
      ? "Rutinas"
      : "Flujos de prototipo"
    : key === "routines"
      ? "Routines"
      : "Prototype flows";
}

export type MenuLinkKey =
  | "planner"
  | "schedulePlayer"
  | "routineBuilder"
  | "firstThen"
  | "firstThenDemo"
  | "generatedCardDemo"
  | "welcome"
  | "auth"
  | "profile";

export function menuLinkLabel(key: MenuLinkKey, lang: CardLanguageCode): string {
  if (!isEs(lang)) {
    const en: Record<MenuLinkKey, string> = {
      planner: "Staff Planner",
      schedulePlayer: "Schedule Player",
      routineBuilder: "Routine builder",
      firstThen: "First & Then",
      firstThenDemo: "First & Then demo",
      generatedCardDemo: "Generated card demo",
      welcome: "Welcome",
      auth: "Sign in / Sign up",
      profile: "Profile setup",
    };
    return en[key];
  }
  const es: Record<MenuLinkKey, string> = {
    planner: "Planner staff",
    schedulePlayer: "Reproductor de rutina",
    routineBuilder: "Editor de rutinas",
    firstThen: "Primero / Después",
    firstThenDemo: "Demo Primero / Después",
    generatedCardDemo: "Demo tarjeta generada",
    welcome: "Bienvenida",
    auth: "Entrar / Registro",
    profile: "Configurar perfil",
  };
  return es[key];
}

export function menuLinkHint(key: MenuLinkKey, lang: CardLanguageCode): string {
  if (!isEs(lang)) {
    const en: Record<MenuLinkKey, string> = {
      planner: "Filtered library · build routines for your participants",
      schedulePlayer: "Pick a routine · vertical flow",
      routineBuilder: "Mock steps & titles",
      firstThen: "Two-card strip",
      firstThenDemo: "Landscape digital wow study",
      generatedCardDemo: "Card geometry, title bands, Focus preview",
      welcome: "Entry screen",
      auth: "UI only · no backend",
      profile: "Name & avatar preview",
    };
    return en[key];
  }
  const es: Record<MenuLinkKey, string> = {
    planner: "Biblioteca filtrada · monta rutinas para tus participantes",
    schedulePlayer: "Elige una rutina · flujo vertical",
    routineBuilder: "Pasos y títulos de prueba",
    firstThen: "Tira de dos tarjetas",
    firstThenDemo: "Estudio digital apaisado",
    generatedCardDemo: "Geometría de tarjeta, títulos, vista Enfoque",
    welcome: "Pantalla de entrada",
    auth: "Solo interfaz · sin servidor",
    profile: "Nombre y vista del avatar",
  };
  return es[key];
}

export function menuIntroBlurb(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Prototipo visual: todos los enlaces funcionan; aún no hay autenticación ni lógica en servidor."
    : "Visual prototype — every link is navigable; no authentication or server logic yet.";
}

export function dashboardQuickBuilderEyebrow(lang: CardLanguageCode): string {
  return isEs(lang) ? "Editor" : "Builder";
}

export function dashboardQuickBuilderTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Editar títulos" : "Edit titles";
}

export function dashboardQuickLibraryTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Tarjetas visuales" : "Visual cards";
}

export function dashboardQuickTemplatesTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Serie y guardadas" : "Stock & saved";
}

export function dashboardQuickSchedulesEyebrow(lang: CardLanguageCode): string {
  return isEs(lang) ? "Inicios rápidos" : "Quick starts";
}

export function dashboardQuickPlannerEyebrow(lang: CardLanguageCode): string {
  return isEs(lang) ? "Staff" : "Staff";
}

export function dashboardQuickPlannerTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Planner" : "Planner";
}

export function dashboardQuickPlannerHint(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Biblioteca filtrada por participante · mismo login que el Portal"
    : "Library filtered by participant · same login as Portal";
}

export function shellBackAria(lang: CardLanguageCode): string {
  return isEs(lang) ? "Volver" : "Back";
}

export function profilePromoSubtitle(
  profile: { sex?: string; heightCm?: number } | null,
  lang: CardLanguageCode,
): string {
  if (!profile) {
    return isEs(lang)
      ? "Foto, nombre y datos · solo en este dispositivo"
      : "Photo, name, and details · stored on this device only";
  }
  const parts: string[] = [];
  if (profile.sex === "male") parts.push(isEs(lang) ? "Niño" : "Boy");
  else if (profile.sex === "female") parts.push(isEs(lang) ? "Niña" : "Girl");
  if (profile.heightCm != null) parts.push(`${profile.heightCm} cm`);
  if (parts.length === 0) {
    return isEs(lang)
      ? "Foto y nombre · solo en este dispositivo"
      : "Photo and name · stored on this device only";
  }
  return `${parts.join(" · ")} · local`;
}

export function profileDisplayNamePlaceholder(lang: CardLanguageCode): string {
  return isEs(lang) ? "Tu perfil" : "Your profile";
}

export function profileAddAvatarHint(lang: CardLanguageCode): string {
  return isEs(lang) ? "Añadir" : "Add";
}

export function libraryIntroBlurb(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Toca las tarjetas para elegirlas en orden (como fotos). Toca la fila de una rutina para abrirla; permanece abierta hasta que pulses la chevron a la derecha. Usa «Nueva rutina» abajo para poner nombre y guardar sin elegir tarjetas aquí primero."
    : "Tap cards to select them in order (like photos). Tap a routine row to open it; it stays open until you tap the chevron on the right. Use New routine below to name and save without picking cards here first.";
}

export function plannerIntroBlurb(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Elige tarjetas para montar una rutina. Solo ves los packs de tu rol: core, ducha, vestirse y los participantes asignados."
    : "Pick cards to build a routine. You only see packs for your role: core, shower, dress, and your assigned participants.";
}

export function plannerLoginTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Planner — staff" : "Planner — staff";
}

export function plannerLoginBlurb(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Si entras desde el Portal con el botón Plan, no hace falta volver a escribir la contraseña. Solo usa este formulario si abres el Planner directamente."
    : "If you open Planner from the Portal Plan button, you should not need to sign in again. Use this form only when opening Planner directly.";
}

export function plannerHandoffSigningIn(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Entrando con tu sesión del Portal…"
    : "Signing in with your Portal session…";
}

export function plannerHandoffFailed(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "No se pudo usar la sesión del Portal. Prueba de nuevo desde el botón Plan o entra con email y contraseña."
    : "Could not use your Portal session. Try again from the Plan button, or sign in with email and password.";
}

export function plannerLoginSubmit(lang: CardLanguageCode): string {
  return isEs(lang) ? "Entrar" : "Sign in";
}

export function plannerLoginPortalLink(lang: CardLanguageCode): string {
  return isEs(lang) ? "Abrir portal staff" : "Open staff portal";
}

export function plannerAccessDenied(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "No tienes acceso al planner. Contacta con un administrador."
    : "You do not have access to the planner. Contact an administrator.";
}

export function plannerSupabaseMissing(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Supabase no está configurado en esta app. Añade las variables de entorno en Vercel."
    : "Supabase is not configured for this app. Add environment variables in Vercel.";
}

export function plannerSignOut(lang: CardLanguageCode): string {
  return isEs(lang) ? "Salir" : "Sign out";
}

export function libraryNewRoutineButton(lang: CardLanguageCode): string {
  return isEs(lang) ? "Nueva rutina" : "New routine";
}

export function librarySelectionSummary(count: number, lang: CardLanguageCode): string {
  if (!isEs(lang)) {
    return `${count} selected`;
  }
  return `${count} seleccionado${count === 1 ? "" : "s"}`;
}

export function libraryClearSelection(lang: CardLanguageCode): string {
  return isEs(lang) ? "Borrar" : "Clear";
}

export function libraryCreateRoutine(lang: CardLanguageCode): string {
  return isEs(lang) ? "Crear rutina" : "Create routine";
}

export function librarySubheadingObjects(lang: CardLanguageCode): string {
  return isEs(lang) ? "Objetos" : "Objects";
}

export function librarySubheadingSteps(lang: CardLanguageCode): string {
  return isEs(lang) ? "Pasos" : "Steps";
}

/** Day centre library accordion — thematic sub-headings (cooking, fitness, …). */
export function dayCentreLibraryGroupLabel(
  group: DayCentreLibraryGroup,
  lang: CardLanguageCode,
): string {
  const en: Record<DayCentreLibraryGroup, string> = {
    "mini-gym": "Mini gym",
    "fitness-held": "Fitness — held",
    "materials-kitchen": "Materials — kitchen",
    "materials-art": "Materials — art & craft",
    technology: "Technology",
    "activities-cognitive": "Activities — puzzles & matching",
    "activities-cooking": "Activities — cooking & art",
    "personal-care": "Personal care",
    community: "Community & transport",
    "activities-leisure": "Activities & leisure",
    shopping: "Shopping",
    "food-drink": "Food & drink",
    communication: "Communication",
    "places-extras": "Places & extras",
  };
  const es: Record<DayCentreLibraryGroup, string> = {
    "mini-gym": "Mini gym",
    "fitness-held": "Fitness — reservado",
    "materials-kitchen": "Materiales — cocina",
    "materials-art": "Materiales — arte y manualidades",
    technology: "Tecnología",
    "activities-cognitive": "Actividades — puzzles y clasificación",
    "activities-cooking": "Actividades — cocina y arte",
    "personal-care": "Cuidado personal",
    community: "Comunidad y transporte",
    "activities-leisure": "Actividades y ocio",
    shopping: "Compras",
    "food-drink": "Comida y bebida",
    communication: "Comunicación",
    "places-extras": "Lugares y extras",
  };
  return isEs(lang) ? es[group] : en[group];
}

export function physicalLibraryGroupLabel(
  group: PhysicalLibraryGroup,
  lang: CardLanguageCode,
): string {
  if (group === "3d") {
    return isEs(lang) ? "Actividad física (3D)" : "Physical Activity (3D)";
  }
  return isEs(lang) ? "Actividad física (3D)" : "Physical Activity (3D)";
}

/** Library pick tile footer — pack dimension ribbon (Physical · Mini gym · …). */
export function libraryPickRibbonCategory(
  pickId: string,
  lang: CardLanguageCode,
): string | null {
  const ns = pickId.split("::")[0]?.toLowerCase() ?? "";
  if (ns === "phy2d") return physicalLibraryGroupLabel("3d", lang);
  if (ns === "phy3d" || ns === "phy3g") return physicalLibraryGroupLabel("3d", lang);
  if (ns === "mg3d") return miniGymLibraryGroupLabel("3d", lang);
  return null;
}

/** @deprecated Use {@link libraryPickRibbonCategory}. */
export const physicalLibraryPickRibbonCategory = libraryPickRibbonCategory;

export function miniGymLibraryGroupLabel(
  _dimension: MiniGymLibraryDimension,
  lang: CardLanguageCode,
): string {
  return isEs(lang) ? "Mini gym (3D)" : "Mini Gym (3D)";
}

export function ikramLibraryGroupLabel(
  group: IkramLibraryGroup,
  lang: CardLanguageCode,
): string {
  const en: Record<IkramLibraryGroup, string> = {
    "scene-cards": "Scene cards (PECS grid)",
    "mon-wed-fri-schedule": "Mon / Wed / Fri schedule",
    "saturday-schedule": "Saturday schedule",
    "photo-cards": "Photo library",
  };
  const es: Record<IkramLibraryGroup, string> = {
    "scene-cards": "Tarjetas escena (PECS)",
    "mon-wed-fri-schedule": "Rutina lunes / miércoles / viernes",
    "saturday-schedule": "Rutina del sábado",
    "photo-cards": "Biblioteca de fotos",
  };
  return isEs(lang) ? es[group] : en[group];
}

export function menuFocusModeLabel(lang: CardLanguageCode): string {
  return isEs(lang) ? "Modo Enfoque" : "Focus Mode";
}

/** Text after the bold label, before the Saved link. */
export function menuFocusModeBeforeSavedLink(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "se abre desde una rutina activa en el Reproductor de rutina (pantalla completa, menos pestañas). Las rutinas guardadas están en la pestaña "
    : "opens from an active routine in Schedule Player (fullscreen, fewer tabs). Saved routines live under the ";
}

/** Text after the Saved link (English includes “tab”). */
export function menuFocusModeAfterSavedLink(lang: CardLanguageCode): string {
  return isEs(lang) ? "." : " tab.";
}

export function templatesIntroBlurb(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Toca una plantilla para abrirla en el editor, o ejecútala desde el reproductor cuando la guardes."
    : "Tap a template to open it in the builder, or run it directly from the schedule player when you save.";
}

export function templatesEyebrow(lang: CardLanguageCode): string {
  return isEs(lang) ? "Plantilla" : "Template";
}

export function templatesCustomizeCta(lang: CardLanguageCode): string {
  return isEs(lang) ? "Personalizar en el editor →" : "Customize in builder →";
}

export function templatesPageLinkWord(lang: CardLanguageCode): string {
  return isEs(lang) ? "plantillas" : "templates";
}

export function savedIntroBlurb(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Marca rutinas de los datos de prueba o de tus borradores del editor: se guardan en este dispositivo (V1) hasta que llegue la sincronización."
    : "Star routines from mock data or your builder drafts — stored locally in V1 until Supabase sync lands.";
}

export function savedFooterLead(lang: CardLanguageCode): string {
  return isEs(lang) ? "¿Quieres más estructura? Explora" : "Want more structure? Browse";
}

export function savedFooterMid(lang: CardLanguageCode): string {
  return isEs(lang) ? "o abre el" : "or open the";
}

export function authLayoutNote(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Solo maquetación: enviar no crea sesión ni llama a ninguna API."
    : "Layout prototype only — submitting does not create a session or call any API.";
}

export function authTabSignIn(lang: CardLanguageCode): string {
  return isEs(lang) ? "Entrar" : "Sign in";
}

export function authTabSignUp(lang: CardLanguageCode): string {
  return isEs(lang) ? "Registro" : "Sign up";
}

export function authEmailLabel(lang: CardLanguageCode): string {
  return isEs(lang) ? "Correo" : "Email";
}

export function authPasswordLabel(lang: CardLanguageCode): string {
  return isEs(lang) ? "Contraseña" : "Password";
}

export function authSubmitSignIn(lang: CardLanguageCode): string {
  return isEs(lang) ? "Continuar" : "Continue";
}

export function authSubmitSignUp(lang: CardLanguageCode): string {
  return isEs(lang) ? "Crear cuenta" : "Create account";
}

export function authTermsPlaceholder(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Texto legal de ejemplo solo para el espaciado del diseño."
    : "Placeholder terms copy for layout spacing.";
}

export function playerIndexIntro(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Rutinas que has abierto en este dispositivo. Toca una para continuar o usa ✕ para quitarla de la lista."
    : "Routines you have opened on this device. Tap one to continue, or use ✕ to remove it from the list.";
}

export function playerIndexEmptyTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Aún no hay rutinas" : "No routines yet";
}

export function playerIndexEmptyBody(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Abre una rutina desde Inicio o la Biblioteca. Aparecerá aquí la próxima vez."
    : "Open a routine from Home or the Library. It will show up here next time.";
}

export function playerRemoveFromListAria(lang: CardLanguageCode): string {
  return isEs(lang) ? "Quitar de la lista" : "Remove from list";
}

export function playerIndexEmptyHomeLink(lang: CardLanguageCode): string {
  return isEs(lang) ? "Ir a Inicio" : "Go to Home";
}

export function playerKindTemplate(lang: CardLanguageCode): string {
  return dashboardFirstThenCardEyebrow(lang);
}

export function playerKindRoutine(lang: CardLanguageCode): string {
  return isEs(lang) ? "Rutina" : "Routine";
}

export function listJoinAnd(lang: CardLanguageCode): string {
  return isEs(lang) ? "y" : "and";
}

export function formatListWithAnd(
  labels: string[],
  lang: CardLanguageCode,
): string {
  if (labels.length === 0) return "";
  if (labels.length === 1) return labels[0];
  const j = listJoinAnd(lang);
  if (labels.length === 2) return `${labels[0]} ${j} ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")} ${j} ${labels.at(-1)}`;
}

export function playerRoutineToneShortLabel(
  tone: RoutineVisualTone,
  lang: CardLanguageCode,
): string {
  if (!isEs(lang)) {
    const en: Partial<Record<RoutineVisualTone, string>> = {
      brushing: "Brushing teeth",
      shower: "Shower",
      climbing: "Climbing",
      dress: "Dressing",
      core: "Core",
      swimming: "Swimming",
      airport: "Airport",
      hotel: "Hotel",
      daycentre: "Day centre",
      tailored: "Tailored schedules",
      physical: "Physical Activity",
      finish: "Finish",
      custom: "Custom",
      default: "Routine",
    };
    return en[tone] ?? tone;
  }
  const es: Partial<Record<RoutineVisualTone, string>> = {
    brushing: "Lavarse los dientes",
    shower: "Ducha",
    climbing: "Escalada",
    dress: "Vestirse",
    core: "Básicos",
    swimming: "Natación",
    airport: "Aeropuerto",
    hotel: "Hotel",
    daycentre: "Centro de día",
    tailored: "Rutinas a medida",
    physical: "Actividad física",
    finish: "Fin",
    custom: "Personalizado",
    default: "Rutina",
  };
  return es[tone] ?? tone;
}

export function playerLoadingSchedule(lang: CardLanguageCode): string {
  return isEs(lang) ? "Cargando rutina…" : "Loading schedule…";
}

export function playerNotFound(lang: CardLanguageCode): string {
  return isEs(lang) ? "Rutina no encontrada." : "Routine not found.";
}

export function playerBackToSchedule(lang: CardLanguageCode): string {
  return isEs(lang) ? "Volver al reproductor" : "Back to Schedule Player";
}

export function routineNewIntro(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Pon nombre a la rutina, reordena los pasos y guarda en este dispositivo. Si entraste sin elegir tarjetas, ve a Biblioteca, toca las tarjetas que quieras y luego pulsa «Crear rutina»."
    : "Name the routine, reorder the steps, and save on this device. If you opened this without picking cards, go to Library, tap the cards you want, then tap Create routine in the header.";
}

export function routineNewEmptyLead(lang: CardLanguageCode): string {
  return isEs(lang) ? "No hay tarjetas seleccionadas. Ve a" : "No cards selected. Go to";
}

export function routineNewEmptyAfterLibrary(lang: CardLanguageCode): string {
  return isEs(lang) ? ", toca" : ", tap";
}

export function routineNewEmptySelectWord(lang: CardLanguageCode): string {
  return isEs(lang) ? "Seleccionar" : "Select";
}

export function routineNewEmptyAfterSelect(lang: CardLanguageCode): string {
  return isEs(lang) ? ", elige tarjetas y luego" : ", choose cards, then";
}

export function routineNewEmptyCreateWord(lang: CardLanguageCode): string {
  return isEs(lang) ? "Crear rutina" : "Create routine";
}

export function routineNewNameFieldLabel(lang: CardLanguageCode): string {
  return isEs(lang) ? "Nombre de la rutina" : "Routine name";
}

export function routineNewNamePlaceholder(lang: CardLanguageCode): string {
  return isEs(lang) ? "Nombre" : "Name";
}

export function routineTimerDefaultLabel(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Temporizador por defecto (todos los pasos)"
    : "Default timer (all steps)";
}

export function routineTimerStepLabel(lang: CardLanguageCode): string {
  return isEs(lang) ? "Temporizador" : "Timer";
}

export function focusModeOptTimerHint(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Sustituye el logo de la tarjeta (arriba a la derecha) con el color de la categoría"
    : "Replaces the card logo (top-right) using the category colour";
}

export function schedulePlayerAddCardButton(lang: CardLanguageCode): string {
  return isEs(lang) ? "Añadir" : "Add";
}

export function scheduleCardSearchTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Añadir tarjeta" : "Add card";
}

export function scheduleCardSearchHint(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Escribe una palabra (p. ej. snack, toilet, treadmill…)"
    : "Type a word (e.g. snack, toilet, treadmill…)";
}

export function scheduleCardSearchPlaceholder(lang: CardLanguageCode): string {
  return isEs(lang) ? "Buscar tarjeta…" : "Search cards…";
}

export function scheduleCardSearchEmpty(
  lang: CardLanguageCode,
  query: string,
): string {
  return isEs(lang)
    ? `Ninguna tarjeta para «${query}»`
    : `No cards for “${query}”`;
}

export function scheduleCardSearchClose(lang: CardLanguageCode): string {
  return isEs(lang) ? "Cerrar" : "Close";
}

export function schedulePlayerTimerButton(lang: CardLanguageCode): string {
  return isEs(lang) ? "Temporizador" : "Timer";
}

export function routineTimerOffLabel(lang: CardLanguageCode): string {
  return isEs(lang) ? "Sin tiempo" : "Off";
}

export function routineTimerUseDefaultLabel(lang: CardLanguageCode): string {
  return isEs(lang) ? "Por defecto" : "Default";
}

export function scheduleStepTimerAria(
  remainingSec: number,
  lang: CardLanguageCode,
): string {
  const mins = Math.floor(Math.max(0, remainingSec) / 60);
  const secs = Math.max(0, remainingSec) % 60;
  if (!isEs(lang)) {
    if (remainingSec <= 0) return "Timer finished";
    if (mins > 0) return `${mins} minutes ${secs} seconds remaining`;
    return `${secs} seconds remaining`;
  }
  if (remainingSec <= 0) return "Temporizador terminado";
  if (mins > 0) return `${mins} minutos y ${secs} segundos restantes`;
  return `${secs} segundos restantes`;
}

export function routineNewStepsHeading(count: number, lang: CardLanguageCode): string {
  if (!isEs(lang)) return `Steps (${count})`;
  return `Pasos (${count})`;
}

export function routineNewStepOrdinal(indexOneBased: number, lang: CardLanguageCode): string {
  if (!isEs(lang)) return `Step ${indexOneBased}`;
  return `Paso ${indexOneBased}`;
}

export function routineNewMoveUpAria(lang: CardLanguageCode): string {
  return isEs(lang) ? "Subir" : "Move up";
}

export function routineNewMoveDownAria(lang: CardLanguageCode): string {
  return isEs(lang) ? "Bajar" : "Move down";
}

export function routineNewRemoveAria(lang: CardLanguageCode): string {
  return isEs(lang) ? "Quitar" : "Remove";
}

export function routineNewSaveButton(lang: CardLanguageCode): string {
  return isEs(lang) ? "Guardar rutina en el dispositivo" : "Save routine locally";
}

export function tailoredAddScheduleButton(lang: CardLanguageCode): string {
  return isEs(lang) ? "Añadir rutina" : "Add schedule";
}

export function tailoredEditScheduleButton(lang: CardLanguageCode): string {
  return isEs(lang) ? "Editar" : "Edit";
}

export function tailoredPickCardsHint(
  participantName: string,
  lang: CardLanguageCode,
): string {
  if (!isEs(lang)) {
    return `Pick cards in ${participantName}'s library folder, then name and save — or edit a saved schedule below.`;
  }
  return `Elige tarjetas en la carpeta de ${participantName}, pon nombre y guarda — o edita una rutina guardada abajo.`;
}

export function tailoredAddCardsFromLibrary(lang: CardLanguageCode): string {
  return isEs(lang) ? "Elegir tarjetas en biblioteca" : "Pick cards in library";
}

export function routineNewBackToLibrary(lang: CardLanguageCode): string {
  return isEs(lang) ? "Volver a la biblioteca" : "Back to library";
}

export function routineFromLibraryDescription(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Creada desde la biblioteca visual"
    : "Created from Visual library";
}

export type WelcomeFeatureSlot = "home" | "focus";

export function welcomeHeroTitle(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Agendas visuales que se sienten estables\nen el móvil o la tablet"
    : "Visual schedules that feel steady\non the phone or tablet";
}

export function welcomeFeatureTitle(
  slot: WelcomeFeatureSlot,
  lang: CardLanguageCode,
): string {
  if (slot === "home") return isEs(lang) ? "Inicio" : "Home";
  return isEs(lang) ? "Modo Enfoque" : "Focus Mode";
}

export function welcomeFeatureBody(
  slot: WelcomeFeatureSlot,
  lang: CardLanguageCode,
): string {
  if (!isEs(lang)) {
    if (slot === "home") {
      return "Routines by category — quick access to Library, Templates, and more from the tab bar.";
    }
    return "A larger single-card view that cuts distractions when the routine needs full attention.";
  }
  if (slot === "home") {
    return "Rutinas por categoría: acceso rápido a Biblioteca, Plantillas y más desde la barra inferior.";
  }
  return "Vista de una sola tarjeta más grande que reduce distracciones cuando la rutina necesita toda la atención.";
}

export function welcomeFeaturePreviewAlt(
  slot: WelcomeFeatureSlot,
  lang: CardLanguageCode,
): string {
  if (!isEs(lang)) {
    if (slot === "home") {
      return "Welcome preview — home screen in English (hotel routines)";
    }
    return "Welcome preview — hotel routine card in English";
  }
  if (slot === "home") {
    return "Vista previa de bienvenida — inicio en español (rutinas hotel)";
  }
  return "Vista previa de bienvenida — tarjeta de rutina hotel en español";
}

export function welcomeHomeCta(lang: CardLanguageCode): string {
  return bottomNavLabel("home", lang);
}

export function welcomeSignInCta(lang: CardLanguageCode): string {
  return isEs(lang) ? "Entrar" : "Sign in";
}

export function languageToggleButtonAria(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Idioma: español. Toca para cambiar a inglés"
    : "Language: English. Tap to switch to Spanish";
}

export function languageFlagGroupAria(lang: CardLanguageCode): string {
  return isEs(lang) ? "Elegir idioma" : "Choose language";
}

/** aria-label for the Spanish-flag control (welcome two-button picker). */
export function languageSelectSpanishAria(lang: CardLanguageCode): string {
  if (lang === "es") {
    return isEs(lang) ? "Español, idioma actual" : "Spanish, current language";
  }
  return isEs(lang) ? "Cambiar a español" : "Switch to Spanish";
}

/** aria-label for the UK-flag control (welcome two-button picker). */
export function languageSelectEnglishAria(lang: CardLanguageCode): string {
  if (lang === "en") {
    return isEs(lang) ? "Inglés, idioma actual" : "English, current language";
  }
  return isEs(lang) ? "Cambiar a inglés" : "Switch to English";
}

const WELCOME_HOTEL_PREVIEW_DIR = "at the hotel";

function welcomeHotelPreviewFile(file: string): string {
  return `/cards/${encodeURIComponent(WELCOME_HOTEL_PREVIEW_DIR)}/${encodeURIComponent(file)}`;
}

export function welcomeFeaturePreviewSrc(
  slot: WelcomeFeatureSlot,
  lang: CardLanguageCode,
): string {
  const es = isEs(lang);
  if (slot === "home") {
    return es
      ? welcomeHotelPreviewFile("PANTALLA 1 ESPANOL.png")
      : welcomeHotelPreviewFile("PANTALLA 1 INGLES.png");
  }
  return es
    ? welcomeHotelPreviewFile("PANTALLA 2 ESPANOL.png")
    : welcomeHotelPreviewFile("PANTALLA 2 INGLES.png");
}

export function welcomePreviewExpandHint(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Doble pulsación para ver la captura a tamaño completo"
    : "Double-click to view the screenshot full size";
}

export function welcomePreviewLightboxCloseAria(lang: CardLanguageCode): string {
  return isEs(lang) ? "Cerrar vista ampliada" : "Close enlarged view";
}

export type FirstThenSlot = "first" | "then";

export function firstThenSlotLabel(
  slot: FirstThenSlot,
  lang: CardLanguageCode,
): string {
  if (!isEs(lang)) return slot === "first" ? "First" : "Then";
  return slot === "first" ? "Primero" : "Después";
}

export function firstThenConnectorSymbol(_lang: CardLanguageCode): string {
  return "&";
}

export function firstThenOpenFullRoutine(lang: CardLanguageCode): string {
  return isEs(lang) ? "Abrir rutina completa" : "Open full routine";
}

export function schedulePlayerFocusModeCta(lang: CardLanguageCode): string {
  return isEs(lang) ? "Modo Enfoque" : "Focus Mode";
}

export function schedulePlayerResetCta(lang: CardLanguageCode): string {
  return isEs(lang) ? "Reiniciar" : "Reset";
}

export function schedulePlayerCloseCta(lang: CardLanguageCode): string {
  return isEs(lang) ? "Cerrar" : "Close";
}

export function schedulePlayerNowLabel(lang: CardLanguageCode): string {
  return isEs(lang) ? "Ahora" : "Now";
}

export function schedulePlayerNextLabel(lang: CardLanguageCode): string {
  return isEs(lang) ? "Siguiente" : "Next";
}

export function schedulePlayerCompletedLabel(lang: CardLanguageCode): string {
  return isEs(lang) ? "Hecho" : "Completed";
}

export function schedulePlayerDoneCountLabel(
  completed: number,
  lang: CardLanguageCode,
): string {
  if (!isEs(lang)) return `${completed} done`;
  return `${completed} hecho${completed === 1 ? "" : "s"}`;
}

export function schedulePlayerDoubleTapHint(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Doble toque para girar, o desliza a la derecha"
    : "Double tap to flip, or swipe right";
}

export function schedulePlayerDesktopFocusHint(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Doble clic en la tarjeta, o usa el botón Focus mode abajo"
    : "Double-click the card, or use Focus mode below";
}

export function schedulePlayerRoutineCompleteTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Rutina terminada" : "Routine complete";
}

export function schedulePlayerRoutineCompleteBody(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Todos los pasos están listos. Vuelve a ejecutarla cuando quieras el mismo ritmo tranquilo."
    : "All steps are done. Run again anytime for the same calm rhythm.";
}

export function schedulePlayerRunAgain(lang: CardLanguageCode): string {
  return isEs(lang) ? "Otra vez" : "Run again";
}

export function schedulePlayerDone(lang: CardLanguageCode): string {
  return isEs(lang) ? "Listo" : "Done";
}

export function firstThenDemoPageTitle(lang: CardLanguageCode): string {
  return dashboardFirstThenCardEyebrow(lang);
}

export function firstThenDemoNavAria(lang: CardLanguageCode): string {
  return isEs(lang) ? "Navegación de la demo" : "Demo navigation";
}

export function firstThenDemoFocusModeCta(lang: CardLanguageCode): string {
  return isEs(lang) ? "Modo Enfoque" : "Focus mode";
}

export function firstThenDemoIntroMoreNavAria(lang: CardLanguageCode): string {
  return isEs(lang) ? "Inicio y rutina" : "Home and routine";
}

export function firstThenDemoIntroMoreToggleShow(lang: CardLanguageCode): string {
  return isEs(lang) ? "Mostrar inicio y rutina" : "Show Home and Routine";
}

export function firstThenDemoIntroMoreToggleHide(lang: CardLanguageCode): string {
  return isEs(lang) ? "Ocultar inicio y rutina" : "Hide Home and Routine";
}

export function firstThenDemoRotateForFocusTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Gira el móvil en horizontal" : "Rotate your phone sideways";
}

export function firstThenDemoRotateForFocusBody(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "El Modo Enfoque muestra las dos tarjetas a pantalla completa."
    : "Focus mode shows both cards full screen.";
}

export function focusQuickNavAriaLabel(lang: CardLanguageCode): string {
  return isEs(lang) ? "Accesos rápidos en Modo Enfoque" : "Focus mode quick links";
}

export function focusQuickNavToggleShow(lang: CardLanguageCode): string {
  return isEs(lang) ? "Mostrar accesos rápidos" : "Show quick links";
}

export function focusQuickNavToggleHide(lang: CardLanguageCode): string {
  return isEs(lang) ? "Ocultar accesos rápidos" : "Hide quick links";
}

export function focusModeNothingLeftTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "No queda nada en esta pasada" : "Nothing left in this pass";
}

export function focusModeNothingLeftBody(lang: CardLanguageCode): string {
  return isEs(lang)
    ? "Toca en cualquier sitio para volver a tu rutina."
    : "Tap anywhere to return to your schedule.";
}

export function focusModeAllFinishedTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Todos los pasos terminados" : "All steps finished";
}

export function focusModeReturnScheduleAria(lang: CardLanguageCode): string {
  return isEs(lang) ? "Volver a la rutina" : "Return to schedule";
}

export function focusModeAriaPreviousStep(lang: CardLanguageCode): string {
  return isEs(lang) ? "Paso anterior" : "Previous step";
}

export function focusModeAriaSkipNext(lang: CardLanguageCode): string {
  return isEs(lang) ? "Saltar al siguiente paso" : "Skip to next step";
}

export function focusModeAriaSupportTools(lang: CardLanguageCode): string {
  return isEs(lang) ? "Herramientas de apoyo" : "Support tools";
}

export function focusModeAriaOptions(lang: CardLanguageCode): string {
  return isEs(lang) ? "Opciones" : "Options";
}

export function focusModeSheetSupportTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Apoyo" : "Support";
}

export function focusModeSheetOptionsTitle(lang: CardLanguageCode): string {
  return isEs(lang) ? "Opciones" : "Options";
}

export function focusModeSupportCalmCard(lang: CardLanguageCode): string {
  return isEs(lang) ? "Tarjeta tranquila" : "Calm card";
}

export function focusModeSupportRepeatInstruction(lang: CardLanguageCode): string {
  return isEs(lang) ? "Repetir instrucción" : "Repeat instruction";
}

export function focusModeSupportSimplified(lang: CardLanguageCode): string {
  return isEs(lang) ? "Apoyo simplificado" : "Simplified support";
}

export function focusModeOptExpandedCards(_lang: CardLanguageCode): string {
  return "Expanded Cards";
}

export function focusModeOptBackSchedule(lang: CardLanguageCode): string {
  return isEs(lang) ? "Volver a la rutina" : "Back to schedule";
}

export function focusModeOptFirstThen(lang: CardLanguageCode): string {
  return dashboardFirstThenCardEyebrow(lang);
}

export function focusModeOptRestartRoutine(lang: CardLanguageCode): string {
  return isEs(lang) ? "Reiniciar rutina" : "Restart routine";
}

export function focusModeOptMarkFinished(lang: CardLanguageCode): string {
  return isEs(lang) ? "Marcar como hecho" : "Mark as finished";
}

export function focusModeOptExitFocus(lang: CardLanguageCode): string {
  return isEs(lang) ? "Salir del Modo Enfoque" : "Exit focus mode";
}
