import React, { useState, useEffect, useContext } from "react";
import "../styles/main.css";
import { Check } from "./AppContext";
import Navbar from "./Navbar";

function Cart() {
  const { cart, setCart } = useContext(Check);
  console.log("products", cart);

  return (
    <>
      <Navbar />
      <div>
        <h1 style={{ textAlign: "center" }}>Cart Items</h1>

        {cart.length === 0 ? (
          <p style={{ textAlign: "center" }}>Your cart is empty.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "40px",
            }}
          >
            {cart.map((product, index) => (
              <div key={index}>
                <img
                  src={product.image}
                  style={{ margin: "auto", display: "block" }}
                />
                <div
                  style={{
                    background: "white",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    padding: "10px",
                  }}
                >
                  <h3 style={{ textAlign: "center", margin: "0px" }}>
                    {product.title}
                  </h3>
                  <p style={{ textAlign: "center", marginTop: "5px" }}>
                    {product.price}
                  </p>
                  <p style={{ textAlign: "center", marginTop: "-15px" }}>
                    {product.description}
                  </p>
                  <button
                    style={{
                      padding: "8px",
                      borderRadius: "5px",
                      backgroundColor: "#0398f3",
                      color: "white",
                      borderStyle: "none",
                      border: "1px solid #0398f3",
                      margin: "auto",
                      display: "block",
                      cursor: "pointer",
                      width: "80%",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
