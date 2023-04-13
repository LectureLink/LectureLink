import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ScoreDisplay from "../components/ScoreDisplay";
import colors from "../styles/colors";

function DeviceView() {
  function handlePrev() {}

  function handleNext() {}

  function handleRequestEngagement() {}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"ENTR 3000"}</Text>
      <ScoreDisplay score={90} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePrev}>
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.requestButton}
        onPress={handleRequestEngagement}
      >
        <Text style={styles.buttonText}>Request Engagement</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 20,
  },
  button: {
    backgroundColor: colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
  },
  requestButton: {
    backgroundColor: colors.primaryBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "80%",
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default DeviceView;
