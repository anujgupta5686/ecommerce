import React from "react";
import "animate.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/layout/header";
import Home from "./page/home";
import Signup from "./page/signup";
import Login from "./page/login";
import ForgetPassword from "./page/forget-password";
import OTPPage from "./page/otp-page";
import UpdatePassword from "./page/update-password";
import AddProduct from "./page/admin/add-product";
import Layout from "./components/layout";
import { useSelector } from "react-redux";
import AppRoutes from "./AppRoutes";
import FilterPage from "./page/filterProductPage/FilterPage";
import ProductDetail from "./page/filterProductPage/ProductDetail";
import CheckoutPage from "./page/checkout";
import AddToCart from "./page/add-to-cart";
const App = () => {
  const user = useSelector((state) => state.user);
  const userDataIni = user?.data?.user?.role;
  console.log("User App.jsx::", userDataIni);
  return (
    <div>
      <Header />
      {userDataIni ? (
        <Layout>
          <AppRoutes />
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/otp-verify" element={<OTPPage />} />
          <Route path="/update-password/:token" element={<UpdatePassword />} />
          <Route path="/filter-product-page" element={<FilterPage />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/addtocart" element={<AddToCart />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
