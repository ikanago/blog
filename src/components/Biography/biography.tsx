import React from "react"
import Img from "gatsby-image";
import { Icon } from "./icon";
import { iconData } from "./iconData";
import { useStaticQuery, graphql } from "gatsby"

export const Biography = () => {
    const data = useStaticQuery(graphql`
        query {
            icon: file(
                relativePath: { eq: "assets/blog_icon.png" }
            ) {
                childImageSharp {
                    fixed(width: 200, height: 200) {
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
        <Img fixed={data.icon.childImageSharp.fixed} />
        <div style={{
            margin: `1rem 0 0 1rem`
        }}>
            <h1>ikanago</h1>
            <p>
                Studying computer science at a university.<br />
                I love Rust 🦀.
            </p>
            <a href="http://github.com/ikanago" rel="noopener noreferrer">
                <Icon size="30px" icon={iconData["GitHub"]} />
            </a>
            <a href="http://twitter.com/ikanag0" rel="noopener noreferrer">
                <Icon size="30px" icon={iconData["Twitter"]} />
            </a>
        </div>
    </div >);
};
