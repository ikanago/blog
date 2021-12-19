import React from "react";
import { Tag } from "./Tag";
const styles = require("./container.module.css");

export type CardContent = {
    title: string;
    tags: string[];
    description: string;
    date?: string;
    link: string;
};

export const Card = (content: CardContent) => {
    const title = (
        <a
            className={styles.title}
            href={content.link}
            target="_blank"
            rel="noopener noreferrer"
        >
            <h2>{content.title}</h2>
        </a>
    );
    const tags = (
        <div className={styles.tags}>
            {content.tags.map(tag_name => (
                <Tag tag_name={tag_name} />
            ))}
        </div>
    );
    const description = <p>{content.description}</p>;
    let date = <></>;
    if (content.date !== undefined) {
        date = <p className={styles.date}>{content.date}</p>;
    }

    return (
        <div className={styles.card}>
            <>
                {title}
                {tags}
                {description}
                {date}
            </>
        </div>
    );
};
