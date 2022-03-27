import React from "react";
import styled from "styled-components";
import { shortAddress } from "../../utils";
import copy from "copy-to-clipboard";

const Circle = ({
    size,
    sizeTablet,
    sizeMobile,
    contract,
    token,
}: {
    size?: string;
    sizeTablet?: string;
    sizeMobile?: string;
    contract?: string;
    token?: string;
}) => {
    return !contract && !token ? (
        <CircleGradient
            size={size}
            sizeTablet={sizeTablet}
            sizeMobile={sizeMobile}
        ></CircleGradient>
    ) : (
        <Wrapper>
            <CircleGradientHasContract></CircleGradientHasContract>
            <WrapperImg>
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="200px"
                    height="200px"
                    viewBox="0 0 200 200"
                    enableBackground="new 0 0 300 300"
                    xmlSpace="preserve"
                >
                    <defs>
                        <path
                            id="circlePath"
                            d="M 100, 100 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0"
                        />
                    </defs>
                    <circle cx="150" cy="100" r="75" fill="none" />
                    <g>
                        <use xlinkHref="#circlePath" fill="none" />
                        <text fill="#fff">
                            <textPath
                                xlinkHref="#circlePath"
                                style={{ fontSize: "10px" }}
                            >
                                {contract || token}
                            </textPath>
                        </text>
                    </g>
                </svg>
            </WrapperImg>
            <Address>
                <span>{contract ? "Contract" : "Token"}: </span>
                <span
                    style={{ textDecoration: "underline" }}
                    onClick={() => {
                        window.open(
                            `https://etherscan.io/address/${contract || token}`
                        );
                    }}
                >
                    {shortAddress(contract ? contract : token)}
                </span>
                <svg
                    onClick={() => copy(`${contract || token}`)}
                    data-v-6f722286=""
                    version="1.1"
                    viewBox="0 0 24 24"
                    className="cursor-pointer svg-icon"
                    style={{ width: 20, height: 20, margin: "auto" }}
                >
                    <path
                        stroke="#fff"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        _stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                </svg>
            </Address>
        </Wrapper>
    );
};

export default Circle;

const Wrapper = styled.div`
    position: relative;
    transform: scale(1);
    width: 270px;
    height: 270px;
    margin: auto;
    @media (max-width: 1416px) {
        transform: scale(0.8);
    }
    @media (max-width: 1331px) {
        transform: scale(1);
    }
    @media (max-width: 491px) {
        transform: scale(1.2);
    }
`;

const CircleGradient = styled.div<{
    size?: string;
    sizeTablet?: string;
    sizeMobile?: string;
}>`
    width: ${({ size }) => (size ? size : "200px")};
    height: ${({ size }) => (size ? size : "200px")};
    border-radius:50%;
    background-image: linear-gradient(to top right,#77e45a,#4f92cc);
    -webkit-mask: ${({ size }) =>
        !size
            ? "radial-gradient(transparent 75px,#000 76px)"
            : "radial-gradient(transparent 105px,#000 106px)"};
            mask: ${({ size }) =>
                !size
                    ? "radial-gradient(transparent 75px,#000 76px)"
                    : "radial-gradient(transparent 105px,#000 106px)"};

    margin: auto;

    /* @media only screen and (max-height: 880px) {
        width: 200px;
        height: 200px
        -webkit-mask: ${({ size }) =>
            !size
                ? "radial-gradient(transparent 75px,#000 76px)"
                : "radial-gradient(transparent 80px,#000 81px)"};
            mask: ${({ size }) =>
                !size
                    ? "radial-gradient(transparent 75px,#000 76px)"
                    : "radial-gradient(transparent 80px,#000 81px)"};
    } */

    ${({ sizeTablet }) =>
        sizeTablet
            ? `@media(max-width: 768px) { width: ${sizeTablet}; height: ${sizeTablet}; }`
            : ""};
    ${({ sizeMobile }) =>
        sizeMobile
            ? `@media(max-width: 576px) { width: ${sizeMobile}; height: ${sizeMobile}; -webkit-mask: radial-gradient(transparent 100px,#000 76px); mask: radial-gradient(transparent 90px,#000 76px); }`
            : ""}
`;
const WrapperImg = styled.div`
    width: 270px;
    height: 270px;
    svg {
        width: 100%;
        height: 100%;
    }
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    animation: spinning linear 8s infinite;
    @keyframes spinning {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const CircleGradientHasContract = styled.div<{
    size?: string;
    sizeTablet?: string;
    sizeMobile?: string;
}>`
    width: ${({ size }) => (size ? size : "200px")};
    height: ${({ size }) => (size ? size : "200px")};
    border-radius:50%;
    background-image: linear-gradient(to left top,#0138df,#0082ff,#00b3ff,#00ddda,#3fffac, #08ff48);
    -webkit-mask: ${({ size }) =>
        !size
            ? "radial-gradient(transparent 75px,#000 76px)"
            : "radial-gradient(transparent 110px,#000 111px)"};
            mask: ${({ size }) =>
                !size
                    ? "radial-gradient(transparent 75px,#000 76px)"
                    : "radial-gradient(transparent 110px,#000 111px)"};
    margin: auto;
    left: 0; right: 0; bottom 0; top: 0;
    position: absolute;
    transform: rotate(24deg);

    ${({ sizeTablet }) =>
        sizeTablet
            ? `@media(max-width: 768px) { width: ${sizeTablet}; height: ${sizeTablet}; }`
            : ""};
    ${({ sizeMobile }) =>
        sizeMobile
            ? `@media(max-width: 576px) { width: ${sizeMobile}; height: ${sizeMobile}; -webkit-mask: radial-gradient(transparent 75px,#000 76px); mask: radial-gradient(transparent 75px,#000 76px); }`
            : ""}
`;

const Address = styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    gap: 5px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
`;
