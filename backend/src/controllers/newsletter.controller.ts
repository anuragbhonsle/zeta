import { Request, Response } from "express";
import Newsletter from "../models/Newsletter";

export const createNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    await Newsletter.create({ email });
    return res.status(201).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to send email",
    });
  }
};
