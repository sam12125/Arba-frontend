import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProfileMenu from "./ProfileMenu";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleCartclick = () => {
    navigate("/cart");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px",
        alignItems: "center",
        backgroundColor: "#e0e0e0",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "#0398f3",
          borderRadius: "20px",
        }}
      >
        <p style={{ color: "white", textAlign: "center", fontSize: "12px" }}>
          Logo
        </p>
      </div>
      <Link to="/" style={{ color: "#0398f3" }}>
        Home
      </Link>
      <div style={{ display: "flex" }}>
        <FaShoppingCart
          style={{
            marginRight: "10px",
            cursor: "pointer",
            fontSize: "32px",
            color: "#0398f3",
          }}
          onClick={handleCartclick}
        />
        <ProfileMenu />
      </div>
    </div>
  );
}

export default Navbar;
