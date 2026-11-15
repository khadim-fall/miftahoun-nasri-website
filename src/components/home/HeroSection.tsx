import { Link } from "wouter";
import bgImage from '../../../public/images/page-title-bg.jpg';
const HeroSection = () => {
  return (
    <section id="accueil" className="relative bg-primary text-white">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      
      {/* Background Image */}
      <div 
        className="relative h-[600px] bg-cover bg-center z-0" 
        style={{ backgroundImage: `url(${bgImage})`}}
      ></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center px-4 md:px-0">
         <h1
  dir="rtl"
  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-relaxed text-gold drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] tracking-wide"
>
  دَاهِيرَةُ مِفْتَاحُ النَّصْرِي
</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Une communauté spirituelle dédiée à l'enseignement et à la pratique des valeurs Mourides à Guediawaye-Notaire
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/a-propos">
              <a className="bg-gold text-dark font-bold py-3 px-8 rounded-md hover:bg-gold-light transition-colors duration-300 text-lg">
                Découvrir
              </a>
            </Link>
            <Link href="/contact">
              <a className="bg-white text-primary font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors duration-300 text-lg">
                Nous Contacter
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
