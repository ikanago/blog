import React from "react"

export const Outline = ({ children }) => (
    <div style={{
        width: `15rem`,
        float: `left`,
        position: `sticky`,
    }}>
        {children}
    </div>
);