import React from "react";
import config from "../lib/config";
import Head from "next/head";

type Proptype = {
    description?: string;
    title: string;
};

export const SEO = ({description, title}: Proptype) => {
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
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
        </Head>
    );
};

export default SEO;
