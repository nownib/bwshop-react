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
        {/* </Route> */}
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Login />} />
        <Route path="/contact" element={<Login />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
