import { Request, Response } from "express";
import {
  createProfessor,
  createStudent,
  isStudentInSessionClass,
  verifyLogin,
} from "../functions/auth";

/**
 * Handles the functionality for creating a professor user.
 *
 * @param req request to server
 * @param res response from server
 */
export const createProfessorRouteHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const professor = await createProfessor(email, password);
    res.status(201).json(professor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create professor account." });
  }
};

/**
 * Handles the functionality for creating a student user.
 *
 * @param req request to server
 * @param res response from server
 */
export const createStudentRouteHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const student = await createStudent(email, password);
    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create student account." });
  }
};

/**
 * Handles the functionality for verifying if a user can login.
 *
 * @param req request to server
 * @param res response from server
 */
export const verifyLoginRouteHandler = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const user = await verifyLogin(email, password, role);
    if (!user) {
      res.status(401).json({ message: "Invalid password, email, or role." });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to login." });
  }
};

/**
 * Handles the functionality for verifying if a student is allowed to join a session.
 *
 * @param req request to server
 * @param res response from server
 */
export const isStudentInSessionClassRouteHandler = async (
  req: Request,
  res: Response
) => {
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
};
