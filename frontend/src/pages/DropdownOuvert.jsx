import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/DropdownOuvert.scss";

function DropdownOuvert() {
  const navigate = useNavigate();

  const metiers = [
    "Boucher",
    "Boulanger",
    "Chocolatier",
    "Traiteur",
    "Chauffagiste",
    "Électricien",
    "Menuisier",
    "Plombier",
    "Bijoutier",
    "Couturier",
    "Ferronier",
    "Coiffeur",
    "Fleuriste",
    "Toiletteur",
    "Webdesign",
  ];

  return (
    <main className="dropdown-page">
      {/* Bouton titre non cliquable */}
      <div className="filter-button-container text-center">
        <Button className="filter-btn title-btn" disabled>
          Filtrer par métier
        </Button>
      </div>

      {/* Liste des métiers cliquables */}
      <section className="metiers-section">
        <Container className="d-flex flex-column align-items-center">
          {metiers.map((metier, index) => (
            <Button
              key={index}
              className="metier-btn"
              onClick={() => navigate(`/fiche-artisan/specialite/${encodeURIComponent(metier)}`)}
            >
              {metier}
            </Button>
          ))}
        </Container>
        <div className="filter-button-container text-center">
        <Button className="btn acceuil" onClick={() => navigate('/')}>
          Accueil
        </Button>
      </div>
      </section>
    </main>
  );
}

export default DropdownOuvert;


