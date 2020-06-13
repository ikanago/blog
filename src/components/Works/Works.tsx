import React from "react";
import { WorkCard } from "./WorkCard";
import { worksList } from "./worksList";
import styles from "./works.module.css";

export const Works = () => {
    const works = worksList.map(work =>
        <WorkCard title={work.title} url={work.url} description={work.description} />
    );
    return (
        <>
            <h2>Works</h2>
            <div className={styles.works}>
                {works}
            </div>
        </>
    );
};
