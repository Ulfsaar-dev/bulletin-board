import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import authReducer from "./auth";
import postsReducer from "./posts";
import usersReducer from "./users";

export default combineReducers({
  router: routerReducer,
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer
});
