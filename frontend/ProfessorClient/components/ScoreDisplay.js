import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";

function ScoreDisplay(props) {
  let color = colors.ridRed;
  if (props.score >= 25) {
    color = colors.badOrange;
  }
  if (props.score >= 50) {
    color = colors.okYellow;
  }
  if (props.score >= 75) {
    color = colors.generousGreen;
  }
  if (props.score >= 85) {
    color = colors.goodGreen;
  }
  if (props.score == null || props.isCountdown) {
    color = colors.neutral;
  }

  const [scoreText, setScoreText] = useState("");

  useEffect(() => {
    if (props.score == -1) {
      setScoreText("Response rate too low.");
    } else if (props.score === null) {
      setScoreText("Request data");
    } else {
      setScoreText(props.isCountdown ? props.score : props.score.toFixed(2));
    }
  }, [props.score]);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.numberText}>{scoreText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
});

export default ScoreDisplay;
