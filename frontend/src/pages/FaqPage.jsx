import { useFaq } from '../hooks/useFaq';
import FaqAccordion from '../components/faq/FaqAccordion';

export default function FaqPage() {
  const { data, isLoading } = useFaq();
  const items = data?.data || [];

  return (
    <section className="section faq-section">
      <h1>Najczęściej zadawane pytania</h1>
      {isLoading ? (
        <p>Ładowanie...</p>
      ) : (
        <FaqAccordion items={items} />
      )}
    </section>
  );
}
