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
                <article className={styles.blogPostContainer}>
                    <h1>{frontmatter.title}</h1>
                    <h4 className={styles.date}>
                        Created at {frontmatter.createdAt}, Updated at{" "}
                        {frontmatter.updatedAt}
                    </h4>
                    <div className={styles.blogPost}>
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
                </article>
            </>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                createdAt(formatString: "YYYY MMMM DD")
                updatedAt(formatString: "YYYY MMMM DD")
                slug
                title
            }
        }
    }
`;
