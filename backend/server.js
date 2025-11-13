import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// configuration postgresql
const db = new pg.Pool({
  host: process.env.DB_HOST || "dpg-d49lu22li9vc739u8v9g-a.frankfurt-postgres.render.com",
  user: process.env.DB_USER || "artisan_db_lupu_user",
  password: process.env.DB_PASSWORD || "QJT441X6W9zuGM2MKPiKf9VAsmicnXd1",
  database: process.env.DB_NAME || "artisan_db_lupu",
  port: parseInt(process.env.DB_PORT || 5432),
  ssl: { rejectUnauthorized: false },
});

// Fonction utilitaire pour les requêtes SQL
async function queryDB(sql, params = []) {
  try {
    const result = await db.query(sql, params);
    return result.rows;
  } catch (err) {
    console.error("Erreur SQL :", err);
    throw err;
  }
}

//  Tous les artisans 
app.get("/api/artisans", async (req, res) => {
  try {
    const artisans = await queryDB("SELECT * FROM artisans");
    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur de connexion à PostgreSQL" });
  }
});

// Artisan par ID
app.get("/api/artisans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await queryDB("SELECT * FROM artisans WHERE id = $1", [id]);
    if (results.length === 0)
      return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur de connexion à PostgreSQL" });
  }
});

//  Recherche par nom 
app.get("/api/artisans/search/:nom", async (req, res) => {
  try {
    const { nom } = req.params;
    const results = await queryDB(
      "SELECT * FROM artisans WHERE nom ILIKE $1",
      [`%${nom}%`]
    );
    if (results.length === 0)
      return res.status(404).json({ error: "Aucun artisan trouvé pour ce nom" });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur de connexion à PostgreSQL" });
  }
});

//  Recherche par spécialité 
app.get("/api/artisans/specialite/:specialite", async (req, res) => {
  try {
    const { specialite } = req.params;
    const results = await queryDB(
      "SELECT * FROM artisans WHERE specialite = $1",
      [specialite]
    );
    if (results.length === 0)
      return res
        .status(404)
        .json({ error: "Aucun artisan trouvé pour cette spécialité" });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur de connexion à PostgreSQL" });
  }
});

// Liste des catégories disponibles 
app.get("/api/categories", async (req, res) => {
  try {
    const results = await queryDB("SELECT DISTINCT specialite FROM artisans");
    res.json(results.map((r) => ({ nom: r.specialite })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur de connexion à PostgreSQL" });
  }
});


//  LANCEMENT DU SERVEUR

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
