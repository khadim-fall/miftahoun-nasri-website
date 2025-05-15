import { Link } from "wouter";
import { MapPin, Clock } from "lucide-react";
import { Event } from "@/lib/types";

interface EventsSectionProps {
  fullPage?: boolean;
}

const EventsSection = ({ fullPage = false }: EventsSectionProps) => {
  const events: Event[] = [
    {
      id: 1,
      title: "Grand Magal Célébration",
      description: "Commémoration annuelle du départ en exil de Cheikh Ahmadou Bamba avec prières, chants et repas communautaire.",
      date: "15",
      month: "Juin",
      year: "2024",
      venue: "Dahira Miftahoun Nasri, Guediawaye-Notaire",
      time: "9:00 - 22:00",
      slug: "grand-magal-celebration"
    },
    {
      id: 2,
      title: "Conférence Annuelle",
      description: "Conférence sur l'héritage spirituel de Cheikh Ahmadou Bamba avec des intervenants renommés.",
      date: "22",
      month: "Juillet",
      year: "2024",
      venue: "Centre Culturel, Guediawaye",
      time: "14:00 - 18:00",
      slug: "conference-annuelle"
    },
    {
      id: 3,
      title: "Journée Éducative",
      description: "Séminaire intensif sur les enseignements et la doctrine Mouride pour tous les niveaux.",
      date: "5",
      month: "Août",
      year: "2024",
      venue: "Dahira Miftahoun Nasri, Guediawaye-Notaire",
      time: "10:00 - 16:00",
      slug: "journee-educative"
    },
    {
      id: 4,
      title: "Action Caritative",
      description: "Distribution de repas et de fournitures scolaires aux familles défavorisées de notre communauté.",
      date: "19",
      month: "Août",
      year: "2024",
      venue: "Place Publique, Guediawaye-Notaire",
      time: "9:00 - 13:00",
      slug: "action-caritative"
    }
  ];

  // If fullPage, show all events. Otherwise, show just the first 2
  const displayEvents = fullPage ? events : events.slice(0, 2);

  return (
    <section id="evenements" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-4">Événements à Venir</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Rejoignez-nous pour ces occasions spéciales qui renforcent notre communauté
          </p>
          <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 bg-primary p-6 text-white flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{event.date}</span>
                <span className="text-xl">{event.month}</span>
                <span>{event.year}</span>
              </div>
              <div className="md:w-2/3 p-6">
                <h3 className="text-xl font-lora font-bold text-primary mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="flex items-center mb-3">
                  <MapPin className="text-gold mr-2" size={18} />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center mb-3">
                  <Clock className="text-gold mr-2" size={18} />
                  <span>{event.time}</span>
                </div>
                {/* <Link href={`/evenements/${event.slug}`}>
                  <a className="inline-block bg-primary hover:bg-primary-light text-white font-medium py-2 px-4 rounded transition-colors duration-300">
                    Plus de détails
                  </a>
                </Link> */}
              </div>
            </div>
          ))}
        </div>
        
        {!fullPage && (
          <div className="text-center mt-10">
            <Link href="/evenements">
              <a className="inline-flex items-center text-primary hover:text-primary-light font-medium transition-colors duration-300">
                <span>Voir tous les événements</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
