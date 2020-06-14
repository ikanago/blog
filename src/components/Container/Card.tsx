import React from "react";
const styles = require("./container.module.css");

export type CardContent = {
    title: string;
    description?: string;
    date?: string;
    link?: string;
};

export const Card = (content: CardContent) => {
    let title = <h2>{content.title}</h2>;
    let description = <></>;
    let date = <></>;
    if (content.description !== undefined) {
        description = <p>{content.description}</p>;
    }
    if (content.date !== undefined) {
        date = <p>{content.date}</p>;
    }
    if (content.link !== undefined) {
        title = (
            <a
                className={styles.title}
                href={content.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                {title}
            </a>
        );
    }

    return (
        <div className={styles.card}>
            <>
                {title}
                {description}
                {date}
            </>
        </div>
    );
};
