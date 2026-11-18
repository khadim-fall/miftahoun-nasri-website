import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { X } from "lucide-react";
import JoinLink from "@/components/JoinLink";
import { SITE } from "@/config/site";
import { dismissWelcome, markWelcomeShown, shouldShowWelcome } from "@/lib/welcome";

const SHOW_AFTER_MS = 3500;

/**
 * Fenêtre de bienvenue : s'affiche une seule fois, quelques secondes après l'arrivée, et invite à
 * s'enregistrer. Élément <dialog> natif : Échap pour fermer, focus géré par le navigateur.
 */
const WelcomePopup = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    if (location === "/contact") return; // le formulaire est déjà à l'écran
    const timer = setTimeout(() => {
      const dialog = ref.current;
      if (dialog && !dialog.open && shouldShowWelcome()) {
        markWelcomeShown();
        dialog.showModal();
        dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus(); // bouton principal plutôt que la croix
      }
    }, SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, [location]);

  const close = () => {
    dismissWelcome();
    ref.current?.close();
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="welcome-title"
      onClose={() => dismissWelcome()}
      onClick={(e) => e.target === ref.current && close()} // clic sur le fond sombre
      className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-lg p-0 shadow-2xl backdrop:bg-black/60"
    >
      <div className="h-2 bg-gold" aria-hidden="true"></div>
      <div className="relative p-6 text-center md:p-8">
        <button
          type="button"
          onClick={close}
          aria-label="Fermer"
          className="absolute right-3 top-3 rounded-full p-2 text-gray-600 hover:bg-gray-100 hover:text-dark"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <p className="mb-1 font-medium text-gold-dark">Bienvenue</p>
        <h2 id="welcome-title" className="mb-3 font-lora text-2xl font-bold text-primary">
          {SITE.name}
        </h2>
        <p className="mb-6 text-gray-700">
          Faites partie de notre communauté : enregistrez-vous en moins d’une minute pour que nous puissions
          vous joindre.
        </p>

        <JoinLink
          primaryFocus
          onClick={close}
          className="block w-full rounded-md bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-primary-light"
        >
          Je m’enregistre
        </JoinLink>
        <button type="button" onClick={close} className="mt-3 w-full py-2 text-sm text-gray-600 hover:text-dark">
          Plus tard
        </button>
      </div>
    </dialog>
  );
};

export default WelcomePopup;
