declare module "*.jpg";
declare module "*.png";

type Post = {
  frontmatter: FrontMatter;
  content: string;
};

type FrontMatter = {
  slug: string;
  description: string;
  title: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
};
