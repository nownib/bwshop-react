import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";

import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import NoPage from "../components/NoPage/NoPage";
import GoogleRedirect from "../components/Login/GoogleRedirect";
import About from "../components/About/About";
import Shop from "../components/Shop/Shop";
import ProductDetails from "../components/Product/Product";
import Cart from "../components/Cart/Cart";
import Wishlist from "../components/Wishlish/Wishlist";
import Blog from "../components/Blog/Blog";
import BlogDetails from "../components/Blog/BlogDetails";
import Contact from "../components/Contact/Contact";
import Account from "../components/Account/Account";
import ForgotPassword from "../components/Login/ForgotPassword";

const AppRoutes = () => {
  return (
    <>
      {/* 2 */}
      <Routes>
        {/* 3 */}
        {/* <Route element={<LoggedRoutes />}> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/google/redirect" element={<GoogleRedirect />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* </Route> */}
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/blog/:blogId" element={<BlogDetails />} />

        <Route path="/account" element={<Account />} />
        <Route path="/account/orders" element={<Account />} />
        <Route path="/account/address" element={<Account />} />

        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
