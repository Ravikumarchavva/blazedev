/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx'

const nextConfig = {
    pageExtensions: ['ts','tsx','md','mdx']
};
const withMDX = createMDX({
    // Add markdown plugins here, as desired
    extension:/\.mdx?$/,
    options:{

        remarkPlugins: [],
        rehypePlugins: [],
    },
    


  })
export default withMDX(nextConfig);
