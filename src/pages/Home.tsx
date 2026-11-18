import HeroSection from "@/components/home/HeroSection";
import VerseBanner from "@/components/home/VerseBanner";
import PrayerTimes from "@/components/home/PrayerTimes";
import JoinSection from "@/components/home/JoinSection";
import AboutSection from "@/components/home/AboutSection";
import LeadershipSection from "@/components/home/LeadershipSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import EventsSection from "@/components/home/EventsSection";
import GallerySection from "@/components/home/GallerySection";
import NewsletterSection from "@/components/home/NewsletterSection";
import ContactSection from "@/components/home/ContactSection";
import { usePageMeta } from "@/hooks/usePageMeta";

const Home = () => {
  usePageMeta();
  return (
    <>
      <HeroSection />
      <VerseBanner />
      <PrayerTimes />
      <JoinSection />
      <AboutSection />
      <LeadershipSection />
      <ActivitiesSection />
      <EventsSection />
      <GallerySection />
      <NewsletterSection />
      <ContactSection />
    </>
  );
};

export default Home;
