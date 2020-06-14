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
        date: string;
    };
};

export const Articles = () => {
    const data: Query = useStaticQuery(graphql`
        query {
            allMarkdownRemark(
                filter: { frontmatter: { status: { eq: "published" } } }
                sort: { order: DESC, fields: [frontmatter___date] }
            ) {
                edges {
                    node {
                        id
                        excerpt(pruneLength: 250)
                        frontmatter {
                            date(formatString: "YYYY MMMM DD")
                            slug
                            title
                        }
                    }
                }
            }
        }
    `);

    const { edges } = data.allMarkdownRemark;
    const posts = edges
        .filter(edge => !!edge.node.frontmatter.date)
        .map(post => {
            return {
                title: post.node.frontmatter.title,
                date: post.node.frontmatter.date,
                link: post.node.frontmatter.slug,
            };
        });
    return (
        <Container
            backgroundColor="#3c91e6"
            sectionName="Articles"
            contents={posts}
        />
    );
};
