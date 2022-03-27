import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { useParams } from "react-router";
import { useAuctionCommit } from "../../hooks/useAuctionCommit";
import { useGetCommitAuction } from "../../hooks/useGetCommitAuction";
import { useActiveWeb3React, useGetToken } from "../../hooks";
import { useApproveToken } from "../../hooks/useAppoveToken";
import { MaxUint256 } from "@ethersproject/constants";
import { paymentTokenCurrency } from "../../constants";
import { useFinalizedAuction } from "../../hooks/useFinalizedAuction";
import { useClaimTokenAuction } from "../../hooks/useClaimTokenAuction";
import { useGetRoleAuction } from "../../hooks/useGetRoleAuction";
import { toHexBigNumber } from "../../utils";
import CommitmentsHistory from "./components/CommitmentsHistory";
import { useAuctionState } from "../../store";
import "react-rangeslider/lib/index.css";
import LoadingComponent from "../../components/Loading/LoadingComponent";
import InfoAuction from "./components/InfoAuction";
import TabCommit from "./components/TabCommit";
import { useNativeBalances } from "../../hooks";
import { useToken } from "../../hooks/useToken";
import { ETH } from "../../constants";
import Pagination from "components/Pagination";
import { useAuctionFetcher } from "hooks/useAuctionFetcher";
import { Wrapper } from "./styled";
import ModalConfirm from "components/ModalConfirm";
import FlybyLogo from "../FlybyLogo";
import BackgroundRightCard from "../../assets/images/card/br600-1.png";
import BackgroundLeftCard from "../../assets/images/card/br600-2.png";
import styled from "styled-components";

const CustomCard = styled(Card)`
    position: relative;
`;

const AuctionDetails = () => {
    const [open, setOpen] = useState(false); //modal finalize
    const [pendingState, setPendingState] = useState<
        "SUCCESS" | "LOADING" | "ERROR" | "CONFIRM"
    >("CONFIRM");
    const [updateAuctionData, setUpdateAuctionData] = useState(false);
    const [commitValue, setCommitValue]: any = useState();
    const [dataAuction, setDataAuction]: any = useState();
    const [amountForSale, setAmountForSale]: any = useState();
    const [amountRaised, setAmountRaised]: any = useState();
    const [startPrice]: any = useState();
    const [reservePrice]: any = useState();
    const [auctionPrice]: any = useState();
    const [currentTokenPrice, setCurrentTokenPrice]: any = useState();
    const [minRaise, setMinRase]: any = useState();
    const [rateView, setRateView]: any = useState();
    const [idTemplate, setIdTemplate]: any = useState(3);
    const [approveStatus, setApproveStatus] = useState(false);
    const [finalize, setFinalize] = useState(false);
    const [auctionSuccess, setAuctionSuccess] = useState(false);
    const [hasAdminRole, setHasAminRole] = useState(false);
    const [tokensClaim, setTokensClaim] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [commitments, setCommitments] = useState(0);
    const [commitData, setCommitData]: any = useState();
    const { account, chainId }: any = useActiveWeb3React();
    const [totalTokensClaimable, setTotalTokesClaimable] = useState(0);
    const { saveCommits } = useAuctionFetcher();

    const { getAllowance } = useGetToken(
        dataAuction?.data.paymentCurrencyInfo?.addr,
        account
    );
    const { commitETH, commitToken } = useAuctionCommit(
        dataAuction?.data.paymentCurrencyInfo.addr
    );
    const { getAuctionData, getCommitmentsAuction } = useGetCommitAuction();
    const [state, actions] = useAuctionState();
    const id: any = useParams();
    const { getTokensClaimable, getTokensClaimed } = useClaimTokenAuction(
        id.id
    );
    const { getHasRoleAdminAuction } = useGetRoleAuction(id.id);
    const [socialNetwork]: any = useState([]);
    const timeNow = new Date().getTime();
    const [startTime, setStartTime]: any = useState();
    const [endTime, setEndTime]: any = useState();
    const [valueRange, setValueRange] = useState(0);
    const [remainingAmount, setRemainingAmount] = useState(0);
    const { balance } = useNativeBalances(account);
    const [balanceToken, setBalanceToken]: any = useState();
    const [currentPage, setCurentPage] = useState(0);
    const numberCommitmentsInOnePage = 10;
    const numPages = Math.ceil(commitData?.length / numberCommitmentsInOnePage);

    const commitDataFiltered = commitData?.filter(
        (item: any, index: any) =>
            index >= currentPage * numberCommitmentsInOnePage &&
            index <
                currentPage * numberCommitmentsInOnePage +
                    numberCommitmentsInOnePage
    );

    const handleSetPage = (page: any) => {
        setCurentPage(page);
    };
    const approve = useApproveToken();
    const {
        confirmFinalizeAuction,
        confirmClaimAuctionTokenUser,
        getFinalizedStatus,
    } = useFinalizedAuction(id.id);

    const commit = async () => {
        try {
            const amount = toHexBigNumber(
                commitValue,
                dataAuction?.data.paymentCurrencyInfo.decimals
            );
            let txn;
            if (
                dataAuction?.data.paymentCurrencyInfo.addr.toLowerCase() ===
                paymentTokenCurrency.NATIVE.address[chainId].toLowerCase()
            ) {
                txn = await commitETH(id.id, amount);
            } else {
                txn = await commitToken(id.id, amount);
            }
            await saveCommits(id.id, commitValue, txn.hash);
            await txn.wait();
            actions.updateTransactionPending(false);
            setUpdateAuctionData(!updateAuctionData);
        } catch (err) {
            console.log("failed to save commitment", err);
        }
    };

    const { getBalance } = useToken();

    const callApprove = async () => {
        actions.updateTransactionPending(true);
        const call = await approve(
            dataAuction?.data.paymentCurrencyInfo.addr,
            id.id,
            MaxUint256
        );
        await call.wait();
        actions.updateTransactionPending(false);
        setApproveStatus(!approveStatus);
    };

    const handleConfirmFinalizeAuction = async () => {
        setPendingState("LOADING");
        await confirmFinalizeAuction()
            .then((res: any) => {
                setPendingState("SUCCESS");
                res.wait();
            })
            .catch((err: any) => {
                console.log("error", err);
                setPendingState("ERROR");
            });
    };

    const handleClaimTokenUser = async () => {
        console.log("aaaaa");
        await confirmClaimAuctionTokenUser();
        setUpdateAuctionData(!updateAuctionData);
    };

    const handleData = async () => {
        const templateId = Number(dataAuction.info.marketTemplate);
        setIdTemplate(templateId);
        const decimalPaymentCurrency = Number(
            `1e${dataAuction.data.paymentCurrencyInfo.decimals}`
        );
        const decimalTokenAuction = Number(
            `1e${dataAuction.data.tokenInfo.decimals}`
        );
        const amountForSales =
            Math.round(
                (Number(dataAuction.data.totalTokens) / decimalTokenAuction) *
                    100
            ) / 100;
        setAmountForSale(amountForSales);
        const amountRaised =
            Number(dataAuction.data.commitmentsTotal) / decimalPaymentCurrency;
        setAmountRaised(amountRaised);
        const currentTokenPrices =
            amountRaised /
            (Number(dataAuction.data.totalTokens) / decimalTokenAuction);
        setCurrentTokenPrice(currentTokenPrices);
        if (templateId === 2) {
            const minRaises =
                Number(dataAuction.data.minimumCommitmentAmount) /
                decimalPaymentCurrency;
            await setMinRase(minRaises);
        }
        if (templateId === 1 || templateId === 3) {
            const minRaises =
                Number(dataAuction.data.goal) / decimalPaymentCurrency;
            await setMinRase(minRaises);
            const rate = Number(dataAuction.data.rate) / decimalPaymentCurrency;
            await setCurrentTokenPrice(rate);
            await setRateView(rate);
            setRemainingAmount(
                Number(amountForSales) - Number(amountRaised) / Number(rate)
            );
        }
    };

    const handleChange = (value: any) => {
        const templateId = Number(dataAuction.info.marketTemplate);
        const decimalPaymentCurrency = Number(
            `1e${dataAuction.data.paymentCurrencyInfo.decimals}`
        );
        const rate = Number(dataAuction.data.rate) / decimalPaymentCurrency;
        if (templateId === 1 || templateId === 3) {
            Number(value) === 0
                ? setCommitValue("")
                : setCommitValue(Number(value) * Number(rate));
        }
        setValueRange(value);
    };

    const onDismiss = () => {
        setOpen(false);
        setPendingState("CONFIRM");
    };

    useEffect(() => {
        if (dataAuction) {
            handleData();

            setStartTime(dataAuction.data.startTime);
            setEndTime(dataAuction.data.endTime);

            if (
                dataAuction.data.paymentCurrencyInfo.addr.toLowerCase() ===
                ETH.toLowerCase()
            ) {
                balance()
                    .then((res: any) => {
                        setBalanceToken(Number(res.toString() / 1e18));
                        if (
                            Number(dataAuction.info.marketTemplate) !== 1 &&
                            Number(dataAuction.info.marketTemplate) !== 3
                        ) {
                            setRemainingAmount(Number(res.toString()) / 1e18);
                        }
                    })
                    .catch(() => console.log("failed to get balance"));
            } else {
                getBalance(dataAuction?.data.paymentCurrencyInfo.addr, account)
                    .then((res) => {
                        setBalanceToken(res);
                        if (
                            Number(dataAuction.info.marketTemplate) !== 1 &&
                            Number(dataAuction.info.marketTemplate) !== 3
                        ) {
                            setRemainingAmount(Number(res));
                        }
                    })
                    .catch(() => console.log("failed to get balance"));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataAuction, state.auctionContract]);

    useEffect(() => {
        if (
            account &&
            commitValue &&
            dataAuction?.data.paymentCurrencyInfo.addr.toLowerCase() !==
                paymentTokenCurrency.NATIVE.address[chainId].toLowerCase()
        )
            getAllowance(id.id).then((res: any) => {
                if (commitValue > res) {
                    setApproveStatus(true);
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commitValue, account, chainId]);

    useEffect(() => {
        if (dataAuction) {
            const itvCurrentprice = setInterval(() => {
                const time = new Date();
                if (Number(time) / 1000 < Number(dataAuction.data.endTime)) {
                    const totalTimeWithSecconds =
                        Number(dataAuction.data.endTime) -
                        Number(dataAuction.data.startTime);
                    const priceInSecconds =
                        (Number(dataAuction.data.startPrice) /
                            10 **
                                Number(
                                    dataAuction?.data.paymentCurrencyInfo
                                        .decimals
                                ) -
                            Number(dataAuction.data.minimumPrice) /
                                10 **
                                    Number(
                                        dataAuction?.data.paymentCurrencyInfo
                                            .decimals
                                    )) /
                        totalTimeWithSecconds;
                    setCurrentPrice(
                        Number(dataAuction.data.startPrice) /
                            10 **
                                Number(
                                    dataAuction?.data.paymentCurrencyInfo
                                        .decimals
                                ) -
                            (Number(time) / 1000 -
                                Number(dataAuction.data.startTime)) *
                                priceInSecconds
                    );
                } else {
                    setCurrentPrice(
                        Number(dataAuction?.data.minimumPrice) /
                            10 **
                                Number(
                                    dataAuction?.data.paymentCurrencyInfo
                                        .decimals
                                )
                    );
                    clearInterval(itvCurrentprice);
                }
            }, 1000);
        }
    }, [dataAuction, account, chainId]);

    useEffect(() => {
        actions.updateAuctionContract(id.id);
        if (state.auctionContract) {
            getAuctionData(id.id)
                .then((res: any) => {
                    setDataAuction(res);
                    // eslint-disable-next-line eqeqeq
                    if (chainId !== 80001 && chainId != 137) {
                        getCommitmentsAuction(
                            id.id,
                            res.data.paymentCurrencyInfo.decimals,
                            res.data.tokenInfo.decimals,
                            Number(res.data?.commitmentsTotal),
                            Number(res.data?.totalTokens)
                        ).then((r: any) => {
                            setCommitData(r);
                        });
                    }
                })
                .catch((err) => window.location.replace("/"));

            getHasRoleAdminAuction()
                .then((res: any) => {
                    setHasAminRole(res);
                })
                .catch(() => console.log("failed to get admin role"));

            getTokensClaimable(account)
                .then((res: any) => {
                    setTokensClaim(res);
                })
                .catch(() => console.log("failed to get tokens claimable"));

            getTokensClaimed(account)
                .then((res: any) => {
                    const amount = Number(res) / 1e18;
                    setTotalTokesClaimable(amount);
                })
                .catch(() => console.log("failed to get tokens claimed"));

            getFinalizedStatus()
                .then((res: any) => {
                    setAuctionSuccess(res.auctionSuccessful);
                    setFinalize(res.finalizeStatus);
                    setCommitments(res.commitments);
                })
                .catch(() => console.log("failed to get finalized status"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.auctionContract, account, chainId, updateAuctionData]);

    // useEffect(() => {
    //     window.location.replace('/home')
    // },[chainId])

    return (
        <>
            <FlybyLogo />
            <ModalConfirm
                open={open}
                onDismiss={onDismiss}
                handleConfirmFinalizeAuction={handleConfirmFinalizeAuction}
                pendingState={pendingState}
                data={dataAuction}
            />
            {dataAuction ? (
                <Wrapper>
                    <Card
                        width="48%"
                        maxWidth="600px"
                        minWidth="427px"
                        background={BackgroundLeftCard}
                        // style={{ position: "realtive" }}
                    >
                        <InfoAuction
                            dataAuction={dataAuction}
                            socialNetwork={socialNetwork}
                            auctionSuccess={auctionSuccess}
                            finalize={finalize}
                            id={id}
                        />
                    </Card>

                    <Card
                        width="48%"
                        maxWidth="600px"
                        minWidth="427px"
                        background={BackgroundRightCard}
                    >
                        <TabCommit
                            amountForSale={amountForSale}
                            amountRaised={amountRaised}
                            idTemplate={idTemplate}
                            minRaise={minRaise}
                            dataAuction={dataAuction}
                            reservePrice={reservePrice}
                            auctionPrice={auctionPrice}
                            startPrice={startPrice}
                            endTime={Number(endTime)}
                            startTime={Number(startTime)}
                            currentTokenPrice={currentTokenPrice}
                            timeNow={timeNow}
                            hasAdminRole={hasAdminRole}
                            valueRange={valueRange}
                            handleChange={handleChange}
                            setCommitValue={setCommitValue}
                            commitValue={commitValue}
                            approveStatus={approveStatus}
                            commit={commit}
                            callApprove={callApprove}
                            finalize={finalize}
                            handleConfirmFinalizeAuction={
                                handleConfirmFinalizeAuction
                            }
                            setOpen={setOpen}
                            tokensClaim={tokensClaim}
                            handleClaimTokenUser={handleClaimTokenUser}
                            remainingAmount={remainingAmount}
                            commitments={commitments}
                            auctionSuccess={auctionSuccess}
                            rateView={rateView}
                            setValueRange={setValueRange}
                            currentPrice={currentPrice}
                            updateAuctionData={setUpdateAuctionData}
                            totalTokensClaimable={totalTokensClaimable}
                            balance={balanceToken}
                        />
                    </Card>
                    {commitDataFiltered ? (
                        <CommitmentsHistory datas={commitDataFiltered} />
                    ) : (
                        <></>
                    )}
                    <Pagination
                        setPages={handleSetPage}
                        num={numPages}
                        currentPage={currentPage}
                    />
                    {/* <div onClick={setVaultAddress}>aaaaaaaaaaaaaa</div> */}
                </Wrapper>
            ) : (
                <>
                    <LoadingComponent />
                </>
            )}
        </>
    );
};

export default AuctionDetails;
