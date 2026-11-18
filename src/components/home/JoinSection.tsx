import { CheckCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/config/site";

/** Formulaire d'inscription des membres directement visible sur la page d'accueil. */
const JoinSection = () => (
  <section id="rejoindre" className="scroll-mt-20 bg-primary-light py-16 md:py-20" aria-labelledby="join-title">
    <div className="container mx-auto px-4 md:px-6">
      <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-2">
        <div className="text-white">
          <p className="mb-2 font-medium uppercase tracking-wide text-gold-light">Nouveau membre</p>
          <h2 id="join-title" className="mb-4 font-lora text-3xl font-bold md:text-4xl">
            Rejoignez la dahira
          </h2>
          <p className="mb-6 text-lg">
            Vous souhaitez faire partie de notre communauté ? Renseignez vos coordonnées en moins d’une
            minute : nous vous recontacterons.
          </p>
          <ul className="mb-6 space-y-3">
            <li className="flex items-start">
              <CheckCircle className="mr-3 mt-1 shrink-0 text-gold-light" size={20} aria-hidden="true" />
              <span>Un formulaire simple : nom, lieu d’habitation, secteur et téléphone.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="mr-3 mt-1 shrink-0 text-gold-light" size={20} aria-hidden="true" />
              <span>Vos informations sont utilisées uniquement par la dahira.</span>
            </li>
          </ul>
          {SITE.sectors.length > 0 && (
            <div>
              <p className="mb-2 font-medium">Nos secteurs</p>
              <ul className="flex flex-wrap gap-2">
                {SITE.sectors.map((sector) => (
                  <li key={sector} className="rounded-full bg-white/15 px-3 py-1 text-sm">
                    {sector}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="rounded-lg bg-white p-6 text-dark shadow-xl md:p-8">
          <h3 className="mb-5 font-lora text-2xl font-semibold text-primary">Enregistrez-vous</h3>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
);

export default JoinSection;
