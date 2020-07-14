type Props = {
    data: badge[];
};

export type badge = {
    link: string;
    badgeLink: string;
    title: string;
};

export const badgeData: Props = {
    data: [
        {
            link: "https://github.com/ikanago",
            badgeLink:
                "https://img.shields.io/badge/GitHub-ikanago-brightgreen?style=flat&logo=github",
            title: "ikanago",
        },
        {
            link: "https://twitter.com/ikanag0",
            badgeLink:
                "https://img.shields.io/badge/Twitter-ikanag0-1A91DA?style=flat&logo=twitter",
            title: "ikanag0",
        },
        {
            link: "https://atcoder.jp/users/ikanago",
            badgeLink:
                "https://img.shields.io/endpoint?url=https%3A%2F%2Fatcoder-badges.now.sh%2Fapi%2Fatcoder%2Fjson%2Fikanago",
            title: "ikanago",
        },
        {
            link: "https://ejje.weblio.jp/content/struggle",
            badgeLink:
                "https://img.shields.io/badge/Always-struggling-red?style=flat",
            title: "😵",
        },
    ],
};
