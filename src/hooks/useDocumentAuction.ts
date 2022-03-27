import { getContract } from "./useContract"
import { useActiveWeb3React, getWeb3Contract } from "."
import { calculateGasMargin } from "../utils"
import { useAuctionState } from '../store'
import { useHelperContract } from "./useContract"

const abiAuctionBatch = require('../constants/abis/BatchAuction.json')
// const abiAuctionDutch = require('../constants/abis/DutchAuction.json')
const abiCrowdsale = require('../constants/abis/PrivateSale.json')

export const useDocumentAuction = () => {
    const { library, account }: any = useActiveWeb3React();
    const [ , actions ] = useAuctionState()
    const helperContract = useHelperContract()

    const setDocument = async (address: any, key: any, value: any) => {
        const getTemplateContract = getWeb3Contract(abiAuctionBatch.abi, address)
        const typeAuction = await getTemplateContract.methods.marketTemplate().call()
        const ABI = Number(typeAuction) === 2 ? abiAuctionBatch.abi : abiCrowdsale.abi
        const contract = getContract(address, ABI, library, account)
        return await contract.estimateGas.setDocument(key, value)
        .then(async (res:any) => {
            const call = await contract.setDocument( key, value, {
                gasLimit: calculateGasMargin(res)
            })
            return call
        })
        .then(async (res) => {
            actions.updateTransactionPending(true)
            actions.uploadingButtonUpdateDocs(true)
            res.wait().then(() => {
                actions.updateTransactionPending(false)
                actions.uploadingButtonUpdateDocs(false)
                window.location.reload(); 
            })
        })
        .catch(err => {
            // 
        })
    }

    const getDocument = async (address: any) => {
        const getTemplateContract = getWeb3Contract(abiAuctionBatch.abi, address)
        const typeAuction = await getTemplateContract.methods.marketTemplate().call()
        const docs =  Number(typeAuction) === 2 ? helperContract?.getBatchAuctionInfo(address) : helperContract?.getCrowdsaleInfo(address)
        return docs
    }

    const setDocumentAll = async (address: any, name: any, data: any) => {
        const getTemplateContract = getWeb3Contract(abiAuctionBatch.abi, address)
        const typeAuction = await getTemplateContract.methods.marketTemplate().call()
        const ABI = Number(typeAuction) === 2 ? abiAuctionBatch.abi : abiCrowdsale.abi
        const contract = getContract(address, ABI, library, account)
        return await contract.estimateGas.setDocuments(name, data)
        .then(async (res:any) => {
            const call = await contract.setDocuments( name, data, {
                gasLimit: calculateGasMargin(res)
            })
            return call
        })
        .then(async (res) => {
            actions.updateTransactionPending(true)
            actions.uploadingButtonUpdateDocs(true)
            res.wait().then(() => {
                actions.updateTransactionPending(false)
                actions.uploadingButtonUpdateDocs(false)
                window.location.reload(); 
            })
        })
        .catch(err => {
            // 
        })
    }

    return {
        setDocument: setDocument,
        getDocument: getDocument,
        setDocumentAll: setDocumentAll
    }
}