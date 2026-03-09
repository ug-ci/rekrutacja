export default function Pagination({ page, pageCount, onPageChange }) {
  if (pageCount <= 1) return null;

  const items = [];
  if (pageCount <= 7) {
    for (let i = 1; i <= pageCount; i++) items.push(i);
  } else if (page <= 3) {
    items.push(1, 2, 3, '...', pageCount);
  } else if (page >= pageCount - 2) {
    items.push(1, '...', pageCount - 2, pageCount - 1, pageCount);
  } else {
    items.push(1, '...', page - 1, page, page + 1, '...', pageCount);
  }

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Poprzedni
      </button>

      {items.map((item, idx) =>
        item === '...' ? (
          <span key={`dots-${idx}`} className="pagination-sep">...</span>
        ) : (
          <button
            key={item}
            className={`pagination-btn ${item === page ? 'active' : ''}`}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        )
      )}

      <button
        className="pagination-btn"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Następny
      </button>
    </div>
  );
}
