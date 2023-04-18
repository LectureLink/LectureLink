import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import colors from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
import SessionInfo from "../components/SessionInfo";

function ClassSettings({ route }) {
  const [cooldownTime, setCooldownTime] = useState(0);
  const [isPassiveCheckIn, setIsPassiveCheckIn] = useState(false);
  const navigation = useNavigation();
  const { classId, title } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [sessions, setSessions] = useState([]);

  // Retrieves the settings information of a given class Id.
  async function fetchData() {
    try {
      console.log(classId);
      const response = await fetch(`http://localhost:8081/classes/${classId}`);
      const data = await response.json();
      setCooldownTime(data.classObj.cooldownMinutes);
      setIsPassiveCheckIn(data.classObj.passiveCheckIn);
    } catch (error) {
      Alert.alert(
        "Unable to retrieve settings information",
        "We could not find the settings for your class. Please try again.",
        [{ text: "OK" }]
      );
    }
  }

  // Fetches the settings data when the page loads.
  useEffect(() => {
    fetchData();
  }, []);

  // Saves the class information that has been inputted.
  async function handleSave() {
    try {
      const response = await fetch(
        `http://localhost:8081/classes/${classId}/settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cooldownMinutes: cooldownTime,
            passiveCheckIn: isPassiveCheckIn,
          }),
        }
      );
      if (response.ok) {
        navigation.navigate("Classes");
      } else {
        throw new Error("Unable to update settings.");
      }
    } catch (error) {
      Alert.alert(
        "Unable to update settings information",
        "We could not update your class settings. Please try again.",
        [{ text: "OK" }]
      );
    }
  }

  // Navigates back to the classes page.
  function handleCancel() {
    navigation.navigate("Classes");
  }

  // Gets the session information.
  async function fetchSessions() {
    try {
      const response = await fetch(
        `http://localhost:8081/classes/${classId}/session`
      );
      const data = await response.json();
      const updatedSessions = await Promise.all(
        data.map(async (session) => {
          const averageEngagement = await getAverageForSession(session.id);
          return {
            ...session,
            averageEngagement,
          };
        })
      );
      setSessions(updatedSessions);
    } catch (error) {
      Alert.alert(
        "Unable to retrieve session information",
        "We could not find the sessions for your class. Please try again.",
        [{ text: "OK" }]
      );
    }
  }

  // Gets the average engagement level for a particular session.
  async function getAverageForSession(sessionId) {
    try {
      const response = await fetch(
        `http://localhost:8081/sessions/${sessionId}/average-engagement-level`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      Alert.alert(
        "Unable to retrieve session averages",
        "We could not find the average engagement level for your class session. Please try again.",
        [{ text: "OK" }]
      );
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo2.png")} />
      <Text style={styles.title}>{title} Settings</Text>
      <Text style={styles.classId}>CLASS ID: {classId}</Text>
      <View style={styles.fieldContainer}>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Cooldown Time</Text>
          <TextInput
            style={styles.fieldInput}
            onChangeText={setCooldownTime}
            value={cooldownTime.toString()}
            keyboardType="numeric"
          />
          <Text style={styles.fieldUnit}>min</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Passive Check-in</Text>
          <Switch
            style={styles.fieldSwitch}
            trackColor={{ true: colors.goodGreen }}
            value={isPassiveCheckIn}
            onValueChange={setIsPassiveCheckIn}
          />
        </View>
        <TouchableOpacity
          style={styles.viewSessionsButton}
          onPress={() => {
            fetchSessions();
            setModalVisible(true);
          }}
        >
          <Text style={styles.buttonText}>View Session History</Text>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <TouchableOpacity
            style={styles.centeredView}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Session History</Text>
              <ScrollView style={styles.scrollView}>
                {sessions.map((ses) => (
                  <SessionInfo
                    key={ses.id}
                    date={ses.date}
                    avgEngagement={ses.averageEngagement.averageEngagementLevel}
                  />
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryBlue,
  },
  image: {
    height: 61,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 20,
    textAlign: "center",
    marginTop: 20,
  },
  classId: {
    fontSize: 14,
    textAlign: "center",
  },
  fieldContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  fieldLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
  fieldInput: {
    backgroundColor: colors.white,
    borderColor: colors.gray,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: "right",
    fontSize: 16,
    marginLeft: 10,
    width: 60,
    color: colors.black,
  },
  fieldUnit: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    color: colors.black,
  },
  fieldSwitch: {
    marginLeft: "auto",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 150,
  },
  cancelButton: {
    backgroundColor: colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: colors.primaryBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  viewSessionsButton: {
    backgroundColor: colors.primaryBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
    width: "100%",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  scrollView: {
    maxHeight: 400,
    marginTop: 20,
  },

  sessionInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },

  sessionInfoLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },

  sessionInfoValue: {
    fontSize: 16,
    color: colors.black,
  },
});

export default ClassSettings;
