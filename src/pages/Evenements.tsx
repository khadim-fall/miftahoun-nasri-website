import { Calendar, Clock, MapPin } from "lucide-react";
import EventsSection from "@/components/home/EventsSection";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { events } from "@/data/content";
import { usePageMeta } from "@/hooks/usePageMeta";
import { formatDateParts, formatLongDate, splitEvents } from "@/lib/events";

const Evenements = () => {
  usePageMeta("Événements");
  const { upcoming, past } = splitEvents(events);
  const main = upcoming[0];
  const mainDate = main && formatDateParts(main.date);

  return (
    <>
      <PageHeader
        title="Nos événements"
        description="Découvrez les événements à venir de la Dahira Miftahoun Nasri"
      />
      <EventsSection fullPage />

      {main && mainDate && (
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeading title="Événement principal" description="Ne manquez pas notre prochain grand événement" />
            <article className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg md:flex">
              <div className="flex flex-col items-center justify-center bg-primary p-8 text-center text-white md:w-1/3">
                <Calendar className="mx-auto mb-4 h-12 w-12" aria-hidden="true" />
                <span className="text-5xl font-bold">{mainDate.day}</span>
                <div className="text-xl">{mainDate.month}</div>
                <div className="mt-1">{mainDate.year}</div>
              </div>
              <div className="p-8 md:w-2/3">
                <h3 className="mb-4 font-lora text-2xl font-bold text-primary">{main.title}</h3>
                <p className="mb-6 text-gray-600">{main.description}</p>
                <div className="space-y-4">
                  {main.venue && (
                    <div className="flex items-center">
                      <MapPin className="mr-3 shrink-0 text-gold-dark" size={20} aria-hidden="true" />
                      <span>{main.venue}</span>
                    </div>
                  )}
                  {main.time && (
                    <div className="flex items-center">
                      <Clock className="mr-3 shrink-0 text-gold-dark" size={20} aria-hidden="true" />
                      <span>{main.time}</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeading title="Événements passés" description="Revivez nos événements précédents" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <article key={event.id} className="overflow-hidden rounded-lg bg-gray-50 shadow-md">
                  <div className="h-1 bg-gold" aria-hidden="true"></div>
                  <div className="p-6">
                    <p className="mb-2 text-gray-600">
                      <time dateTime={event.date}>{formatLongDate(event.date)}</time>
                    </p>
                    <h3 className="mb-3 font-lora text-xl font-bold text-primary">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Evenements;
