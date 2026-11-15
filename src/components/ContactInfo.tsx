import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/config/site";
import SocialLinks from "@/components/SocialLinks";

const Row = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="flex items-start">
    <div className="mr-4 rounded-full bg-primary-light p-3 text-white" aria-hidden="true">
      {icon}
    </div>
    <div>
      <h4 className="mb-1 text-lg font-medium text-primary">{title}</h4>
      {children}
    </div>
  </div>
);

const linkClass = "block text-gray-600 hover:text-primary hover:underline";

const ContactInfo = ({ headingAs: Heading = "h3" }: { headingAs?: "h2" | "h3" }) => (
  <div>
    <Heading className="mb-6 font-lora text-2xl font-semibold text-primary">Informations de Contact</Heading>

    <div className="space-y-6">
      <Row icon={<MapPin size={20} />} title="Adresse">
        <p className="text-gray-600">{SITE.address}</p>
      </Row>

      <Row icon={<Phone size={20} />} title="Téléphone">
        {SITE.phones.map((p) => (
          <a key={p.tel} href={`tel:${p.tel}`} className={linkClass}>
            {p.display}
          </a>
        ))}
      </Row>

      <Row icon={<Mail size={20} />} title="Email">
        {SITE.emails.map((email) => (
          <a key={email} href={`mailto:${email}`} className={`${linkClass} break-all`}>
            {email}
          </a>
        ))}
      </Row>

      <Row icon={<Clock size={20} />} title="Heures d'ouverture">
        {SITE.hours.map((h) => (
          <p key={h} className="text-gray-600">
            {h}
          </p>
        ))}
      </Row>

      {SITE.whatsapp && (
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-md bg-primary px-5 py-3 font-medium text-white transition-colors hover:bg-primary-light"
        >
          <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
          Nous écrire sur WhatsApp
          <span className="sr-only"> (nouvelle fenêtre)</span>
        </a>
      )}

      <div className="mt-8">
        <h4 className="mb-3 text-lg font-medium text-primary">Suivez-nous</h4>
        <SocialLinks linkClassName="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors duration-300 hover:bg-primary-light" />
      </div>
    </div>
  </div>
);

export default ContactInfo;
