import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { resetUserList } from "../../actions/userActions";

const DeleteUserModal = ({ userSelected, user, resetUserList }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setLoading(false);
    setError(false);
    setStatus(false);
  }, [userSelected]);

  const deleteUser = () => {
    setLoading(false);
    setError(false);
    setStatus(false);
    fetch(`http://localhost:8080/api/v1/users/${userSelected.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.jwt}`,
      },
    }).then((res) => {
      switch (res.status) {
        case 200:
          setLoading(false);
          setStatus(true);
          resetUserList();
          break;
        default:
          setLoading(false);
          setError(true);
          break;
      }
    });
  };

  return (
    <div
      className="modal fade"
      id="deleteUserModal"
      tabIndex="-1"
      aria-labelledby="deleteUserModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteUserModalLabel">
              Delete User
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
                  <span className="visually-hidden">Deleting user...</span>
                </div>
                <strong className="ms-2">Deleting user...</strong>
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
                <strong className="ms-2">Delete User Success</strong>
              </div>
            )}
            <div className="d-flex align-items-center justify-content-center fs-2 text-danger">
              <i className="bi bi-exclamation-circle"></i>
              <strong className="ms-3">Are you sure?</strong>
            </div>
          </div>
          <div className="modal-footer justify-content-end">
            <button
              type="button"
              className="btn btn-dark"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button onClick={deleteUser} className="btn btn-danger ms-2">
              <i className="bi bi-trash"></i>
              <strong className="ms-2">Delete</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userSelected: state.user.userSelected,
  user: state.auth.user,
});

export default connect(mapStateToProps, { resetUserList })(DeleteUserModal);
