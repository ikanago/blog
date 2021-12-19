import React from "react";
import { Header } from "./Header";
import config from "../lib/config";
// import "./layout.module.css";

type Props = {
    children: JSX.Element;
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <Header siteTitle={config.title} />
            <div style={{}}>
                <main>{children}</main>
            </div>
        </>
    );
};

export default Layout;
