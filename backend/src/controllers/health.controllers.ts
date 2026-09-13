import { Request, Response } from "express";

export const healthCheck = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const healthData = {
      status: "UP",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
    };

    res.status(200).json(healthData);
  } catch (error) {
    const errorDetails =
      error instanceof Error ? error.message : "Unknown error";

    res.status(503).json({
      status: "DOWN",
      timestamp: new Date().toISOString(),
      error: errorDetails,
    });
  }
};
