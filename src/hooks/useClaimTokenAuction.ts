import { getWeb3Contract } from '.'
// import { useMarketContract } from './useContract'

const abiAuctionBatch = require('../constants/abis/BatchAuction.json')

export const useClaimTokenAuction = (address: string) => {
    // const marketContract = useMarketContract();

    const usingContract = async () => {
        const ABI = abiAuctionBatch.abi
        const contract = getWeb3Contract(ABI, address)
        return contract
    }

    const getTokensClaimable = async (account:any) => {
        const contract = await usingContract()
        const tokensClaim = await contract.methods.tokensClaimable(account).call()
        return tokensClaim
    }

    const getTokensClaimed = async (account: any) => {
        const contract = await usingContract()
        const tokensClaimed = await contract.methods.claimed(account).call()
        return tokensClaimed
    }

    return {
        getTokensClaimable,
        getTokensClaimed
    }
}