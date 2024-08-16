import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
interface projectCardProps {
    title: string;
    description: string;
    image: string;
    comingSoon: boolean;
    link: string;
}
const ProjectCard = ({title,description,image,comingSoon,link}:projectCardProps) => {
  return (
    <Card className="overflow-hidden ">
      <CardContent className="relative flex aspect-square portrait:aspect-auto portrait:h-[60vh] items-center justify-center p-6">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
        <div className="absolute text-center text-white bg-primary bg-opacity-50 bottom-0 w-full h-[30%] p-2 rounded-b-lg">
          <span className="text-2xl font-semibold">{title}</span>
          <div className="flex items-center justify-around px-4">
            <p className="mt-2 px-2 portrait:hidden">{description}</p>
            <Link href={`/projects/${link}`}>
              <button
                className={`mt-2 px-4 text-white rounded ${
                  comingSoon
                    ? "cursor-not-allowed bg-background"
                    : "hover:bg-white bg-secondary hover:text-black py-2"
                }`}
                disabled={comingSoon}
              >
                {comingSoon ? "Coming Soon" : "View"}
              </button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
