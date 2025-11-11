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
    .then((res) => {
      if (!res.ok) throw new Error("Erreur lors de la récupération des artisans");
      return res.json();
    })
    .then((data) => setArtisans(data))
    .catch((err) => console.error("Fetch ListeArtisans :", err));
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





  
