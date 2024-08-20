import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import productDetailsReducer from "./productDetailsReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
  productDetails: productDetailsReducer,
  order: orderReducer,
});

export default rootReducer;
