import React from "react";

import { Biography } from "../components/Biography";
import { Works } from "../components/Works";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { Articles, Post } from "../components/Articles";

const IndexPage = () => {
    return (
        <Layout>
            <>
                <SEO title="Home" />
                <div>
                    <Biography />
                    <h2>Articles</h2>
                    <Articles />
                    <Works />
                </div>
            </>
        </Layout>
    );
};

export default IndexPage;
