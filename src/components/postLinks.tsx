import React from "react";
import { Link } from "gatsby";

type Props = {
    post: {
        frontmatter: {
            slug: string,
            title: string,
            date: string,
        },
    },
};

export const PostLink = ({ post }: Props) => (
    <div>
        <Link to={post.frontmatter.slug}>
            {post.frontmatter.title} ({post.frontmatter.date})
        </Link>
    </div>
);
