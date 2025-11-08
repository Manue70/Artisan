import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Route pour tous les artisans
app.get("/api/artisans", (req, res) => {
  db.query("SELECT * FROM artisans", (err, results) => {
    if (err) {
      console.error("Erreur SQL /api/artisans:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    console.log("Liste des artisans récupérée:", results.length, "artisans");
    res.json(results);
  });
});

// ✅ Route pour un artisan par ID
app.get("/api/artisans/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM artisans WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(`Erreur SQL /api/artisans/${id}:`, err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (results.length === 0) {
      console.warn(`Artisan avec ID ${id} non trouvé`);
      return res.status(404).json({ error: "Artisan non trouvé" });
    }

    
    console.log(`Artisan récupéré (ID ${id}):`, results[0]);
    res.json(results[0]);
  });
});

// Route pour un artisan par spécialité
app.get("/api/artisans/specialite/:specialite", (req, res) => {
  const { specialite } = req.params;

  db.query(
    "SELECT * FROM artisans WHERE specialite = ? LIMIT 1",
    [specialite],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Erreur serveur" });
      if (results.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
      res.json(results[0]);
    }
  );
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ✅ Route pour récupérer toutes les catégories / métiers
app.get("/api/categories", (req, res) => {
  db.query("SELECT DISTINCT specialite FROM artisans", (err, results) => {
    if (err) {
      console.error("Erreur SQL /api/categories:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results.map(r => ({ nom: r.specialite })));
  });
});

// ✅ Route pour rechercher des artisans par nom
app.get("/api/artisans/search/:nom", (req, res) => {
  const { nom } = req.params;
  db.query(
    "SELECT * FROM artisans WHERE nom LIKE ?",
    [`%${nom}%`],
    (err, results) => {
      if (err) {
        console.error(`Erreur SQL /api/artisans/search/${nom}:`, err);
        return res.status(500).json({ error: "Erreur serveur" });
      }
      res.json(results);
    }
  );
});

// ✅ Route pour rechercher des artisans par nom
app.get("/api/artisans/search/:nom", (req, res) => {
  const { nom } = req.params;
  const sql = "SELECT * FROM artisans WHERE nom LIKE ?";
  db.query(sql, [`%${nom}%`], (err, results) => {
    if (err) {
      console.error(`Erreur SQL /api/artisans/search/${nom}:`, err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
});

