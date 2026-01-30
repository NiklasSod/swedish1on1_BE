import express from "express";
import cors from "cors";
import authRoute from "./routes/auth";
import mongoose from "mongoose";
import "dotenv/config";

// const API_URL = process.env.API_URL // TODO use later if needed
const app = express();
const mongoURI = process.env.MONGODB_URI ?? "";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

app.use(
  cors({
    origin: "*", // allow all for now TODO check if change later
  })
);
app.use(express.json());
app.use("/auth", authRoute);

app.get("/health", (_, res) => {
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
});

// TODO change localhost to computer local IP (192.168.x.x) or something like ngrok
