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

export function AccountDropdownMenu() {
  
    const logoutUser = async ()=>{
        await logOut();
        toast("Logged Out Successfully!")
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-7 bg-transparent hover:bg-transparent">
          <MdAccountCircle size={30} color='#fff'/>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={'./profile'}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logoutUser()}>
            Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
