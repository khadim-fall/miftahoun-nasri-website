import { SITE } from "@/config/site";
import type { DahiraEvent } from "./types";

/** Date du jour (AAAA-MM-JJ) à Dakar, quel que soit le fuseau du visiteur. */
export function todayKey(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE.prayer.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function formatDateParts(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  const month = new Intl.DateTimeFormat("fr-FR", { month: "long", timeZone: "UTC" }).format(d);
  return {
    day: String(d.getUTCDate()),
    month: capitalize(month),
    year: String(d.getUTCFullYear()),
  };
}

export function formatLongDate(iso: string): string {
  const { day, month, year } = formatDateParts(iso);
  return `${day} ${month.toLowerCase()} ${year}`;
}

/** Sépare les événements en "à venir" (du plus proche au plus lointain) et "passés" (du plus récent au plus ancien). */
export function splitEvents(events: DahiraEvent[], today: string = todayKey()) {
  const upcoming = events
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = events
    .filter((e) => e.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}
