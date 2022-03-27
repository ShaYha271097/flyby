import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Nav = styled(NavLink)`
    padding: left: 1rem;
    font-size: 1rem;
    margin-top: 1rem;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
    background-image: linear-gradient(to right,#7cf95b,#4da2ea);
    color: #fff;
    width: 150px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    gap: 1rem;
`;

export const AuctionType = styled.div`
    text-align: center;
    display: flex;
    justify-content: space-between;
    .TextAuction {
        @media (max-width: 1249px) and (min-width: 1244px) {
            font-size: 0.9rem;
        }
        @media (max-width: 406px) {
            font-size: 0.8rem;
        }
    }
`;
export const TypeAuctionButton = styled.div`
    display: flex;
    justify-content: space-between;
    width: fit-content;
    /* margin: 10px auto; */
`;

export const ImgSocialNetwork = styled.img`
    width: 1.5rem;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    max-width: 1600px;
    margin: auto;
    position: relative;
    a {
        color: white;
        text-decoration: none;
    }

    justify-content: center;
    @media (max-width: 1050px) {
        justify-content: space-between;
    }
    @media (max-width: 900px) {
        justify-content: center;
    }
`;

export const WrapperAction = styled.div`
    width: 100%;
    padding: 5px;
    text-align: center;
`;

export const ButtonAction = styled.button`
    padding: 10px 15px;
    background-image: linear-gradient(to right, #7cf95b, #4da2ea);
    border-radius: 12px;
    cursor: pointer;
    font-size: 1.3rem;
    color: #fff;
    border: 0;
    :disabled {
        color: #fff;
        font-style: italic;
        cursor: not-allowed;
        border: 1px solid #fff;
        background: #e574ed2e;
        font-family: "Montserrat", sans-serif;
    }
`;

export const WrapperTypeAuction = styled.div<{
    background?: string;
    border?: string;
}>`
    min-width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: ${({ background }) =>
        !background ? "linear-gradient(to right,#7cf95b,#4da2ea)" : background};
    border-radius: 10px;
    border: ${({ border }) => (border ? border : "0")};
    @media (max-width: 576px) {
        min-width: 100px;
    }
    @media (max-width: 432px) {
        min-width: 90px;
    }
    @media (max-width: 386px) {
        min-width: 80px;
    }
    .TextButton {
        @media (max-width: 1413px) {
            font-size: 1rem;
        }
        @media (max-width: 1332px) and (min-width: 1244px) {
            font-size: 0.9rem;
        }
        // @media (max-width: 432px) {
        //     font-size: 0.8rem;
        // }
    }
`;

export const LinkSocial = styled.a`
    display: flex;
    align-items: center;
`;

export const About = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const InnerCard = styled.div`
    .timeCount {
        @media (max-width: 1328px) and (min-width: 1246px) {
            display: flex;
            flex-direction: column;
        }
    }
`;

export const HeaderCard = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const TimeBox = styled.div`
    display: flex;
    text-align: center;
    border: 1px solid white;
    border-radius: 12px;
    height: fit-content;

    & > div {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 0 5px;
        @media (max-width: 1270px) and (min-width: 1245px) {
            padding: 0 3px;
        }
        @media (max-width: 418px) {
            padding: 0 3px;
        }
        @media (max-width: 351px) {
            padding: 0 1px;
        }
    }
    padding: 5px 10px;
    span {
        font-size: 0.9rem;
    }
`;

export const GroupCircle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: no-wrap;

    @media (max-width: 491px) {
        flex-wrap: wrap;
    }
    .circle1 {
        margin-right: -30px;
        @media (max-width: 1416px) {
            margin-right: -80px;
        }
        @media (max-width: 1331px) {
            margin-right: -30px;
        }
        @media (max-width: 491px) {
            margin-right: 0;
        }
    }
`;

export const WrapperCircle = styled.div`
    position: relative;
    & > p {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
        width: fit-content;
        height: fit-content;
    }
`;

export const WrapperDutchAuction = styled.div`
    max-width: 100%;
    width: 100%
    margin: 0 auto;
`;
export const ProgressTooltip = styled.div`
    position: relative;
    padding-top: 50px;
`;
export const StartPrice = styled.span`
    align-items: center;
    background: linear-gradient(to right, #7cf95b, #4da2ea);
    border: 1px solid linear-gradient(to right, #7cf95b, #4da2ea);
    border-radius: 10px;
    box-shadow: 0 0 2px linear-gradient(to right, #7cf95b, #4da2ea);
    color: #7856ff;
    display: inline-flex;
    font-family: sans-serif;
    justify-content: center;
    height: 35px;
    position: absolute;
    top: 5px;
    left: 0;
    text-align: center;
    width: 55px;
    font-size: 0.7rem;
`;
export const EndPrice = styled.span`
    align-items: center;
    background: linear-gradient(to right, #7cf95b, #4da2ea);
    border: 1px solid linear-gradient(to right, #7cf95b, #4da2ea);
    border-radius: 10px;
    box-shadow: 0 0 2px linear-gradient(to right, #7cf95b, #4da2ea);
    color: #7856ff;
    display: inline-flex;
    font-family: sans-serif;
    justify-content: center;
    height: 35px;
    position: absolute;
    top: 5px;
    right: 0;
    text-align: center;
    width: 55px;
    font-size: 0.7rem;
`;
export const ProgressTooltipInfo = styled.span`
    align-items: center;
    background: linear-gradient(to right, #7cf95b, #4da2ea);
    border: 1px solid linear-gradient(to right, #7cf95b, #4da2ea);
    border-radius: 10px;
    box-shadow: 0 0 2px linear-gradient(to right, #7cf95b, #4da2ea);
    color: #7856ff;
    display: inline-flex;
    font-family: sans-serif;
    justify-content: center;
    height: 35px;
    position: absolute;
    top: 5px;
    left: 0;
    text-align: center;
    transform: translateX(calc(-50% - 5px));
    width: 55px;
    left: 45% !important;
    font-size: 0.8rem;
    ::before {
        content: "";
        display: inline-block;
        border: 7px solid transparent;
        border-top-color: #5bacac;
        position: absolute;
        bottom: -13px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 8px;
        border-top-color: linear-gradient(to right, #7cf95b, #4da2ea);
        bottom: -16px;
        left: 50%;
    }
    ::after {
        content: "";
        display: inline-block;
        border: 7px solid transparent;
        border-top-color: #5bacac;
        position: absolute;
        bottom: -13px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
    }
`;
export const Progress = styled.input`
    -moz-appearance: none;
    -webkit-appearance: none;
    border: none;
    border-radius: 5px;
    display: block;
    font-family: sans-serif;
    height: 10px;
    overflow: hidden;
    padding: 0;
    position: relative;
    width: 100%;
    ::-webkit-progress-bar {
        background-color: #ccc;
    }
    ::-webkit-progress-value {
        border-radius: 5px;
        background-color: #7856ff;
        background-image: linear-gradient(to right, #7cf95b, #4da2ea);
    }
    ::-moz-progress-bar {
        border-radius: 5px;
        background-color: #7856ff;
        background-image: linear-gradient(to right, #7cf95b, #4da2ea);
    }
    ::-ms-fill {
        border-radius: 5px;
        background-color: #7856ff;
        background-image: linear-gradient(to right, #7cf95b, #4da2ea);
        border: none;
    }
`;

export const DragBar = styled.input`
    width: 100%;
    margin: 1rem 0;
    background: linear-gradient(
        90deg,
        rgb(26, 188, 156) 80%,
        rgb(215, 220, 223) 80.1%
    );
    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #77f06d;
        cursor: pointer;
        -webkit-transition: background 0.15s ease-in-out;
        transition: background 0.15s ease-in-out;
    }
    ::-webkit-slider-thumb:hover {
        background: #1abc9c;
    }
    :active::-webkit-slider-thumb {
        background: #1abc9c;
    }
    ::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border: 0;
        border-radius: 50%;
        background: #77f06d;
        cursor: pointer;
        -moz-transition: background 0.15s ease-in-out;
        transition: background 0.15s ease-in-out;
    }
    ::-moz-range-thumb:hover {
        background: #1abc9c;
    }
    &:active::-moz-range-thumb {
        background: #1abc9c;
    }
    &:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 3px #fff, 0 0 0 6px #1abc9c;
    }
`;

export const CommitBar = styled.div`
    display: flex;
    position: relative;
    margin-top: 1rem;
    width: 100%;
    justify-content: space-between;

    & > input {
        font-size: 18px;
        background: none;
        border: 1px solid white;
        border-radius: 10px;
        outline: none;
        padding: 5px 20px;
        margin-right: 5px;
        width: 100%;
        color: #fff;
        background-color: #ffffff4f;
        font-family: "Montserrat", sans-serif;
        ::placeholder {
            color: #fff;
        }
    }
`;

export const CommitButton = styled.button`
    outline: none;
    border-radius: 10px;
    padding: 8px 16px;
    font-size: 1rem;
    color: white;
    font-style: italic;
    font-family: "Montserrat", sans-serif;
    background-image: linear-gradient(
        to right,
        #4da2ea 0%,
        #5ec1ad 39%,
        #73e86b 71%,
        #7cf95b 100%
    );
    background-size: 200%;
    background-position: left;
    transition: all ease-in-out 0.5s;
    border: 1px solid white;
    &:hover {
        background-position: right;
        cursor: pointer;
    }
    height: fit-content;
    :disabled {
        background: #ef75bd;
        opacity: 0.5;
    }
    @media (max-width: 768px) {
        padding: 10px 16px;
    }
`;

export const RangSlider = styled.div`
    margin: 60px 0 0 0%;
    width: 100%;
`;
export const FooterInfo = styled.div`
    margin: 60px 0 0 0%;
    width: 100%;
`;
export const TitleFooter = styled.div`
    margin: 60px 0 0 0%;
    width: 100%;
`;
export const FooterInfoForbit = styled.div`
    width: 100%;
`;

export const TitleForbit = styled.div``;

export const ColTitle = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding: 10px;
`;
export const IconWebsite = styled.div`
    a {
        img {
            width: 27px;
        }
    }
`;
export const SocialIcon = styled.div`
    border-radius: 16px;
    background-color: #d4c6df;
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    margin-top: 10px;
    a {
        display: flex;
        align-items: center;
    }
    &:hover {
        background-color: #0082fe;
    }
    @media (max-width: 400px) {
        width: 25px;
        height: 25px;
    }
`;

export const SocialFooter = styled.div`
    width: 80%;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    img {
        width: 20px;
        height: auto;
        @media (max-width: 432px) {
            width: 18px;
        }
    }
    @media (max-width: 400px) {
        width: 90%;
    }
`;
export const SocialIconOutside = styled.div`
    display: flex;
`;
export const Column1 = styled.div``;
export const Column2 = styled.div``;

export const IconLeftTxt = styled.div`
    display: flex;
    align-items: center;
    padding-left: 5px;
    margin-top: 10px;
    font-size: 13px;
    &:hover {
        text-shadow: #fff 1px 0 10px;
    }
    @media (max-width: 358px) {
        font-size: 10px;
    }
`;
export const IconRightTxt = styled.div`
    display: flex;
    align-items: center;
    padding-right: 5px;
    margin-top: 10px;
    font-size: 13px;
    &:hover {
        text-shadow: #fff 1px 0 10px;
    }
`;

export const RangInput = styled.input<{ percent?: string }>`
    background: linear-gradient(
        90deg,
        rgb(26, 188, 156) ${({ percent }) => percent}%,
        rgb(215, 220, 223) 0%
    );
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    // background: #d7dcdf;
    outline: none;
    padding: 0;
    margin: 0;
    ::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #77f06d;
        cursor: pointer;
        -webkit-transition: background 0.15s ease-in-out;
        transition: background 0.15s ease-in-out;
    }
    ::-webkit-slider-thumb:hover {
        background: #1abc9c;
    }
    :active::-webkit-slider-thumb {
        background: #1abc9c;
    }
    ::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border: 0;
        border-radius: 50%;
        background: #77f06d;
        cursor: pointer;
        -moz-transition: background 0.15s ease-in-out;
        transition: background 0.15s ease-in-out;
    }
    ::-moz-range-thumb:hover {
        background: #1abc9c;
    }
    :active::-moz-range-thumb {
        background: #1abc9c;
    }
    :focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 3px #fff, 0 0 0 6px #1abc9c;
    }
    ::-moz-focus-inner {
        border: 0;
    }
    ::-moz-focus-outer {
        border: 0;
    }
`;

export const SliderWrapper = styled.div`
    .rangeslider__fill {
        background-image: linear-gradient(
            to right,
            #4da2ea 0%,
            #5ec1ad 39%,
            #73e86b 71%,
            #7cf95b 100%
        );
    }
`;
