import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
    /* min-height: 80vh;
    height: calc(100vh - 160px - 9rem) !important; */
    /* position: relative; */
    a {
        color: white;
        text-decoration: none;
    }
    @media (max-width: 900px) {
        min-height: 75vh;
    }
    @media (max-width: 576px) {
        margin-top: 10%;
        padding: 0rem 1rem 2rem;
        height: 100% !important;
    }
    @media (max-width: 355px) {
        margin-top: 13%;
    }
    .LogoFlyby {
        padding-left: 10px;
        font-style: italic;
        @media (max-width: 494px) {
            font-size: 3rem;
        }
        @media (max-width: 430px) {
            font-size: 2.5rem;
        }
        @media (max-width: 376px) {
            font-size: 2rem;
        }
        @media (max-width: 322px) {
            font-size: 1.8rem;
        }
    }
    .imgFlyby {
        @media (max-width: 494px) {
            width: 60px;
        }
        @media (max-width: 386px) {
            width: 50px;
        }
        @media (max-width: 332px) {
            width: 40px;
        }
    }
`;

export const FlybyImg = styled.div``;

export const WrapperCircle = styled.div`
    margin: 5vh 0;
    position: relative;

    @media (max-width: 900px) {
        margin: 2rem 0;
    }
`;
export const TxtIconImg = styled.text`
    font-style: italic;
    font-size: 35px;
    min-width: 223px;
    margin-bottom: 5px;
    @media (max-width: 1565px) {
        font-size: 30px;
    }
    @media (max-width: 1384px) {
        font-size: 25px;
    }
    @media (max-width: 1122px) {
        font-size: 20px;
    }
    @media (max-width: 900px) {
        font-size: 25px;
    }
    @media (max-width: 758px) {
        font-size: 20px;
    }
    @media (max-width: 542px) {
        font-size: 25px;
    }
    @media (max-width: 414px) {
        font-size: 20px;
    }
`;
export const TxtLive = styled.text`
    a{
        color: #fff;
        position: absolute;
        font-size: 38px;
        font-style: italic;
        top: 48%;
        left: 41%;
        @media (max-width:1714px){
            left: 38%;
        }
        @media (max-width:1488px){
            font-size: 30px;
        }
        @media (max-width:1286px){
            font-size: 25px;
        }
        @media (max-width:1118px){
            font-size: 20px;
        }
        @media (max-width:956px){
            font-size: 18px;
            top: 44%;
        }
        @media (max-width:900px){
            font-size: 25px;
            top: 48%;
        }
        @media (max-width:826px){
            font-size: 20px;
        }
        @media (max-width:646px){
            font-size: 18px;
            top: 44%;
        }
        @media (max-width:542px){
            font-size: 25px;
            top: 48%;
        }
        @media (max-width:472px){
            font-size: 20px;
        }
        @media (max-width:384px){
            font-size: 18px;
            top: 44%;
        }    
    }
}
`;

export const TextSpace = styled.text`
    font-size: 1.5rem;
    @media (max-width: 572px) {
        text-align: center;
    }
    @media (max-width: 376px) {
        font-size: 1.2rem;
    }
`;
export const Txt = styled.div`
    margin-top: 20px;
`;

export const Empty = styled.div`
    width: 100%;
    height: 70px;
    @media (max-width: 542px) {
        display: none;
    }
`;

export const Line1 = styled.div`
    margin: auto;
    display: flex;
    justify-content: space-between;
    height: auto;
    align-items: end;
    text-align: center;
    margin: 30px auto;
    img {
        width: 100%;
        max-width: 400px;
    }
    @media (max-width: 542px) {
        flex-direction: column;
        max-height: fit-content;
        align-items: center;
        margin-top: 50px;
    }
`;

export const ImgLine1 = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    @media (max-width: 542px) {
        width: 50%;
        margin-bottom: 20px;
    }
    .LastTxtIcon {
        margin-bottom: 25px;
    }
    .StartupImg {
        width: 75%;
        padding-bottom: 10px;
        max-width: 300px;
    }
    .Legend {
        position: absolute;
        bottom: -1px;
        overflow: hidden;
    }

    .LegendImg {
        padding-bottom: 20px;
    }
    .TxtStartup {
        overflow: hidden;
    }
`;
export const LegendTxtInsdie = styled.div`
    padding: 10px 20px;
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);

    -moz-animation: my-animation 15s linear infinite;
    -webkit-animation: my-animation 15s linear infinite;
    animation: my-animation 7s linear infinite;
    :hover {
        cursor: pointer;
    }
    @-webkit-keyframes my-animation {
        from {
            -webkit-transform: translateX(100%);
        }
        to {
            -webkit-transform: translateX(-100%);
        }
    }

    @keyframes my-animation {
        from {
            -moz-transform: translateX(100%);
            -webkit-transform: translateX(100%);
            transform: translateX(100%);
        }
        to {
            -moz-transform: translateX(-100%);
            -webkit-transform: translateX(-100%);
        }
        transform: translateX(-100%);
    }
`;
export const LegendTxtInsdieLink = styled(NavLink)`
    padding: 10px 20px;
    -moz-transform: translateX(100%);
    -webkit-transform: translateX(100%);
    transform: translateX(100%);

    -moz-animation: my-animation 15s linear infinite;
    -webkit-animation: my-animation 15s linear infinite;
    animation: my-animation 7s linear infinite;
    :hover {
        cursor: pointer;
    }
    @-webkit-keyframes my-animation {
        from {
            -webkit-transform: translateX(100%);
        }
        to {
            -webkit-transform: translateX(-100%);
        }
    }

    @keyframes my-animation {
        from {
            -moz-transform: translateX(100%);
            -webkit-transform: translateX(100%);
            transform: translateX(100%);
        }
        to {
            -moz-transform: translateX(-100%);
            -webkit-transform: translateX(-100%);
        }
        transform: translateX(-100%);
    }
`;
export const TxtLine1 = styled.text`
    border-radius: 13px;
    border: 1px solid white;
    width: fit-content;
    background-color: #ffffff4f;
    font-style: italic;
    font-size: 25px;
    @media (max-width: 1598px) {
        font-size: 20px;
    }
    @media (max-width: 1386px) {
        font-size: 18px;
    }
    @media (max-width: 1286px) {
        font-size: 15px;
    }
    @media (max-width: 1166px) {
        font-size: 13px;
    }
    @media (max-width: 1089px) {
        font-size: 11px;
    }
    @media (max-width: 961px) {
        font-size: 9px;
    }
    @media (max-width: 900px) {
        font-size: 15px;
    }
    @media (max-width: 816px) {
        font-size: 13px;
    }
    @media (max-width: 715px) {
        font-size: 11px;
    }
    @media (max-width: 637px) {
        font-size: 9px;
    }
    @media (max-width: 542px) {
        font-size: 13px;
    }
    @media (max-width: 517px) {
        font-size: 11px;
    }
    @media (max-width: 461px) {
        font-size: 9px;
    }
    @media (max-width: 405px) {
        font-size: 7px;
    }
`;
export const TxtLine0 = styled(NavLink)`
    border-radius: 13px;
    border: 1px solid white;
    width: fit-content;
    background-color: #ffffff4f;
    font-style: italic;
    font-size: 25px;
    @media (max-width: 1598px) {
        font-size: 20px;
    }
    @media (max-width: 1386px) {
        font-size: 18px;
    }
    @media (max-width: 1286px) {
        font-size: 15px;
    }
    @media (max-width: 1166px) {
        font-size: 13px;
    }
    @media (max-width: 1089px) {
        font-size: 11px;
    }
    @media (max-width: 961px) {
        font-size: 9px;
    }
    @media (max-width: 900px) {
        font-size: 15px;
    }
    @media (max-width: 816px) {
        font-size: 13px;
    }
    @media (max-width: 715px) {
        font-size: 11px;
    }
    @media (max-width: 637px) {
        font-size: 9px;
    }
    @media (max-width: 542px) {
        font-size: 13px;
    }
    @media (max-width: 517px) {
        font-size: 11px;
    }
    @media (max-width: 461px) {
        font-size: 9px;
    }
    @media (max-width: 405px) {
        font-size: 7px;
    }
`;

const rotateAnimationOutside = keyframes`
    0% {
        transform: rotate(-360deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;
const rotateAnimationOutsideLogo = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }
`;

export const IconMainnet = styled.div`
    width: 100%;
    height: 100%;
    animation: ${rotateAnimationOutside} 15s linear infinite;
    img {
        position: absolute;
        max-width: 75px;
        width: 100%
        animation: ${rotateAnimationOutsideLogo} 15s linear infinite;
        @media (max-width: 1652px) {
            width: 65px;
        }
        @media (max-width: 1450px) {
            width: 50px;
        }
        @media (max-width: 1220px) {
            width: 40px;
        }
        @media (max-width: 1116px) {
            width: 35px;
        }
        @media (max-width: 950px) {
            width: 30px;
        }
        @media (max-width: 900px) {
            width: 40px;
        }
        @media (max-width: 710px) {
            width: 30px;
        }
        @media (max-width: 542px) {
            width: 40px;
        }
        @media (max-width: 448px) {
            width: 35px;
        }
        @media (max-width: 386px) {
            width: 30px;
        }
    }
    .coin1 {
        bottom: 90%;
        left: 43%;
    }
    .coin2 {
        top: 40%;
        left: -9%;
    }
    .coin3 {
        top: 90%;
        left: 43%;
    }
    .coin4 {
        top: 40%;
        right: -9%;
    }
`;
export const IconImg = styled.div`
    position: relative;
`;
export const IconOutside = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
`;
export const Rockets = styled.div`
    width: 30%;
    margin: auto;
    img {
        /* height: 100%; */
        width: 100%;
    }
`;

export const Time = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    display: flex;
    gap: 5px;
    font-size: 1.2rem;
    font-weight: 600;
`;
