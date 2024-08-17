"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface NavBarContextProps {
  fix: boolean;
  menu: boolean;
  clicked: boolean;
  toggleMenu: () => void;
}

const NavBarContext = createContext<NavBarContextProps | undefined>(undefined);

export const useNavBarContext = () => {
  const context = useContext(NavBarContext);
  if (!context) {
    throw new Error("useNavBarContext must be used within a NavBarProvider");
  }
  return context;
};

export const NavBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fix, setFix] = useState(false);
  const [menu, setMenu] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleNavScroll = () => {
      const height = window.scrollY / window.innerHeight;
      setFix(height >= 0.3);
    };

    window.addEventListener("scroll", handleNavScroll);
    return () => window.removeEventListener("scroll", handleNavScroll);
  }, []);

  const toggleMenu = () => {
    setMenu(!menu);
    if (!clicked) {
      setClicked(true);
    }
  };

  return (
    <NavBarContext.Provider value={{ fix, menu, clicked, toggleMenu }}>
      {children}
    </NavBarContext.Provider>
  );
};
