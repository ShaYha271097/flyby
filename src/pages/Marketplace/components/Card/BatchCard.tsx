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
    TypeInfo,
    ButtonBuy,
    SecondCard,
    FirstCard,
    InfoAuction,
    Row1,
    Row12,
} from "../styled";
import CountDownCircle from "../../../../components/ProcessCircle/CountDownCircleDetail";
import rocketSmall from "../../../../assets/base64/rocket-update.json";
import { useAuctionState } from "../../../../store";
import { logoCurrency } from "../../../../constants";
import { useActiveWeb3React } from "hooks";
import { useBatchAuctionContract } from "hooks/useContract";
import { BigNumber } from "@ethersproject/bignumber";

const BatchCard = ({ data, status }: { data: any; status?: any }) => {
    const minRaise =
        Number(data.marketStatus.minimumCommitmentAmount) /
        Number(`1e${data.paymentCurrency.decimals}`);
    const totalRaise = Number(
        Number(data.marketStatus.commitmentsTotal) /
            Number(`1e${data.paymentCurrency.decimals}`)
    );
    const [hasCommited, setHasCommited] = useState(false);
    const { account } = useActiveWeb3React();
    const contract = useBatchAuctionContract(data.address);
    const tokenPrice = data
        ? totalRaise /
          (Number(data.marketInfo.totalTokens) /
              Number(`1e${data.tokenAuction.decimals}`))
        : 0;
    const [state] = useAuctionState();
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
                                    <LabelGroup>
                                        {data.marketSuccessful ? (
                                            <Label borderColor={"#37fab3"}>
                                                ✓
                                            </Label>
                                        ) : (
                                            <Label borderColor={"#37fab3"}>
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
                                {hasCommited ? (
                                    <InfoAuction>Your Auction</InfoAuction>
                                ) : (
                                    <></>
                                )}
                            </FirstCard>
                            <Row12>
                                <Text size="1.2rem">
                                    {data.tokenAuction.name} (
                                    {data.tokenAuction.symbol})
                                </Text>
                                <RowBetween style={{ marginBottom: "0" }}>
                                    <Text size=".875rem">
                                        {state.language?.MIN_RAISE}:{" "}
                                        {!isNaN(minRaise)
                                            ? parseFloat(minRaise.toFixed(5))
                                            : 0}{" "}
                                        {data.paymentCurrency.symbol}
                                    </Text>
                                </RowBetween>
                                <RowBetween>
                                    <Text size=".875rem">
                                        {state.language?.TOTAL_RAISE}:{" "}
                                        {!isNaN(totalRaise)
                                            ? parseFloat(totalRaise.toFixed(5))
                                            : 0}{" "}
                                        {data.paymentCurrency.symbol}
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
                                    <Text size="0.8rem">
                                        {tokenPrice
                                            ? parseFloat(tokenPrice.toFixed(9))
                                            : 0}{" "}
                                        {data.paymentCurrency.symbol}
                                    </Text>
                                </WrapperText>
                            </WrapperCicle>
                            <Text size="1.2rem">
                                {state.language?.AUCTION_TYPE}
                            </Text>
                            <WrapperAuctionType>
                                <TypeInfo>
                                    <ImgRocketAuctionType src={image} alt="" />
                                    <Text size="1rem">
                                        {state.language?.BATCH_AUCTION}
                                    </Text>
                                </TypeInfo>
                                {status === "live" ? (
                                    <ButtonBuy>
                                        <a href="">Buy Now</a>
                                    </ButtonBuy>
                                ) : hasCommited ? (
                                    <ButtonBuy>
                                        <a href="">Claim Now</a>
                                    </ButtonBuy>
                                ) : (
                                    <></>
                                )}
                            </WrapperAuctionType>
                        </SecondCard>
                    </InnerCard>
                </LinkCard>
            </Card>
        </>
    );
};

export default BatchCard;
