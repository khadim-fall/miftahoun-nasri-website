import AboutSection from "@/components/home/AboutSection";
import LeadershipSection from "@/components/home/LeadershipSection";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { usePageMeta } from "@/hooks/usePageMeta";

const AboutUs = () => {
  usePageMeta("À Propos");
  return (
    <>
      <PageHeader
        title="À Propos de Nous"
        description="Découvrez l'histoire, la mission et les valeurs de la Dahira Miftahoun Nasri de Guediawaye-Notaire"
      />
      <AboutSection fullPage />
      <LeadershipSection />

      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Notre Vision" />
          <div className="mx-auto max-w-4xl space-y-6 leading-relaxed text-gray-700">
            <p>
              La Dahira Miftahoun Nasri aspire à être un phare de spiritualité et d'apprentissage
              islamique dans la communauté de Guediawaye-Notaire. Notre vision est de créer un espace
              où les principes et enseignements du Mouridisme peuvent être pratiqués, étudiés et
              transmis aux générations futures.
            </p>
            <p>
              Nous nous efforçons de bâtir une communauté forte, solidaire et engagée qui incarne les
              valeurs fondamentales du Mouridisme : le travail, la prière, la fraternité et le
              service. À travers notre dahira, nous visons à contribuer positivement à notre société
              et à promouvoir un islam de paix, de tolérance et d'amour universel, conformément aux
              enseignements de Cheikh Ahmadou Bamba.
            </p>
            <p>
              Notre engagement est de continuer à grandir, à servir et à inspirer, en gardant
              toujours à l'esprit les principes qui nous guident et en adaptant nos actions aux
              besoins changeants de notre communauté et de notre époque, tout en restant fidèles à
              notre héritage spirituel.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
