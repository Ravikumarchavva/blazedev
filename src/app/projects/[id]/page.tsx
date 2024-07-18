import { Project } from '@/types/datatypes';
import { Projects } from '@/data/Projects';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return Projects.map((project) => ({
    id: project.id.toString(),
  }));
}

const ProjectPage = ({ params }: ProjectPageProps) => {
  const { id } = params;


  const project: Project | undefined = Projects.find((project) => project.id === parseInt(id));

  if (!project) {
    notFound();
    return null; // Return null to avoid rendering the page
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <div className="w-80 h-80 relative aspect-w-16 aspect-h-9 mb-4">
        <Image 
          src={project.image} 
          alt={project.title} 
          layout="fill"
          objectFit="cover"
          className="rounded"
        />
      </div>
      <p>{project.description}</p>
      <p>Date: {project.date.toDateString()}</p>
    </div>
  );
}

export default ProjectPage;
