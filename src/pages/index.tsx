import React from "react";
import { graphql } from "gatsby";

import { Biography } from "../components/Biography";
import { Works } from "../components/Works";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { PostLink } from "../components/postLinks";

type Props = {
    data: {
        allMarkdownRemark: {
            edges: [{
                node: {
                    id: string,
                    excerpt: string,
                    frontmatter: {
                        date: string,
                        slug: string,
                        title: string,
                    },
                },
            }],
        },
    },
};

const IndexPage = ({
    data: {
        allMarkdownRemark: { edges },
    },
}: Props) => {
    const Posts = edges
        .filter(edge => !!edge.node.frontmatter.date)
        .map(edge => <li key={edge.node.id}><PostLink key={edge.node.id} post={edge.node} /></li>);

    return (
        <Layout>
            <>
                <SEO title="Home" />
                <div>
                    <Biography />
                    <h2>Articles</h2>
                    <ul>{Posts}</ul>
                    <Works />
                </div>
            </>
        </Layout>
    );
};

export default IndexPage;

export const pageQuery = graphql`
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
`;
