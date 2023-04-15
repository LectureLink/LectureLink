import { Request, Response } from "express";
import { getComprehensionLevel } from "../functions/comprehensionScore";

/**
 * Handles the functionality for getting the comprehension level from a session.
 *
 * @param req request to server
 * @param res response from server
 */
export const getComprehensionLevelRouteHandler = async (
  req: Request,
  res: Response
) => {
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
};
