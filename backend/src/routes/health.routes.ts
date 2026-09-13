import { Router } from "express";
import { healthCheck } from "../controllers/health.controllers";

const router = Router();
router.use("/", healthCheck);
export default router;
