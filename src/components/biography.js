import React from "react"
import Img from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby"

export const Biography = () => {
    const data = useStaticQuery(graphql`
        query {
            file(
                relativePath: { eq: "blog_icon.png" }
            ) {
                childImageSharp {
                    fixed(width: 300) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    return (<div style={{
        display: `flex`,
        margin: `1rem 0 0 0`,
    }}>
        <Img fixed={data.file.childImageSharp.fixed} />
        <div style={{
            margin: `1rem 0 0 1rem`
        }}>
            <h1>ikanago</h1>
            <p>
                Studying computer science at a university.<br />
                I love Rust 🦀.
            </p>
        </div>
    </div>);
};
