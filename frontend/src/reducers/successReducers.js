/**
 * @file Success action reducer. helper of Redux implementation.
 * @author Krutin Trivedi <krutin@dal.ca>
 */

//importing Components & required Modules
import { GET_SUCCESS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}