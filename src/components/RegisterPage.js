import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    avatar: "https://i.ibb.co/FqVGH84/download-2.jpg",
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      window.alert("Password do not match");
      return;
    }
    try {
      const response = await fetch(
        "https://arba-dev-backend-1.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        window.alert("Registration successful");
        navigate("/");
      } else {
        // Handle registration failure
        window.alert("Registration failed");
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <img
          src="https://i.ibb.co/d2TP6Pw/Screenshot-33.png"
          style={{ width: "50%", height: "130vh" }}
        />
        <div style={{ width: "50%", height: "100vh" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "30px",
                backgroundColor: "#00abc5",
                margin: "auto",
                marginBottom: "-10px",
              }}
            ></div>
            <h1 style={{ textAlign: "center", marginBottom: "-10px" }}>
              APP NAME
            </h1>
            <p style={{ textAlign: "center" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            {/* Registration form */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                justifyContent: "center",
                width: "50%",
                margin: "auto",
                flexDirection: "column",
              }}
            >
              {/* Input fields for registration */}
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Username"
                style={inputStyle}
              />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Fullname"
                style={inputStyle}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                style={inputStyle}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                style={inputStyle}
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                style={inputStyle}
              />
              {/* Register button */}
              <button type="submit" style={buttonStyle}>
                Register
              </button>
            </form>
            {/* Login link */}
            <p style={{ textAlign: "center" }}>
              Have an account?{" "}
              <Link to="/" style={{ color: "#00abc5" }}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// Styles for input fields and button
const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  marginTop: "20px",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  borderBottom: "2px solid #00abc5",
};

const buttonStyle = {
  padding: "8px",
  borderRadius: "5px",
  marginTop: "30px",
  width: "70%",
  margin: "30px auto 0px auto",
  backgroundColor: "#00abc5",
  color: "white",
  borderStyle: "none",
  border: "1px solid #00abc5",
};

export default RegisterPage;
