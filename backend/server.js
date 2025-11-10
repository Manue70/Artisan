// backend/server.js
import express from "express";
import cors from "cors";
import db from "./db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ---------- Route test pour Render ----------
app.get("/", (req, res) => {
  res.send(`
    <h2>Serveur Render OK 🚀</h2>
    <p>Les routes API fonctionnent localement avec MySQL :</p>
    <ul>
      <li>/api/artisans → tous les artisans</li>
      <li>/api/artisans/:id → artisan par ID</li>
      <li>/api/artisans/specialite/:specialite → artisan par spécialité</li>
      <li>/api/categories → toutes les spécialités</li>
      <li>/api/artisans/search/:nom → recherche par nom</li>
    </ul>
    <p>Pour voir les données réelles, testez l'API en local.</p>
  `);
});

// ---------- Routes API ----------
app.get("/api/artisans", (req, res) => {
  db.query("SELECT * FROM artisans", (err, results) => {
    if (err) {
      console.error("Erreur SQL /api/artisans:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
});

app.get("/api/artisans/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM artisans WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(results[0]);
  });
});

app.get("/api/artisans/specialite/:specialite", (req, res) => {
  const { specialite } = req.params;
  db.query("SELECT * FROM artisans WHERE specialite = ? LIMIT 1", [specialite], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(results[0]);
  });
});

app.get("/api/categories", (req, res) => {
  db.query("SELECT DISTINCT specialite FROM artisans", (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results.map(r => ({ nom: r.specialite })));
  });
});

app.get("/api/artisans/search/:nom", (req, res) => {
  const { nom } = req.params;
  db.query("SELECT * FROM artisans WHERE nom LIKE ?", [`%${nom}%`], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
});

// ---------- Port dynamique pour Render ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
