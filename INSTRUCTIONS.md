# Instructions pour télécharger et mettre le projet sur GitHub

## Comment télécharger le projet sur votre machine

1. **Télécharger le fichier ZIP**:
   - Dans l'interface Replit, vous pouvez télécharger le fichier `miftahoun-nasri-website.zip` qui contient tout le code source du projet.
   - Cliquez sur l'icône des fichiers dans la barre latérale gauche de Replit.
   - Recherchez le fichier `miftahoun-nasri-website.zip`.
   - Faites un clic droit sur ce fichier et sélectionnez "Télécharger".

2. **Extraire le contenu du ZIP**:
   - Une fois le téléchargement terminé, trouvez le fichier ZIP dans votre dossier de téléchargements.
   - Extrayez son contenu dans un dossier de votre choix.

## Comment installer le projet localement

1. **Prérequis**:
   - Assurez-vous d'avoir [Node.js](https://nodejs.org/) (version 18 ou supérieure) installé sur votre machine.

2. **Installation**:
   - Ouvrez un terminal ou une invite de commande.
   - Naviguez jusqu'au dossier où vous avez extrait le contenu du ZIP.
   - Exécutez la commande suivante pour installer toutes les dépendances:
     ```bash
     npm install
     ```

3. **Démarrer le projet localement**:
   - Une fois l'installation terminée, démarrez le serveur de développement:
     ```bash
     npm run dev
     ```
   - Le site devrait maintenant être accessible à l'adresse [http://localhost:5000](http://localhost:5000) dans votre navigateur.

## Comment mettre le projet sur GitHub

1. **Créer un nouveau dépôt GitHub**:
   - Allez sur [GitHub](https://github.com/) et connectez-vous à votre compte.
   - Cliquez sur le bouton "+" en haut à droite, puis sélectionnez "New repository".
   - Donnez un nom à votre dépôt (par exemple "dahira-miftahoun-nasri").
   - Vous pouvez ajouter une description si vous le souhaitez.
   - Choisissez si le dépôt doit être public ou privé.
   - Ne cochez pas les options pour initialiser le dépôt avec un README, .gitignore ou une licence.
   - Cliquez sur "Create repository".

2. **Initialiser un dépôt Git local et le lier à GitHub**:
   - Retournez dans votre terminal, toujours dans le dossier du projet.
   - Initialisez un dépôt Git local:
     ```bash
     git init
     ```
   - Ajoutez tous les fichiers au staging:
     ```bash
     git add .
     ```
   - Créez le premier commit:
     ```bash
     git commit -m "Premier commit: Site web Dahira Miftahoun Nasri"
     ```
   - Liez votre dépôt local à GitHub (remplacez `votre-nom-utilisateur` et `nom-du-depot` par vos informations):
     ```bash
     git remote add origin https://github.com/votre-nom-utilisateur/nom-du-depot.git
     ```
   - Poussez votre code vers GitHub:
     ```bash
     git push -u origin main
     ```
     Note: Si votre branche principale est "master" au lieu de "main", utilisez `git push -u origin master`.

3. **Vérifiez votre dépôt GitHub**:
   - Rafraîchissez la page de votre dépôt sur GitHub.
   - Vous devriez maintenant voir tous vos fichiers et le README s'afficher.

## Mise à jour du site

Après avoir modifié le code sur votre machine locale, vous pouvez mettre à jour votre dépôt GitHub avec les commandes suivantes:

```bash
git add .
git commit -m "Description des modifications"
git push
```

## En cas de problème

Si vous rencontrez des problèmes lors de l'installation ou de la mise en ligne sur GitHub, voici quelques solutions courantes:

- **Problème avec npm install**: Essayez `npm cache clean --force` puis réexécutez `npm install`.
- **Conflit lors du push**: Si vous avez des conflits, essayez `git pull` pour récupérer les changements distants, résolvez les conflits, puis faites un nouveau commit et push.
- **Problème de version Node.js**: Assurez-vous d'utiliser une version compatible de Node.js (18 ou supérieure).