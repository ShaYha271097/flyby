import { MARKET_ADDRESS } from './../constants/index'
import axios from 'axios'
import { useActiveWeb3React } from 'hooks'

export const useAuctionFetcher = () => {
    const saveUrl = 'https://api-data.maintest.net/auction/save-commitment'
    const getUrl = 'https://api-data.maintest.net/auction/get-commitment?'
    const { chainId, account, library } : any = useActiveWeb3React()

    const saveCommits = async(auctionAddress: string, commitment: number, txHash: string) => {
        const blockNumber = await library?.getBlockNumber()
        const params = {
            chainId: chainId,
            auctionAddress: auctionAddress,
            marketAddress: MARKET_ADDRESS[chainId],
            block: blockNumber,
            commitment: commitment,
            account: account,
            txHash: txHash
        }
        const result = await axios.post(saveUrl, params)
        return result
    }

    const getCommits = async(auctionAddress: string) => {
        const url = getUrl + `chainId=${chainId}&marketAddress=${MARKET_ADDRESS[chainId]}&auctionAddress=${auctionAddress}`
        return await axios.get(url)
    }

    return {
        saveCommits,
        getCommits
    }
}