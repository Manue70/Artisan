import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <Container fluid className="notfound-container text-center">
      <h1 className="notfound-title">Oups ! Page non trouvée 😢</h1>
      <img
        src="/assets/404.jpg" 
        alt="404 illustration"
        className="notfound-image"
      />
      <div>
        <Button
          variant="primary"
          className="notfound-button mt-4"
          onClick={handleHomeRedirect}
        >
          Retour à l'accueil
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
