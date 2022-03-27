import React from "react";
import styled from "styled-components";

const Modal = ({
    isOpen,
    onDismiss,
    children,
}: {
    isOpen: boolean;
    children: any;
    onDismiss: any;
}) => {
    return (
        <>
            <Wrapper isOpen={isOpen}>{children}</Wrapper>
            <BlurBackground isOpen={isOpen} onClick={onDismiss} />
        </>
    );
};

export default Modal;

const Wrapper = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: fixed;
    left: 0; top: 0; right: 0; bottom: 0;
    margin: auto;
    padding: 1rem 2rem 2rem;
    max-width: 440px;
    width: 100%;
    height: fit-content;
    border-radius: 22px;
    // background: linear-gradient(to bottom right, blue, violet);
    // background-image: url(${require("../../assets/images/background.jpg")});
    background-image: linear-gradient(140deg, #0d03d9 0%, #ff82ef 100%);
    background-size: cover;
    background-position: center;
    z-index: 999;

    @media(max-width: 768px) {
        width: 410px;
        padding: 1rem;
    }
    @media(max-width: 576px) {
        width: 391px;
      
    }
    @media(max-width: 426px) {
        width: 300px;
    }
`;

const BlurBackground = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    background: #00000070;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;
