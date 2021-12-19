import React from "react";

import { Biography } from "../components/Biography";
import { Works } from "../components/Works";
import Layout from "../components/Layout";
import { SEO } from "../components/seo";
import { Articles } from "../components/Articles";
import { getAllPosts } from "../lib/blog";

type Props = {
    props: {
        posts: Post[];
    };
};

export const getStaticProps = (): Props => {
    const posts = getAllPosts();
    return {
        props: { posts },
    };
};

const IndexPage = ({ posts }: Props["props"]): JSX.Element => {
    return (
        <Layout>
            <>
                <SEO title="ikanago's blog" />
                <div>
                    <Biography />
                    <Articles posts={posts} />
                    <Works />
                </div>
            </>
        </Layout>
    );
};

export default IndexPage;
