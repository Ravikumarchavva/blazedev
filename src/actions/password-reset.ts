"use server";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { changePasswordSchema } from "@/models/schemas";
import { z } from "zod";
import { db } from "@/lib/db";

async function validateToken(token: string) {
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    throw new Error("Token does not exist");
  }
  if (new Date(existingToken.expires) < new Date()) {
    throw new Error("Token has expired");
  }
  return existingToken;
}

async function validatePassword(values: z.infer<typeof changePasswordSchema>) {
  const validationResult = changePasswordSchema.safeParse(values);
  if (!validationResult.success) {
    throw new Error(validationResult.error.message);
  }
  return values;
}

async function updatePassword(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password,10);
  await db.user.update({
    where: { email },
    data: { password: hashedPassword },
  });
}

async function deleteToken(token: string) {
  await db.passwordResetToken.delete({
    where: { token },
  });
}

export async function passwordChange(token: string, values: z.infer<typeof changePasswordSchema>) {
  try {
    const existingToken = await validateToken(token);
    const { password } = await validatePassword(values);
    await db.$transaction(async (tx) => {
      await updatePassword(existingToken.email, password);
      await deleteToken(token);
    });
    return { success: true, message: "Password changed successfully" };
  } catch (error: unknown) {
    return { success: false, message: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}