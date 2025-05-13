import { useEffect } from "react";
import { Calendar, Clock } from "lucide-react";
import ActivitiesSection from "@/components/home/ActivitiesSection";

const Activites = () => {
  useEffect(() => {
    document.title = "Activités - Dahira Miftahoun Nasri";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-lora font-bold mb-4">Nos Activités</h1>
          <p className="max-w-3xl mx-auto">
            Découvrez les différentes activités spirituelles et communautaires de la Dahira Miftahoun Nasri
          </p>
        </div>
      </div>
      
      <ActivitiesSection fullPage />

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-4">Programmes Hebdomadaires</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Rejoignez-nous pour nos activités régulières</p>
            <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
          </div>
          
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md p-6 md:p-8">
            <div className="space-y-6">
              {/* <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-primary" size={20} />
                  <h3 className="text-xl font-lora font-semibold text-primary">Dimanche</h3>
                </div>
                <div className="ml-8 space-y-2">
                  <div className="flex items-start">
                    <Clock className="text-gold mt-1 mr-2" size={16} />
                    <div>
                      <p className="font-medium">23:30 - 00:00</p>
                      <p className="text-gray-600">Groupes d'Étude</p>
                    </div>
                  </div>
                </div>
              </div> */}
              
              {/* <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-primary" size={20} />
                  <h3 className="text-xl font-lora font-semibold text-primary">Mercredi</h3>
                </div>
                <div className="ml-8 space-y-2">
                  <div className="flex items-start">
                    <Clock className="text-gold mt-1 mr-2" size={16} />
                    <div>
                      <p className="font-medium">14:00 - 16:00</p>
                      <p className="text-gray-600">École Coranique pour Enfants</p>
                    </div>
                  </div>
                </div>
              </div> */}
              
              {/* <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-primary" size={20} />
                  <h3 className="text-xl font-lora font-semibold text-primary">Vendredi</h3>
                </div>
                <div className="ml-8 space-y-2">
                  <div className="flex items-start">
                    <Clock className="text-gold mt-1 mr-2" size={16} />
                    <div>
                      <p className="font-medium">20:30 - 22:00</p>
                      <p className="text-gray-600">Dhikr Collectif</p>
                    </div>
                  </div>
                </div>
              </div> */}
              
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-primary" size={20} />
                  <h3 className="text-xl font-lora font-semibold text-primary">Dimanche</h3>
                </div>
                <div className="ml-8 space-y-4">
                  <div className="flex items-start">
                    <Clock className="text-gold mt-1 mr-2" size={16} />
                    <div>
                      <p className="font-medium">12:00 - 14:00</p>
                      <p className="text-gray-600">École Coranique pour les membres du dahira </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-gold mt-1 mr-2" size={16} />
                    <div>
                      <p className="font-medium">17:00 - 20:00</p>
                      <p className="text-gray-600">École Coranique pour les filles</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-gold mt-1 mr-2" size={16} />
                    <div>
                      <p className="font-medium">21:00 - 00:00</p>
                      <p className="text-gray-600">Répétition Kourel Serigne Massamba</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-primary" size={20} />
                  <h3 className="text-xl font-lora font-semibold text-primary">Vendredi</h3>
                </div>
                <div className="ml-8 space-y-2">
                  <div className="flex items-start">
                    <Clock className="text-gold mt-1 mr-2" size={16} />
                    <div>
                      <p className="font-medium">21:00 - 00:00</p>
                      <p className="text-gray-600">Dahira</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Activites;
