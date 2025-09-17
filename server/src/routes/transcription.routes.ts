import { Router } from "express";
import { createTranscription, getTranscriptions } from "../controllers/transcription.controller";

const router = Router();

router.post("/", createTranscription);
router.get("/", getTranscriptions);

export default router;