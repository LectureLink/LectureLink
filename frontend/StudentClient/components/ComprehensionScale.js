import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/colors";

function CircleButton({ value, onPress, selected }) {
  return (
    <TouchableOpacity
      style={[
        styles.circleButton,
        selected ? { backgroundColor: colors.primaryBlue } : null,
      ]}
      onPress={() => onPress(value)}
    >
      <Text style={styles.circleButtonText}></Text>
    </TouchableOpacity>
  );
}

function ComprehensionScale() {
  const [selectedValue, setSelectedValue] = useState(null);

  const handlePress = (value) => {
    setSelectedValue(value);
  };

  const scaleValues = ["0%", "25%", "50%", "75%", "100%"];

  return (
    <View style={styles.container}>
      <View></View>
      {scaleValues.map((value, index) => (
        <View key={index} style={styles.circleContainer}>
          <CircleButton
            value={value}
            onPress={handlePress}
            selected={selectedValue === value}
          />
          <Text style={styles.percentageText}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  circleContainer: {
    alignItems: "center",
  },
  circleButton: {
    backgroundColor: colors.white,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    borderWidth: 2,
    borderColor: colors.primaryBlue,
  },
  circleButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
  percentageText: {
    fontSize: 14,
    color: colors.black,
  },
});

export default ComprehensionScale;
