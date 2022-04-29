import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { resetItemList } from "../../../actions/itemActions";
import ItemService from "../../../api/ItemService";

const EditItemModal = ({ itemSelected, user, resetItemList }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discounted, setDiscounted] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  const form = useRef();
  const modal = useRef();

  useEffect(() => {
    if (itemSelected.id !== undefined) {
      setName(itemSelected.name);
      setPrice(itemSelected.price);
      setDiscountPercentage(itemSelected.discountPercentage * 100);
      setDiscounted(itemSelected.discounted);
    }
    if (modal.current !== undefined) {
      modal.current.addEventListener("hidden.bs.modal", function (e) {
        setLoading(false);
        setError(false);
        setStatus(false);
        form.current.classList.remove("was-validated");
      });
    }
  }, [itemSelected, modal]);

  const onSubmit = (e) => {
    setError(false);
    setStatus(false);
    e.preventDefault();

    if (!form.current.checkValidity()) {
      e.stopPropagation();
      form.current.classList.add("was-validated");
      return;
    } else {
      setLoading(true);

      const item = {
        id: parseInt(itemSelected.id),
        name: name,
        price: price,
        discounted: discounted,
        discountPercentage: discountPercentage / 100,
      };

      ItemService.editItem(user.jwt, item)
        .then((res) => {
          switch (res.status) {
            case 200:
              setLoading(false);
              setStatus(true);
              resetItemList();
              form.current.classList.remove("was-validated");
              break;
            default:
              setLoading(false);
              setError(true);
              form.current.classList.add("was-validated");
              break;
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
      ref={modal}
      className="modal fade"
      id="editItemModal"
      tabIndex="-1"
      aria-labelledby="editItemModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editItemModalLabel">
              Edit Item
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
                  <span className="visually-hidden">Editing item</span>
                </div>
                <strong className="ms-2">Editing item...</strong>
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
                <strong className="ms-2">Edit Item Success</strong>
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
                  id="editItemName"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=""
                  className="form-control"
                  required
                />
                <label htmlFor="editItemName">Name</label>
                <div className="invalid-feedback">Please enter a name.</div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  min="1"
                  id="editItemPrice"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder=""
                  className="form-control"
                  required
                />
                <label htmlFor="editItemPrice">Price</label>
                <div className="invalid-feedback">Please enter a price.</div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  min="1"
                  max="100"
                  id="editItemDiscountPercentage"
                  name="discountPercentage"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                  placeholder=""
                  className="form-control"
                  required
                />
                <label htmlFor="editItemDiscountPercentage">
                  Discount Percentage (%)
                </label>
                <div className="invalid-feedback">
                  Please enter a valid discount percentage.
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center ps-3 mb-3">
                <label
                  className="form-check-label"
                  htmlFor="editItemDiscounted"
                >
                  Discounted?
                </label>
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    name="discounted"
                    checked={discounted}
                    value={discounted}
                    onChange={(e) => setDiscounted(e.currentTarget.checked)}
                    id="editItemDiscounted"
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
                  <i className="bi bi-pencil-square"></i>
                  <strong className="ms-1">Edit</strong>
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
  itemSelected: state.items.itemSelected,
  user: state.auth.user,
});

export default connect(mapStateToProps, { resetItemList })(EditItemModal);
