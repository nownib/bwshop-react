import {
  FETCH_ADDRESS_REQUEST,
  FETCH_ADDRESS_SUCCESS,
  FETCH_ADDRESS_ERROR,
} from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  listAddress: [],
};

const addressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ADDRESS_REQUEST:
      return {
        ...state,
      };
    case FETCH_ADDRESS_SUCCESS:
      return {
        ...state,
        listAddress: action.listAddress,
      };
    case FETCH_ADDRESS_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default addressReducer;
