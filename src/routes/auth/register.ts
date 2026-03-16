// src/routes/auth.ts
import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { User } from "../../models/User";
import { registerSchema } from "../../models/zod/registerSchema";

const router = Router();

router.post("/register", async (req, res) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: z.treeifyError(result.error) });
  }
  try {
    const { username, email, password, role } = result.data;

    const passwordHash = await bcrypt.hash(password, 12);

    await User.create({
      username,
      email,
      passwordHash,
      role,
    });

    return res.status(201).json({ message: "User created" });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email or username already exists" });
    }

    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
