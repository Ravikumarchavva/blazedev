"use server";

import { signOut } from "@/auth";

export const logOut = async () =>{
    // Simulating logout action
    await signOut({redirectTo:"/login"});
    console.log("User logged out successfully");
    return true;
}