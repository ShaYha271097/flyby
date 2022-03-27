import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "components/Modal";
import { ButtonAction } from "pages/AuctionDetails/styled";
import BlueLoader from "../../assets/images/blue-loader.svg";
import Triangle from "../../assets/images/riangle.svg";
import Sucess from "../../assets/images/sucess.svg";

const ModalConfirm = ({
    open,
    onDismiss,
    handleConfirmFinalizeAuction,
    pendingState,
    data,
}: any) => {
    // const [pendingState, setPendingState] = useState("LOADING");
    const [auctionInfo, setAuctionInfo] = useState({
        status: false,
        totalCommit: 0,
        totalSale: 0,
        totalReturn: 0,
    });

    const getAuctionInfo = () => {
        const status = data?.data.auctionSuccessful;
        const decimalPaymentCurrency = Number(
            `1e${data?.data.paymentCurrencyInfo.decimals}`
        );
        const decimalTokenAuction = Number(
            `1e${data?.data.tokenInfo.decimals}`
        );
        const totalCommit =
            Number(data?.data.commitmentsTotal) / decimalPaymentCurrency;
        const totalToken = Number(data?.data.totalTokens) / decimalTokenAuction;
        const tokenRate = Number(data?.data.rate) / decimalPaymentCurrency;
        const totalSale = totalCommit * tokenRate;
        const totalReturn = totalToken - totalSale;
        // console.log('test - -- --->', status, totalCommit, totalSale, totalReturn);

        const temp = { ...auctionInfo };
        temp.status = status;
        temp.totalCommit = totalCommit;
        temp.totalSale = totalSale;
        temp.totalReturn = totalReturn;
        // console.log('temp - -- --->', temp);

        setAuctionInfo({
            status: status,
            totalCommit: totalCommit,
            totalSale: totalSale,
            totalReturn: totalReturn,
        });
        // console.log('auction inform ---->', auctionInfo);
    };

    useEffect(() => {
        getAuctionInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const confirm = () => {
        return (
            <Content>
                <ContentHeader>
                    <Exit onClick={onDismiss}>
                        <img src="../exit.png" alt="" />
                    </Exit>
                    <ContentText>Information</ContentText>
                </ContentHeader>
                {/* <ContentHeader>Information field</ContentHeader> */}
                <ContentInside>
                    <Title>
                        <Title1>Auction status</Title1>
                        <Title2>
                            {data?.data?.auctionSuccessful
                                ? "Success"
                                : "Failed"}
                        </Title2>
                    </Title>
                    <Title>
                        <Title1>Total commit</Title1>
                        <Title2>
                            {auctionInfo.totalCommit
                                ? auctionInfo.totalCommit
                                : 0}{" "}
                            {data?.data.paymentCurrencyInfo.symbol}
                        </Title2>
                    </Title>
                    <Title>
                        <Title1>Total sale</Title1>
                        <Title2>
                            {auctionInfo.totalSale ? auctionInfo.totalSale : 0}{" "}
                            {data?.data.tokenInfo.symbol}
                        </Title2>
                    </Title>
                    <Title>
                        <Title1>Total return</Title1>
                        <Title2>
                            {auctionInfo.totalReturn
                                ? auctionInfo.totalReturn
                                : 0}{" "}
                            {data?.data.tokenInfo.symbol}
                        </Title2>
                    </Title>
                </ContentInside>
                <ContentButton>
                    <BtnAction onClick={handleConfirmFinalizeAuction}>
                        Finalize
                    </BtnAction>
                </ContentButton>
            </Content>
        );
    };
    const loading = () => {
        return (
            <Content>
                <ContentHeader>
                    <Exit onClick={onDismiss}>
                        <img src="../exit.png" alt="" />
                    </Exit>
                    <CircleLoading>
                        <img src={BlueLoader} alt="" />
                    </CircleLoading>
                </ContentHeader>
                <TextLoading>
                    <Text1>Waiting For Confirmation</Text1>
                    <Text2>Finalizing</Text2>
                    <Text3>Confirm this transaction in your wallet</Text3>
                </TextLoading>
            </Content>
        );
    };
    const error = () => {
        return (
            <Content>
                <ContentImg>
                    <img className="error-triangle" src={Triangle} alt="" />
                </ContentImg>
                <TextError>Transaction Error</TextError>
                <ContentButton>
                    <BtnAction onClick={onDismiss}>Dismiss</BtnAction>
                </ContentButton>
            </Content>
        );
    };
    const sucess = () => {
        return (
            <Content>
                <ContentImg>
                    <img src={Sucess} alt="" />
                </ContentImg>
                <TextContent>Transaction Submitted</TextContent>
                <ContentButton>
                    <BtnAction onClick={onDismiss}>Close</BtnAction>
                </ContentButton>
            </Content>
        );
    };
    return (
        <WrapperModal>
            <Modal isOpen={open} onDismiss={onDismiss}>
                {pendingState === "LOADING"
                    ? loading()
                    : pendingState === "ERROR"
                    ? error()
                    : pendingState === "SUCCESS"
                    ? sucess()
                    : confirm()}
            </Modal>
        </WrapperModal>
    );
};

const WrapperModal = styled.div`
    margin-top: 40px;
    @media(max-width: 576px) {
        margin-top: 10px;
    }
`;
const Content = styled.div`
    position: relative;
    /* padding: 1rem 0 1rem; */
`;
const ContentHeader = styled.div`
    position: relative;
`;
const ContentImg = styled.div`
    display: flex;
    justify-content: center;
    img {
        width: 100px;
    }
    @media (max-width: 768px) {
        img {
            width: 80px;
        }
    }
`;
const ContentText = styled.div`
    font-size: 23px;
    margin: 10px 0 15px 0;
`;
const TextError = styled.div`
    font-size: 20px;
    margin-top: 10px;
    text-align: center;
    color: #ff0b0b;
    @media (max-width: 768px) {
        font-size: 18px;
    }
`;
const TextContent = styled.div`
    font-size: 20px;
    margin-top: 10px;
    text-align: center;
    color: #fff;
    /* text-shadow: 2px 2px 10px #feafff; */
    @media (max-width: 768px) {
        font-size: 18px;
    }
`;
const Exit = styled.div`
    position: absolute;
    right: 0;
    /* padding: 0.5em 0; */
    img {
        background-color: #5d0b9a52;
        width: 35px;
        height: 35px;
        border-radius: 10px;
        &:hover {
            background-color: #ff0fed59;
        }
    }
`;
const TextLoading = styled.div`
    margin-top: 20px;
    text-align: center;
`;
const Text1 = styled.div`
    font-size: 20px;
    padding-top: 10px;
`;
const Text2 = styled.div`
    font-size: 15px;
    padding-top: 10px;
`;
const Text3 = styled.div`
    font-size: 12px;
    opacity: 0.8;
    padding: 10px;
`;
const CircleLoading = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 10px;
    img {
        width: 80px;
        animation: xoayvong 2s linear 0s infinite;
        -webkit-animation: xoayvong 2s linear 0s infinite;
        -moz-animation: xoayvong 2s linear 0s infinite;
        -o-animation: xoayvong 2s linear 0s infinite;
    }
    @-webkit-keyframes xoayvong {
        from {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -o-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -o-transform: rotate(360deg);
        }
    }
    /* Standard syntax */
    @keyframes xoayvong {
        from {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -o-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -o-transform: rotate(360deg);
        }
    }
`;
const ContentInside = styled.div`
    margin: 10px 0;
    width: 100%;
    min-height: 130px;
    border: 1px solid #fff;
    border-radius: 10px;
`;
const Title = styled.div`
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 10px auto;
    @media (max-width: 768px) {
        font-size: 13px;
    }
`;
const Title1 = styled.div``;
const Title2 = styled.div``;
const ContentButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;
const BtnAction = styled(ButtonAction)`
    font-size: 1rem;
    width: 50%;
    border-radius: 18px;
`;

export default ModalConfirm;
