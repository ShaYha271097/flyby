import React from "react";
import styled from "styled-components";
import { useAuctionState } from "../../store";
import { useActiveWeb3React } from "../../hooks/index";
import { nativeCurrency } from "../../constants/index";

const Notification = () => {
    const [state, action] = useAuctionState();
    const { chainId }: any = useActiveWeb3React();

    return (
        <>
            <Wrapper
                className={
                    (state.showPopupSuccessCreateAuction === true
                        ? "popup--visible "
                        : "") + "popup popup--icon -success js_success-popup"
                }
            >
                <Background className="popup__background"></Background>
                <Content className="popup__content">
                    <Title className="popup__content__title">
                        Your transaction has been sent...
                    </Title>
                    <Text>
                        See on {nativeCurrency.URLScan[chainId]}:{" "}
                        <Link
                            onClick={() =>
                                window.open(
                                    `https://${nativeCurrency.URLScan[chainId]}/tx/${state.transactionAddress}`
                                )
                            }
                        >
                            here.
                        </Link>
                    </Text>
                    <Button
                        onClick={() =>
                            action.updateShowPopupSuccessCreateAuction(false)
                        }
                    >
                        Close
                    </Button>
                </Content>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    :before {
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
    }
    :after {
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
    }
    visibility: hidden;
    transition: visibility 0ms linear 0.3s;
    &.popup--visible {
        visibility: visible;
        transition: visibility 0ms;
    }
    &.popup--visible .popup__background {
        opacity: 1;
    }
    &.popup--visible .popup__content {
        -webkit-animation: show-popup 0.3s forwards;
        animation: show-popup 0.3s forwards;
    }
    &.popup--icon .popup__content {
        padding-top: 130px;
    }
    &.popup--icon .popup__content:before {
        position: absolute;
        top: 25px;
        left: 50%;
        transform: translateX(-50%);
        display: block;
        height: 90px;
        width: 90px;
    }
    &.popup--icon .popup__content:after {
        position: absolute;
        top: 25px;
        left: 50%;
        transform: translateX(-50%);
        display: block;
        height: 90px;
        width: 90px;
    }
    &.popup--icon .popup__content:before {
        content: "";
        border: 3px solid currentColor;
        border-radius: 50%;
        transform: translateX(-50%) scale(1, 0);
        opacity: 0;
    }
    &.popup--icon .popup__content:after {
        content: "✓";
        line-height: 90px;
        font-size: 45px;
        transform: translateX(-50%) scale(0);
        opacity: 0;
    }
    &.popup--visible.popup--icon .popup__content:before {
        -webkit-animation: show-icon-cirlce 0.3s forwards 0.15s;
        animation: show-icon-cirlce 0.3s forwards 0.15s;
    }
    &.popup--visible.popup--icon .popup__content:after {
        -webkit-animation: show-icon 0.3s forwards 0.3s;
        animation: show-icon 0.3s forwards 0.3s;
    }
    &.-success.popup--icon .popup__content:before {
        border-color: #4ad890;
    }
    &.-success.popup--icon .popup__content:after {
        content: "✓";
        color: #4ad890;
    }
    @-webkit-keyframes show-popup {
        0% {
            transform: translate(-50%, -50%) scale(0.7);
            opacity: 0;
        }
        45% {
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 1;
        }
        80% {
            transform: translate(-50%, -50%) scale(0.95);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
        }
    }

    @keyframes show-popup {
        0% {
            transform: translate(-50%, -50%) scale(0.7);
            opacity: 0;
        }
        45% {
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 1;
        }
        80% {
            transform: translate(-50%, -50%) scale(0.95);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
        }
    }
    @-webkit-keyframes hide-popup {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
        }
    }
    @keyframes hide-popup {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
        }
    }
    /**
       * Icon animations.
       */
    @-webkit-keyframes show-icon {
        0% {
            transform: translateX(-50%) scale(0);
            opacity: 0;
        }
        100% {
            transform: translateX(-50%) scale(1);
            opacity: 1;
        }
    }
    @keyframes show-icon {
        0% {
            transform: translateX(-50%) scale(0);
            opacity: 0;
        }
        100% {
            transform: translateX(-50%) scale(1);
            opacity: 1;
        }
    }
    @-webkit-keyframes show-icon-cirlce {
        0% {
            transform: translateX(-50%) scale(1, 0);
            opacity: 0;
        }
        100% {
            transform: translateX(-50%) scale(1, 1);
            opacity: 1;
        }
    }
    @keyframes show-icon-cirlce {
        0% {
            transform: translateX(-50%) scale(1, 0);
            opacity: 0;
        }
        100% {
            transform: translateX(-50%) scale(1, 1);
            opacity: 1;
        }
    }
`;

const Link = styled.span`
    color: #8fe999;
    cursor: pointer !important;
`;

const Button = styled.button`
    background-image: linear-gradient(to right, #7cf95b, #4da2ea);
    border-radius: 12px;
    padding: 15px;
    border: none;
    cursor: pointer !important;
`;

const Background = styled.div`
    :before {
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
    }
    :after {
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
    }
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
`;

const Content = styled.div`
    :before {
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
    }
    :after {
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
    }
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10001;
    min-width: 400px;
    padding: 25px 50px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 3px;
    text-align: center;
    -webkit-animation: hide-popup 0.3s forwards;
    animation: hide-popup 0.3s forwards;
`;

const Title = styled.h3`
    font-weight: bold !important;
    :before {
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
    }
    :after {
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
    }
    &.popup__content__title {
        margin-bottom: 10px;
        font-size: 28px;
        font-weight: 100;
        color: #626262;
    }
`;

const Text = styled.p`
    white-space: nowrap !important;
    margin-bottom: 8px;
    color: #626262;
    :before {
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
    }
    :after {
        box-sizing: inherit;
        -webkit-font-smoothing: antialiased;
    }
`;

export default Notification;
