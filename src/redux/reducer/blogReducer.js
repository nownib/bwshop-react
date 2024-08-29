import {
  FETCH_BLOG_ERROR,
  FETCH_BLOG_SUCCESS,
  FETCH_BLOG_REQUEST,
  FETCH_BLOG_DETAIL_REQUEST,
  FETCH_BLOG_DETAIL_SUCCESS,
  FETCH_BLOG_DETAIL_ERROR,
} from "../action/types";

const INITIAL_STATE = {
  listBlogs: [],
  isLoading: false,
  isError: false,
  isCreating: false,
};

const blogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_BLOG_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FETCH_BLOG_SUCCESS:
      return {
        ...state,
        listBlogs: action.listItems,
        isLoading: false,
        isError: false,
      };

    case FETCH_BLOG_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default blogReducer;
