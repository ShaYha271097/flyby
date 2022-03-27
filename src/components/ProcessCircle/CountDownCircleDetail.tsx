import React, { useRef, useEffect, useState } from "react";
import { getTimeCountCircle } from "../../utils/getTimeCountDown";
import styled from "styled-components";

const CountDownCircleDetail = ({
    startTime,
    endTime,
    coin,
}: {
    startTime?: any;
    endTime?: any;
    coin?: any;
}) => {
    const t: any = useRef();
    const [, setSeconds] = useState(0);

    useEffect(() => {
        const tick = () => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        };
        t.current = setInterval(() => tick(), 1000);
    }, []);
    const now = new Date().getTime();
    if (now >= endTime * 1000) clearInterval(t.current);

    let timeCoundDown: any = { percent: 1508 };
    if (startTime && endTime)
        timeCoundDown = getTimeCountCircle(startTime, endTime, "754", "1508");

    return (
        <Detail>
            <AnimateDetail
                percent={
                    timeCoundDown.percent > 1508 ? 1508 : timeCoundDown.percent
                }
            >
                <Img src={coin} />
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
                            strokeWidth="25"
                            stroke="url('#colorGradient')"
                            fill="none"
                        />
                    </g>
                    <defs>
                        <linearGradient
                            id="colorGradient"
                            gradientTransform="rotate(-10)"
                        >
                            <stop offset="0%" stopColor="#0082ff" />
                            <stop offset="30%" stopColor="#00b3ff" />
                            <stop offset="50%" stopColor="#00ddda" />
                            <stop offset="95%" stopColor="#3fffac" />
                            <stop offset="100%" stopColor="#08ff48" />
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
                            strokeWidth="25"
                            stroke="#fff"
                            fill="none"
                        />
                    </g>
                </svg>
            </AnimateDetail>
        </Detail>
    );
};

const AnimateDetail = styled.div<{ percent: any }>`
    width: 300px;
    height: 300px;
    margin: auto;
    display: flex;
    justify-content: center;
    z-index: 0;
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
        stroke-dasharray: 754;
        stroke-dashoffset: ${({ percent }) => percent};
        transition: all 1s linear;
    }
    .circle_animation_bg {
        stroke-dasharray: 754;
        transition: all 1s linear;
    }
    // @media (max-width: 600px) {
    //     transform: scale(0.85);
    // }
    // @media (max-width: 436px) {
    //     transform: scale(0.8);
    // }
    // @media (max-width: 406px) {
    //     transform: scale(0.7);
    // }
`;

const Detail = styled.div`
    display: flex;
    justify-content: center;
`;
const Img = styled.img`
    position: absolute;
    width: 35px;
    z-index: 3;
    top: 12px;
`;

export default CountDownCircleDetail;
