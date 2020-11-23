import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./actionTypes";
import axios from "axios";

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});
export const registerSuccess = (payload) => ({
  type: REGISTER_SUCCESS,
  payload,
});
export const registerFailure = (payload) => ({
  type: REGISTER_FAILURE,
  payload,
});
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});
export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});
export const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload,
});
export const logout = () => ({
  type: LOGOUT,
});

export const register = (payload) => (dispatch) => {
  dispatch(registerRequest());
  axios({
    method: "post",
    url: "https://school-teacher-manager.herokuapp.com/api/admin/register",
    data: {
      ...payload,
    },
  })
    .then((res) => {
      if (!res.error) {
        dispatch(registerSuccess(res.data));
      } else {
        dispatch(registerFailure(res.data));
      }
    })
    .catch((err) => {
      dispatch(
        registerFailure({ error: true, message: err.response.data.message })
      );
    });
};

export const login = (payload) => (dispatch) => {
  dispatch(loginRequest());
  axios({
    method: "post",
    url: "https://school-teacher-manager.herokuapp.com/api/admin/login",
    data: {
      ...payload,
    },
  })
    .then((res) => {
      if (!res.data.data.error) {
        dispatch(loginSuccess(res.data));
      } else {
        dispatch(loginFailure(res.data));
      }
    })
    .catch((err) => {
      dispatch(
        loginFailure({ error: true, message: err.response.data.message })
      );
    });
};
