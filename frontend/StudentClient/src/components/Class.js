import React, { useState } from "react";
import logo from "../assets/logo2.png";
import styles from "../styles/Class.module.css";
import { useLocation, useNavigate } from "react-router-dom";

const Class = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [classCode, setClassCode] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  function handleOpen() {
    setModalVisible(true);
  }

  function handleCancel() {
    setModalVisible(false);
  }

  function handleSave() {
    const searchParams = new URLSearchParams(location.search);

    if (classCode) {
      searchParams.set("classCode", classCode);
      navigate("/prompt?" + searchParams.toString());
    } else {
      alert("Please enter a room code.");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>{props.title}</div>
      <button className={styles.openButton} onClick={handleOpen}>
        Open
      </button>

      {modalVisible && (
        <div className={styles.modalOverlay} onClick={handleCancel}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <img src={logo} alt="Logo" className={styles.modalLogo} />
            <h3>Room Code</h3>
            <input
              type="text"
              placeholder="Enter Room Code"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
            />
            <div className={styles.modalButtonContainer}>
              <button className={styles.modalCancel} onClick={handleCancel}>
                Cancel
              </button>
              <button className={styles.modalSave} onClick={handleSave}>
                Enter Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Class;
