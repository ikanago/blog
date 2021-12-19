import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Layout from "../components/Layout";
import SEO from "../components/seo";
import { getPostBySlug, getAllPosts } from "../lib/blog";

type Params = {
    params: {
        slug: string;
    };
};

export async function getStaticProps({ params }: Params) {
    const post = getPostBySlug(params.slug);

    return {
        props: {
            ...post,
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

type ImageProps = JSX.IntrinsicElements["img"];

const MarkdownImage = (props: ImageProps): JSX.Element => {
    return (
        <Image
            {...props}
            alt={props.alt}
            src={require(`../images/${props.src}`)}
            placeholder="blur"
        />
    );
};

const components = {
    img: MarkdownImage,
};

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
                    <ReactMarkdown className="blogPost" components={components}>
                        {post.content}
                    </ReactMarkdown>
                </article>
            </>
        </Layout>
    );
};

export default BlogPost;
