import mongoose, { Schema, Document } from "mongoose";

export interface ITranscription extends Document {
  audioUrl: string;
  transcription: string;
  createdAt: Date;
}

const TranscriptionSchema: Schema = new Schema({
  audioUrl: { type: String, required: true },
  transcription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const TranscriptionModel = mongoose.model<ITranscription>(
  "Transcription",
  TranscriptionSchema
);