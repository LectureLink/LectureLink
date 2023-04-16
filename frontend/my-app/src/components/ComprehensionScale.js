import React, { useState } from "react";
import CircleButton from "./CircleButton";
import styles from "./ComprehensionScale.module.css";

function ComprehensionScale() {
  const [selectedValue, setSelectedValue] = useState(null);

  const handlePress = (value) => {
    setSelectedValue(value);
  };

  const scaleValues = ["0%", "25%", "50%", "75%", "100%"];

  return (
    <div className={styles.container}>
      <div></div>
      {scaleValues.map((value, index) => (
        <div key={index} className={styles.circleContainer}>
          <CircleButton
            value={value}
            onPress={handlePress}
            selected={selectedValue === value}
          />
          <span className={styles.percentageText}>{value}</span>
        </div>
      ))}
    </div>
  );
}

export default ComprehensionScale;
