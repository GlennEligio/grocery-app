import React from "react";
import { connect } from "react-redux";
import { updateUserSelected } from "../actions/userActions";

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
        <div className="row gx-2">
          <div className="col text-end">
            <i
              style={{ cursor: "pointer" }}
              onClick={() => updateUserSelected(user)}
              className="bi bi-pencil-square text-success"
              data-bs-toggle="modal"
              data-bs-target="#editUserModal"
            ></i>
          </div>
          <div className="col text-start ms-2">
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

export default connect(null, { updateUserSelected })(AdminUser);
