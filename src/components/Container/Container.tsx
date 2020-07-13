import React from "react";
import { Card, CardContent } from "./Card";
const styles = require("./container.module.css");

type Props = {
    backgroundColor: string;
    sectionName: string;
    contents: CardContent[];
};

export const Container = ({
    backgroundColor,
    sectionName,
    contents,
}: Props) => {
    const cards = contents.map(content => (
        <Card
            title={content.title}
            description={content.description}
            tags={content.tags}
            date={content.date}
            link={content.link}
        />
    ));
    return (
        <div
            className={styles.container}
            style={{ backgroundColor: backgroundColor }}
        >
            <h2 className={styles.section_name}>{sectionName}</h2>
            <div className={styles.cards}>{cards}</div>
        </div>
    );
};
