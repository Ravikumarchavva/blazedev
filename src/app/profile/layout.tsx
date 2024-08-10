"use client";
import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});
interface tab {
  name: string;
  href: string;
}
const tabs: tab[] = [
  { name: "Profile", href: "/profile" },
  // { name: "Account", href: "/profile/account" },
  { name: "Appearance", href: "/profile/appearance" },
  // { name: "Notifications", href: "/profile/notifications" },
  // { name: "Display", href: "/profile/display" },
];

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  return (
    <div className={cn("pt-[5vh] w-full px-[5vw] portrait:px-0 lg:pt-[10vh]", font.className)}>
      <div className="shadow-2xl bg-primary md:rounded-t-md w-full min-h-screen mb-20 portrait:mb-0 portrait:rounded-none sm:mb-0 sm:rounded-none flex flex-col p-10 gap-5">
        <div className="min-h-[10vh]">
          <h1 className="text-5xl font-semibold text-primary-foreground">
            Settings
          </h1>
          <p className="text-gray-300 pt-2">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <div className="border-b border-gray-300 my-4"></div>

        <div className="flex sm:flex-col portrait:flex-col lg:flex-row gap-2">
          <div className="sm:w-full portrait:w-full lg:w-1/6 flex sm:flex-col portrait:flex-col md:flex-row md:gap-2 lg:flex-col">
            {tabs.map((item) => (
              <Button
                className={cn(
                  "my-2 w-full text-left justify-start",
                  item.href === path ? "bg-secondary hover:bg-secondary/80" : "hover:underline"
                )}
                key={item.name}
              >
                <Link href={item.href} className="w-full">
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
          <div className="sm:w-full md:w-5/6 mt-4 sm:mt-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
