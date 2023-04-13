import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";

function NumberBlock(props) {
  let color = colors.ridRed;
  if (props.score >= 50) {
    color = colors.okYellow;
  }
  if (props.score >= 75) {
    color = colors.goodGreen;
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.numberText}>{props.score}%</Text>
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

export default NumberBlock;
