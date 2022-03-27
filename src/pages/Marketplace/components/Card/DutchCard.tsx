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
} from "../styled";
import CountDownCircle from "../../../../components/ProcessCircle/CountDownCircleDetail";
import rocketSmall from "../../../../assets/base64/rocket-update.json";
import { useAuctionState } from "../../../../store";
import { logoCurrency } from "../../../../constants";

const DutchCard = ({ data, status }: { data: any; status?: any }) => {
    const [state] = useAuctionState();

    const minRaise =
        Number(data.marketPrice.startPrice) /
        Number(`1e${data.paymentCurrency.decimals}`);
    const totalRaise = Number(
        Number(data.marketStatus.commitmentsTotal) /
            Number(`1e${data.paymentCurrency.decimals}`)
    );
    const tokenPrice = data
        ? totalRaise /
          (Number(data.marketInfo.totalTokens) /
              Number(`1e${data.tokenAuction.decimals}`))
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

    useEffect(() => {
        configIndexedData();
    }, []);

    return (
        <>
            <Card>
                <LinkCard to={`/auctions/${data.address}`}>
                    <InnerCard>
                        {status === "live" ? (
                            <LabelGroup>
                                <Label borderColor={"#37fab3"}>
                                    {state.language?.LIVE}
                                </Label>
                            </LabelGroup>
                        ) : (
                            <LabelGroup>
                                {data.marketSuccessful ? (
                                    <Label borderColor={"#37fab3"}>✓</Label>
                                ) : (
                                    <Label borderColor={"#ff0000"}>X</Label>
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
                        <Text size="1.2rem">
                            {data.tokenAuction.name} ({data.tokenAuction.symbol}
                            )
                        </Text>
                        <RowBetween style={{ marginBottom: "0" }}>
                            <Text size=".875rem">
                                {state.language?.START_PRICE}:
                                {!isNaN(minRaise)
                                    ? parseFloat(minRaise.toFixed(5))
                                    : 0}{" "}
                                {data.paymentCurrency.symbol}
                            </Text>
                        </RowBetween>
                        <RowBetween>
                            <Text size=".875rem">
                                {state.language?.TOTAL_RAISE}:
                                {!isNaN(minRaise)
                                    ? parseFloat(totalRaise.toFixed(5))
                                    : 0}
                                {data.paymentCurrency.symbol}
                            </Text>
                        </RowBetween>
                        <WrapperCicle>
                            <CountDownCircle
                                startTime={data.marketInfo?.startTime}
                                endTime={data.marketInfo?.endTime}
                                coin={logoCurrency[data.paymentCurrency.symbol]}
                            />
                            <WrapperText>
                                <Text size="0.8rem">
                                    {state.language?.TOKEN_PRICE}:
                                </Text>
                                <Text size="0.8rem">
                                    {tokenPrice
                                        ? parseFloat(tokenPrice.toFixed(9))
                                        : 0}
                                    {data.paymentCurrency.symbol}
                                </Text>
                            </WrapperText>
                        </WrapperCicle>
                        <WrapperAuctionType>
                            <ImgRocketAuctionType src={image} alt="" />
                            <Text size="1rem">
                                {state.language?.DUTCH_AUCTION}
                            </Text>
                        </WrapperAuctionType>
                    </InnerCard>
                </LinkCard>
            </Card>
        </>
    );
};

export default DutchCard;
