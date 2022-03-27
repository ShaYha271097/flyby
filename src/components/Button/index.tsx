import styled from "styled-components";

export const Button = styled.button<{ background?: string }>`
    outline: none;
    border-radius: 12px;
    padding: 8px 22px;
    font-size: 1rem;
    color: white;
    ${({ background }) =>
        background
            ? "background:" + background
            : "background-image: linear-gradient(to right,#00f024 0%,#09b3ca 38%,#1a7ade 80%);"};
    background-size: 200%;
    background-position: left;
    transition: all ease-in-out 0.5s;
    border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 300;
    font-family: "Montserrat", sans-serif;
    &:hover {
        background-position: right;
        cursor: pointer;
    }
    height: fit-content;
    @media (max-width: 576px) {
        padding: 8px 16px;
        border-radius: 10px;
    }
`;
