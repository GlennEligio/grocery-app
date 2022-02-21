import React, { useEffect, useState } from "react";
import { FaTimesCircle, FaPlus, FaSpinner } from "react-icons/fa";
import { fetchItems } from "../actions/itemActions";
import { setModalComponent } from "../actions/componentActions";
import { connect } from "react-redux";
import ClerkItem from "./ClerkItem";

const ItemSection = ({
  items,
  error,
  loading,
  fetchItems,
  jwt,
  setModalComponent,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchItems(jwt);
  }, [items.length]);

  return (
    <div className="item-section">
      <div className="item-search-bar">
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
      <div className="item-list">
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
        {!loading &&
          !error &&
          items
            .filter((item) =>
              item.name.toLowerCase().includes(query.toLowerCase())
            )
            .sort()
            .map((item, index) => <ClerkItem key={index} item={item} />)}
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
  ItemSection
);
