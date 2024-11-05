export type Config = {
  title: string;
  hostname: string;
  author: {
    name: string;
    summary: string;
  };
  description: string;
  social: {
    twitter: string;
  };
};

const config: Config = {
  title: "ごきげんまっすぐ",
  hostname: "blog.ikanago.dev",
  author: {
    name: "ikanago",
    summary: "Student",
  },
  description: `ikanago's blog`,
  social: {
    twitter: "@ikanag0",
  },
};

export default config;
