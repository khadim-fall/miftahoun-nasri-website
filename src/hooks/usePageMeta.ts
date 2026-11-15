import { useEffect } from "react";
import { SITE } from "@/config/site";

/** Met à jour le titre de l'onglet et la meta description (sans titre : page d'accueil). */
export function usePageMeta(title?: string, description: string = SITE.description) {
  useEffect(() => {
    document.title = title
      ? `${title} - ${SITE.name}`
      : `${SITE.name} - ${SITE.locality}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [title, description]);
}
