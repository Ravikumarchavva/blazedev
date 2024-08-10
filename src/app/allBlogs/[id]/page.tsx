import { Blog } from '@/lib/datatypes';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { BlogsData } from '@/data/Blogs';
interface BlogPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return BlogsData.map((Blog) => ({
    id: Blog.id.toString(),
  }));
}

const BlogPage = ({ params }: BlogPageProps) => {
  const { id } = params;


  const Blog: Blog | undefined = BlogsData.find((Blog) => Blog.id === parseInt(id));

  if (!Blog) {
    notFound();
    return null; // Return null to avoid rendering the page
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{Blog.title}</h1>
      <div className="w-80 h-80 relative aspect-w-16 aspect-h-9 mb-4">
        <Image 
          src={Blog.imageUrl} 
          alt={Blog.title} 
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>
      <p>{Blog.content}</p>
    </div>
  );
}

export default BlogPage;
