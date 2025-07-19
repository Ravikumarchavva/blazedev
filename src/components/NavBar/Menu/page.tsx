"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { MdCancel } from "react-icons/md";
import { usePathname } from "next/navigation";

const Menu = () => {
  const currentPath = usePathname();
  const [menu, setMenu] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setMenu(!menu);
    setClicked(true);
  };

  return (
    <motion.div whileTap={{ scale: 1.5 }} className="z-[51] md:hidden">
      <button onClick={handleClick} className="">
        {menu ? (
          <MdCancel className="w-[8vw] h-[8vw]" color="background" />
        ) : (
          <CgMenu className="w-[8vw] h-[8vw]" color="background" />
        )}
      </button>
    </motion.div>
  );
};

export default Menu;
