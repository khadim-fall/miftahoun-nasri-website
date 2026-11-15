import { useEffect, useState } from "react";
import {
  FALLBACK_PRAYER_TIMES,
  getNextPrayer,
  loadPrayerTimes,
  peekCachedPrayerTimes,
  type PrayerKey,
  type PrayerTimes,
} from "@/lib/prayer";

export type PrayerStatus = "loading" | "live" | "fallback";

export function usePrayerTimes(): {
  times: PrayerTimes | null;
  status: PrayerStatus;
  next: PrayerKey | null;
} {
  const [state, setState] = useState<{ times: PrayerTimes | null; status: PrayerStatus }>(() => {
    const cached = peekCachedPrayerTimes();
    return cached ? { times: cached, status: "live" } : { times: null, status: "loading" };
  });
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let cancelled = false;
    loadPrayerTimes()
      .then((times) => !cancelled && setState({ times, status: "live" }))
      .catch(() => !cancelled && setState({ times: FALLBACK_PRAYER_TIMES, status: "fallback" }));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  return {
    ...state,
    next: state.times ? getNextPrayer(state.times, now) : null,
  };
}
