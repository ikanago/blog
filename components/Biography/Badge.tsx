import React from "react";
import { badgeData, badge } from "./badgeData";
const styles = require("./biography.module.css");

export const Badge = (badge: badge) => (
  <a
    href={badge.link}
    target="_blank"
    rel="noopener noreferrer"
    title={badge.title}
    className={styles.badge}
  >
    <img src={badge.badgeLink} alt={badge.alt} />
  </a>
);
