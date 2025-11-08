import React from "react";
import "../styles/Accueil.scss";
import ArtisanCard from "../components/ArtisanCard.jsx";
import { useNavigate } from "react-router-dom";

function Accueil() {
  const navigate = useNavigate();

  const steps = [
    { label: "Choisir une catégorie", path: "/dropdown" },
    { label: "Sélectionner un artisan", path: "/artisans" },
    { label: "Le contacter", path: "/notfound" },
    { label: "Recevoir une réponse sous 48h", path: "/message-envoye" },
  ];

  const artisans = [
    {
      id: 1,
      name: "Boucherie Dumont",
      speciality: "Boucher",
      location: "Lyon",
      star: 4.5,
      photo: "/assets/images/artisan1.jpg"
    },
    {
      id: 3,
      name: "Chocolaterie Labbé",
      speciality: "Chocolatier",
      location: "Lyon",
      star: 4.9,
      photo: "/assets/images/artisan3.jpg"
    },
    {
      id: 5,
      name: "Orville Salmons",
      speciality: "Chauffagiste",
      location: "Evian",
      star: 5,
      photo: "/assets/images/artisan5.jpg"
    },
  ];

  return (
    <main className="accueil">
      
      <section className="hero text-center">
        <h1>Trouvez votre artisan facilement</h1>
        <button className="btn-primary" onClick={() => navigate("/artisans")}>
          Découvrir les artisans
        </button>
      </section>

      
      <section className="steps text-center">
        <h2>Comment trouver mon artisan ?</h2>
        <div className="steps-buttons">
          {steps.map((step, i) => (
            <button key={i} className="step-btn" onClick={() => navigate(step.path)}>
              {step.label}
            </button>
          ))}
        </div>
      </section>
       {/* Artisans du mois */}
      <section className="featured text-center">
        <h2>Trois artisans du mois</h2>
        <div className="cards-container">
          {artisans.map((artisan) => (
            <ArtisanCard
              key={artisan.id}
              id={artisan.id}
              name={artisan.name}
              speciality={artisan.speciality}
              location={artisan.location}
              star={artisan.star}
              photo={undefined} 
              onClick={() => navigate(`/fiche-artisan/${artisan.id}`)} 
            />
    ))}
  </div>
</section>
   

    </main>
  );
}

export default Accueil;

