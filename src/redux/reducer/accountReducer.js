import { SET_ACTIVE } from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  active: 0,
};

const accountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE:
      return {
        ...state,
        active: action.index,
      };
    default:
      return state;
  }
};

export default accountReducer;
