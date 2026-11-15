import { CheckCircle } from "lucide-react";
import LinkButton from "@/components/LinkButton";
import SectionHeading from "@/components/SectionHeading";

const values = [
  "Spiritualité et dévotion",
  "Service à la communauté",
  "Fraternité et solidarité",
  "Éducation et transmission du savoir",
];

const AboutSection = ({ fullPage = false }: { fullPage?: boolean }) => (
  <section id="apropos" className="bg-gray-50 py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6">
      <SectionHeading title="À Propos de Notre Dahira" />

      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <img
          src="/images/page-title-bg.jpg"
          alt="Communauté Miftahoun Nasri"
          className="h-auto w-full rounded-lg shadow-lg"
          loading="lazy"
          decoding="async"
        />

        <div>
          <h3 className="mb-4 font-lora text-2xl font-semibold text-primary">Notre Mission</h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            La dahira Miftahoun Nasri de Guediawaye-Notaire est une communauté spirituelle dédiée à
            promouvoir les enseignements et valeurs du Mouridisme. Nous nous efforçons de créer un
            espace de fraternité, d'apprentissage et de pratique religieuse pour tous nos membres.
          </p>

          <h3 className="mb-4 font-lora text-2xl font-semibold text-primary">Notre Histoire</h3>
          <p className="mb-6 leading-relaxed text-gray-700">
            Fondée vers 2005-2006, notre dahira a grandi pour devenir un pilier important de la
            communauté locale. Commençant avec seulement quelques membres dévoués, nous avons
            maintenant une congrégation florissante qui continue à s'étendre grâce à notre
            engagement envers les valeurs mourides et notre service à la communauté.
          </p>

          <h3 className="mb-4 font-lora text-2xl font-semibold text-primary">Nos Valeurs</h3>
          <ul className="mb-6 space-y-2 text-gray-700">
            {values.map((value) => (
              <li key={value} className="flex items-start">
                <CheckCircle className="mr-2 mt-1 shrink-0 text-gold" size={20} aria-hidden="true" />
                <span>{value}</span>
              </li>
            ))}
          </ul>

          {!fullPage && (
            <div className="mt-8">
              <LinkButton href="/a-propos" arrow>
                En savoir plus
              </LinkButton>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
