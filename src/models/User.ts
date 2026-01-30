import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["student", "teacher"], required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);

// TODO do I add min length values here? Frontend has it but backend should validate too (exact same)