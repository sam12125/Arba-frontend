import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/main.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make API request to fetch all user data
        const response = await axios.get(
          "https://arba-dev-backend.onrender.com/auth/data"
        );
        console.log(response.data);

        // Filter out the user with the specific email address
        const userEmail = localStorage.getItem("userEmail");
        const filteredUser = response.data.find(
          (user) => user.email === userEmail
        );

        if (!filteredUser) {
          throw new Error("User not found");
        }

        // Update user data state
        setUserData(filteredUser);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    const termsAccepted = localStorage.getItem("termsAccepted");
    if (termsAccepted) {
      setShowDialog(false);
    } else {
      setShowDialog(true);
    }

    fetchUserData(); // Call the fetchUserData function when the component mounts
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/profile");
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

  // Render loading while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        {/* Render user image */}
        <img
          src={userData.avatar}
          alt="User"
          style={{ width: "auto", height: "auto" }}
        />
        <h2>{userData.username}</h2>
        {/* Render user email */}
        <p>Email: {userData.email}</p>
        <p>Username: {userData.userName}</p>

        {showDialog && (
          <div className="terms-condition-dialog">
            <h2>Terms & Conditions</h2>
            <p>This is the content of the terms & conditions.</p>
            <button onClick={handleAccept}>Accept</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "70%",
            gap: "20px",
          }}
        >
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
            Update Profile
          </button>
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
            ChangePassword
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
