import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/Prompt.module.css";
import Likert from "../components/Likert";
import { io } from "socket.io-client";
import UserContext from "../userContext";
import { useLocation } from "react-router-dom";

function Prompt() {
  const [score, setScore] = useState();
  const [isPrompting, setIsPrompting] = useState(false);
  const [socket, setSocket] = useState();
  const { userId } = useContext(UserContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classCode = searchParams.get("classCode");

  useEffect(() => {
    if (socket) {
      socket.on("pushNotification", () => {
        setIsPrompting(true);
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    const currSocket = io("http://localhost:8081");
    console.log("STudent" + " " + userId);

    currSocket.on("connect", () => {
      console.log("Connected to the server");
      setSocket(currSocket);
      currSocket.emit("joinRoom", {
        roomCode: classCode,
        studentId: userId,
      });
    });

    currSocket.on("connect_error", () => {
      alert("Unable to join room. Please check the room code and try again.");
      currSocket.disconnect();
    });

    currSocket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });
  }, []);

  async function handleSubmission() {
    try {
      const response = await fetch(
        `http://localhost:8081/students/${userId}/sessions/${classCode}/engagement`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            engagementLevel: score,
          }),
        }
      );

      if (response.ok) {
        setIsPrompting(false);
        setScore();
      } else {
        throw new Error("Failed to submit engagement score.");
      }
    } catch (error) {
      alert(
        "An error occurred while submitting your engagement score. Please try again."
      );
    }
  }

  const likertOptions = {
    question: "How was this part of the lecture?",
    responses: [
      { value: 0, text: "0%", emoji: "😭", color: "--ridRed" },
      { value: 25, text: "25%", emoji: "🤨", color: "--ridRed" },
      { value: 50, text: "50%", emoji: "😐", color: "--okYellow" },
      { value: 75, text: "75%", emoji: "🙂", color: "--goodGreen" },
      { value: 100, text: "100%", emoji: "😁", color: "--goodGreen" },
    ],
    onChange: (val) => {
      setScore(val);
    },
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {isPrompting ? (
          <Likert
            {...likertOptions}
            onEngagementSubmission={handleSubmission}
          />
        ) : (
          <div>
            <span>
              Waiting for your professor to request engagement information...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Prompt;
