import {
  BookOpen,
  Baby,
  Clock,
  GraduationCap,
  HeartHandshake,
  Moon,
  Users,
  type LucideIcon,
} from "lucide-react";
import LinkButton from "@/components/LinkButton";
import SectionHeading from "@/components/SectionHeading";
import { activities } from "@/data/content";
import type { ActivityIcon } from "@/lib/types";

const icons: Record<ActivityIcon, LucideIcon> = {
  book: BookOpen,
  moon: Moon,
  teaching: GraduationCap,
  charity: HeartHandshake,
  children: Baby,
  study: Users,
};

const ActivitiesSection = ({ fullPage = false }: { fullPage?: boolean }) => (
  <section id="activites" className="bg-gray-50 py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6">
      <SectionHeading
        title="Nos Activités"
        description="La Dahira Miftahoun Nasri organise diverses activités pour nourrir l'esprit et renforcer notre communauté"
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => {
          const Icon = icons[activity.icon];
          return (
            <article
              key={activity.id}
              className="overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:shadow-xl"
            >
              <div className="flex h-48 items-center justify-center bg-primary-light text-white">
                <Icon size={56} aria-hidden="true" />
              </div>
              <div className="p-6">
                <h3 className="mb-3 font-lora text-xl font-bold text-primary">{activity.title}</h3>
                <p className="mb-4 text-gray-600">{activity.description}</p>
                <div className="flex items-center text-gray-600">
                  <Clock className="mr-2 shrink-0" size={16} aria-hidden="true" />
                  <span>{activity.schedule}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {!fullPage && (
        <div className="mt-12 text-center">
          <LinkButton href="/activites" arrow>
            Voir toutes nos activités
          </LinkButton>
        </div>
      )}
    </div>
  </section>
);

export default ActivitiesSection;
