import { z } from "zod";

const commonAuth = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export const loginSchema = commonAuth;

export const registerSchema = commonAuth
  .extend({
    name: z
      .string()
      .min(4, "Mimum 4 characters")
      .max(50, "Maximum 50 characters"),
    repeatPassword: z.string().min(6, "Minimum 6 characters"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });
