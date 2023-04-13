import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
} from "react-native";
import colors from "../styles/colors";

function ClassSettings() {
  const [cooldownTime, setCooldownTime] = useState(0);
  const [isActiveCheckIn, setIsActiveCheckIn] = useState(false);
  const [isPassiveCheckIn, setIsPassiveCheckIn] = useState(false);

  function handleSave() {}

  function handleCancel() {}

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo2.png")} />
      <Text style={styles.title}>Settings</Text>
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
          <Text style={styles.fieldLabel}>Active Check-in</Text>
          <Switch
            style={styles.fieldSwitch}
            trackColor={{ true: colors.primaryBlue }}
            value={isActiveCheckIn}
            onValueChange={setIsActiveCheckIn}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Passive Check-in</Text>
          <Switch
            style={styles.fieldSwitch}
            trackColor={{ true: colors.primaryBlue }}
            value={isPassiveCheckIn}
            onValueChange={setIsPassiveCheckIn}
          />
        </View>
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
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    marginHorizontal: 20,
    textAlign: "center",
    marginTop: 20,
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
  },
});

export default ClassSettings;
