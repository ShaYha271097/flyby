import { ethers } from 'ethers';
import { calculateGasMargin } from '../utils';
import { useMarketContract } from './useContract';
import { useAuctionState } from '../store'

export const useCreateAuction = () => {
    const [, actions] = useAuctionState()
    const auctionContract = useMarketContract()

    const createAuctionBatch = async (
        type: any,
        tokenAddress: any,
        tokenSupply: any,
        data: any
    ) => {
        const newData = new ethers.utils.AbiCoder()
        const flybyNartketData = newData.encode(["address", "address", "uint256", "uint256", "uint256", "address", "uint256", "address", "address", "address"], data)
        const addressContract = await auctionContract?.callStatic.createMarket(
            type,
            tokenAddress,
            tokenSupply,
            flybyNartketData
        )

        return await auctionContract?.estimateGas.createMarket(
            type,
            tokenAddress,
            tokenSupply,
            flybyNartketData
        )
            .then(async (res: any) => {
                const call = await auctionContract?.createMarket(
                    type,
                    tokenAddress,
                    tokenSupply,
                    flybyNartketData,
                    {
                        gasLimit: calculateGasMargin(res)
                    }
                )
                return call
            })
            .then(async (response: any) => {
                actions.updateTransactionAddress(response.hash)
                actions.updateShowPopupSuccessCreateAuction(true)
                actions.updateTransactionPending(true)
                await response.wait().then(async (res: any) => {
                    actions.updateTransactionPending(false)
                })
            })
            .then(() => {
                return addressContract
            })
            .catch(err => {
                console.log('create batchAuction failed:', err)
            })
    }

    const createAuctionDutch = async (
        type: any,
        tokenAddress: any,
        tokenSupply: any,
        // fundAddress: any,
        data: any
    ) => {
        const newData = new ethers.utils.AbiCoder()
        const flybyNartketData = newData.encode(["address", "address", "uint256", "uint256", "uint256", "address", "uint256", "uint256", "address", "address", "address"], data)
        const addressContract = await auctionContract?.callStatic.createMarket(
            type,
            tokenAddress,
            tokenSupply,
            // fundAddress,
            flybyNartketData
        )
        return await auctionContract?.estimateGas.createMarket(
            type,
            tokenAddress,
            tokenSupply,
            // fundAddress,
            flybyNartketData
        ).then(async (res: any) => {
            const call = await auctionContract.createMarket(
                type,
                tokenAddress,
                tokenSupply,
                // fundAddress,
                flybyNartketData,
                {
                    gasLimit: calculateGasMargin(res)
                }
            )
            return call
        })
            .then(async (response: any) => {
                actions.updateTransactionAddress(response.hash)
                actions.updateShowPopupSuccessCreateAuction(true)
                actions.updateTransactionPending(true)
                await response.wait().then(async (res: any) => {
                    actions.updateTransactionPending(false)
                })
            })
            .then(() => {
                return addressContract
            })
            .catch(err => {
            })
    }

    const createCrowSale = async (
        type: any,
        tokenAddress: any,
        tokenSupply: any,
        // fundAddress: any,
        data: any
    ) => {
        const newData = new ethers.utils.AbiCoder()
        const flybyNartketData = newData.encode([ "address", "address", "address", "uint256", "uint256", "uint256", "uint256", "uint256", "address", "address", "address"], data)
        const addressContract = await auctionContract?.callStatic.createMarket(
            type,
            tokenAddress,
            tokenSupply,
            flybyNartketData,
        )
        return await auctionContract?.estimateGas.createMarket(
            type,
            tokenAddress,
            tokenSupply,
            flybyNartketData
        ).then(async (res: any) => {
            console.log('gas >>>>>>>>', ethers.utils.formatUnits(res, 0))
            const call = await auctionContract.createMarket(
                type,
                tokenAddress,
                tokenSupply,
                flybyNartketData,
                {
                    gasLimit: calculateGasMargin(res)
                }
            )
            return call
        })
        .then(async (response: any) => {
            actions.updateTransactionAddress(response.hash)
            actions.updateShowPopupSuccessCreateAuction(true)
            actions.updateTransactionPending(true)
            await response.wait().then(async (res: any) => {
                actions.updateTransactionPending(false)
            })
        })
        .then(() => {
            return addressContract
        })
        .catch(err => {
        })
    }


    return {
        createCrowSale,
        createAuctionBatch,
        createAuctionDutch
    }
}