import { BlogCard } from '@/components/ui/BlogCard'
import React from 'react'

const Blogs = () => {
  return (
    <div id="Blogs" className="flex flex-col items-center justify-center px-[5vw]">
      <div className="mt-20 text-5xl text-primary font-semibold dark:text-secondary">Blogs</div>
      <div className="w-full py-10 lg:py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-5">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  )
}

export default Blogs