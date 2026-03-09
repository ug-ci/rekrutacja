const filterGroups = [
  {
    name: 'kategoria',
    label: 'Kategoria',
    options: [
      { value: 'scisle-techniczne', label: 'Ścisłe i techniczne' },
      { value: 'biologiczne-przyrodnicze', label: 'Biologiczne i przyrodnicze' },
      { value: 'ekonomiczne', label: 'Ekonomiczne' },
      { value: 'spoleczne-prawne', label: 'Społeczne i prawne' },
      { value: 'medyczne-pedagogiczne', label: 'Medyczne i pedagogiczne' },
    ],
  },
  {
    name: 'poziom',
    label: 'Poziom studiów',
    options: [
      { value: 'i', label: 'I stopnia' },
      { value: 'ii', label: 'II stopnia' },
      { value: 'jednolite', label: 'Jednolite magisterskie' },
    ],
  },
  {
    name: 'tryb',
    label: 'Tryb',
    options: [
      { value: 'stacjonarne', label: 'Stacjonarne' },
      { value: 'zaoczne', label: 'Zaoczne' },
    ],
  },
  {
    name: 'jezyk',
    label: 'Język',
    options: [
      { value: 'polski', label: 'Polski' },
      { value: 'angielski', label: 'Angielski' },
    ],
  },
];

export default function KierunkiFilters({ filters, onFilterChange, onSearch, onReset }) {
  return (
    <div className="kierunki-filters">
      <div className="search-row">
        <input
          type="text"
          className="search-input"
          placeholder="Szukaj kierunku..."
          value={filters.search || ''}
          onChange={(e) => onSearch(e.target.value)}
        />
        <button className="btn btn-outline" onClick={onReset}>
          Resetuj filtry
        </button>
      </div>

      {filterGroups.map((group) => (
        <div key={group.name} className="filter-group">
          <span className="filter-label">{group.label}:</span>
          <div className="filter-tabs" role="group">
            {group.options.map((opt) => (
              <button
                key={opt.value}
                className={`filter-tab ${filters[group.name] === opt.value ? 'active' : ''}`}
                onClick={() =>
                  onFilterChange(
                    group.name,
                    filters[group.name] === opt.value ? 'all' : opt.value
                  )
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
