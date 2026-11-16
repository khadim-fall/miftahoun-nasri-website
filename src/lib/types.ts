export type ActivityIcon =
  | "book"
  | "moon"
  | "teaching"
  | "charity"
  | "children"
  | "study";

export interface Leader {
  id: number;
  name: string;
  role: string;
  description: string;
  /** Chemin d'une photo (ex. "/images/membre-3.jpg"). Sans photo, les initiales sont affichées. */
  image?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  icon: ActivityIcon;
  schedule: string;
}

export interface DahiraEvent {
  id: number;
  title: string;
  description: string;
  /** Date au format ISO "AAAA-MM-JJ". Le classement "à venir" / "passé" est automatique. */
  date: string;
  venue?: string;
  time?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

export interface VideoItem {
  src: string;
  title: string;
  desc: string;
  /** Date de publication au format "AAAA-MM-JJ" (facultatif). */
  date?: string;
}

export interface WeeklySlot {
  time: string;
  label: string;
}

export interface WeeklyDay {
  day: string;
  slots: WeeklySlot[];
}

export interface MemberFormData {
  firstName: string;
  lastName: string;
  residence: string;
  phone: string;
  comment?: string;
}

export interface NewsletterFormData {
  name: string;
  email: string;
}
