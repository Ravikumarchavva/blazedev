export interface PageLink {
  id: string;
  url: string;
  title: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  date: Date;
  image: string;
  comingSoon: boolean;
  link: string;
}

export interface Blog {
  id: number;
  title: string;
  description: string;
  url: string;
  expectedReadingTime: string;
  imageUrl: string;
  blogUrl: string;
}
