import { Router } from "express";
import { createContact } from "../controllers/contact.controllers";

const router = Router();

router.use("/", createContact);

export default router;
