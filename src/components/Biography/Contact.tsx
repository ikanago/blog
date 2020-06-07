import React from "react";
import { iconData } from "./iconData";

type Props = {
    name: string,
    link: string,
    size: string,
};

export const Contact = ({ name, link, size }: Props) => {
    const icon = iconData[name];
    return (<a href={link} target="_blank" rel="noopener noreferrer">
        <svg width={size} height={size} viewBox={icon.viewBox} preserveAspectRatio="xMidYMid">
            <g>
                <path d={icon.path} fill={icon.fill} />
            </g>
        </svg>
    </a>);
};
