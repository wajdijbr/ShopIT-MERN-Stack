import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/userConstants";
import axios from "axios";

/// LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `http://localhost:4000/api/v1/login`,
      { email, password },
      config
    );
    const token = data.token;
    localStorage.setItem("jwtToken", token);
    console.log("token", token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
      token: data.token,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Register for USER
export const register = (userData) => async (dispatch) => {
  const userDataObject = {};

  for (let [key, value] of userData.entries()) {
    userDataObject[key] = value;
  }
  // console.log(userDataObject);
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // console.log(userDataObject);

    const data = await axios.post(
      "http://localhost:4000/api/v1/register",
      userDataObject,
      config
    );
    // console.log(data, userDataObject);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load USER
export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  if (!!token && token.length > 0) {
    try {
      dispatch({ type: LOAD_USER_REQUEST });

      const response = await axios.get("http://localhost:4000/api/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: response.data,
      });
      // console.log(response.data);
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  }
};

// LOGOUT USER
export const logout = () => async (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  if (!!token && token.length > 0) {
    try {
      dispatch({ type: LOAD_USER_REQUEST });

      await axios.get("http://localhost:4000/api/v1/logout");
      dispatch({
        type: LOGOUT_SUCCESS,
      });
      // console.log(response.data);
    } catch (error) {
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.response.data.message,
      });
    }
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
