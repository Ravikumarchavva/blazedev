import React from "react";
import { Slides } from "./Slides";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Portfolio = () => {
  
  return (
    <div id="Portfolio" className="w-[100vw] gap-2 flex flex-col items-center justify-center px-[5vw]">
      <div className="w-full flex items-center md:justify-between justify-center mt-10">
        <div className="text-5xl text-primary font-semibold dark:text-secondary inline-block">
          Portfolio
        </div>
        <div className="sm:hidden portrait:hidden md:inline-block">
          <Link href={'/projects'}>
          <Button className="bg-secondary" >View All Projects</Button>
          </Link>
        </div>  
      </div>
      <Slides />
      <div className="md:hidden">
        <Link href={'/projects'}>
        <Button className="bg-secondary" >View All Projects</Button>
        </Link>
        </div>
    </div>
  );
};

export default Portfolio;
