import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "artisans_db",
  port: process.env.DB_PORT || 3306,
});

// GET tous les artisans
export const getAllArtisansDB = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM artisans");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// GET un artisan par ID
export const getArtisanByIdDB = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM artisans WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Artisan non trouvé" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


