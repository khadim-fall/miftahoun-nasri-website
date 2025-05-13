import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { mysqlStorage } from "./mysql-storage";
import { testDatabaseConnection } from "./db";
import { 
  insertContactMessageSchema,
  insertNewsletterSubscriberSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // Détermine quel stockage utiliser en fonction de la connexion à la base de données
  const isDbConnected = await testDatabaseConnection();
  const activeStorage = isDbConnected ? mysqlStorage : storage;
  
  log(`Utilisation du stockage ${isDbConnected ? 'MySQL' : 'en mémoire'}`, 'storage');
  
  // API routes for the Dahira Miftahoun Nasri website
  
  // Contact form submission
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await activeStorage.createContactMessage(contactData);
      
      return res.status(201).json({
        success: true,
        message: "Message envoyé avec succès",
        data: contactMessage
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: "Erreur de validation",
          errors: validationError.details
        });
      }
      
      console.error("Error in contact form submission:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de l'envoi du message"
      });
    }
  });
  
  // Newsletter subscription
  app.post("/api/newsletter", async (req: Request, res: Response) => {
    try {
      const subscriptionData = insertNewsletterSubscriberSchema.parse(req.body);
      const subscriber = await activeStorage.subscribeToNewsletter(subscriptionData);
      
      return res.status(201).json({
        success: true,
        message: "Abonnement à la newsletter réussi",
        data: subscriber
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: "Erreur de validation",
          errors: validationError.details
        });
      }
      
      console.error("Error in newsletter subscription:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de l'abonnement à la newsletter"
      });
    }
  });
  
  // Get prayer times
  app.get("/api/prayer-times", async (_req: Request, res: Response) => {
    try {
      const prayerTimes = await activeStorage.getPrayerTimes();
      return res.status(200).json({
        success: true,
        data: prayerTimes
      });
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la récupération des horaires de prière"
      });
    }
  });
  
  // Get activities
  app.get("/api/activities", async (_req: Request, res: Response) => {
    try {
      const activities = await activeStorage.getActivities();
      return res.status(200).json({
        success: true,
        data: activities
      });
    } catch (error) {
      console.error("Error fetching activities:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la récupération des activités"
      });
    }
  });
  
  // Get leaders
  app.get("/api/leaders", async (_req: Request, res: Response) => {
    try {
      const leaders = await activeStorage.getLeaders();
      return res.status(200).json({
        success: true,
        data: leaders
      });
    } catch (error) {
      console.error("Error fetching leaders:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la récupération des responsables"
      });
    }
  });
  
  // Get all events
  app.get("/api/events", async (_req: Request, res: Response) => {
    try {
      const events = await activeStorage.getEvents();
      return res.status(200).json({
        success: true,
        data: events
      });
    } catch (error) {
      console.error("Error fetching events:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la récupération des événements"
      });
    }
  });
  
  // Get event by slug
  app.get("/api/events/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const event = await activeStorage.getEventBySlug(slug);
      
      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Événement non trouvé"
        });
      }
      
      return res.status(200).json({
        success: true,
        data: event
      });
    } catch (error) {
      console.error("Error fetching event by slug:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la récupération de l'événement"
      });
    }
  });
  
  // Get gallery images
  app.get("/api/gallery", async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      let galleryImages;
      
      if (category && typeof category === 'string') {
        galleryImages = await activeStorage.getGalleryImagesByCategory(category);
      } else {
        galleryImages = await activeStorage.getGalleryImages();
      }
      
      return res.status(200).json({
        success: true,
        data: galleryImages
      });
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la récupération des images de la galerie"
      });
    }
  });
  
  // Get contact messages
  app.get("/api/admin/contact-messages", async (_req: Request, res: Response) => {
    try {
      const contactMessages = await activeStorage.getContactMessages();
      return res.status(200).json({
        success: true,
        data: contactMessages
      });
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la récupération des messages de contact"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
