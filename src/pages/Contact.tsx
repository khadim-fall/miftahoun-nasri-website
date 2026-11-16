import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import LocationMap from "@/components/LocationMap";
import PageHeader from "@/components/PageHeader";
import { usePageMeta } from "@/hooks/usePageMeta";

const Contact = () => {
  usePageMeta("Contact");
  return (
    <>
      <PageHeader
        title="Contactez-nous"
        description="Une question ou l’envie de rejoindre notre dahira ? N’hésitez pas à nous contacter."
      />

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-lora text-2xl font-semibold text-primary">Vos informations</h2>
              <p className="mb-6 text-gray-600">
                Membres de la dahira, renseignez vos coordonnées pour que nous puissions vous joindre. Vous pouvez aussi nous laisser un commentaire.
              </p>
              <ContactForm />
            </div>
            <ContactInfo headingAs="h2" />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <LocationMap className="h-96" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
