import React from 'react'
import BatchCard from '../Card/BatchCard'
import CrowSaleCard from '../Card/CrowSaleCard'

const CompleteCard = ({ data }: { data: any }) => {

    const templateId = Number(data.marketTemplate)
    return (
        <>
            {
                templateId === 2
                ? <BatchCard data={data} />
                : <CrowSaleCard data={data} />
            }
        </>
    )
}

export default CompleteCard