import HeroSection from "@/components/home/HeroSection";
import PrayerTimes from "@/components/home/PrayerTimes";
import AboutSection from "@/components/home/AboutSection";
import LeadershipSection from "@/components/home/LeadershipSection";
import ActivitiesSection from "@/components/home/ActivitiesSection";
import EventsSection from "@/components/home/EventsSection";
import GallerySection from "@/components/home/GallerySection";
import NewsletterSection from "@/components/home/NewsletterSection";
import ContactSection from "@/components/home/ContactSection";
import { useEffect } from "react";
import logo from "../../public/images/page-title-bg.jpg";
const Home = () => {
  useEffect(() => {
    document.title = "Dahira Miftahoun Nasri - Guediawaye-Notaire";
  }, []);

  return (
    <>
    

      <HeroSection />
      <PrayerTimes />
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
