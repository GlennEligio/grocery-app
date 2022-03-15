import React from "react";
import { useState, useRef } from "react";
import { connect } from "react-redux";
import { resetItemList } from "../../actions/itemActions";

const AddItemModal = ({ user, resetItemList }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discounted, setDiscounted] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  const form = useRef();

  const onSubmit = (e) => {
    setStatus(false);
    setLoading(false);
    setError(false);

    e.preventDefault();

    if (!form.current.checkValidity()) {
      e.stopPropagation();
      form.current.classList.add("was-validated");
    } else {
      setLoading(true);

      const item = {
        name: name,
        price: price,
        discounted: discounted,
        discountPercentage: discountPercentage / 100,
      };

      fetch("http://localhost:8080/api/v1/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(item),
      })
        .then((res) => {
          switch (res.status) {
            case 201:
              setLoading(false);
              setStatus(true);
              resetItemList();
              form.current.classList.remove("was-validated");
              return;
            default:
              setLoading(false);
              setError(true);
              form.current.classList.add("was-validated");
              return;
          }
        })
        .catch(() => {
          setLoading(false);
          setError(true);
          form.current.classList.add("was-validated");
        });
    }
  };

  return (
    <div
      className="modal fade"
      id="addItemModal"
      tabIndex="-1"
      aria-labelledby="addItemModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addItemModalLabel">
              Add Item
            </h5>
            <button
              type="button"
              className="btn btn-outline-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="modal-body">
            {loading && (
              <div className="hstack align-items-center justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Adding item...</span>
                </div>
                <strong className="ms-2">Adding item...</strong>
              </div>
            )}
            {error && (
              <div className="hstack align-items-center justify-content-center text-danger">
                <i className="bi bi-x-circle-fill fs-3"></i>
                <strong className="ms-2">Something went wrong....</strong>
              </div>
            )}
            {status && (
              <div className="hstack align-items-center justify-content-center text-success">
                <i className="bi bi-check-circle-fill fs-3"></i>
                <strong className="ms-2">Add User Success</strong>
              </div>
            )}
            <form
              ref={form}
              onSubmit={onSubmit}
              noValidate
              className="needs-validation"
            >
              <div className="form-floating mb-3">
                <input
                  type="text"
                  id="addItemName"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=""
                  className="form-control"
                  required
                />
                <label htmlFor="addItemName">Name</label>
                <div className="invalid-feedback">Please enter a name.</div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  min="1"
                  id="addItemPrice"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder=""
                  className="form-control"
                  required
                />
                <label htmlFor="addItemPrice">Price</label>
                <div className="invalid-feedback">Please enter a price.</div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  min="1"
                  max="100"
                  id="addItemDiscountPercentage"
                  name="discountPercentage"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  placeholder=""
                  className="form-control"
                  required
                />
                <label htmlFor="addItemDiscountPercentage">
                  Discount Percentage (%)
                </label>
                <div className="invalid-feedback">
                  Please enter a valid discount percentage.
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center ps-3 mb-3">
                <label className="form-check-label" htmlFor="addItemDiscounted">
                  Discounted?
                </label>
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    name="discounted"
                    value={discounted}
                    onChange={(e) => setDiscounted(e.currentTarget.checked)}
                    id="addItemDiscounted"
                    className="form-check-input"
                  />
                </div>
              </div>
              <hr />
              <div className="hstack justify-content-end">
                <button
                  type="button"
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary ms-2">
                  <i className="bi bi-plus-lg"></i>
                  <strong className="ms-1">Add</strong>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { resetItemList })(AddItemModal);
