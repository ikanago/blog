import React from "react";
import Image from "next/image";
import Layout from "../components/Layout";
import SEO from "../components/seo";
import { Biography } from "../components/Biography";

const AboutPage = () => {
    return (
        <Layout>
            <>
                <SEO title="ikanago's blog" />
                <div>
                    <Biography />
                </div>
            </>
        </Layout>
    );
};

export default AboutPage;
