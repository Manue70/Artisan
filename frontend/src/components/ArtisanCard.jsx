import React from "react";
import "../styles/ArtisanCard.scss";

function ArtisanCard({ name, speciality, location, star, photo, onClick, variant }) {
  return (
    <div className={`artisan-card ${variant}`} onClick={onClick}>
      <div className="photo-container">
        {photo ? (
          <img src={photo} alt={name} />
        ) : (
          <div className="placeholder">📷</div>
        )}
      </div>
      <div className="info-container">
        <h3>{name}</h3>
        <p>{speciality}</p>
        <p>{location}</p>
        {star !== undefined && (
          <div className="stars">
            {Array.from({ length: Math.floor(star) }, (_, i) => (
              <span key={i}>⭐</span>
            ))}
            {star % 1 >= 0.5 && <span>✰</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtisanCard;


