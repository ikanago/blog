import React from "react";
import Layout from "../components/Layout";
import SEO from "../components/seo";
import { markdownToHtml } from "../lib/markdown";
import { getPostBySlug, getAllPosts } from "../lib/blog";

export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug);
    const content = await markdownToHtml(post.content || "");

    return {
        props: {
            ...post,
            content,
        },
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts();

    return {
        paths: posts.map(post => {
            return {
                params: {
                    slug: post.frontmatter.slug,
                },
            };
        }),
        fallback: false,
    };
}

const BlogPost = (post: Post) => {
    return (
        <Layout>
            <>
                <SEO
                    title={post.frontmatter.title}
                    description={post.frontmatter.description}
                />
                <article
                    className="blogPost"
                    itemScope
                    itemType="http://schema.org/Article"
                >
                    <h1>{post.frontmatter.title}</h1>
                    <h4 className="date">
                        Created at {post.frontmatter.createdAt}
                    </h4>
                    <h4 className="date">
                        Updated at {post.frontmatter.updatedAt}
                    </h4>
                    <div className="blogPost">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>
                </article>
            </>
        </Layout>
    );
};

export default BlogPost;
