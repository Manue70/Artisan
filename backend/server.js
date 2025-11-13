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

// --- Configuration PostgreSQL ---
const db = new pg.Pool({
  host: process.env.DB_HOST || "dpg-d49lu22li9vc739u8v9g-a.frankfurt-postgres.render.com",
  user: process.env.DB_USER || "artisan_db_lupu_user",
  password: process.env.DB_PASSWORD || "QJT441X6W9zuGM2MKPiKf9VAsmicnXd1",
  database: process.env.DB_NAME || "artisan_db_lupu",
  port: parseInt(process.env.DB_PORT || 5432),
  ssl: { rejectUnauthorized: false } // nécessaire pour Render
});



async function queryDB(sql, params = []) {
  try {
    const result = await db.query(sql, params);
    return result.rows;
  } catch (err) {
    console.error("Erreur SQL :", err);
    throw err;
  }
}

// --- Routes API ---
app.get("/api/artisans", async (req, res) => {
  try {
    const artisans = await queryDB("SELECT * FROM artisans");
    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur de connexion à PostgreSQL" });
  }
});

app.get("/api/artisans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await queryDB("SELECT * FROM artisans WHERE id = $1", [id]);
    if (results.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(results[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur de connexion à PostgreSQL" });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const results = await queryDB("SELECT DISTINCT specialite FROM artisans");
    res.json(results.map(r => ({ nom: r.specialite })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur de connexion à PostgreSQL" });
  }
});

// --- Servir le frontend ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "static")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

// --- Lancer le serveur ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur PostgreSQL en ligne sur le port ${PORT}`));

