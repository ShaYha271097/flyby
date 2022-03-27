import styled from "styled-components";

import { NavLink } from "react-router-dom";

export const WrapperPagination = styled.div`
    padding: 15px 0px;
    height: 69px;
`;

export const NoMarket = styled.div`
    margin: auto;
    font-size: 1.2rem;
    font-style: italic;
    @media (max-width: 445px) {
        font-size: 1rem;
    }
`;

export const SearchBar = styled.input`
    outline: none;
    background: #ffffff4f;
    color: white;
    border-radius: 12px;
    width: 100%;
    max-width: 600px;
    padding: 10px 12px;
    border: none;
    font-size: 0.875rem;
    font-style: italic;
    @media (max-width: 576px) {
        width: 100%;
    }
    @media (max-width: 373px) {
        width: 90%;
    }

    &::placeholder {
        color: #ffffffbe;
    }
`;

export const Title = styled.div`
    font-size: 1.6rem;
    margin: 1.5rem 0;
    font-style: italic;
    font-weight: 300;
    @media (max-width: 445px) {
        font-size: 1.5rem;
    }
    @media (max-width: 424px) {
        font-size: 1.2rem;
    }
`;

export const WrapperAuctions = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
    gap: 2rem;
    overflow: hidden;
    @media (max-width: 1140px) {
        justify-content: center;
    }
    @media (max-width: 566px) {
        gap: 10rem;
    }
    @media (max-width: 409px) {
        gap: 8rem;
    }
    @media (max-width: 388px) {
        gap: 2rem;
    }
    & > div {
        max-width: 400px;
        min-width: 380px;
        @media (max-width: 1140px) {
            min-width: 330px;
        }
        @media (max-width: 900px) {
            transform: scale(0.9);
        }
        @media (max-width: 566px) {
            margin: 10px 0 -217px;
            :last-child {
                margin: 10px 0 0px;
            }
        }
        @media (max-width: 473px) {
            width: 360px;
            min-width: 360px;
        }
        @media (max-width: 409px) {
            transform: scale(0.8);
        }
        @media (max-width: 388px) {
            transform: scale(0.7);
        }
    }
    @media (max-width: 900px) {
        margin: -40px 0;
    }
    @media (max-width: 388px) {
        margin: -105px 0;
    }
`;

export const InnerCard = styled.div`
    min-height: 620px;
    position: relative;
    .ButtonLive {
        justify-content: space-between;
    }
    /* @media (max-width: 768px) {
        min-height: 590px;
    } */
`;
export const Row1 = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
`;
export const Row12 = styled.div`
    width: 80%;
`;

export const TypeInfo = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 10px;
    p {
        display: flex;
        align-items: center;
    }
`;
export const RocketTitle = styled.div`
    display: flex;
`;
export const SecondCard = styled.div`
    position: absolute;
    bottom: 1px;
    width: 100%;
`;
export const InfoAuction = styled.div`
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 123px;
    width: 100%;
    border: 1px solid #37fab3;
    color: #37fab3;
    border-radius: 8px;
    @media (max-width: 1140px) {
        width: 115px;
    }
`;
export const FirstCard = styled.div`
    display: flex;
    justify-content: space-between;
    width: 20%;
`;
export const ButtonBuy = styled.button`
    a {
        color: #fff;
        font-style: italic;
        text-decoration: none;
    }
    width: 150px;
    height: 40px;
    border-radius: 12px;
    background: linear-gradient(to right, #7cf95b, #4da2ea);
    font-size: 18px;
    border: 1px solid #fff;
`;

export const LabelGroup = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 1rem;
    width: 100%;
    flex-direction: column;
    /* justify-content: center; */
    &.completed {
        flex-direction: column;
    }
`;

export const Label = styled.div<{ borderColor?: string }>`
    width: 100%;
    border-radius: 8px;
    border: 1px solid ${({ borderColor }) => borderColor};
    color: ${({ borderColor }) => borderColor};
    font-size: 0.8rem;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const RowBetween = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    white-space: nowrap;
`;

export const WrapperCicle = styled.div`
    position: relative;
    width: 100%;
    margin: 1rem 0;
`;

export const WrapperText = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > p {
        font-size: 1rem;
        margin-top: 0;
    }
`;

export const LinkCard = styled(NavLink)`
    color: white;
    text-decoration: none;
`;

export const CountDownBox = styled.div`
    border-top: 2px solid #ffffff80;
    border-bottom: 2px solid #ffffff80;
    padding: 2rem;
    width: 100%;
    margin: 1rem 0;
`;

export const CountDown = styled.div`
    font-size: 1.5rem;
    margin-top: 1rem;
    text-align: center;
    span {
        margin-right: 10px;
    }

    @media screen and (max-width: 1480px) {
        font-size: 1rem;
    }

    @media screen and (max-width: 768px) {
        font-size: 1.3rem;
    }
`;

export const ImgRocketAuctionType = styled.img`
    width: 3rem;
    height: 4rem;
`;

export const WrapperAuctionType = styled.div`
    padding: 5px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Wrapper = styled.div`
    /* @media screen and (max-width: 900px) {
        text-align: center;
        align-items: center;
        display: flex;
        flex-direction: column;
    } */
    @media screen and (max-width: 576px) {
        margin: 1rem auto;
        width: 100%;
    }
`;

export const ImgLoading = styled.img`
    position: absolute;
    width: 200px;
    height: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
