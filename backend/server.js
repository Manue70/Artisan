import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Route racine pour test
app.get("/", (req, res) => {
  res.send("API backend fonctionne ! 🚀");
});

// ✅ Route pour tous les artisans
app.get("/api/artisans", (req, res) => {
  db.query("SELECT * FROM artisans", (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
});

// ✅ Route pour un artisan par ID
app.get("/api/artisans/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM artisans WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(results[0]);
  });
});

// ✅ Route pour un artisan par spécialité
app.get("/api/artisans/specialite/:specialite", (req, res) => {
  const { specialite } = req.params;
  db.query("SELECT * FROM artisans WHERE specialite = ? LIMIT 1", [specialite], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(results[0]);
  });
});

// ✅ Route pour récupérer toutes les catégories
app.get("/api/categories", (req, res) => {
  db.query("SELECT DISTINCT specialite FROM artisans", (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results.map(r => ({ nom: r.specialite })));
  });
});

// ✅ Route pour rechercher des artisans par nom
app.get("/api/artisans/search/:nom", (req, res) => {
  const { nom } = req.params;
  db.query("SELECT * FROM artisans WHERE nom LIKE ?", [`%${nom}%`], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
});

// Port dynamique pour Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
