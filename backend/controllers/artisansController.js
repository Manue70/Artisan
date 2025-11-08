const mysql = require("mysql2/promise");


const db = mysql.createPool({
  host: "localhost",
  user: "art_exo",
  password: "Artisan123",
  database: "artisans_db",
});

// GET tous les artisans
const getAllArtisansDB = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM artisans");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


// GET un artisan par ID
const getArtisanByIdDB = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query("SELECT * FROM artisans WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = { getArtisanByIdDB };
