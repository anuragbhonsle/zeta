import { Request, Response } from "express";
import Contact from "../models/Contact";

export const createContact = async (req: Request, res: Response) => {
  try {
    const { email, phone, name, message } = req.body;

    if (!email || !phone || !name || !message) {
      return res.status(400).json({
        message: "Email, phone, name, and message are required",
      });
    }

    await Contact.create({ email, phone, name, message });
    return res.status(201).json({
      message: "Contact information sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to send contact information",
    });
  }
};
