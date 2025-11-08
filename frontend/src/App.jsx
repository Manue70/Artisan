import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import ListeArtisans from "./pages/ListeArtisans";
import FicheArtisan from "./pages/FicheArtisan";
import MessageEnvoye from "./pages/MessageEnvoye";
import MentionsLegales from "./pages/MentionsLegales";
import Cookies from "./pages/Cookies";
import DonneesPersonnelles from "./pages/DonneesPersonnelles";
import Accessibilites from "./pages/Accessibilites";
import NotFound from "./pages/NotFound";
import DropdownOuvert from "./pages/DropdownOuvert"; 
import SearchResults from "./pages/SearchResults";


export default function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/dropdown" element={<DropdownOuvert />} />
          <Route path="/artisans" element={<ListeArtisans />} />
          <Route path="/fiche-artisan/:id" element={<FicheArtisan />} />
          <Route path="/message-envoye" element={<MessageEnvoye />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/donnees-personnelles" element={<DonneesPersonnelles />} />
          <Route path="/accessibilites" element={<Accessibilites />} />
          <Route path="/fiche-artisan/specialite/:specialite" element={<FicheArtisan />} />
          <Route path="/search/:nom" element={<SearchResults />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}


