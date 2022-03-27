import React from 'react'

import Notification from '../../../components/Notification';
// import { paymentTokenCurrency } from '../../../constants';
import {
    ValueTypeAuction,
    TitleTypeAuction,
    SetupType,
    WrapperPreview,
    WrapperInside
} from '../styled'
import { useAuctionState } from '../../../store'
import { useActiveWeb3React } from '../../../hooks/index';

const Review = ({auctionType, address, symbol, amount, paymentCurrency, account, startingPrice, endedPrice, minPrice, startDate, endDate, startTime, endTime, name} : {auctionType: any, address: any, symbol: any, amount: any, paymentCurrency: any, account: any, startingPrice: any, endedPrice: any, minPrice: any, startDate: any, endDate: any, startTime: any, endTime: any, name: any}) => {
    const [state] = useAuctionState();
    const { chainId }: any = useActiveWeb3React();

    return (
        <>
            <WrapperPreview>
                <WrapperInside>
                    <SetupType>
                        <TitleTypeAuction>{state.language?.AUCTION_TYPE}</TitleTypeAuction>
                        <ValueTypeAuction>{auctionType === 'dutch' ? 'Dutch Auction' : 'Batch Auction'}</ValueTypeAuction>
                    </SetupType>
                    <SetupType>
                        <TitleTypeAuction>{state.language?.AUCTION_TOKEN}</TitleTypeAuction>
                        <ValueTypeAuction>{address}</ValueTypeAuction>
                        <ValueTypeAuction>{name} ({symbol})</ValueTypeAuction>
                    </SetupType>
                    <SetupType>
                        <TitleTypeAuction>{state.language?.AUCTION_TOKEN_AMOUNT}</TitleTypeAuction>
                        <ValueTypeAuction>{amount}</ValueTypeAuction>
                    </SetupType>
                </WrapperInside>
                <WrapperInside>
                    <SetupType>
                        <TitleTypeAuction>{state.language?.PAYMENT_CURRENCY}</TitleTypeAuction>
                        <ValueTypeAuction>{paymentCurrency.address[chainId]}</ValueTypeAuction>
                        <ValueTypeAuction>{paymentCurrency.fullName[chainId]}</ValueTypeAuction>
                    </SetupType>
                    <SetupType>
                        <TitleTypeAuction>{state.language?.FUND_WALLET}</TitleTypeAuction>
                        <ValueTypeAuction>{account}</ValueTypeAuction>
                    </SetupType>
                    {
                        auctionType === 'dutch'
                            ?
                            <SetupType>
                                <TitleTypeAuction>{state.language?.PRICE_SETTING}</TitleTypeAuction>
                                <ValueTypeAuction>{state.language?.STARTING_PRICE}</ValueTypeAuction>
                                <ValueTypeAuction>{startingPrice} {paymentCurrency.symbol[chainId]}</ValueTypeAuction>
                                <br />
                                <ValueTypeAuction>{state.language?.END_PRICE}</ValueTypeAuction>
                                <ValueTypeAuction>{endedPrice} {paymentCurrency.symbol[chainId]}</ValueTypeAuction>
                            </SetupType>
                            :
                            <SetupType>
                                <TitleTypeAuction>{state.language?.PRICE_SETTING}</TitleTypeAuction>
                                <ValueTypeAuction>{state.language?.MIN_PRICE}</ValueTypeAuction>
                                <ValueTypeAuction>{minPrice} {paymentCurrency.symbol[chainId]}</ValueTypeAuction>
                            </SetupType>
                    }
                    <SetupType>
                        <TitleTypeAuction>{state.language?.AUCTION_START_AND_END}</TitleTypeAuction>
                        <ValueTypeAuction>{new Date(`${startDate} ${startTime}`).toString()}</ValueTypeAuction>
                        <ValueTypeAuction>{new Date(`${endDate} ${endTime}`).toString()}</ValueTypeAuction>
                    </SetupType>
                </WrapperInside>
                <Notification />
            </WrapperPreview>
        </>
    )
}

export default Review
