import React, { useEffect, useState, useContext } from "react";
import Class from "../components/Class";
import UserContext from "../userContext";
import logo from "../assets/logo2.png";
import styles from "../styles/StudentClasses.module.css";
import { useNavigate } from "react-router-dom";

function StudentClasses() {
  const [classes, setClasses] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [classId, setClassId] = useState();

  const { userId, setUserId } = useContext(UserContext);
  const navigate = useNavigate();

  // Checks if a user is actually logged in when component first renders.
  // If not, the user is directed to the login page.
  useEffect(() => {
    if (!userId) {
      navigate("/");
    }
  }, [userId]);

  // Fetches data regarding the classes that the user is enrolled in.
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
        "Sorry, we were unable to retrieve your classes. You may not be logged in. Please log in and try again."
      );
    }
  }

  // User effect that fetches the student's class data when page renders.
  useEffect(() => {
    fetchData();
  }, []);

  // Adds a class to the list of classes that student is enrolled in if the
  // class with the given class Id exists.
  async function addClass() {
    try {
      console.log(userId);
      console.log(classId);
      const response = await fetch(
        `http://localhost:8081/students/${userId}/classes/${classId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
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
  }

  // Closes the modal.
  function closeModal() {
    setModalVisible(false);
  }

  // Sends the user back to the login page after signout.
  // UserContext is cleared.
  function handleSignout() {
    setUserId(null);
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" className={styles.logo} />
      <h1 className={styles.header}>Manage Classes</h1>
      <div className={styles.classesContainer}>
        {classes &&
          classes.map((c) => <Class key={c.id} title={c.name} id={c.id} />)}
        <button
          className={styles.addButton}
          onClick={() => setModalVisible(true)}
        >
          Add class +
        </button>
      </div>
      <button className={styles.signout} onClick={handleSignout}>
        Sign out
      </button>

      {modalVisible && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <img src={logo} alt="" className={styles.logo} />
            <h2>Add Class</h2>
            <label htmlFor="newClassName">Enter Class Id:</label>
            <input
              type="text"
              id="newClassName"
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className={styles.modalInput}
            />
            <div>
              <button className={styles.modalButton} onClick={closeModal}>
                Cancel
              </button>
              <button className={styles.modalButton} onClick={addClass}>
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
