"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { logOut } from "@/actions/signOut";

export function AccountDropdownMenu() {
  const user = useCurrentUser();

  const logoutUser = async () => {
    await logOut();
    toast("Logged Out Successfully!");
    window.location.reload(); // Optionally force a reload to update the session
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <Button size={"icon"} className="bg-transparent hover:bg-transparent/20">
            <AvatarImage src={user?.image || ""} className="p-1 rounded-full" />
          </Button>
          <AvatarFallback className="bg-transparent">
            <Button className="bg-transparent hover:bg-transparent/20">
              <FaUser size={23} className="text-white" />
            </Button>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user ? (
          <>
            <DropdownMenuItem>
              <Link href="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logoutUser} className="gap-1 cursor-pointer">
              <FaSignOutAlt /> <span>Logout</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>
            <Link href="/login" className="w-full">
              Login
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
