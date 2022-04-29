import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { resetUserList } from "../../../actions/userActions";
import UserService from "../../../api/UserService";

const EditUserModal = ({ userSelected, user, resetUserList }) => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);
  const [roles, setRoles] = useState("ROLE_CLERK");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  const form = useRef();
  const modal = useRef();

  useEffect(() => {
    if (userSelected.id !== undefined) {
      setName(userSelected.name);
      setUserName(userSelected.username);
      setPassword("");
      setRoles(userSelected.roles);
      setActive(userSelected.active);
    }
    if (modal.current !== undefined) {
      modal.current.addEventListener("hidden.bs.modal", function (e) {
        setLoading(false);
        setError(false);
        setStatus(false);
        form.current.classList.remove("was-validated");
      });
    }
  }, [userSelected, modal]);

  const onSubmit = (e) => {
    setStatus(false);
    setError(false);
    setLoading(false);
    e.preventDefault();

    if (!form.current.checkValidity()) {
      e.stopPropagation();
      form.current.classList.add("was-validated");
    } else {
      const userToEdit = {
        id: userSelected.id,
        name: name,
        username: username,
        password: password,
        active: active,
        roles: roles,
      };

      setLoading(true);

      UserService.editUser(user.jwt, userToEdit)
        .then((res) => {
          switch (res.status) {
            case 200:
              setLoading(false);
              setStatus(true);
              form.current.classList.remove("was-validated");
              resetUserList();
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
      id="editUserModal"
      tabIndex="-1"
      aria-labelledby="editUserModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editUserModalLabel">
              Edit User
            </h5>
            <button
              type="button"
              className="btn btn-outline-dark"
              data-bs-dismiss="modal"
              onClick={() => setStatus(false)}
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
                    <span className="visually-hidden">Editing user...</span>
                  </div>
                  <strong className="ms-2">Editing user...</strong>
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
                  <strong className="ms-2">Edit User Success</strong>
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
                  id="editUserName"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=""
                  className="form-control"
                  required
                />
                <label htmlFor="addUserName">Name</label>
                <div className="invalid-feedback">Please enter a name.</div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  id="editUserUsername"
                  name="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder=""
                  className="form-control"
                  required
                />
                <label htmlFor="editUserUsername">Username</label>
                <div className="invalid-feedback">Please enter a username.</div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  id="editUserPassword"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  className="form-control"
                  required
                />
                <label htmlFor="editUserPassword">Password</label>
                <div className="invalid-feedback">Please enter a password.</div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="editUserRole"
                      value={roles}
                      onChange={(e) => setRoles(e.target.value)}
                      aria-label="Select User Role"
                      required
                    >
                      <option value="ROLE_CLERK">Clerk</option>
                      {user.role === "ROLE_SADMIN" && (
                        <option value="ROLE_ADMIN">Admin</option>
                      )}
                    </select>
                    <label htmlFor="editUserRole">Role</label>
                    <div className="invalid-feedback">
                      Please select the role.
                    </div>
                  </div>
                </div>
                <div className="col hstack align-items-center justify-content-center">
                  <div className="form-check form-switch hstack align-items-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={active}
                      checked={active}
                      onChange={(e) => setActive(e.currentTarget.checked)}
                      role="switch"
                    />
                    <label
                      className="form-check-label fs-4 ms-2"
                      htmlFor="activeSwitch"
                    >
                      Active?
                    </label>
                  </div>
                </div>
              </div>
              <div className="hstack justify-content-end">
                <button
                  type="button"
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                  onClick={() => setStatus(false)}
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
  user: state.auth.user,
  userSelected: state.user.userSelected,
});

export default connect(mapStateToProps, {
  resetUserList,
})(EditUserModal);
