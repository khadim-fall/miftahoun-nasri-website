import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/a-propos", label: "À propos" },
    { path: "/activites", label: "Activités" },
    { path: "/evenements", label: "Événements" },
    { path: "/galerie", label: "Galerie" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`bg-primary sticky top-0 z-50 ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 cursor-pointer"
            >
              {/* {<img
                src="../../logo-nasri.jpg"
                alt="Logo"
                className="h-10 w-10 object-contain"
              />} */}
              <span className="text-white font-lora font-bold text-2xl md:text-3xl">
                <span className="text-gold">Dahira Miftahoun</span> Nasri
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  className={`font-medium transition cursor-pointer ${
                    isActive(link.path)
                      ? "text-gold"
                      : "text-white hover:text-gold-light"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gold focus:outline-none hover:text-gold-light"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link, index) => (
                <Link key={link.path} href={link.path}>
                  <span
                    className={`font-medium transition py-2 cursor-pointer ${
                      index < navLinks.length - 1
                        ? "border-b border-gray-200/30"
                        : ""
                    } ${
                      isActive(link.path)
                        ? "text-gold"
                        : "text-white hover:text-gold-light"
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
