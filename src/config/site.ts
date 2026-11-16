/**
 * Informations générales du site : une seule source de vérité.
 * Modifiez ce fichier pour changer les coordonnées partout (en-tête, pied de page, contact...).
 */
export const SITE = {
  name: "Dahira Miftahoun Nasri",
  shortName: "Miftahoun Nasri",
  locality: "Guediawaye-Notaire",
  tagline:
    "Une communauté spirituelle dédiée à l’enseignement et à la pratique des valeurs mourides à Guediawaye-Notaire",
  description:
    "Dahira Miftahoun Nasri de Guediawaye-Notaire - Une communauté spirituelle dédiée à l’enseignement et à la pratique des valeurs mourides",

  address: "Dahira Miftahoun Nasri, Quartier Notaire, Guediawaye, Dakar, Sénégal",
  addressShort: "Quartier Notaire, Guediawaye, Dakar, Sénégal",

  phones: [
    { display: "+221 77 762 18 06", tel: "+221777621806" },
    { display: "+221 33 800 00 00", tel: "+221338000000" },
  ],
  /** Numéro WhatsApp au format international sans "+" ni espaces. Laissez vide ("") pour masquer le bouton. */
  whatsapp: "221777621806",
  emails: ["sitedahira@gmail.com", "fall.khadim2803@gmail.com"],

  hours: [
    "Vendredi : 20:30 – 00:00",
    "Dimanche : 12:00 – 14:00 et 17:00 – 00:00",
  ],

  /**
   * Réseaux sociaux : renseignez les vraies adresses (https://...).
   * Une icône n’apparaît que si son lien est rempli (avant, tous les liens pointaient vers "#").
   */
  social: {
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: "",
  },

  /**
   * Adresse du script Google (voir docs/google-apps-script.gs et le README) qui enregistre les
   * inscriptions newsletter et les messages dans un Google Sheet.
   * Tant qu’elle est vide, les formulaires ouvrent la messagerie du visiteur.
   */
  formsEndpoint:
    "https://script.google.com/macros/s/AKfycbxyvcf9EvYsuUoWlUsqE-G6WHluoneYs4Fr99IoDICr4iqX33SB-fSpJHbykeStv76-/exec",

  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!4v1748543030523!6m8!1m7!1s6CYDT6qZPwPFkz9dfcBT4A!2m2!1d14.7742005239495!2d-17.38952665254646!3f19.8893690421542!4f-0.7589820127834912!5f2.071032434232568",

  /**
   * Calcul automatique des horaires de prière (API publique Aladhan).
   * method 3 = Ligue islamique mondiale. Comparez avec les horaires de votre mosquée de référence
   * et changez la méthode si besoin : https://aladhan.com/calculation-methods
   */
  prayer: {
    city: "Dakar",
    country: "Senegal",
    method: 3,
    timeZone: "Africa/Dakar",
  },
} as const;

export type SocialNetwork = keyof typeof SITE.social;
