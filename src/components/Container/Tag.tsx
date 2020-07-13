import React from "react";
const styles = require("./container.module.css");

export type TagName = {
    tag_name: string;
};

export const Tag = ({ tag_name }: TagName) => (
    <div className={styles.tag}>
        {tag_name}
    </div>
);
