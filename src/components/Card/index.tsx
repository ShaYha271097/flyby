import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BackgroundCard from "../../assets/images/card/br500x700-1.png";

const Card = ({
    children,

    width,
    maxWidth,
    minWidth,
    background,
}: {
    children: JSX.Element;
    width?: string;
    maxWidth?: string;
    minWidth?: string;
    background?: string;
}) => {
    const [backgroundCard, setBackgroundCard]: any = useState();
    const backgroundLocalStorage = localStorage.getItem("br500x700-1");
    useEffect(() => {
        if (backgroundLocalStorage) {
            setBackgroundCard(backgroundLocalStorage);
        } else {
            localStorage.setItem("br500x700-1", BackgroundCard);
            setBackgroundCard(BackgroundCard);
        }
    }, []);
    return (
        <Wrapper
            width={width}
            maxWidth={maxWidth}
            minWidth={minWidth}
            background={background}
            backgroundDefault={backgroundCard}
        >
            {children}
        </Wrapper>
    );
};

export default Card;

const Wrapper = styled.div<{
    width?: string;
    maxWidth?: string;
    minWidth?: string;
    background?: string;
    backgroundDefault?: string;
}>`
    background-image: ${({ background, backgroundDefault }) =>
        background ? `url(${background})` : `url(${backgroundDefault})`};
    background-size: cover;
    background-position: center;
    border-radius: 22px;
    padding: 1.5rem;
    width: ${({ width }) => width};
    max-width: ${({ maxWidth }) => maxWidth};
    min-width: ${({ minWidth }) => minWidth};
    cursor: pointer;
    font-style: italic;
    font-family: "Montserrat", sans-serif;
    @media (max-width: 1331px) {
        width: 80%;
    }
    @media (max-width: 926px) {
        width: 70%;
    }
    @media (max-width: 900px) {
        width: 80%;
        min-width: 492px;
    }
    @media (max-width: 566px) {
        width: 100%;
        transform: scale(0.8);
        margin: -32px 0 -80px;
    }
    @media (max-width: 491px) {
        margin: -70px 0 -90px;
    }
    @media (max-width: 442px) {
        min-width: 429px;
    }
    @media (max-width: 390px) {
        min-width: 405px;
    }
    @media (max-width: 349px) {
        min-width: 390px;
    }
`;
