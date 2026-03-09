import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import KierunkiPage from './pages/KierunkiPage';
import KierunekDetailPage from './pages/KierunekDetailPage';
import FaqPage from './pages/FaqPage';
import KontaktPage from './pages/KontaktPage';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kierunki" element={<KierunkiPage />} />
          <Route path="/kierunek/:slug" element={<KierunekDetailPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/kontakt" element={<KontaktPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
