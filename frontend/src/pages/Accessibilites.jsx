import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages.scss";

function Accessibilites() {
  const navigate = useNavigate();

  const sections = [
    { title: "Navigation", text: "Lorem ipsum dolor sit amet." },
    { title: "Contraste", text: "Lorem ipsum dolor sit amet." },
    { title: "Texte adaptable", text: "Lorem ipsum dolor sit amet." },
    { title: "Accessibilité mobile", text: "Lorem ipsum dolor sit amet." },
  ];

  return (
    <main className="page-style">
      <h1>Accessibilités</h1>

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

export default Accessibilites;


