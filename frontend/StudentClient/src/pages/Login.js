import React, { useContext, useState } from "react";
import UserContext from "../userContext.js";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import logo from "../assets/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  // Verifies if user can login and sets userContext if accepted.
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

  // Alerts that forgot password is not yet a feature
  const handleForgotPassword = () => {
    alert(
      "Feature Not Available Yet\nLook forward to this feature in our next release!"
    );
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div>
        <h1 className={styles.title}>Log into your student account</h1>
        <div className={styles.signupPrompt}>
          <span>Don't have an account? </span>
          <Link to="/signup" className={styles.signupLink}>
            Signup
          </Link>
        </div>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="email">Student Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <div className={styles.rememberMeForgot}>
        <div className={styles.rememberMe}>
          <input type="checkbox" />
          <span>Remember me</span>
        </div>
        <span className={styles.forgotPassword} onClick={handleForgotPassword}>
          Forgot password?
        </span>
      </div>

      <button className={styles.signIn} onClick={handleLogin}>
        Sign In
      </button>
    </div>
  );
}

export default Login;
