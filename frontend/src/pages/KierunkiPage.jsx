import { useState } from 'react';
import { useKierunki } from '../hooks/useKierunki';
import KierunkiFilters from '../components/kierunki/KierunkiFilters';
import KierunkiGrid from '../components/kierunki/KierunkiGrid';
import Pagination from '../components/kierunki/Pagination';

const defaultFilters = {
  search: '',
  kategoria: 'all',
  poziom: 'all',
  tryb: 'all',
  jezyk: 'all',
};

export default function KierunkiPage() {
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useKierunki({
    page,
    pageSize: 12,
    search: filters.search || undefined,
    kategoria: filters.kategoria,
    poziom: filters.poziom,
    tryb: filters.tryb,
    jezyk: filters.jezyk,
  });

  const kierunki = data?.data || [];
  const pagination = data?.meta?.pagination || {};

  function handleFilterChange(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  }

  function handleSearch(value) {
    setFilters((prev) => ({ ...prev, search: value }));
    setPage(1);
  }

  function handleReset() {
    setFilters(defaultFilters);
    setPage(1);
  }

  return (
    <section className="section kierunki-section">
      <h1>Kierunki studiów</h1>

      <KierunkiFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      <KierunkiGrid kierunki={kierunki} isLoading={isLoading} />

      <Pagination
        page={page}
        pageCount={pagination.pageCount || 1}
        onPageChange={setPage}
      />
    </section>
  );
}
