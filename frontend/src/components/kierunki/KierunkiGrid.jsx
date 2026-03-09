import KierunekCard from './KierunekCard';

export default function KierunkiGrid({ kierunki, isLoading }) {
  if (isLoading) {
    return (
      <div className="kierunki-grid loading">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="k-card skeleton" />
        ))}
      </div>
    );
  }

  if (!kierunki?.length) {
    return (
      <div className="kierunki-empty">
        <p>Nie znaleziono kierunków spełniających wybrane kryteria.</p>
      </div>
    );
  }

  return (
    <div className="kierunki-grid">
      {kierunki.map((k) => (
        <KierunekCard key={k.id} kierunek={k} />
      ))}
    </div>
  );
}
