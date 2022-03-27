// import { ethers } from 'ethers';
import { getWeb3Contract, useActiveWeb3React } from '.'
import { calculateGasMargin } from '../utils';
import { getContract } from './useContract';
import { useAuctionState } from '../store'
import { useMarketContract } from './useContract';

const abiAuctionBatch = require('../constants/abis/BatchAuction.json')
// const abiAuctionDutch = require('../constants/abis/DutchAuction.json')
const abiCrowdsale = require('../constants/abis/PrivateSale.json')

export const useFinalizedAuction = (address: string) => {

    const { library, account }: any = useActiveWeb3React();
    const [ , actions ] = useAuctionState()
    const marketContract = useMarketContract()

    const usingContract = async () => {
        const info = await marketContract?.auctionInfo(address)
        const ABI = info.templateId === '2' ? abiAuctionBatch.abi : abiCrowdsale.abi
        const contract = getContract(address, ABI, library, account)
        return contract
    }

    const usingContractWeb3 = async () => {
        const info = await marketContract?.auctionInfo(address)
        const ABI = info.templateId === '2' ? abiAuctionBatch.abi: abiCrowdsale.abi
        const contract = getWeb3Contract(ABI, address)
        return contract
    }

    const confirmFinalizeAuction = async () => {
        try {
            const contract = await usingContract()
            return await contract.estimateGas.finalize()
                .then(async (res) => {
                    const call = await contract.finalize({gasLimit: calculateGasMargin(res)})
                    return call
                })
                .then(async (response: any) => {
                    await actions.updateTransactionPending(true)
                    await response.wait().then(async (res: any) => {
                        actions.updateTransactionPending(false)
                        window.location.reload(); 
                    })
                })
                .catch((err: any) => {
                    actions.updateTransactionPending(false)
                }) 
        } catch (err) {
            actions.updateTransactionPending(false)
        }
    }

    const confirmClaimAuctionTokenUser = async () => {
            const contract = await usingContractWeb3()
            const gasLimit = await contract.methods.withdrawTokens(account).estimateGas();
            await actions.updateTransactionPending(true)
            return await contract.methods.withdrawTokens(account).send({from: account, gasLimit: gasLimit})
            .then(async (response: any) => {
                actions.updateTransactionPending(false)
                window.location.reload()
            })
            .catch((err: any) => {
                console.log(err)
                actions.updateTransactionPending(false)
            }) 
    }

    const getFinalizedStatus = async () => {
        const info = await marketContract?.auctionInfo(address)
        const ABI = info.templateId === '2' ? abiAuctionBatch.abi : abiCrowdsale.abi
        const contract = getWeb3Contract(ABI, address)
        const finalizeStatus = await contract.methods.finalized().call()
        const auctionSuccessful = await contract.methods.auctionSuccessful().call()
        const commitments = await contract.methods.commitments(account).call()
        return {
            finalizeStatus,
            auctionSuccessful,
            commitments
        }
    }

    return {
        confirmFinalizeAuction,
        getFinalizedStatus,
        confirmClaimAuctionTokenUser
    }
}