import React, { useContext, useState } from "react";
import UserContext from "../userContext.js";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          role: "student",
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.id);
        setUserId(data.id);
        navigate("/classes");
      } else {
        alert(
          "Email or Password Incorrect\nWe did not find a student account under that email and password. Please try again."
        );
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgotPassword = () => {
    alert(
      "Feature Not Available Yet\nLook forward to this feature in our next release!"
    );
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="container">
      <img className="logo" src={logo} alt="Logo" />
      <div className="welcomeContainer">
        <h1 className="welcomeText">Log into your account</h1>
        <div className="signupContainer">
          <span className="signupText">Don't have an account? </span>
          <button className="signupLink" onClick={handleSignup}>
            Signup
          </button>
        </div>
      </div>

      <label htmlFor="email" className="label">
        Email
      </label>
      <input
        type="text"
        id="email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />

      <label htmlFor="password" className="label">
        Password
      </label>
      <input
        type="password"
        id="password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />

      <div className="optionsContainer">
        <div className="checkboxContainer">
          <button
            className="checkbox"
            onClick={() => setRememberMe(!rememberMe)}
          >
            {rememberMe && <span className="checkboxText">✓</span>}
          </button>
          <span className="checkboxLabel">Remember me</span>
        </div>
        <button className="forgotPassword" onClick={handleForgotPassword}>
          Forgot password?
        </button>
      </div>

      <button onClick={handleLogin} className="button">
        Sign In
      </button>
    </div>
  );
};

export default Login;
