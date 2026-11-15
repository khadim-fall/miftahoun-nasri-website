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

## Formulaires : liste des abonnés et messages (Google Sheets, sans EmailJS)

Les inscriptions à la newsletter et les messages de contact sont enregistrés dans **un Google Sheet qui vous appartient** (onglets `Newsletter` et `Messages`, doublons ignorés). Les messages de contact vous sont aussi envoyés par e-mail. Gratuit, sans service tiers.

1. Créez un Google Sheet vide (avec le compte Gmail de la dahira), puis **Extensions > Apps Script**.
2. Remplacez le code par le contenu de `docs/google-apps-script.gs` (vérifiez `NOTIFY_EMAIL`), puis enregistrez.
3. **Déployer > Nouveau déploiement > Application Web** : *Exécuter en tant que* **Moi**, *Qui a accès* **Tout le monde**. Autorisez l'accès demandé par Google, puis copiez l'URL (elle finit par `/exec`).
4. Collez cette URL dans `src/config/site.ts` (`formsEndpoint`), puis `npm run build` et republiez `dist/`.
5. Testez : une inscription doit apparaître dans l'onglet `Newsletter`.

Après toute modification du script, faites *Déployer > Gérer les déploiements > Modifier > Nouvelle version*. Tant que `formsEndpoint` est vide, les formulaires ouvrent la messagerie du visiteur.

Pour écrire à vos abonnés : copiez la colonne Email du Sheet et collez-la dans le champ **Cci** de Gmail (limite d'environ 500 envois par jour).

## Déploiement

Publiez le contenu de `dist/` après `npm run build`. Le site utilise des adresses du type `/contact` : l'hébergeur doit renvoyer toutes les adresses vers `index.html`. Deux fichiers sont fournis dans `public/` (supprimez celui qui ne vous sert pas) : `_redirects` (Netlify, Cloudflare Pages) et `.htaccess` (Apache).

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
