import React, { useEffect, useState } from "react";
import { FaTimesCircle, FaPlus, FaSpinner } from "react-icons/fa";
import { connect } from "react-redux";
import { fetchItems } from "../actions/itemActions";
import { setModalComponent } from "../actions/componentActions";
import AdminItem from "./AdminItem";

const AdminItemSection = ({
  items,
  loading,
  error,
  jwt,
  fetchItems,
  setModalComponent,
}) => {
  useEffect(() => {
    fetchItems(jwt);
  }, [items.length]);

  const [query, setQuery] = useState("");

  return (
    <div className="admin-home-items">
      <div className="admin-home-items search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FaTimesCircle className="interactable" onClick={() => setQuery("")} />
        <FaPlus
          className="interactable"
          onClick={() => {
            setModalComponent("add-item-modal");
            document.getElementById("modal-id").style.display = "flex";
          }}
        />
      </div>
      <div className="admin-home-items table header">
        {loading && (
          <div className="form-control-loading">
            <div>
              <FaSpinner className="loading-logo" />
            </div>
            <label>Retrieving Item List</label>
          </div>
        )}
        {error && (
          <div className="form-control-error">
            <FaTimesCircle />
            <label>Something went wrong.</label>
          </div>
        )}
        {!error && !loading && (
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Discounted?</th>
                <th>Discount %</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
          </table>
        )}
      </div>
      <div className="admin-home-items table body">
        {!error && !loading && (
          <table className="table">
            <tbody>
              {items.length > 0 &&
                items
                  .filter((item) =>
                    item.name.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((item, index) => {
                    return <AdminItem key={index} item={item} />;
                  })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.items.items,
  error: state.items.error,
  loading: state.items.loading,
  jwt: state.auth.jwt,
});

export default connect(mapStateToProps, { fetchItems, setModalComponent })(
  AdminItemSection
);
