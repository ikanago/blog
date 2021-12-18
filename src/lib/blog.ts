import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { parseISO, format } from "date-fns";

const postsDirectory = join(process.cwd(), "src", "markdown-pages");

export const getPostBySlug = (slug: string) => {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    console.error(data);
    const date = format(parseISO(data.createdAt), "yyyy-MMMM-dd");

    return { slug: realSlug, frontmatter: { ...data, date }, content };
};

export const getAllPosts = () => {
    const slugs = fs.readdirSync(postsDirectory);
    const posts = slugs.map(slug => getPostBySlug(slug));

    return posts;
};
