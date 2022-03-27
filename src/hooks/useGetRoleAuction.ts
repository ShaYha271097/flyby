import { getWeb3Contract, useActiveWeb3React } from '.'
// import { useMarketContract } from './useContract'

const abiAuctionBatch = require('../constants/abis/BatchAuction.json')

export const useGetRoleAuction = (address: string) => {

    const { account }: any = useActiveWeb3React();

    const usingContract = async () => {
        const ABI = abiAuctionBatch.abi
        const contract = getWeb3Contract(ABI, address)
        return contract
    }

    const getHasRoleAdminAuction = async () => {
        const contract = await usingContract()
        const adminRole = await contract.methods.hasAdminRole(account).call()
        return adminRole
    }

    return {
        getHasRoleAdminAuction
    }
}