import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages.scss"; // le SCSS commun

function MentionsLegales() {
  const navigate = useNavigate();

  const sections = [
    { 
      title: "Editeur du site", 
      text: `Le présent site est publié par la région 
              Auvergne-Rhône-Alpes
              101 cours Charlemagne
              69629 LYON cedex02`
    },
    { 
      title: "Hebergeur du site", 
      text: `ALTER WAY
            107 boulevard Stalingrad
            39100 Villeurbanne`
    },
    { 
      title: "Propriétés intélectuelles", 
      text: "Lorem ipsum dolor sit amet." 
    },
    { 
      title: "Données intélectuelles", 
      text: "Lorem ipsum dolor sit amet." 
    },
  ];

  return (
    <main className="page-style">
      <h1>Mentions légales</h1>

      <div className="page-container">
        {sections.map((s, i) => (
          <div className="section-box" key={i}>
            <h2>{s.title}</h2>
            <p className="section-text">{s.text}</p> {/* <-- Ici */}
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

export default MentionsLegales;
