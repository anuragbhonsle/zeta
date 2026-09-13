import mongoose, { Schema } from "mongoose";

interface ExperimentT {
  prompt: string;
  gemini_experement: string;
  createdAt: Date;
}

const experimentSchema = new Schema<ExperimentT>(
  {
    prompt: {
      type: String,
      required: true,
    },

    gemini_experement: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Experiment =
  mongoose.models.Experiment ||
  mongoose.model<ExperimentT>("Experiment", experimentSchema);

export default Experiment;
