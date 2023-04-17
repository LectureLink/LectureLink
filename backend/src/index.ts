import express from "express";
import cors from "cors";
const PORT = 8081;
const app = express();

// Route-handling imports
import {
  createProfessorRouteHandler,
  createStudentRouteHandler,
  isStudentInSessionClassRouteHandler,
  verifyLoginRouteHandler,
} from "./routes/auth";
import {
  addClassRouteHandler,
  addEngagementDataRouteHandler,
  addSessionRouteHandler,
  addStudentToClassRouteHandler,
  getClassRouteHandler,
  getClassesByStudentIdRouteHandler,
  getClassesTaughtByProfessorRouteHandler,
} from "./routes/database";
import { getComprehensionLevelRouteHandler } from "./routes/comprehensionScore";
import { updateClassSettingsRouteHandler } from "./routes/updateSettings";
import { getAverageEngagementLevelRouteHandler } from "./routes/averageEngagement";

// Using cors with access to client at PORT 3000
app.use(
  cors({
    origin: ["http://localhost:3001", "exp://10.110.14.70:19000"],
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
app.post("/professors", createProfessorRouteHandler);

// Creating a new student account
app.post("/student", createStudentRouteHandler);

// Verify if a user can log in.
app.post("/login", verifyLoginRouteHandler);

// Verify if a student can join a session.
app.get(
  "/students/:studentId/sessions/:sessionId",
  isStudentInSessionClassRouteHandler
);

/**
 * /////////////////////////////////////////////////////////////////////
 *
 * General-Purpose Database Posting Routes
 *
 * //////////////////////////////////////////////////////////////////////
 */

// Adds a new class
app.post("/classes", addClassRouteHandler);

// Add a student to a class.
app.post(
  "/students/:studentId/classes/:classId",
  addStudentToClassRouteHandler
);

// Adds engagement data to a session
app.post(
  "/students/:studentId/sessions/:sessionId/engagement",
  addEngagementDataRouteHandler
);

// Adds a session
app.post("/classes/:classId/sessions", addSessionRouteHandler);

// Gets classes that a professor teaches
app.get(
  "/professors/:professorId/classes",
  getClassesTaughtByProfessorRouteHandler
);

// Gets a class of a given class id.
app.get("/classes/:classId", getClassRouteHandler);

// Gets classes that a student is enrolled in
app.get("/student/:studentId/classes", getClassesByStudentIdRouteHandler);

/**
 * /////////////////////////////////////////////////////////////////////
 *
 * Other Routes
 *
 * //////////////////////////////////////////////////////////////////////
 */

// This route queries for a comprehension level in a given timespan for
// a given class size.
app.get(
  "/sessions/:sessionId/classSize/:classSize/timespan/:timespan",
  getComprehensionLevelRouteHandler
);

// Updates the settings of a class
app.put("/classes/:classId/settings", updateClassSettingsRouteHandler);

// Gets the overall engagement average from a session.
app.get(
  "/sessions/:sessionId/average-engagement-level",
  getAverageEngagementLevelRouteHandler
);

/**
 * /////////////////////////////////////////////////////////////////////
 *
 * Running server on port...
 *
 * //////////////////////////////////////////////////////////////////////
 */

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
