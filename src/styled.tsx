import styled from "styled-components";

export const ImageBackground = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 0;
`;

export const WrapperApp = styled.div`
    position: relative;
    width: 100%;
    min-height: calc(100vh - 67px);
    overflow-x: hidden;
    /* background-image: linear-gradient(140deg, #0d03d9 0%, #ff82ef 100%);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */
    display: grid;
    color: white;
    background-attachment: fixed;
    grid-template-columns: 350px auto;
    font-family: "Montserrat", sans-serif;

    @media (min-width: 2500px) {
        grid-template-columns: 500px auto;
    }
    @media (max-width: 1028px) {
        grid-template-columns: 300px auto;
    }
    @media (max-width: 900px) {
        min-height: 100vh;
    }
    @media (max-width: 768px) {
        grid-template-columns: auto;
        grid-template-rows: 60px auto;
    }
    :before {
        content: "";
        display: block;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -10;
        background: linear-gradient(140deg, #0d03d9 0%, #ff82ef 100%) no-repeat
            center center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    ::after {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        opacity: 0.3;
        width: 100vw;
        height: 100vh;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-image: url("../background-line-min.png");
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const WrapperMain = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 80px auto;
    z-index: 1;
    position: relative;

    @media (max-width: 900px) {
        position: absolute;
        display: block;
        top: 4rem;
    }
    @media (max-width: 768px) {
        grid-template-rows: 15px auto;
    }
`;

export const FooterWrapper = styled.div`
    margin-bottom: 1rem;
    @media (min-width: 901px) {
        display: none;
    }
`;
export const FooterWrapper1 = styled.div`
    margin-bottom: 1rem;
    @media (max-width: 900px) {
        display: none;
    }
`;

export const WrapperHeader = styled.div`
    position: fixed;
    height: 71px;
    width: 100%;
    top: 0;
    right: 0;
    z-index: 999;
`;

export const WrapperPages = styled.div`
    width: 100%;
    padding: 0rem 3rem 2rem;
    min-height: 70vh;
    position: relative;
    @media (max-width: 468px) {
        padding: 0rem 1rem 2rem;
    }
    /* @media (max-width: 426px) {
        padding: 0rem;
    } */
`;
