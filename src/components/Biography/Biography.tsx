import React from "react";
import Img from "gatsby-image";
import { Contact } from "./Contact";
import { useStaticQuery, graphql } from "gatsby";
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
                    Studying computer science at a university.
                    <br />I love Rust 🦀.
                </p>
                <Contact
                    name="GitHub"
                    link="http://github.com/ikanago"
                    size="30px"
                />
                <Contact
                    name="Twitter"
                    link="http://twitter.com/ikanag0"
                    size="30px"
                />
                <a href="https://atcoder.jp/users/ikanago" target="_blank" title="ikanago">
                    <img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fatcoder-badges.now.sh%2Fapi%2Fatcoder%2Fjson%2Fikanago" />
                </a>
            </div>
        </div>
    );
};
