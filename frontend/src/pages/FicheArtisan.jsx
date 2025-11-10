import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserCircle } from "react-icons/fa";
import "../styles/FicheArtisan.scss";
import { API_URL } from "../config.js";

// --- Composant pour les étoiles ---
function Stars({ note }) {
  const fullStars = Math.floor(note);
  const halfStar = note - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);


  return (
    <div className="stars">
      {[...Array(fullStars)].map((_, i) => <FaStar key={i} color="#FFD700" />)}
      {halfStar && <FaStarHalfAlt color="#FFD700" />}
      {[...Array(emptyStars)].map((_, i) => <FaRegStar key={i} color="#FFD700" />)}
    </div>
  );
}

function FicheArtisan() {
  const { specialite, id } = useParams(); 
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Formulaire
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  // --- useEffect (à l’intérieur de la fonction) ---
  

  console.log("🎯 Artisan dans le render :", artisan);
  useEffect(() => {
  let url = "";

  if (specialite) {
    url = `${API_URL}/api/artisans/specialite/${encodeURIComponent(specialite)}`;
  } else if (id) {
    url = `${API_URL}/api/artisans/${id}`;
  } else {
    setError("Aucun artisan spécifié");
    setLoading(false);
    return;
  }

  console.log("Fetching artisan with URL:", url);

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Artisan non trouvé");
      return res.json();
    })
    .then((data) => {
      const artisanData = Array.isArray(data) ? data[0] : data;

      console.log("Artisan brut reçu :", data);

      if (!artisanData) {
        setError("Artisan non trouvé");
        setLoading(false);
        return;
      }

      // ✅ Normalisation des clés
      const normalizeKeys = (obj) => {
        const result = {};
        for (const [key, value] of Object.entries(obj || {})) {
          result[key.toLowerCase()] = value;
        }
        return result;
      };

      const dataNorm = normalizeKeys(artisanData);

      const formatted = {
        nom: dataNorm.nom || "",
        specialite: dataNorm.specialite || "",
        ville: dataNorm.ville || "",
        a_propos: dataNorm.a_propos || "",
        photo: dataNorm.photo || "",
        note: dataNorm.note || 0,
        site_web: dataNorm.site_web || ""
      };

      console.log("✅ Artisan final normalisé :", formatted);
      setArtisan(formatted);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Erreur fetch :", err);
      setError(err.message);
      setLoading(false);
    });
}, [specialite, id]);


  // --- Gestion du formulaire ---
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire envoyé :", formData);
    setSent(true);
  };

  if (loading) return <p>Chargement de l’artisan...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="fiche-artisan">
      {/* SECTION 1 : Infos artisan */}
      <section className="section-infos">
        <div className="infos-container">
          <div className="artisan-photo">
            {artisan.photo ? (
              <img src={artisan.photo} alt={artisan.nom} />
            ) : (
              <FaUserCircle size={120} color="#00497C" />
            )}
          </div>
          <h1>{artisan.nom}</h1>
          <p className="specialite">{artisan.specialite}</p>
          <p className="localisation">{artisan.ville}</p>
          <Stars note={artisan.note || 0} />
          <div className="a-propos">
            <h2>À propos</h2>
            <p>{artisan.a_propos || "Aucune description disponible."}</p>
          </div>
        </div>
      </section>

      {/* SECTION 2 : Formulaire contact */}
      <section className="section-contact">
        <div className="contact-container">
          <h2>Contacter l’artisan</h2>
          {!sent ? (
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="nom"
                placeholder="Votre nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="objet"
                placeholder="Objet"
                value={formData.objet}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Votre message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button className="btn-envoyer" type="submit">
                Envoyer
              </button>
            </form>
          ) : (
            <p className="success">✅ Message envoyé avec succès !</p>
          )}
        </div>
      </section>

      {/* SECTION 3 : Site web */}
      {artisan.site_web && (
        <section className="section-site">
          <h2>Site web de l’artisan</h2>
          <a
            href={artisan.site_web}
            target="_blank"
            rel="noopener noreferrer"
          >
            {artisan.site_web}
          </a>
        </section>
      )}
    </main>
  );
}

export default FicheArtisan;
