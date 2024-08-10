import React from "react";
import { Slides } from "./Slides";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Portfolio = () => {
  return (
    <div
      id="Portfolio"
      className="w-[100vw] min-h-[95vh] gap-[10vh] flex flex-col items-center justify-center px-[5vw] rounded-t-2xl pt-[5vh]"
    >
      <div className="w-full flex items-center md:justify-between justify-center">
        <div className="text-5xl text-primary font-semibold dark:text-secondary inline-block">
          Portfolio
        </div>
        <div className="sm:hidden portrait:hidden md:inline-block">
          <Link href={"/projects"}>
            <Button className="bg-secondary">View All Projects</Button>
          </Link>
        </div>
      </div>
      <Slides />
      <div className="md:hidden">
        <Link href={"/projects"}>
          <Button className="bg-secondary">View All Projects</Button>
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;
