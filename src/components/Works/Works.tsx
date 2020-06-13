import React from "react";
import { WorkCard } from "./WorkCard";
import styles from "./works.module.css";

export const Works = () => (
    <div className={styles.works}>
        <WorkCard title="ycc" description="hoge" />
        <WorkCard title="ycc" description="hoge" />
        <WorkCard title="ycc" description="hoge" />
        <WorkCard title="ycc" description="hoge" />
    </div>
);