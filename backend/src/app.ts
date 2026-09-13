import express from "express";
import cors from "cors";
import experimentRoutes from "./routes/experiment.routes";
import newsletterRoutes from "./routes/newsletter.routes";
import contactRoutes from "./routes/contact.routes";
import healthRoutes from "./routes/health.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/experiments", experimentRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);

export default app;
