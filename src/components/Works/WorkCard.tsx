import React from "react";
import styles from "./works.module.css";

type Props = {
    title: string,
    description: string,
}

export const WorkCard = ({ title, description }: Props) => {
    return (<div className={styles.workcard}>
        <p className={styles.title}>title</p>
        <p>description</p>
    </div>);
}
