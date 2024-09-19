import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Index.css";
import FoodImage from "../../../assets/Homepage.jpeg";
import ChefLogo from "../../../assets/chef-logo.png";
import {BASEURL} from "../../../url/BaseUrl";
import { useNavigate } from "react-router-dom";


function Cindex() {
  const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({ username: "", password: "" });
  const [loginData, setLoginData] = useState({ username: "", password: "", role: "Cook" });
  const navigate = useNavigate();



  const handleToggleForm = () => {
    setShowSignup(!showSignup);
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setLoginData({ ...loginData, role: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${BASEURL}cookSignup`, signupData);
      console.log("Signup response:", response.data);
      toast.success("Signup successful! Wait for the approval");
    } catch (error) {
      console.error("Error signing up cook:", error);
      toast.error("Error signing up cook!");
    }
  };


  const handleLogin = async () => {
    try {
      const endpoint = loginData.role === "Admin" ? `${BASEURL}/adminLogin` : `${BASEURL}/cookLogin`;
      const response = await axios.post(endpoint, loginData);
      console.log("Login response:", response.data);
      toast.success("Login successful!");
  
      // Navigate to different dashboards based on the role
      if (loginData.role === "Cook") {
        navigate("/cdash"); // Navigate to the cook dashboard
      } else if (loginData.role === "Admin") {
        navigate("/adash"); // Navigate to the admin dashboard
      }
    } catch (error) {
      console.error("Error logging in cook:", error);
      toast.error("Error logging in cook!");
    }
  };

  return (
    <div className="Cindex">
      <ToastContainer />
      <div className="Navbar">
        <h2>Food and Bev Station</h2>
      </div>
      <div className="background">
        <img src={FoodImage} alt="food" />
      </div>
      <div className="form-container">
        <div className="avatar">
          <img src={ChefLogo} alt="chef" />
        </div>
        {showSignup ? (
          <div>
            <h2>Signup Form</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
              }}
            >
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={signupData.username}
                onChange={handleSignupChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
              />
              <button type="submit">Signup</button>
            </form>
            <button onClick={handleToggleForm}>Login Instead</button>
          </div>
        ) : (
          <div>
            <h2>Login Form</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginData.username}
                onChange={handleLoginChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
              <select name="role" value={loginData.role} onChange={handleRoleChange}>
                <option value="Cook">Cook</option>
                <option value="Admin">Admin</option>
              </select>
              <button type="submit">Login</button>
            </form>
            <button onClick={handleToggleForm}>Signup Instead</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cindex;
