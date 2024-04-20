import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import CrudCategories from "./CrudCategories";
import CrudProducts from "./CrudProducts";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Mystore() {
  const [showCategories, setShowCategories] = useState(true);
  const [showProducts, setShowProducts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/mystore");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleCategoriesClick = () => {
    console.log("ca");
    setShowCategories(true);
    setShowProducts(false);
  };

  const handleProductsClick = () => {
    console.log("pro");
    setShowProducts(true);
    setShowCategories(false);
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          width: "60%",
          backgroundColor: "#7e8990 ",
          margin: "auto",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            width: "50%",
            backgroundColor: showCategories ? "#00abc5" : "#7e8990",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <Link
            to="#"
            onClick={handleCategoriesClick}
            style={{ color: "white" }}
          >
            Categories
          </Link>
        </div>
        <div
          style={{
            width: "50%",
            backgroundColor: showProducts ? "#00abc5" : "#7e8990",
            padding: "10px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <Link to="#" onClick={handleProductsClick} style={{ color: "white" }}>
            Products
          </Link>
        </div>
      </div>

      <div
        style={{ display: "flex", marginTop: "20px", justifyContent: "center" }}
      >
        <div>
          {showCategories && (
            <CrudCategories
              style={{
                display: "flex",
                marginTop: "20px",
                justifyContent: "center",
              }}
            />
          )}
        </div>
        <div>{showProducts && <CrudProducts />}</div>
      </div>
    </>
  );
}

export default Mystore;
