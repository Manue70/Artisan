import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserCircle } from "react-icons/fa";
import "../styles/FicheArtisan.scss";
import { API_URL } from "../config.js";

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
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Formulaire par artisan
  const [formData, setFormData] = useState({});
  const [sent, setSent] = useState({});

  useEffect(() => {
    const baseUrl = API_URL.replace(/\/$/, "");
    let url = "";

    if (specialite) {
      url = `${baseUrl}/api/artisans/specialite/${encodeURIComponent(specialite)}`;
    } else if (id) {
      url = `${baseUrl}/api/artisans/${id}`;
    } else {
      setError("Aucun artisan spécifié");
      setLoading(false);
      return;
    }

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Erreur ${res.status} : ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        const artisansArray = Array.isArray(data) ? data : [data];
        const artisansFormatted = artisansArray.map(a => ({
          id: a.id,
          nom: a.nom || "",
          specialite: a.specialite || "",
          ville: a.ville || "",
          a_propos: a.a_propos || "",
          photo: a.photo || "",
          note: a.note || 0,
          site_web: a.site_web || "",
        }));

        setArtisans(artisansFormatted);

        // Init formulaires
        const initialFormData = {};
        const initialSent = {};
        artisansFormatted.forEach(a => {
          initialFormData[a.id] = { nom: "", email: "", objet: "", message: "" };
          initialSent[a.id] = false;
        });
        setFormData(initialFormData);
        setSent(initialSent);

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [specialite, id]);

  const handleChange = (e, artisanId) => {
    setFormData({
      ...formData,
      [artisanId]: { ...formData[artisanId], [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e, artisanId) => {
    e.preventDefault();
    console.log(`Formulaire envoyé pour artisan ${artisanId} :`, formData[artisanId]);
    setSent({ ...sent, [artisanId]: true });
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="fiche-artisan">
      {artisans.map(artisan => (
        <div key={artisan.id} className="artisan-card">
          {/* SECTION 1 : Infos artisan */}
          <div className="infos-container">
            <div className="artisan-photo">
              {artisan.photo ? <img src={artisan.photo} alt={artisan.nom} /> : <FaUserCircle size={120} color="#00497C" />}
            </div>
            <h1>{artisan.nom}</h1>
            <p className="specialite">{artisan.specialite}</p>
            <p className="localisation">{artisan.ville}</p>
            <Stars note={artisan.note} />
          </div>

          {/* SECTION 2 : À propos */}
          <div className="a-propos">
            <h2>À propos</h2>
            <p>{artisan.a_propos || "Aucune description disponible."}</p>
          </div>

          {/* SECTION 3 : Formulaire */}
          <div className="section-contact">
            <div className="contact-container">
              <h2>Contacter l’artisan</h2>
              {!sent[artisan.id] ? (
                <form className="contact-form" onSubmit={(e) => handleSubmit(e, artisan.id)}>
                  <input type="text" name="nom" placeholder="Votre nom" value={formData[artisan.id].nom} onChange={(e) => handleChange(e, artisan.id)} required />
                  <input type="email" name="email" placeholder="Votre email" value={formData[artisan.id].email} onChange={(e) => handleChange(e, artisan.id)} required />
                  <input type="text" name="objet" placeholder="Objet" value={formData[artisan.id].objet} onChange={(e) => handleChange(e, artisan.id)} required />
                  <textarea name="message" rows="4" placeholder="Votre message" value={formData[artisan.id].message} onChange={(e) => handleChange(e, artisan.id)} required />
                  <button type="submit" className="btn-envoyer">Envoyer</button>
                </form>
              ) : (
                <p className="success">✅ Message envoyé avec succès !</p>
              )}
            </div>
          </div>

          {/* SECTION 4 : Site web */}
          {artisan.site_web && (
            <div className="section-site">
              <h2>Site web de l’artisan</h2>
              <a href={artisan.site_web} target="_blank" rel="noopener noreferrer">{artisan.site_web}</a>
            </div>
          )}
        </div>
      ))}
    </main>
  );
}

export default FicheArtisan;
