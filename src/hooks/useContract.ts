import { useActiveWeb3React } from 'hooks';
import { getWeb3Contract } from '.';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { useMemo } from 'react';
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall';
import { MARKET_ADDRESS, HELPER_ADDRESS, REDEEM_TOKEN_ADDRESS } from '../constants';
import TOKEN_ABI from '../constants/abis/erc20.json';
import { abi as MARKET_ABI } from '../constants/abis/FLYBYMarket.json';
import { abi as HELPER_ABI } from '../constants/abis/FLYBYHelper.json';
import { abi as REDEEM_TOKEN_ABI } from '../constants/abis/RedeemToken.json';
import { abi as PRIVATE_SALE_ABI }  from '../constants/abis/PrivateSale.json';
import { abi as BATCH_ABI } from '../constants/abis/BatchAuction.json';


export function getSigner(
    library: Web3Provider,
    account: string,
  ): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked();
  }

export function getProviderOrSigner(
    library: Web3Provider,
    account?: string,
  ): Web3Provider | JsonRpcSigner {
    return account ? getSigner(library, account) : library;
  }

export function isAddress(value: any): string | false {
    try {
      return getAddress(value);
    } catch {
      return false;
    }
  }

export function getContract(
    address: string,
    ABI: any,
    library: Web3Provider,
    account?: string,
  ): Contract {
    if (!isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`);
    }
    return new Contract(
      address,
      ABI,
      getProviderOrSigner(library, account) as any,
    );
  }

  export function useContract(
    address: string | undefined,
    ABI: any,
    withSignerIfPossible = true,
  ): Contract | null {
    const { library, account } = useActiveWeb3React();
  
    return useMemo(() => {
      if (!address || !ABI || !library) return null;
      try {
        return getContract(
          address,
          ABI,
          library,
          withSignerIfPossible && account ? account : undefined,
        );
      } catch (error) {
        return null;
      }
    }, [address, ABI, library, withSignerIfPossible, account]);
  }

  export function useMulticallContract(): Contract | null {
    const { chainId }:any = useActiveWeb3React();
    return useContract(
      chainId && MULTICALL_NETWORKS[chainId],
      MULTICALL_ABI,
      true,
    );
  }

  export function useMulticallContractWeb3(): any {
    const { chainId }: any = useActiveWeb3React();
    return getWeb3Contract(MULTICALL_ABI, MULTICALL_NETWORKS[chainId])
  }

  export function useMarketContract(): Contract | null {
    const { chainId } : any = useActiveWeb3React();
    return useContract(
      MARKET_ADDRESS[chainId],
      MARKET_ABI,
      true
    )
  }

  export function useHelperContract(): Contract | null {
    const { chainId } : any = useActiveWeb3React();
    return useContract(
      HELPER_ADDRESS[chainId],
      HELPER_ABI,
      true
    )
  }

  export function useTokenContract(addressToken : string): Contract | null {
    return useContract(
      addressToken,
      TOKEN_ABI,
      true
    )
  }

  export function useRedeemTokenContract() : Contract | null {
    const { chainId } : any = useActiveWeb3React();

    return useContract(
      REDEEM_TOKEN_ADDRESS[chainId],
      REDEEM_TOKEN_ABI,
      true
    )
  }
  
  export function usePrivateSaleContract(address: any) : Contract | null {
    return useContract(
      address,
      PRIVATE_SALE_ABI,
      true
    )
  }

  export function useBatchAuctionContract(address: any) : Contract | null {
    return useContract(
      address,
      BATCH_ABI,
      true
    )
  }