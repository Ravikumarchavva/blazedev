"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Link as ScrollLink, scroller } from "react-scroll";
import Link from "next/link";
import { useNavBarContext } from "@/context/NavBarContext";
import { PageLink } from "@/lib/datatypes";

const links: PageLink[] = [
  { id: "Home", url: "/", title: "Home" },
  { id: "About", url: "/about", title: "About" },
  { id: "Portfolio", url: "/portfolio", title: "Portfolio" },
  { id: "Blogs", url: "/blogs", title: "Blogs" },
  { id: "Contact", url: "/contact", title: "Contact" },
];

const NavBarLinks: React.FC = () => {
  const currentPath = usePathname();
  const { menu, toggleMenu } = useNavBarContext();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleScroll = useCallback(() => {
    const sections = links.map((link) => document.getElementById(link.id));
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let foundSection = false;

    for (const section of sections) {
      if (
        section &&
        section.offsetTop <= scrollPosition &&
        section.offsetTop + section.offsetHeight > scrollPosition
      ) {
        if (activeSection !== section.id) {
          setActiveSection(section.id);
        }
        foundSection = true;
        break;
      }
    }

    if (!foundSection && activeSection !== null) {
      setActiveSection(null);
    }
  }, [activeSection]);

  useEffect(() => {
    if (currentPath === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on mount
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleClick = (id: string) => {
    if (menu) {
      toggleMenu();
    }
    const element = document.getElementById(id);
    if (element) {
      scroller.scrollTo(id, {
        duration: 500,
        smooth: true,
        offset: -50, // Adjust offset as needed
      });
    }
  };

  return (
    <>
      {links.map((link) => (
        <motion.div
          key={link.url}
          whileHover={{ scale: 1.05 }}
          className={`rounded-md px-1 text-white bg-tranparent hover:text-foreground hover:bg-background ${currentPath === "/" && link.id === "Home" && activeSection === null
              ? "bg-secondary"
              : currentPath === "/" && activeSection === link.id
                ? "bg-secondary  transition duration-500"
                : currentPath !== "/" && currentPath === link.url
                  ? "bg-secondary"
                  : ""
            }`}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {currentPath === "/" ? (
            <ScrollLink
              className="hover:cursor-pointer"
              to={link.id}
              smooth={true}
              duration={500}
              offset={-50}
              onClick={() => handleClick(link.id)}
            >
              {link.title}
            </ScrollLink>
          ) : (
            <Link href={link.url} onClick={menu ? toggleMenu : undefined}>
              <span className="hover:cursor-pointer">{link.title}</span>
            </Link>
          )}
        </motion.div>
      ))}
    </>
  );
};

export default NavBarLinks;
