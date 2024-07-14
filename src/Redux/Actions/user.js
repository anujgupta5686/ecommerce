import axios from "axios";
import types from "../types";
import { toast } from "react-toastify";
export const RegisterUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: types.USER_REGISTER_REQUEST });
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/signup`,
        data
      );
      dispatch({ type: types.USER_REGISTER_SUCCESS, payload: response.data });
      toast.success(`${response.data.message}`);
      console.log("response::", response.data);
    } catch (error) {
      dispatch({ type: types.USER_REGISTER_FAILURE, payload: error.message });
      toast.error(`${error?.response?.data?.message}`);
      console.log("response::", error.response.data.message);
    }
  };
};

export const LoginUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: types.USER_LOGIN_REQUEST });
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/login`,
        data
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      dispatch({ type: types.USER_LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: types.USER_LOGIN_FAILURE, payload: error.message });
    }
  };
};

// Forget password token
export const forgetPasswordToken = (data) => {
  return async (dispatch) => {
    dispatch({ type: types.USER_FORGET_PASSWORD_REQUEST });
    try {
      const tekenResponse = await axios.post(
        `http://localhost:4000/api/v1/forget-password`,
        data
      );
      dispatch({
        type: types.USER_FORGET_PASSWORD_SUCCESS,
        payload: tekenResponse.data,
      });
      console.log("tekenResponse", tekenResponse.data);
      toast.success(`${tekenResponse.data.message}`);
    } catch (error) {
      dispatch({
        type: types.USER_FORGET_PASSWORD_FAILURE,
        payload: error.message,
      });
      console.log(error?.response);
      toast.error(`${error?.response?.data?.message}`);
    }
  };
};

// user update password api logic
export const updatePassword = (bodyData, callback) => {
  return async (dispatch) => {
    dispatch({ type: types.USER_UPDATE_PASSWORD_REQUEST });
    try {
      const updatePasswordResponse = await axios.post(
        `http://localhost:4000/api/v1/reset-password`,
        bodyData
      );
      dispatch({
        type: types.USER_UPDATE_PASSWORD_SUCCESS,
        payload: updatePasswordResponse.data,
      });
      toast.success(`${updatePasswordResponse.data.message}`);
      if (callback) {
        callback(true);
      }
    } catch (err) {
      dispatch({
        type: types.USER_UPDATE_PASSWORD_FAILURE,
        payload: err.message,
      });
      toast.error(`${err?.response?.data?.message}`);
      if (callback) callback(false);
    }
  };
};
