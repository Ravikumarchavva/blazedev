
import React from "react";
import AboutSection from '@/components/AboutCards';
const About = () => {
  return (
    <div id="About" className="flex flex-col items-center justify-center px-[5vw]">
      <div className="mt-20 text-5xl text-primary font-semibold dark:text-secondary">About Me</div>
      <AboutSection />
    </div>
  );
};

export default About;
  