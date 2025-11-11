# Projet Artisans - Frontend + Backend

## Description

Ce projet consiste en un site web pour gérer et afficher des informations sur des artisans d’une région.  
Le site est construit avec :

- **Frontend** : React + Vite +Bootstrp + Sass 
- **Backend** : Node.js + Express 
- **Base de données** : MySQL (local pour le moment, simulation pour Render)

## Base de données pour 'render'

La base de données MySQL de l'application est hébergée sur [Railway](https://railway.app/).  
Toutes les tables et les données nécessaires à l'application ont été créées sur ce service afin que l'API puisse y accéder depuis Render.

### Configuration

- Les variables d'environnement pour la connexion à la base de données sont définies dans le service Render :
  - `DB_HOST`
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_NAME`
  - `DB_PORT`

### Tables principales

- **artisans** : contient les informations sur les artisans (nom, spécialité, note, ville, contact, site web, catégorie, etc.)  
- **artisans_vue** : vue pour simplifier les requêtes côté frontend.

> Remarque : La base est accessible uniquement via l’API hébergée sur Render, il n’est donc pas nécessaire d’avoir MySQL en local pour utiliser l’application.


Le site est conçu pour être accessible à tous, conforme à la norme **WCAG 2.1** afin d'assurer une bonne expérience utilisateur pour :

- Les jeunes
- Les personnes âgées
- Les personnes en situation de handicap

---

## Prérequis

- Node.js >= 18  
- npm >= 9  
- MySQL (local pour tester l'API avec les vraies données)  

---

## Installation

1/ **Cloner le projet :**

git clone <https://github.com/Manue70/Artisan.git>
cd Artisans


2/ **backend**

cd backend
npm install


3/ ../frontend

cd ../frontend
npm install
npm run build

4/ **Copier le build frontend dans le backend**

Variables d'environnement
DB_HOST=**localhost**
DB_USER=<votre_user_mysql>
DB_PASSWORD=<votre_mot_de_passe>
DB_NAME= **artisan_db**
DB_PORT=3306
PORT=5000

**Lancer le projet**
backend local
cd backend
npm start

**frontend local**
cd frontend
npm run dev

**Fonctionnalités**

- Liste de tous les artisans  : /api/artisans

- Détail d’un artisan par ID  : /api/artisans/:id

- Recherche par spécialité : /api/artisans/specialite/:specialite

- Recherche par nom : /api/artisans/search/:nom

- Liste des catégories / métiers : /api/categories

Sur Render, si MySQL n’est pas accessible, des données simulées sont affichées avec un message d’avertissement.

**Accessibilité**

Le projet suit les recommandations WCAG 2.1 :

Navigation simple et intuitive

Contraste des couleurs suffisant

Utilisation d’éléments sémantiques HTML5

Textes alternatifs pour les images

Compatible clavier et lecteurs d’écran

Plus d’infos : WCAG 2.1 Guidelines



**Auteur** :
*PINERA Manuela*
***[ PS : je n'ai pas laisser toutes les pages se diriger vers la page not found mais uniquement la page "le contacter" ]***