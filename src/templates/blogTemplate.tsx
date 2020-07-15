import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components/Layout";
import { SEO } from "../components/seo";
const styles = require("./template.module.css");

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { markdownRemark } = data; // data.markdownRemark holds your post data
    const { frontmatter, html } = markdownRemark;
    return (
        <Layout>
            <>
                <SEO title={frontmatter.title} />
                <div className={styles.blogPostContainer}>
                    <h1>{frontmatter.title}</h1>
                    <h2>{frontmatter.date}</h2>
                    <div className={styles.blogPost}>
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
                </div>
            </>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                slug
                title
            }
        }
    }
`;
