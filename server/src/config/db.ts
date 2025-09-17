import mongoose from "mongoose";

export const connectDB = async (mongoUri: string) => {
  try {
    await mongoose.connect(mongoUri, { dbName: "transcriptionsDb" });
    console.log("✅ MongoDB connected to transcriptionsDb");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
};
