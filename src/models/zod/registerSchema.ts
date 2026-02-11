import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[A-ZÅÄÖ]/, "Must contain at least one uppercase letter"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.enum(["student", "teacher"], {
      message: "Please select a valid role",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
