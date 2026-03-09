import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, BookOpen, Globe } from 'lucide-react';
import { useKierunek } from '../hooks/useKierunki';

const levelLabels = {
  i: 'I stopnia',
  ii: 'II stopnia',
  jednolite: 'jednolite magisterskie',
};

export default function KierunekDetailPage() {
  const { slug } = useParams();
  const { data: kierunek, isLoading, error } = useKierunek(slug);

  if (isLoading) return <div className="section loading-page">Ładowanie...</div>;
  if (error || !kierunek) {
    return (
      <div className="section error-page">
        <h2>Nie znaleziono kierunku</h2>
        <Link to="/kierunki" className="btn btn-outline">
          <ArrowLeft size={16} /> Wróć do listy
        </Link>
      </div>
    );
  }

  const attrs = kierunek.attributes || kierunek;
  const wydzial = attrs.wydzial?.data?.attributes?.nazwa || '';

  return (
    <section className="section kierunek-detail">
      <Link to="/kierunki" className="back-link">
        <ArrowLeft size={16} /> Wszystkie kierunki
      </Link>

      <div className="kierunek-hero">
        <h1>{attrs.nazwa}</h1>
        <div className="kierunek-meta-row">
          <span><MapPin size={16} /> {wydzial}</span>
          <span><BookOpen size={16} /> {levelLabels[attrs.poziom] || attrs.poziom}</span>
          <span><Globe size={16} /> {attrs.jezyk}</span>
        </div>
      </div>

      {attrs.opis && (
        <div className="kierunek-section">
          <h2>O kierunku</h2>
          <div dangerouslySetInnerHTML={{ __html: attrs.opis }} />
        </div>
      )}

      {attrs.perspektywy && (
        <div className="kierunek-section">
          <h2>Perspektywy zatrudnienia</h2>
          <div dangerouslySetInnerHTML={{ __html: attrs.perspektywy }} />
        </div>
      )}

      {attrs.kryteria && (
        <div className="kierunek-section">
          <h2>Kryteria przyjęcia</h2>
          <div dangerouslySetInnerHTML={{ __html: attrs.kryteria }} />
        </div>
      )}

      <div className="kierunek-cta">
        <a
          href="https://irk.ug.edu.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-cta"
        >
          Zapisz się na ten kierunek
        </a>
      </div>
    </section>
  );
}
