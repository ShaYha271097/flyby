import React from 'react'

import Text from '../../../components/Text'
import DataTime from '../../../components/DateTime'
import { paymentTokenCurrency } from '../../../constants'
import { useAuctionState } from '../../../store'
import {
    Step3Wraper,
    Step3,
    CoinSelect,
    WrapperPaymentCurrency,
    Space,
    MinPrice,
    TextErr,
    Img
} from '../styled'
import { useActiveWeb3React } from '../../../hooks/index';

const Step3Component = ({ paymentCurrency, setPaymentCurrency, auctionType, minPrice, handleChangeMinPrice, startingPrice, handleChangeStartingPrice, endedPrice, handleChangeEndedPrice, handleSetTime, handleGetTime, timeValid }: { paymentCurrency: any, setPaymentCurrency: any, auctionType: any, minPrice: any, handleChangeMinPrice: any, startingPrice: any, handleChangeStartingPrice: any, endedPrice: any, handleChangeEndedPrice: any, handleSetTime: any, handleGetTime: any, timeValid: any }) => {

    const [state] = useAuctionState()
    const { chainId }: any = useActiveWeb3React();

    return (
        <>
            <Step3Wraper>
                <Step3 className="left">
                    <Text size="2rem">Payment Currency</Text>
                    <WrapperPaymentCurrency>
                        <CoinSelect className={paymentCurrency && paymentCurrency.address[chainId] === paymentTokenCurrency.NATIVE.address[chainId] ? 'active' : ''} onClick={() => setPaymentCurrency(paymentTokenCurrency.NATIVE)}><Img src={paymentTokenCurrency.NATIVE.logo[chainId]} />&nbsp;&nbsp;{paymentTokenCurrency.NATIVE.symbol[chainId]}</CoinSelect>
                        <CoinSelect className={paymentCurrency && paymentCurrency.address[chainId] === paymentTokenCurrency.USDC.address[chainId] ? 'active' : ''} onClick={() => setPaymentCurrency(paymentTokenCurrency.USDC)}><Img src={paymentTokenCurrency.USDC.logo[chainId]} />&nbsp;&nbsp;{paymentTokenCurrency.USDC.symbol[chainId]}</CoinSelect>
                        <CoinSelect className={paymentCurrency && paymentCurrency.address[chainId] === paymentTokenCurrency.USDT.address[chainId] ? 'active' : ''} onClick={() => setPaymentCurrency(paymentTokenCurrency.USDT)}><Img src={paymentTokenCurrency.USDT.logo[chainId]} />&nbsp;&nbsp;{paymentTokenCurrency.USDT.symbol[chainId]}</CoinSelect>
                        <CoinSelect className={paymentCurrency && paymentCurrency.address[chainId] === paymentTokenCurrency.DAI.address[chainId] ? 'active' : ''} onClick={() => setPaymentCurrency(paymentTokenCurrency.DAI)}><Img src={paymentTokenCurrency.DAI.logo[chainId]} />&nbsp;&nbsp;{paymentTokenCurrency.DAI.symbol[chainId]}</CoinSelect>
                        <CoinSelect className={paymentCurrency && paymentCurrency.address[chainId] === paymentTokenCurrency.BUSD.address[chainId] ? 'active' : ''} onClick={() => setPaymentCurrency(paymentTokenCurrency.BUSD)}><Img src={paymentTokenCurrency.BUSD.logo[chainId]} />&nbsp;&nbsp;{paymentTokenCurrency.BUSD.symbol[chainId]}</CoinSelect>
                    </WrapperPaymentCurrency>
                    <Space />
                </Step3>
                <Step3 className='right'>
                    <Space />
                    {
                        auctionType === 'batch'
                            ? <>
                                <Text size="2rem">{state.language?.BATCH_AUCTION_SETING}</Text>
                                <Text size="1rem">{state.language?.MIN_PRICE.toUpperCase()}</Text>
                                <MinPrice
                                    type="text"
                                    placeholder={`0.000000`}
                                    value={minPrice}
                                    onChange={(e) => { handleChangeMinPrice(e.target.value.replace(/,/g, ".")) }}
                                    pattern='^[0-9]*[.,]?[0-9]*$' inputMode='decimal' autoComplete='off'
                                    autoCorrect='off'
                                    minLength={1}
                                    maxLength={79}
                                />
                            </>
                            : <>
                                <Text size="2rem">{state.language?.DUTCH_AUCTION_SETING}</Text>

                                <Text size="1rem">{state.language?.STARTING_PRICE}</Text>
                                <MinPrice
                                    type="text"
                                    placeholder={`0.000000`}
                                    value={startingPrice}
                                    onChange={(e) => { handleChangeStartingPrice(e.target.value.replace(/,/g, ".")) }}
                                    pattern='^[0-9]*[.,]?[0-9]*$' inputMode='decimal' autoComplete='off'
                                    autoCorrect='off'
                                    minLength={1}
                                    maxLength={79}
                                />

                                <Text size="1rem">{state.language?.ENDING_PRICE}</Text>
                                <MinPrice
                                    type="text"
                                    placeholder={`0.000000`}
                                    value={endedPrice}
                                    onChange={(e) => { handleChangeEndedPrice(e.target.value.replace(/,/g, ".")) }}
                                    pattern='^[0-9]*[.,]?[0-9]*$' inputMode='decimal' autoComplete='off'
                                    autoCorrect='off'
                                    minLength={1}
                                    maxLength={79}
                                />
                            </>
                    }
                    <Space />
                    <DataTime
                        setTime={handleSetTime}
                        getTime={handleGetTime}
                    />
                    { timeValid ? <TextErr>{timeValid}</TextErr> : <></> }
                </Step3>
            </Step3Wraper>
        </>
    )
}

export default Step3Component
