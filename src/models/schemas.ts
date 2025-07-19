import { z } from "zod";

// Authentication Schemas
export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: "Name is Required" }),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirmPassword: z.string(),
  })
  .refine((data) =>
    data.password === data.confirmPassword
      ? { message: "passwords doesn't match" }
      : "",
  );

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const resetSchema = z.object({
  email: z.string().email(),
});

export const changePasswordSchema = z
  .object({
    password: z.string().min(6).max(20),
    confirmPassword: z.string(),
  })
  .refine((data) =>
    data.password === data.confirmPassword
      ? { message: "passwords doesn't match" }
      : "",
  );

// profile and contact schemas 
export const settingsSchema = z.object({
  name: z.string().min(1, { message: "Name is Required" }),
  email: z.string().email(),
  bio: z.optional(z.string()),
});

export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is Required" }),
  subject: z.string().min(1, { message: "Subject is Required" }),
  message: z.string().min(10, { message: "Enter atleast 10 characters" }),
});

// Data nexus schemas
export const statusSchema = z.enum(["NOTSTARTED", "INPROGRESS", "COMPLETED"]);
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: statusSchema,
  lead: z.string(),
  description: z.string().nullable(),
});
