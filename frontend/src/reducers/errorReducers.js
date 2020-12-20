/**
 * @file Error action reducer. helper of Redux implementation.
 * @author Krutin Trivedi <krutin@dal.ca>
 */

//importing Components & required Modules
import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}