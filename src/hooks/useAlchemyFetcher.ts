import axios from 'axios'
import { useActiveWeb3React } from 'hooks'
import { ethers } from 'ethers'
import { getContract } from './useContract'
import { abi as AUCTION_ABI } from '../constants/abis/BatchAuction.json'

export const useAlchemyFetcher = () => {
    const alchemyApiUrl = useAlchemyApiUrl()
    const { account, library } : any = useActiveWeb3React()

    const getBalance = async() => {
        const params = [account, 'latest']
        const balance = await axios.post(alchemyApiUrl, {
            "jsonrpc":"2.0",
            "method":"eth_getBalance",
            "params": params,
            "id":0
        })
        return balance
    }

    const getCommitAuction = async(address: string) => {
        console.log('adddddd',address)
        const auctionContract = getContract(address, AUCTION_ABI, library)
        const topic = auctionContract?.interface.getEventTopic("AddedCommitment(address, uint256)")
        const params = [
            {   
                "fromBlock": ethers.utils.parseUnits("9935827", 0).toHexString(),
                "toBlock": ethers.utils.parseUnits("9935835", 0).toHexString(),
                "address": address,
                "topics": [topic]
            }
        ]
        console.log('alchemy api url', alchemyApiUrl)
        const commitDatas = await axios.post(alchemyApiUrl, {
            "jsonrpc":"2.0",
            "method":"eth_getLogs",
            "params": params,
            "id":0
        })
        return commitDatas
    }

    return {
        getBalance,
        getCommitAuction
    }
}

export const useAlchemyApiUrl = () => {
    const { chainId } : any = useActiveWeb3React();
    const apiKey = process.env.REACT_APP_ALCHEMY_API_KEY
    const domainByChainId : any = {
        1: "https://polygon-mumbai.g.alchemy.com/v2/" + apiKey,
        4: "https://eth-rinkeby.g.alchemy.com/v2/" + apiKey,
        56: "https://polygon-mumbai.g.alchemy.com/v2/" + apiKey,
        97: "https://polygon-mumbai.g.alchemy.com/v2/" + apiKey,
        137: "https://polygon-mumbai.g.alchemy.com/v2/" + apiKey,
        80001: "https://polygon-mumbai.g.alchemy.com/v2/" + apiKey,
        43114: "https://polygon-mumbai.g.alchemy.com/v2/" + apiKey,
        43113: "https://polygon-mumbai.g.alchemy.com/v2/" + apiKey
    }

    return domainByChainId[chainId]
}