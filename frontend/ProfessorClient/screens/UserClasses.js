import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Button,
} from "react-native";
import Class from "../components/Class";
import colors from "../styles/colors";
import UserContext from "../userContext";

function UserClasses() {
  const [classes, setClasses] = useState(null);
  const [newClassName, setNewClassName] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const { userId } = useContext(UserContext);

  async function fetchData() {
    try {
      const response = await fetch(
        `http://localhost:8081/professors/${userId}/classes`
      );
      const data = await response.json();
      if (response.ok) {
        setClasses(data.classes);
      } else {
        throw new Error("Unable to retrieve classes.");
      }
    } catch (error) {
      Alert.alert(
        "Unable to retrieve classes",
        "Sorry, we were unable to retrieve your classes.",
        [{ text: "OK" }]
      );
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addClass = async () => {
    try {
      const response = await fetch("http://localhost:8081/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newClassName,
          professorUserId: userId,
        }),
      });
      if (response.ok) {
        setModalVisible(false);
        fetchData();
      } else {
        throw new Error("Add class failed.");
      }
    } catch (error) {
      Alert.alert(
        "Add Class Failed",
        `We were not able to add ${newClassName}.`,
        [{ text: "OK" }]
      );
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo2.png")} />
      <Text style={styles.title}>Manage Classes</Text>
      <ScrollView style={styles.scrollView}>
        {classes &&
          classes.map((c) => <Class key={c.id} title={c.name} id={c.id} />)}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.addClassText}>Add class +</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              style={styles.modalImage}
              source={require("../assets/logo2.png")}
            />
            <Text style={styles.modalTitle}>Add Class</Text>
            <Text style={styles.modalInputLabel}>Enter Class Name:</Text>
            <TextInput
              style={styles.modalInput}
              onChangeText={setNewClassName}
              value={newClassName}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={closeModal} />
              <Button title="Add" onPress={addClass} />
            </View>
          </View>
        </View>
      </Modal>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addClassText: {
    color: colors.primaryBlue,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalImage: {
    height: 61,
    resizeMode: "cover",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalInputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
    alignSelf: "stretch",
  },
  modalInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    alignSelf: "stretch",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default UserClasses;
