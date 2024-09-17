import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import productDetailsReducer from "./productDetailsReducer";
import orderReducer from "./orderReducer";
import wishlistReducer from "../reducer/wishlistReducer";
import blogReducer from "./blogReducer";
import blogDetailsReducer from "./blogDetailsReducer";
import accountReducer from "./accountReducer";
import addressReducer from "./addressReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
  productDetails: productDetailsReducer,
  order: orderReducer,
  wishlist: wishlistReducer,
  blog: blogReducer,
  blogDetails: blogDetailsReducer,
  account: accountReducer,
  address: addressReducer,
});

export default rootReducer;
