import React from 'react'

import Notification from '../../../components/Notification';
import { useAuctionState } from '../../../store'
// import { paymentTokenCurrency } from '../../../constants'
import { useActiveWeb3React } from '../../../hooks/index';
import {
    WrapperPreview,
    WrapperInside,
    SetupType,
    TitleTypeAuction,
    ValueTypeAuction
} from '../styled'

const Review = ({name, address, symbol, amount, rate, paymentCurrency, account, minPrice, startDate, startTime, endDate, endTime}: {name: any, address: any, symbol: any, amount: any, rate: any, paymentCurrency: any, account: any, minPrice: any, startDate: any, startTime: any, endDate: any, endTime: any}) => {

    const [state] = useAuctionState()
    const { chainId }: any = useActiveWeb3React()

    return (
        <>
            <WrapperPreview>
                <WrapperInside>
                    <SetupType>
                        <TitleTypeAuction>{state.language?.AUCTION_TYPE}</TitleTypeAuction>
                        <ValueTypeAuction>{state.language?.CROW_SALE}</ValueTypeAuction>
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
                    <SetupType>
                        <TitleTypeAuction>{state.language?.CROWD_SALE_RATE}</TitleTypeAuction>
                        <ValueTypeAuction>{rate}</ValueTypeAuction>
                    </SetupType>
                    <SetupType>
                        <ValueTypeAuction>{`Your token will have a ratio of 1 ${paymentCurrency.symbol[chainId]} for ${1/ rate} ${symbol}`}</ValueTypeAuction>
                    </SetupType>
                </WrapperInside>
                <WrapperInside>
                    <SetupType>
                        <TitleTypeAuction>{state.language?.PAYMENT_CURRENCY}</TitleTypeAuction>
                        <ValueTypeAuction>{paymentCurrency.fullName[chainId]} ({paymentCurrency.symbol[chainId]})</ValueTypeAuction>
                    </SetupType>
                    <SetupType>
                        <TitleTypeAuction>{state.language?.FUND_WALLET}</TitleTypeAuction>
                        <ValueTypeAuction>{account}</ValueTypeAuction>
                    </SetupType>
                    <SetupType>
                        <TitleTypeAuction>{state.language?.PRICE_SETTING}</TitleTypeAuction>
                        <ValueTypeAuction>{state.language?.MIN_PRICE}</ValueTypeAuction>
                        <ValueTypeAuction>{minPrice} {paymentCurrency[chainId]}</ValueTypeAuction>
                    </SetupType>
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
