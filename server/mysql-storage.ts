import { query } from './db';
import {
  type User, type InsertUser,
  type ContactMessage, type InsertContactMessage,
  type NewsletterSubscriber, type InsertNewsletterSubscriber,
  type Event, type InsertEvent,
  type Activity, type InsertActivity,
  type Leader, type InsertLeader,
  type GalleryImage, type InsertGalleryImage,
  type PrayerTime, type InsertPrayerTime
} from "@shared/schema";
import { IStorage } from './storage';
import { log } from './vite';

export class MySQLStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      const results = await query('SELECT * FROM users WHERE id = ?', [id]);
      // @ts-ignore
      return results.length > 0 ? results[0] as User : undefined;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const results = await query('SELECT * FROM users WHERE username = ?', [username]);
      // @ts-ignore
      return results.length > 0 ? results[0] as User : undefined;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur par nom d\'utilisateur:', error);
      return undefined;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      const result = await query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [user.username, user.password]
      );
      // @ts-ignore
      const userId = result.insertId;
      return { id: userId, ...user };
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  }

  // Contact message operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    try {
      const result = await query(
        'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [message.name, message.email, message.subject, message.message]
      );
      // @ts-ignore
      const messageId = result.insertId;
      const createdAt = new Date();
      return { 
        id: messageId, 
        ...message, 
        createdAt, 
        responded: false 
      };
    } catch (error) {
      console.error('Erreur lors de la création du message de contact:', error);
      throw error;
    }
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    try {
      const results = await query('SELECT * FROM contact_messages ORDER BY created_at DESC');
      // @ts-ignore
      return results.map(row => ({
        id: row.id,
        name: row.name,
        email: row.email,
        subject: row.subject,
        message: row.message,
        createdAt: row.created_at,
        responded: Boolean(row.responded)
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des messages de contact:', error);
      return [];
    }
  }

  // Newsletter operations
  async subscribeToNewsletter(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    try {
      // Vérifier si l'email existe déjà
      const existingSubscriber = await query(
        'SELECT * FROM newsletter_subscribers WHERE email = ?',
        [subscriber.email]
      );
      
      // @ts-ignore
      if (existingSubscriber.length > 0) {
        // Réactiver si désactivé
        // @ts-ignore
        if (!existingSubscriber[0].active) {
          await query(
            'UPDATE newsletter_subscribers SET active = TRUE WHERE email = ?',
            [subscriber.email]
          );
        }
        
        // @ts-ignore
        return {
          // @ts-ignore
          id: existingSubscriber[0].id,
          name: subscriber.name,
          email: subscriber.email,
          // @ts-ignore
          createdAt: existingSubscriber[0].created_at,
          active: true
        };
      }
      
      // Créer un nouvel abonné
      const result = await query(
        'INSERT INTO newsletter_subscribers (name, email) VALUES (?, ?)',
        [subscriber.name, subscriber.email]
      );
      
      // @ts-ignore
      const subscriberId = result.insertId;
      const createdAt = new Date();
      
      return {
        id: subscriberId,
        ...subscriber,
        createdAt,
        active: true
      };
    } catch (error) {
      console.error('Erreur lors de l\'abonnement à la newsletter:', error);
      throw error;
    }
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    try {
      const results = await query('SELECT * FROM newsletter_subscribers WHERE active = TRUE');
      // @ts-ignore
      return results.map(row => ({
        id: row.id,
        name: row.name,
        email: row.email,
        createdAt: row.created_at,
        active: Boolean(row.active)
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des abonnés à la newsletter:', error);
      return [];
    }
  }

  // Event operations
  async createEvent(event: InsertEvent): Promise<Event> {
    try {
      const result = await query(
        'INSERT INTO events (title, description, date, month, year, venue, time, slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [event.title, event.description, event.date, event.month, event.year, event.venue, event.time, event.slug]
      );
      // @ts-ignore
      const eventId = result.insertId;
      const createdAt = new Date();
      return { id: eventId, ...event, createdAt };
    } catch (error) {
      console.error('Erreur lors de la création de l\'événement:', error);
      throw error;
    }
  }

  async getEvents(): Promise<Event[]> {
    try {
      const results = await query('SELECT * FROM events ORDER BY year, month, date');
      // @ts-ignore
      return results.map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
        date: row.date,
        month: row.month,
        year: row.year,
        venue: row.venue,
        time: row.time,
        slug: row.slug,
        createdAt: row.created_at
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
      return [];
    }
  }

  async getEventBySlug(slug: string): Promise<Event | undefined> {
    try {
      const results = await query('SELECT * FROM events WHERE slug = ?', [slug]);
      // @ts-ignore
      if (results.length === 0) return undefined;
      
      // @ts-ignore
      const row = results[0];
      return {
        id: row.id,
        title: row.title,
        description: row.description,
        date: row.date,
        month: row.month,
        year: row.year,
        venue: row.venue,
        time: row.time,
        slug: row.slug,
        createdAt: row.created_at
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'événement par slug:', error);
      return undefined;
    }
  }

  // Activity operations
  async createActivity(activity: InsertActivity): Promise<Activity> {
    try {
      const result = await query(
        'INSERT INTO activities (title, description, icon, schedule) VALUES (?, ?, ?, ?)',
        [activity.title, activity.description, activity.icon, activity.schedule]
      );
      // @ts-ignore
      const activityId = result.insertId;
      const createdAt = new Date();
      return { id: activityId, ...activity, createdAt };
    } catch (error) {
      console.error('Erreur lors de la création de l\'activité:', error);
      throw error;
    }
  }

  async getActivities(): Promise<Activity[]> {
    try {
      const results = await query('SELECT * FROM activities');
      // @ts-ignore
      return results.map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
        icon: row.icon,
        schedule: row.schedule,
        createdAt: row.created_at
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des activités:', error);
      return [];
    }
  }

  // Leader operations
  async createLeader(leader: InsertLeader): Promise<Leader> {
    try {
      const result = await query(
        'INSERT INTO leaders (name, role, description, image, facebook_link, twitter_link, instagram_link) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          leader.name, 
          leader.role, 
          leader.description, 
          leader.image || null, 
          leader.facebookLink || null, 
          leader.twitterLink || null, 
          leader.instagramLink || null
        ]
      );
      // @ts-ignore
      const leaderId = result.insertId;
      const createdAt = new Date();
      
      return { 
        id: leaderId, 
        name: leader.name,
        role: leader.role,
        description: leader.description,
        image: leader.image || null,
        facebookLink: leader.facebookLink || null,
        twitterLink: leader.twitterLink || null,
        instagramLink: leader.instagramLink || null,
        createdAt 
      };
    } catch (error) {
      console.error('Erreur lors de la création du responsable:', error);
      throw error;
    }
  }

  async getLeaders(): Promise<Leader[]> {
    try {
      const results = await query('SELECT * FROM leaders');
      // @ts-ignore
      return results.map(row => ({
        id: row.id,
        name: row.name,
        role: row.role,
        description: row.description,
        image: row.image,
        facebookLink: row.facebook_link,
        twitterLink: row.twitter_link,
        instagramLink: row.instagram_link,
        createdAt: row.created_at
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des responsables:', error);
      return [];
    }
  }

  // Gallery operations
  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    try {
      const result = await query(
        'INSERT INTO gallery_images (src, alt, category) VALUES (?, ?, ?)',
        [image.src, image.alt, image.category]
      );
      // @ts-ignore
      const imageId = result.insertId;
      const createdAt = new Date();
      return { id: imageId, ...image, createdAt };
    } catch (error) {
      console.error('Erreur lors de la création de l\'image de galerie:', error);
      throw error;
    }
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    try {
      const results = await query('SELECT * FROM gallery_images');
      // @ts-ignore
      return results.map(row => ({
        id: row.id,
        src: row.src,
        alt: row.alt,
        category: row.category,
        createdAt: row.created_at
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des images de galerie:', error);
      return [];
    }
  }

  async getGalleryImagesByCategory(category: string): Promise<GalleryImage[]> {
    try {
      if (category === "Tous") {
        return this.getGalleryImages();
      }
      
      const results = await query('SELECT * FROM gallery_images WHERE category = ?', [category]);
      // @ts-ignore
      return results.map(row => ({
        id: row.id,
        src: row.src,
        alt: row.alt,
        category: row.category,
        createdAt: row.created_at
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des images de galerie par catégorie:', error);
      return [];
    }
  }

  // Prayer time operations
  async createPrayerTime(prayerTime: InsertPrayerTime): Promise<PrayerTime> {
    try {
      const result = await query(
        'INSERT INTO prayer_times (name, time) VALUES (?, ?)',
        [prayerTime.name, prayerTime.time]
      );
      // @ts-ignore
      const prayerTimeId = result.insertId;
      const updatedAt = new Date();
      return { id: prayerTimeId, ...prayerTime, updatedAt };
    } catch (error) {
      console.error('Erreur lors de la création de l\'horaire de prière:', error);
      throw error;
    }
  }

  async updatePrayerTime(id: number, time: string): Promise<PrayerTime | undefined> {
    try {
      const prayerTimeResult = await query('SELECT * FROM prayer_times WHERE id = ?', [id]);
      
      // @ts-ignore
      if (prayerTimeResult.length === 0) return undefined;
      
      await query('UPDATE prayer_times SET time = ? WHERE id = ?', [time, id]);
      
      // @ts-ignore
      const updatedResult = await query('SELECT * FROM prayer_times WHERE id = ?', [id]);
      // @ts-ignore
      const row = updatedResult[0];
      
      return {
        id: row.id,
        name: row.name,
        time: row.time,
        updatedAt: row.updated_at
      };
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'horaire de prière:', error);
      return undefined;
    }
  }

  async getPrayerTimes(): Promise<PrayerTime[]> {
    try {
      const results = await query('SELECT * FROM prayer_times');
      // @ts-ignore
      return results.map(row => ({
        id: row.id,
        name: row.name,
        time: row.time,
        updatedAt: row.updated_at
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des horaires de prière:', error);
      return [];
    }
  }
}

// Créer et exporter une instance de MySQLStorage
export const mysqlStorage = new MySQLStorage();