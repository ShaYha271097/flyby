import React from "react";
import styled from "styled-components";

const StepCircle = ({ percent }: { percent?: any }) => {
    percent = Number(percent);
    let text =
        percent === 1
            ? "Auction type"
            : percent === 2
            ? "Auction Token"
            : percent === 3
            ? "Auction Setting"
            : "Preview Auction";
    return (
        <>
            <Animate percent={percent}>
                <Percent>{text}</Percent>
                <svg
                    className="svg_animation"
                    width="300"
                    height="300"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        <circle
                            id="circle"
                            className="circle_animation"
                            r="120"
                            cy="150"
                            cx="150"
                            strokeWidth="20"
                            stroke="url('#colorGradient')"
                            fill="none"
                        />
                    </g>
                    <defs>
                        <linearGradient
                            id="colorGradient"
                            gradientTransform="rotate(45)"
                        >
                            <stop offset="5%" stopColor="#77e45a" />
                            <stop offset="95%" stopColor="#64bc95" />
                        </linearGradient>
                    </defs>
                </svg>
                <svg
                    className="svg_animation_bg"
                    width="300"
                    height="300"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g>
                        <circle
                            id="circle"
                            className="circle_animation_bg"
                            r="120"
                            cy="150"
                            cx="150"
                            strokeWidth="20"
                            stroke="#fff"
                            fill="none"
                        />
                    </g>
                </svg>
            </Animate>
        </>
    );
};

const Animate = styled.div<{ percent: any }>`
    margin: auto;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: -1;
    .svg_animation {
        position: absolute;
        -webkit-transform: rotate(-90deg);
        transform: rotate(-90deg);
        z-index: 2;
    }
    .svg_animation_bg {
        -webkit-transform: rotate(-90deg);
        transform: rotate(-90deg);
    }
    .circle_animation {
        stroke-dasharray: 756;
        stroke-dashoffset: ${({ percent }) =>
            percent === 1
                ? "567"
                : percent === 2
                ? "378"
                : percent === 3
                ? "189"
                : "0"};
        transition: all 1s linear;
    }
    .circle_animation_bg {
        stroke-dasharray: 756;
        transition: all 1s linear;
    }
    @media (max-width: 324px) {
        transform: scale(0.8);
    }
`;

const Percent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.3rem;
`;

export default StepCircle;
