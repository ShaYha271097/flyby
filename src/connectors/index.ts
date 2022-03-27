import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { PortisConnector } from "@web3-react/portis-connector";
import { NetworkConnector } from "./NetworkConnector";
import { MewConnectConnector } from "@myetherwallet/mewconnect-connector";
import { BscConnector } from "@binance-chain/bsc-connector";
import { FrameConnector } from "@web3-react/frame-connector";
import { AuthereumConnector } from "@web3-react/authereum-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";
import { TrezorConnector } from "@web3-react/trezor-connector";
import { TorusConnector } from "@web3-react/torus-connector";
import { MagicConnector } from "@web3-react/magic-connector";
import { FortmaticConnector } from "./Fortmatic";

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL;
const PORTIS_ID = "facbdf43-c64b-4c01-95e2-00ab8289deb3";

const NETWORK_URL_POLYGON: any = "https://polygon-mainnet.infura.io/v3/fda0c0e91b064d5f82e80f08465fc3d9";
const NETWORK_URL_ETHEREUM: any = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
const NETWORK_URL_BINANCE: any = "https://bsc-dataseed.binance.org/";
const MAGIC_API_KEY: any = "pk_live_7ADE6B99BCDB6354";
const FORMATIC_KEY: any = "pk_live_F937DF033A1666BF";

export const NETWORK_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? "5");

if (typeof NETWORK_URL === "undefined") {
	throw new Error("REACT_APP_NETWORK_URL must be a defined environment variable");
}

export const network = new NetworkConnector({
	urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
	return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any));
}

export const injected = new InjectedConnector({
	supportedChainIds: [1, 4, 97, 56, 137, 80001, 43113, 43114],
});

// mainnet only
// export const walletconnect = new WalletConnectConnector({
//   rpc: { 1: NETWORK_URL },
//   bridge: 'https://bridge.walletconnect.org',
//   qrcode: true,
//   pollingInterval: 15000,
// });

export const walletconnect = new WalletConnectConnector({
	supportedChainIds: [1],
	rpc: { 1: NETWORK_URL },
	bridge: "https://bridge.walletconnect.org",
	qrcode: true,
});

// mainnet only
export const fortmatic = new FortmaticConnector({
	apiKey: FORMATIC_KEY ?? "",
	chainId: 1,
});

// mainnet only
export const portis = new PortisConnector({
	dAppId: PORTIS_ID ?? "",
	networks: [1],
});

// mainnet only
export const walletlink = new WalletLinkConnector({
	url: NETWORK_URL_ETHEREUM,
	appName: "Dex Aggregator",
	appLogoUrl: "https://app.fotbispace.com/favicon.png",
});

export const authereum = new AuthereumConnector({
	chainId: 1,
});

// export const squarelink = new SquarelinkConnector({
//     clientId: "forbitspace",
//     networks: [1],
// });

export const ledger = new LedgerConnector({
	chainId: 1,
	url: NETWORK_URL_ETHEREUM,
});

export const trezor = new TrezorConnector({
	chainId: 1,
	url: `https://mainnet.infura.io/v3/${NETWORK_URL_ETHEREUM}`,
	manifestAppUrl: "https://app.forbitspace.com",
	manifestEmail: "pantinho.space@gmail.com",
});

export const frame = new FrameConnector({
	supportedChainIds: [1],
});

export const torus = new TorusConnector({
	chainId: 1,
});

export const magic = new MagicConnector({
	chainId: 1,
	apiKey: MAGIC_API_KEY,
	email: "pantinho.space@gmail.com",
});

export const binance = new BscConnector({
	supportedChainIds: [1, 56, 137],
});

export const myetherwallet = new MewConnectConnector({
	url: `https://mainnet.infura.io/v3/fb41009092f946debd54b1ee4866a71d`,
});
