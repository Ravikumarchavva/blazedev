import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math'; // Import remark-math
import rehypeKatex from 'rehype-katex'; // Import rehype-katex
import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'], // Support MDX pages
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkMath], // Enable GFM and LaTeX math support
    rehypePlugins: [rehypeKatex], // Enable Katex for rendering math
  },
});

export default withMDX(nextConfig);
