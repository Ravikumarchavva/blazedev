"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const font = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "600"],
});

const Appearance = () => {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    setTheme(theme);
  };

  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  return (
    <form
      className={cn(
        "w-full max-w-3xl flex flex-col items-start justify-start pb-10",
        font.className
      )}
    >
      <div className="h-[10vh]">
        <h2 className="text-3xl font-semibold text-primary-foreground">
          Appearance
        </h2>
        <p className="text-gray-100 pt-2">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <div className="border-b border-gray-200 my-4 w-full"></div>
      <div className="w-full">
        <h2 className="text-xl text-primary-foreground">Theme</h2>
        <p className="text-gray-100 pt-2">Select the theme for the dashboard.</p>

        <div className="flex space-x-6 mt-6">
          {/* Light Theme Selection Card */}
          <div
            className={cn(
              "border-4 rounded-lg p-4 w-[150px] h-[160px] flex flex-col justify-between cursor-pointer transition-all duration-200",
              selectedTheme === "dark"
                ? "border-primary bg-white"
                : "border-gray-800 bg-gray-50"
            )}
            onClick={() => handleThemeChange("light")}
          >
            <div className="w-full h-6 bg-gray-200 rounded-md"></div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-3 bg-gray-200 rounded-full"></div>
              <div className="w-full h-6 bg-gray-200 rounded-md"></div>
            </div>
            <div className="w-full h-6 bg-gray-200 rounded-md"></div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-3 bg-gray-200 rounded-full"></div>
              <div className="w-full h-6 bg-gray-200 rounded-md"></div>
            </div>
          </div>

          {/* Dark Theme Selection Card */}
          <div
            className={cn(
              "border-4 rounded-lg p-4 w-[150px] h-[160px] flex flex-col justify-between cursor-pointer transition-all duration-200",
              selectedTheme === "light"
                ? "border-primary bg-gray-800"
                : "border-gray-300 bg-gray-700"
            )}
            onClick={() => handleThemeChange("dark")}
          >
            <div className="w-full h-6 bg-gray-600 rounded-md"></div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-full h-6 bg-gray-600 rounded-md"></div>
            </div>
            <div className="w-full h-6 bg-gray-600 rounded-md"></div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-full h-6 bg-gray-600 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Appearance;
