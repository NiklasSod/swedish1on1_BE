import express from "express";
import cors from "cors";
import authRoute from "./routes/auth";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const mongoURI = process.env.MONGODB_URI ?? "";

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

const startServer = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully!");

    app.listen(3000, () => {
      console.log("API running on http://localhost:3000");
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
};

startServer();
