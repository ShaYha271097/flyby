import styled from "styled-components";
import { Button } from "../../components/Button";

export const Img = styled.img`
    width: 30px;
`;

export const ValueTypeAuction = styled.p`
    font-size: 1rem;
    // padding-bottom: 1rem;
    // font-weight: bold;
`;

export const TitleTypeAuction = styled.p`
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 5px;
    color: #d6d6d6;
    text-decoration: underline;
`;

export const SetupType = styled.div`
    padding: 10px 0px;
`;

export const WrapperPreview = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
`;

export const WrapperInside = styled.div`
    width: 48%;
    @media only screen and (max-width: 1024px) {
        width: 100%;
    }
`;

export const Wrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
`;

export const Input = styled.input<{ err?: boolean }>`
    width: 100%;
    max-width: 100%;
    border-radius: 12px;
    border: 1px solid ${({ err }) => (err ? "red" : "white")};
    padding: 10px;
    color: white;
    outline: none;
    margin: 1rem auto 0;
    background: transparent;

    &::placeholder {
        color: white;
    }
`;
export const CoinSelect = styled.button`
    display: flex;
    text-align: center;
    padding: 10px 20px;
    border: 1px solid #fff;
    margin-bottom: 10px;
    width: 75%;
    gap: 5px;
    border-radius: 12px;
    align-items: center;
    background: transparent;
    color: #fff;
    cursor: pointer;
    &:disabled {
        background: #c7c7c7;
    }
    &.active {
        background-image: linear-gradient(to right, #7cf95b, #4da2ea);
    }
    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`;
export const Step3Wraper = styled.div`
    display: flex;
    gap: 10px;

    @media screen and (max-width: 1024px) {
        display: block;
    }
`;

export const Step3 = styled.div`
    width: 50%;
    &.left {
        width: 30%;
    }
    &.right {
        width: 70%;
    }
    @media screen and (max-width: 1024px) {
        width: 100%;
        &.left {
            width: 100%;
        }
        &.right {
            width: 100%;
        }
    }
`;

export const Title = styled.p`
    font-size: 2.5rem;
    letter-spacing: 1.5px;
    // border-bottom: 2px solid #ffffff70!important;
    margin-top: 10px;
    @media screen and (max-width: 900px) {
        text-align: center;
    }
    @media screen and (max-width: 501px) {
        text-align: center;
        font-size: 2rem;
    }
    @media screen and (max-width: 424px) {
        text-align: center;
        font-size: 1.5rem;
    }
`;

export const ProcessBar = styled.div`
    display: flex;
    gap: 0;
    max-width: 800px;
    width: 100%;
    margin: 4rem auto;
    align-items: center;
    justify-content: center;
`;

export const StepNum = styled.span<{ inStep?: boolean }>`
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 1.5rem;
    font-weight: 300;
    background: ${({ inStep }) => (inStep ? "#73e86b" : "#ffffff70")};
    @media screen and (max-width: 1024);
`;

export const StepLine = styled.span<{ inStep?: boolean }>`
    width: 100%;
    height: 3px;
    max-width: 14%;
    border-radius: 4px;
    background: ${({ inStep }) => (inStep ? "#73e86b" : "#ffffff70")};
`;

export const ButtonPrevious = styled(Button)`
    &:disabled {
        background: #c7c7c7;
    }
`;

export const ButtonNext = styled(Button)`
    &:disabled {
        background: #c7c7c7;
    }
`;

export const RowBetween = styled.div<{ gap?: string }>`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    gap: ${({ gap }) => (gap ? gap : "unset")};
    &.button-group {
        margin-top: 8rem;
    }
`;

export const AuctionToken = styled.div`
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: 375px) {
        display: block;
    }
`;

export const AuctionType = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 400px;
    width: 45%;
    img {
        width: 60px;
        height: 60px;
        align-self: center;
    }
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    align-self: center;
    cursor: pointer;
    position: relative;
`;

export const SelectToken = styled(Input)`
    ::placeholder {
        color: #9096a9;
    }
`;

export const Amount = styled(Input)`
    &:disabled {
        opacity: 0.5;
    }
`;

export const AuctionTokenSetting = styled.div`
    width: 50%;
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

export const TextErr = styled.p`
    color: red !important;
    margin-top: 0.5rem;
`;

export const WrapperText = styled.div`
    padding: 1rem;
`;

export const ButtonApprove = styled(Button)`
    margin-top: 20px;
`;

export const WrapperPaymentCurrency = styled.div`
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
    background: transparent;
    margin-top: 1rem;
    & > div {
        padding: 0.65rem 1rem;
        border-radius: 10px;
        border: 1px solid white;
        cursor: pointer;

        &.active {
            background-image: linear-gradient(to right, #7cf95b, #4da2ea);
        }
    }
`;

export const FundWallet = styled(Input)`
    ::placeholder {
        color: #9096a9;
    }
`;

export const Space = styled.div`
    margin: 2rem;
`;

export const MinPrice = styled(Input)`
    border: 1px solid ${({ err }) => (err ? "red" : "white")};
    ::placeholder {
        color: #9096a9;
    }
    :disabled {
        background: #c7c7c7;
    }
`;

export const Radio = styled.input`
    :checked ~ .check {
        border: 3px solid #0dff92;
    }
    :checked ~ .check::before {
        background-image: linear-gradient(to right, #7cf95b, #4da2ea);
    }
    :checked ~ label {
        color: #0dff92;
    }
    display: none;
`;

export const LabelRadio = styled.label`
    display: block;
    position: relative;
    font-weight: 300;
    font-size: 1.35em;
    padding: 27px;
    margin: 10px auto;
    height: 30px;
    z-index: 9;
    cursor: pointer;
    -webkit-transition: all 0.25s linear;
`;

export const CheckRadio = styled.div`
    display: block;
    position: absolute;
    border: 3px solid #aaaaaa;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    top: 25px;
    left: 20px;
    z-index: 5;
    transition: border 0.25s linear;
    -webkit-transition: border 0.25s linear;
    ::before {
        display: block;
        position: absolute;
        content: "";
        border-radius: 100%;
        height: 11px;
        width: 11px;
        top: 4px;
        left: 4px;
        margin: auto;
        transition: background 0.25s linear;
        -webkit-transition: background 0.25s linear;
    }
`;
