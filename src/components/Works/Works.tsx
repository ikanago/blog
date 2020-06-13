import React from "react";
import { WorkCard } from "./WorkCard";
import { worksList } from "./worksList";
import styles from "./works.module.css";

export const Works = () => {
    const works = worksList.map(work => (<WorkCard title={work.title} description={work.description} />));
    return (<div className={styles.works}>
        {works}
    </div>);
};
