# Site Web Dahira Miftahoun Nasri

Ce dépôt contient le code source du site web de la Dahira Miftahoun Nasri de Guediawaye-Notaire. Le site est développé en utilisant React, TypeScript et Tailwind CSS.

## Description

La Dahira Miftahoun Nasri est une communauté spirituelle dédiée à l'enseignement et à la pratique des valeurs Mourides à Guediawaye-Notaire. Ce site web présente la dahira, ses activités, ses événements et permet aux visiteurs de contacter les responsables.

## Fonctionnalités

- Page d'accueil avec sections principales
- Pages à propos, activités, événements, galerie et contact
- Design en vert et or avec thème islamique
- Navigation responsive pour mobile et desktop
- Formulaires de contact et newsletter

## Technologies utilisées

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express
- **Base de données**: In-memory (peut être facilement migré vers PostgreSQL)
- **Routing**: Wouter
- **Gestion d'état**: React Query (TanStack Query)
- **Formulaires**: React Hook Form avec validation Zod

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-nom/dahira-miftahoun-nasri.git
cd dahira-miftahoun-nasri

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le site sera disponible à l'adresse `http://localhost:5000`.

## Structure du projet

```
├── client/                # Code frontend
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── hooks/         # Hooks personnalisés
│   │   ├── lib/           # Utilitaires et types
│   │   ├── pages/         # Pages du site
│   │   ├── App.tsx        # Composant principal
│   │   ├── index.css      # Styles globaux
│   │   └── main.tsx       # Point d'entrée
├── server/                # Code backend
│   ├── index.ts           # Point d'entrée du serveur
│   ├── routes.ts          # Routes API
│   ├── storage.ts         # Couche d'accès aux données
│   └── vite.ts            # Configuration Vite pour le serveur
├── shared/                # Code partagé entre frontend et backend
│   └── schema.ts          # Schémas de données
└── package.json           # Dépendances et scripts
```

## Déploiement

Ce site peut être déployé sur n'importe quelle plateforme qui supporte Node.js, comme Vercel, Netlify, ou Render.

## Personnalisation

Vous pouvez personnaliser les couleurs du thème en modifiant le fichier `client/src/index.css` et les variables CSS correspondantes.

## Licence

MIT