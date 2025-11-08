import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages.scss";

function DonneesPersonnelles() {
  const navigate = useNavigate();

  const sections = [
    { title: "Collecte de données", 
      text: "Lorem ipsum dolor sit amet." },
    { title: "Utilisation des données", 
      text: "Lorem ipsum dolor sit amet." },
    { title: "Protection", 
      text: "Lorem ipsum dolor sit amet." },
    { title: "Durée de conservation", 
      text: "Lorem ipsum dolor sit amet." },
  ];

  return (
    <main className="page-style">
      <h1>Données personnelles</h1>

      <div className="page-container">
        {sections.map((s, i) => (
          <div className="section-box" key={i}>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
          </div>
        ))}
      </div>

      <div className="btn-wrapper">
        <button className="btn-custom" onClick={() => navigate("/")}>
          Retour Accueil
        </button>
      </div>
    </main>
  );
}

export default DonneesPersonnelles;

