// reducers/userReducer.js

import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LOGIN,
  LOGOUT,
} from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  isAuthenticated: false,
  token: "",
  account: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        token: action.userData.token,
        account: {
          email: action.userData.email,
          username: action.userData.username,
          id: action.userData.id,
        },
      };
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        token: action.userData.token,
        account: {
          email: action.userData.email,
          username: action.userData.username,
          id: action.userData.id,
        },
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: "",
        account: {},
        isLoading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
