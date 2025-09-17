import { Request, Response } from "express";
import { TranscriptionModel } from "../models/transcription.model";

/**
 * Create a new transcription
 * Input: audioUrl (string) in request body
 * Output: { id, message } with MongoDB ID and success message
 */
export const createTranscription = async (req: Request, res: Response) => {
  try {
    const { audioUrl } = req.body;
    if (!audioUrl) {
      return res.status(400).json({ error: "audioUrl is required" });
    }

    // Mock transcription text
    const transcription = "transcribed text";

    // Save to MongoDB
    const doc = await TranscriptionModel.create({
      audioUrl,
      transcription
    });

    return res.status(201).json({
      id: doc._id,
      message: "Transcription stored successfully"
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Get all transcriptions
 * Input: none
 * Output: list of transcriptions [{ _id, audioUrl, transcription, createdAt }]
 */
export const getTranscriptions = async (_req: Request, res: Response) => {
  try {
    const docs = await TranscriptionModel.find().sort({ createdAt: -1 });
    return res.json(docs);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
