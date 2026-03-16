import mongoose from "mongoose";
import { USER_ROLES } from "./types";

const UserSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 5,
      maxlength: 255,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    username: { 
      type: String, 
      required: true, 
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    passwordHash: { 
      type: String, 
      required: true
    },
    role: { 
      type: String, 
      enum: USER_ROLES, 
      required: true 
    },
    verified: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);