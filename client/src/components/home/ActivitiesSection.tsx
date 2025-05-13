import { Link } from "wouter";
import { Clock } from "lucide-react";
import { Activity } from "@/lib/types";

interface ActivitiesSectionProps {
  fullPage?: boolean;
}

const ActivitiesSection = ({ fullPage = false }: ActivitiesSectionProps) => {
  const activities: Activity[] = [
    {
      id: 1,
      title: "Étude du Coran",
      description: "Sessions hebdomadaires d'étude et de récitation du Coran pour tous les âges, dirigées par Dieuwrigne Ousmane.",
      icon: "fa-book",
      schedule: "Tous les dimanches | 12:00 - 14:00"
    },
    {
      id: 2,
      title: " Drouss -Kourel -Zikroulah",
      description: "Rassemblement spirituel pour les prières et chants de louange collectifs dans la tradition mouride.",
      icon: "fa-pray",
      schedule: "Vendredi soir | 21:00 - 23:30"
    },
    {
      id: 3,
      title: "Wakhtane et sogné",
      description: "Cours sur les enseignements de Cheikh Ahmadou Bamba et la spiritualité mouride.",
      icon: "fa-chalkboard-teacher",
      schedule: "Vendredi soir | 23:30 - 00:00"
    },
    {
      id: 4,
      title: "Service Communautaire",
      description: "Initiatives de bienfaisance pour aider les membres de la communauté et les personnes dans le besoin.",
      icon: "fa-hands-helping",
      schedule: "Premier samedi du mois | 09:00 - 14:00"
    },
    {
      id: 5,
      title: "École Coranique pour Enfants",
      description: "Cours adaptés aux enfants pour apprendre les bases de l'islam et les valeurs mourides.",
      icon: "fa-child",
      schedule: "Mercredis & Samedis | 14:00 - 16:00"
    },
    {
      id: 6,
      title: "Groupes d'Étude",
      description: "Cercles de discussion et d'étude pour approfondir les connaissances religieuses et les thémes d'actualités.",
      icon: "fa-users",
      schedule: "Dimanche | 23:30 - 00:00"
    }
  ];

  return (
    <section id="activites" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-4">Nos Activités</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            La Dahira Miftahoun Nasri organise diverses activités pour nourrir l'esprit et renforcer notre communauté
          </p>
          <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl"
            >
              <div className="h-48 bg-primary-light flex items-center justify-center text-white">
                <i className={`fas ${activity.icon} text-5xl`}></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-lora font-bold text-primary mb-3">{activity.title}</h3>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                <div className="flex items-center text-gray-500">
                  <Clock className="mr-2" size={16} />
                  <span>{activity.schedule}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!fullPage && (
          <div className="text-center mt-12">
            <Link href="/activites">
              <a className="inline-flex items-center bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded-md transition-colors duration-300">
                <span>Voir toutes nos activités</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

export default ActivitiesSection;
