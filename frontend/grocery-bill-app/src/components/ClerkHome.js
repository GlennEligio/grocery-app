import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import BillSection from "./ClerkBillSection";
import ClerkCalculatorSection from "./ClerkCalculatorSection";
import ClerkItemSection from "./ClerkItemSection";
import * as Modals from "./modal";
import NavBar from "./NavBar";
import UserService from "../api/UserService";
import { updateJwt, resetAuthState } from "../actions/authActions";

const ClerkHome = ({ user, isLoggedIn, updateJwt, resetAuthState }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      UserService.validateToken(user.jwt).then((res) => {
        if (res.status === 403) {
          UserService.refreshToken(user.refreshToken)
            .then((res1) => {
              switch (res1.status) {
                case 200:
                  return res1.json();
                default:
                  return null;
              }
            })
            .then((data) => {
              switch (data) {
                case null:
                  resetAuthState();
                default:
                  updateJwt(data.jwt);
              }
            });
        }
      });
    } else {
      navigate("/unauthorized");
    }
  }, [user, isLoggedIn]);
  return (
    <main>
      <div className="container-lg py-5 vh-100">
        <div className="row h-100">
          <BillSection />
          {/** Clerk Item and Calculator Section */}
          <div className="col-6 h-100 col-lg-6 col-xl-7 pb-5">
            <ClerkItemSection />
            <ClerkCalculatorSection />
          </div>
        </div>
      </div>
      <NavBar page="clerk" />
      <div>
        <Modals.CheckoutBillModal />
        <Modals.OnHoldBillModal />
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, { updateJwt, resetAuthState })(
  ClerkHome
);
