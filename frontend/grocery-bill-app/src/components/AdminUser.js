import React from "react";
import { connect } from "react-redux";
import { updateUserSelected } from "../actions/userActions";
import { setModalComponent } from "../actions/componentActions";

const AdminUser = ({ user, updateUserSelected }) => {
  return (
    <tr>
      <th scope="row">{user.id}</th>
      <td>
        <div className="d-block text-truncate">{user.name}</div>
      </td>
      <td>{user.username}</td>
      <td>
        {user.active ? (
          <i className="bi bi-check"></i>
        ) : (
          <i className="bi bi-x"></i>
        )}
      </td>
      <td>{user.roles}</td>
      <td>
        <div className="row">
          <div className="col text-end">
            <i
              style={{ cursor: "pointer" }}
              onClick={() => updateUserSelected(user)}
              className="bi bi-pencil-square text-success"
              data-bs-toggle="modal"
              data-bs-target="#editUserModal"
            ></i>
          </div>
          <div className="col text-start">
            <i
              style={{ cursor: "pointer" }}
              onClick={() => updateUserSelected(user)}
              className="bi bi-trash text-danger"
              data-bs-toggle="modal"
              data-bs-target="#deleteUserModal"
            ></i>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default connect(null, { updateUserSelected, setModalComponent })(
  AdminUser
);
