import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Imageslider from "./Imageslider";
import "../styles/main.css";
import { Check } from "./AppContext";

// https://arba-dev-backend-1.onrender.com/

function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cartItems, setCartItems] = useState({});
  const { cart, setCart } = useContext(Check);

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

  const handleAddToCart = (productId, product) => {
    setSelectedProductId(productId);
    setCartItems((prevItems) => ({
      ...prevItems,
      [productId]: (prevItems[productId] || 0) + 1,
    }));
    console.log(product, "hi");
    console.log("here is cart", cart);
    let check2 = cart.filter((item) => item._id !== product._id);
    check2.push(product);
    console.log("2nd", check2);
    setCart(check2);
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
    // console.log("hy", product);

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
              width: "40%",
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
              width: "40%",
            }}
            onClick={() => handleAddToCart(product._id, product)}
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
            width: "80%",
          }}
          onClick={() => handleAddToCart(product._id, product)}
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
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.<br></br>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.<br></br>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <button onClick={handleCancel} style={buttonStyle}>
              Cancel
            </button>
            <button onClick={handleAccept} style={buttonStyle}>
              Accept
            </button>
          </div>
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
          padding: "12px",
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
          width: "20%",
        }}
        onClick={handleAllProductsClick}
      >
        All Products
      </button>
    </>
  );
}

export default HomePage;

const buttonStyle = {
  padding: "8px",
  borderRadius: "5px",
  backgroundColor: "#00abc5",
  color: "white",
  borderStyle: "none",
  border: "1px solid #00abc5",
  width: "150px",
};
