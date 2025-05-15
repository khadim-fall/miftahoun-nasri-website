import { useEffect } from "react";
import AboutSection from "@/components/home/AboutSection";
import LeadershipSection from "@/components/home/LeadershipSection";

const AboutUs = () => {
  useEffect(() => {
    document.title = "À Propos - Dahira Miftahoun Nasri";
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-lora font-bold mb-4">À Propos de Nous</h1>
          <p className="max-w-3xl mx-auto">
            Découvrez l'histoire, la mission et les valeurs de la Dahira Miftahoun Nasri de Guediawaye-Notaire
          </p>
        </div>
      </div>
      
      <AboutSection fullPage />
      <LeadershipSection />

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-4">Notre Vision</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 mb-6 leading-relaxed">
              La Dahira Miftahoun Nasri aspire à être un phare de spiritualité et d'apprentissage islamique dans la communauté de Guediawaye-Notaire. 
              Notre vision est de créer un espace où les principes et enseignements du Mouridisme peuvent être pratiqués, étudiés et transmis aux 
              générations futures.
            </p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nous nous efforçons de bâtir une communauté forte, solidaire et engagée qui incarne les valeurs fondamentales du Mouridisme : le travail, 
              la prière, la fraternité et le service. À travers notre dahira, nous visons à contribuer positivement à notre société et à promouvoir 
              un islam de paix, de tolérance et d'amour universel, conformément aux enseignements de Cheikh Ahmadou Bamba.
            </p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Notre engagement est de continuer à grandir, à servir et à inspirer, en gardant toujours à l'esprit les principes qui nous guident 
              et en adaptant nos actions aux besoins changeants de notre communauté et de notre époque, tout en restant fidèles à notre héritage spirituel.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
