import React, { useEffect, useState, useContext } from "react";
import Class from "../components/Class";
import UserContext from "../userContext";
import "../styles/StudentClasses.css";
import logo from "../assets/logo2.png";

function StudentClasses() {
  const [classes, setClasses] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [classId, setClassId] = useState();

  const { userId } = useContext(UserContext);

  async function fetchData() {
    try {
      const response = await fetch(
        `http://localhost:8081/student/${userId}/classes`
      );
      const data = await response.json();
      if (response.ok) {
        setClasses(data);
      } else {
        throw new Error("Unable to retrieve classes.");
      }
    } catch (error) {
      alert(
        "Unable to retrieve classes. Sorry, we were unable to retrieve your classes."
      );
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addClass = async () => {
    try {
      const response = await fetch(`/students/${userId}/classes/${classId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setModalVisible(false);
        fetchData();
      } else {
        throw new Error("Add class failed.");
      }
    } catch (error) {
      alert(
        `Add Class Failed. We were not able to add the class of id ${classId}.`
      );
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="container">
      <img className="image" src={logo} alt="" />
      <h1 className="title">Manage Classes</h1>
      <div className="scrollView">
        {classes &&
          classes.map((c) => <Class key={c.id} title={c.name} id={c.id} />)}
        <button className="addClassText" onClick={() => setModalVisible(true)}>
          Add class +
        </button>
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="modalContent">
            <img className="modalImage" src={logo} alt="" />
            <h2 className="modalTitle">Add Class</h2>
            <label htmlFor="newClassName" className="modalInputLabel">
              Enter Class Id:
            </label>
            <input
              type="text"
              id="newClassName"
              className="modalInput"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
            />
            <div className="modalButtons">
              <button className="cancelButton" onClick={closeModal}>
                Cancel
              </button>
              <button className="addButton" onClick={addClass}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentClasses;
