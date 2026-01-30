// src/routes/auth.ts
import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";

const router = Router();

router.post("/register", async (req, res) => {
  const { email, username, password, role } = req.body;

  if (!email || !username || !password || !role) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      email,
      username,
      passwordHash,
      role,
    });

    res.status(201).json({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email or username already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
