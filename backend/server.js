import express from "express";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- PostgreSQL ----------------
// SSL forcé pour Render, fonctionne aussi en localhost si tu testes Render
const pool = new Pool({
  user: process.env.DB_USER || "artisan_db_lupu_user",
  host: process.env.DB_HOST || "dpg-d49lu22li9vc739u8v9g-a.frankfurt-postgres.render.com",
  database: process.env.DB_NAME || "artisan_db_lupu",
  password: process.env.DB_PASSWORD || "QJT441X6W9zuGM2MKPiKf9VAsmicnXd1",
  port: parseInt(process.env.DB_PORT || 5432),
  ssl: { rejectUnauthorized: false }, // obligatoire pour Render
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

// ---------------- Test simple connexion ----------------
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ ok: true, time: result.rows[0] });
  } catch (err) {
    console.error("Erreur PostgreSQL :", err);
    res.status(500).json({ error: "Erreur PostgreSQL", details: err.message });
  }
});

// ---------------- Fonctions utilitaires ----------------
async function queryDB(sql, params = []) {
  try {
    const result = await pool.query(sql, params);
    return result.rows;
  } catch (err) {
    console.error("Erreur SQL :", err);
    throw err;
  }
}

// ---------------- Routes API ----------------

// Tous les artisans
app.get("/api/artisans", async (req, res) => {
  try {
    const artisans = await queryDB("SELECT * FROM artisans");
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ error: "Erreur PostgreSQL", details: err.message });
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
    res.status(500).json({ error: "Erreur PostgreSQL", details: err.message });
  }
});

// Recherche par nom
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
    res.status(500).json({ error: "Erreur PostgreSQL", details: err.message });
  }
});

// Recherche par spécialité
app.get("/api/artisans/specialite/:specialite", async (req, res) => {
  try {
    const { specialite } = req.params;
    const results = await queryDB(
      "SELECT * FROM artisans WHERE specialite = $1",
      [specialite]
    );
    if (results.length === 0)
      return res.status(404).json({ error: "Aucun artisan trouvé pour cette spécialité" });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Erreur PostgreSQL", details: err.message });
  }
});

// Liste des catégories
app.get("/api/categories", async (req, res) => {
  try {
    const results = await queryDB("SELECT DISTINCT specialite FROM artisans");
    res.json(results.map(r => ({ nom: r.specialite })));
  } catch (err) {
    res.status(500).json({ error: "Erreur PostgreSQL", details: err.message });
  }
});

// ---------------- Servir le frontend ----------------
const staticPath = path.join(__dirname, "static");
if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));

  // Catch-all pour React (ESM safe)
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

// ---------------- Lancement du serveur ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
