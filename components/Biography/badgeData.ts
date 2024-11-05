type Props = {
  data: badge[];
};

export type badge = {
  link: string;
  badgeLink: string;
  title: string;
  alt: string;
};

export const badgeData: Props = {
  data: [
    {
      link: "https://github.com/ikanago",
      badgeLink:
        "https://img.shields.io/badge/GitHub-ikanago-brightgreen?style=flat&logo=github",
      title: "ikanago",
      alt: "Link to ikanago's GitHub.",
    },
    {
      link: "https://twitter.com/ikanag0",
      badgeLink:
        "https://img.shields.io/badge/Twitter-ikanag0-1A91DA?style=flat&logo=twitter",
      title: "ikanag0",
      alt: "Link to ikanago's Twitter.",
    },
  ],
};
