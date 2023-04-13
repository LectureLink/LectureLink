import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../styles/colors";
import { useNavigation } from "@react-navigation/native";

const Class = (props) => {
  const navigation = useNavigation();

  function handleToSettings() {
    navigation.navigate("ClassSettings");
  }

  function handleToDeviceView() {
    navigation.navigate("DeviceView");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleToSettings}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.enableButton}
          onPress={handleToDeviceView}
        >
          <Text style={[styles.buttonText, styles.enableButtonText]}>
            Enable
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: colors.white,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsButton: {
    padding: 10,
    backgroundColor: colors.gray,
    borderRadius: 5,
  },
  enableButton: {
    backgroundColor: colors.primaryBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 16,
  },
  enableButtonText: {
    color: colors.white,
  },
});

export default Class;
