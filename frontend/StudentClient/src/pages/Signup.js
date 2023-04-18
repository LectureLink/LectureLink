import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../userContext.js";
import logo from "../assets/logo.png";
import styles from "../styles/Signup.module.css";

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
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="Logo" />

      <div className={styles.title}>
        <h1>Sign up for your new student account!</h1>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="email">Student Email</label>
        <input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter your password"
        />
      </div>

      <button className={styles.signIn} onClick={handleSignup}>
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
