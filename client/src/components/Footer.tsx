import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const prayerTimes =[
  { name: "الفجر", time: "05:30" },
  { name: "الظهر", time: "13:15" },
  { name: "العصر", time: "16:30" },
  { name: "المغرب", time: "19:05" },
  { name: "العشاء", time: "20:30" }
];

  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-2xl font-lora font-bold mb-6">Miftahoun Nasri</h3>
            <p className="text-gray-400 mb-6">
              Une communauté spirituelle dédiée à l'enseignement et à la pratique 
              des valeurs Mourides à Guediawaye-Notaire.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gold transition-colors duration-300" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors duration-300" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors duration-300" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-white hover:text-gold transition-colors duration-300" aria-label="Youtube">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-lora font-bold mb-6">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-gold transition-colors duration-300">Accueil</a>
                </Link>
              </li>
              <li>
                <Link href="/a-propos">
                  <a className="text-gray-400 hover:text-gold transition-colors duration-300">À propos</a>
                </Link>
              </li>
              <li>
                <Link href="/activites">
                  <a className="text-gray-400 hover:text-gold transition-colors duration-300">Activités</a>
                </Link>
              </li>
              <li>
                <Link href="/evenements">
                  <a className="text-gray-400 hover:text-gold transition-colors duration-300">Événements</a>
                </Link>
              </li>
              <li>
                <Link href="/galerie">
                  <a className="text-gray-400 hover:text-gold transition-colors duration-300">Galerie</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-400 hover:text-gold transition-colors duration-300">Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-lora font-bold mb-6">Horaires de Prière</h3>
            <ul className="space-y-3">
              {prayerTimes.map((prayer) => (
                <li key={prayer.name} className="flex justify-between">
                  <span className="text-gray-400">{prayer.name}</span>
                  <span className="text-gold">{prayer.time}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-lora font-bold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="text-gold mt-1 mr-3" size={18} />
                <span className="text-gray-400">Quartier Notaire, Guediawaye, Dakar, Sénégal</span>
              </li>
              <li className="flex items-start">
                <Phone className="text-gold mt-1 mr-3" size={18} />
                <span className="text-gray-400">+221 77 762 18 06</span>
              </li>
              <li className="flex items-start">
                <Mail className="text-gold mt-1 mr-3" size={18} />
                <span className="text-gray-400">sitedahira@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="text-center text-gray-500">
            <p>&copy; {currentYear} Dahira Miftahoun Nasri. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
