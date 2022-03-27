import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import Modal from "../Modal";
import { RowBetween, Row, Column } from "../Row";
import { shortAddress } from "../../utils";
import { useActiveWeb3React } from "../../hooks";
import { supportedChainId } from "../../constants";
import Jazzicon from "jazzicon";

//

import AccountDetails from "../AccountDetails/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState, toggleWalletModalx } from "../theme/store";
import { ReactComponent as Close } from "../../assets/images/x.svg";
import CustomModal from "../theme/customModal";

import { UnsupportedChainIdError } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import ReactGA from "react-ga";

import Option from "../theme/Option";

import { useTranslation } from "react-i18next";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { isMobile } from "react-device-detect";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
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

import { ExternalLink } from "../theme";
import { Button } from "components/Button";

import WalletBackground from "../../assets/images/wallet-bg.png";
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

const WrapperTermService = styled.div`
	width: 90%;
	margin: 0 auto;
	color: ${({ theme }) => theme.text1};
	white-space: wrap;
	padding: 1rem;
	border-radius: 12px;
	/* background: ${({ theme }) => theme.bg8}; */
	border: 1px solid white;
	background-color: #c0eaff42;
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
	.forbitspace {
		font-family: "helvetica neue", Roboto, sans-serif;
		font-style: italic;
		font-weight: 900;
	}
	@media (max-width: 727px) {
		font-size: 14px;
	}
	@media (max-width: 459px){
		font-size: 12px;
		padding: 0.5rem;
	}
`;

const FirstTerm = styled.div``;

const CheckBox = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    @media (max-width: 386px) {
        width: 236px;
        align-items: flex-start;
    }
`;
//${({ theme }) => theme.mediaWidth.upToMedium`padding: 1rem`};
const ContentWrapper = styled.div`
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    min-height: 311px;
    @media (max-width: 1280px) {
        max-height: 60vh;
        /* overflow-y: auto; */
    }
    @media (max-width: 768px) {
        max-height: 50vh;
    }

    @media (max-width: 576px) {
        padding: 10px;
    }
    ::-webkit-scrollbar {
        background-color: transparent !important;
    }
`;

const WrapModalWallet = styled.div`
    &.custom-modal-wallet {
        max-width: 640px !important;
    }
    .custom-modal-wallet {
        max-width: 640px !important;
    }
    &[data-reach-dialog-content] {
        max-width: 640px !important;
    }
`;

const OptionGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: space-evenly;
`;
const Wrapper = styled.div`
    ${({ theme }) => theme.flexColumnNoWrap}
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: relative;
    background-size: cover;
    background-position: center;
    background-image: url("../images/wallet-bg.webp");
    z-index: 1;
    color: #ffffff;
    @media (max-height: 542px) {
        height: 456px;
    }
    @media (max-width: 1023px) {
        height: 671px;
    }
    @media (max-width: 459px) {
        height: 610px;
    }
    @media (max-width: 403px) {
        height: 770px;
    }
`;
const UpperSection = styled.div`
    position: relative;
    height: 100%;
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
    @media (max-width: 1023px) {
        height: 671px;
    }
    @media (max-height: 542px) {
        height: 456px;
    }
    @media (max-width: 459px) {
        height: 610px;
    }
    @media (max-width: 403px) {
        height: 770px;
    }
`;
// ${({ theme }) => theme.mediaWidth.upToMedium`
//     padding: 1rem;
//   `};
const HeaderRow = styled.div`
    ${({ theme }) => theme.flexRowNoWrap};
    padding: 1rem 1rem;
    font-weight: 500;
    color: ${(props) =>
        props.color === "blue" ? ({ theme }) => theme.text1 : "inherit"};
    @media (max-width: 459px) {
        padding: 0.5rem 1rem;
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
const HoverText = styled.div`
    :hover {
        cursor: pointer;
    }
`;

const WALLET_VIEWS = {
    OPTIONS: "options",
    OPTIONS_SECONDARY: "options_secondary",
    ACCOUNT: "account",
    PENDING: "pending",
};
function usePrevious<T>(value: T) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef<T>();
    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

const ModalAccount = ({
    isOpen,
    onDismiss,
}: {
    isOpen: boolean;
    onDismiss: any;
}) => {
    const walletModalOpen = useSelector(
        (state: RootState) => state.walletModalOpen
    );
    const dispatch = useDispatch();
    // const { t } = useTranslation();
    const [agreeTerm, setAgreeTerm] = useState(false);
    const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
    // const [pendingError, setPendingError] = useState<boolean>();
    const context = useWeb3React<Web3Provider>();
    const { connector, library, activate, deactivate, active, error } = context;
    const [click, setClick] = useState(false);
    const { account, chainId }: any = useActiveWeb3React();
    const ref = useRef<HTMLDivElement>();
    const previousAccount = usePrevious(account);

    const handleCopy = () => {
        navigator?.clipboard?.writeText(account);
    };

    const toggleWalletModal = () => { return dispatch(toggleWalletModalx()) }

    const handleClick = () => {
        setClick(true);
        setTimeout(() => {
            setClick(false);
        }, 800);
    };

    let url: any;
    switch (chainId) {
        case supportedChainId.Mainnet:
            url = "https://etherscan.io/address/";
            break;
        case supportedChainId.Rinkeby:
            url = "https://rinkeby.etherscan.io/address/";
            break;
        case supportedChainId.BscMainnet:
            url = "https://bscscan.com/address/";
            break;
        case supportedChainId.BscTestNet:
            url = "https://testnet.bscscan.com/address/";
            break;
        case supportedChainId.PolygonMainnet:
            url = "https://explorer.matic.network/address/";
            break;
        case supportedChainId.PolygonTestNet:
            url = "https://mumbai.polygonscan.com/address/";
            break;
        case supportedChainId.AvalancheMainnet:
            url = "https://snowtrace.io/address/";
            break;
    }

    const handleChange = (e: any) => {
        const checked = e.target.checked;
        setAgreeTerm(checked);
    };



    useEffect(() => {
        if (account && ref.current) {
            ref.current.innerHTML = "";
            ref.current.appendChild(
                Jazzicon(16, parseInt(account.slice(2, 10), 16))
            );
        }
    }, [account]);

    useEffect(() => {
        if (walletModalOpen) {
            setWalletView(WALLET_VIEWS.ACCOUNT);
        }
    }, [walletModalOpen]);

    useEffect(() => {
        if (account && !previousAccount && walletModalOpen) {
            toggleWalletModal()
        }
    }, [account, previousAccount, toggleWalletModal, walletModalOpen]);

    const activePrevious = usePrevious(active);
    const connectorPrevious = usePrevious(connector);
    useEffect(() => {
        if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
            setWalletView(WALLET_VIEWS.ACCOUNT);
        }
    }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious]);





    const tryActivation = async (connector: AbstractConnector | undefined) => {
        let name = "";
        Object.keys(SUPPORTED_WALLETS).map((key) => {
            if (connector === SUPPORTED_WALLETS[key].connector) {
                return (name = SUPPORTED_WALLETS[key].name);
            }
            return true;
        });
        // log selected wallet
        ReactGA.event({
            category: "Wallet",
            action: "Change Wallet",
            label: name,
        });
        // setPendingWallet(connector); // set wallet for pending view
        setWalletView(WALLET_VIEWS.PENDING);

        // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
        if (
            connector instanceof WalletConnectConnector &&
            connector.walletConnectProvider?.wc?.uri
        ) {
            connector.walletConnectProvider = undefined;
        }
        connector &&
            activate(connector, undefined, true).catch((error) => {
                if (error instanceof UnsupportedChainIdError) {
                    activate(connector);
                } else {
                    // setPendingError(true);
                }
            });
    };



    function getOptions() {
        const isMetamask = window.ethereum && window.ethereum.isMetaMask;
        return Object.keys(SUPPORTED_WALLETS).map((key) => {
            const option = SUPPORTED_WALLETS[key];
            // check for mobile options
            if (isMobile) {
                //disable portis on mobile for now
                if (option.connector === portis) {
                    return null;
                }

                // if (!window.web3 && !window.ethereum && option.mobile) {
                return (
                    <Option
                        onClick={() => {
                            option.connector !== connector && !option.href && tryActivation(option.connector);
                        }}
                        id={`connect-${key}`}
                        key={key}
                        active={option.connector && option.connector === connector}
                        color={option.color}
                        link={option.href}
                        header={option.name}
                        subheader={null}
                        icon={require("../../assets/images/logo-wallet/" + option.iconName)}
                    />
                );
                // }
                // return null;
            }

            // overwrite injected when needed
            if (option.connector === injected) {
                // don't show injected if there's no injected provider
                if (!(window.web3 || window.ethereum)) {
                    if (option.name === "Metamask") {
                        return (
                            <Option
                                id={`connect-${key}`}
                                key={key}
                                color={"#E8831D"}
                                header={"Install Metamask"}
                                subheader={null}
                                link={"https://metamask.io/"}
                                icon={require("../../assets/images/logo-wallet/" + option.iconName)}
                            />
                        );
                    } else {
                        return null; //dont want to return install twice
                    }
                }
                // don't return metamask if injected provider isn't metamask
                else if (option.name === "Metamask" && !isMetamask) {
                    return null;
                }
                // likewise for generic
                else if (option.name === "Injected" && isMetamask) {
                    return null;
                }
            }
            if (option.connector === binance) {
                //don't show injected if there's no injected provider
                if (!(window.BinanceChain)) {
                    if (option.name === "Binance Chain Wallet") {
                        return (
                            <Option
                                id={`connect-${key}`}
                                key={key}
                                color={"#E8831D"}
                                header={"Install Binance"}
                                subheader={null}
                                link={"https://www.bnbchain.world/en"}
                                icon={require("../../assets/images/logo-wallet/" + option.iconName)}
                            />
                        );
                    }
                    else {
                        return null; //dont want to return install twice
                    }
                }

            }

            // return rest of options
            return (
                !isMobile &&
                !option.mobileOnly && (
                    <Option
                        id={`connect-${key}`}
                        onClick={() => {
                            if (option.connector === connector) {
                                console.log('asd')
                                setWalletView(WALLET_VIEWS.ACCOUNT)
                            } else {
                                !option.href && tryActivation(option.connector);
                            }

                        }}
                        key={key}
                        active={option.connector === connector}
                        color={option.color}
                        link={option.href}
                        header={option.name}
                        subheader={null} //use option.description to bring back multi-line
                        icon={require("../../assets/images/logo-wallet/" + option.iconName)}
                    //icon={""}
                    />
                )
            );
        });
    }

    function getModalContent() {
        // if (error) {
        // 	return (
        // 		<UpperSection>
        // 			<CloseIcon >
        // 				<CloseColor />
        // 			</CloseIcon>
        // 			<HeaderRow>{error instanceof UnsupportedChainIdError ? t("wrongNetwork") : t("errorConnecting")}</HeaderRow>
        // 			<ContentWrapper>
        // 				{error instanceof UnsupportedChainIdError ? (
        // 					<h5>
        // 						{/* Please connect to the appropriate Ethereum
        //                         network. */}
        // 						{t("connectAppropriate")}
        // 					</h5>
        // 				) : (
        // 					t("errorRefresh")
        // 				)}
        // 			</ContentWrapper>
        // 		</UpperSection>
        // 	);
        // }
       
     
        if (account && walletView === WALLET_VIEWS.ACCOUNT) {
            return (
                <>
                  <Modal isOpen={isOpen} onDismiss={onDismiss}>
                        <Header>
                            <Account>
                                Account
                                <View>
                                    <Link
                                        href={url + (account ? account : "")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src="../eye.png" alt="" />
                                    </Link>
                                    <HoverView className="view">
                                        View on Explorer
                                    </HoverView>
                                </View>
                            </Account>
                            <OutButton
                                onClick={onDismiss}
                                style={{ cursor: "pointer" }}
                            >
                                <img src="../exit.png" alt="" />
                            </OutButton>
                        </Header>
                        <WrapperAccountInfo>
                            <RowBetweenCircle>
                                <First>
                                    <Connect>
                                        <Circle></Circle>
                                    </Connect>
                                    <Status>Connected to MetaMask</Status>
                                </First>
                                <Second>
                                    {" "}
                                    <Button
                                        onClick={
                                           ()=> setWalletView(WALLET_VIEWS.OPTIONS)
                                        }
                                    >
                                        Change
                                    </Button>
                                </Second>
                            </RowBetweenCircle>
                            <RowInfo>
                                <Copy>
                                    <Ad>
                                        <Address>
                                            Address: {shortAddress(account)}
                                        </Address>
                                        <IconAccount ref={ref as any}></IconAccount>
                                    </Ad>

                                    <CopyAddress
                                        onClick={() => {
                                            handleCopy();
                                            handleClick();
                                        }}
                                    >
                                        <img src="../copy.png" alt="" />

                                        <HoverAddress
                                            className="copy"
                                            style={
                                                click
                                                    ? {
                                                        opacity: 1,
                                                    }
                                                    : {}
                                            }
                                        >
                                            Copied
                                        </HoverAddress>
                                    </CopyAddress>
                                </Copy>
                            </RowInfo>
                            {/* <RowBetween>
                    <Link href={url + (account ? account : '')} target="_blank" rel="noopener noreferrer">View on Explorer</Link>
                </RowBetween> */}
                        </WrapperAccountInfo>
                    </Modal>   
                </>
            );
        }
        return (
            <UpperSection>
                <CloseIcon onClick={
                    toggleWalletModal

                } >
                    <CloseColor />
                </CloseIcon>
                {/* {account ? (
                    <HeaderRow color="blue">
                        <HoverText
                            onClick={() => {
                                // setPendingError(false);
                                setWalletView(WALLET_VIEWS.ACCOUNT);
                            }}
                            className="text"
                        >
                            Back
                        </HoverText>
                    </HeaderRow>
                ) : (
                    <HeaderRow>
                        <HoverText>Connect Wallet</HoverText>
                    </HeaderRow>
               )} */}
                {walletView !== WALLET_VIEWS.ACCOUNT ? (
                    <HeaderRow color="blue">
                        <HoverText
                            onClick={() => {
                                // setPendingError(false);
                                setWalletView(WALLET_VIEWS.ACCOUNT);
                            }}
                            className="text"
                        >
                            Back
                        </HoverText>
                    </HeaderRow>
                ) : (
                    <HeaderRow>
                        <HoverText>Connect Wallet</HoverText>
                    </HeaderRow>
                )}


                <WrapperTermService>
                    <FirstTerm>
                        {" "}
                        By connecting a wallet, you agree to{" "}
                        <span className="forbitspace">
                            flyby Launchpad
                        </span>{" "}
                        <ExternalLink href="/terms-of-service.pdf">
                            Terms of Service
                        </ExternalLink>
                        &nbsp; and{" "}
                        <ExternalLink href="/policy.pdf">
                            Privacy Policy
                        </ExternalLink>
                    </FirstTerm>

                    <CheckBox>
                        <input
                            type="checkbox"
                            name="checkbox"
                            value="check"
                            checked={agreeTerm}
                            id="agree"
                            onChange={(e) => handleChange(e)}
                        />
                        <div>
                            I agree to Terms of Service and Privacy Policy
                        </div>
                    </CheckBox>
                </WrapperTermService>
                <ContentWrapper
                    style={{
                        opacity: !agreeTerm ? 0.5 : 1,
                        pointerEvents: !agreeTerm ? "none" : "auto",
                    }}
                >
                    <OptionGrid>{getOptions()}</OptionGrid>
                </ContentWrapper>
            </UpperSection>
        );
    }
   
    return (
        <>
            <WrapModalWallet>
                <CustomModal
                    isOpen={walletModalOpen}
                    onDismiss={onDismiss}
                    minHeight={false}
                    maxHeight={90}
                    isAccount={
                        (account && walletView === WALLET_VIEWS.ACCOUNT) ||
                        walletView === WALLET_VIEWS.PENDING ||
                        error
                    }
                >
                    <Wrapper className="bg-darkmode">
                        {getModalContent()}
                    </Wrapper>
                </CustomModal>
            </WrapModalWallet>
             
        </>
    );
};

export default ModalAccount;

const OutButton = styled.div`
    background-color: #e7d6e538;
    border-radius: 8px;
    width: 30px;
    height: 30px;
    margin-top: 3px;
    img {
        width: 100%;
        height: 100%;
    }
    @media (max-width: 768px) {
        margin-top: 0;
    }
`;
const Header = styled(RowBetween)`
    margin-bottom: 1rem;
    font-size: 1.2rem;
    width: 100%;
    &:hover ${OutButton} {
        background-color: #ff0fed59;
    }
    @media (max-width: 768px) {
        margin-bottom: 0.2rem;
    }
`;
const RowInfo = styled(Row)`
    @media (max-width: 572px) {
        justify-content: unset;
    }
`;
const RowBetweenCircle = styled(RowBetween)`
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    @media (max-width: 426px) {
        flex-direction: column;
        align-items: center;
    }
`;

const First = styled.div`
    display: flex;
    gap: 0.2rem;
    align-items: center;
    @media (max-width: 426px) {
        justify-content: unset;
    }
`;
const Second = styled.div``;
const View = styled(RowBetween)`
    padding: 7px 5px 7px 5px;
    margin-left: 5px;
    background-color: #000a4d3b;
    border-radius: 10px;
    img {
        margin-bottom: 10px;
        width: 100%;
    }
    :hover {
        cursor: pointer;
        background-color: #000a4d00;
        .view {
            display: block;
            position: absolute;
            right: -107px;
            padding: 0 5px;
            @media (max-width: 426px) {
                right: -99px;
            }
        }
    }
    @media (max-width: 768px) {
        padding: 5px 5px;
        img {
            width: 100%;
        }
    }
    @media (max-width: 426px) {
        margin-left: 2px;
    }
`;
const HoverView = styled.div`
    display: none;
    font-size: 12px;
    background-color: #000a4d3b;
    margin-bottom: 20px;
    border-radius: 10px;
`;
const Account = styled(RowBetween)`
    display: flex;
    position: relative;
    padding: 5px 8px;
    border-radius: 5px;
`;
const WrapperAccountInfo = styled(Column)`
    width: 100%;
    padding: 1rem;
    border: 1px solid white;
    border-radius: 16px;
    gap: 1rem;
    @media (max-width: 768px) {
        gap: 0.2rem;
    }
`;

const Address = styled.span`
    font-size: 1rem;
    font-weight: 600;
`;
const Circle = styled.span`
    width: 11px;
    height: 11px;
    border-radius: 8px;
    background-color: #1aa410;
    z-index: 999;
    position: absolute;
`;
const Connect = styled.span`
    position: relative;
    width: 15px;
    height: 15px;
    border-radius: 8px;
    background-color: #fff;
    margin-top: 1px;
    border: 1.5px solid #099f3e;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Status = styled.span`
    opacity: 0.8;
`;
const Change = styled.button`
    opacity: 0.8;
`;

const Link = styled.a`
    width: 24px;
    height: 12px;
    :hover {
        color: white;
        cursor: pointer;
    }
`;

const Copy = styled.div`
    color: #fff;
    display: flex;
    align-items: center;
    position: relative;
    padding: 5px 8px;
    border-radius: 5px;
    gap: 0.5rem;
    /* :hover {
        cursor: pointer;
        background-color: #0c2b6f6e;
        .copy {
            display: block;
            position: absolute;
            left: 103%;
            white-space: nowrap;
            font-size: 12px;
            top: 7px;
        }
        @media (max-width: 768px) {
            .copy {
                top: 5px;
            }
        }
        @media (max-width: 426px) {
            .copy {
                font-size: 10px;
            }
        }
        /* @media (max-width: 576px) {
            .copy {
                display: none;
            }
        } */
    } */
`;

const Ad = styled.div`
    display: flex;
    gap: 0.2rem;
`;

const CopyAddress = styled.div`
    width: 17px;
    height: 18px;
    cursor: pointer;
    img {
        width: 100%;
        transition: all 0.5s ease-in-out;
        :hover {
            transform: scale(1.1);
        }
    }

    /* :focus {
        .copy {
            display: block;
        }
    } */
`;
const HoverAddress = styled.div`
    font-size: 12px;
    position: absolute;
    top: 7px;
    left: 224px;
    opacity: 0;
    transition: all 0.5s ease-in-out;
    @media (max-width: 426px) {
        top: 27px;
        left: 190px;
    }
    /* transform: translateY(-100%); */
`;

const IconAccount = styled.div`
    height: 1rem;
    width: 1rem;
    border-radius: 1.125rem;
`;
