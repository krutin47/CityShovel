/**
 * @file Redux store for the Application.
 * @use It will store the states for whole application using it you can fetch different state for components.
 * @author Krutin Trivedi <krutin@dal.ca>
 */

//importing Components & required Modules
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
  )
);

export default store;