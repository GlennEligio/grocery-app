import React, { useEffect, useState } from "react";
import Modal from "./modals/Modal";
import { connect } from "react-redux";
import { fetchItems } from "../actions/itemActions";
import { PropTypes } from "prop-types";
import Item from "./Item";

const Items = ({ items, fetchItems, jwt }) => {
  // initializes the Accounts data
  useEffect(() => {
    fetchItems(jwt);
  }, []);

  const [showModal, setShowModal] = useState("");

  const setModal = (modal) => {
    setShowModal(modal);
  };

  // Remove modal when click outside content
  window.onclick = (e) => {
    const modal = document.getElementById("modal-id");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  return (
    <div className="items">
      <Modal modal={showModal} />
      <div className="items-title">
        <h1>Items</h1>
      </div>
      <div className="items-table">
        <table>
          <thead>
            <tr>
              <th>Name: </th>
              <th>Price</th>
              <th>Discounted?</th>
              <th>%</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 &&
              items.map((item, index) => (
                <Item key={index} item={item} setModal={setModal} />
              ))}
          </tbody>
        </table>
      </div>
      <div className="items-buttons">
        <button
          className="btn"
          onClick={() => {
            setModal("add-item-modal");
            document.getElementById("modal-id").style.display = "flex";
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

Items.propTypes = {
  items: PropTypes.array,
  fetchItems: PropTypes.func,
  jwt: PropTypes.string,
};

const mapStateToProps = (state) => ({
  items: state.items.items,
  jwt: state.auth.jwt,
  user: state.user.user,
});

export default connect(mapStateToProps, { fetchItems })(Items);
