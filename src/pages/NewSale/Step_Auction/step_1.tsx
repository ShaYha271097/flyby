import React from 'react'

import Text from '../../../components/Text'
import { useAuctionState } from '../../../store'
import Rocket from '../../../assets/images/rocket-small.png'
import {
    RowBetween,
    AuctionType,
    Row,
    Radio,
    LabelRadio,
    CheckRadio
} from '../styled'
import styled from 'styled-components'

const Step1 = ({ handleSelectTypeAuction, auctionType }: { handleSelectTypeAuction: any, auctionType: any }) => {

    const [state] = useAuctionState()

    return (
        <>
            <Text size="2rem">{state.language?.AUCTION_TYPE}*</Text>
            <RowBetween gap="10%">
                <AuctionType>
                    <Image width="149" height="204" src={Rocket} alt="dutch auction icon" />
                    <Row onClick={() => handleSelectTypeAuction('dutch')} >
                        <Radio id="dutch-option" type="radio" onChange={() => {}} checked={auctionType === 'dutch'} />
                        <LabelRadio htmlFor="dutch-option"></LabelRadio>
                        <CheckRadio className='check'></CheckRadio>
                        <Text size="1.2rem" style={{ marginTop: 0 }}>{state.language?.DUTCH_AUCTION}</Text>
                    </Row>
                    <Text size=".8rem">{state.language?.DUTCH_AUCTION_DESCRIPTION_1}</Text>
                    <Text style={{ fontStyle: "italic" }} size=".8rem">{state.language?.DUTCH_AUCTION_DESCRIPTION_2}</Text>
                </AuctionType>
                <AuctionType onClick={() => handleSelectTypeAuction('batch')}>
                    <Image width="149" height="204" src={Rocket} alt="batch auction icon" />
                    <Row>
                        <Radio id="batch-option" type="radio" onChange={() => {}} checked={auctionType === 'batch'} />
                        <LabelRadio htmlFor="batch-option"></LabelRadio>
                        <CheckRadio className='check'></CheckRadio>
                        <Text size="1.2rem" style={{ marginTop: 0 }}>{state.language?.BATCH_AUCTION}</Text>
                    </Row>
                    <Text size=".8rem">{state.language?.BATCH_AUCTION_DESCRIPTION_1}</Text>
                    <Text style={{ fontStyle: "italic" }} size=".8rem">{state.language?.BATCH_AUCTION_DESCRIPTION_2}</Text>
                </AuctionType>
            </RowBetween>
        </>
    )
}

const Image = styled.img`
    max-width: 60px;
    max-height: 80px;
    width: 100%!important;
    height: 100%!important;
`;

export default Step1