export interface Leader {
  id: number;
  name: string;
  role: string;
  description: string;
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
  icon: string;
  schedule: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  month: string;
  year: string;
  venue: string;
  time: string;
  slug: string;
}

export interface PrayerTime {
  name: string;
  time: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  name: string;
  email: string;
}
