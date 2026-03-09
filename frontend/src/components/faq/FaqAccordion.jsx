import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!items?.length) return null;

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const attrs = item.attributes || item;
        const isOpen = openIndex === index;

        return (
          <div key={item.id || index} className={`faq-item ${isOpen ? 'open' : ''}`}>
            <button
              className="faq-question"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span>{attrs.pytanie}</span>
              <ChevronDown
                size={20}
                className={`faq-chevron ${isOpen ? 'rotated' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="faq-answer">
                <p>{attrs.odpowiedz}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
