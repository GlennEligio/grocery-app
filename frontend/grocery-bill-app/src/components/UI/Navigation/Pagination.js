import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  setCurrentPage,
  setPageSize,
}) => {
  return (
    <div className="row mt-4">
      <div className="col-2"></div>
      <div className="col-8 d-flex justify-content-center">
        <nav aria-label="Page navigation example translate-middle">
          <ul className="pagination">
            <li
              onClick={() => {
                if (currentPage - 2 <= 1) return;
                setCurrentPage(1);
              }}
              className={`page-item ${currentPage - 2 <= 1 && `disabled`}`}
            >
              <span className="page-link" aria-label="First">
                <i className="bi bi-chevron-double-left"></i>
              </span>
            </li>
            <li
              onClick={() => {
                if (currentPage - 1 <= 0) return;
                setCurrentPage(currentPage - 1);
              }}
              className={`page-item ${currentPage - 1 <= 0 && `disabled`}`}
            >
              <span className="page-link" aria-label="Previous">
                <i className="bi bi-chevron-left"></i>
              </span>
            </li>
            {currentPage > 1 && (
              <li
                onClick={() => setCurrentPage(currentPage - 1)}
                className="page-item"
              >
                <span className="page-link">{currentPage - 1}</span>
              </li>
            )}
            <li className="page-item active">
              <span className="page-link">{currentPage}</span>
            </li>
            {currentPage < totalPages && (
              <li
                onClick={() => setCurrentPage(currentPage + 1)}
                className="page-item"
              >
                <span className="page-link">{currentPage + 1}</span>
              </li>
            )}

            <li
              onClick={() => {
                if (currentPage >= totalPages) return;
                setCurrentPage(currentPage + 1);
              }}
              className={`page-item ${currentPage >= totalPages && `disabled`}`}
            >
              <span className="page-link" aria-label="Next">
                <i className="bi bi-chevron-right"></i>
              </span>
            </li>
            <li
              onClick={() => {
                if (currentPage + 1 >= totalPages) return;
                setCurrentPage(totalPages);
              }}
              className={`page-item ${
                currentPage + 1 >= totalPages && `disabled`
              }`}
            >
              <span className="page-link" aria-label="Last">
                <i className="bi bi-chevron-double-right"></i>
              </span>
            </li>
          </ul>
        </nav>
      </div>
      <div className="col-2">
        <div className="input-group">
          <a className="btn btn-primary pe-none">Page size</a>
          <input
            type="text"
            className="form-control"
            name="pageSize"
            value={pageSize}
            onChange={(e) => {
              if (isNaN(e.target.value)) {
                return;
              }
              if (e.target.value.trim() === "") {
                setPageSize(0);
                return;
              }
              setPageSize(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
