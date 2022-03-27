import React from 'react'

import Text from '../../../components/Text'
import Rocket from '../../../assets/images/rocket-small.png'
import { useAuctionState } from '../../../store'
import {
    RowBetween,
    AuctionType,
    Row,
    Radio,
    LabelRadio,
    CheckRadio
} from '../styled'
import styled from 'styled-components'

const Step1 = ({ handleSelectAuctionType }: { handleSelectAuctionType: any }) => {

    const [state] = useAuctionState()

    return (
        <>
            {/* <Text size="2rem">{state.language?.AUCTION_TYPE}*</Text> */}
            <RowBetween style={{ justifyContent: 'center' }} gap="10%">
                <AuctionType>
                <Image width="149" height="204" src={Rocket} alt="batch auction icon" />
                    <Row onClick={() => handleSelectAuctionType('crowdsale')} >
                        <Radio id="crowdsale-option" type="radio" defaultChecked />
                        <LabelRadio htmlFor="crowdsale-option"></LabelRadio>
                        <CheckRadio className='check'></CheckRadio>
                        <Text size="1.2rem" style={{ marginTop: 0 }}>{state.language?.CROW_SALE}</Text>
                    </Row>
                    {/* <Text size=".8rem">{state.language?.CROWDSALE_DESCRIPTION_1}</Text> */}
                    {/* <Text style={{ fontStyle: "italic" }} size=".8rem">{state.language?.CROWDSALE_DESCRIPTION_2}</Text> */}
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
