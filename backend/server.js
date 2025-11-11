import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const { Pool } = pkg;
const app = express();

app.use(cors());
app.use(express.json());

// --- Détection environnement Railway ---
const isRailway = process.env.RAILWAY_ENVIRONMENT_NAME !== undefined;

// --- Configuration PostgreSQL ---
const dbConfig = {
  host: process.env.PGHOST || "localhost",
  user: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "",
  database: process.env.PGDATABASE || "railway",
  port: parseInt(process.env.PGPORT || 5432),
  ssl: isRailway ? { rejectUnauthorized: false } : false,
};

// --- Connexion PostgreSQL ---
const pool = new Pool(dbConfig);

// --- Fonction utilitaire requêtes ---
async function queryDB(sql, params = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return result.rows;
  } finally {
    client.release();
  }
}

// --- Routes API ---
app.get("/api/artisans", async (req, res) => {
  try {
    const artisans = await queryDB("SELECT * FROM artisans");
    res.json(artisans);
  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ error: "Erreur serveur PostgreSQL." });
  }
});

app.get("/api/artisans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await queryDB("SELECT * FROM artisans WHERE id = $1", [id]);
    if (results.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(results[0]);
  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ error: "Erreur serveur PostgreSQL." });
  }
});

app.get("/api/artisans/specialite/:specialite", async (req, res) => {
  try {
    const { specialite } = req.params;
    const results = await queryDB(
      "SELECT * FROM artisans WHERE specialite = $1 LIMIT 1",
      [specialite]
    );
    if (results.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(results[0]);
  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ error: "Erreur serveur PostgreSQL." });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const results = await queryDB("SELECT DISTINCT specialite FROM artisans");
    res.json(results.map((r) => ({ nom: r.specialite })));
  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ error: "Erreur serveur PostgreSQL." });
  }
});

app.get("/api/artisans/search/:nom", async (req, res) => {
  try {
    const { nom } = req.params;
    const results = await queryDB("SELECT * FROM artisans WHERE nom ILIKE $1", [`%${nom}%`]);
    if (results.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(results);
  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ error: "Erreur serveur PostgreSQL." });
  }
});

// --- Servir le frontend ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "static")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

// --- Port ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur Express lancé sur le port ${PORT}`));
