import React, { useState } from "react";
// import "../styles/Class.css";
import logo from "../assets/logo2.png";
import { useNavigate } from "react-router-dom";

const Class = (props) => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  function handleOpen() {
    setModalVisible(true);
  }

  function handleCancel() {
    setModalVisible(false);
  }

  function handleSave() {
    setModalVisible(false);
    navigate("/prompt");
  }

  return (
    <div className="container">
      <div className="title">{props.title}</div>
      <button className="openButton" onClick={handleOpen}>
        Open
      </button>

      {modalVisible && (
        <div className="modal">
          <img className="logo" src={logo} alt="Logo" />
          <div className="modalText">Class Code</div>
          <input
            className="textInput"
            type="text"
            placeholder="Enter Class Code"
          />
          <div className="buttonContainer">
            <button className="cancelButton" onClick={handleCancel}>
              Cancel
            </button>
            <button className="saveButton" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Class;
