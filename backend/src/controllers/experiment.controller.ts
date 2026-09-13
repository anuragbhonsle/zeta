import { Request, Response } from "express";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import Experiment from "../models/Experement";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

const SYSTEM_PROMPT = `
You are the query-structuring engine inside a quantitative trading research tool.

Your job is to convert a trader's natural-language question into a structured, testable experiment.

Do NOT answer the trading question.
Do NOT provide market analysis.
Do NOT give trading advice.

Extract the following information:
- instrument
- timeframe
- entry condition
- exit condition
- holding period
- variables or filters
- what the user is trying to find out
- missing important information

IMPORTANT RULES FOR CLARIFICATION:
1. Only ask for information that is essential to make the experiment testable and meaningful.
2. Keep clarification questions minimal (1-2 max).
3. Do NOT ask about every unspecified parameter.
4. Do NOT invent details that the trader did not mention.
5. Combine related missing details into one clear clarification question.
6. Optional parameters like stop-loss or slippage should NOT be requested unless explicitly relevant.
7. If a reasonable interpretation can be made, use it instead of asking.
8. If the trader provided clarifications, prioritize them over assumptions.
9. Do not ask for information already provided.
`;

// Enforce strict output schema via GoogleGenAI Type definitions
const experimentSchema = {
  type: Type.OBJECT,
  properties: {
    instrument: { type: Type.STRING, nullable: true },
    timeframe: { type: Type.STRING, nullable: true },
    entryCondition: { type: Type.STRING, nullable: true },
    exitCondition: { type: Type.STRING, nullable: true },
    holdingPeriod: { type: Type.STRING, nullable: true },
    filters: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    objective: { type: Type.STRING },
    missingInformation: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    status: {
      type: Type.STRING,
      enum: ["complete", "needs_clarification"],
    },
  },
  required: ["filters", "objective", "missingInformation", "status"],
};

export const createExperiment = async (req: Request, res: Response) => {
  try {
    const { prompt, clarifications } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const clarificationText =
      clarifications && Object.keys(clarifications).length > 0
        ? `\nThe trader has provided the following clarifications:\n${Object.entries(
            clarifications,
          )
            .map(([question, answer]) => `- ${question}: ${answer}`)
            .join("\n")}`
        : "";

    const userContent = `Trader's original question:\n${prompt}\n${clarificationText}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: userContent,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: experimentSchema,
      },
    });

    const responseText = response.text;

    if (!responseText) {
      throw new Error("Empty response from AI model");
    }

    const cleanedText = responseText.replace(/```json|```/g, "").trim();
    const experiment = JSON.parse(cleanedText);

    if (experiment.status === "complete") {
      await Experiment.create({
        prompt,
        gemini_experement: JSON.stringify(experiment),
      });
    }

    return res.status(200).json({
      message: "Experiment created",
      data: experiment,
    });
  } catch (error) {
    console.error("Error creating experiment:", error);

    return res.status(500).json({
      message: "Failed to generate experiment",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
