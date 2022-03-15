import React, { useEffect, useState } from "react";
import {
  fetchItemsBegin,
  fetchItemsFailed,
  fetchItemsSuccess,
} from "../actions/itemActions";
import { setModalComponent } from "../actions/componentActions";
import { connect } from "react-redux";
import ClerkItem from "./ClerkItem";

const ClerkItemSection = ({
  user,
  items,
  fetchItemsBegin,
  fetchItemsFailed,
  fetchItemsSuccess,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchItemsBegin();
    fetch("http://localhost:8080/api/v1/items", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.jwt}`,
      },
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            return res.json();
          default:
            return null;
        }
      })
      .then((data) => {
        switch (data) {
          case null:
            fetchItemsFailed();
            break;
          default:
            fetchItemsSuccess(data);
            break;
        }
      })
      .catch(() => {
        fetchItemsFailed();
      });
  }, [items.length, user.jwt]);

  return (
    <div className="card h-50 d-flex flex-column mb-2">
      {/** Item header */}
      <div className="card-header flex-shrink-1 text-center border-bottom-2 border-primary">
        <strong>Items</strong>
      </div>
      <div className="card-body h-75 d-flex flex-column">
        {/** Item search bar */}
        <div className="input-group flex-shrink-1">
          <input
            type="text"
            name="item"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="item"
            className="form-control"
          />
          <i className="bi bi-search input-group-text"></i>
        </div>
        {/** Item list header */}
        <div className="row mt-2 gx-0 text-center">
          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col" className="w-20">
                    Name
                  </th>
                  <th scope="col" className="w-20">
                    Price
                  </th>
                  <th scope="col" className="w-30">
                    Discounted?
                  </th>
                  <th scope="col" className="w-20">
                    Discount
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        {/** Item list body */}
        <div className="row gx-0 overflow-auto text-center">
          <div className="table-responsive">
            <table className="table table-sm table-hover">
              <tbody>
                {items.length > 0 &&
                  items
                    .filter((item) =>
                      item.id
                        .toString()
                        .toLowerCase()
                        .includes(query.toString())
                    )
                    .sort()
                    .map((item, index) => (
                      <ClerkItem key={index} item={item} />
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.items.items,
  error: state.items.error,
  loading: state.items.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  fetchItemsBegin,
  fetchItemsFailed,
  fetchItemsSuccess,
  setModalComponent,
})(ClerkItemSection);
