import React from "react";
import { Slides } from "./Slides";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Portfolio = () => {
  return (
    <div
      id="Portfolio"
      className="w-full min-h-[95vh] gap-10 flex flex-col items-start justify-center px-[5vw] rounded-t-2xl pt-[5vh]"
    >
      <div className="w-full flex items-center md:justify-between justify-center">
        <div className="text-5xl text-center font-semibold text-secondary inline-block w-full">
          Portfolio
        </div>
        <div className="sm:hidden portrait:hidden md:inline-block">
          <Link href={"/projects"}>
            <Button className="bg-secondary">All Projects</Button>
          </Link>
        </div>
      </div>
      <div className="h-1 w-full bg-primary dark:hidden"></div>
      <Slides />
      <div className="md:hidden w-full text-center">
        <Link href={"/projects"}>
          <Button className="bg-secondary">View All Projects</Button>
        </Link>
      </div>
    </div>
  );
};

export default Portfolio;
