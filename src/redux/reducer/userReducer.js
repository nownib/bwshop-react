import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERORR,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_ERROR,
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
          phone: action.userData.phone,
          email: action.userData.email,
          username: action.userData.username,
          avatar: action.userData.avatar,
        },
      };
    case FETCH_USER_ERORR:
      return { ...state, isLoading: false };

    case UPDATE_ACCOUNT_REQUEST:
      return { ...state };

    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        account: {
          email: action.userData.email,
          phone: action.userData.phone,
          username: action.userData.username,
          avatar: action.userData.avatar,
        },
      };

    case UPDATE_ACCOUNT_ERROR:
      return { ...state, isLoading: true };

    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        account: {
          phone: action.userData.phone,
          email: action.userData.email,
          username: action.userData.username,
          avatar: action.userData.avatar,
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
