import React from "react";
import { FaTimesCircle, FaSpinner } from "react-icons/fa";
import { connect } from "react-redux";
import { deleteUserInServer } from "../../actions/userActions";

const DeleteUserModal = ({
  userSelected,
  jwt,
  error,
  loading,
  deleteUserInServer,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();

    deleteUserInServer(userSelected.id, jwt);

    if (!loading && !error) {
      document.getElementById("modal-id").style.display = "none";
    }
  };

  return (
    <>
      <div className="modal-title">
        <h3>Delete User</h3>
      </div>
      <div className="modal-body">
        <form className="form" onSubmit={onSubmit}>
          {loading && (
            <div className="form-control-loading">
              <div>
                <FaSpinner className="loading-logo" />
              </div>
              <label>Deleting User</label>
            </div>
          )}
          {error && (
            <div className="form-control-error">
              <FaTimesCircle />
              <label>Delete user failed</label>
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
  userSelected: state.user.userSelected,
  loading: state.user.loading,
  error: state.user.error,
  jwt: state.auth.jwt,
});

export default connect(mapStateToProps, { deleteUserInServer })(
  DeleteUserModal
);
