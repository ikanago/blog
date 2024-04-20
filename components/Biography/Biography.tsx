import React from "react";
import Image from "next/image";
import { Badge } from "./Badge";
import { badgeData } from "./badgeData";
const styles = require("./biography.module.css");

export const Biography = () => {
  return (
    <div className={styles.biography_container}>
      <Image alt="ikanago" src="/blog_icon.png" width={400} height={400} />
      <div className={styles.biography}>
        <h1>ikanago</h1>
        <p className={styles.description}>
          Studying computer science at a university. I love Rust 🦀.
        </p>
        {badgeData.data.map((data, i) => (
          <Badge
            key={i}
            link={data.link}
            badgeLink={data.badgeLink}
            title={data.title}
            alt={data.alt}
          />
        ))}
      </div>
    </div>
  );
};
