import express from "express";
import cors from "cors";
import db from "./db.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Route test pour Render 
app.get("/test", (req, res) => {
  res.send(`
    <h2>Serveur Render OK 🚀</h2>
    <p>Le frontend fonctionne et les routes API locales MySQL sont simulées pour Render.</p>
  `);
});

// Routes API 
function simulateOrQuery(sqlQuery, params, res) {
  if (!db) {
    // Simuler les données si MySQL n'est pas accessible
    console.warn("MySQL non accessible, simulation des données pour Render");
    return res.json([{ id: 0, nom: "Artisan simulé", specialite: "Exemple", adresse: "N/A" }]);
  }
  
  db.query(sqlQuery, params, (err, results) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ error: "Erreur serveur. MySQL accessible uniquement en local." });
    }
    if (results.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(results);
  });
}

app.get("/api/artisans", (req, res) => {
  simulateOrQuery("SELECT * FROM artisans", [], res);
});

app.get("/api/artisans/:id", (req, res) => {
  const { id } = req.params;
  simulateOrQuery("SELECT * FROM artisans WHERE id = ?", [id], res);
});

app.get("/api/artisans/specialite/:specialite", (req, res) => {
  const { specialite } = req.params;
  simulateOrQuery("SELECT * FROM artisans WHERE specialite = ? LIMIT 1", [specialite], res);
});

app.get("/api/categories", (req, res) => {
  if (!db) {
    return res.json([{ nom: "Exemple" }, { nom: "Simulé" }]);
  }
  db.query("SELECT DISTINCT specialite FROM artisans", (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur. MySQL accessible uniquement en local." });
    res.json(results.map(r => ({ nom: r.specialite })));
  });
});

app.get("/api/artisans/search/:nom", (req, res) => {
  const { nom } = req.params;
  simulateOrQuery("SELECT * FROM artisans WHERE nom LIKE ?", [`%${nom}%`], res);
});

// Servir le frontend React 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fichiers statiques dans static/
app.use(express.static(path.join(__dirname, "static")));

// Toutes les routes non-API renvoient index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

//  Port pour Render 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
