import React, { useState } from "react";
import colors from "../styles/colors";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/Class.css";

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
    <div className={styles.container}>
      <div className={styles.title}>{props.title}</div>
      <button className={styles.openButton} onClick={handleOpen}>
        Open
      </button>

      {modalVisible && (
        <div className={styles.modal}>
          <img
            className={styles.logo}
            src={require("../assets/logo2.png")}
            alt="Logo"
          />
          <div className={styles.modalText}>Class Code</div>
          <input
            className={styles.textInput}
            type="text"
            placeholder="Enter Class Code"
            placeholderTextColor={colors.gray}
          />
          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
            <button className={styles.saveButton} onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Class;
