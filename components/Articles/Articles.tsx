import Link from "next/link";
import React from "react";
const styles = require("./articles.module.css");

type Props = {
  posts: Post[];
};

export const Articles = ({ posts }: Props) => {
  const frontMatters = posts.map((post) => {
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      tags: post.frontmatter.tags,
      date: post.frontmatter.createdAt,
      link: post.frontmatter.slug,
    };
  });
  const cards = frontMatters.map((content, i) => (
    <Article
      key={i}
      title={content.title}
      description={content.description}
      tags={content.tags}
      date={content.date}
      link={content.link}
    />
  ));
  return (
    <section className={styles.section}>
      {cards}
    </section>
  )
};

type ArticleContent = {
  title: string;
  tags: string[];
  description: string;
  date?: string;
  link: string;
};

const Article = (content: ArticleContent) => {
  let date = <></>;
  if (content.date !== undefined) {
    date = <p className={styles.date}>{content.date}</p>;
  }

  return (
    <Link href={content.link} className={styles.article} rel="noopener noreferrer">
      <article >
        <h3>{content.title}</h3>
        {date}
      </article>
    </Link>
  );
};
