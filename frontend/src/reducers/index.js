/**
 * @file Redux implementation.
 * @author Krutin Trivedi <krutin@dal.ca>
 */

 import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import successReducer from "./successReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  success: successReducer
});