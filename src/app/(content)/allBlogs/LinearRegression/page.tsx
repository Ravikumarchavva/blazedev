"use client";
import Example from "./example.mdx";
import 'katex/dist/katex.min.css';
import '@/styles/globals.css';

const LinearRegression = () => {


  return (
    <div className="project w-full px-[5vw] portrait:px-0 flex flex-col pt-[10vh] portrait:pt-[5vh] items-center justify-center min-h-screen">
      {/* Example MDX Component */}
      <div className="w-full mb-10 bg-primary shadow-2xl prose prose-lg max-w-none p-[5vw] text-white prose-headings:text-white prose-a:text-white prose-strong:text-white prose-code:text-white portrait:px-[5vw] portrait:mb-0">
        <Example />
      </div>
    </div>
  );
};

export default LinearRegression;
