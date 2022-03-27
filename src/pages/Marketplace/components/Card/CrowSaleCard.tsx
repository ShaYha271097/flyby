/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import Text from "../../../../components/Text";
import {
    LinkCard,
    InnerCard,
    LabelGroup,
    Label,
    RowBetween,
    WrapperCicle,
    WrapperText,
    WrapperAuctionType,
    ImgRocketAuctionType,
    ButtonBuy,
    TypeInfo,
    SecondCard,
    InfoAuction,
    FirstCard,
    Row1,
    Row12,
    RocketTitle,
} from "../styled";
import CountDownCircle from "../../../../components/ProcessCircle/CountDownCircleDetail";

import rocketSmall from "../../../../assets/base64/rocket-update.json";
import { useAuctionState } from "../../../../store";
import { logoCurrency } from "../../../../constants";
import { useBatchAuctionContract } from "hooks/useContract";
import { useActiveWeb3React } from "hooks";
import { BigNumber } from "@ethersproject/bignumber";
import { timeEnd } from "console";

const CrowSaleCard = ({ data, status }: { data: any; status?: any }) => {
    const [state] = useAuctionState();
    const [hasCommited, setHasCommited] = useState(false);
    const contract = useBatchAuctionContract(data.address);
    const timeStartUnix: BigNumber = data.marketInfo.startTime;
    const timeEndUnix: BigNumber = data.marketInfo.endTime;
    const timeStart = new Date(timeStartUnix.toNumber() * 1000);
    const timeEnd = new Date(timeEndUnix.toNumber() * 1000);
    const timeStartFormat = {
        dd:
            timeStart.getDate() < 10
                ? "0" + timeStart.getDate().toString()
                : timeStart.getDate(),
        mm:
            timeStart.getMonth() + 1 < 10
                ? "0" + (timeStart.getMonth() + 1).toString()
                : timeStart.getMonth() + 1,
        yyyy: timeStart.getFullYear(),
    };
    const timeEndFormat = {
        dd:
            timeEnd.getDate() < 10
                ? "0" + timeEnd.getDate().toString()
                : timeEnd.getDate(),
        mm:
            timeEnd.getMonth() + 1 < 10
                ? "0" + (timeEnd.getMonth() + 1).toString()
                : timeEnd.getMonth() + 1,
        yyyy: timeEnd.getFullYear(),
    };

    const { account } = useActiveWeb3React();

    const totalSale = data
        ? Number(
              data.marketInfo.totalTokens /
                  Number(`1e${data.tokenAuction.decimals}`)
          )
        : 0;
    // const minRaise = data
    //     ? Number(data.marketPrice.goal) /
    //       Number(`1e${data.paymentCurrency.decimals}`)
    //     : 0;
    const totalRaise = data
        ? Number(
              Number(data.marketStatus.commitmentsTotal) /
                  Number(`1e${data.paymentCurrency.decimals}`)
          )
        : 0;
    const tokenPrice = data
        ? Number(data.marketPrice.rate) /
          Number(`1e${data.paymentCurrency.decimals}`)
        : 0;
    const totalRemaining = data
        ? totalSale -
          totalRaise /
              (Number(data.marketPrice.rate) /
                  Number(`1e${data.paymentCurrency.decimals}`))
        : 0;
    const [image, setImage]: any = useState();

    const configIndexedData = async () => {
        const logo = await localStorage.getItem("flyby_rocket_card");
        if (logo) {
            setImage(logo);
        } else {
            localStorage.setItem("flyby_rocket_card", rocketSmall.data);
            setImage(rocketSmall.data);
        }
    };

    const getCommitment = async () => {
        return await contract?.commitments(account);
    };

    useEffect(() => {
        configIndexedData();
        getCommitment().then((res) => {
            const commitments: BigNumber = res;
            if (commitments.gt(0)) setHasCommited(true);
        });
    }, [account]);

    return (
        <>
            <Card>
                <LinkCard to={`/auctions/${data.address}`}>
                    <InnerCard>
                        <Row1>
                            <FirstCard>
                                {status === "live" ? (
                                    <LabelGroup>
                                        <Label borderColor={"#37fab3"}>
                                            {state.language?.LIVE}
                                        </Label>
                                    </LabelGroup>
                                ) : (
                                    <LabelGroup className="completed">
                                        {data.marketSuccessful ? (
                                            <Label borderColor={"#37fab3"}>
                                                ✓
                                            </Label>
                                        ) : (
                                            <Label borderColor={"#ff0000"}>
                                                X
                                            </Label>
                                        )}
                                        {data.marketSuccessful ? (
                                            <Label borderColor={"#37fab3"}>
                                                {state.language?.FINISHED}
                                            </Label>
                                        ) : (
                                            <Label borderColor={"#ff0000"}>
                                                {state.language?.FINISHED}
                                            </Label>
                                        )}
                                    </LabelGroup>
                                )}
                            </FirstCard>
                            <Row12>
                                <Text size="1.2rem">
                                    {data.tokenAuction.name} (
                                    {data.tokenAuction.symbol})
                                    <p>The DEX Super Aggregator</p>
                                </Text>
                                <RowBetween style={{ marginBottom: "0" }}>
                                    <Text size=".875rem">
                                        {" "}
                                        Total sale tokens:{" "}
                                        {!isNaN(totalSale)
                                            ? parseFloat(
                                                  totalSale.toFixed(5)
                                              ).toLocaleString()
                                            : 0}{" "}
                                        {data.tokenAuction.symbol}
                                    </Text>
                                </RowBetween>
                                <RowBetween style={{ marginBottom: "0" }}>
                                    <Text size=".875rem">
                                        Tokens remaining:{" "}
                                        {!isNaN(totalRemaining)
                                            ? parseFloat(
                                                  totalRemaining.toFixed(5)
                                              ).toLocaleString()
                                            : 0}{" "}
                                        {data.tokenAuction.symbol}
                                    </Text>
                                </RowBetween>
                                <RowBetween style={{ marginBottom: "0" }}>
                                    <Text size=".875rem">
                                        {state.language?.TOTAL_RAISE}:{" "}
                                        {!isNaN(totalRaise)
                                            ? parseFloat(
                                                  totalRaise.toFixed(5)
                                              ).toLocaleString()
                                            : 0}{" "}
                                        {data.paymentCurrency.symbol}
                                    </Text>
                                </RowBetween>
                                <RowBetween style={{ marginBottom: "0" }}>
                                    <Text size=".875rem">
                                        Time start: {timeStartFormat.dd} -{" "}
                                        {timeStartFormat.mm} -{" "}
                                        {timeStartFormat.yyyy}
                                    </Text>
                                </RowBetween>
                                <RowBetween>
                                    <Text size=".875rem">
                                        Time end: {timeEndFormat.dd} -{" "}
                                        {timeEndFormat.mm} -{" "}
                                        {timeEndFormat.yyyy}
                                    </Text>
                                </RowBetween>
                            </Row12>
                        </Row1>

                        <SecondCard>
                            <WrapperCicle>
                                <CountDownCircle
                                    startTime={data.marketInfo?.startTime}
                                    endTime={data.marketInfo?.endTime}
                                    coin={
                                        logoCurrency[
                                            data.paymentCurrency.symbol
                                        ]
                                    }
                                />
                                <WrapperText>
                                    <Text size="0.8rem">
                                        {state.language?.TOKEN_PRICE}
                                    </Text>
                                    <Text
                                        size="0.8rem"
                                        style={{ textAlign: "center" }}
                                    >
                                        {tokenPrice
                                            ? parseFloat(
                                                  tokenPrice.toFixed(9)
                                              ).toLocaleString()
                                            : 0}{" "}
                                        {data.paymentCurrency.symbol}
                                    </Text>
                                </WrapperText>
                            </WrapperCicle>
                            {/* <Text size="1.2rem">
                                {state.language?.AUCTION_TYPE}
                            </Text> */}

                            <WrapperAuctionType className="ButtonLive">
                                {status === "live" ? (
                                    <ButtonBuy>
                                        <a href="">Buy now</a>
                                    </ButtonBuy>
                                ) : hasCommited ? (
                                    <ButtonBuy>
                                        <a href="">Claim now</a>
                                    </ButtonBuy>
                                ) : (
                                    <></>
                                )}
                                <TypeInfo>
                                    <RocketTitle>
                                        <ImgRocketAuctionType
                                            src={image}
                                            alt=""
                                        />
                                        <Text size="1rem">
                                            Pre-Private Sale
                                        </Text>
                                    </RocketTitle>

                                    {hasCommited ? (
                                        <InfoAuction>Your Auction</InfoAuction>
                                    ) : (
                                        <></>
                                    )}
                                </TypeInfo>
                            </WrapperAuctionType>
                        </SecondCard>
                    </InnerCard>
                </LinkCard>
            </Card>
        </>
    );
};

export default CrowSaleCard;
