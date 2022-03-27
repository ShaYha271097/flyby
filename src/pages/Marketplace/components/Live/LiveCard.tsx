import React from 'react'
import BatchCard from '../Card/BatchCard'
// import DutchCard from '../Card/DutchCard'
import CrowSaleCard from '../Card/CrowSaleCard'


const LiveCard = ({ data }: { data: any }) => {

    const templateId = Number(data.marketTemplate)
    return (
        <>
            {
                templateId === 2
                ? <BatchCard data={data} status={'live'} />
                // : templateId === 2
                //     ? <DutchCard data={data} status={'live'} />
                    : <CrowSaleCard data={data} status={'live'} />
            }
        </>
    )
}

export default LiveCard