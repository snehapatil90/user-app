import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_UPDATE_FAIL,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_DELETE_REQUEST,
  USER_DETAILS_DELETE_SUCCESS,
  USER_DETAILS_DELETE_FAIL,
} from "../constants/userConstants";

// user detail action
export const details = (userData) => async (dispatch) => {
  dispatch({
    type: USER_DETAILS_REQUEST,
    payload: userData,
  });
  try {
    dispatch({ type: USER_DETAILS_SUCCESS, payload: userData });
    let existingUsersData =
      JSON.parse(localStorage.getItem("userDetailsV3")) || [];
    console.log("existingUsersData ---> ", existingUsersData);
    const newExistingUserData = [userData].concat(existingUsersData);
    // existingUsersData.push(userData);
    console.log("updatedObject ---> ", existingUsersData);
    localStorage.setItem("userDetailsV3", JSON.stringify(newExistingUserData));
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: {},
    });
  }
};

// user update action
export const update = (userData) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_UPDATE_REQUEST, payload: userData });
  try {
    dispatch({ type: USER_DETAILS_UPDATE_SUCCESS, payload: userData });
    let newExistingData = [];
    let existingUsersData =
      JSON.parse(localStorage.getItem("userDetailsV3")) || [];
    console.log("existingUsersData ---> ", existingUsersData);
    existingUsersData.map((data) => {
      if (data.userId !== userData.userId) {
        console.log("data inside if", data);
        newExistingData.push(data);
      }
    });
    newExistingData.push(userData);
    localStorage.setItem("userDetailsV3", JSON.stringify(newExistingData));
  } catch (error) {
    const message = "error while updating";
    dispatch({ type: USER_DETAILS_UPDATE_FAIL, payload: message });
  }
};

// user delete action
export const deleteUserId = (userData) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_DELETE_REQUEST, payload: userData });
  console.log("userData rrr ---> ", userData);
  try {
    dispatch({ type: USER_DETAILS_DELETE_SUCCESS, payload: userData });
    let newExistingData = [];
    let existingUsersData =
      JSON.parse(localStorage.getItem("userDetailsV3")) || [];
    console.log("existingUsersData ---> ", existingUsersData);
    existingUsersData.map((data) => {
      if (data.userId !== userData.userId) {
        console.log("data inside if", data);
        newExistingData.push(data);
      }
    });
    localStorage.setItem("userDetailsV3", JSON.stringify(newExistingData));
  } catch (error) {
    const message = "error while updating";
    dispatch({ type: USER_DETAILS_DELETE_FAIL, payload: message });
  }
};
