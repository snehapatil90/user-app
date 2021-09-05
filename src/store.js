import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  userDeleteReducer,
  userDetailsReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const initialState = {
  userDetails: {
    userDetailsV3: localStorage.getItem("userDetailsV3")
      ? JSON.parse(localStorage.getItem("userDetailsV3"))
      : null,
  },
};

const reducer = combineReducers({
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
