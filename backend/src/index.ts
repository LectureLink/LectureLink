import express from "express";
import cors from "cors";
const port = 8080;
const app = express();

// Functions
import {
  createProfessor,
  createStudent,
  isStudentInSessionClass,
  verifyLogin,
} from "./functions/auth";

import { updateSettings } from "./functions/updateSettings";
import { getComprehensionLevel } from "./functions/comprehensionScore";

// Using cors with access to client at PORT 3000
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

/**
 * /////////////////////////////////////////////////////////////////////
 *
 * Authorization Routes
 *
 * //////////////////////////////////////////////////////////////////////
 */

// Creating a new professor account
app.post("/professors", async (req, res) => {
  try {
    const { email, password } = req.body;
    const professor = await createProfessor(email, password);
    res.status(201).json(professor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create professor account." });
  }
});

// Creating a new student account
app.post("/student", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await createStudent(email, password);
    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create student account." });
  }
});

// Verify if a user can log in.
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await verifyLogin(email, password);
    if (!user) {
      res.status(401).json({ message: "Invalid password or email." });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to login." });
  }
});

// Verify if a student can join a session.
app.get("/students/:studentId/sessions/:sessionId", async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const sessionId = parseInt(req.params.sessionId);
    const isStudentInClass = await isStudentInSessionClass(
      studentId,
      sessionId
    );
    res.status(200).json({ permitted: isStudentInClass });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Unable to verify if student can join session." });
  }
});

/**
 * /////////////////////////////////////////////////////////////////////
 *
 * Other Routes
 *
 * //////////////////////////////////////////////////////////////////////
 */

// This route queries for a comprehension level in a given timespan for
// a given class size.
app.get("/comprehension-level", async (req, res) => {
  try {
    const { timespan, sessionId, classSize } = req.query;

    if (!timespan || !classSize || !sessionId) {
      throw new Error(
        "Missing timespan (number), classSize (number), and/or sessionId (number)."
      );
    }

    const compLevel = await getComprehensionLevel(
      Number(timespan),
      Number(sessionId),
      Number(classSize)
    );

    if (compLevel === -1) {
      throw new Error("Inadequate number of responses for reliable analysis.");
    } else {
      res.status(200).json({ comprehensionLevel: compLevel });
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Updates the settings of a class
app.put("/classes/:classId/settings", async (req, res) => {
  try {
    const classId = parseInt(req.params.classId);
    const { cooldownMinutes, passiveCheckIn } = req.body;
    const updatedClass = await updateSettings(
      classId,
      cooldownMinutes,
      passiveCheckIn
    );
    res.json(updatedClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update settings." });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// Listening on PORT 8080
app.listen(port, () => console.log(`Server started on port ${port}`));
