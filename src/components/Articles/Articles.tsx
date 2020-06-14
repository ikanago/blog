import React from "react"
import { graphql, useStaticQuery } from "gatsby";
import { ArticleCard } from "./ArticleCard";
const styles = require("./articles.module.css");

type Query = {
    allMarkdownRemark: {
        edges: [{
            node: Post,
        }],
    },
};

type Post = {
    id: string,
    excerpt: string,
    frontmatter: {
        slug: string,
        title: string,
        date: string,
    },
};

export const Articles = () => {
    const data: Query = useStaticQuery(graphql`
        query {
            allMarkdownRemark(
                filter: {frontmatter: {status: {eq: "published"}}}, 
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
    const Posts = edges
        .filter(edge => !!edge.node.frontmatter.date)
        .map(post => <ArticleCard slug={post.node.frontmatter.slug} title={post.node.frontmatter.title} date={post.node.frontmatter.date} />);
    return (
        <div className={styles.article_container}>
            <h2>Articles</h2>
            <div className={styles.articles}>{Posts}
            </div>
        </div>
    );
};