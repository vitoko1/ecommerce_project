import axios from "axios";
//import isEmail from "validator/lib/isEmail";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL
} from "../constants/userConstants";

//*Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }

    console.log(email);

    const { data } = await axios.post('/api/v1/login', { email, password }, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//* Register user
export const register = (userData) => async (dispatch) => {
  try {
console.log("Inside Register");
      dispatch({ type: REGISTER_USER_REQUEST })

      const config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }

      const { data } = await axios.post('/api/v1/register', userData, config)
      console.log("Inside Register2"+data);
      dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: data.user
      })

  } catch (error) {
    console.log(error.response);
      dispatch({
          type: REGISTER_USER_FAIL,
          payload: error.response.data.message
      })
  }
}


//* Load user
export const loadUser = () => async (dispatch) => {
  try {
console.log("Inside Register");
      dispatch({ type: LOAD_USER_REQUEST })

     

      const { data } = await axios.get('/api/v1/me')
      console.log("Inside Register2"+data);
      dispatch({
          type: LOAD_USER_SUCCESS,
          payload: data.user
      })

  } catch (error) {
    console.log(error.response);
      dispatch({
          type: LOAD_USER_FAIL,
          payload: error.response.data.message
      })
  }
}





//* clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
