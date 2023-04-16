import React, { useContext, useState } from "react";
import { useNavigation } from "react-router-dom";
import UserContext from "../userContext.js";
import styles from "../styles/signup.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const { setUserId } = useContext(UserContext);

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8081/professors", {
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
        navigation.push("/userClasses");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      alert("Unable to create professor account. Please try again later.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.logo}
        src={require("../assets/logo.png").default}
        alt="Logo"
      />

      <div className={styles.welcomeContainer}>
        <h1 className={styles.welcomeText}>
          Sign up for your new professor account!
        </h1>
      </div>

      <label htmlFor="email" className={styles.label}>
        Email
      </label>
      <input
        id="email"
        className={styles.input}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Enter your email"
      />

      <label htmlFor="password" className={styles.label}>
        Password
      </label>
      <input
        id="password"
        className={styles.input}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter your password"
      />

      <button onClick={handleSignup} className={styles.button}>
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
