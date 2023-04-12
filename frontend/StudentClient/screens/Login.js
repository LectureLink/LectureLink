import React from "react";
import { Text, View, StyleSheet } from "react-native";

function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Login Screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Login;
