import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_UPDATE_FAIL,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_RESET,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_DELETE_REQUEST,
  USER_DETAILS_DELETE_FAIL,
  USER_DETAILS_DELETE_SUCCESS,
} from "../constants/userConstants";

// user detail reducer
export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// user update reducer
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_UPDATE_REQUEST:
      return { loading: true };
    case USER_DETAILS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_DETAILS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

// user delete reducer
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_DELETE_REQUEST:
      return { loading: true };
    case USER_DETAILS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DETAILS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
