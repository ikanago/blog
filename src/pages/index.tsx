import React from "react";

import { Biography } from "../components/Biography";
import { Works } from "../components/Works";
import Layout from "../components/Layout";
import { SEO } from "../components/seo";
import { Articles } from "../components/Articles";
import {getAllPosts} from "../lib/blog";

export const getStaticProps = () => {
    const posts = getAllPosts();
    return {
        props: {
            posts,
        },
    };
};

const IndexPage = ({posts}: {props: Post[]}) => {
    return (
        <Layout>
            <>
                <SEO title="ikanago's blog" />
                <div>
                    {/* <Biography /> */}
                    <Articles posts={posts} />
                    <Works />
                </div>
            </>
        </Layout>
    );
};

export default IndexPage;
