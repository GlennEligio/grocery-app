import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { resetItemList } from "../../../actions/itemActions";
import ItemService from "../../../api/ItemService";

const AddItemModal = ({ user, items, resetItemList }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discounted, setDiscounted] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const form = useRef();
  const modal = useRef();

  useEffect(() => {
    if (modal.current !== undefined) {
      modal.current.addEventListener("hidden.bs.modal", (e) => {
        setLoading(false);
        setStatus(null);
        setName("");
        setPrice(0);
        setDiscountPercentage(0);
        setDiscounted(false);
        setErrorMessage("");
        form.current.classList.remove("was-validated");
      });
    }
  }, [items.length, modal]);

  const onSubmit = (e) => {
    setLoading(false);
    setStatus(null);

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

      ItemService.addItem(user.jwt, item)
        .then((res) => {
          switch (res.status) {
            case 201:
              setLoading(false);
              setStatus(true);
              resetItemList();
              form.current.classList.remove("was-validated");
              return;
            case 400:
              setLoading(false);
              setStatus(false);
              setErrorMessage("Item with same name already exist");
              form.current.classList.remove("was-validated");
              return;
            default:
              setLoading(false);
              setStatus(false);
              setErrorMessage("Something went wrong");
              form.current.classList.remove("was-validated");
              return;
          }
        })
        .catch(() => {
          setLoading(false);
          setStatus(false);
          setErrorMessage("Something went wrong");
          form.current.classList.add("was-validated");
        });
    }
  };

  return (
    <div
      ref={modal}
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
            <div className="mb-2">
              {loading && (
                <div className="hstack align-items-center justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Adding item...</span>
                  </div>
                  <strong className="ms-2">Adding item...</strong>
                </div>
              )}
              {status !== null && !status && (
                <div className="hstack align-items-center justify-content-center text-danger">
                  <i className="bi bi-x-circle-fill fs-3"></i>
                  <strong className="ms-2">{errorMessage}</strong>
                </div>
              )}
              {status !== null && status && (
                <div className="hstack align-items-center justify-content-center text-success">
                  <i className="bi bi-check-circle-fill fs-3"></i>
                  <strong className="ms-2">Add Item Success</strong>
                </div>
              )}
            </div>
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
  items: state.items.items,
});

export default connect(mapStateToProps, { resetItemList })(AddItemModal);
