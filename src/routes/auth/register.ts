// src/routes/auth.ts
import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../../models/User";
import { registerSchema } from "../../models/zod/registerSchema";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { username, email, password, confirmPassword, role } = validatedData;

    if (!username || !email || !password || !confirmPassword || !role) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = await User.create({
      email,
      username,
      passwordHash,
      role,
      verified: false,
    });

    res.status(201).json({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      verified: false,
    });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email or username already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
