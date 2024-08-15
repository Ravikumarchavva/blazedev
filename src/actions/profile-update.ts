"use server";

import { getUserByEmail } from "@/data/findUser";
import { db } from "@/lib/db";
import { settingsSchema } from "@/models/schemas";
import { z } from "zod";

export const profileUpdate = async (values: z.infer<typeof settingsSchema>) => {
  try {
    const validatedData = settingsSchema.parse(values);
    console.log("Validated data:", validatedData);
    await db.user.update({
      where: { email: validatedData.email },
      data: {
        name: validatedData.name,
        bio: validatedData.bio || null,
      },
    });
    return { success: true, message: "Profile updated successfully" };
  } catch (error: any) {
    console.log("Update error:", error);
    return { success: false, message: error.message as string };
  }
};
