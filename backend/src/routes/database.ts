import { Request, Response } from "express";
import {
  addClass,
  addEngagementData,
  addSession,
  addStudentToClass,
  getClassById,
  getClassesTaughtByProfessor,
} from "../functions/database";

/**
 * Handles functionality for adding a class.
 *
 * @param req request to server
 * @param res response from server
 */
export const addClassRouteHandler = async (req: Request, res: Response) => {
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
};

/**
 * Handles functionality for adding a student to a class.
 *
 * @param req request to server
 * @param res response from server
 */
export const addStudentToClassRouteHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const classId = parseInt(req.params.classId);
    const studentWithClass = await addStudentToClass(studentId, classId);
    res.status(201).json(studentWithClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to add student to class." });
  }
};

/**
 * Handles functionality for adding engagement data.
 *
 * @param req request to server
 * @param res response from server
 */
export const addEngagementDataRouteHandler = async (
  req: Request,
  res: Response
) => {
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
};

/**
 * Handles functionality for adding a session.
 *
 * @param req request to server
 * @param res response from server
 */
export const addSessionRouteHandler = async (req: Request, res: Response) => {
  try {
    const classId = parseInt(req.params.classId);
    const newSession = await addSession(classId);
    res.status(201).json(newSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to add session." });
  }
};

/**
 * Handles functionality for getting classes that a professor teaches.
 *
 * @param req request to server
 * @param res response from server
 */
export const getClassesTaughtByProfessorRouteHandler = async (
  req: Request,
  res: Response
) => {
  const { professorId } = req.params;
  try {
    const classes = await getClassesTaughtByProfessor(Number(professorId));
    res.status(200).json({ classes });
  } catch (err) {
    res.status(500).json({ message: "Unable to retrieve classes." });
  }
};

/**
 * Handles functionality for getting a class of a given class id.
 *
 * @param req request to server
 * @param res response from server
 */
export const getClassRouteHandler = async (req: Request, res: Response) => {
  const { classId } = req.params;
  try {
    const classObj = await getClassById(Number(classId));
    res.status(200).json({ classObj });
  } catch (err) {
    res.status(500).json({ message: "Unable to retrieve class." });
  }
};
