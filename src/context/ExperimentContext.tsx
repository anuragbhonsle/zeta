import { createContext, useContext, useState, type ReactNode } from "react";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

type Experiment = {
  instrument: string | null;
  timeframe: string | null;
  entryCondition: string | null;
  exitCondition: string | null;
  holdingPeriod: string | null;
  filters: string[];
  objective: string;
  missingInformation: string[];
  status: "complete" | "needs_clarification";
};

type ExperimentContextType = {
  prompt: string;
  experiment: Experiment | null;
  clarifications: Record<string, string>;
  isBuilding: boolean;

  setPrompt: (prompt: string) => void;

  submitPrompt: () => Promise<void>;

  setClarification: (question: string, answer: string) => void;

  buildExperiment: () => Promise<void>;
};

const ExperimentContext = createContext<ExperimentContextType | undefined>(
  undefined,
);

export function ExperimentProvider({ children }: { children: ReactNode }) {
  const [prompt, setPrompt] = useState("");
  const [experiment, setExperiment] = useState<Experiment | null>(null);

  const [clarifications, setClarifications] = useState<Record<string, string>>(
    {},
  );

  const [isBuilding, setIsBuilding] = useState(false);

  const submitPrompt = async () => {
    if (!prompt.trim()) return;

    try {
      setIsBuilding(true);

      const response = await axios.post(`${VITE_API_URL}/api/experiments`, {
        prompt,
      });

      setExperiment(response.data.data);

      setClarifications({});
    } catch (error) {
      console.error("Failed to create experiment:", error);
    } finally {
      setIsBuilding(false);
    }
  };

  const setClarification = (question: string, answer: string) => {
    setClarifications((prev) => ({
      ...prev,
      [question]: answer,
    }));
  };

  const buildExperiment = async () => {
    if (!prompt.trim()) return;

    try {
      setIsBuilding(true);

      const response = await axios.post(`${VITE_API_URL}/api/experiments`, {
        prompt,
        clarifications,
      });

      setExperiment(response.data.data);
    } catch (error) {
      console.error("Failed to build experiment:", error);
    } finally {
      setIsBuilding(false);
    }
  };

  return (
    <ExperimentContext.Provider
      value={{
        prompt,
        experiment,
        clarifications,
        isBuilding,
        setPrompt,
        submitPrompt,
        setClarification,
        buildExperiment,
      }}
    >
      {children}
    </ExperimentContext.Provider>
  );
}

export function useExperiment() {
  const context = useContext(ExperimentContext);

  if (!context) {
    throw new Error("useExperiment must be used inside ExperimentProvider");
  }

  return context;
}
