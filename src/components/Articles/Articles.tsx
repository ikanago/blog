import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Container } from "../Container";
const styles = require("./articles.module.css");

type Query = {
    allMarkdownRemark: {
        edges: [
            {
                node: Post;
            }
        ];
    };
};

type Post = {
    id: string;
    excerpt: string;
    frontmatter: {
        slug: string;
        title: string;
        tags: string[];
        createdAt: string;
    };
};

export const Articles = () => {
    const data: Query = useStaticQuery(graphql`
        query {
            allMarkdownRemark(
                filter: { frontmatter: { status: { eq: "published" } } }
                sort: { order: DESC, fields: [frontmatter___createdAt] }
            ) {
                edges {
                    node {
                        id
                        excerpt(pruneLength: 80)
                        frontmatter {
                            createdAt(formatString: "YYYY MMMM DD")
                            slug
                            tags
                            title
                        }
                    }
                }
            }
        }
    `);

    const { edges } = data.allMarkdownRemark;
    const posts = edges
        .filter(edge => !!edge.node.frontmatter.createdAt)
        .map(post => {
            return {
                title: post.node.frontmatter.title,
                description: post.node.excerpt,
                tags: post.node.frontmatter.tags,
                date: post.node.frontmatter.createdAt,
                link: post.node.frontmatter.slug,
            };
        });
    return (
        <Container
            backgroundColor="#F6F6F6"
            sectionName="Articles"
            contents={posts}
        />
    );
};
