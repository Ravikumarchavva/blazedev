"use client";

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

export function AccountDropdownMenu() {
  const router = useRouter();
    const navigateToProfile = ()=>{
        router.push('/profile');
    }
    const logoutUser = ()=>{
        router.push('/auth/login  ');
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
        <DropdownMenuItem onClick={() => navigateToProfile()}>
            Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logoutUser()}>
            Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
