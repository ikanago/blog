import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

export const Image = () => {
    const data = useStaticQuery(graphql`
        query {
            file(
                relativePath: { eq: "sotai.png" }
            ) {
                childImageSharp {
                    fixed(width: 300) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    return <Img fixed={data.file.childImageSharp.fixed} />;
};
