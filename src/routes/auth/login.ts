// src/routes/auth.ts
import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { User } from "../../models/User";
import { loginSchema } from "../../models/zod/loginSchema";

const router = Router();

router.post("/login", async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: z.treeifyError(result.error) });
  }
  try {
    const { email, password } = result.data;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.json({ message: "Login successful" });

  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email or username already exists" });
    }

    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
