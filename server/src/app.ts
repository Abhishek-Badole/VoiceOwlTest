import express from "express";
import cors from "cors";
import transcriptionRoutes from "./routes/transcription.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/transcriptions", transcriptionRoutes);

export default app;