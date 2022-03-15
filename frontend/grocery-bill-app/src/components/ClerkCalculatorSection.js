import React from "react";

const ClerkCalculatorSection = () => {
  return (
    <div className="card h-50 d-flex flex-column justify-content-between">
      <div className="row">
        <div className="col">
          <div className="input-group">
            <input
              type="text"
              name="pay-amount"
              id="pay-amount"
              className="form-control"
            />
            <button className="btn btn-outline-secondary">
              <i className="bi bi-x-circle-fill fs-5"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="row g-1 mt-1 flex-grow-1">
        <div className="col-3">
          <button className="btn btn-outline-secondary w-100 h-100 fs-3">
            7
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-outline-secondary w-100 h-100 fs-3">
            8
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-outline-secondary w-100 h-100 fs-3">
            9
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-secondary w-100 h-100 fs-3">$50</button>
        </div>
        <div className="col-3">
          <button className="btn btn-outline-secondary w-100 h-100 fs-3">
            4
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-outline-primary w-100 h-100 fs-3">
            5
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-outline-secondary w-100 h-100 fs-3">
            6
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-secondary w-100 h-100 fs-3">$100</button>
        </div>
        <div className="col-3">
          <button className="btn btn-outline-secondary w-100 h-100 fs-3">
            7
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-outline-secondary w-100 h-100 fs-3">
            8
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-outline-secondary w-100 h-100 fs-3">
            9
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-secondary w-100 h-100 fs-3">$43</button>
        </div>
        <div className="col-3">
          <button className="btn btn-outline-secondary w-100 h-100 fs-3">
            7
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-outline-secondary w-100 h-100 fs-3">
            8
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-outline-secondary w-100 h-100 fs-3">
            9
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-dark w-100 h-100 fs-3">$42.24</button>
        </div>
      </div>
    </div>
  );
};

export default ClerkCalculatorSection;
