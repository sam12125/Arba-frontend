import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.clear();
    // Navigate to the login page
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleMyStore = () => {
    navigate("/mystore");
  };

  return (
    <div style={{ position: "relative", zIndex: 999 }}>
      <FaUser
        style={{ cursor: "pointer", fontSize: "32px", color: "#0398f3" }}
        onClick={() => setShowMenu(!showMenu)}
      />
      {showMenu && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "10px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
            zIndex: 9999,
          }}
        >
          <ul style={{ listStyleType: "none", padding: "5px", margin: "0" }}>
            <li style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
              <Link to="/profile" onClick={handleProfile}>
                Profile
              </Link>
            </li>
            <li style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
              <Link to="/mystore" onClick={handleMyStore}>
                My Store
              </Link>
            </li>
            <li style={{ padding: "10px" }}>
              <button
                onClick={handleLogout}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
