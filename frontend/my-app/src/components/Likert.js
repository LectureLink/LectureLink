import React, { useState } from "react";
import styles from "../styles/Likert.module.css";

const Likert = ({ question, responses, onChange, onEngagementSubmission }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleResponseChange = (value, emoji) => {
    onChange(value);
    setSelectedEmoji(emoji);
    setSelectedValue(value);
  };

  function handleSubmit() {
    onEngagementSubmission();
  }

  return (
    <div className={styles.likert}>
      <div className={styles.likertQuestion}>{question}</div>
      {selectedEmoji && (
        <div className={styles.likertEmoji}>{selectedEmoji}</div>
      )}
      <div className={styles.likertScale}>
        {responses.map((response, index) => (
          <label
            key={index}
            className={`${styles.likertResponse} ${
              selectedValue === response.value ? styles.selected : ""
            }`}
            style={{ backgroundColor: `var(${response.color})` }}
          >
            <input
              type="radio"
              name="likert"
              value={response.value}
              onChange={() =>
                handleResponseChange(response.value, response.emoji)
              }
            />
            <div className={styles.likertResponseText}>{response.text}</div>
          </label>
        ))}
      </div>
      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit
      </button>
    </div>
  );
};

export default Likert;
