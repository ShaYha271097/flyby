import React from 'react'

import { useAuctionState } from '../../../store'
import Text from '../../../components/Text'
import {
    AuctionToken,
    AuctionTokenSetting,
    SelectToken,
    WrapperText,
    Row,
    TextErr,
    Amount,
    ButtonApprove
} from '../styled'

const Step2 = ({ addressErr, address, handleSelectToken, amountErr, amount, onInputAmount, allowance, symbol, name, balance, handleApprove }: { addressErr: any, address: any, handleSelectToken: any, amountErr: any, amount: any, onInputAmount: any, allowance: any, symbol: any, name: any, balance: any, handleApprove: any }) => {

    const [state] = useAuctionState()

    return (
        <>
            <AuctionToken>
                <AuctionTokenSetting>
                    <Text size="2rem">Crowdsale Token</Text>
                    <SelectToken err={addressErr ? true : false} type="text" value={address} placeholder="Paste the address of token you would like to private sale" required onChange={(e) => { handleSelectToken(e.target.value) }} />
                    {addressErr ? <TextErr>{addressErr}</TextErr> : ''}
                    <Text size="2rem">{state.language?.TOKEN_AMOUNT}</Text>
                    <Amount value={amount} onChange={(e) => onInputAmount(e.target.value.replace(/,/g, "."))} disabled={addressErr || !address ? true : false} type="text" placeholder={`0.000000 ${symbol}`} required />
                    {amountErr ? <TextErr>{amountErr}</TextErr> : ''}
                    {amount && Number(amount) > allowance && !state.transactionPending ? <ButtonApprove onClick={handleApprove}>{state.language?.APPROVE_TOKEN}</ButtonApprove> : <></>}
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
