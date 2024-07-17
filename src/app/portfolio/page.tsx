import React from "react";
import { Slides } from "./Slides";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Portfolio = () => {
  
  return (
    <div id="Portfolio" className="w-[100vw] gap-2 flex flex-col items-center justify-center px-[5vw]">
      <div className="mt-20 text-5xl text-primary font-semibold dark:text-secondary">
        Portfolio
      </div>
      <Slides />
      <div>
        <Link href={'/projects'}>
        <Button className="bg-secondary" >View All Projects</Button>
        </Link>
        </div>
    </div>
  );
};

export default Portfolio;
