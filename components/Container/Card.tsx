import React from "react";
import {Tag} from "./Tag";
const styles = require("./container.module.css");

export type CardContent = {
    title: string;
    tags: string[];
    description: string;
    date?: string;
    link: string;
};

export const Card = (content: CardContent) => {
    let date = <></>;
    if (content.date !== undefined) {
        date = <p className={styles.date}>{content.date}</p>;
    }

    return (
        <a
            className={styles.title}
            href={content.link}
            rel="noopener noreferrer"
        >
            <div className={styles.card}>
                <h3>{content.title}</h3>
                {date}
            </div>
        </a>
    );
};
