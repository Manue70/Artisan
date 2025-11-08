import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";
import "../styles/Footer.scss";

function Footer() {
  const navigate = useNavigate();

  const socialLinks = {
    facebook: "https://www.facebook.com/",
    linkedin: "https://www.linkedin.com/",
    youtube: "https://www.youtube.com/",
    instagram: "https://www.instagram.com/",
    twitter: "https://twitter.com/",
    whatsapp: "https://www.whatsapp.com/",
    tiktok: "https://www.tiktok.com/",
  };

  return (
    <footer className="custom-footer">
      {/* LIGNE 1 */}
      <div className="footer-top">
        <div className="footer-item favicon">
          <img src="/assets/favicon.png" alt="favicon" />
        </div>
        <div className="footer-item logo">
          <img src="/assets/Logo.png" alt="logo" />
        </div>
        <div className="footer-item contact">
          <p>
            123 Rue Exemple<br />
            75000 Paris
          </p>
          <p className="phone">+33 1 23 45 67 89</p>
        </div>
      </div>

      {/* LIGNE 2 */}
      <div className="footer-links">
        <button onClick={() => navigate("/mentions-legales")}>
          Mentions légales
        </button>
        <button onClick={() => navigate("/cookies")}>Cookies</button>
        <button onClick={() => navigate("/donnees-personnelles")}>
          Données personnelles
        </button>
        <button onClick={() => navigate("/accessibilites")}>
          Accessibilités
        </button>
      </div>

      {/* LIGNE 3 */}
      <div className="footer-socials">
        <FaFacebookF onClick={() => window.open(socialLinks.facebook, "_blank")} />
        <FaLinkedinIn onClick={() => window.open(socialLinks.linkedin, "_blank")} />
        <FaYoutube onClick={() => window.open(socialLinks.youtube, "_blank")} />
        <FaInstagram onClick={() => window.open(socialLinks.instagram, "_blank")} />
        <FaTwitter onClick={() => window.open(socialLinks.twitter, "_blank")} />
        <FaWhatsapp onClick={() => window.open(socialLinks.whatsapp, "_blank")} />
        <FaTiktok onClick={() => window.open(socialLinks.tiktok, "_blank")} />
      </div>
    </footer>
  );
}

export default Footer;
