import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "posts");

export const getPostBySlug = (slug: string): Post => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const createdAt = data.createdAt;
  const updatedAt = data.updatedAt;
  const isPublished = data.status == "published";

  return {
    frontmatter: {
      description: data.excerpt !== undefined ? data.excerpt : null,
      slug: realSlug,
      title: data.title,
      createdAt,
      updatedAt,
      tags: data.tags,
      isPublished,
    },
    content,
  };
};

export const getAllPosts = (): Post[] => {
  const slugs = fs.readdirSync(postsDirectory);
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post.frontmatter.isPublished);
  posts.sort((x, y) => {
    if (x.frontmatter.updatedAt < y.frontmatter.updatedAt) {
      // Return value of compare function is inverted because we want to sort in decending order.
      return 1;
    }
    if (x.frontmatter.updatedAt > y.frontmatter.updatedAt) {
      return -1;
    }
    return 0;
  });

  return posts;
};
