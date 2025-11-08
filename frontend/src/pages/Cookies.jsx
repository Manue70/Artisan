import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cookies.scss";

function Cookies() {
  const navigate = useNavigate();

  const cookiesInfo = [
    {
      title: "Cookies essentiels",
      text: "Lorem ipsum dolor sit amet.",
    },
    {
      title: "Cookies de performance",
      text: "Lorem ipsum dolor sit amet.",
    },
    {
      title: "Cookies de fonctionnalité",
      text: "Lorem ipsum dolor sit amet.",
    },
    {
      title: "Cookies marketing",
      text: "Lorem ipsum dolor sit amet.",
    },
  ];

  return (
    <main className="cookies-page">
      <h1>Cookies</h1>

      <div className="cookies-container">
        {cookiesInfo.map((cookie, index) => (
          <div className="cookie-box" key={index}>
            <h2>{cookie.title}</h2>
            <p>{cookie.text}</p>
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

export default Cookies;


