import React from "react";
import { Container } from "../Container";

type Props = {
    posts: Post[];
};

export const Articles = ({ posts }: Props) => {
    const frontMatters = posts.map(post => {
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
            sectionName="Articles"
            contents={frontMatters}
        />
    );
};
