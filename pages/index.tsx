import React from "react";

import Layout from "../components/Layout";
import { SEO } from "../components/seo";
import { Articles } from "../components/Articles";
import { getAllPosts } from "../lib/blog";
import config from "../lib/config";

type Props = {
  props: {
    posts: Post[];
  };
};

export const getStaticProps = (): Props => {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
};

const IndexPage = ({ posts }: Props["props"]): JSX.Element => {
  return (
    <Layout>
      <>
        <SEO title="ikanago's blog" />
        <div style={{
          paddingTop: "2rem"
        }}>
          <h1>{config.title}</h1>
          <Articles posts={posts} />
        </div>
      </>
    </Layout >
  );
};

export default IndexPage;
