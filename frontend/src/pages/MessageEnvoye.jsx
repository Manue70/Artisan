import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MessageEnvoye.scss";

function MessageEnvoye() {
  const navigate = useNavigate();

  return (
    <main className="message-page">
      <h1>Une réponse sera apportée dans les 48h </h1>

      <img
        src="/assets/message-envoye.jpg"
        alt="Message envoyé"
        className="message-img"
      />

      <div className="btn-wrapper">
        <button className="btn-return" onClick={() => navigate("/")}>
          Retour à l'accueil
        </button>
      </div>
    </main>
  );
}

export default MessageEnvoye;
