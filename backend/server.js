// server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// --- Détection de l'environnement et configuration MySQL ---
const isRailway = process.env.RAILWAY_ENVIRONMENT_NAME === "production";

const dbConfig = {
  host: isRailway
    ? process.env.MYSQL_HOST || "maglev.proxy.rlwy.net"
    : process.env.DB_HOST || "localhost",
  user: process.env.MYSQL_USER || process.env.DB_USER || "root",
  password: isRailway
    ? process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || ""
    : process.env.DB_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "railway",
  port: isRailway
    ? parseInt(process.env.RAILWAY_TCP_PROXY_PORT || process.env.MYSQL_PORT || 3306)
    : parseInt(process.env.DB_PORT || 3306),
};

// --- Connexion MySQL ---
const db = mysql.createPool(dbConfig);

// --- Fonction utilitaire pour les requêtes ---
function queryDB(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

// --- Routes API ---
app.get("/api/artisans", async (req, res) => {
  try {
    const artisans = await queryDB("SELECT * FROM artisans");
    res.json(artisans);
  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ error: "Erreur serveur. Impossible de se connecter à MySQL." });
  }
});

app.get("/api/artisans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await queryDB("SELECT * FROM artisans WHERE id = ?", [id]);
    if (results.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(results[0]);
  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ error: "Erreur serveur. Impossible de se connecter à MySQL." });
  }
});

app.get("/api/artisans/specialite/:specialite", async (req, res) => {
  try {
    const { specialite } = req.params;
    const results = await queryDB(
      "SELECT * FROM artisans WHERE specialite = ? LIMIT 1",
      [specialite]
    );
    if (results.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(results[0]);
  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ error: "Erreur serveur. Impossible de se connecter à MySQL." });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const results = await queryDB("SELECT DISTINCT specialite FROM artisans");
    res.json(results.map((r) => ({ nom: r.specialite })));
  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ error: "Erreur serveur. Impossible de se connecter à MySQL." });
  }
});

app.get("/api/artisans/search/:nom", async (req, res) => {
  try {
    const { nom } = req.params;
    const results = await queryDB("SELECT * FROM artisans WHERE nom LIKE ?", [`%${nom}%`]);
    if (results.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(results);
  } catch (err) {
    console.error("Erreur SQL :", err);
    res.status(500).json({ error: "Erreur serveur. Impossible de se connecter à MySQL." });
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
