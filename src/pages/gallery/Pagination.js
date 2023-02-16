import "../../components/style.css"

function Pagination({ total, limit, page, setPage }) {
    const numPages = Math.ceil(total / limit);
  
    return (
      <>
        <div className="page-nav">
          <button className="page-button" onClick={() => setPage(page - 1)} disabled={page === 1}>
            이전
          </button>
          {Array(numPages)
            .fill()
            .map((_, i) => (
              <button className="page-button"
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-current={page === i + 1 ? "page" : null}
              >
                {i + 1}
              </button>
            ))}
          <button className="page-button" onClick={() => setPage(page + 1)} disabled={page === numPages}>
            다음
          </button>
        </div>
      </>
    );
  }

export default Pagination;