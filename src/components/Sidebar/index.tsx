/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import Rocket from "../../assets/base64/rocket-sidebar.json";
import Github from "../../assets/base64/github.json";
import Discord from "../../assets/base64/discord.json";
import Twitter from "../../assets/base64/twitter.json";
import Telegram from "../../assets/images/svg/telegram.svg";

import detectEthereumProvider from "@metamask/detect-provider";
import LogoETH from "../../assets/images/svg/logo-eth.svg";
import LogoBSC from "../../assets/images/svg/logo-bnb.svg";
import LogoPolygon from "../../assets/images/svg/logo-polygon.svg";
import LogoAVAX from "../../assets/images/svg/logo-avax.svg";
import iconCompleted from "../../assets/images/icon-nav/completed-auctions.png";
import iconCreateAuction from "../../assets/images/icon-nav/create-auction.png";
import iconCreateCrowdsale from "../../assets/images/icon-nav/create-crowdsale.png";
// import iconDocument from "../../assets/images/icon-nav/document.png";
import iconHowtobuy from "../../assets/images/icon-nav/how-to-buy.png";
import iconLive from "../../assets/images/icon-nav/live-auctions.png";
// import iconSpaceMarkets from "../../assets/images/icon-nav/space-markets.png";
import iconUpcoming from "../../assets/images/icon-nav/upcoming-auctions.png";
import homepage from "../../assets/home.svg";
import imgForbitSpace from "../../assets/base64/forbitspace-logo.json";
import imgForbitSwap from "../../assets/base64/forbitswap-logo.json";
// import imgNFTsSpace from "../../assets/base64/nfts-logo.json";
import imgNFTSpace from "../../assets/logoSpaceX.png";
import TxtNFT from "../../assets/images/NFTs space.png";
const Sidebar = ({
    menuOpen,
    onCloseMenu,
}: {
    menuOpen: boolean;
    onCloseMenu: any;
}) => {
    // const location = useLocation();
    const [, setImage]: any = useState();
    const [iconGithub, setIconGithub]: any = useState();
    const [iconDiscord, setIconDiscord]: any = useState();
    const [iconTwitter, setIconTwitter]: any = useState();
    const [iconTelegram, setIconTelegram]: any = useState();

    const configIndexedData = async () => {
        const logo = await localStorage.getItem("flyby_rocket_sidebar");
        if (logo) {
            setImage(logo);
        } else {
            localStorage.setItem("flyby_rocket_sidebar", Rocket.data);
            setImage(Rocket.data);
        }

        const github = await localStorage.getItem("flyby_github");
        if (github) {
            setIconGithub(github);
        } else {
            localStorage.setItem("flyby_github", Github.data);
            setIconGithub(Github.data);
        }

        const discord = await localStorage.getItem("flyby_discord");
        if (discord) {
            setIconDiscord(discord);
        } else {
            localStorage.setItem("flyby_discord", Discord.data);
            setIconDiscord(Discord.data);
        }

        const twitter = await localStorage.getItem("flyby_twitter");
        if (twitter) {
            setIconTwitter(twitter);
        } else {
            localStorage.setItem("flyby_twitter", Twitter.data);
            setIconTwitter(Twitter.data);
        }

        const telegram = await localStorage.getItem("flyby_telegram");
        if (telegram) {
            setIconTelegram(telegram);
        } else {
            localStorage.setItem("flyby_telegram", Telegram);
            setIconTelegram(Telegram);
        }
    };
    const [logoSpace, setLogoSpace]: any = useState();
    const [logoSwap, setLogoSwap]: any = useState();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [logoNFTs, setLogoNFTs]: any = useState();

    const configIndexedData1 = async () => {
        const _logoSpace = await localStorage.getItem("logo-space");
        if (_logoSpace) {
            setLogoSpace(_logoSpace);
        } else {
            localStorage.setItem("logo-space", imgForbitSpace.data);
            setLogoSpace(imgForbitSpace.data);
        }
        const _logoSwap = await localStorage.getItem("logo-swap");
        if (_logoSwap) {
            setLogoSwap(_logoSwap);
        } else {
            localStorage.setItem("logo-swap", imgForbitSwap.data);
            setLogoSwap(imgForbitSwap.data);
        }
    };

    useEffect(() => {
        configIndexedData1();
    }, []);

    useEffect(() => {
        configIndexedData();
    }, []);
    // const { chainId } = useActiveWeb3React();
    const ethereum = [
        {
            chainId: "0x1",
        },
    ];
    const binance = [
        {
            chainId: "0x38",
            chainName: "Binance Smart Chain",
            nativeCurrency: {
                name: "BNB Chain",
                symbol: "BNB Chain",
                decimals: 18,
            },
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com"],
        },
    ];

    const matic = [
        {
            chainId: "0x89",
            chainName: "Polygon Mainnet",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
            },
            rpcUrls: ["https://polygon-rpc.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"],
        },
    ];

    const avalanche = [
        {
            chainId: "0xa86a",
            chainName: "Avalanche",
            nativeCurrency: {
                name: "AVAX",
                symbol: "AVAX",
                decimals: 18,
            },
            rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
            blockExplorerUrls: ["https://avascan.info/blockchain/c/"],
        },
    ];

    const changeNetwork = async (mainnet: any, mainnetString: string) => {
        await detectEthereumProvider().then((res: any) => {
            if (mainnetString !== "ethereum") {
                res.request({
                    method: "wallet_addEthereumChain",
                    params: mainnet,
                });
            } else
                res.request({
                    method: "wallet_switchEthereumChain",
                    params: mainnet,
                });
        });
        // .then(() => {
        //     setOpen(false);
        // })
        // .catch((err: any) => {
        //     console.log("err", err);
        // });
    };

    return (
        <>
            <WrapperSidebar menuMobileOpen={menuOpen}>
                <Logo></Logo>
                <Navigation>
                    <a
                        className="Launchpad"
                        href="https://flybylaunchpad.com/"
                        target="_blank"
                    >
                        <img src={homepage} alt="" />
                    </a>
                    {/* 
                    <Nav className="HomePage" to="/home">
                        <span>Space Launchpad</span>
                    </Nav> */}
                    <TitleNav className="SpaceTitle">Space Markets</TitleNav>
                    <Nav className="HoverNav row" to="/live">
                        <img src={iconLive} alt="icon live auction" />
                        <span>Live Sales</span>
                    </Nav>
                    <Nav className="HoverNav row" to="/upcoming">
                        <img src={iconUpcoming} alt="icon upcoming auction" />
                        <span>Upcoming Sales</span>
                    </Nav>
                    <Nav className="HoverNav row" to="/past">
                        <img src={iconCompleted} alt="icon completed auction" />
                        <span>Completed Sales</span>
                    </Nav>
                    <TitleNav>Space Launchpad</TitleNav>
                    <Nav className="NoHoverNav row" to="/factory/new-auction">
                        <img
                            src={iconCreateAuction}
                            alt="icon create auction"
                        />
                        <span>Create Auction</span>
                    </Nav>
                    <Nav className="NoHoverNav row" to="/factory/new-crowdsale">
                        <img
                            src={iconCreateCrowdsale}
                            alt="icon create crowdsale"
                        />
                        <span>Create Crowdsale</span>
                    </Nav>
                    <TitleNav>Documents</TitleNav>
                    <ExternalLink
                        href="https://docs.forbitswap.com/forbitswap/forbits/introduction"
                        target="_blank noreferer"
                        className="row"
                    >
                        <img src={iconHowtobuy} alt="icon how to buy" />
                        <span>Introduction</span>
                    </ExternalLink>
                    <ExternalLink
                        href="https://docs.forbitswap.com/forbitswap/how-to-buy-fbs-token"
                        target="_blank noreferer"
                        className="row"
                    >
                        <img src={iconHowtobuy} alt="icon how to claim" />
                        <span>How to buy</span>
                    </ExternalLink>
                    <ExternalLink
                        href="https://docs.forbitswap.com/forbitswap/sale-policy"
                        target="_blank noreferer"
                        className="row"
                    >
                        <img src={iconHowtobuy} alt="icon how to claim" />
                        <span>Sale Policy</span>
                    </ExternalLink>

                    <TitleNav className="System">Ecosystem</TitleNav>
                    <System>
                        <Wrap>
                            <Image
                                src={logoSpace}
                                onClick={() => {
                                    window.open(
                                        `https://app.forbitspace.com/#/swap`
                                    );
                                }}
                                alt="no-image"
                                width="200px"
                                height="52.7px"
                            />
                        </Wrap>
                        <Wrap>
                            <Image
                                src={logoSwap}
                                onClick={() => {
                                    window.open(
                                        `https://app.forbitswap.com/#/swap`
                                    );
                                }}
                                alt="no-image"
                                width="200px"
                                height="52.7px"
                            />
                        </Wrap>
                        <Wrap>
                            <Image
                                className="spaceX"
                                src={imgNFTSpace}
                                onClick={() => {
                                    window.open(`https://nftspacex.io/`);
                                }}
                                alt="no-image"
                            />
                        </Wrap>
                    </System>
                    <TitleNav>Supported networks</TitleNav>
                    <Network>
                        <NetworkItem
                            className="ether"
                            onClick={() => changeNetwork(ethereum, "ethereum")}
                        >
                            <img src={LogoETH} alt="logo-eth" />
                            <p>Ethereum</p>
                        </NetworkItem>
                        <NetworkItem
                            onClick={() => {
                                changeNetwork(binance, "binance");
                            }}
                            className="bsc"
                        >
                            <img src={LogoBSC} alt="logo-bsc" />
                            <p>BNB Chain</p>
                        </NetworkItem>
                        <NetworkItem
                            className="polygon"
                            onClick={() => changeNetwork(matic, "polygon")}
                        >
                            <img src={LogoPolygon} alt="logo-polygon" />
                            <p>Polygon</p>
                        </NetworkItem>
                        <NetworkItem
                            className="avax"
                            onClick={() =>
                                changeNetwork(avalanche, "avalanche")
                            }
                        >
                            <img
                                className="Avanla"
                                src={LogoAVAX}
                                alt="logo-avax"
                            />
                            <p>Avalanche</p>
                        </NetworkItem>
                    </Network>
                    {/* <SocialFooter>
                        <a
                            href="https://github.com/forbitswap"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={iconGithub} alt="icon github" />
                        </a>
                        <a
                            href="https://discord.gg/CnJqNa2wfG"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={iconDiscord} alt="icon discord" />
                        </a>
                        <a
                            href="https://twitter.com/forbitswap"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={iconTwitter} alt="twitter" />
                        </a>
                        <a
                            href="https://t.me/flybyLaunchpad"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={iconTelegram} alt="telegram" />
                        </a>
                    </SocialFooter> */}
                </Navigation>
            </WrapperSidebar>
            <BlurBackground isOpen={menuOpen} onClick={onCloseMenu} />
        </>
    );
};

export default Sidebar;

// const IconActiveTab = styled.img`
//     // height: 100%;
//     width: 2.5rem;
//     height: 1.5rem;
// `;
// const WrapperIntroduce = styled.div`
//     @media (min-width: 851px) {
//         display: none;
//     }
// `;
const System = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 0 0 24px;
    gap: 1rem;
    .NFTSpace {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    @media (min-width: 1227px) {
        display: none;
    }
`;
const Wrap = styled.div`
    .NFT {
        width: 30px;
        height: 30px;
        margin-left: 5px;
    }
    .txtNFT {
        width: 115px;
        padding: unset;
    }
    @media (max-width: 1349px) {
        .NFT {
            height: 30px;
        }
        .txtNFT {
            width: 100px;
        }
    }
    @media (max-width: 768px) {
        .NFT {
            width: 25px;
            height: 25px;
        }
        .txtNFT {
            width: 90px;
        }
    }
`;

const Image = styled.img`
    max-width: 150px;
    max-height: 200px;
    width: 100%;
    height: auto;
    :hover {
        cursor: pointer;
    }
    &.spaceX {
        max-width: 170px;
    }
    @media (max-width: 1349px) {
        max-width: 132px;
        &.spaceX {
            max-width: 150px;
        }
    }
    @media (max-width: 768px) {
        max-width: 120px;
        &.spaceX {
            max-width: 130px;
        }
    }
`;

const Network = styled.div`
    padding: 10px 0 0 30px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
const NetworkItem = styled.div`
    display: flex;
    transition: transform 0.2s;
    align-items: center;
    gap: 0.5rem;
    img {
        width: 30px;
    }
    @media (max-width: 768px) {
        img {
            width: 25px;
        }
    }
    :nth-child(1) {
        cursor: pointer;
    }
`;

const WrapperSidebar = styled.div<{ menuMobileOpen: boolean }>`
    width: 350px;
    padding: 2rem 3rem 1rem;
    position: fixed;
    max-height: 90vh;
    height: 100%;
    overflow-y: scroll;
    top: 0;
    left: 0;
    z-index: 1;
    font-family: "Montserrat", sans-serif;
    font-style: italic;
    transition: all ease-in-out 0.5s;
    &::-webkit-scrollbar {
        width: 0;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    ::after {
        content: "";
        background-image: linear-gradient(
            to bottom,
            transparent,
            #00fbff,
            transparent
        );
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto 0;
        width: 1px;
        height: 80vh;
    }

    @media (max-width: 1024px) {
        width: 300px;
        padding: 2rem;
    }

    @media (max-width: 900px) {
        background: rgb(59, 35, 159);
        backdrop-filter: blur(95px);
        min-width: 270px;
        position: fixed;
        left: ${({ menuMobileOpen }) => (menuMobileOpen ? "0" : "-100%")};
        top: 0;
        max-width: 274px;
        width: 70vw;
        animation: sidebar-move 0.5s 1;
        max-height: unset;
        z-index: 999;

        ::after {
            content: none;
        }
    }
    @media (max-width: 768px) {
        max-width: 230px;
    }
`;

const BlurBackground = styled.div<{ isOpen?: boolean }>`
    background: #00000070;
    position: fixed;
    z-index: 998;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};

    @media (min-width: 901px) {
        display: none;
    }
`;

const Navigation = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    .Launchpad {
        margin: 20px 0 0 10px;
        img {
            width: 30px;
            height: auto;
			transition: all 0.5s ease-in-out;
            :hover {
                transform: scale(1.1);
            }
        }
        @media (max-width: 900px) {
            img{
                width: 25px;
            }
        }
    }
    .SpaceTitle {
        margin-top: 1rem;
    }
   {
        /* opacity: 0.5; */
    }
    .ether, .bsc,   .avax,
    .polygon {
		transition: all 0.5s ease-in-out;
        :hover {
            color: #25ff2c;
            border-radius: 12px;
            transform: scale(1.1);
            cursor: pointer;
        }
    }
    .avax {
        img {
            border: 1px solid white;
            border-radius: 50%;
        }
    }
    .HoverNav {
		transition: all 0.5s ease-in-out;
        :hover {
            color: #25ff2c;
            transform: scale(1.1);
            cursor: pointer;
        }
        :focus {
            background-image: linear-gradient(
                -225deg,
                #7cf95b 0%,
                #7cf95b 29%,
                #e1a2ec 67%,
                #f874ff 100%
            );
            animation: textclip 3s linear infinite;
            background-size: 200% auto;
            background-clip: text;
            text-fill-color: transparent;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
			@keyframes textclip {
            to {
                background-position: -200% center;
            }
        }
        }
       
    }
    .NoHoverNav {
        opacity: 0.5;
        pointer-events: none;
    }
    .row {
        display: flex;
        gap: 5px;
        img {
            width: 20px;
            height: 20px;
        }
    }
    .HomePage {
        font-size: 1.2rem;
        padding-left: 0;
        color: #fff;
        margin-top: 1rem;
        background-image: linear-gradient(
                -225deg,
                #7cf95b 0%,
                #7cf95b 29%,
                #e1a2ec 67%,
                #f874ff 100%
            );
            animation: textclip 3s linear infinite;
            background-size: 200% auto;
            background-clip: text;
            text-fill-color: transparent;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            @media (max-width:900px){
                background-image: unset;
                animation: unset;
                background-clip: unset;
                text-fill-color: #fff;
                -webkit-background-clip: unset;
            -webkit-text-fill-color: unset;
            
            }
        }
        @keyframes textclip {
            to {
                background-position: -200% center;
            }
        
        }
        .System{
            @media (min-width: 1227px) {
                display: none;
            }
        }
        
    }
`;

const OutsideImg = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-left: 6px;
`;

const TitleNav = styled.text`
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 1rem;
`;

const Nav = styled(NavLink)`
    padding-left: 8px;
    font-size: 1rem;
    margin-top: 1rem;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
    background-clip: border-box;
    color: #fff;
    transition: transform 0.2s;
`;

const SocialFooter = styled.div`
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    a {
        margin-top: 1rem;
        color: white;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        transition: all ease-in-out 0.3s;

        :hover {
            transform: scale(1.2);
        }

        img {
            width: 25px;
            height: 25px;
        }
    }
`;

export const ExternalLink = styled.a`
    padding-left: 1rem;
    font-size: 1rem;
    margin-top: 1rem;
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 5px;
    background-clip: border-box;
    color: #fff;
    padding-left: 8px;
    transition: all 0.5s ease-in-out;
    :hover {
        color: #25ff2c;
        transform: scale(1.1);
    }
    :focus {
        background-image: linear-gradient(
            -225deg,
            #7cf95b 0%,
            #7cf95b 29%,
            #4da2ea 67%,
            #4da2ea 100%
        );
        animation: textclip 2s linear infinite;
        background-size: 200% auto;
        background-clip: text;
        text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    @keyframes textclip {
        to {
            background-position: -200% center;
        }
    }
`;
