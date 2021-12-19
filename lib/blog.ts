import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { parseISO, format } from "date-fns";

const postsDirectory = join(process.cwd(), "posts");

export const getPostBySlug = (slug: string): Post => {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const createdAt = format(parseISO(data.createdAt), "yyyy-MMMM-dd");
    const updatedAt = format(parseISO(data.updatedAt), "yyyy-MMMM-dd");
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
    const posts = slugs.map(slug => getPostBySlug(slug));

    return posts;
};
