import { Role } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
  bio: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
