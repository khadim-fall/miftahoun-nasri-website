/**
 * Contenu éditable du site.
 * Pour ajouter un événement, une activité ou une photo, ajoutez simplement une entrée ci-dessous.
 */
import type {
  Activity,
  DahiraEvent,
  GalleryImage,
  Leader,
  VideoItem,
  WeeklyDay,
} from "@/lib/types";

const PLACEHOLDER_IMAGE = "/images/page-title-bg.jpg";

export const leaders: Leader[] = [
  {
    id: 1,
    name: "Dieuwrigne Serigne Ousmane Fall",
    role: "Président de la dahira",
    description:
      "Coordonne toutes les activités et représente la dahira auprès de la communauté.",
    image: "/images/membre-3.jpg",
  },
  {
    id: 2,
    name: "Serigne Khadim Fall",
    role: "Président culturel",
    description:
      "Organise et dispense les cours de Coran, de khassidas et de Xam Xam tous les dimanches.",
    image: "/images/khadim-fall.jpg",
  },
  {
    id: 3,
    name: "Sokhna Rouba Sow",
    role: "Dieuwrigne sokhna yi",
    description:
      "Organise des rencontres pour approfondir la connaissance religieuse.",
    // Pas encore de photo : ajoutez-en une dans public/images puis indiquez son chemin ici.
  },
];

export const activities: Activity[] = [
  {
    id: 1,
    title: "Étude du Coran",
    description:
      "Séances hebdomadaires d’étude et de récitation du Coran, ouvertes à tous les âges et dirigées par Dieuwrigne Ousmane.",
    icon: "book",
    schedule: "Tous les dimanches, 12:00 – 14:00",
  },
  {
    id: 2,
    title: "Drouss – Kourel – Zikroulah",
    description:
      "Rassemblement spirituel de prières et de chants de louange, dans la tradition mouride.",
    icon: "moon",
    schedule: "Vendredi soir, 21:00 – 23:30",
  },
  {
    id: 3,
    title: "Wakhtane et sogné",
    description:
      "Cours sur les enseignements de Cheikh Ahmadou Bamba et sur la spiritualité mouride.",
    icon: "teaching",
    schedule: "Vendredi soir, 23:30 – 00:00",
  },
  {
    id: 4,
    title: "Service communautaire",
    description:
      "Initiatives de bienfaisance pour aider les membres de la communauté et les personnes dans le besoin.",
    icon: "charity",
    schedule: "Premier samedi du mois, 09:00 – 14:00",
  },
  {
    id: 5,
    title: "École coranique pour enfants",
    description:
      "Cours adaptés aux enfants pour apprendre les bases de l’islam et les valeurs mourides.",
    icon: "children",
    schedule: "Mercredis et samedis, 14:00 – 16:00",
  },
  {
    id: 6,
    title: "Groupes d’étude",
    description:
      "Cercles de discussion et d’étude pour approfondir les connaissances religieuses et les thèmes d’actualité.",
    icon: "study",
    schedule: "Dimanche, 23:30 – 00:00",
  },
];

export const weeklyProgram: WeeklyDay[] = [
  {
    day: "Dimanche",
    slots: [
      { time: "12:00 – 14:00", label: "École coranique pour les membres de la dahira" },
      { time: "17:00 – 20:00", label: "École coranique pour les filles" },
      { time: "21:00 – 00:00", label: "Répétition du Kourel Serigne Massamba" },
    ],
  },
  {
    day: "Vendredi",
    slots: [{ time: "21:00 – 00:00", label: "Rencontre hebdomadaire de la dahira" }],
  },
];

/**
 * Événements. Les dates sont au format "AAAA-MM-JJ".
 * Le site classe automatiquement les événements en "à venir" ou "passés" selon la date du jour.
 * NB : les entrées ci-dessous datent de 2024 ; remplacez-les par vos prochains événements.
 */
export const events: DahiraEvent[] = [
  {
    id: 1,
    title: "Célébration du Grand Magal",
    description:
      "Commémoration annuelle du départ en exil de Cheikh Ahmadou Bamba avec prières, chants et un repas communautaire.",
    date: "2024-06-15",
    venue: "Dahira Miftahoun Nasri, Guediawaye-Notaire",
    time: "09:00 – 22:00",
  },
  {
    id: 2,
    title: "Conférence annuelle",
    description:
      "Conférence sur l’héritage spirituel de Cheikh Ahmadou Bamba avec des intervenants renommés.",
    date: "2024-07-22",
    venue: "Centre culturel, Guediawaye",
    time: "14:00 – 18:00",
  },
  {
    id: 3,
    title: "Journée éducative",
    description:
      "Séminaire intensif sur les enseignements et la doctrine mouride pour tous les niveaux.",
    date: "2024-08-05",
    venue: "Dahira Miftahoun Nasri, Guediawaye-Notaire",
    time: "10:00 – 16:00",
  },
  {
    id: 4,
    title: "Action caritative",
    description:
      "Distribution de repas et de fournitures scolaires aux familles défavorisées de notre communauté.",
    date: "2024-08-19",
    venue: "Place publique, Guediawaye-Notaire",
    time: "09:00 – 13:00",
  },
  {
    id: 5,
    title: "Commémoration du Mawlid",
    description:
      "Célébration de la naissance du Prophète Muhammad (PSL) avec récitations et prières.",
    date: "2024-01-15",
  },
  {
    id: 6,
    title: "Séminaire sur le Mouridisme",
    description:
      "Conférence éducative sur l’histoire et les principes du Mouridisme.",
    date: "2024-02-28",
  },
  {
    id: 7,
    title: "Journée de solidarité",
    description:
      "Distribution d’aide alimentaire et médicale aux familles défavorisées.",
    date: "2024-03-20",
  },
];

export const galleryImages: GalleryImage[] = [
  { id: 1, src: PLACEHOLDER_IMAGE, alt: "Célébration religieuse", category: "Événements" },
  { id: 2, src: PLACEHOLDER_IMAGE, alt: "Séance d’enseignement", category: "Éducation" },
  { id: 3, src: PLACEHOLDER_IMAGE, alt: "Distribution de nourriture", category: "Charité" },
  { id: 4, src: PLACEHOLDER_IMAGE, alt: "Lecture du Coran", category: "Spiritualité" },
  { id: 5, src: PLACEHOLDER_IMAGE, alt: "Rassemblement communautaire", category: "Communauté" },
  { id: 6, src: PLACEHOLDER_IMAGE, alt: "Cours pour enfants", category: "Éducation" },
  { id: 7, src: PLACEHOLDER_IMAGE, alt: "Cérémonie spirituelle", category: "Événements" },
  { id: 8, src: PLACEHOLDER_IMAGE, alt: "Conférence", category: "Événements" },
  { id: 9, src: PLACEHOLDER_IMAGE, alt: "Prière collective", category: "Spiritualité" },
  { id: 10, src: PLACEHOLDER_IMAGE, alt: "Étude religieuse", category: "Éducation" },
  { id: 11, src: PLACEHOLDER_IMAGE, alt: "Activité caritative", category: "Charité" },
  { id: 12, src: PLACEHOLDER_IMAGE, alt: "Rassemblement religieux", category: "Communauté" },
  { id: 13, src: PLACEHOLDER_IMAGE, alt: "Activité sociale", category: "Communauté" },
  { id: 14, src: PLACEHOLDER_IMAGE, alt: "Rencontre spirituelle", category: "Spiritualité" },
  { id: 15, src: PLACEHOLDER_IMAGE, alt: "Atelier éducatif", category: "Éducation" },
  { id: 16, src: PLACEHOLDER_IMAGE, alt: "Soutien aux démunis", category: "Charité" },
];

export const videos: VideoItem[] = [
  {
    src: "/videos/video-1.mp4",
    title: "Célébration du Grand Magal",
    desc: "Moments forts de notre dernière célébration du Grand Magal.",
  },
  {
    src: "/videos/video-2.mp4",
    title: "Conférence sur les enseignements",
    desc: "Conférence sur les enseignements de Cheikh Ahmadou Bamba.",
  },
  {
    src: "/videos/video-3.mp4",
    title: "Récitation de poèmes religieux",
    desc: "Séance de récitation des khassidas (poèmes).",
  },
];

export const VIDEO_POSTER = PLACEHOLDER_IMAGE;
