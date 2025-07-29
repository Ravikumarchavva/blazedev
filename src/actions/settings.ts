"use server";

import { getUserById } from "@/data/findUser";
import { db } from "@/lib/db";
import { settingsSchema } from "@/models/schemas";
import { z } from "zod";

const updateProfile = async (
  id: string,
  values: z.infer<typeof settingsSchema>,
) => {
  const validatedValues = settingsSchema.safeParse(values);
  if (!validatedValues.success) {
    return { success: false, message: validatedValues.error.message };
  }
  try {
    const existingUser = await getUserById(id);
    if (!existingUser) {
      return { success: false, message: "User not found" };
    }

    await db.user.update({
      where: { id: existingUser.id },
      data: validatedValues.data,
    });
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    return { success: false, message: "Failed to update profile" };
  }
};
