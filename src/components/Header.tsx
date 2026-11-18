import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import JoinLink from "./JoinLink";

const navLinks = [
  { path: "/", label: "Accueil" },
  { path: "/a-propos", label: "À propos" },
  { path: "/activites", label: "Activités" },
  { path: "/evenements", label: "Événements" },
  { path: "/galerie", label: "Galerie" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de page ou avec la touche Échap
  useEffect(() => setOpen(false), [location]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (path: string) =>
    cn(
      "font-medium transition-colors",
      location === path ? "text-gold" : "text-white hover:text-gold-light",
    );

  return (
    <header className={cn("sticky top-0 z-50 bg-primary", scrolled && "shadow-md")}>
      <div className="container mx-auto px-4 py-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-lora text-2xl font-bold text-white md:text-3xl">
            <span className="text-gold">Dahira Miftahoun</span> Nasri
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={linkClass(link.path)}
                aria-current={location === link.path ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            {location !== "/contact" && (
              <JoinLink className="rounded-md bg-gold px-4 py-2 font-bold text-dark transition-colors hover:bg-gold-light">
                Rejoindre
              </JoinLink>
            )}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-gold hover:text-gold-light md:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label="Navigation mobile" className="mt-4 pb-2 md:hidden">
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <li
                  key={link.path}
                  className={i < navLinks.length - 1 ? "border-b border-white/20" : ""}
                >
                  <Link
                    href={link.path}
                    className={cn("block py-3", linkClass(link.path))}
                    aria-current={location === link.path ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {location !== "/contact" && (
                <li className="pt-3">
                  <JoinLink className="block rounded-md bg-gold px-4 py-3 text-center font-bold text-dark hover:bg-gold-light">
                    Rejoindre la dahira
                  </JoinLink>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
