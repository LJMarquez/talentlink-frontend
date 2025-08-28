import '../styles/JobsPagination.css';
export default function JobsPagination({ jobsPerPage, totalJobs, paginate, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalJobs / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNumbers = 6;
  let startPage, endPage;
  if (pageNumbers.length <= maxPageNumbers) {
    startPage = 1;
    endPage = pageNumbers.length;
  } else {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 2 >= pageNumbers.length) {
      startPage = pageNumbers.length - 4;
      endPage = pageNumbers.length;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination-list">
        <li>
          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
        </li>

        {startPage > 1 && (
          <>
            <li>
              <button onClick={() => paginate(1)} className="pagination-number">
                1
              </button>
            </li>
            {startPage > 2 && <li className="pagination-dots">...</li>}
          </>
        )}

        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`pagination-number ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          </li>
        ))}

        {endPage < pageNumbers.length && (
          <>
            {endPage < pageNumbers.length - 1 && <li className="pagination-dots">...</li>}
            <li>
              <button
                onClick={() => paginate(pageNumbers.length)}
                className="pagination-number"
              >
                {pageNumbers.length}
              </button>
            </li>
          </>
        )}

        <li>
          <button
            onClick={() =>
              paginate(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)
            }
            disabled={currentPage === pageNumbers.length}
            className={`pagination-button ${currentPage === pageNumbers.length ? 'disabled' : ''}`}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}
