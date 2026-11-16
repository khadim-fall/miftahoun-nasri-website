import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/config/site";
import { PRAYER_NAMES, PRAYER_ORDER } from "@/lib/prayer";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import SocialLinks from "./SocialLinks";

const quickLinks = [
  { path: "/", label: "Accueil" },
  { path: "/a-propos", label: "À propos" },
  { path: "/activites", label: "Activités" },
  { path: "/evenements", label: "Événements" },
  { path: "/galerie", label: "Galerie" },
  { path: "/contact", label: "Contact" },
];

const Footer = () => {
  const { times, status } = usePrayerTimes();

  return (
    <footer className="bg-dark pb-8 pt-16 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-6 font-lora text-2xl font-bold">{SITE.shortName}</h3>
            <p className="mb-6 text-gray-400">{SITE.tagline}.</p>
            <SocialLinks linkClassName="text-white transition-colors duration-300 hover:text-gold" />
          </div>

          <nav aria-label="Liens rapides">
            <h3 className="mb-6 font-lora text-xl font-bold">Liens rapides</h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.path}>
                  <Link
                    href={l.path}
                    className="text-gray-400 transition-colors duration-300 hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-6 font-lora text-xl font-bold">Horaires de prière</h3>
            <ul className="space-y-3">
              {PRAYER_ORDER.map((key) => (
                <li key={key} className="flex justify-between">
                  <span lang="ar" dir="rtl" className="text-gray-400">
                    {PRAYER_NAMES[key].ar}
                  </span>
                  <span className="text-gold">{times ? times[key] : "--:--"}</span>
                </li>
              ))}
            </ul>
            {status === "fallback" && (
              <p className="mt-3 text-xs text-gray-400">Horaires indicatifs (calcul en ligne indisponible).</p>
            )}
          </div>

          <div>
            <h3 className="mb-6 font-lora text-xl font-bold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-3 mt-1 shrink-0 text-gold" size={18} aria-hidden="true" />
                <span className="text-gray-400">{SITE.addressShort}</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-3 mt-1 shrink-0 text-gold" size={18} aria-hidden="true" />
                <a href={`tel:${SITE.phones[0].tel}`} className="text-gray-400 hover:text-gold">
                  {SITE.phones[0].display}
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="mr-3 mt-1 shrink-0 text-gold" size={18} aria-hidden="true" />
                <a href={`mailto:${SITE.emails[0]}`} className="break-all text-gray-400 hover:text-gold">
                  {SITE.emails[0]}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
