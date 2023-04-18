import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import colors from "../styles/colors";
import { useNavigation } from "@react-navigation/native";

const Class = (props) => {
  const navigation = useNavigation();

  // Navigates to the settings.
  function handleToSettings() {
    navigation.navigate("Class Settings", {
      classId: props.id,
      title: props.title,
    });
  }

  // Creates a session instance.
  async function handleSessionCreation() {
    try {
      const response = await fetch(
        `http://localhost:8081/classes/${props.id}/sessions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const roomCode = await createRoom(data.id);
        navigation.navigate("Device View", {
          sessionId: data.id,
          title: props.title,
          roomCode,
        });
      } else {
        throw new Error("Unable to create session.");
      }
    } catch (error) {
      Alert.alert(
        "Session Start Failed",
        "We were unable to start a session for you. Please try again later.",
        [{ text: "OK" }]
      );
    }
  }

  // Creates a room (socket).
  async function createRoom(sessionId) {
    try {
      const response = await fetch(
        `http://localhost:8081/rooms/create/${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        return data.roomCode;
      } else {
        throw new Error("Unable to create room.");
      }
    } catch (error) {
      Alert.alert(
        "Room Creation Failed",
        "We were unable to create a room for you. Please try again later.",
        [{ text: "OK" }]
      );
    }
  }

  // Navigates to the Device View and creates a session.
  function handleToDeviceView() {
    Alert.alert(
      "Session Confirmation",
      "Are you sure you want to start a class session?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: handleSessionCreation,
        },
      ]
    );
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
