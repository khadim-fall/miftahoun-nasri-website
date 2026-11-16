# Améliorations apportées

## Corrigé (bugs)
- **Formulaire de contact** : tout le formulaire était commenté et le code d'envoi simulait un succès (`setTimeout`) sans rien envoyer. Il est rétabli : enregistrement dans un Google Sheet + e-mail via Google Apps Script (`docs/google-apps-script.gs`, sans EmailJS), sinon ouverture de la messagerie du visiteur. Plus aucun faux « Message envoyé ».
- **Horaires de prière** : valeurs fixes toute l'année (fausses en grande partie de l'année) → calcul quotidien pour Dakar, mise en évidence de la prochaine prière, repli clairement signalé « indicatif ».
- **Événements** : le site annonçait « à venir » des événements de 2024. Classement désormais automatique par date, avec message si rien n'est programmé.
- **Liens imbriqués** : 14 `<Link><a>` produisaient des `<a>` dans des `<a>` (HTML invalide, focus clavier incorrect, avertissements React).
- **Page 404** en anglais (« Did you forget to add the page to the router? ») → en français, avec lien d'accueil.
- **Classes `aspect-w-16`** sans le plugin nécessaire (vidéos mal dimensionnées) → `aspect-video`.
- **Couleurs Tailwind** (`gold`, `primary-light`, `dark`) déclarées à la main dans le CSS, donc sans variantes d'opacité (`bg-primary/90` ne fonctionnait pas, même dans les boutons) → déclarées dans `tailwind.config.ts`.
- Textes affichés « Il y a 1/2/3 mois » codés en dur sur les vidéos → supprimés (date facultative à la place).
- Liens de réseaux sociaux `href="#"` (renvoyaient en haut de page) → affichés seulement s'ils sont renseignés.
- 3e responsable : la photo du bâtiment servait de portrait → initiales en attendant une vraie photo.

## Formulaires (version Google Sheets)
- Le formulaire de contact enregistre désormais les **membres** (prénom, nom, lieu d'habitation, téléphone, commentaire facultatif) dans l'onglet `Membres`, avec e-mail de notification.
- Newsletter : suppression du champ « piège » invisible, qui pouvait bloquer l'envoi sans aucun message ; les erreurs affichent maintenant leur cause. Protection anti-abus déplacée côté script (30 envois/minute).

## Relecture des textes
Tous les titres et textes ont été relus (voir `docs/RELECTURE.md`, avant/après) : majuscules à la française, anglicismes, accords, espaces avant `: ? !`, apostrophes typographiques, « e-mail » unique, horaires présentés de la même façon, noms cohérents. Le texte de désabonnement newsletter est devenu exact.

## Sécurité et confidentialité
- Suppression de la page `/admin` publique (appelait `/api/admin/...` qui n'existe pas, sans aucune authentification) et du code serveur mort (`shared/schema.ts`, Postgres/Drizzle non installé, incohérent avec le `.env` MySQL).
- Suppression du script externe `replit-dev-banner.js` chargé en production, et de l'injection de Font Awesome depuis un CDN (remplacé par les icônes déjà présentes, `lucide-react`).
- Champ « piège » anti-robots et limitation de débit sur les formulaires.
- `.gitignore` complété (`.env`).

## Accessibilité
`lang="fr"`, zoom autorisé (retrait de `maximum-scale=1`), lien « Aller au contenu », menu mobile avec `aria-expanded`/Échap, `aria-current`, libellés sur tous les champs, messages d'erreur reliés aux champs, titres d'`iframe`, `lang="ar"` sur les noms de prière, texte doré à contraste suffisant, respect de `prefers-reduced-motion`.

## Performance
- Vidéos : `preload="none"` + affiche (les 17 Mo n'étaient plus téléchargés à l'ouverture de la galerie).
- Images en `loading="lazy"`, plus d'imports depuis `public/` (qui dupliquaient les images 4 fois dans `dist/`).
- Police Roboto jamais utilisée retirée, polices chargées via `<link>` + `preconnect`.
- CSS : ~66 Ko → ~40 Ko. 45 composants UI inutilisés et ~45 dépendances supprimés (`package.json`/`package-lock.json` allégés).

## Maintenabilité
- Coordonnées et horaires centralisés (`src/config/site.ts`) : ils étaient dupliqués et incohérents entre pages.
- Contenu séparé du code (`src/data/content.ts`) ; fin des listes dupliquées Accueil / pages.
- Titre et description par page (`usePageMeta`), remontée de page à chaque navigation, `tsconfig` corrigé, script `typecheck`, README à jour (il décrivait un backend Express inexistant).
- `structure.txt` (UTF-16) = modèle d'e-mail de la newsletter → converti dans `docs/`.

## À vérifier par vous (je ne peux pas le deviner)
1. **Numéro `+221 33 800 00 00`** : ressemble à un faux numéro. À corriger ou retirer dans `src/config/site.ts`.
2. **WhatsApp** : un bouton a été ajouté avec le premier numéro (`+221 77 762 18 06`). Videz `SITE.whatsapp` si ce numéro n'est pas sur WhatsApp.
3. **Horaires incohérents** : Vendredi 20:30 (contact) vs 21:00 (activités) ; « École coranique enfants » (mercredi/samedi) n'apparaît que dans les cartes ; dimanche 23:30 « Groupes d'étude » vs 21:00 « Kourel ». Contenu conservé tel quel : à harmoniser.
4. **Événements** : tous datés de 2024, et certaines dates ne correspondent pas au calendrier hégirien (Magal, Mawlid). Remplacez-les.
5. **Galerie** : les 16 photos sont la même image et les 3 vidéos le même fichier (identique, 5,7 Mo ×3) avec des titres différents. Remplacez par de vrais médias.
6. **Newsletter / contact** : suivez les étapes du README pour créer le script Google et renseigner `formsEndpoint` ; sans cela, les formulaires ouvrent seulement la messagerie. Je n'ai pas pu tester le script contre Google depuis mon environnement : faites une inscription et un message test.
7. **Méthode de calcul des prières** (`SITE.prayer.method`) à comparer avec votre mosquée de référence.

## Nettoyage Git recommandé
```bash
git rm --cached .env        # .env était suivi par Git (contenait seulement localhost/root, sans mot de passe)
git rm -r --cached dist     # si votre hébergeur construit le site lui-même (sinon gardez dist/)
npm install                 # puis commitez le package-lock.json
```
