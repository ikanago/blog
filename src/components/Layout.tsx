import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Header } from "./Header";
import "./layout.css";

type Props = {
    children: JSX.Element;
};

export const Layout = ({ children }: Props) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <>
            <Header siteTitle={data.site.siteMetadata.title} />
            <div style={{}}>
                <main>{children}</main>
            </div>
        </>
    );
};
