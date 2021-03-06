import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { connect } from "react-redux";
import UserService from "../../api/UserService";

const AddUserModal = ({ user, users }) => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("ROLE_CLERK");
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
  const form = useRef();
  const modal = useRef();

  useEffect(() => {
    if (modal.current !== undefined) {
      modal.current.addEventListener("hidden.bs.modal", function (e) {
        setLoading(false);
        setError(false);
        setStatus(false);
        form.current.classList.remove("was-validated");
      });
    }
  }, [users.length, modal]);

  const onSubmit = (e) => {
    setLoading(false);
    e.preventDefault();

    if (!form.current.checkValidity()) {
      e.stopPropagation();
      form.current.classList.add("was-validated");
    } else {
      setLoading(true);
      const userToCreate = {
        name: name,
        username: username,
        password: password,
        roles: roles,
        active: active,
      };

      UserService.createUser(user.jwt, userToCreate)
        .then((res) => {
          switch (res.status) {
            case 201:
              form.current.classList.remove("was-validated");
              setLoading(false);
              setStatus(true);
              break;
            default:
              setLoading(false);
              setError(true);
              form.current.classList.add("was-validated");
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
      id="addUserModal"
      tabIndex="-1"
      aria-labelledby="addUserModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addUserModalLabel">
              Add User
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
                    <span className="visually-hidden">Adding user...</span>
                  </div>
                  <strong className="ms-2">Adding user...</strong>
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
                  id="addUserName"
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
                  id="addUserUsername"
                  name="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder=""
                  className="form-control"
                  required
                />
                <label htmlFor="addUserUsername">Username</label>
                <div className="invalid-feedback">Please enter a username.</div>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  id="addUserPassword"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  className="form-control"
                  required
                />
                <label htmlFor="addUserPassword">Password</label>
                <div className="invalid-feedback">Please enter a password.</div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="addUserRole"
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
                    <label htmlFor="floatingSelect">Role</label>
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
                      onChange={(e) => setActive(e.currentTarget.checked)}
                      role="switch"
                      id="activeSwitch"
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
  users: state.user.users,
});

export default connect(mapStateToProps, {})(AddUserModal);
