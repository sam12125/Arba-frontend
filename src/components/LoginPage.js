import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/home");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend API
      const response = await fetch(
        "https://arba-dev-backend.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Store authentication token in localStorage
        localStorage.setItem("authToken", data.token);
        // Store user's email in localStorage
        localStorage.setItem("userEmail", email);
        // Redirect to homepage
        navigate("/home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{ width: "50%", height: "100vh", backgroundColor: "#0398f3" }}
        ></div>
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
                backgroundColor: "#0398f3",
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
            <form
              style={{
                display: "flex",
                justifyContent: "center",
                width: "50%",
                margin: "auto",
                flexDirection: "column",
              }}
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Email"
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "2px solid #0398f3",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  marginTop: "20px",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "2px solid #0398f3",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button
                type="submit"
                style={{
                  padding: "8px",
                  borderRadius: "5px",
                  marginTop: "30px",
                  width: "70%",
                  margin: "30px auto 0px auto",
                  backgroundColor: "#0398f3",
                  color: "white",
                  borderstyle: "none",
                  border: "1px solid #0398f3",
                }}
              >
                Login
              </button>
            </form>
            <p style={{ textAlign: "center" }}>
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
