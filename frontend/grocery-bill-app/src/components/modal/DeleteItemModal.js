import React from "react";
import { FaTimesCircle, FaSpinner } from "react-icons/fa";
import { connect } from "react-redux";
import { deleteItemInServer } from "../../actions/itemActions";

const DeleteItemModal = ({
  itemSelected,
  jwt,
  error,
  loading,
  deleteItemInServer,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();

    deleteItemInServer(itemSelected.id, jwt);

    if (!loading && !error) {
      document.getElementById("modal-id").style.display = "none";
    }
  };

  return (
    <>
      <div className="modal-title">
        <h3>Delete Item</h3>
      </div>
      <div className="modal-body">
        <form className="form" onSubmit={onSubmit}>
          {loading && (
            <div className="form-control-loading">
              <div>
                <FaSpinner className="loading-logo" />
              </div>
              <label>Deleting Item</label>
            </div>
          )}
          {error && (
            <div className="form-control-error">
              <FaTimesCircle />
              <label>Delete item failed</label>
            </div>
          )}
          <div className="form-control-prompt">
            <label>Are you sure?</label>
          </div>
          <div className="form-control-prompt">
            <button className="btn" type="submit">
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  itemSelected: state.items.itemSelected,
  loading: state.items.loading,
  error: state.items.error,
  jwt: state.auth.jwt,
});

export default connect(mapStateToProps, { deleteItemInServer })(
  DeleteItemModal
);
