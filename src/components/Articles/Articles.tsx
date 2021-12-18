import React from "react";
import { Container } from "../Container";
const styles = require("./articles.module.css");

type Props = {
    posts: Post[];
}

export const Articles = ({posts}: Props) => {
    const frontMatters = posts
        .map(post => {
            return {
                title: post.frontmatter.title,
                description: post.frontmatter.description,
                tags: post.frontmatter.tags,
                date: post.frontmatter.createdAt,
                link: post.frontmatter.slug,
            };
        });
    return (
        <Container
            backgroundColor="#F6F6F6"
            sectionName="Articles"
            contents={frontMatters}
        />
    );
};
