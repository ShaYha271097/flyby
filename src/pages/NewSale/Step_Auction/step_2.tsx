import React from 'react'

import Text from '../../../components/Text'
import { useAuctionState } from '../../../store'
import {
    AuctionToken,
    Row,
    AuctionTokenSetting,
    WrapperText,
    SelectToken,
    TextErr,
    ButtonApprove,
    Amount
} from '../styled'

const Step2 = ({ addressErr, amountErr, amount, onInputAmount, allowance, address, handleApprove, handleSelectToken, symbol, balance, name }: { addressErr: any, amountErr: any, amount: any, onInputAmount: any, allowance: any, address: any, handleApprove: any, handleSelectToken: any, symbol: any, balance: any, name: any }) => {

    const [state] = useAuctionState()

    return (
        <>
            <AuctionToken>
                <AuctionTokenSetting>
                    <Text size="2rem">{state.language?.AUCTION_TOKEN}</Text>
                    <SelectToken err={addressErr ? true : false} type="text" value={address} placeholder="Paste the address of token you would like to auction" required onChange={(e) => { handleSelectToken(e.target.value) }} />
                    {addressErr ? <TextErr>{addressErr}</TextErr> : ''}
                    <Text size="2rem">{state.language?.TOKEN_AMOUNT}</Text>
                    <Amount value={amount} onChange={(e) => onInputAmount(e.target.value.replace(/,/g, "."))} disabled={addressErr || !address ? true : false} type="text" placeholder={`0.000000 ${symbol}`} required />
                    {amountErr ? <TextErr>{amountErr}</TextErr> : ''}
                    {amount && Number(amount) > allowance ? <ButtonApprove onClick={handleApprove}>{state.language?.APPROVE_TOKEN}</ButtonApprove> : <></>}
                </AuctionTokenSetting>
                <AuctionTokenSetting style={{ display: 'flex', alignItems: 'center' }}>
                    <WrapperText>
                        <Text>{state.language?.TOKENINFO}</Text>
                        {address ?
                            <Row>
                                <Text>{state.language?.TOKEN}: </Text>
                                <Text>{name} ( {symbol} )</Text>
                            </Row>
                            :
                            ""
                        }
                        <Row>
                            <Text>{state.language?.YOUR_TOKEN_BALANCE}: </Text>
                            <Text>{balance}</Text>
                        </Row>
                        <Row>
                            <Text>{state.language?.YOUR_TOKEN_ALLOWANCE}: </Text>
                            <Text>{allowance}</Text>
                        </Row>
                    </WrapperText>
                </AuctionTokenSetting>
            </AuctionToken>
        </>
    )
}

export default Step2
