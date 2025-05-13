import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Activites from "./pages/Activites";
import Evenements from "./pages/Evenements";
import Galerie from "./pages/Galerie";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/a-propos" component={AboutUs} />
      <Route path="/activites" component={Activites} />
      <Route path="/evenements" component={Evenements} />
      <Route path="/galerie" component={Galerie} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
          <BackToTop />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
