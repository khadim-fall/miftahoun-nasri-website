import { useEffect } from "react";
import EventsSection from "@/components/home/EventsSection";
import { Calendar, MapPin, Clock } from "lucide-react";

const Evenements = () => {
  useEffect(() => {
    document.title = "Événements - Dahira Miftahoun Nasri";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  const upcomingEvents = [
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

  return (
    <>
      <div className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-lora font-bold mb-4">Nos Événements</h1>
          <p className="max-w-3xl mx-auto">
            Découvrez les événements à venir de la Dahira Miftahoun Nasri
          </p>
        </div>
      </div>
      
      <EventsSection fullPage />

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-4">Événement Principal</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Ne manquez pas notre prochain grand événement</p>
            <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-primary p-8 text-white flex flex-col items-center justify-center">
                <div className="text-center">
                  <Calendar className="w-12 h-12 mb-4 mx-auto" />
                  <span className="text-5xl font-bold">{upcomingEvents[0].date}</span>
                  <div className="text-xl">{upcomingEvents[0].month}</div>
                  <div className="mt-1">{upcomingEvents[0].year}</div>
                </div>
              </div>
              
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-lora font-bold text-primary mb-4">{upcomingEvents[0].title}</h3>
                <p className="text-gray-600 mb-6">{upcomingEvents[0].description}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="text-gold mr-3" size={20} />
                    <span>{upcomingEvents[0].venue}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="text-gold mr-3" size={20} />
                    <span>{upcomingEvents[0].time}</span>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  {/* <button className="bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded-md transition-colors duration-300">
                    S'inscrire
                  </button>
                  <button className="border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-6 rounded-md transition-colors duration-300">
                    Détails de l'événement
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-4">Événements Passés</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Revivez nos événements précédents</p>
            <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Événement passé 1 */}
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
              <div className="p-1 bg-gold"></div>
              <div className="p-6">
                <p className="text-gray-500 mb-2">15 Janvier 2024</p>
                <h3 className="text-xl font-lora font-bold text-primary mb-3">Commémoration du Mawlid</h3>
                <p className="text-gray-600 mb-4">Célébration de la naissance du Prophète Muhammad (PSL) avec récitations et prières.</p>
                {/* <button className="text-primary hover:text-primary-light flex items-center transition-colors duration-300">
                  {<span>Voir les photos</span>}
                  <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button> */}
              </div>
            </div>
            
            {/* Événement passé 2 */}
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
              <div className="p-1 bg-gold"></div>
              <div className="p-6">
                <p className="text-gray-500 mb-2">28 Février 2024</p>
                <h3 className="text-xl font-lora font-bold text-primary mb-3">Séminaire sur le Mouridisme</h3>
                <p className="text-gray-600 mb-4">Conférence éducative sur l'histoire et les principes du Mouridisme.</p>
                {/* <button className="text-primary hover:text-primary-light flex items-center transition-colors duration-300">
                  {<span>Voir les photos</span>}
                  <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button> */}
              </div>
            </div>
            
            {/* Événement passé 3 */}
            <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
              <div className="p-1 bg-gold"></div>
              <div className="p-6">
                <p className="text-gray-500 mb-2">20 Mars 2024</p>
                <h3 className="text-xl font-lora font-bold text-primary mb-3">Journée de Solidarité</h3>
                <p className="text-gray-600 mb-4">Distribution d'aide alimentaire et médicale aux familles défavorisées.</p>
                {/* <button className="text-primary hover:text-primary-light flex items-center transition-colors duration-300">
                  {<span>Voir les photos</span>}
                  <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Evenements;
