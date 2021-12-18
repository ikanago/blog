export type Config = {
    title: string;
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
    title: `ikanago's blog`,
    author: {
        name: `ikanago`,
        summary: `Student`,
    },
    description: `ikanago's portfolio and blog.`,
    social: {
        twitter: `@ikanag0`,
    }
};

export default config;
