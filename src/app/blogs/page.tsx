import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { BlogsData } from "@/data/Blogs";
import { Blog } from "@/lib/datatypes";
import BlogCard from "@/components/BlogCard";

const Blogs = () => {
  const blogs: Blog[] = BlogsData;
  return (
    <div
      id="Blogs"
      className="w-full gap-5 flex flex-col items-start justify-center px-[5vw] min-h-screen"
    >
      <div className="w-full flex items-center md:justify-between justify-center mt-10">
        <div className="text-5xl text-primary font-semibold dark:text-secondary">
          Blogs
        </div>
        <div className="sm:hidden portrait:hidden md:inline-block">
          <Link href={"/allBlogs"}>
            <Button className="bg-secondary">All Blogs</Button>
          </Link>
        </div>
      </div>
      <div className="bg-primary w-full h-1 max-w-4xl"></div>
      <div className="grid grid-cols-1 portrait:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {blogs.map((blog, index) => (
          <BlogCard blog={blog} key={index} />
        ))}
      </div>
      <div className="md:hidden">
        <Link href={"/allBlogs"}>
          <Button className="bg-secondary">View All Blogs</Button>
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
