import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import productDetailsReducer from "./productDetailsReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
  productDetails: productDetailsReducer,
});

export default rootReducer;
