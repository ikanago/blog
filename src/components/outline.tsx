import React from "react"

type Props = {
    children: JSX.Element,
};

export const Outline = ({ children }: Props) => (
    <div style={{
        width: `15rem`,
        float: `left`,
        position: `sticky`,
    }}>
        {children}
    </div>
);