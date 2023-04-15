import { Request, Response } from "express";
import { updateSettings } from "../functions/updateSettings";

/**
 * Handles functionality for updating class settings.
 *
 * @param req request to server
 * @param res response from server
 */
export const updateClassSettingsRouteHandler = async (
  req: Request,
  res: Response
) => {
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
};
