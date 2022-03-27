import React, { useState, useEffect } from "react";
import styled from "styled-components";
import imgForbitSpace from "../../assets/base64/forbitspace-logo.json";
import imgForbitSwap from "../../assets/base64/forbitswap-logo.json";
// import imgNFTsSpace from "../../assets/base64/nfts-logo.json";
import imgNFTSpace from "../../assets/logoSpaceX.png";
import TxtNFT from "../../assets/images/NFTs space.png";

export default function Introduce() {
    const [logoSpace, setLogoSpace]: any = useState();
    const [logoSwap, setLogoSwap]: any = useState();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [logoNFTs, setLogoNFTs]: any = useState();

    const configIndexedData = async () => {
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
        configIndexedData();
    }, []);

    return (
        <>
            <Wrapper>
                <Wrap>
                    <Image
                        src={logoSpace}
                        onClick={() => {
                            window.open(`https://app.forbitspace.com/#/swap`);
                        }}
                        alt="no-image"
                        width="200px"
                        height="auto"
                    />
                </Wrap>
                <Wrap>
                    <Image
                        src={logoSwap}
                        onClick={() => {
                            window.open(`https://app.forbitswap.com/#/swap`);
                        }}
                        alt="no-image"
                        width="200px"
                        height="auto"
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
                        width="200px"
                        height="auto"
                    />
                </Wrap>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    display: flex;
    gap: 50px;
    .NFTSpace {
        display: flex;
        align-items: center;
    }
    @media (max-width: 1282px) {
        gap: 20px;
    }
`;

const Wrap = styled.div`
    .NFT {
        height: 33px;
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
    @media (max-width: 1226px) {
        .NFT {
            height: 33px;
        }
        .txtNFT {
            width: 80px;
        }
    }
    @media (max-width: 443px) {
        .NFT {
            height: 28px;
            width: 28px;
        }
        .txtNFT {
            width: 63px;
        }
    }
    @media (max-width: 405px) {
        .NFT {
            height: 25px;
            width: 25px;
        }
        .txtNFT {
            width: 54px;
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
    @media (max-width: 1364px) {
        max-width: 132px;
        &.spaceX {
            max-width: 150px;
        }
    }
`;
