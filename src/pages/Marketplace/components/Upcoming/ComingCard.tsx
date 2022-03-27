import React, { useEffect, useRef, useState } from "react";
import moment from "moment-timezone";
import {
    LinkCard,
    InnerCard,
    LabelGroup,
    Label,
    CountDownBox,
    CountDown,
    WrapperAuctionType,
    ImgRocketAuctionType,
} from "../styled";
import Text from "../../../../components/Text";
import Card from "../../../../components/Card";
import { getTimeCountDown } from "../../../../utils/getTimeCountDown";
import rocketSmall from "../../../../assets/images/rocket-update.svg";
import { useAuctionState } from "../../../../store";

const ComingCard = ({ data }: { data: any }) => {
    const t: any = useRef();
    const [, setSeconds] = useState(0);
    const [state] = useAuctionState();
    const startTime = new Date(Number(data.marketInfo.startTime) * 1000);
    const time = moment
        .utc(startTime, "YYYY-MM-DD HH:mm:ss")
        .format("YYYY-MM-DD HH:mm:ss");
    const timeCountDown = getTimeCountDown(time);

    useEffect(() => {
        function tick() {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }
        t.current = setInterval(() => tick(), 1000);
    }, []);
    return (
        <Card>
            <LinkCard to={`/auctions/${data.address}`}>
                <InnerCard>
                    <LabelGroup>
                        <Label borderColor={"#37fab3"}>
                            {state.language?.UPCOMING_SALES.toUpperCase()}
                        </Label>
                    </LabelGroup>
                    <Text size="1.2rem">
                        Token for sale: {data.tokenAuction.name} (
                        {data.tokenAuction.symbol})
                    </Text>
                    <Text size="1.2rem">
                        Payment token: {data.paymentCurrency.name} (
                        {data.paymentCurrency.symbol})
                    </Text>
                    <CountDownBox>
                        <Text size="1.2rem">
                            {state.language?.COUNTDOWN.toUpperCase()}
                        </Text>
                        <CountDown>
                            <span>{timeCountDown.dd}d</span>
                            <span>:</span>
                            <span>{timeCountDown.hh}h</span>
                            <span>:</span>
                            <span>{timeCountDown.mm}m</span>
                            <span>:</span>
                            <span>{timeCountDown.ss}s</span>
                        </CountDown>
                    </CountDownBox>
                    {/* <Text size="1.2rem">{state.language?.AUCTION_TYPE}</Text> */}
                    <WrapperAuctionType>
                        <ImgRocketAuctionType src={rocketSmall} alt="" />
                        <Text size="1rem">
                            {data.marketTemplate === "2"
                                ? state.language?.BATCH_AUCTION
                                : state.language.CROW_SALE}
                        </Text>
                    </WrapperAuctionType>
                </InnerCard>
            </LinkCard>
        </Card>
    );
};

export default ComingCard;
