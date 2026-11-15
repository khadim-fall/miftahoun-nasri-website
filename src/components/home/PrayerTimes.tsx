import { SITE } from "@/config/site";
import { PRAYER_NAMES, PRAYER_ORDER } from "@/lib/prayer";
import { formatLongDate, todayKey } from "@/lib/events";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { cn } from "@/lib/utils";

const PrayerTimes = () => {
  const { times, status, next } = usePrayerTimes();

  return (
    <section className="bg-white py-8 md:py-12" aria-labelledby="prayer-title">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between rounded-lg bg-primary p-6 shadow-lg md:flex-row md:p-8">
          <div className="mb-6 text-center text-white md:mb-0 md:text-left">
            <h2 id="prayer-title" className="font-lora text-2xl font-bold md:text-3xl">
              Horaires de Prière
            </h2>
            <p className="mt-2">Rejoignez-nous pour les prières quotidiennes</p>
            <p className="mt-1 text-sm text-gray-200">
              {status === "live" && `${SITE.prayer.city} · ${formatLongDate(todayKey())}`}
              {status === "loading" && "Chargement des horaires..."}
              {status === "fallback" && "Horaires indicatifs (calcul en ligne indisponible)"}
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-4 text-center sm:grid-cols-3 md:grid-cols-5">
            {PRAYER_ORDER.map((key) => (
              <li
                key={key}
                className={cn(
                  "rounded-md bg-white p-4 text-primary",
                  next === key && status !== "loading" && "ring-4 ring-gold",
                )}
              >
                <p lang="ar" dir="rtl" className="font-medium">
                  {PRAYER_NAMES[key].ar}
                  <span className="sr-only"> ({PRAYER_NAMES[key].fr})</span>
                </p>
                <p className="text-xl font-bold">{times ? times[key] : "--:--"}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PrayerTimes;
