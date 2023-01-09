import React from "react";
import Link from "next/link";

type Props = {
    siteTitle: string;
};

export const Header = ({ siteTitle }: Props) => (
    <header>
        <div
            style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `1.45rem 1.0875rem`,
            }}
        >
            <h1 style={{ margin: 0 }}>
                <Link href="/">
                    <a
                        style={{
                            fontFamily: `"SFMono-Regular", Consolas, "Roboto Mono", "Droid Sans Mono",
                        "Liberation Mono", Menlo, Courier, monospace`,
                            color: `white`,
                            textDecoration: `none`,
                        }}
                    >
                        {siteTitle}
                    </a>
                </Link>
            </h1>
        </div>
    </header>
);
