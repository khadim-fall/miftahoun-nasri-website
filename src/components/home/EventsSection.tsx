import { CalendarX, Clock, MapPin } from "lucide-react";
import LinkButton from "@/components/LinkButton";
import SectionHeading from "@/components/SectionHeading";
import { events } from "@/data/content";
import { formatDateParts, splitEvents } from "@/lib/events";

const EventsSection = ({ fullPage = false }: { fullPage?: boolean }) => {
  const { upcoming } = splitEvents(events);
  // Sur l'accueil : les 2 prochains événements ; sur la page dédiée : tous
  const displayed = fullPage ? upcoming : upcoming.slice(0, 2);

  return (
    <section id="evenements" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          title="Événements à Venir"
          description="Rejoignez-nous pour ces occasions spéciales qui renforcent notre communauté"
        />

        {displayed.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-lg bg-gray-50 p-8 text-center shadow-md">
            <CalendarX className="mx-auto mb-3 h-10 w-10 text-primary" aria-hidden="true" />
            <p className="font-medium text-primary">Aucun événement n'est programmé pour le moment.</p>
            <p className="mt-2 text-gray-600">
              Abonnez-vous à la newsletter ou contactez-nous pour être informé des prochaines dates.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {displayed.map((event) => {
              const { day, month, year } = formatDateParts(event.date);
              return (
                <article
                  key={event.id}
                  className="flex flex-col overflow-hidden rounded-lg bg-gray-50 shadow-md md:flex-row"
                >
                  <div className="flex flex-col items-center justify-center bg-primary p-6 text-white md:w-1/3">
                    <span className="text-4xl font-bold">{day}</span>
                    <span className="text-xl">{month}</span>
                    <span>{year}</span>
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h3 className="mb-2 font-lora text-xl font-bold text-primary">{event.title}</h3>
                    <p className="mb-4 text-gray-600">{event.description}</p>
                    {event.venue && (
                      <div className="mb-3 flex items-center">
                        <MapPin className="mr-2 shrink-0 text-gold-dark" size={18} aria-hidden="true" />
                        <span>{event.venue}</span>
                      </div>
                    )}
                    {event.time && (
                      <div className="flex items-center">
                        <Clock className="mr-2 shrink-0 text-gold-dark" size={18} aria-hidden="true" />
                        <span>{event.time}</span>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!fullPage && (
          <div className="mt-10 text-center">
            <LinkButton href="/evenements" variant="primary" arrow>
              Voir tous les événements
            </LinkButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
