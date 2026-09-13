import { Router } from "express";
import { createNewsletter } from "../controllers/newsletter.controller";

const router = Router();

router.post("/", createNewsletter);

export default router;
