"use server";

import { getUserByEmail } from "@/data/findUser";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const verifyUser = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { success: false, message: "Token does not exist" };
  }

  if (new Date(existingToken.expires) < new Date()) {
    return { success: false, message: "Token has expired" };
  }

  const user = await getUserByEmail(existingToken.email);

  if (!user) {
    return { success: false, message: "User not found" };
  }

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email, // for email updation
      },
    });

    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return { success: true, message: "User has been verified" };
  } catch (error) {
    return { success: false, message: "Error verifying user" };
  }
};