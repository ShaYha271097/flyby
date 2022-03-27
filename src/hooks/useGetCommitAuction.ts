import { getWeb3Contract } from '.';
import { useAllMarket } from './useAllMarket';
import { useMarketContract, useHelperContract } from './useContract';
import { useAuctionFetcher } from './useAuctionFetcher';

const abiAuctionHelper = require('../constants/abis/FLYBYHelper.json');
const abiDutchMarket = require('../constants/abis/DutchAuction.json');

export const useGetCommitAuction = () => {
    const { getDataAuction } = useAllMarket()
    const marketContract = useMarketContract()
    const helperContract = useHelperContract()
    const { getCommits } = useAuctionFetcher()

    const getAuctionData = async (address: string) => {
        try {
            const info = await marketContract?.auctionInfo(address);
            if (Number(info.templateId) === 2) {
            const batchInfo = await getBatchAuctionInfo(address);
            const infoMarket = await getDataAuction(address);
            return {
                data: batchInfo,
                templateName: 'Batch Auction',
                info: infoMarket,
            };
            } else {
                const crowdInfo = await getCrowdsaleInfo(address);
                const infoMarket = await getDataAuction(address);
                return {
                    data: crowdInfo,
                    templateName: 'Crowdsale',
                    info: infoMarket,
                };
            }
        }
        catch(err) {
            return 'err :' + err 
        }
    };

    const getBatchAuctionInfo = async (address: string) => {
        const batchAuctionInfo = await helperContract?.getBatchAuctionInfo(address);
        return batchAuctionInfo;
    };

    const getDutchAuctionInfo = async (address: string) => {
        const contract = getWeb3Contract(
        abiAuctionHelper.abi,
        abiAuctionHelper.address
        );
        const dutchAuctionInfo = await contract.methods
        .getDutchAuctionInfo(address)
        .call();
        return dutchAuctionInfo;
    };

    const getCrowdsaleInfo = async (address: string) => {
        const crowdSaleInfo = await helperContract?.getCrowdsaleInfo(address);
        return crowdSaleInfo;
    };

    const getCommitmentsAuction = async (
        address: string,
        decimalsPaymentToken: any,
        decimalsToken: any,
        totalCommitments: any,
        totalTokenSale: any
    ) => {
        try{
            const { data } = await getCommits(address)
            const info = await marketContract?.auctionInfo(address)
            if (Number(info.templateId) === 2) {
                
                const commitDatas = await Promise.all(
                    data.result.map(async (item: any) => {

                        return {
                            address: item.account,
                            amount: item.commitment,
                            tokenClaimable:( Number(item.commitment) * Number(`1e${decimalsPaymentToken}`) / totalCommitments ) * totalTokenSale / Number(`1e${decimalsToken}`),
                            txHash: item.txHash,
                            block: item.block,
                        };
                    })
                );
                return commitDatas;
            } else {
                const crowdSaleInfo = await getCrowdsaleInfo(address);
                const commitDatas = await Promise.all(
                    data.result.map(async (item: any) => {
                        return {
                            address: item.account,
                            amount: item.commitment,
                            tokenClaimable: Number(item.commitment)/(Number(crowdSaleInfo.rate) / Number(`1e${decimalsPaymentToken}`)),
                            txHash: item.txHash,
                            block: item.block,
                        };
                    })
                );
                return commitDatas;
            }
        }
        catch(err) {
            console.log('failed to get commit data:', err)
            return
        }
    };

    const getAuctionDucth = async (address: string) => {
        const contract = getWeb3Contract(abiDutchMarket.abi, address);
        const priceFunction = await contract.methods.priceFunction().call();
        return priceFunction;
    };

  return {
    getBatchAuctionInfo: getBatchAuctionInfo,
    getDutchAuctionInfo: getDutchAuctionInfo,
    getAuctionData: getAuctionData,
    getCommitmentsAuction: getCommitmentsAuction,
    getAuctionDucth: getAuctionDucth,
  };
};
