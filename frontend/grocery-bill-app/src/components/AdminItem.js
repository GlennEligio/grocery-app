import React from "react";
import { connect } from "react-redux";
import { updateItemSelected } from "../actions/itemActions";

const AdminItem = ({ item, updateItemSelected }) => {
  return (
    <tr>
      <th scope="row">{item.id}</th>
      <td>
        <div className="d-block text-truncate">{item.name}</div>
      </td>
      <td>{`${item.discountPercentage * 100}%`}</td>
      <td>
        {item.discounted ? (
          <i className="bi bi-check"></i>
        ) : (
          <i className="bi bi-x"></i>
        )}
      </td>
      <td>{`$ ${item.price}`}</td>
      <td>
        <div className="row">
          <div className="col text-end">
            <i
              style={{ cursor: "pointer" }}
              onClick={() => updateItemSelected(item)}
              className="bi bi-pencil-square text-success"
              data-bs-toggle="modal"
              data-bs-target="#editItemModal"
            ></i>
          </div>
          <div className="col text-start">
            <i
              style={{ cursor: "pointer" }}
              onClick={() => updateItemSelected(item)}
              className="bi bi-trash text-danger"
              data-bs-toggle="modal"
              data-bs-target="#deleteItemModal"
            ></i>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default connect(null, { updateItemSelected })(AdminItem);
