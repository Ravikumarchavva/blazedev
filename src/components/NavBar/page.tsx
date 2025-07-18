"use client";
import { NavBarProvider, useNavBarContext } from "@/context/NavBarContext";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { AccountDropdownMenu } from "../AccountDropdown/page";
import Resume from "../Resume/page";
import { ModeToggle } from "../theme-toggle";
import Logo from "./Logo/page";
import NavBarLinks from "./NavbarLinks/page";
import SocialMedia from "./SocialMedia/page";

const NavBarContent: React.FC = () => {
  const { fix, menu, clicked, toggleMenu } = useNavBarContext();
  const currentPath = usePathname();

  const navBarClass = `w-full h-[6vh] min-h-14 flex items-center justify-between fixed px-[5vw] transition duration-500 ${
    fix ? "bg-primary z-[30] rounded-b-md" : "z-[20]"
  } ${currentPath === "/" ? "" : "bg-primary"}`;

  return (
    <div className={navBarClass}>
      <Logo />
      <div className="hidden md:flex gap-4 text-lg font-semibold">
        <NavBarLinks />
      </div>
      <div className="hidden lg:inline-block">
        <Resume />
      </div>
      <div className="hidden lg:flex">
        <SocialMedia />
      </div>
      <div className="flex items-center gap-4 md:hidden">
        <ModeToggle />
        <AccountDropdownMenu />
        <motion.div whileTap={{ scale: 1.5 }} className="z-[50]">
          <button onClick={toggleMenu}>
            {menu ? (
              <MdCancel className="w-8 h-10" color="white" />
            ) : (
              <AiOutlineMenu className="w-8 h-10" color="white" />
            )}
          </button>
        </motion.div>
      </div>
      <div className="relative hidden md:flex md:items-center md:justify-between md:gap-2">
        <ModeToggle />
        <AccountDropdownMenu />
      </div>
      {clicked &&
        (menu ? (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeInOut" }}
            className="top-0 left-0 z-[40] md:hidden absolute w-screen h-screen bg-primary text-white flex flex-col items-center justify-center gap-8 text-4xl"
          >
            <NavBarLinks />
          </motion.div>
        ) : (
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ delay: 0.1, duration: 0.4, ease: "easeInOut" }}
            className="top-0 left-0 z-[40] md:hidden absolute w-screen h-screen bg-primary text-white flex flex-col items-center justify-center gap-8 text-4xl"
          >
            <NavBarLinks />
          </motion.div>
        ))}
    </div>
  );
};

const NavBar: React.FC = () => (
  <NavBarProvider>
    <NavBarContent />
  </NavBarProvider>
);

export default NavBar;
