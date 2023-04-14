import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Image,
} from "react-native";
import colors from "../styles/colors";
import { useNavigation } from "@react-navigation/native";

const Class = (props) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  function handleOpen() {
    setModalVisible(true);
  }

  function handleCancel() {
    setModalVisible(false);
  }

  function handleSave() {
    setModalVisible(false);
    navigation.navigate("Prompt");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TouchableOpacity style={styles.openButton} onPress={handleOpen}>
        <Text style={styles.openButtonText}>Open</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Image source={require("../assets/logo2.png")} style={styles.logo} />
          <Text style={styles.modalText}>Class Code</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Class Code"
            placeholderTextColor={colors.gray}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  openButton: {
    backgroundColor: colors.primaryBlue,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  openButtonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    backgroundColor: colors.secondaryBlue,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 61,
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 40,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.black,
    marginTop: 30,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  textInput: {
    backgroundColor: colors.white,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: colors.gray,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: colors.primaryBlue,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Class;
