import express from "express";
import cors from "cors";
const PORT = 8081;
const app = express();

// Function imports
import {
  createProfessor,
  createStudent,
  isStudentInSessionClass,
  verifyLogin,
} from "./functions/auth";
import { updateSettings } from "./functions/updateSettings";
import { getComprehensionLevel } from "./functions/comprehensionScore";
import {
  addClass,
  addEngagementData,
  addSession,
  addStudentToClass,
} from "./functions/database";
import { getAverageEngagementLevel } from "./functions/averageEngagement";

// Using cors with access to client at PORT 3000
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

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
 * General-Purpose Database Posting Routes
 *
 * //////////////////////////////////////////////////////////////////////
 */

// Adds a new class
app.post("/classes", async (req, res) => {
  console.log("HI");
  try {
    const { name, professorUserId } = req.body;
    const profId = parseInt(professorUserId);
    const newClass = await addClass(name, profId);
    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to add class." });
  }
});

// Add a student to a class.
app.post("/students/:studentId/classes/:classId", async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const classId = parseInt(req.params.classId);
    const studentWithClass = await addStudentToClass(studentId, classId);
    res.status(201).json(studentWithClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to add student to class." });
  }
});

app.post(
  "/students/:studentId/sessions/:sessionId/engagement",
  async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId);
      const sessionId = parseInt(req.params.sessionId);
      const engagementLevel = parseInt(req.body.engagementLevel);
      const newEngagementData = await addEngagementData(
        engagementLevel,
        studentId,
        sessionId
      );
      res.status(201).json(newEngagementData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Unable to add engagement data." });
    }
  }
);

app.post("/classes/:classId/sessions", async (req, res) => {
  try {
    const classId = parseInt(req.params.classId);
    const newSession = await addSession(classId);
    res.status(201).json(newSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to add session." });
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
    const { timespan, sessionId, classSize } = req.body;

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
      Number(cooldownMinutes),
      Boolean(passiveCheckIn)
    );
    res.status(200).json(updatedClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update settings." });
  }
});

app.get("/sessions/:sessionId/average-engagement-level", async (req, res) => {
  try {
    const sessionId = parseInt(req.params.sessionId);
    const averageEngagementLevel = await getAverageEngagementLevel(sessionId);
    res.json({ averageEngagementLevel: averageEngagementLevel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * /////////////////////////////////////////////////////////////////////
 *
 * Running server on port...
 *
 * //////////////////////////////////////////////////////////////////////
 */

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
