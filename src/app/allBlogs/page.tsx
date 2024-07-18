import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { BlogsData } from '@/data/Blogs';
import { Blog } from '@/types/datatypes';
import BlogCard from '@/components/BlogCard';

const Blogs = () => {
  const blogs: Blog[] = BlogsData;
  return (
    <div id="Blogs" className="w-full gap-2 flex flex-col items-center justify-between px-[5vw]">
      <div className="text-5xl mt-[10vh] text-primary font-semibold dark:text-secondary">
          Blogs
      </div> 
      <div className='grid grid-cols-1 portrait:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full'>
        {blogs.map((blog, index) => (
          <BlogCard blog={blog} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Blogs;
