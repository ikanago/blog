import React from "react";
import { Container } from "../Container";
import { worksList } from "./worksList";

export const Works = () => {
    const works = worksList.map(work => {
        return {
            title: work.title,
            link: work.url,
            description: work.description
        };
    });
    return (
        <Container sectionName="Works" contents={works} />
    );
};
