import React from "react";
import { icon } from "./iconData";

type Props = {
    size: string,
    icon: icon,
};

export const Icon = ({ size, icon }: Props) => (
    <svg width={size} height={size} viewBox={icon.viewBox} preserveAspectRatio="xMidYMid">
        <g>
            <path d={icon.path} fill={icon.fill} />
        </g>
    </svg>
);
