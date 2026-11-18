import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import WelcomePopup from "./components/WelcomePopup";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Activites from "./pages/Activites";
import Evenements from "./pages/Evenements";
import Galerie from "./pages/Galerie";
import Contact from "./pages/Contact";

/** Remonte en haut de page à chaque changement de route (au lieu de le faire dans chaque page). */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function App() {
  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-primary"
      >
        Aller au contenu
      </a>
      <Toaster />
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="contenu" tabIndex={-1} className="flex-grow focus:outline-none">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/a-propos" component={AboutUs} />
            <Route path="/activites" component={Activites} />
            <Route path="/evenements" component={Evenements} />
            <Route path="/galerie" component={Galerie} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
        <BackToTop />
        <WelcomePopup />
      </div>
    </>
  );
}

export default App;
