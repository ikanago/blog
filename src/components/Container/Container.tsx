import React from "react"
import { Card, CardContent } from "./Card";
const styles = require("./container.module.css");

type Props = {
    sectionName: string;
    contents: CardContent[];
};

export const Container = ({sectionName, contents}: Props) => {
    const cards = contents.map(content =>
        <Card
            title={content.title}
            description={content.description}
            date={content.date}
            link={content.link}
        />
    );
    return (
        <div className={styles.container}>
            <h2 className={styles.section_name}>{sectionName}</h2>
            <div className={styles.cards}>
                {cards}
            </div>
        </div>
    );
};