import {
  POSTS_FETCH_REQUEST,
  POSTS_FETCH_SUCCESS,
  POSTS_FETCH_ERROR,
  POSTS_ADD_REQUEST,
  POSTS_ADD_SUCCESS,
  POSTS_ADD_ERROR,
  POSTS_UPDATE_REQUEST,
  POSTS_UPDATE_SUCCESS,
  POSTS_UPDATE_ERROR,
  POSTS_REMOVE_REQUEST,
  POSTS_REMOVE_SUCCESS,
  POSTS_REMOVE_ERROR
} from "../actionTypes";

const initialState = {
  posts: {
    metadata: {
      resultset: {
        count: 0,
        offset: 0,
        limit: 10
      }
    },
    results: []
  },
  isLoading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POSTS_FETCH_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };

    case POSTS_FETCH_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        posts: action.data
      };

    case POSTS_ADD_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };

    case POSTS_ADD_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false
      };

    case POSTS_UPDATE_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };

    case POSTS_UPDATE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false
      };

    case POSTS_REMOVE_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: true
      };

    case POSTS_REMOVE_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false
      };

    case POSTS_FETCH_ERROR:
    case POSTS_ADD_ERROR:
    case POSTS_UPDATE_ERROR:
    case POSTS_REMOVE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
};
