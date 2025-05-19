export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  content: string;
  date: string;
}

export interface About {
  name: string;
  bio: string;
  skills: string[];
  contact: {
    email: string;
    phone?: string;
  };
}