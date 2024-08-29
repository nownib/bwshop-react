import {
  FETCH_BLOG_DETAIL_REQUEST,
  FETCH_BLOG_DETAIL_SUCCESS,
  FETCH_BLOG_DETAIL_ERROR,
} from "../action/types";

const INITIAL_STATE = {
  isLoading: false,
  blogId: null,
};

const blogDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BLOG_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_BLOG_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        blogId: action.blogId,
      };

    case FETCH_BLOG_DETAIL_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default blogDetailsReducer;
