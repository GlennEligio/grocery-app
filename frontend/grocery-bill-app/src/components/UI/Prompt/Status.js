import React from "react";

const Status = ({
  loading,
  status,
  loadingMessage,
  successMessage,
  errorMessage,
}) => {
  return (
    <>
      {loading && (
        <div className="d-flex align-items-center justify-content-center fs-6">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">{loadingMessage}</span>
          </div>
          <span className="ms-3 align-middle">
            <strong>{loadingMessage}</strong>
          </span>
        </div>
      )}
      {status != null && status && (
        <div className="d-flex align-items-center justify-content-center text-success fs-6">
          <i className="bi bi-check-circle-fill fs-3"></i>
          <span className="ms-2">
            <strong>{successMessage}</strong>
          </span>
        </div>
      )}
      {status != null && !status && (
        <div className="d-flex align-items-center justify-content-center text-danger fs-6">
          <i className="bi bi-x-circle-fill fs-3"></i>
          <span className="ms-2">
            <strong>{errorMessage}</strong>
          </span>
        </div>
      )}
    </>
  );
};

export default Status;
