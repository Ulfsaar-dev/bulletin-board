import axios from "axios";
import { SERVER_URL } from "../constants";
import { AuthManager } from "../utils";
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

export const fetchPosts = (startDate = "", endDate = "") => async dispatch => {
  try {
    dispatch({ type: POSTS_FETCH_REQUEST });

    const url = `${SERVER_URL}/posts`;

    const { data } = await axios({
      method: "GET",
      params: {},
      url,
      headers: {
        Authorization: AuthManager.getBearerToken()
      }
    });

    dispatch({ type: POSTS_FETCH_SUCCESS, data });
  } catch (error) {
    dispatch({ type: POSTS_FETCH_ERROR, error: error.response.data });
  }
};

export const addPost = post => async dispatch => {
  try {
    dispatch({ type: POSTS_ADD_REQUEST });

    const url = `${SERVER_URL}/posts`;

    const { data } = await axios({
      method: "POST",
      url,
      headers: {
        Authorization: AuthManager.getBearerToken()
      },
      data: post
    });

    dispatch({ type: POSTS_ADD_SUCCESS, data });
    await dispatch(fetchPosts());
  } catch (error) {
    dispatch({ type: POSTS_ADD_ERROR, error: error.response.data });
  }
};

export const updatePost = (post, index) => async dispatch => {
  try {
    dispatch({ type: POSTS_UPDATE_REQUEST });

    const url = `${SERVER_URL}/posts/${index}`;

    const { data } = await axios({
      method: "PUT",
      url,
      headers: {
        Authorization: AuthManager.getBearerToken()
      },
      data: post
    });

    dispatch({ type: POSTS_UPDATE_SUCCESS, data });
    await dispatch(fetchPosts());
  } catch (error) {
    dispatch({ type: POSTS_UPDATE_ERROR, error: error.response.data });
  }
};

export const removePost = index => async dispatch => {
  try {
    dispatch({ type: POSTS_REMOVE_REQUEST });

    const url = `${SERVER_URL}/posts/${index}`;

    const { data } = await axios({
      method: "DELETE",
      url,
      headers: {
        Authorization: AuthManager.getBearerToken()
      }
    });

    dispatch({ type: POSTS_REMOVE_SUCCESS, data });
    await dispatch(fetchPosts());
  } catch (error) {
    dispatch({ type: POSTS_REMOVE_ERROR, error: error.response.data });
  }
};
