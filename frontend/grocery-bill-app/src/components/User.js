import React from "react";
import { FaCheck, FaTimes, FaUserEdit, FaUserTimes } from "react-icons/fa";
import { connect } from "react-redux";
import { updateUserSelected } from "../actions/userActions";
import { setModalComponent } from "../actions/componentActions";

const User = ({ user, updateUserSelected, setModalComponent }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.active ? <FaCheck /> : <FaTimes />}</td>
      <td>{user.roles}</td>
      <td>
        <FaUserEdit
          onClick={() => {
            updateUserSelected(user);
            setModalComponent("edit-user-modal");
            document.getElementById("modal-id").style.display = "flex";
          }}
        />
        <FaUserTimes
          onClick={() => {
            updateUserSelected(user);
            setModalComponent("delete-user-modal");
            document.getElementById("modal-id").style.display = "flex";
          }}
        />
      </td>
    </tr>
  );
};

export default connect(null, { updateUserSelected, setModalComponent })(User);
