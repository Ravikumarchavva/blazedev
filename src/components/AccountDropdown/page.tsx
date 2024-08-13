"use clinet";
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdAccountCircle } from "react-icons/md";
import { logOut } from "@/actions/logOut";
import { toast } from "sonner";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

export function AccountDropdownMenu() {
    const user = useCurrentUser();
    const logoutUser = async ()=>{
        await logOut();
        toast("Logged Out Successfully!")
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
        <Button size={"icon"} className="bg-transparent hover:bg-transparent/20">

        <AvatarImage src={user?.image || ""} className="p-1 rounded-full"/>
        </Button>
        <AvatarFallback className="bg-transparent">
          <Button className="bg-transparent hover:bg-transparent/20">
            <FaUser size={23} className="text-white"/>
            </Button>
        </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={'/profile'}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logoutUser()} className="gap-1">
           <FaSignOutAlt/> <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
