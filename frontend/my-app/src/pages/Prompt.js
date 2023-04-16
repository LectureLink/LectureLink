import React from "react";
import ComprehensionScale from "../components/ComprehensionScale.js";
import styles from "../styles/prompt.module.css";

function Prompt() {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.text}>How clear was this part of the lecture?</h1>
        <ComprehensionScale />
        <button className={styles.submitButton}>Submit</button>
      </div>
    </div>
  );
}

export default Prompt;
