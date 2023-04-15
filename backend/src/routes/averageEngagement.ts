import { Request, Response } from "express";
import { getAverageEngagementLevel } from "../functions/averageEngagement";

/**
 * Handles functionality for getting the average engagement level from a session.
 *
 * @param req request to server
 * @param res response from server
 */
export const getAverageEngagementLevelRouteHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const sessionId = parseInt(req.params.sessionId);
    const averageEngagementLevel = await getAverageEngagementLevel(sessionId);
    res.json({ averageEngagementLevel: averageEngagementLevel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
