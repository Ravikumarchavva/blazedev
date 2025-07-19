"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import Image from "next/legacy/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Project } from "@/lib/datatypes";
import { Projects } from "@/data/Projects";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard/page";

export function Slides() {
  const projects: Project[] = Projects;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up-visible");
          } else {
            entry.target.classList.remove("fade-in-up-visible");
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      },
    );

    const elements = ref.current?.querySelectorAll(".fade-in-up");
    if (elements) {
      elements.forEach((element) => observer.observe(element));
    }

    return () => {
      if (elements) {
        elements.forEach((element) => observer.unobserve(element));
      }
      observer.disconnect();
    };
  }, []);

  return (
    <Carousel className="w-full" plugins={[Autoplay({ delay: 2500 })]}>
      <CarouselContent ref={ref} className="">
        {projects.map((project) => (
          <CarouselItem
            key={project.id}
            className="lg:basis-1/2 xl:basis-1/3 fade-in-up"
          >
            <div className="bg-secondary rounded-lg min-h-[390px] max-h-[500px] max-w-[450px] min-w-[200px] aspect-square portrait:aspect-auto mx-auto">
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                comingSoon={project.comingSoon}
                link={project.link}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="portrait:hidden sm:hidden md:inline-block" />
      <CarouselNext className="portrait:hidden sm:hidden md:inline-block" />
    </Carousel>
  );
}
