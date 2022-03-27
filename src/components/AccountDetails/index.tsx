import React, { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import styled, { ThemeContext } from "styled-components";
import {
    injected,
    network,
    walletconnect,
    fortmatic,
    portis,
    walletlink,
    authereum,
    ledger,
    trezor,
    frame,
    torus,
    magic,
    binance,
    myetherwallet,
} from "../../connectors/index";
import { ReactComponent as Close } from "../../assets/images/x.svg";


import { useWeb3React } from '@web3-react/core';
// import CoinbaseWalletIcon from "../../assets/images/coinbaseWalletIcon.svg";
// import WalletConnectIcon from "../../assets/images/walletConnectIcon.svg";
// import Authereum from "../../assets/images/logo-wallet/authereum-wallet.svg";
// import Identicon from "../Identicon";


// import { ExternalLink, LinkStyledButton, TYPE } from "../../theme";
import { useTranslation } from "react-i18next";


//
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React as useWeb3ReactCore } from "@web3-react/core";
import { Web3ReactContextInterface } from "@web3-react/core/dist/types";


interface WalletInfo {
    connector?: any;
    name: string;
    iconName: string;
    description: string;
    href: string | null;
    color: string;
    primary?: true;
    mobile?: true;
    mobileOnly?: true;
}

const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
    METAMASK: {
        connector: injected,
        name: "Metamask",
        iconName: "metamask.svg",
        description: "Easy-to-use browser extension.",
        href: null,
        color: "#E8831D",
        mobile: true,
    },
    Binance: {
        connector: binance,
        name: "Binance Chain Wallet",
        iconName: "binance-logo.svg",
        description: "Login using Binance hosted wallet",
        href: null,
        color: "#4A6C9B",
        mobile: true,
    },
    WALLET_CONNECT: {
        connector: walletconnect,
        name: "WalletConnect",
        iconName: "wallet-connect.svg",
        description: "Connect to Trust Wallet, Rainbow Wallet and more...",
        href: null,
        color: "#4196FC",
        mobile: true,
    },
    WALLET_LINK: {
        connector: walletlink,
        name: "Coinbase Wallet",
        iconName: "coinbase-wallet.svg",
        description: "Use Coinbase Wallet app on mobile device",
        href: null,
        color: "#315CF5",
    },
    Ledger: {
        connector: ledger,
        name: "Ledger",
        iconName: "ledger-logo.svg",
        description: "Login using Ledger hosted wallet",
        href: null,
        color: "#4A6C9B",
        mobile: true,
    },
    Trezor: {
        connector: trezor,
        name: "Trezor",
        iconName: "trezor-wallet.svg",
        description: "Login using Trezor hosted wallet",
        href: null,
        color: "#4A6C9B",
        mobile: true,
    },
    FORTMATIC: {
        connector: fortmatic,
        name: "Fortmatic",
        iconName: "formatic-wallet.svg",
        description: "Login using Fortmatic hosted wallet",
        href: null,
        color: "#6748FF",
        mobile: true,
    },
    Authereum: {
        connector: authereum,
        name: "Authereum",
        iconName: "authereum-wallet.svg",
        description: "Login using Authereum hosted wallet",
        href: null,
        color: "#4A6C9B",
        mobile: true,
    },
    Torus: {
        connector: torus,
        name: "Torus",
        iconName: "torus-logo.svg",
        description: "Login using Torus hosted wallet",
        href: null,
        color: "#4A6C9B",
        mobile: true,
    },
    Portis: {
        connector: portis,
        name: "Portis",
        iconName: "portis-logo.svg",
        description: "Login using Portis hosted wallet",
        href: null,
        color: "#4A6C9B",
        mobile: true,
    },
    Frame: {
        connector: frame,
        name: "Frame",
        iconName: "frame.svg",
        description: "Login using Frame hosted wallet",
        href: null,
        color: "#4A6C9B",
        mobile: true,
    },
    Magic: {
        connector: magic,
        name: "Magic",
        iconName: "magic.svg",
        description: "Login using Magic hosted wallet",
        href: null,
        color: "#4A6C9B",
        mobile: true,
    },
    MEW: {
        connector: myetherwallet,
        name: "MEW",
        iconName: "mew-wallet.svg",
        description: "Login using MEW hosted wallet",
        href: null,
        color: "#4A6C9B",
        mobile: true,
    },
};
// ${({ theme }) => theme.mediaWidth.upToMedium`
// padding: 1rem;
// `};
const HeaderRow = styled.div`
    ${({ theme }) => theme.flexRowNoWrap};
    padding: 1rem 1rem;
    font-weight: 500;
    color: ${(props) =>
        props.color === "blue" ? ({ theme }) => theme.primary1 : "inherit"};
   
`;

const UpperSection = styled.div`
    position: relative;

    h5 {
        margin: 0;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        font-weight: 400;
    }

    h5:last-child {
        margin-bottom: 0px;
    }

    h4 {
        margin-top: 0;
        font-weight: 500;
    }
`;

const InfoCard = styled.div`
    border-radius: 20px;
    position: relative;
    display: grid;
    grid-row-gap: 6px;
    margin-bottom: 20px;
`;

const AccountGroupingRow = styled.div`
    ${({ theme }) => theme.flexRowNoWrap};
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    color: ${({ theme }) => theme.text1};

    div {
        ${({ theme }) => theme.flexRowNoWrap}
        align-items: center;
    }
`;
// ${({ theme }) =>
// theme.mediaWidth.upToMedium`padding: 1rem 1rem 1rem 1rem;`};
const AccountSection = styled.div`
    background-color: white;
    padding: 0rem 1rem;

`;

const YourAccount = styled.div`
    h5 {
        margin: 0 0 1rem 0;
        font-weight: 400;
    }

    h4 {
        margin: 0;
        font-weight: 500;
    }
`;





const CloseIcon = styled.div`
    position: absolute;
    right: 1rem;
    top: 14px;
    &:hover {
        cursor: pointer;
        opacity: 0.6;
    }
`;

const CloseColor = styled(Close)`
    path {
        stroke: ${({ theme }) => theme.text4};
    }
`;

const WalletName = styled.div`
    width: initial;
    font-size: 0.825rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text3};
`;

const WalletAction = styled.button`
    width: fit-content;
    font-weight: 400;
    margin-left: 8px;
    font-size: 0.825rem;
    padding: 4px 6px;
    /* background: linear-gradient(45deg,rgba(0, 255, 85, 1)  0%, rgba(0, 164, 241, 1)  50%, rgba(13, 0, 255, 1)  100%); */
    border: 1px solid white;
    transition: all ease-in-out 0.5s;
`;



interface AccountDetailsProps {
    toggleWalletModal: () => void;
    // pendingTransactions: string[];
    // confirmedTransactions: string[];
    // ENSName?: string;
     openOptions: () => void;
}


function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> & { chainId?: any } {
	const context = useWeb3ReactCore<Web3Provider>();
	const contextNetwork = useWeb3ReactCore<Web3Provider>("NETWORK");
	return context.active ? context : contextNetwork;
}

export default function AccountDetails({
    toggleWalletModal,
    // pendingTransactions,
    // confirmedTransactions,
    // ENSName,
     openOptions,
}: AccountDetailsProps) {
    const { deactivate} = useWeb3React();
    const { t } = useTranslation();
    const { chainId, account, connector }: any = useActiveWeb3React();
    function formatConnectorName() {
        const { ethereum } = window;
        const isMetaMask = !!(ethereum && ethereum.isMetaMask);
        const name = Object.keys(SUPPORTED_WALLETS)
            .filter(
                (k) =>
                    SUPPORTED_WALLETS[k].connector === connector &&
                    (connector !== injected ||
                        isMetaMask === (k === "METAMASK"))
            )
            .map((k) => SUPPORTED_WALLETS[k].name)[0];
        return (
            <WalletName className="text">
                {t("connected")} {name}
            </WalletName>
        );
    }

  
    return (
        <>
            <UpperSection>
                <CloseIcon onClick={toggleWalletModal}>
                    <CloseColor />
                </CloseIcon>
                <HeaderRow>{t("account")}</HeaderRow>
                <AccountSection className="bg-darkmode">
                    <YourAccount>
                        <InfoCard>
                            <AccountGroupingRow>
                                {/* {formatConnectorName()} */}
                                <div>
                                    {connector !== injected && connector !== walletlink && (
                                        <WalletAction
                                        style={{
                                            fontSize: ".825rem",
                                            fontWeight: 400,
                                            borderRadius: 8,
                                        }}
                                        onClick={
                                            deactivate
                                        //     () => {
                                        //     (connector as any).close()
                                        // }
                                        }
                                        >
                                        Disconnect
                                        </WalletAction>
                                    )}
                                    <WalletAction
                                        style={{
                                            fontSize: ".825rem",
                                            fontWeight: 400,
                                            borderRadius: 8,
                                        }}
                                        onClick={() => {
                                            openOptions();
                                        }}
                                    >
                                        {t("change")}
                                    </WalletAction>
                                </div>
                            </AccountGroupingRow>
                            {/* <AccountGroupingRow id="web3-account-identifier-row">
                                <AccountControl className="text">
                                    {ENSName ? (
                                        <>
                                            <div>
                                                {getStatusIcon()}
                                                <p> {ENSName}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                {getStatusIcon()}
                                                <p>
                                                    {" "}
                                                    {account &&
                                                        shortenAddress(account)}
                                                </p>{" "}
                                                {account && (
                                                    <Copy
                                                        toCopy={account}
                                                    ></Copy>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </AccountControl>
                            </AccountGroupingRow> */}
                            {/* <AccountGroupingRow>
                                {ENSName ? (
                                    <>
                                        <AccountControl className="text">
                                            <div>
                                                {account && (
                                                    <Copy toCopy={account}>
                                                        <span
                                                            style={{
                                                                marginLeft:
                                                                    "4px",
                                                            }}
                                                            className="text"
                                                        >
                                                            {t("copyAddress")}
                                                        </span>
                                                    </Copy>
                                                )}
                                                {chainId && account && (
                                                    <AddressLink
                                                        hasENS={!!ENSName}
                                                        isENS={true}
                                                        href={
                                                            chainId &&
                                                            getEtherscanLink(
                                                                chainId,
                                                                ENSName,
                                                                "address"
                                                            )
                                                        }
                                                    >
                                                        <LinkIcon size={16} />
                                                        <span
                                                            style={{
                                                                marginLeft:
                                                                    "4px",
                                                            }}
                                                            className="text"
                                                        >
                                                            {t("viewOn")}{" "}
                                                            Explorer
                                                        </span>
                                                    </AddressLink>
                                                )}
                                            </div>
                                        </AccountControl>
                                    </>
                                ) : (
                                    <>
                                        <AccountControl className="text">
                                            <div>
                                                {chainId && account && (
                                                    <AddressLink
                                                        hasENS={!!ENSName}
                                                        isENS={false}
                                                        href={getEtherscanLink(
                                                            chainId,
                                                            account,
                                                            "address"
                                                        )}
                                                    >
                                                        <LinkIcon
                                                            size={16}
                                                            className="text"
                                                        />
                                                        <span
                                                            style={{
                                                                marginLeft:
                                                                    "4px",
                                                            }}
                                                            className="text"
                                                        >
                                                            {t("viewOn")}{" "}
                                                            Explorer
                                                        </span>
                                                    </AddressLink>
                                                )}
                                            </div>
                                        </AccountControl>
                                    </>
                                )}
                            </AccountGroupingRow> */}
                        </InfoCard>
                    </YourAccount>
                </AccountSection>
            </UpperSection>
            {/* {!!pendingTransactions.length || !!confirmedTransactions.length ? (
                <LowerSection className="bg-darkmode">
                    <AutoRow
                        mb={"1rem"}
                        style={{ justifyContent: "space-between" }}
                    >
                        <TYPE.body className="text">
                            {t("recentTransactions")}
                        </TYPE.body>
                        <LinkStyledButton
                            onClick={clearAllTransactionsCallback}
                        >
                            ({t("clearAll")})
                        </LinkStyledButton>
                    </AutoRow>
                    {renderTransactions(pendingTransactions)}
                    {renderTransactions(confirmedTransactions)}
                </LowerSection>
            ) : (
                <LowerSection className="bg-darkmode">
                    <TYPE.body color={theme.text1} className="text">
                        {t("yourTransactionAppear")}...
                    </TYPE.body>
                </LowerSection>
            )} */}
        </>
    );
}
