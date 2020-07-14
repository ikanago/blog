import React from "react";
import Img from "gatsby-image";
import { useStaticQuery, graphql } from "gatsby";
import { Badge } from "./Badge";
import { badgeData } from "./badgeData";
const styles = require("./biography.module.css");

export const Biography = () => {
    const data = useStaticQuery(graphql`
        query {
            icon: file(relativePath: { eq: "assets/blog_icon.png" }) {
                childImageSharp {
                    fixed(width: 200, height: 200) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    return (
        <div className={styles.biography_container}>
            <Img fixed={data.icon.childImageSharp.fixed} />
            <div className={styles.biography}>
                <h1>ikanago</h1>
                <p>
                    Studying computer science at a university. I love Rust 🦀.
                </p>
                {badgeData.data.map(data => (
                    <Badge
                        link={data.link}
                        badgeLink={data.badgeLink}
                        title={data.title}
                        alt={data.alt}
                    />
                ))}
            </div>
        </div>
    );
};
