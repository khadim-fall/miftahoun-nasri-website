import ContactInfo from "@/components/ContactInfo";
import LinkButton from "@/components/LinkButton";
import LocationMap from "@/components/LocationMap";
import SectionHeading from "@/components/SectionHeading";

/** Bloc contact de la page d'accueil. Le formulaire complet se trouve sur /contact. */
const ContactSection = () => (
  <section id="contact" className="bg-white py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6">
      <SectionHeading
        title="Contactez-Nous"
        description="Vous avez des questions ou souhaitez rejoindre notre dahira? N'hésitez pas à nous contacter"
      />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ContactInfo />
        <div>
          <img
            src="/images/page-title-bg.jpg"
            alt="Photo du siège de notre daara"
            className="max-h-96 w-full rounded-lg object-cover shadow-lg"
            loading="lazy"
            decoding="async"
          />
          <LocationMap className="mt-8" />
        </div>
      </div>

      <div className="mt-10 text-center">
        <LinkButton href="/contact" arrow>
          Nous écrire
        </LinkButton>
      </div>
    </div>
  </section>
);

export default ContactSection;
