import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArtisanCard from "../components/ArtisanCard";
import "../styles/ListeArtisans.scss";
import { API_URL } from "../config.js";

function SearchResults() {
  const { nom } = useParams();
  const [artisans, setArtisans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/artisans/search/${nom}`)
      .then((res) => res.json())
      .then((data) => setArtisans(data))
      .catch((err) => console.error(err));
  }, [nom]);

  if (artisans.length === 0) return <p>Aucun artisan trouvé pour "{nom}"</p>;

  return (
    <main className="liste-artisans-page">
      {artisans.map((a) => (
        <ArtisanCard
          key={a.id}
          id={a.id}
          name={a.nom}
          speciality={a.specialite}
          location={a.ville}
          star={a.note}
          photo={a.photo}
          variant="liste"
          onClick={() => navigate(`/fiche-artisan/${a.id}`)}
        />
      ))}
    </main>
  );
}

export default SearchResults;

