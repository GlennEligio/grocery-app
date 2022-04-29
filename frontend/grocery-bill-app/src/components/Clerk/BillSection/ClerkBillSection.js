import React from "react";
import { connect } from "react-redux";
import { changeCurrentBill } from "../../../actions/billActions";
import ClerkBillButtons from "./ClerkBillButtons";
import ClerkBillItem from "./ClerkBillItem";
import ClerkBillTotal from "./ClerkBillTotal";

const ClerkBillSection = ({ currentBill, onHoldBills, changeCurrentBill }) => {
  return (
    <div className="col-6 col-lg-6 col-xl-5 h-100 pb-5">
      <div className="card h-90">
        <div className="card-header text-center border-bottom-2 border-primary">
          {/** Nav tab for Current Bill and On Hold Bill */}
          <nav>
            <div
              className="nav nav-pills nav-fill"
              id="billSection-nav-tabs"
              role="tablist"
            >
              <button
                className="nav-link active"
                id="nav-currentBill-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-currentBill"
                type="button"
                role="tab"
                aria-controls="nav-currentBill"
                aria-selected="true"
              >
                Current Bill
              </button>
              <button
                className="nav-link position-relative"
                id="nav-onHoldBills-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-onHoldBills"
                type="button"
                role="tab"
                aria-controls="nav-onHoldBills"
                aria-selected="false"
              >
                On Hold Bills
                {onHoldBills.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {onHoldBills.length}
                    <span className="visually-hidden">on hold bills</span>
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
        <div className="card-body h-75 overflow-auto">
          {/** Nav Tab Content for Current Bill and On Hold bills */}
          <div className="tab-content" id="billSection-nav-tabContent">
            {/** Current Bill */}
            <div
              className="tab-pane fade show active"
              id="nav-currentBill"
              role="tabpanel"
              aria-labelledby="nav-currentBill-tab"
            >
              {/** Bill item list */}
              <ul className="list-group list-group-flush">
                {/** Bill item */}
                {currentBill &&
                  currentBill.itemList.map((billItem, index) => (
                    <ClerkBillItem key={index} billItem={billItem} />
                  ))}
              </ul>
            </div>
            {/** On Hold Bill */}
            <div
              className="tab-pane fade show"
              id="nav-onHoldBills"
              role="tabpanel"
              aria-labelledby="nav-onHoldBills-tab"
            >
              <table className="table table-sm table-hover">
                <tbody>
                  {onHoldBills.map((bill, index) => {
                    return (
                      <tr key={index} onClick={() => changeCurrentBill(bill)}>
                        <td>{bill.id}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/** Bill total */}
        <ClerkBillTotal />
      </div>
      {/** Bill buttons */}
      <ClerkBillButtons />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentBill: state.bill.currentBill,
  onHoldBills: state.bill.onHoldBills,
});

export default connect(mapStateToProps, {
  changeCurrentBill,
})(ClerkBillSection);
