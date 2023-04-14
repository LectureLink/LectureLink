import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/colors";
import ComprehensionScale from "../components/ComprehensionScale";

function Prompt() {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>How clear was this part of the lecture?</Text>
        <ComprehensionScale />
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.primaryBlue,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.gray,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: colors.primaryBlue,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Prompt;
