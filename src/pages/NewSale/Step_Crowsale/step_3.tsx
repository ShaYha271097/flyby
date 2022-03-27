import React from 'react'

import Text from '../../../components/Text'
import DataTime from '../../../components/DateTime'
import { paymentTokenCurrency } from '../../../constants'
import { useAuctionState } from '../../../store'
import {
    Step3Wraper,
    Step3,
    WrapperPaymentCurrency,
    CoinSelect,
    Img,
    Space,
    MinPrice,
    TextErr
} from '../styled'
import { useActiveWeb3React } from '../../../hooks/index';

const Step3Component = ({ paymentCurrency, minPrice, handleChangeMinPrice, setPaymentCurrency, rate, handleSetTime, handleGetTime, timeValid, setRate, tokensPaymentInTokensSale, setTokensPaymentInTokensSale, symbol, amount }: { paymentCurrency: any, minPrice: any, handleChangeMinPrice: any, setPaymentCurrency: any, rate: any, handleSetTime: any, handleGetTime: any, timeValid: any, setRate: any, tokensPaymentInTokensSale: any, setTokensPaymentInTokensSale: any, symbol: any, amount: any }) => {

    const [state] = useAuctionState()
    const { chainId }: any = useActiveWeb3React();

    return (
        <>
            <Step3Wraper>
                <Step3 className="left">
                    <Text size="2rem">{state.language?.PAYMENT_CURRENCY}</Text>
                    <WrapperPaymentCurrency>
                        <CoinSelect className={paymentCurrency === paymentTokenCurrency.NATIVE.address[chainId] ? 'active' : ''} onClick={() => setPaymentCurrency(paymentTokenCurrency.NATIVE.address[chainId])}><Img src={paymentTokenCurrency.NATIVE.logo[chainId]} />&nbsp;&nbsp;{paymentTokenCurrency.NATIVE.symbol[chainId]}</CoinSelect>
                        <CoinSelect className={paymentCurrency === paymentTokenCurrency.USDC.address[chainId] ? 'active' : ''} onClick={() => setPaymentCurrency(paymentTokenCurrency.USDC.address[chainId])}><Img src={paymentTokenCurrency.USDC.logo[chainId]} />&nbsp;&nbsp;{paymentTokenCurrency.USDC.symbol[chainId]}</CoinSelect>
                        <CoinSelect className={paymentCurrency === paymentTokenCurrency.USDT.address[chainId] ? 'active' : ''} onClick={() => setPaymentCurrency(paymentTokenCurrency.USDT.address[chainId])}><Img src={paymentTokenCurrency.USDT.logo[chainId]} />&nbsp;&nbsp;{paymentTokenCurrency.USDT.symbol[chainId]}</CoinSelect>
                        <CoinSelect className={paymentCurrency === paymentTokenCurrency.DAI.address[chainId] ? 'active' : ''} onClick={() => setPaymentCurrency(paymentTokenCurrency.DAI.address[chainId])}><Img src={paymentTokenCurrency.DAI.logo[chainId]} />&nbsp;&nbsp;{paymentTokenCurrency.DAI.symbol[chainId]}</CoinSelect>
                    </WrapperPaymentCurrency>
                    <Space />
                </Step3>
                <Step3 className='right'>
                    <Space />
                    <Text size="2rem">{state.language?.CROW_SALE_SETTING}</Text>
                    <Text size="1rem">{state.language?.MIN_PRICE}</Text>
                    <MinPrice
                        type="text"
                        placeholder={`0.000000 ${paymentCurrency === paymentTokenCurrency.NATIVE.address[chainId] ? paymentTokenCurrency.NATIVE.symbol[chainId] : paymentCurrency === paymentTokenCurrency.USDC.address[chainId] ? 'USDC' : paymentCurrency === paymentTokenCurrency.USDT.address[chainId] ? 'USDT' : 'DAI'}`}
                        value={minPrice}
                        onChange={(e) => { handleChangeMinPrice(e.target.value.replace(/,/g, ".")) }}
                        pattern='^[0-9]*[.,]?[0-9]*$' inputMode='decimal' autoComplete='off'
                        autoCorrect='off'
                        minLength={1}
                        maxLength={79}
                    />
                    <Space />
                    <Text size="1rem">{state.language?.RATE}</Text>
                    <MinPrice
                        type="text"
                        placeholder='Number of token units a buyer gets per wei or token'
                        value={rate}
                        pattern='^[0-9]*[.,]?[0-9]*$' inputMode='decimal' autoComplete='off'
                        autoCorrect='off'
                        minLength={1}
                        maxLength={79}
                        onChange={(e) => {
                            setRate(e.target.value.replace(/,/g, ".")) 
                        }}
                    />
                    <Space />
                    {
                        (rate && Number(rate) !== 0) ? <p>{`Your token will have a ratio of 1 ${paymentCurrency === paymentTokenCurrency.NATIVE.address[chainId] ? paymentTokenCurrency.NATIVE.symbol[chainId] : paymentCurrency === paymentTokenCurrency.USDC.address[chainId] ? 'USDC' : paymentCurrency === paymentTokenCurrency.USDT.address[chainId] ? 'USDT' : 'DAI'} for ${1/ rate} ${symbol}`}</p>
                        : <></>
                    }
                    <Space />
                    <DataTime
                        setTime={handleSetTime}
                        getTime={handleGetTime}
                    />
                    {timeValid ? <TextErr>{timeValid}</TextErr> : <></>}
                </Step3>
            </Step3Wraper>
        </>
    )
}

export default Step3Component
