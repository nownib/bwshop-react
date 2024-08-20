import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERORR,
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
        },
      };
    case FETCH_USER_ERORR:
      return { ...state, isLoading: false };

    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        account: {
          email: action.userData.email,
          username: action.userData.username,
        },
        token: action.userData.token,
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
