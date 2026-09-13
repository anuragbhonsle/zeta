import { Router } from "express";
import { createExperiment } from "../controllers/experiment.controller";

const router = Router();

router.post("/", createExperiment);

export default router;
