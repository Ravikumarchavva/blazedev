"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Project } from "@/types/datatypes";
import { Projects } from "@/data/Projects";
import Link from "next/link";


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
      }
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
      <CarouselContent ref={ref} className="-ml-1">
      {projects.map((project) => (
  <CarouselItem key={project.id} className="pl-1 lg:basis-1/2 xl:basis-1/3 fade-in-up">
    <div className="bg-secondary rounded-lg min-h-[390px] max-h-[500px] max-w-[450px] min-w-[270px] aspect-square portrait:aspect-auto mx-auto">
      <Card className="overflow-hidden rounded-lg">
        <CardContent className="relative flex aspect-square portrait:aspect-auto portrait:min-h-[425px] items-center justify-center p-6">
          <Image 
            src={project.image} 
            alt={project.title} 
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          <div className="absolute text-center text-white bg-primary bg-opacity-50 bottom-0 w-full h-[30%] p-2 rounded-b-lg">
            <span className="text-2xl font-semibold">{project.title}</span>
            <div className="flex items-center justify-around px-4">
              
            <p className="mt-2 px-2 portrait:hidden">{project.description}</p>
            <Link href={`/projects/${project.id}`}>
                <button
                  className={`mt-2 px-4 py-2 bg-secondary text-white rounded ${
                    project.comingSoon ? 'cursor-not-allowed bg-gray-600' : 'hover:bg-white hover:text-black'
                  }`}
                  disabled={project.comingSoon}
                  >
                  {project.comingSoon ? 'Coming Soon' : 'View'}
                </button>
            </Link>
                  </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </CarouselItem>
))}
      </CarouselContent>
      <CarouselPrevious className="portrait:hidden sm:hidden md:inline-block" />
      <CarouselNext className="portrait:hidden sm:hidden md:inline-block" />
    </Carousel>
  );
}
