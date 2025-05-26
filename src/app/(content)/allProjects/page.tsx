"use client";
import * as React from "react";
import { Project } from "@/lib/datatypes";
import { Projects } from "@/data/Projects";

import ProjectCard from "@/components/ProjectCard/page";

const allProjects: React.FC = () => {
  const projects: Project[] = Projects;

  return (
    <div
      id="projects"
      className="w-full pb-10 gap-10 flex flex-col items-center justify-center px-[5vw]"
    >
      <div className="mt-20 text-5xl text-primary font-semibold dark:text-secondary">
        Projects
      </div>
      <div className="w-full grid portrait:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-10">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-secondary rounded-lg min-h-[390px] max-h-[500px] max-w-[450px] min-w-[270px] aspect-square portrait:aspect-auto mx-auto"
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              image={project.image}
              comingSoon={project.comingSoon}
              link={project.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default allProjects;
