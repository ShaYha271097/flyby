
import { WETH, ETH } from '../constants/index';
import { getWeb3Contract } from "../hooks";

const ERC20_ABI = require('../constants/abis/erc20.json');
const WETH_ABI = require('../constants/abis/weth.json');


export const useToken = () => {
    const getContract = async (address: string) => {

        const ABI = address?.toLocaleLowerCase() === WETH.toLocaleLowerCase() ? WETH_ABI : ERC20_ABI;
        const contract = getWeb3Contract(ABI, address)
        return contract
    }

    const getBalance = async (address: string, account: any) => {
        if (address?.toLowerCase() === ETH.toLowerCase()) {
            
        }
        const contract = await getContract(address)
        const balance = await contract.methods.balanceOf(account).call()
        const decimals = await contract.methods.decimals().call()
        return balance / (10 ** decimals)
    }

    return {
        getBalance: getBalance,
    }
}