import { PrayerTime } from "@/lib/types";

const PrayerTimes = () => {
  const prayerTimes: PrayerTime[] = /* [
    { name: "Fajr", time: "05:30" },
    { name: "Dhuhr", time: "13:15" },
    { name: "Asr", time: "16:30" },
    { name: "Maghrib", time: "19:05" },
    { name: "Isha", time: "20:30" },
  ]; */
  [
  { name: "الفجر", time: "05:30" },
  { name: "الظهر", time: "13:15" },
  { name: "العصر", time: "16:30" },
  { name: "المغرب", time: "19:05" },
  { name: "العشاء", time: "20:30" }
];

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between bg-primary rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-white mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-lora font-bold">Horaires de Prière</h2>
            <p className="mt-2">Rejoignez-nous pour les prières quotidiennes</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            {prayerTimes.map((prayer) => (
              <div key={prayer.name} className="bg-white text-primary rounded-md p-4">
                <p className="font-medium">{prayer.name}</p>
                <p className="text-xl font-bold">{prayer.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrayerTimes;
