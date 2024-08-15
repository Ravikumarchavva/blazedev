export interface PageLink {
  id: string;
  url: string;
  title: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  date: Date,
  image: string;
  comingSoon: boolean,
  blogUrl: string | undefined
}

export interface Blog {
  id: number;
  title: string;
  description: string;
  content: string;
  url: string;
  expectedReadingTime: string;
  imageUrl: string;
}