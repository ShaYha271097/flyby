import React from 'react'
import styled from 'styled-components';

const CountDownCircle = ({ startTime, endTime }: { startTime?: any, endTime?: any }) => {
    let percent = 1010
    if (startTime && endTime) {
        const now = new Date().getTime()
        if ((Number(now) / 1000) < Number(endTime)) {
            const time = ((Number(now) / 1000) - Number(startTime)) / (Number(endTime) - Number(startTime)) * 100
            percent = 505 + (1010 - 505) * time / 100
        } else {
            percent = 1010
        }
    }
    return (
        <>
            <Animate percent={percent}>
                <svg className="svg_animation" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <circle id="circle" className="circle_animation" r="80" cy="100" cx="100" strokeWidth="20" stroke="url('#colorGradient')" fill="none" />
                    </g>
                    <defs>
                        <linearGradient id="colorGradient" gradientTransform="rotate(70)">
                            <stop offset="50%"  stopColor="#77e45a" />
                            <stop offset="100%" stopColor="#4f92cc" />
                        </linearGradient>
                    </defs>
                </svg>
                <svg className="svg_animation_bg" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <circle id="circle" className="circle_animation_bg" r="80" cy="100" cx="100" strokeWidth="20" stroke="#fff" fill="none"/>
                    </g>
                </svg>
            </Animate>
        </>
    )
}

const Animate = styled.div<{ percent: any }>`
    margin: auto;
    display: flex;
    justify-content: center;
    position: relative;
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
        stroke-dasharray: 505;
        stroke-dashoffset: ${({ percent }) => percent};
        transition: all 1s linear;
    }
    .circle_animation_bg {
        stroke-dasharray: 505;
        transition: all 1s linear;
    }
`;

export default CountDownCircle
