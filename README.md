# Projet Artisans - Frontend + Backend

## Description

Ce projet est un site web permettant de gérer et d'afficher des informations sur des artisans d’une région.  

Le site est construit avec :  

- **Frontend** : React + Vite + Bootstrap + Sass  
- **Backend** : Node.js + Express  
- **Base de données** : PostgreSQL (Render) / MySQL (local pour tests)

Le site est conçu pour être accessible à tous, conforme à la norme **WCAG 2.1**, pour les jeunes, les personnes âgées et les personnes en situation de handicap.

---

## Base de données

### Render (Production)

- La base PostgreSQL est hébergée sur Render et accessible uniquement via l’API.  
- Toutes les tables et données nécessaires sont présentes pour que l’application fonctionne.  
- Variables d’environnement sur Render :  

DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
DB_PORT


### Local (développement)

- Vous pouvez utiliser MySQL pour tester l’API avec les données réelles.  
- Tables principales :  
  - **artisans** : informations sur les artisans (nom, spécialité, note, ville, contact, site web, catégorie, etc.)  
  - **artisans_vue** : vue pour simplifier les requêtes côté frontend

---

## Accessibilité

Le site respecte les recommandations WCAG 2.1 :  

- Navigation simple et intuitive  
- Contraste des couleurs suffisant  
- Utilisation d’éléments sémantiques HTML5  
- Textes alternatifs pour les images  
- Compatible clavier et lecteurs d’écran

Plus d’infos : [WCAG 2.1 Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

## Prérequis

- Node.js >= 18  
- npm >= 9  
- PostgreSQL ou MySQL (local pour tester l’API)  

---

## Installation & Lancement

### 1. Cloner le projet

```bash
git clone https://github.com/Manue70/Artisan.git
cd Artisan

## BACKEND ##

cd backend
npm install


## FRONTEND ##

cd ../frontend
npm install
npm run build

## COPIER LE BUILD DANS LE BACKEND ##

# Depuis le dossier frontend
cp -r dist ../backend/static

# Configuration des variables d’environnement (local) #

''' Créez un fichier .env dans backend : '''

DB_HOST=localhost
DB_USER=<votre_user_postgres_ou_mysql>
DB_PASSWORD=<votre_mot_de_passe>
DB_NAME=artisan_db
DB_PORT=5432 # ou 3306 si MySQL
PORT=5000

# Lancer le projet #

'Backend ' (local)
cd backend
npm start

'Frontend' (local )
cd frontend
npm run dev
[Sur Render, le frontend est servi depuis le backend (/static).]

# ROUTES API ##

| Route                                  | Description                    |
| -------------------------------------- | ------------------------------ |
| `/api/artisans`                        | Liste de tous les artisans     |
| `/api/artisans/:id`                    | Détail d’un artisan par ID     |
| `/api/artisans/search/:nom`            | Recherche d’un artisan par nom |
| `/api/artisans/specialite/:specialite` | Recherche par spécialité       |
| `/api/categories`                      | Liste des catégories / métiers |


Sur Render, si la base de données n’est pas accessible, des données simulées sont affichées avec un message d’avertissement.

## Auteur ##

Manuela Pinera

'PS : Je n’ai pas redirigé toutes les pages vers la page 404, uniquement la page "Le contacter".'