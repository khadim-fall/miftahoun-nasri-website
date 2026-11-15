import { Calendar, Clock } from "lucide-react";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { weeklyProgram } from "@/data/content";
import { usePageMeta } from "@/hooks/usePageMeta";

const Activites = () => {
  usePageMeta("Activités");
  return (
    <>
      <PageHeader
        title="Nos Activités"
        description="Découvrez les différentes activités spirituelles et communautaires de la Dahira Miftahoun Nasri"
      />
      <ActivitiesSection fullPage />

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading
            title="Programmes Hebdomadaires"
            description="Rejoignez-nous pour nos activités régulières"
          />

          <div className="mx-auto max-w-4xl space-y-6 rounded-lg bg-gray-50 p-6 shadow-md md:p-8">
            {weeklyProgram.map((day, index) => (
              <div
                key={day.day}
                className={index < weeklyProgram.length - 1 ? "border-b border-gray-200 pb-4" : ""}
              >
                <div className="mb-2 flex items-center gap-3">
                  <Calendar className="text-primary" size={20} aria-hidden="true" />
                  <h3 className="font-lora text-xl font-semibold text-primary">{day.day}</h3>
                </div>
                <ul className="ml-8 space-y-4">
                  {day.slots.map((slot) => (
                    <li key={slot.time} className="flex items-start">
                      <Clock className="mr-2 mt-1 shrink-0 text-gold-dark" size={16} aria-hidden="true" />
                      <div>
                        <p className="font-medium">{slot.time}</p>
                        <p className="text-gray-600">{slot.label}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Activites;
