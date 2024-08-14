"use server";

import { signOut } from "@/auth";

export const logOut = async () =>{
    // Simulating logout action
    await signOut({redirectTo:"/login"});
    return true;
}