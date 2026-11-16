import { Facebook, Instagram, Twitter } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { leaders } from "@/data/content";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

const LeadershipSection = () => (
  <section className="bg-white py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6">
      <SectionHeading
        title="Nos responsables"
        description="Découvrez les membres dévoués qui guident notre communauté avec sagesse et compassion"
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {leaders.map((leader) => (
          <article
            key={leader.id}
            className="overflow-hidden rounded-lg bg-gray-50 shadow-md transition-transform hover:scale-105"
          >
            <div className="h-64 bg-gray-200">
              {leader.image ? (
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-primary-light text-6xl font-lora font-bold text-white"
                  role="img"
                  aria-label={leader.name}
                >
                  {initials(leader.name)}
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="mb-2 font-lora text-xl font-bold text-primary">{leader.name}</h3>
              <p className="mb-3 font-medium text-gold-dark">{leader.role}</p>
              <p className="mb-4 text-gray-600">{leader.description}</p>
              <div className="flex space-x-3">
                {leader.socialLinks?.facebook && (
                  <a href={leader.socialLinks.facebook} aria-label={`Facebook de ${leader.name}`} className="text-primary transition hover:text-gold-dark">
                    <Facebook size={18} aria-hidden="true" />
                  </a>
                )}
                {leader.socialLinks?.twitter && (
                  <a href={leader.socialLinks.twitter} aria-label={`Twitter de ${leader.name}`} className="text-primary transition hover:text-gold-dark">
                    <Twitter size={18} aria-hidden="true" />
                  </a>
                )}
                {leader.socialLinks?.instagram && (
                  <a href={leader.socialLinks.instagram} aria-label={`Instagram de ${leader.name}`} className="text-primary transition hover:text-gold-dark">
                    <Instagram size={18} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default LeadershipSection;
