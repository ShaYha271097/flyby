import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { Web3ReactContextInterface } from '@web3-react/core/dist/types';
import { NetworkContextName } from '../constants';
import { ChainId } from '../constants/multicall';
import { useContract } from './useContract';
import { WETH } from '../constants/index';
import { getContract } from './useContract';
import { useState, useEffect } from 'react';
import { injected } from '../connectors';
import { isMobile } from 'react-device-detect';
import { useMulticallContract } from "../hooks/useContract";
import Web3 from 'web3'
import { providers } from 'ethers';


const ERC20_ABI = require('../constants/abis/erc20.json');
const WETH_ABI = require('../constants/abis/weth.json');

export function useActiveWeb3React(): Web3ReactContextInterface<
  Web3Provider
> & { chainId?: ChainId } {
  const context = useWeb3ReactCore<Web3Provider>();
  const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName);
  return context.active ? context : contextNetwork;
}

export function useGetToken(address: string | undefined, account: any) {
    const ABI = address?.toLocaleLowerCase() === WETH.toLocaleLowerCase() ? WETH_ABI : ERC20_ABI;
    const tokenContract = useContract(address, ABI);

    const getBalance = async () => {
        const balance = await tokenContract?.balanceOf(account)
        const decimals = await tokenContract?.decimals();
        const result = Number(balance.toString())/(10 ** decimals);
        return result
    }
    
    const getDecimals = async () => {
        const decimals = await tokenContract?.decimals();
        return decimals
    }

    const getAllowance = async (contract: any) => {
        const allowance = await tokenContract?.allowance(account, contract)
        const decimals = await tokenContract?.decimals();
        const result = Number(allowance.toString())/(10 ** decimals);
        return result
    }

    const getName = async () => {
        const name = await tokenContract?.name()
        return name
    }

    const getSymbol = async () => {
        const symbol = await tokenContract?.symbol()
        return symbol
    }

    return {
        getBalance,
        getAllowance,
        getName,
        getSymbol,
        getDecimals
    }
}

export const useIsToken = () => {

    const { library, account } :any = useActiveWeb3React();

    const isToken = async (address:string) => {
        let result
        const ABI = address?.toLocaleLowerCase() === WETH.toLocaleLowerCase() ? WETH_ABI : ERC20_ABI;
        const tokenContract = getContract(address, ABI, library, account);
        try{
            await tokenContract?.symbol();
            result = true

        } catch (e) {
            result = false
        }
        return result
    }

    return isToken
}

export const useIsTokenDecimalsEighteen = () => {

  const { library, account } :any = useActiveWeb3React();

  const isTokenDecimalsEighteen = async (address:string) => {
      let result
      const ABI = address?.toLocaleLowerCase() === WETH.toLocaleLowerCase() ? WETH_ABI : ERC20_ABI;
      const tokenContract = getContract(address, ABI, library, account);
      try{
          const decimals = await tokenContract?.decimals();
          if (Number(decimals) !== 18) result = false
          else result = true

      } catch (e) {
          result = false
      }
      return result
  }

  return isTokenDecimalsEighteen
}

export function useEagerConnect() {
    const { activate, active } = useWeb3ReactCore(); // specifically using useWeb3ReactCore because of what this hook does
    const [tried, setTried] = useState(false);
  
    useEffect(() => {
      injected.isAuthorized().then(isAuthorized => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          if (isMobile) {
            activate(injected, undefined, true).catch(() => {
              setTried(true);
            });
          } else {
            setTried(true);
          }
        }
      });
    }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))
  
    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
      if (active) {
        setTried(true);
      }
    }, [active]);
  
    return tried;
  }

  export function useInactiveListener(suppress = false) {
    const { active, error, activate } = useWeb3ReactCore(); // specifically using useWeb3React because of what this hook does
  
    useEffect(() => {
      const { ethereum } = window;
  
      if (ethereum && ethereum.on && !active && !error && !suppress) {
        const handleChainChanged = () => {
          // eat errors
          activate(injected, undefined, true).catch(error => {
          });
        };
  
        const handleAccountsChanged = (accounts: string[]) => {
          if (accounts.length > 0) {
            // eat errors
            activate(injected, undefined, true).catch(error => {
            });
          }
        };
  
        ethereum.on('chainChanged', handleChainChanged);
        ethereum.on('accountsChanged', handleAccountsChanged);
  
        return () => {
          if (ethereum.removeListener) {
            ethereum.removeListener('chainChanged', handleChainChanged);
            ethereum.removeListener('accountsChanged', handleAccountsChanged);
          }
        };
      }
      return undefined;
    }, [active, error, suppress, activate]);
  }
  

export function useNativeBalances(account:any) {
    const multicallContract : any = useMulticallContract();
    const balance = async () => {
        return multicallContract.getEthBalance(account)
    }
    
    return {
        balance
    }
  }

  export function getWeb3Contract (abi:any, address:any) {
    // console.log('provider', Web3.givenProvider)
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(abi, address)
    return contract
  }