import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import pageTitleImg from '../../../public/images/page-title-bg.jpg';
interface AboutSectionProps {
  fullPage?: boolean;
}

const AboutSection = ({ fullPage = false }: AboutSectionProps) => {
  const values = [
    "Spiritualité et dévotion",
    "Service à la communauté",
    "Fraternité et solidarité",
    "Éducation et transmission du savoir"
  ];

  return (
    <section id="apropos" className={`py-16 md:py-24 bg-gray-50`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-4">À Propos de Notre Dahira</h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <img 
              src={pageTitleImg}  
              alt="Communauté Miftahoun Nasri" 
              className="rounded-lg shadow-lg w-full h-auto" 
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-lora font-semibold text-primary mb-4">Notre Mission</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              La dahira Miftahoun Nasri de Guediawaye-Notaire est une communauté spirituelle dédiée à promouvoir 
              les enseignements et valeurs du Mouridisme. Nous nous efforçons de créer un espace de fraternité, 
              d'apprentissage et de pratique religieuse pour tous nos membres.
            </p>
            
            <h3 className="text-2xl font-lora font-semibold text-primary mb-4">Notre Histoire</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Fondée vers 2005-2006, notre dahira a grandi pour devenir un pilier important de la communauté locale. 
              Commençant avec seulement quelques membres dévoués, nous avons maintenant une congrégation florissante 
              qui continue à s'étendre grâce à notre engagement envers les valeurs mourides et notre service à la communauté.
            </p>
            
            <h3 className="text-2xl font-lora font-semibold text-primary mb-4">Nos Valeurs</h3>
            <ul className="text-gray-700 space-y-2 mb-6">
              {values.map((value, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="text-gold mt-1 mr-2" size={20} />
                  <span>{value}</span>
                </li>
              ))}
            </ul>
            
            {fullPage ? null : (
              <div className="mt-8">
                <Link href="/a-propos">
                  <a className="inline-flex items-center bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded-md transition-colors duration-300">
                    <span>En savoir plus</span>
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
