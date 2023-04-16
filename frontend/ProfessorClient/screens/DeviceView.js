import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import ScoreDisplay from "../components/ScoreDisplay";
import colors from "../styles/colors";

function DeviceView({ route }) {
  const { sessionId, title } = route.params;
  const [score, setScore] = useState(null);
  const DEFAULT_WAIT_TIME = 30;

  // A feature to be added in future releases
  function handlePrev() {
    // Future code here...
  }

  // A feature to be added in future releases
  function handleNext() {
    // Future code here...
  }

  async function handleRequestEngagement() {
    let currScore = DEFAULT_WAIT_TIME;
    const timer = setInterval(() => {
      setScore(currScore);
      currScore--;
      if (currScore < 0) {
        clearInterval(timer);
        fetchData();
      }
    }, 1000);
  }

  async function fetchData() {
    try {
      const response = await fetch(
        `http://localhost:8081/sessions/${sessionId}/classSize/${1}/timespan/${DEFAULT_WAIT_TIME}`
      );
      const data = await response.json();
      if (response.ok) {
        setScore(data.comprehensionLevel);
      } else {
        throw new Error("Problem in retrieving data.");
      }
    } catch (error) {
      Alert.alert(
        "Unable to retrieve data",
        "We were not able to collect engagement data for your class session. Please try again later.",
        [{ text: "OK" }]
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScoreDisplay score={score} />
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
