import { useActiveWeb3React } from '.';
import { getWeb3Contract } from '.'
import { WETH, ETH, nativeCurrency } from '../constants'
import { getContract, useMarketContract, useMulticallContract } from './useContract'

const abiAuctionBatch = require('../constants/abis/BatchAuction.json')
const abiAuctionDutch = require('../constants/abis/DutchAuction.json')
const abiCrowdsale = require('../constants/abis/PrivateSale.json')
const ERC20_ABI = require('../constants/abis/erc20.json');
const WETH_ABI = require('../constants/abis/weth.json');

export const useAllMarket = () => {
    const { library } : any = useActiveWeb3React();
    const marketContract = useMarketContract();
    const multicallContract = useMulticallContract();
    const { chainId } : any = useActiveWeb3React();
    const getMarkets = async () => {
        const result = await marketContract?.getMarkets();
        return result;
    }

    const classifyMarkets = async () => {
        try{
            const now = new Date()
            var live:any = []
            var upcoming:any = []
            var completed:any = []
            const data = await getMarkets()
            await Promise.all(data.map(async (address: any) => {
                const contract = await getWeb3Contract(abiAuctionBatch.abi, address)
                const type = await contract.methods.auctionEnded().call()
                if (type === false) {
                    const info = await contract.methods.getBaseInformation().call()
                    if (info.startTime > (now.getTime() / 1000)) {
                        const startTime = await sortUpcomingAuction(address)
                        upcoming.push({time: startTime, address: address})
                    } else {
                        const startTime = await sortLiveAuction(address)
                        live.push({time: startTime, address: address})
                    }
                } else {
                    const startTime = await sortCompleteAuction(address)
                    completed.push({time: startTime, address: address})
                }
            }))
            live.sort((a: any, b: any) => {
                return a.time - b.time
            })
            upcoming.sort((a: any, b: any) => {
                return a.time - b.time
            })
            completed.sort((a: any, b: any) => {
                return a.time - b.time
            })
            return {
                live,
                upcoming,
                completed
            }
        }
        catch(err) {
            console.log('loi roi', err)
            return {
                live: [],
                upcoming: [],
                completed: []
            }
        }
    }

    const getDataAuction = async (address: string) => {
        const contractGetTemplate = getWeb3Contract(abiAuctionDutch.abi, address)

        const marketTemplate = await contractGetTemplate.methods.marketTemplate().call()
        const abiAuction = marketTemplate === '2' ? abiAuctionBatch.abi : abiCrowdsale.abi
        const auctionContract = getContract(address, abiAuction, library)

        const tokenAuction = await auctionContract.auctionToken()
        const ABI = tokenAuction?.toLocaleLowerCase() === WETH.toLocaleLowerCase() ? WETH_ABI : ERC20_ABI;
        const tokenContract = getContract(tokenAuction, ABI, library);
        // const tokenName = await tokenContract.methods.name().call()
        // const tokenSymbol = await tokenContract.methods.symbol().call()
        // const tokenDeciamls = await tokenContract.methods.decimals().call()
        const dataTokenEncode = [
            {
                target: tokenAuction,
                callData: tokenContract.interface.encodeFunctionData('name', [])
            },
            {
                target: tokenAuction,
                callData: tokenContract.interface.encodeFunctionData('symbol', [])
            },
            {
                target: tokenAuction,
                callData: tokenContract.interface.encodeFunctionData('decimals', [])
            },
        ]
        const [,dataToken] = await multicallContract?.callStatic.aggregate(dataTokenEncode)

        const dataTokenDecode = {
            name : tokenContract?.interface.decodeFunctionResult('name', dataToken[0])[0],
            symbol : tokenContract?.interface.decodeFunctionResult('symbol', dataToken[1])[0],
            decimals : tokenContract?.interface.decodeFunctionResult('decimals', dataToken[2])[0]
        }

        let paymentCurrencyName
        let paymentCurrencySymbol
        let paymentCurrencyDecimals
        const paymentCurrency = await auctionContract.paymentCurrency()
        if (paymentCurrency.toLowerCase() === ETH.toLowerCase()) {
            paymentCurrencyName = nativeCurrency.name[chainId]
            paymentCurrencySymbol = nativeCurrency.symbol[chainId]
            paymentCurrencyDecimals = 18
        } else {
            const paymentCurrencyAbi = paymentCurrency?.toLowerCase() === WETH.toLowerCase() ? WETH_ABI : ERC20_ABI
            const paymentCurrencyContract = getContract(paymentCurrency, paymentCurrencyAbi, library)
            const dataPaymentTokenEncode = [
                {
                    target: paymentCurrency,
                    callData: paymentCurrencyContract.interface.encodeFunctionData('name', [])
                },
                {
                    target: paymentCurrency,
                    callData: paymentCurrencyContract.interface.encodeFunctionData('symbol', [])
                },
                {
                    target: paymentCurrency,
                    callData: paymentCurrencyContract.interface.encodeFunctionData('decimals', [])
                },
            ]
            const [,dataPaymentToken] = await multicallContract?.callStatic.aggregate(dataPaymentTokenEncode)
            const dataPaymentTokenDecode = {
                name : paymentCurrencyContract?.interface.decodeFunctionResult('name', dataPaymentToken[0])[0],
                symbol : paymentCurrencyContract?.interface.decodeFunctionResult('symbol', dataPaymentToken[1])[0],
                decimals : paymentCurrencyContract?.interface.decodeFunctionResult('decimals', dataPaymentToken[2])[0]
            }
            paymentCurrencyName = dataPaymentTokenDecode.name
            paymentCurrencySymbol = dataPaymentTokenDecode.symbol
            paymentCurrencyDecimals = dataPaymentTokenDecode.decimals
        }
        const dataAuctionEncode = [
            {
                target: address,
                callData: auctionContract.interface.encodeFunctionData('tokenPrice', [])
            },
            {
                target: address,
                callData: auctionContract.interface.encodeFunctionData('marketStatus', [])
            },
            {
                target: address,
                callData: auctionContract.interface.encodeFunctionData('marketInfo', [])
            },
            {
                target: address,
                callData: auctionContract.interface.encodeFunctionData('auctionSuccessful', [])
            },
        ]
        const [,dataAuction] = await multicallContract?.callStatic.aggregate(dataAuctionEncode)
        const dataAuctionDecode = {
            tokenPrice: auctionContract.interface.decodeFunctionResult('tokenPrice', dataAuction[0]),
            marketStatus: auctionContract.interface.decodeFunctionResult('marketStatus', dataAuction[1]),
            marketInfo: auctionContract.interface.decodeFunctionResult('marketInfo', dataAuction[2]),
            marketSuccessful: auctionContract.interface.decodeFunctionResult('auctionSuccessful', dataAuction[3])
        }
        var marketPrice = null
        var priceFunction = null
        // if (marketTemplate === '2') {
        //     marketPrice = await auctionContract.marketPrice()
        //     priceFunction = await auctionContract.priceFunction()
        // }
        if (marketTemplate === '1' || marketTemplate === '3') {
            marketPrice = await auctionContract.marketPrice()
        }
        return {
            tokenAuction: {
                address: tokenAuction,
                name: dataTokenDecode.name,
                symbol: dataTokenDecode.symbol,
                decimals: dataTokenDecode.decimals
            },
            paymentCurrency: {
                address: paymentCurrency,
                name: paymentCurrencyName,
                symbol: paymentCurrencySymbol,
                decimals: paymentCurrencyDecimals
            },
            tokenPrice : dataAuctionDecode.tokenPrice,
            marketStatus: dataAuctionDecode.marketStatus,
            marketTemplate,
            marketInfo: dataAuctionDecode.marketInfo,
            address,
            marketPrice,
            priceFunction,
            marketSuccessful: dataAuctionDecode.marketSuccessful
        }
    }

    const sortUpcomingAuction = async (address: string) => {
        const getContract = await getWeb3Contract(abiAuctionDutch.abi, address)
        const info = await getContract.methods.marketInfo().call()
        return info.startTime

    }

    const sortLiveAuction = async (address: string) => {
        const getContract = await getWeb3Contract(abiAuctionDutch.abi, address)
        const info = await getContract.methods.marketInfo().call()
        return info.startTime

    }

    const sortCompleteAuction = async (address: string) => {
        const getContract = await getWeb3Contract(abiAuctionDutch.abi, address)
        const info = await getContract.methods.marketInfo().call()
        return info.endTime

    }

    return {
        getMarkets: getMarkets,
        classifyMarkets: classifyMarkets,
        getDataAuction: getDataAuction
    }
}