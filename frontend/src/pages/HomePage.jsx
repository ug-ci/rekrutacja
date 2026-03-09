import { Link } from 'react-router-dom';
import { GraduationCap, Calendar, FileText } from 'lucide-react';
import CountdownTimer from '../components/common/CountdownTimer';
import RevealOnScroll from '../components/common/RevealOnScroll';
import Chatbot from '../components/chatbot/Chatbot';

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Rekrutacja na Uniwersytet Gdański 2026/27</h1>
          <p className="hero-sub">
            Ponad 200 kierunków studiów na 11 wydziałach. Znajdź swój idealny kierunek.
          </p>
          <div className="hero-actions">
            <Link to="/kierunki" className="btn btn-cta">
              <GraduationCap size={20} />
              Przeglądaj kierunki
            </Link>
            <a
              href="https://irk.ug.edu.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Zapisz się w IRK
            </a>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <RevealOnScroll>
        <section className="section countdown-section">
          <CountdownTimer targetDate="2026-07-14" />
        </section>
      </RevealOnScroll>

      {/* Timeline */}
      <RevealOnScroll>
        <section className="section timeline-section">
          <h2>Harmonogram rekrutacji</h2>
          <div className="timeline">
            <div className="timeline-item">
              <Calendar size={24} />
              <div>
                <strong>26 maja 2026</strong>
                <p>Rozpoczęcie rejestracji w IRK</p>
              </div>
            </div>
            <div className="timeline-item">
              <FileText size={24} />
              <div>
                <strong>14 lipca 2026</strong>
                <p>Zakończenie rejestracji</p>
              </div>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Chatbot */}
      <RevealOnScroll>
        <section className="section chatbot-section">
          <h2>Doradca kierunków</h2>
          <p>Nie wiesz, co studiować? Nasz doradca pomoże!</p>
          <Chatbot />
        </section>
      </RevealOnScroll>
    </>
  );
}
