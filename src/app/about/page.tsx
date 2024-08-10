import React from "react";
import AboutSection from '@/components/AboutCards';
const About = () => {
  return (
    <div id="About" className="min-h-[95vh] pt-[5vh] flex flex-col items-center justify-center px-[5vw] 
    dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background to-primary  rounded-b-2xl
    ">
      <div className="mt-20 text-5xl text-primary font-semibold dark:text-secondary">About Me</div>
      <AboutSection />
    </div>
  );
};

export default About;
  