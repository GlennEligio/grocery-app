import React from "react";
import { connect } from "react-redux";
import { addItemOnCurrentBill } from "../../../actions/billActions";
import classes from "./ClerkItem.module.css";

const ClerkItem = ({ item, addItemOnCurrentBill }) => {
  const itemClickHandler = () => {
    addItemOnCurrentBill({ ...item, amount: 0 });
  };

  return (
    <>
      <div className={`card my-2 ${classes.item}`} onClick={itemClickHandler}>
        <div className="card-body">
          <div className="d-flex flex-column">
            <div className="pb-2 h5 border-bottom border-secondary border-2">
              # {item.id}
            </div>
            <div className="card-title">{item.name}</div>
            <div className="card-text">
              $ {item.price} /{" "}
              {item.discounted ? (
                <i className="bi bi-check2"></i>
              ) : (
                <i className="bi bi-x-lg"></i>
              )}
              / {item.discountPercentage * 100} %
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { addItemOnCurrentBill })(ClerkItem);
