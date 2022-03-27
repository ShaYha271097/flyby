import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Button } from "components/Button";
import { useActiveWeb3React } from "hooks";
import detectEthereumProvider from "@metamask/detect-provider";
import Modal from "components/Modal";
import LogoETH from "../../assets/images/svg/logo-eth.svg";
import LogoBSC from "../../assets/images/svg/logo-bnb.svg";
import LogoPolygon from "../../assets/images/svg/logo-polygon.svg";
import LogoAVAX from "../../assets/images/svg/logo-avax.svg";
import BackgroundModal from "../../assets/images/button.png";

const Network = () => {
	const [open, setOpen] = useState(false);
	const { chainId } = useActiveWeb3React();

	const ethereum = [
		{
			chainId: "0x1",
		},
	];
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

	// // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
		await detectEthereumProvider()
			.then((res: any) => {
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
			})
			.then(() => {
				setOpen(false);
			})
			.catch((err: any) => {
				console.log("err", err);
			});
	};

	const Networks = () => {
		return (
			<NetworkLogo>
				{chainId === 1 || chainId === 4 ? (
					<>
						<img src={LogoETH} alt="logo-eth" />
						<p>Ethereum</p>
					</>
				) : chainId === 56 || chainId === 97 ? (
					<>
						<img src={LogoBSC} alt="logo-bsc" />
						<p>BNB Chain</p>
					</>
				) : chainId === 137 || chainId === 80001 ? (
					<>
						<img src={LogoPolygon} alt="logo-polygon" />
						<p>Polygon</p>
					</>
				) : chainId === 43113 || chainId === 43114 ? (
					<>
						<img src={LogoAVAX} alt="logo-avax" />
						<p>Avalanche</p>
					</>
				) : (
					"Wrong network"
				)}
			</NetworkLogo>
		);
	};
	return (
		<WrapperNetwork>
			<ButtonNetwork onClick={() => setOpen(true)}>
				<Networks />
			</ButtonNetwork>
			<Modal isOpen={open} onDismiss={() => setOpen(false)}>
				<ModalNetwork>
					<img src={BackgroundModal} alt="background" className="bg-modal" />
					<NetworkOutside>
						<NetworkInside>
							{" "}
							<NetworkItem
								onClick={() => {
									changeNetwork(binance, "binance");
								}}
								className="bsc"
							>
								<img src={LogoBSC} alt="logo-bsc" />
							</NetworkItem>
							<NetworkItem className="ether" onClick={() => changeNetwork(ethereum, "ethereum")}>
								<img src={LogoETH} alt="logo-eth" />
							</NetworkItem>
							<NetworkItem className="polygon" onClick={() => changeNetwork(matic, "polygon")}>
								<img src={LogoPolygon} alt="logo-polygon" />
							</NetworkItem>
							<NetworkItem className="avax" onClick={() => changeNetwork(avalanche, "avalanche")}>
								<img className="Avanla" src={LogoAVAX} alt="logo-avax" />
							</NetworkItem>
						</NetworkInside>
					</NetworkOutside>
				</ModalNetwork>
			</Modal>
		</WrapperNetwork>
	);
};
const WrapperNetwork = styled.div``;

const rotateAnimationOutside = keyframes`
    0% {
        transform: rotate(-358deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;

const NetworkOutside = styled.div`
	animation: ${rotateAnimationOutside} 2s;
	position: absolute;
	width: 100%;
	top: -2px;
	height: 100%;
`;
const NetworkInside = styled.div``;

const ButtonNetwork = styled(Button)`
	border: none;
	padding: 3px 9px;
	max-width: 150px;
	max-height: 36px;
	width: 100%;
	height: 100%;
	@media (max-width: 576px) {
		padding: 3px 9px;
	}
	@media (max-width: 519px) {
		padding: 3px 6px;
	}
	@media (max-width: 450px) {
		padding: 3px 6px;
	}
`;
const NetworkLogo = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	p {
		margin: 0;
	}
	img {
		width: 30px;
		height: auto;
		@media (max-width: 450px) {
			width: 25px;
		}
	}
	@media (max-width: 568px) {
		p {
			display: none;
		}
	}
`;
const ModalNetwork = styled.div`
	width: 100%;
	max-width: 400px;
	padding: 1rem 0;
	position: relative;
	.bg-modal {
		width: 100%;
	}
	/* .avax,
    .polygon {
        opacity: 0.5;
    } */
`;
const NetworkItem = styled.div`
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    .Avanla {
        border-radius: 40px;
        border: 0.5px solid white;
    }
    ::after {
        display: inline-block;
        max-width: 0;
        overflow: hidden;
        transition: 0.4s;
        position: absolute;
        left: 50%;
        top: 102%;
        transform: translateX(-50%);
}
    }
    :hover {
        img {
            width: 50px;
        }
        &::after {
            max-width: 200px;
            width: 100px;
            text-align: center;
        }
    }

    img {
        width: 45px;
        @media (max-width: 768px) {
            width: 40px;
        }
        @media (max-width: 426px) {
            width: 35px;
        }
    }
    &.ether {
        top: 17%;
        left: 69%;
        ::after {
            content: "Ethereum";
        }
    }
    &.bsc {
        top: 17%;
        left: 18%;
        ::after {
            content: "BNB Chain";
            width: 100px;
            text-align: center;
        }
    }
    &.polygon {
        top: 72%;
        left: 21%;
        ::after {
            content: "Polygon";
        }
    }
    &.avax {
        top: 72%;
        left: 69%;
        ::after {
            content: "Avalanche";
        }
        @media (max-width: 768px) {
            top: 70%;
            left: 68%;
        }
    }
`;

export default Network;
