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
      console.log("Logged in");
      UserService.validateToken(user.jwt).then((res) => {
        if (res.status === 403) {
          console.log("JWT Expired, will try to refresh it using refreshToken");
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
                  console.log("Invalid refreshToken, navigating to 403");
                  resetAuthState();
                  navigate("/unauthorized");
                  break;
                default:
                  console.log("Successful refresh of jwt");
                  updateJwt(data.jwt);
              }
            })
            .catch(() => {
              console.log("Error occurred, navigating to unauthorized");
              navigate("/unauthorized");
            });
        } else {
          console.log("JWT Not Expired, will navigate user to page");
        }
      });
    } else {
      console.log("Not Logged in");
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
