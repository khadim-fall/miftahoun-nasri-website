import {
  users, type User, type InsertUser,
  contactMessages, type ContactMessage, type InsertContactMessage,
  newsletterSubscribers, type NewsletterSubscriber, type InsertNewsletterSubscriber,
  events, type Event, type InsertEvent,
  activities, type Activity, type InsertActivity,
  leaders, type Leader, type InsertLeader,
  galleryImages, type GalleryImage, type InsertGalleryImage,
  prayerTimes, type PrayerTime, type InsertPrayerTime
} from "@shared/schema";

// Define the storage interface for all CRUD operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact message operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Newsletter operations
  subscribeToNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  
  // Event operations
  createEvent(event: InsertEvent): Promise<Event>;
  getEvents(): Promise<Event[]>;
  getEventBySlug(slug: string): Promise<Event | undefined>;
  
  // Activity operations
  createActivity(activity: InsertActivity): Promise<Activity>;
  getActivities(): Promise<Activity[]>;
  
  // Leader operations
  createLeader(leader: InsertLeader): Promise<Leader>;
  getLeaders(): Promise<Leader[]>;
  
  // Gallery operations
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  getGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImagesByCategory(category: string): Promise<GalleryImage[]>;
  
  // Prayer time operations
  createPrayerTime(prayerTime: InsertPrayerTime): Promise<PrayerTime>;
  updatePrayerTime(id: number, time: string): Promise<PrayerTime | undefined>;
  getPrayerTimes(): Promise<PrayerTime[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private newsletterSubscribers: Map<number, NewsletterSubscriber>;
  private events: Map<number, Event>;
  private activities: Map<number, Activity>;
  private leaders: Map<number, Leader>;
  private galleryImages: Map<number, GalleryImage>;
  private prayerTimes: Map<number, PrayerTime>;
  
  private currentUserId: number;
  private currentContactMessageId: number;
  private currentNewsletterSubscriberId: number;
  private currentEventId: number;
  private currentActivityId: number;
  private currentLeaderId: number;
  private currentGalleryImageId: number;
  private currentPrayerTimeId: number;

  constructor() {
    // Initialize maps
    this.users = new Map();
    this.contactMessages = new Map();
    this.newsletterSubscribers = new Map();
    this.events = new Map();
    this.activities = new Map();
    this.leaders = new Map();
    this.galleryImages = new Map();
    this.prayerTimes = new Map();
    
    // Initialize IDs
    this.currentUserId = 1;
    this.currentContactMessageId = 1;
    this.currentNewsletterSubscriberId = 1;
    this.currentEventId = 1;
    this.currentActivityId = 1;
    this.currentLeaderId = 1;
    this.currentGalleryImageId = 1;
    this.currentPrayerTimeId = 1;
    
    // Initialize default prayer times
    this.initializePrayerTimes();
    
    // Initialize default activities
    this.initializeActivities();
    
    // Initialize default leaders
    this.initializeLeaders();
    
    // Initialize default events
    this.initializeEvents();
  }
  
  // Initialize default prayer times
  private initializePrayerTimes() {
    const defaultPrayerTimes: InsertPrayerTime[] = [
      { name: "Fajr", time: "05:30" },
      { name: "Dhuhr", time: "13:15" },
      { name: "Asr", time: "16:30" },
      { name: "Maghrib", time: "19:05" },
      { name: "Isha", time: "20:30" }
    ];
    
    defaultPrayerTimes.forEach(pt => this.createPrayerTime(pt));
  }
  
  // Initialize default activities
  private initializeActivities() {
    const defaultActivities: InsertActivity[] = [
      {
        title: "Étude du Coran",
        description: "Sessions hebdomadaires d'étude et de récitation du Coran pour tous les âges, dirigées par nos érudits.",
        icon: "fa-book",
        schedule: "Tous les samedis | 16:00 - 18:00"
      },
      {
        title: "Dhikr Collectif",
        description: "Rassemblement spirituel pour les prières et chants de louange collectifs dans la tradition mouride.",
        icon: "fa-pray",
        schedule: "Vendredi soir | 20:30 - 22:00"
      },
      {
        title: "Enseignements Religieux",
        description: "Cours sur les enseignements de Cheikh Ahmadou Bamba et la spiritualité mouride.",
        icon: "fa-chalkboard-teacher",
        schedule: "Dimanches | 10:00 - 12:00"
      },
      {
        title: "Service Communautaire",
        description: "Initiatives de bienfaisance pour aider les membres de la communauté et les personnes dans le besoin.",
        icon: "fa-hands-helping",
        schedule: "Premier samedi du mois | 09:00 - 14:00"
      },
      {
        title: "École Coranique pour Enfants",
        description: "Cours adaptés aux enfants pour apprendre les bases de l'islam et les valeurs mourides.",
        icon: "fa-child",
        schedule: "Mercredis & Samedis | 14:00 - 16:00"
      },
      {
        title: "Groupes d'Étude",
        description: "Cercles de discussion et d'étude pour approfondir les connaissances religieuses et spirituelles.",
        icon: "fa-users",
        schedule: "Lundis | 19:00 - 20:30"
      }
    ];
    
    defaultActivities.forEach(activity => this.createActivity(activity));
  }
  
  // Initialize default leaders
  private initializeLeaders() {
    const defaultLeaders: InsertLeader[] = [
      {
        name: "Imam Abdoul Aziz Ndiaye",
        role: "Guide Spirituel",
        description: "Dirige notre congrégation avec sagesse et compassion depuis plus de 15 ans.",
        facebookLink: "#",
        twitterLink: "#",
        instagramLink: "#"
      },
      {
        name: "Cheikh Ousmane Diop",
        role: "Président de la Dahira",
        description: "Coordonne toutes les activités et représente notre congrégation dans la communauté.",
        facebookLink: "#",
        twitterLink: "#",
        instagramLink: "#"
      },
      {
        name: "Mme Aminata Seck",
        role: "Directrice des Programmes Éducatifs",
        description: "Organise les cours et séminaires pour développer la connaissance religieuse.",
        facebookLink: "#",
        twitterLink: "#",
        instagramLink: "#"
      }
    ];
    
    defaultLeaders.forEach(leader => this.createLeader(leader));
  }
  
  // Initialize default events
  private initializeEvents() {
    const defaultEvents: InsertEvent[] = [
      {
        title: "Grand Magal Célébration",
        description: "Commémoration annuelle du départ en exil de Cheikh Ahmadou Bamba avec prières, chants et repas communautaire.",
        date: "15",
        month: "Juin",
        year: "2024",
        venue: "Dahira Miftahoun Nasri, Guediawaye-Notaire",
        time: "9:00 - 22:00",
        slug: "grand-magal-celebration"
      },
      {
        title: "Conférence Annuelle",
        description: "Conférence sur l'héritage spirituel de Cheikh Ahmadou Bamba avec des intervenants renommés.",
        date: "22",
        month: "Juillet",
        year: "2024",
        venue: "Centre Culturel, Guediawaye",
        time: "14:00 - 18:00",
        slug: "conference-annuelle"
      },
      {
        title: "Journée Éducative",
        description: "Séminaire intensif sur les enseignements et la doctrine Mouride pour tous les niveaux.",
        date: "5",
        month: "Août",
        year: "2024",
        venue: "Dahira Miftahoun Nasri, Guediawaye-Notaire",
        time: "10:00 - 16:00",
        slug: "journee-educative"
      },
      {
        title: "Action Caritative",
        description: "Distribution de repas et de fournitures scolaires aux familles défavorisées de notre communauté.",
        date: "19",
        month: "Août",
        year: "2024",
        venue: "Place Publique, Guediawaye-Notaire",
        time: "9:00 - 13:00",
        slug: "action-caritative"
      }
    ];
    
    defaultEvents.forEach(event => this.createEvent(event));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact message operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const now = new Date();
    const contactMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt: now, 
      responded: false 
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  // Newsletter operations
  async subscribeToNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    // Check if email already exists
    const existingSubscriber = Array.from(this.newsletterSubscribers.values()).find(
      (sub) => sub.email === subscriber.email
    );
    
    if (existingSubscriber) {
      if (!existingSubscriber.active) {
        // Reactivate subscription
        existingSubscriber.active = true;
        this.newsletterSubscribers.set(existingSubscriber.id, existingSubscriber);
        return existingSubscriber;
      }
      return existingSubscriber;
    }
    
    const id = this.currentNewsletterSubscriberId++;
    const now = new Date();
    const newSubscriber: NewsletterSubscriber = {
      ...subscriber,
      id,
      createdAt: now,
      active: true
    };
    this.newsletterSubscribers.set(id, newSubscriber);
    return newSubscriber;
  }
  
  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return Array.from(this.newsletterSubscribers.values()).filter(
      (subscriber) => subscriber.active
    );
  }
  
  // Event operations
  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const now = new Date();
    const newEvent: Event = { ...event, id, createdAt: now };
    this.events.set(id, newEvent);
    return newEvent;
  }
  
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }
  
  async getEventBySlug(slug: string): Promise<Event | undefined> {
    return Array.from(this.events.values()).find(
      (event) => event.slug === slug
    );
  }
  
  // Activity operations
  async createActivity(activity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const now = new Date();
    const newActivity: Activity = { ...activity, id, createdAt: now };
    this.activities.set(id, newActivity);
    return newActivity;
  }
  
  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values());
  }
  
  // Leader operations
  async createLeader(leader: InsertLeader): Promise<Leader> {
    const id = this.currentLeaderId++;
    const now = new Date();
    const newLeader: Leader = { ...leader, id, createdAt: now };
    this.leaders.set(id, newLeader);
    return newLeader;
  }
  
  async getLeaders(): Promise<Leader[]> {
    return Array.from(this.leaders.values());
  }
  
  // Gallery operations
  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const id = this.currentGalleryImageId++;
    const now = new Date();
    const newImage: GalleryImage = { ...image, id, createdAt: now };
    this.galleryImages.set(id, newImage);
    return newImage;
  }
  
  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values());
  }
  
  async getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
    if (category === "Tous") {
      return this.getGalleryImages();
    }
    
    return Array.from(this.galleryImages.values()).filter(
      (image) => image.category === category
    );
  }
  
  // Prayer time operations
  async createPrayerTime(prayerTime: InsertPrayerTime): Promise<PrayerTime> {
    const id = this.currentPrayerTimeId++;
    const now = new Date();
    const newPrayerTime: PrayerTime = { ...prayerTime, id, updatedAt: now };
    this.prayerTimes.set(id, newPrayerTime);
    return newPrayerTime;
  }
  
  async updatePrayerTime(id: number, time: string): Promise<PrayerTime | undefined> {
    const prayerTime = this.prayerTimes.get(id);
    if (!prayerTime) return undefined;
    
    const now = new Date();
    const updatedPrayerTime: PrayerTime = {
      ...prayerTime,
      time,
      updatedAt: now
    };
    
    this.prayerTimes.set(id, updatedPrayerTime);
    return updatedPrayerTime;
  }
  
  async getPrayerTimes(): Promise<PrayerTime[]> {
    return Array.from(this.prayerTimes.values());
  }
}

export const storage = new MemStorage();
