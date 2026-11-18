/**
 * Mémorise si la fenêtre de bienvenue doit être affichée.
 * - fermée par le visiteur : on ne la remontre pas pendant 7 jours ;
 * - formulaire envoyé : on ne la remontre plus jamais.
 */
const KEY = "dahira:welcome:v1";
const REPEAT_AFTER_DAYS = 7;

/** Évite de la réafficher pendant la même visite si le navigateur ne peut pas mémoriser. */
let shownThisVisit = false;

export function shouldShowWelcome(now: number = Date.now()): boolean {
  if (shownThisVisit) return false;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return true;
    if (raw === "registered") return false;
    const dismissedAt = Number(raw);
    return !Number.isFinite(dismissedAt) || now - dismissedAt > REPEAT_AFTER_DAYS * 86_400_000;
  } catch {
    return true;
  }
}

export function markWelcomeShown() {
  shownThisVisit = true;
}

export function dismissWelcome(now: number = Date.now()) {
  shownThisVisit = true;
  try {
    // ne pas écraser « registered » : un membre enregistré ne doit plus jamais revoir la fenêtre
    if (localStorage.getItem(KEY) !== "registered") localStorage.setItem(KEY, String(now));
  } catch {
    /* stockage indisponible : on ignore */
  }
}

export function markRegistered() {
  shownThisVisit = true;
  try {
    localStorage.setItem(KEY, "registered");
  } catch {
    /* stockage indisponible : on ignore */
  }
}
