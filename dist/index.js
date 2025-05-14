// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  contactMessages;
  newsletterSubscribers;
  events;
  activities;
  leaders;
  galleryImages;
  prayerTimes;
  currentUserId;
  currentContactMessageId;
  currentNewsletterSubscriberId;
  currentEventId;
  currentActivityId;
  currentLeaderId;
  currentGalleryImageId;
  currentPrayerTimeId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contactMessages = /* @__PURE__ */ new Map();
    this.newsletterSubscribers = /* @__PURE__ */ new Map();
    this.events = /* @__PURE__ */ new Map();
    this.activities = /* @__PURE__ */ new Map();
    this.leaders = /* @__PURE__ */ new Map();
    this.galleryImages = /* @__PURE__ */ new Map();
    this.prayerTimes = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentContactMessageId = 1;
    this.currentNewsletterSubscriberId = 1;
    this.currentEventId = 1;
    this.currentActivityId = 1;
    this.currentLeaderId = 1;
    this.currentGalleryImageId = 1;
    this.currentPrayerTimeId = 1;
    this.initializePrayerTimes();
    this.initializeActivities();
    this.initializeLeaders();
    this.initializeEvents();
  }
  // Initialize default prayer times
  initializePrayerTimes() {
    const defaultPrayerTimes = [
      { name: "Fajr", time: "05:30" },
      { name: "Dhuhr", time: "13:15" },
      { name: "Asr", time: "16:30" },
      { name: "Maghrib", time: "19:05" },
      { name: "Isha", time: "20:30" }
    ];
    defaultPrayerTimes.forEach((pt) => this.createPrayerTime(pt));
  }
  // Initialize default activities
  initializeActivities() {
    const defaultActivities = [
      {
        title: "\xC9tude du Coran",
        description: "Sessions hebdomadaires d'\xE9tude et de r\xE9citation du Coran pour tous les \xE2ges, dirig\xE9es par nos \xE9rudits.",
        icon: "fa-book",
        schedule: "Tous les samedis | 16:00 - 18:00"
      },
      {
        title: "Dhikr Collectif",
        description: "Rassemblement spirituel pour les pri\xE8res et chants de louange collectifs dans la tradition mouride.",
        icon: "fa-pray",
        schedule: "Vendredi soir | 20:30 - 22:00"
      },
      {
        title: "Enseignements Religieux",
        description: "Cours sur les enseignements de Cheikh Ahmadou Bamba et la spiritualit\xE9 mouride.",
        icon: "fa-chalkboard-teacher",
        schedule: "Dimanches | 10:00 - 12:00"
      },
      {
        title: "Service Communautaire",
        description: "Initiatives de bienfaisance pour aider les membres de la communaut\xE9 et les personnes dans le besoin.",
        icon: "fa-hands-helping",
        schedule: "Premier samedi du mois | 09:00 - 14:00"
      },
      {
        title: "\xC9cole Coranique pour Enfants",
        description: "Cours adapt\xE9s aux enfants pour apprendre les bases de l'islam et les valeurs mourides.",
        icon: "fa-child",
        schedule: "Mercredis & Samedis | 14:00 - 16:00"
      },
      {
        title: "Groupes d'\xC9tude",
        description: "Cercles de discussion et d'\xE9tude pour approfondir les connaissances religieuses et spirituelles.",
        icon: "fa-users",
        schedule: "Lundis | 19:00 - 20:30"
      }
    ];
    defaultActivities.forEach((activity) => this.createActivity(activity));
  }
  // Initialize default leaders
  initializeLeaders() {
    const defaultLeaders = [
      {
        name: "Imam Abdoul Aziz Ndiaye",
        role: "Guide Spirituel",
        description: "Dirige notre congr\xE9gation avec sagesse et compassion depuis plus de 15 ans.",
        facebookLink: "#",
        twitterLink: "#",
        instagramLink: "#"
      },
      {
        name: "Cheikh Ousmane Diop",
        role: "Pr\xE9sident de la Dahira",
        description: "Coordonne toutes les activit\xE9s et repr\xE9sente notre congr\xE9gation dans la communaut\xE9.",
        facebookLink: "#",
        twitterLink: "#",
        instagramLink: "#"
      },
      {
        name: "Mme Aminata Seck",
        role: "Directrice des Programmes \xC9ducatifs",
        description: "Organise les cours et s\xE9minaires pour d\xE9velopper la connaissance religieuse.",
        facebookLink: "#",
        twitterLink: "#",
        instagramLink: "#"
      }
    ];
    defaultLeaders.forEach((leader) => this.createLeader(leader));
  }
  // Initialize default events
  initializeEvents() {
    const defaultEvents = [
      {
        title: "Grand Magal C\xE9l\xE9bration",
        description: "Comm\xE9moration annuelle du d\xE9part en exil de Cheikh Ahmadou Bamba avec pri\xE8res, chants et repas communautaire.",
        date: "15",
        month: "Juin",
        year: "2024",
        venue: "Dahira Miftahoun Nasri, Guediawaye-Notaire",
        time: "9:00 - 22:00",
        slug: "grand-magal-celebration"
      },
      {
        title: "Conf\xE9rence Annuelle",
        description: "Conf\xE9rence sur l'h\xE9ritage spirituel de Cheikh Ahmadou Bamba avec des intervenants renomm\xE9s.",
        date: "22",
        month: "Juillet",
        year: "2024",
        venue: "Centre Culturel, Guediawaye",
        time: "14:00 - 18:00",
        slug: "conference-annuelle"
      },
      {
        title: "Journ\xE9e \xC9ducative",
        description: "S\xE9minaire intensif sur les enseignements et la doctrine Mouride pour tous les niveaux.",
        date: "5",
        month: "Ao\xFBt",
        year: "2024",
        venue: "Dahira Miftahoun Nasri, Guediawaye-Notaire",
        time: "10:00 - 16:00",
        slug: "journee-educative"
      },
      {
        title: "Action Caritative",
        description: "Distribution de repas et de fournitures scolaires aux familles d\xE9favoris\xE9es de notre communaut\xE9.",
        date: "19",
        month: "Ao\xFBt",
        year: "2024",
        venue: "Place Publique, Guediawaye-Notaire",
        time: "9:00 - 13:00",
        slug: "action-caritative"
      }
    ];
    defaultEvents.forEach((event) => this.createEvent(event));
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const now = /* @__PURE__ */ new Date();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Contact message operations
  async createContactMessage(message) {
    const id = this.currentContactMessageId++;
    const now = /* @__PURE__ */ new Date();
    const contactMessage = {
      ...message,
      id,
      createdAt: now,
      responded: false
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  async getContactMessages() {
    return Array.from(this.contactMessages.values());
  }
  // Newsletter operations
  async subscribeToNewsletter(subscriber) {
    const existingSubscriber = Array.from(this.newsletterSubscribers.values()).find(
      (sub) => sub.email === subscriber.email
    );
    if (existingSubscriber) {
      if (!existingSubscriber.active) {
        existingSubscriber.active = true;
        this.newsletterSubscribers.set(existingSubscriber.id, existingSubscriber);
        return existingSubscriber;
      }
      return existingSubscriber;
    }
    const id = this.currentNewsletterSubscriberId++;
    const now = /* @__PURE__ */ new Date();
    const newSubscriber = {
      ...subscriber,
      id,
      createdAt: now,
      active: true
    };
    this.newsletterSubscribers.set(id, newSubscriber);
    return newSubscriber;
  }
  async getNewsletterSubscribers() {
    return Array.from(this.newsletterSubscribers.values()).filter(
      (subscriber) => subscriber.active
    );
  }
  // Event operations
  async createEvent(event) {
    const id = this.currentEventId++;
    const now = /* @__PURE__ */ new Date();
    const newEvent = { ...event, id, createdAt: now };
    this.events.set(id, newEvent);
    return newEvent;
  }
  async getEvents() {
    return Array.from(this.events.values());
  }
  async getEventBySlug(slug) {
    return Array.from(this.events.values()).find(
      (event) => event.slug === slug
    );
  }
  // Activity operations
  async createActivity(activity) {
    const id = this.currentActivityId++;
    const now = /* @__PURE__ */ new Date();
    const newActivity = { ...activity, id, createdAt: now };
    this.activities.set(id, newActivity);
    return newActivity;
  }
  async getActivities() {
    return Array.from(this.activities.values());
  }
  // Leader operations
  async createLeader(leader) {
    const id = this.currentLeaderId++;
    const now = /* @__PURE__ */ new Date();
    const newLeader = { ...leader, id, createdAt: now };
    this.leaders.set(id, newLeader);
    return newLeader;
  }
  async getLeaders() {
    return Array.from(this.leaders.values());
  }
  // Gallery operations
  async createGalleryImage(image) {
    const id = this.currentGalleryImageId++;
    const now = /* @__PURE__ */ new Date();
    const newImage = { ...image, id, createdAt: now };
    this.galleryImages.set(id, newImage);
    return newImage;
  }
  async getGalleryImages() {
    return Array.from(this.galleryImages.values());
  }
  async getGalleryImagesByCategory(category) {
    if (category === "Tous") {
      return this.getGalleryImages();
    }
    return Array.from(this.galleryImages.values()).filter(
      (image) => image.category === category
    );
  }
  // Prayer time operations
  async createPrayerTime(prayerTime) {
    const id = this.currentPrayerTimeId++;
    const now = /* @__PURE__ */ new Date();
    const newPrayerTime = { ...prayerTime, id, updatedAt: now };
    this.prayerTimes.set(id, newPrayerTime);
    return newPrayerTime;
  }
  async updatePrayerTime(id, time) {
    const prayerTime = this.prayerTimes.get(id);
    if (!prayerTime) return void 0;
    const now = /* @__PURE__ */ new Date();
    const updatedPrayerTime = {
      ...prayerTime,
      time,
      updatedAt: now
    };
    this.prayerTimes.set(id, updatedPrayerTime);
    return updatedPrayerTime;
  }
  async getPrayerTimes() {
    return Array.from(this.prayerTimes.values());
  }
};
var storage = new MemStorage();

// server/db.ts
import mysql from "mysql2/promise";

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: ["localhost"]
    // ou allowedHosts: true si ton type le permet
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/db.ts
var dbConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "dahira_miftahoun_nasri",
  port: Number(process.env.MYSQL_PORT) || 3306
};
var pool = mysql.createPool(dbConfig);
async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    log("Connexion \xE0 la base de donn\xE9es MySQL r\xE9ussie", "database");
    connection.release();
    return true;
  } catch (error) {
    console.error("Erreur de connexion \xE0 la base de donn\xE9es MySQL:", error);
    return false;
  }
}
async function query(sql, params = []) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error("Erreur lors de l'ex\xE9cution de la requ\xEAte SQL:", error);
    throw error;
  }
}
async function initializeDatabase() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        responded BOOLEAN DEFAULT FALSE
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        active BOOLEAN DEFAULT TRUE
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        date VARCHAR(50) NOT NULL,
        month VARCHAR(50) NOT NULL,
        year VARCHAR(50) NOT NULL,
        venue VARCHAR(255) NOT NULL,
        time VARCHAR(100) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(100) NOT NULL,
        schedule VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS leaders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255),
        facebook_link VARCHAR(255),
        twitter_link VARCHAR(255),
        instagram_link VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS gallery_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        src VARCHAR(255) NOT NULL,
        alt VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await query(`
      CREATE TABLE IF NOT EXISTS prayer_times (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        time VARCHAR(100) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    log("Tables cr\xE9\xE9es avec succ\xE8s dans la base de donn\xE9es MySQL", "database");
    await initializeDefaultData();
    return true;
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de donn\xE9es:", error);
    return false;
  }
}
async function initializeDefaultData() {
  try {
    const prayerTimesCount = await query("SELECT COUNT(*) as count FROM prayer_times");
    const activitiesCount = await query("SELECT COUNT(*) as count FROM activities");
    const leadersCount = await query("SELECT COUNT(*) as count FROM leaders");
    const eventsCount = await query("SELECT COUNT(*) as count FROM events");
    if (prayerTimesCount[0].count === 0) {
      await query(`
        INSERT INTO prayer_times (name, time) VALUES 
        ('Fajr', '05:30'),
        ('Dhuhr', '13:15'),
        ('Asr', '16:30'),
        ('Maghrib', '19:05'),
        ('Isha', '20:30')
      `);
      log("Horaires de pri\xE8re initialis\xE9s", "database");
    }
    if (activitiesCount[0].count === 0) {
      await query(`
  INSERT INTO activities (title, description, icon, schedule) VALUES 
  ('\xC9tude du Coran', 'Sessions hebdomadaires d''\xE9tude et de r\xE9citation du Coran pour tous les \xE2ges, dirig\xE9es par nos \xE9rudits.', 'fa-book', 'Tous les samedis | 16:00 - 18:00'),
  ('Dhikr Collectif', 'Rassemblement spirituel pour les pri\xE8res et chants de louange collectifs dans la tradition mouride.', 'fa-pray', 'Vendredi soir | 20:30 - 22:00'),
  ('Enseignements Religieux', 'Cours sur les enseignements de Cheikh Ahmadou Bamba et la spiritualit\xE9 mouride.', 'fa-chalkboard-teacher', 'Dimanches | 10:00 - 12:00'),
  ('Service Communautaire', 'Initiatives de bienfaisance pour aider les membres de la communaut\xE9 et les personnes dans le besoin.', 'fa-hands-helping', 'Premier samedi du mois | 09:00 - 14:00'),
  ('\xC9cole Coranique pour Enfants', 'Cours adapt\xE9s aux enfants pour apprendre les bases de l''islam et les valeurs mourides.', 'fa-child', 'Mercredis & Samedis | 14:00 - 16:00'),
  ('Groupes d''\xC9tude', 'Cercles de discussion et d''\xE9tude pour approfondir les connaissances religieuses et spirituelles.', 'fa-users', 'Lundis | 19:00 - 20:30')
`);
      log("Activit\xE9s initialis\xE9es", "database");
    }
    if (leadersCount[0].count === 0) {
      await query(`
        INSERT INTO leaders (name, role, description, facebook_link, twitter_link, instagram_link) VALUES 
        ('Imam Abdoul Aziz Ndiaye', 'Guide Spirituel', 'Dirige notre congr\xE9gation avec sagesse et compassion depuis plus de 15 ans.', '#', '#', '#'),
        ('Cheikh Ousmane Diop', 'Pr\xE9sident de la Dahira', 'Coordonne toutes les activit\xE9s et repr\xE9sente notre congr\xE9gation dans la communaut\xE9.', '#', '#', '#'),
        ('Mme Aminata Seck', 'Directrice des Programmes \xC9ducatifs', 'Organise les cours et s\xE9minaires pour d\xE9velopper la connaissance religieuse.', '#', '#', '#')
      `);
      log("Responsables initialis\xE9s", "database");
    }
    if (eventsCount[0].count === 0) {
      await query(`
        INSERT INTO events (title, description, date, month, year, venue, time, slug) VALUES 
        ('Grand Magal C\xE9l\xE9bration', 'Comm\xE9moration annuelle du d\xE9part en exil de Cheikh Ahmadou Bamba avec pri\xE8res, chants et repas communautaire.', '15', 'Juin', '2024', 'Dahira Miftahoun Nasri, Guediawaye-Notaire', '9:00 - 22:00', 'grand-magal-celebration'),
        ('Conf\xE9rence Annuelle', 'Conf\xE9rence sur l'h\xE9ritage spirituel de Cheikh Ahmadou Bamba avec des intervenants renomm\xE9s.', '22', 'Juillet', '2024', 'Centre Culturel, Guediawaye', '14:00 - 18:00', 'conference-annuelle'),
        ('Journ\xE9e \xC9ducative', 'S\xE9minaire intensif sur les enseignements et la doctrine Mouride pour tous les niveaux.', '5', 'Ao\xFBt', '2024', 'Dahira Miftahoun Nasri, Guediawaye-Notaire', '10:00 - 16:00', 'journee-educative'),
        ('Action Caritative', 'Distribution de repas et de fournitures scolaires aux familles d\xE9favoris\xE9es de notre communaut\xE9.', '19', 'Ao\xFBt', '2024', 'Place Publique, Guediawaye-Notaire', '9:00 - 13:00', 'action-caritative')
      `);
      log("\xC9v\xE9nements initialis\xE9s", "database");
    }
    return true;
  } catch (error) {
    console.error("Erreur lors de l'initialisation des donn\xE9es par d\xE9faut:", error);
    return false;
  }
}

// server/mysql-storage.ts
var MySQLStorage = class {
  // User operations
  async getUser(id) {
    try {
      const results = await query("SELECT * FROM users WHERE id = ?", [id]);
      return results.length > 0 ? results[0] : void 0;
    } catch (error) {
      console.error("Erreur lors de la r\xE9cup\xE9ration de l'utilisateur:", error);
      return void 0;
    }
  }
  async getUserByUsername(username) {
    try {
      const results = await query("SELECT * FROM users WHERE username = ?", [username]);
      return results.length > 0 ? results[0] : void 0;
    } catch (error) {
      console.error("Erreur lors de la r\xE9cup\xE9ration de l'utilisateur par nom d'utilisateur:", error);
      return void 0;
    }
  }
  async createUser(user) {
    try {
      const result = await query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [user.username, user.password]
      );
      const userId = result.insertId;
      return { id: userId, ...user };
    } catch (error) {
      console.error("Erreur lors de la cr\xE9ation de l'utilisateur:", error);
      throw error;
    }
  }
  // Contact message operations
  async createContactMessage(message) {
    try {
      const result = await query(
        "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
        [message.name, message.email, message.subject, message.message]
      );
      const messageId = result.insertId;
      const createdAt = /* @__PURE__ */ new Date();
      return {
        id: messageId,
        ...message,
        createdAt,
        responded: false
      };
    } catch (error) {
      console.error("Erreur lors de la cr\xE9ation du message de contact:", error);
      throw error;
    }
  }
  async getContactMessages() {
    try {
      const results = await query("SELECT * FROM contact_messages ORDER BY created_at DESC");
      return results.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        subject: row.subject,
        message: row.message,
        createdAt: row.created_at,
        responded: Boolean(row.responded)
      }));
    } catch (error) {
      console.error("Erreur lors de la r\xE9cup\xE9ration des messages de contact:", error);
      return [];
    }
  }
  // Newsletter operations
  async subscribeToNewsletter(subscriber) {
    try {
      const existingSubscriber = await query(
        "SELECT * FROM newsletter_subscribers WHERE email = ?",
        [subscriber.email]
      );
      if (existingSubscriber.length > 0) {
        if (!existingSubscriber[0].active) {
          await query(
            "UPDATE newsletter_subscribers SET active = TRUE WHERE email = ?",
            [subscriber.email]
          );
        }
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
      const result = await query(
        "INSERT INTO newsletter_subscribers (name, email) VALUES (?, ?)",
        [subscriber.name, subscriber.email]
      );
      const subscriberId = result.insertId;
      const createdAt = /* @__PURE__ */ new Date();
      return {
        id: subscriberId,
        ...subscriber,
        createdAt,
        active: true
      };
    } catch (error) {
      console.error("Erreur lors de l'abonnement \xE0 la newsletter:", error);
      throw error;
    }
  }
  async getNewsletterSubscribers() {
    try {
      const results = await query("SELECT * FROM newsletter_subscribers WHERE active = TRUE");
      return results.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        createdAt: row.created_at,
        active: Boolean(row.active)
      }));
    } catch (error) {
      console.error("Erreur lors de la r\xE9cup\xE9ration des abonn\xE9s \xE0 la newsletter:", error);
      return [];
    }
  }
  // Event operations
  async createEvent(event) {
    try {
      const result = await query(
        "INSERT INTO events (title, description, date, month, year, venue, time, slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [event.title, event.description, event.date, event.month, event.year, event.venue, event.time, event.slug]
      );
      const eventId = result.insertId;
      const createdAt = /* @__PURE__ */ new Date();
      return { id: eventId, ...event, createdAt };
    } catch (error) {
      console.error("Erreur lors de la cr\xE9ation de l'\xE9v\xE9nement:", error);
      throw error;
    }
  }
  async getEvents() {
    try {
      const results = await query("SELECT * FROM events ORDER BY year, month, date");
      return results.map((row) => ({
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
      console.error("Erreur lors de la r\xE9cup\xE9ration des \xE9v\xE9nements:", error);
      return [];
    }
  }
  async getEventBySlug(slug) {
    try {
      const results = await query("SELECT * FROM events WHERE slug = ?", [slug]);
      if (results.length === 0) return void 0;
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
      console.error("Erreur lors de la r\xE9cup\xE9ration de l'\xE9v\xE9nement par slug:", error);
      return void 0;
    }
  }
  // Activity operations
  async createActivity(activity) {
    try {
      const result = await query(
        "INSERT INTO activities (title, description, icon, schedule) VALUES (?, ?, ?, ?)",
        [activity.title, activity.description, activity.icon, activity.schedule]
      );
      const activityId = result.insertId;
      const createdAt = /* @__PURE__ */ new Date();
      return { id: activityId, ...activity, createdAt };
    } catch (error) {
      console.error("Erreur lors de la cr\xE9ation de l'activit\xE9:", error);
      throw error;
    }
  }
  async getActivities() {
    try {
      const results = await query("SELECT * FROM activities");
      return results.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        icon: row.icon,
        schedule: row.schedule,
        createdAt: row.created_at
      }));
    } catch (error) {
      console.error("Erreur lors de la r\xE9cup\xE9ration des activit\xE9s:", error);
      return [];
    }
  }
  // Leader operations
  async createLeader(leader) {
    try {
      const result = await query(
        "INSERT INTO leaders (name, role, description, image, facebook_link, twitter_link, instagram_link) VALUES (?, ?, ?, ?, ?, ?, ?)",
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
      const leaderId = result.insertId;
      const createdAt = /* @__PURE__ */ new Date();
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
      console.error("Erreur lors de la cr\xE9ation du responsable:", error);
      throw error;
    }
  }
  async getLeaders() {
    try {
      const results = await query("SELECT * FROM leaders");
      return results.map((row) => ({
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
      console.error("Erreur lors de la r\xE9cup\xE9ration des responsables:", error);
      return [];
    }
  }
  // Gallery operations
  async createGalleryImage(image) {
    try {
      const result = await query(
        "INSERT INTO gallery_images (src, alt, category) VALUES (?, ?, ?)",
        [image.src, image.alt, image.category]
      );
      const imageId = result.insertId;
      const createdAt = /* @__PURE__ */ new Date();
      return { id: imageId, ...image, createdAt };
    } catch (error) {
      console.error("Erreur lors de la cr\xE9ation de l'image de galerie:", error);
      throw error;
    }
  }
  async getGalleryImages() {
    try {
      const results = await query("SELECT * FROM gallery_images");
      return results.map((row) => ({
        id: row.id,
        src: row.src,
        alt: row.alt,
        category: row.category,
        createdAt: row.created_at
      }));
    } catch (error) {
      console.error("Erreur lors de la r\xE9cup\xE9ration des images de galerie:", error);
      return [];
    }
  }
  async getGalleryImagesByCategory(category) {
    try {
      if (category === "Tous") {
        return this.getGalleryImages();
      }
      const results = await query("SELECT * FROM gallery_images WHERE category = ?", [category]);
      return results.map((row) => ({
        id: row.id,
        src: row.src,
        alt: row.alt,
        category: row.category,
        createdAt: row.created_at
      }));
    } catch (error) {
      console.error("Erreur lors de la r\xE9cup\xE9ration des images de galerie par cat\xE9gorie:", error);
      return [];
    }
  }
  // Prayer time operations
  async createPrayerTime(prayerTime) {
    try {
      const result = await query(
        "INSERT INTO prayer_times (name, time) VALUES (?, ?)",
        [prayerTime.name, prayerTime.time]
      );
      const prayerTimeId = result.insertId;
      const updatedAt = /* @__PURE__ */ new Date();
      return { id: prayerTimeId, ...prayerTime, updatedAt };
    } catch (error) {
      console.error("Erreur lors de la cr\xE9ation de l'horaire de pri\xE8re:", error);
      throw error;
    }
  }
  async updatePrayerTime(id, time) {
    try {
      const prayerTimeResult = await query("SELECT * FROM prayer_times WHERE id = ?", [id]);
      if (prayerTimeResult.length === 0) return void 0;
      await query("UPDATE prayer_times SET time = ? WHERE id = ?", [time, id]);
      const updatedResult = await query("SELECT * FROM prayer_times WHERE id = ?", [id]);
      const row = updatedResult[0];
      return {
        id: row.id,
        name: row.name,
        time: row.time,
        updatedAt: row.updated_at
      };
    } catch (error) {
      console.error("Erreur lors de la mise \xE0 jour de l'horaire de pri\xE8re:", error);
      return void 0;
    }
  }
  async getPrayerTimes() {
    try {
      const results = await query("SELECT * FROM prayer_times");
      return results.map((row) => ({
        id: row.id,
        name: row.name,
        time: row.time,
        updatedAt: row.updated_at
      }));
    } catch (error) {
      console.error("Erreur lors de la r\xE9cup\xE9ration des horaires de pri\xE8re:", error);
      return [];
    }
  }
};
var mysqlStorage = new MySQLStorage();

// shared/schema.ts
import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  responded: boolean("responded").default(false)
});
var insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
  responded: true
});
var newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  active: boolean("active").default(true)
});
var insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  createdAt: true,
  active: true
});
var events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  // Day of month
  month: text("month").notNull(),
  year: text("year").notNull(),
  venue: text("venue").notNull(),
  time: text("time").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true
});
var activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  schedule: text("schedule").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true
});
var leaders = pgTable("leaders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  description: text("description").notNull(),
  image: text("image"),
  facebookLink: text("facebook_link"),
  twitterLink: text("twitter_link"),
  instagramLink: text("instagram_link"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertLeaderSchema = createInsertSchema(leaders).omit({
  id: true,
  createdAt: true
});
var galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  src: text("src").notNull(),
  alt: text("alt").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertGalleryImageSchema = createInsertSchema(galleryImages).omit({
  id: true,
  createdAt: true
});
var prayerTimes = pgTable("prayer_times", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  time: text("time").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertPrayerTimeSchema = createInsertSchema(prayerTimes).omit({
  id: true,
  updatedAt: true
});

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
async function registerRoutes(app2) {
  const isDbConnected = await testDatabaseConnection();
  const activeStorage = isDbConnected ? mysqlStorage : storage;
  log(`Utilisation du stockage ${isDbConnected ? "MySQL" : "en m\xE9moire"}`, "storage");
  app2.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await activeStorage.createContactMessage(contactData);
      return res.status(201).json({
        success: true,
        message: "Message envoy\xE9 avec succ\xE8s",
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
  app2.post("/api/newsletter", async (req, res) => {
    try {
      const subscriptionData = insertNewsletterSubscriberSchema.parse(req.body);
      const subscriber = await activeStorage.subscribeToNewsletter(subscriptionData);
      return res.status(201).json({
        success: true,
        message: "Abonnement \xE0 la newsletter r\xE9ussi",
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
        message: "Une erreur est survenue lors de l'abonnement \xE0 la newsletter"
      });
    }
  });
  app2.get("/api/prayer-times", async (_req, res) => {
    try {
      const prayerTimes2 = await activeStorage.getPrayerTimes();
      return res.status(200).json({
        success: true,
        data: prayerTimes2
      });
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la r\xE9cup\xE9ration des horaires de pri\xE8re"
      });
    }
  });
  app2.get("/api/activities", async (_req, res) => {
    try {
      const activities2 = await activeStorage.getActivities();
      return res.status(200).json({
        success: true,
        data: activities2
      });
    } catch (error) {
      console.error("Error fetching activities:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la r\xE9cup\xE9ration des activit\xE9s"
      });
    }
  });
  app2.get("/api/leaders", async (_req, res) => {
    try {
      const leaders2 = await activeStorage.getLeaders();
      return res.status(200).json({
        success: true,
        data: leaders2
      });
    } catch (error) {
      console.error("Error fetching leaders:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la r\xE9cup\xE9ration des responsables"
      });
    }
  });
  app2.get("/api/events", async (_req, res) => {
    try {
      const events2 = await activeStorage.getEvents();
      return res.status(200).json({
        success: true,
        data: events2
      });
    } catch (error) {
      console.error("Error fetching events:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la r\xE9cup\xE9ration des \xE9v\xE9nements"
      });
    }
  });
  app2.get("/api/events/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const event = await activeStorage.getEventBySlug(slug);
      if (!event) {
        return res.status(404).json({
          success: false,
          message: "\xC9v\xE9nement non trouv\xE9"
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
        message: "Une erreur est survenue lors de la r\xE9cup\xE9ration de l'\xE9v\xE9nement"
      });
    }
  });
  app2.get("/api/gallery", async (req, res) => {
    try {
      const { category } = req.query;
      let galleryImages2;
      if (category && typeof category === "string") {
        galleryImages2 = await activeStorage.getGalleryImagesByCategory(category);
      } else {
        galleryImages2 = await activeStorage.getGalleryImages();
      }
      return res.status(200).json({
        success: true,
        data: galleryImages2
      });
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la r\xE9cup\xE9ration des images de la galerie"
      });
    }
  });
  app2.get("/api/admin/contact-messages", async (_req, res) => {
    try {
      const contactMessages2 = await activeStorage.getContactMessages();
      return res.status(200).json({
        success: true,
        data: contactMessages2
      });
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      return res.status(500).json({
        success: false,
        message: "Une erreur est survenue lors de la r\xE9cup\xE9ration des messages de contact"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const dbConnected = await testDatabaseConnection();
  if (dbConnected) {
    log("Connexion \xE0 la base de donn\xE9es MySQL r\xE9ussie", "database");
    await initializeDatabase();
    log("Base de donn\xE9es initialis\xE9e", "database");
  } else {
    log("\xC9chec de la connexion \xE0 la base de donn\xE9es MySQL - utilisation du stockage en m\xE9moire", "database");
  }
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
