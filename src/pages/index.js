import React from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { PostLink } from "../components/postLinks";
import { Outline } from "../components/outline";

const IndexPage = ({
    data: {
        allMarkdownRemark: { edges },
    },
}) => {
    const Posts = edges
        .filter(edge => !!edge.node.frontmatter.date)
        .map(edge => <li key={edge.id}><PostLink key={edge.id} post={edge.node} /></li>);

    return (
        <Layout>
            <SEO title="Home" />
            <Outline>
                <p>biography</p>
                <p>articles</p>
                <p>works</p>
            </Outline>
            <div>
                <h1>Hi people</h1>
                <h2>Articles</h2>
                <ul>{Posts}</ul>
                <h2>Works</h2>
                <ul>
                    <li><a href="https://github.com/ikanago/ycc">ycc</a></li>
                    <li><a href="https://github.com/ikanago/prodio">prodio</a></li>
                </ul>
            </div>
        </Layout>
    );
};

export default IndexPage;

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
`;
