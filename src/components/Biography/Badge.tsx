import React from "react";
import { badgeData, badge } from "./badgeData";
const styles = require("./biography.module.css");

export const Badge = ({ link, badgeLink, title }: badge) => (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        title={title}
        className={styles.badge}
    >
        <img src={badgeLink} />
    </a>
);
