"use client";
import Image from "next/legacy/image";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Blog } from "@/lib/datatypes";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
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

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="md:min-w-[200px] md:min-h-[450px] md:max-h-[500px] md:max-w-[300px] my-4 mx-auto flex flex-col bg-primary rounded-lg overflow-hidden
                 portrait:w-[90vw] sm:w-[90vw] portrait:max-w-[450px] sm:max-w-[450px] xl:min-w-[200px]
                 fade-in-up"
    >
      <div className="relative min-h-[250px] max-w-[96%] flex justify-center items-center mx-2 mt-2">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          layout="fill"
          objectFit="fill"
          className="absolute top-0"
        />
      </div>
      <div className="p-4">
        <div className="text-gray-300">{blog.expectedReadingTime}</div>
        <div className="text-xl font-bold text-white">{blog.title}</div>
        <div className="flex flex-col justify-around items-center">
          <p className="text-gray-200">{blog.description}</p>
          <Link href={`${blog.blogUrl}`}>
            <Button className="bg-secondary hover:bg-white hover:text-black">
              Read
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
