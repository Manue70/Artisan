import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/ListeArtisans.scss";
import ArtisanCard from "../components/ArtisanCard";
import { API_URL } from "../config.js";

function ListeArtisans() {
  const [artisans, setArtisans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/artisans`)
      .then((res) => res.json())
      .then((data) => setArtisans(data))
      .catch((err) => console.error(err));
  }, []);

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

export default ListeArtisans;





  
