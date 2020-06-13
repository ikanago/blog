import React from "react";
const styles = require("./works.module.css");

type Props = {
    title: string,
    url: string,
    description: string,
}

export const WorkCard = ({ title, url, description }: Props) => {
    return (<div className={styles.workcard}>
        <a className={styles.title} href={url} target="_blank" rel="noopener noreferrer">
            <p>{title}</p>
        </a>
        <p>{description}</p>
    </div>);
}
