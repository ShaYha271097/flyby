import { getContract } from "./useContract"
import { useActiveWeb3React, getWeb3Contract } from "."
import { calculateGasMargin } from "../utils"
import { useAuctionState } from '../store'

const abiAuctionBatch = require('../constants/abis/BatchAuction.json')
const abiCrowdsale = require('../constants/abis/PrivateSale.json')

export const useAuctionCommit = (paymentCurrency: any) => {
    const { library, account }: any = useActiveWeb3React();
    const [ , actions ] = useAuctionState()

    const commitETH = async (address: any, amountEth: any) => {
        const getTemplateContract = getWeb3Contract(abiAuctionBatch.abi, address)
        const typeAuction = await getTemplateContract.methods.marketTemplate().call()
        const ABI = Number(typeAuction) === 2 ? abiAuctionBatch.abi  : abiCrowdsale.abi
        const contract = getContract(address, ABI, library, account)
        return await contract.estimateGas.commitEth(account, true, {
            value: amountEth
        })
        .then(async (res:any) => {
            const call = await contract.commitEth( account, true, {
                gasLimit: calculateGasMargin(res),
                value: amountEth
            })
            return call
        })
        .then(async (res) => {
            actions.updateTransactionPending(true)
            return res

        })
        .catch(console.log)

    }
    
    const commitToken = async (address: any, amount:any) => {
        const getTemplateContract = getWeb3Contract(abiAuctionBatch.abi, address)
        const typeAuction = await getTemplateContract.methods.marketTemplate().call()
        const ABI = Number(typeAuction) === 2 ? abiAuctionBatch.abi : abiCrowdsale.abi
        const contract = getContract(address, ABI, library, account)
        return await contract.estimateGas.commitTokens(amount, true)
            .then(async (res:any) => {
                const call = await contract.commitTokens(amount, true, {
                    gasLimit: calculateGasMargin(res)
                })
                return call
            })
            .then(async (res: any) => {
                actions.updateTransactionPending(true)
                return res
            })
            .catch(console.log)
    }

    return {
        commitETH: commitETH,
        commitToken: commitToken
    }
}