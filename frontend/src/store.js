import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productsReducers,
} from "./reducers/productsReducers";
import { authReducers } from "./reducers/userReducers";
const reducer = combineReducers({
  products: productsReducers,
  productDetails: productDetailsReducer,
  auth: authReducers,
});

let initialState = {
  auth: {
    loading: false,
    isAuthenticated: false,
    user: null,
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
