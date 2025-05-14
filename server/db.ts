import mysql from 'mysql2/promise';
import { log } from './vite';

// Configuration de la connexion MySQL
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'dahira_miftahoun_nasri',
  port: Number(process.env.MYSQL_PORT) || 3306
};

// Création du pool de connexions
export const pool = mysql.createPool(dbConfig);

// Fonction pour tester la connexion
export async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    log('Connexion à la base de données MySQL réussie', 'database');
    connection.release();
    return true;
  } catch (error) {
    console.error('Erreur de connexion à la base de données MySQL:', error);
    return false;
  }
}

// Fonction pour exécuter des requêtes
export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Erreur lors de l\'exécution de la requête SQL:', error);
    throw error;
  }
}

// Fonction pour initialiser la base de données
export async function initializeDatabase() {
  try {
    // Tables utilisateurs
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);

    // Table messages de contact
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

    // Table abonnés à la newsletter
    await query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        active BOOLEAN DEFAULT TRUE
      )
    `);

    // Table événements
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

    // Table activités
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

    // Table leaders/responsables
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

    // Table images de la galerie
    await query(`
      CREATE TABLE IF NOT EXISTS gallery_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        src VARCHAR(255) NOT NULL,
        alt VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Table horaires de prière
    await query(`
      CREATE TABLE IF NOT EXISTS prayer_times (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        time VARCHAR(100) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    log('Tables créées avec succès dans la base de données MySQL', 'database');
    
    // Initialisation des données par défaut
    await initializeDefaultData();
    
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    return false;
  }
}

// Fonction pour initialiser les données par défaut
async function initializeDefaultData() {
  try {
    // Vérifier si les tables sont vides avant d'ajouter des données
    const prayerTimesCount = await query('SELECT COUNT(*) as count FROM prayer_times');
    const activitiesCount = await query('SELECT COUNT(*) as count FROM activities');
    const leadersCount = await query('SELECT COUNT(*) as count FROM leaders');
    const eventsCount = await query('SELECT COUNT(*) as count FROM events');
    
    // @ts-ignore
    if (prayerTimesCount[0].count === 0) {
      // Initialiser les horaires de prière
      await query(`
        INSERT INTO prayer_times (name, time) VALUES 
        ('Fajr', '05:30'),
        ('Dhuhr', '13:15'),
        ('Asr', '16:30'),
        ('Maghrib', '19:05'),
        ('Isha', '20:30')
      `);
      log('Horaires de prière initialisés', 'database');
    }
    
    // @ts-ignore
    if (activitiesCount[0].count === 0) {
      // Initialiser les activités
     await query(`
  INSERT INTO activities (title, description, icon, schedule) VALUES 
  ('Étude du Coran', 'Sessions hebdomadaires d''étude et de récitation du Coran pour tous les âges, dirigées par nos érudits.', 'fa-book', 'Tous les samedis | 16:00 - 18:00'),
  ('Dhikr Collectif', 'Rassemblement spirituel pour les prières et chants de louange collectifs dans la tradition mouride.', 'fa-pray', 'Vendredi soir | 20:30 - 22:00'),
  ('Enseignements Religieux', 'Cours sur les enseignements de Cheikh Ahmadou Bamba et la spiritualité mouride.', 'fa-chalkboard-teacher', 'Dimanches | 10:00 - 12:00'),
  ('Service Communautaire', 'Initiatives de bienfaisance pour aider les membres de la communauté et les personnes dans le besoin.', 'fa-hands-helping', 'Premier samedi du mois | 09:00 - 14:00'),
  ('École Coranique pour Enfants', 'Cours adaptés aux enfants pour apprendre les bases de l''islam et les valeurs mourides.', 'fa-child', 'Mercredis & Samedis | 14:00 - 16:00'),
  ('Groupes d''Étude', 'Cercles de discussion et d''étude pour approfondir les connaissances religieuses et spirituelles.', 'fa-users', 'Lundis | 19:00 - 20:30')
`);

      log('Activités initialisées', 'database');
    }
    
    // @ts-ignore
    if (leadersCount[0].count === 0) {
      // Initialiser les responsables
      await query(`
        INSERT INTO leaders (name, role, description, facebook_link, twitter_link, instagram_link) VALUES 
        ('Imam Abdoul Aziz Ndiaye', 'Guide Spirituel', 'Dirige notre congrégation avec sagesse et compassion depuis plus de 15 ans.', '#', '#', '#'),
        ('Cheikh Ousmane Diop', 'Président de la Dahira', 'Coordonne toutes les activités et représente notre congrégation dans la communauté.', '#', '#', '#'),
        ('Mme Aminata Seck', 'Directrice des Programmes Éducatifs', 'Organise les cours et séminaires pour développer la connaissance religieuse.', '#', '#', '#')
      `);
      log('Responsables initialisés', 'database');
    }
    
    // @ts-ignore
    if (eventsCount[0].count === 0) {
      // Initialiser les événements
      await query(`
        INSERT INTO events (title, description, date, month, year, venue, time, slug) VALUES 
        ('Grand Magal Célébration', 'Commémoration annuelle du départ en exil de Cheikh Ahmadou Bamba avec prières, chants et repas communautaire.', '15', 'Juin', '2024', 'Dahira Miftahoun Nasri, Guediawaye-Notaire', '9:00 - 22:00', 'grand-magal-celebration'),
        ('Conférence Annuelle', 'Conférence sur l\'héritage spirituel de Cheikh Ahmadou Bamba avec des intervenants renommés.', '22', 'Juillet', '2024', 'Centre Culturel, Guediawaye', '14:00 - 18:00', 'conference-annuelle'),
        ('Journée Éducative', 'Séminaire intensif sur les enseignements et la doctrine Mouride pour tous les niveaux.', '5', 'Août', '2024', 'Dahira Miftahoun Nasri, Guediawaye-Notaire', '10:00 - 16:00', 'journee-educative'),
        ('Action Caritative', 'Distribution de repas et de fournitures scolaires aux familles défavorisées de notre communauté.', '19', 'Août', '2024', 'Place Publique, Guediawaye-Notaire', '9:00 - 13:00', 'action-caritative')
      `);
      log('Événements initialisés', 'database');
    }
    
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des données par défaut:', error);
    return false;
  }
}