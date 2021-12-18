import React from "react";
import config, { Config } from "../config";
import Head from "next/head";

type Proptype = {
    description?: string;
    title: string;
};

export const SEO = ({ description, title }: Proptype) => {
    const metaDescription = description || config.description;
    const defaultTitle = config.title;
    return (
        <Head>
            <title>{`${title} | ${defaultTitle}`}</title>
            <meta name="robots" content="follow, index" />
            <meta content={metaDescription} name="description" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:site_name" content={defaultTitle} />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:creator" content={config.social.twitter} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={metaDescription} />
        </Head>
    );
};

export default SEO;
