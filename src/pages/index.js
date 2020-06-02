import React from "react";
import { Link, graphql } from "gatsby";

import { Layout } from "../components/layout";
import { Image } from "../components/image";
import { SEO } from "../components/seo";
import { PostLinks } from "../components/postLinks";
import { Outline } from "../components/outline";

const IndexPage = ({
    data: {
        allMarkdownRemark: { edges },
    },
}) => {
    const Posts = edges
        .filter(edge => !!edge.node.frontmatter.date)
        .map(edge => <PostLinks key={edge.node.id} post={edge.node} />);

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
                <div>{Posts}</div>
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
