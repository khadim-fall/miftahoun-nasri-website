# Site web de la Dahira Miftahoun Nasri

Site vitrine de la Dahira Miftahoun Nasri (Guediawaye-Notaire, Dakar). Application **100 % front-end** (aucun serveur ni base de données) : React, TypeScript, Vite, Tailwind CSS.

## Démarrer

```bash
npm install
npm run dev        # développement : http://localhost:5173
npm run typecheck  # vérification TypeScript
npm run build      # génère le dossier dist/ à publier
npm run preview    # prévisualise le build
```

Node.js 18 ou supérieur.

## Modifier le contenu (sans toucher au design)

| Je veux changer...                                   | Fichier                      |
| ---------------------------------------------------- | ---------------------------- |
| Téléphones, e-mails, adresse, horaires, réseaux, WhatsApp, carte | `src/config/site.ts` |
| Événements, activités, responsables, photos, vidéos  | `src/data/content.ts`        |
| Programme hebdomadaire                               | `src/data/content.ts` (`weeklyProgram`) |
| Photos / vidéos (fichiers)                           | `public/images`, `public/videos` |

- **Événements** : ajoutez une entrée avec une date `"AAAA-MM-JJ"`. Le site les classe seul en « à venir » ou « passés ».
- **Réseaux sociaux** : collez l'adresse complète dans `SITE.social` ; l'icône apparaît automatiquement.
- **Photo d'un responsable** : déposez l'image dans `public/images` et indiquez `image: "/images/nom.jpg"`. Sans photo, ses initiales s'affichent.

## Horaires de prière

Ils sont calculés chaque jour pour Dakar via l'API publique [Aladhan](https://aladhan.com) (mis en cache dans le navigateur). Si le calcul est indisponible, des valeurs *indicatives* sont affichées avec une mention. La méthode de calcul se règle dans `SITE.prayer.method` : comparez avec les horaires de votre mosquée de référence.

## Formulaires : membres et newsletter (Google Sheets)

Les données sont enregistrées dans **un Google Sheet qui vous appartient**, via un Google Apps Script (`docs/google-apps-script.gs`) :
- **Membres** : formulaire de la page Contact (prénom, nom, lieu d'habitation, secteur, téléphone, commentaire facultatif). Les doublons (même prénom + nom + téléphone) sont refusés.
- **Secteurs** : onglet de synthèse qui compte automatiquement les membres par secteur. Chaque nouveau membre vous est aussi envoyé par e-mail.
- **Newsletter** : inscriptions de l'accueil (nom, e-mail), doublons ignorés.
- **Messages** : ancien formulaire de contact, conservé.

Installation : Sheet > **Extensions > Apps Script**, collez le script, enregistrez, puis **Déployer > Nouveau déploiement > Application Web** (*Exécuter en tant que* Moi, *Accès* Tout le monde). Collez l'URL `/exec` dans `src/config/site.ts` (`formsEndpoint`).

**Mettre à jour le script** : après avoir collé une nouvelle version du code, faites *Déployer > Gérer les déploiements > (crayon) > Version : Nouvelle version > Déployer*. L'URL ne change pas. Ouvrir l'URL `/exec` dans un navigateur doit afficher `{"ok":true,...}`.

En cas de problème : Apps Script > **Exécutions** affiche les erreurs de chaque envoi. Tant que `formsEndpoint` est vide, les formulaires ouvrent la messagerie du visiteur.

Pour écrire à vos abonnés : copiez la colonne Email du Sheet dans le champ **Cci** de Gmail (environ 500 envois par jour).

### Secteurs de la dahira

Renseignez les noms des secteurs dans `src/config/site.ts` (`sectors: ["Secteur 1", "Secteur 2", ...]`) : le formulaire affiche alors un menu déroulant, ce qui évite les fautes de frappe et garantit des totaux justes. Tant que la liste est vide, le membre écrit son secteur librement (les totaux risquent alors d'être éclatés : « Secteur 1 » et « secteur1 » comptés à part).

### Fenêtre de bienvenue

Réglages dans `src/components/WelcomePopup.tsx` (`SHOW_AFTER_MS` : délai avant affichage) et `src/lib/welcome.ts` (`REPEAT_AFTER_DAYS` : nombre de jours avant de la réafficher après fermeture). Pour la tester à nouveau : navigation privée, ou vider `localStorage` (clé `dahira:welcome:v1`).

## Déploiement (Vercel)

Le dépôt GitHub est relié à Vercel : chaque `git push` reconstruit et publie le site (Vercel lance `npm run build` lui-même, inutile de committer `dist/`).

Le fichier `vercel.json` renvoie toutes les adresses (`/contact`, `/galerie`...) vers l'application. Sans lui, rafraîchir une page autre que l'accueil affiche « 404 NOT_FOUND ». Si vous changez d'hébergeur : Netlify/Cloudflare Pages utilisent un fichier `public/_redirects` contenant `/*  /index.html  200`, et Apache un `.htaccess` de réécriture vers `index.html`.

## Structure

```
src/
  config/site.ts      coordonnées et réglages
  data/content.ts     contenu éditable
  lib/                logique (dates, horaires de prière, e-mails)
  hooks/              hooks React
  components/         composants (home/ = sections de l'accueil, ui/ = boutons, champs, notifications)
  pages/              une page par adresse
```
