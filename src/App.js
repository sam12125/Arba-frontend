import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import Products from "./components/Products";
import Mystore from "./components/Mystore";
import CrudCategories from "./components/CrudCategories";
import CrudProducts from "./components/CrudProducts";
import Cart from "./components/Cart";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products" element={<Products />} />
      <Route path="/mystore" element={<Mystore />} />
      <Route path="/mystore/categories" element={<CrudCategories />} />
      <Route path="/mystore/products" element={<CrudProducts />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default App;
