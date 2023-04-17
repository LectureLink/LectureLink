import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../userContext.js";
import "../styles/Signup.css";
import logo from "../assets/logo.png";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUserId } = useContext(UserContext);

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8081/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setUserId(data.userId);
        navigate("/classes");
      }
    } catch (error) {
      alert("Unable to create professor account. Please try again later.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="container">
      <img className="logo" src={logo} alt="Logo" />

      <div className="welcomeContainer">
        <h1 className="welcomeText">Sign up for your new student account!</h1>
      </div>

      <label htmlFor="email" className="label">
        Email
      </label>
      <input
        id="email"
        className="input"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter your email"
      />

      <label htmlFor="password" className="label">
        Password
      </label>
      <input
        id="password"
        className="input"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter your password"
      />

      <button onClick={handleSignup} className="button">
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
