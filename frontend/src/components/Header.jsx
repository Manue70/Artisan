import React, { useState } from "react";
import { Navbar, Container, Button, Offcanvas, Nav, FormControl } from "react-bootstrap";
import { FaHome, FaBars, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Header.scss";

function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  const toggleMenu = () => setShowMenu(!showMenu);
  const closeMenu = () => setShowMenu(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/search/${search}`);
      setSearch("");
      setShowSearch(false);
      closeMenu();
    }
  };

  return (
    <header className="custom-header">
      <Navbar expand="lg" className="w-100 m-0 p-0">
        <Container fluid className="d-flex align-items-center justify-content-between px-2">
          {/* Favicon */}
          <img src="/assets/favicon.png" alt="favicon" className="favicon" />

          {/* Logo */}
          <img src="/assets/Logo.png" alt="logo" className="logo" onClick={() => navigate("/")} />

          
          <div className="buttons-vertical d-none d-lg-flex flex-row align-items-center me-2">
            <Button className="btn-custom d-flex align-items-center justify-content-center me-2" onClick={() => navigate("/")}>
              <FaHome className="me-1" /> Accueil
            </Button>

            <Button className="btn-custom d-flex align-items-center justify-content-center me-2" onClick={() => navigate("/dropdown")}>
              Rechercher par métier
            </Button>

            <Button className="btn-custom d-flex align-items-center justify-content-center" onClick={() => setShowSearch(!showSearch)}>
              <FaSearch className="me-1" /> Rechercher par nom
            </Button>

            
            {showSearch && (
              <form onSubmit={handleSearchSubmit} className="ms-2 search-form">
                <FormControl
                  type="text"
                  placeholder="Nom de l'artisan"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            )}
          </div>

          {/* Burger menu mobile */}
          <FaBars className="burger-btn d-lg-none" onClick={toggleMenu} />

          <Offcanvas show={showMenu} onHide={closeMenu} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link onClick={() => { navigate("/"); closeMenu(); }}>
                  <FaHome className="me-1" /> Accueil
                </Nav.Link>
                <Nav.Link onClick={() => { navigate("/dropdown"); closeMenu(); }}>
                  Rechercher par métier
                </Nav.Link>
                {/* Recherche par nom mobile */}
                <form onSubmit={handleSearchSubmit} className="mt-3 search-form-mobile">
                  <FormControl
                    type="text"
                    placeholder="Nom de l'artisan"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button type="submit" className="mt-2 btn-custom">Rechercher</Button>
                  
                  </form>
                 
 
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
