import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Imageslider from "./Imageslider";
import "../styles/main.css";

// https://arba-dev-backend-1.onrender.com/

function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://arba-dev-backend-1.onrender.com/api/products"
        );
        setProducts(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleAccept = () => {
    localStorage.setItem("termsAccepted", true);
    setShowDialog(false);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    const termsAccepted = localStorage.getItem("termsAccepted");
    if (termsAccepted) {
      setShowDialog(false);
    } else {
      setShowDialog(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleAddToCart = (productId) => {
    setSelectedProductId(productId);
    setCartItems((prevItems) => ({
      ...prevItems,
      [productId]: (prevItems[productId] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (updatedItems[productId] > 0) {
        updatedItems[productId] -= 1;
        if (updatedItems[productId] === 0) {
          setSelectedProductId(null);
        }
      }
      return updatedItems;
    });
  };

  const handleAllProductsClick = () => {
    navigate("/products");
  };

  const renderAddToCartButton = (product) => {
    const isSelected = selectedProductId === product._id;
    const count = cartItems[product._id] || 0;

    if (isSelected) {
      return (
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              padding: "8px",
              borderRadius: "5px",
              backgroundColor: "#0398f3",
              color: "white",
              borderStyle: "none",
              border: "1px solid #0398f3",
              margin: "auto",
              display: "inline-block",
              cursor: "pointer",
            }}
            onClick={() => handleRemoveFromCart(product._id)}
          >
            -
          </button>
          <span style={{ margin: "0 10px" }}>{count}</span>
          <button
            style={{
              padding: "8px",
              borderRadius: "5px",
              backgroundColor: "#0398f3",
              color: "white",
              borderStyle: "none",
              border: "1px solid #0398f3",
              margin: "auto",
              display: "inline-block",
              cursor: "pointer",
            }}
            onClick={() => handleAddToCart(product._id)}
          >
            +
          </button>
        </div>
      );
    } else {
      return (
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
          }}
          onClick={() => handleAddToCart(product._id)}
        >
          Add to Cart
        </button>
      );
    }
  };

  const totalCount = Object.values(cartItems).reduce(
    (total, count) => total + count,
    0
  );

  return (
    <>
      <Navbar />
      <div className="overflow">
        <Imageslider />
      </div>
      {showDialog && (
        <div className="terms-condition-dialog">
          <h2>Terms & Conditions</h2>
          <p>This is the content of the terms & conditions.</p>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
      <h1 style={{ textAlign: "center", marginTop: "40px" }}>
        Total items in cart: {totalCount}
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "40px",
        }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          products.slice(0, 8).map((product, index) => (
            <div
              key={index}
              style={{
                width: "22%",
                marginBottom: "20px",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%" }}
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
                {renderAddToCartButton(product)}
              </div>
            </div>
          ))
        )}
      </div>

      <button
        style={{
          padding: "16px",
          borderRadius: "5px",
          backgroundColor: "#0398f3",
          color: "white",
          borderStyle: "none",
          border: "1px solid #0398f3",
          margin: "auto",
          marginBottom: "20px",
          marginTop: "20px",
          display: "block",
          cursor: "pointer",
        }}
        onClick={handleAllProductsClick}
      >
        All Products
      </button>
    </>
  );
}

export default HomePage;
