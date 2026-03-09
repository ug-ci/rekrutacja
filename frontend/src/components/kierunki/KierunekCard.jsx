import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const levelLabels = {
  i: 'I stopnia',
  ii: 'II stopnia',
  jednolite: 'jednolite magisterskie',
  doktoraty: 'doktoraty',
  podyplomowe: 'podyplomowe',
};

const modeLabels = {
  stacjonarne: 'stacjonarne',
  zaoczne: 'niestacjonarne - zaoczne',
  wieczorowe: 'niestacjonarne - wieczorowe',
};

export default function KierunekCard({ kierunek }) {
  const attrs = kierunek.attributes || kierunek;
  const slug = attrs.slug || kierunek.id;
  const wydzial = attrs.wydzial?.data?.attributes?.nazwa || attrs.wydzialNazwa || '';

  return (
    <Link to={`/kierunek/${slug}`} className="k-card">
      <div className="k-faculty">{wydzial}</div>
      <div className="k-name">{attrs.nazwa}</div>
      <div className="k-meta">
        <span className="k-badge badge-deg">
          {levelLabels[attrs.poziom] || attrs.poziom}
        </span>
        <span className="k-badge badge-pop">
          {modeLabels[attrs.tryb] || attrs.tryb}
        </span>
      </div>
      <div className="k-footer">
        <div className="k-points">
          Język: <strong>{attrs.jezyk}</strong>
        </div>
        <div className="k-arrow">
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
}
