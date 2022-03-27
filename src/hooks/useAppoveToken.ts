import { getContract } from "./useContract";
import { WETH } from "../constants";
import { useActiveWeb3React } from ".";

const abiERC20 = require('../constants/abis/erc20.json');
const abiWETH = require('../constants/abis/weth.json');

export const useApproveToken = () => {
    const { library, account } : any = useActiveWeb3React();

    const approve = async (token:string, spender:string, value:any) => {
        const contract = token === WETH ? getContract(token, abiWETH, library, account) : getContract(token, abiERC20, library, account);
        const call = await contract.approve(spender, value);
        return call
    }
    
    return approve
}