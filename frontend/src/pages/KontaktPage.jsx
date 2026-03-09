import { MapPin, Phone, Mail } from 'lucide-react';
import ContactForm from '../components/kontakt/ContactForm';

export default function KontaktPage() {
  return (
    <section className="section kontakt-section">
      <h1>Kontakt</h1>

      <div className="kontakt-grid">
        <div className="kontakt-info">
          <h2>Biuro Rekrutacji</h2>
          <div className="kontakt-item">
            <MapPin size={20} />
            <div>
              <p>ul. Jana Bażyńskiego 8</p>
              <p>80-309 Gdańsk</p>
            </div>
          </div>
          <div className="kontakt-item">
            <Phone size={20} />
            <p>+48 58 523 25 32</p>
          </div>
          <div className="kontakt-item">
            <Mail size={20} />
            <p>rekrutacja@ug.edu.pl</p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
