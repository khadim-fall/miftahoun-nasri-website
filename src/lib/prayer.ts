import { SITE } from "@/config/site";
import { todayKey } from "./events";

export type PrayerKey = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
export type PrayerTimes = Record<PrayerKey, string>;

export const PRAYER_ORDER: PrayerKey[] = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

export const PRAYER_NAMES: Record<PrayerKey, { ar: string; fr: string }> = {
  fajr: { ar: "الفجر", fr: "Fajr" },
  dhuhr: { ar: "الظهر", fr: "Dhuhr" },
  asr: { ar: "العصر", fr: "Asr" },
  maghrib: { ar: "المغرب", fr: "Maghrib" },
  isha: { ar: "العشاء", fr: "Isha" },
};

/**
 * Anciennes valeurs fixes du site. Elles ne servent plus que si le calcul en ligne est
 * indisponible, et sont alors présentées comme "indicatives".
 */
export const FALLBACK_PRAYER_TIMES: PrayerTimes = {
  fajr: "05:30",
  dhuhr: "13:15",
  asr: "16:30",
  maghrib: "19:05",
  isha: "20:30",
};

const API_NAMES: Record<PrayerKey, string> = {
  fajr: "Fajr",
  dhuhr: "Dhuhr",
  asr: "Asr",
  maghrib: "Maghrib",
  isha: "Isha",
};

function normalizeTime(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const m = /(\d{1,2}):(\d{2})/.exec(value);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
}

/** Extrait les 5 horaires d’une réponse de l’API Aladhan ; renvoie null si la réponse est inattendue. */
export function parseAladhanResponse(json: unknown): PrayerTimes | null {
  const timings = (json as { data?: { timings?: Record<string, unknown> } } | null)?.data?.timings;
  if (!timings || typeof timings !== "object") return null;
  const out = {} as PrayerTimes;
  for (const key of PRAYER_ORDER) {
    const t = normalizeTime(timings[API_NAMES[key]]);
    if (!t) return null;
    out[key] = t;
  }
  return out;
}

function isPrayerTimes(v: unknown): v is PrayerTimes {
  return (
    !!v &&
    typeof v === "object" &&
    PRAYER_ORDER.every((k) => typeof (v as Record<string, unknown>)[k] === "string")
  );
}

const CACHE_KEY = "dahira:prayer-times:v1";

export function peekCachedPrayerTimes(now: Date = new Date()): PrayerTimes | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw) as { date?: string; times?: unknown };
    return entry.date === todayKey(now) && isPrayerTimes(entry.times) ? entry.times : null;
  } catch {
    return null;
  }
}

function writeCache(date: string, times: PrayerTimes) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ date, times }));
  } catch {
    /* stockage indisponible (navigation privée...) : on ignore */
  }
}

async function fetchFromApi(date: string): Promise<PrayerTimes> {
  const { city, country, method } = SITE.prayer;
  const [y, m, d] = date.split("-");
  const url =
    `https://api.aladhan.com/v1/timingsByCity/${d}-${m}-${y}` +
    `?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const times = parseAladhanResponse(await res.json());
    if (!times) throw new Error("Réponse inattendue");
    return times;
  } finally {
    clearTimeout(timer);
  }
}

let inflight: { date: string; promise: Promise<PrayerTimes> } | null = null;

/** Charge les horaires du jour (cache local du jour, requête partagée entre composants). */
export function loadPrayerTimes(now: Date = new Date()): Promise<PrayerTimes> {
  const date = todayKey(now);
  const cached = peekCachedPrayerTimes(now);
  if (cached) return Promise.resolve(cached);
  if (inflight?.date === date) return inflight.promise;
  const promise: Promise<PrayerTimes> = fetchFromApi(date)
    .then((times) => {
      writeCache(date, times);
      return times;
    })
    .finally(() => {
      if (inflight?.promise === promise) inflight = null;
    });
  inflight = { date, promise };
  return promise;
}

function minutesInDakar(now: Date): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: SITE.prayer.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour")?.value);
  const m = Number(parts.find((p) => p.type === "minute")?.value);
  return h * 60 + m;
}

/** Prochaine prière (après Isha, c’est le Fajr du lendemain). */
export function getNextPrayer(times: PrayerTimes, now: Date = new Date()): PrayerKey {
  const current = minutesInDakar(now);
  for (const key of PRAYER_ORDER) {
    const [h, m] = times[key].split(":").map(Number);
    if (h * 60 + m > current) return key;
  }
  return "fajr";
}
