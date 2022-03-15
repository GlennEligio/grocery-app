import {
  FETCH_JWT_BEGIN,
  FETCH_JWT_FAILED,
  FETCH_JWT_SUCCESS,
  RESET_AUTH_STATES,
} from "./types";

export const fetchJwtBegin = () => (dispatch) => {
  console.log("Fetching JWT begins");
  dispatch({
    type: FETCH_JWT_BEGIN,
  });
};

export const fetchJwtSuccess = (user) => (dispatch) => {
  console.log("Fetching JWT successful");
  dispatch({
    type: FETCH_JWT_SUCCESS,
    payload: {
      username: user.username,
      jwt: user.jwt,
      role: user.role,
    },
  });
};

export const fetchJwtFailed = () => (dispatch) => {
  console.log("Fetching JWT failed");
  dispatch({
    type: FETCH_JWT_FAILED,
  });
};

export const fetchJwt = (user) => (dispatch) => {
  dispatch({
    type: FETCH_JWT_BEGIN,
  });
  fetch("http://localhost:8080/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
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
          dispatch({
            type: FETCH_JWT_FAILED,
          });
          break;
        default:
          dispatch({
            type: FETCH_JWT_SUCCESS,
            payload: {
              jwt: data.jwt,
              role: data.role,
            },
          });
          break;
      }
    })
    .catch(() => {
      dispatch({
        type: FETCH_JWT_FAILED,
      });
    });
};

export const resetAuthState = () => (dispatch) => {
  dispatch({
    type: RESET_AUTH_STATES,
  });
};
