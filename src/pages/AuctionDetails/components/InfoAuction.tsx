/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import CountDown from "../components/CountDown";
import Text from "../../../components/Text";
import Circle from "../../../components/ProcessCircle";
import Github from "../../../assets/base64/github.json";
import Discord from "../../../assets/base64/discord.json";
import Twitter from "../../../assets/base64/twitter.json";
import Telegram from "../../../assets/images/svg/telegram.svg";
import WebSite from "../../../assets/images/websiteIcon.svg";
import Medium from "../../../assets/images/svg/medium.svg";
import {
    AuctionType,
    WrapperTypeAuction,
    About,
    InnerCard,
    HeaderCard,
    TimeBox,
    GroupCircle,
    WrapperCircle,
    TypeAuctionButton,
    FooterInfoForbit,
    SocialFooter,
    SocialIcon,
    SocialIconOutside,
    IconLeftTxt,
    Column1,
    Column2,
} from "../styled";

const InfoAuction = ({
    dataAuction,
    socialNetwork,
    auctionSuccess,
    finalize,
    id,
}: {
    dataAuction: any;
    socialNetwork: any;
    auctionSuccess: any;
    finalize: any;
    id: any;
}) => {
    const [currentTokenPrice, setCurrentTokenPrice] = useState(0);
    const [iconGithub, setIconGithub]: any = useState();
    const [iconDiscord, setIconDiscord]: any = useState();
    const [iconTwitter, setIconTwitter]: any = useState();
    const [iconTelegram, setIconTelegram]: any = useState();

    const configIndexedData = async () => {
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
    const DutchAuction = () => {
        const totalRaise = Number(
            Number(dataAuction.data.commitmentsTotal) /
                Number(`1e${dataAuction.data.paymentCurrencyInfo.decimals}`)
        );
        const tokenPrice =
            totalRaise /
            (Number(dataAuction.data.totalTokens) /
                Number(`1e${dataAuction.data.tokenInfo.decimals}`));
        setCurrentTokenPrice(tokenPrice);
    };

    const BatchAuction = () => {
        const totalRaise = Number(
            Number(dataAuction.data.commitmentsTotal) /
                Number(`1e${dataAuction.data.paymentCurrencyInfo.decimals}`)
        );
        const tokenPrice =
            totalRaise /
            (Number(dataAuction.data.totalTokens) /
                Number(`1e${dataAuction.data.tokenInfo.decimals}`));
        setCurrentTokenPrice(tokenPrice);
    };

    const CrowSale = () => {
        const totalRaise = Number(
            Number(dataAuction.data.commitmentsTotal) /
                Number(`1e${dataAuction.data.paymentCurrencyInfo.decimals}`)
        );
        const tokenPrice =
            totalRaise /
            (Number(dataAuction.data.totalTokens) /
                Number(`1e${dataAuction.data.tokenInfo.decimals}`));
        setCurrentTokenPrice(tokenPrice);
    };
    useEffect(() => {
        configIndexedData();
    }, []);
    useEffect(() => {
        dataAuction.info.marketTemplate === "1"
            ? CrowSale()
            : dataAuction.info.marketTemplate === "2"
            ? DutchAuction()
            : BatchAuction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataAuction]);

    return (
        <>
            <InnerCard>
                {
                    <>
                        <AuctionType>
                            {/* <Text
                                className="TextAuction"
                                marginTop="0"
                                size="1rem"
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                Auction Type&nbsp;&nbsp;
                            </Text> */}
                            <TypeAuctionButton>
                                <WrapperTypeAuction>
                                    <Text
                                        className="TextButton"
                                        style={{ padding: "6px 5px" }}
                                        marginTop="0"
                                        size="1rem"
                                    >
                                        {dataAuction?.templateName ===
                                            "Crowdsale" &&
                                        dataAuction?.data?.tokenInfo?.symbol ===
                                            "FBS"
                                            ? "Pre-Private Sale"
                                            : dataAuction?.templateName}
                                    </Text>
                                </WrapperTypeAuction>
                                &nbsp;&nbsp;
                                {Number(new Date().getTime()) / 1000 <
                                Number(dataAuction?.data.startTime) ? (
                                    // <WrapperTypeAuction background="linear-gradient(to right,#f9bb5b,#4b2a86)">
                                    <WrapperTypeAuction background="linear-gradient(to right,#4fa7e3,#1106d9)">
                                        <Text
                                            className="TextButton"
                                            style={{
                                                padding: "6px 5px",
                                                lineHeight: "fit-content",
                                            }}
                                            marginTop="0"
                                            size="1rem"
                                        >
                                            Upcoming
                                        </Text>
                                    </WrapperTypeAuction>
                                ) : finalize && !auctionSuccess ? (
                                    <WrapperTypeAuction
                                        border="1px solid #fd0000"
                                        background="none"
                                    >
                                        <Text
                                            className="TextButton"
                                            style={{
                                                padding: "6px 5px",
                                                lineHeight: "fit-content",
                                            }}
                                            marginTop="0"
                                            size="1rem"
                                        >
                                            Finished
                                        </Text>
                                    </WrapperTypeAuction>
                                ) : (
                                    <></>
                                )}
                            </TypeAuctionButton>
                        </AuctionType>
                    </>
                }
                <br />
                <HeaderCard>
                    <Text
                        style={{
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                        size="0.9rem"
                    >
                        <span>
                            {dataAuction?.data?.tokenInfo?.name} (
                            {dataAuction?.data?.tokenInfo?.symbol})
                        </span>
                        {dataAuction?.data?.tokenInfo?.name ===
                        "forbitspace" ? (
                            <span>DEX Super Aggregator</span>
                        ) : (
                            <></>
                        )}
                    </Text>
                    <TimeBox>
                        <CountDown dataAuction={dataAuction} />
                    </TimeBox>
                </HeaderCard>
                <GroupCircle>
                    <WrapperCircle className="circle1">
                        <Circle contract={`${id.id}`} />
                    </WrapperCircle>
                    <WrapperCircle>
                        <Circle
                            token={`${dataAuction?.data?.tokenInfo?.addr}`}
                        />
                    </WrapperCircle>
                </GroupCircle>
                <FooterInfoForbit>
                    <SocialFooter>
                        <Column1>
                            <SocialIconOutside>
                                <SocialIcon>
                                    <a
                                        href="https://forbitspace.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="Website"
                                            src={WebSite}
                                            alt="homepage"
                                        />
                                    </a>
                                </SocialIcon>
                                <IconLeftTxt>
                                    <a
                                        href="https://forbitspace.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        forbitspace
                                    </a>
                                </IconLeftTxt>
                            </SocialIconOutside>
                            <SocialIconOutside>
                                <SocialIcon className="RightIcon">
                                    <a
                                        href="https://medium.com/@forbitspace"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="Medium"
                                            src={Medium}
                                            alt="icon medium"
                                        />
                                    </a>
                                </SocialIcon>
                                <IconLeftTxt>
                                    <a
                                        href="https://medium.com/@forbitspace"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Medium
                                    </a>
                                </IconLeftTxt>
                            </SocialIconOutside>
                            <SocialIconOutside>
                                <SocialIcon className="RightIcon">
                                    <a
                                        href="https://discord.gg/CnJqNa2wfG"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="Discord"
                                            src={iconDiscord}
                                            alt="icon discord"
                                        />
                                    </a>
                                </SocialIcon>
                                <IconLeftTxt>
                                    <a
                                        href="https://discord.gg/CnJqNa2wfG"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Discord
                                    </a>
                                </IconLeftTxt>
                            </SocialIconOutside>
                        </Column1>
                        <Column2>
                            <SocialIconOutside>
                                <SocialIcon>
                                    <a
                                        href="https://twitter.com/forbitspace"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="Twitter"
                                            src={iconTwitter}
                                            alt="twitter"
                                        />
                                    </a>
                                </SocialIcon>
                                <IconLeftTxt>
                                    <a
                                        href="https://twitter.com/forbitspace"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Twitter
                                    </a>
                                </IconLeftTxt>
                            </SocialIconOutside>
                            <SocialIconOutside>
                                <SocialIcon>
                                    <a
                                        href="https://t.me/forbitspace"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="Telegram"
                                            src={iconTelegram}
                                            alt="telegram"
                                        />
                                    </a>
                                </SocialIcon>
                                <IconLeftTxt>
                                    <a
                                        href="https://t.me/forbitspace"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Telegram
                                    </a>
                                </IconLeftTxt>
                            </SocialIconOutside>
                            <SocialIconOutside>
                                <SocialIcon>
                                    <a
                                        href="https://github.com/forbitspace"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className="Github"
                                            src={iconGithub}
                                            alt="github"
                                        />
                                    </a>
                                </SocialIcon>
                                <IconLeftTxt>
                                    <a
                                        href="https://github.com/forbitspace"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Github
                                    </a>
                                </IconLeftTxt>
                            </SocialIconOutside>
                        </Column2>
                    </SocialFooter>
                </FooterInfoForbit>
                <About>
                    {socialNetwork?.map((item: any) => item)}
                    {socialNetwork.length > 0 ? (
                        <>
                            <br />
                            <br />
                        </>
                    ) : (
                        <></>
                    )}
                </About>
            </InnerCard>
        </>
    );
};

export default InfoAuction;
