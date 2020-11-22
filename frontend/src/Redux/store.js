import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import authReducer from "./Auth/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ auth: authReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
