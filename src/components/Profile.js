import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/main.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(true);
  const [formValues, setFormValues] = useState({
    email: "",
    fullName: "",
    userName: "",
    avatar: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make API request to fetch all user data
        const response = await axios.get(
          "https://arba-dev-backend-1.onrender.com/auth/data"
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
        setFormValues(filteredUser); // Set form values to user data
        console.log(filteredUser);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:3001/auth/user/${userData._id}`,
        formValues
      );
      console.log(response.data);
      localStorage.removeItem("userEmail");
      localStorage.setItem("userEmail", formValues.email);
      window.location.reload();
      // Optionally, you can update the userData state with the updated data if needed
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Render loading while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "50%",
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
          <p>
            <b>Email</b>: {userData.email}
          </p>
          <p>
            <b>Username</b>: {userData.userName}
          </p>

          {showDialog && (
            <div className="terms-condition-dialog">
              <h2>Terms & Conditions</h2>
              <p>This is the content of the terms & conditions.</p>
              <button onClick={handleAccept}>Accept</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>

        <div style={{ width: "50%", display: "block", margin: "auto" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "0%",
            }}
          >
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Email"
              style={inputStyle}
            />
            <input
              type="text"
              name="fullName"
              value={formValues.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              style={inputStyle}
            />
            <input
              type="text"
              name="userName"
              value={formValues.userName}
              onChange={handleChange}
              placeholder="Username"
              style={inputStyle}
            />
            <input
              type="text"
              name="avatar"
              value={formValues.avatar}
              onChange={handleChange}
              placeholder="Avatar URL"
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

const inputStyle = {
  padding: "8px",
  borderRadius: "5px",
  marginTop: "20px",
  borderTop: "none",
  borderLeft: "none",
  width: "30%",
  borderRight: "none",
  borderBottom: "2px solid #00abc5",
};

const buttonStyle = {
  padding: "8px",
  borderRadius: "5px",
  backgroundColor: "#00abc5",
  color: "white",
  width: "30%",
  borderStyle: "none",
  border: "1px solid #00abc5",
};
