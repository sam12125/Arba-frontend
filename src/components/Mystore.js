import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Mystore() {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/mystore");
    } else {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>Please click below to choose</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Link to="/mystore/categories">Categories</Link>
        <Link to="/mystore/products">Products</Link>
      </div>
    </>
  );
}

export default Mystore;
