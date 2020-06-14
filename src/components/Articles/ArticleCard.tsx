import React from "react";
import { Link } from "gatsby";
const styles = require("./articles.module.css");

type Props = {
    slug: string,
    title: string,
    date: string,
};

export const ArticleCard = ({slug, title, date}: Props) => (
    <div className={styles.article_card}>
        <Link to={slug}>
            {title} ({date})
        </Link>
    </div>
);
