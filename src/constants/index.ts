import DAICoin from "../assets/images/coin/dai.svg";
import ETHCoin from "../assets/images/coin/eth.svg";
import USDTCoin from "../assets/images/coin/usdt.svg";
import USDCCoin from "../assets/images/coin/usdc.svg";
import BNBCoin from "../assets/images/coin/bnb.svg";
import MATICCoin from "../assets/images/coin/matic.svg";
import AVAXCoin from "../assets/images/coin/avax.svg";
import BUSDCoin from "../assets/images/coin/busd.svg";

export const NetworkContextName = "NETWORK";

export const WETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";

export const ETH = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export const Flyby = "0x9d6c60d26B8f776B85d5731AD56b88973C3D370b";

export const ADDRESS_NULL = "0x0000000000000000000000000000000000000000";

export const nativeCurrency: any = {
	symbol: {
		1: "ETH",
		4: "ETH",
		56: "BNB",
		97: "BNB",
		137: "MATIC",
		80001: "MATIC",
		43114: "AVAX",
	},
	URLScan: {
		1: "etherscan.io",
		4: "rinkeby.etherscan.io",
		137: "polygonscan.com",
		80001: "mumbai.polygonscan.com",
		56: "bscscan.com",
		97: "testnet.bscscan.com",
		43114: "snowtrace.io",
	},
	name: {
		1: "Ethereum",
		4: "Ethereum",
		56: "Binance",
		97: "Binance",
		137: "Polygon",
		80001: "Polygon",
		43114: "Avalanche",
	},
};

export const MARKET_ADDRESS: any = {
	1: "0x3B697612B2349DD08257Aa8B568043900e298831",
	4: "0xAd692f4aB2c21c50f64Cb988Dd2ac916141d9F05",
	56: "0x88373B4414d7E48E09b0CE23Dc13A11691832942",
	137: "0x927BaaCfb2DE907012c38Fb22d89824802BeA5Eb",
	43114: "0x927BaaCfb2DE907012c38Fb22d89824802BeA5Eb",
	80001: "0x4b52CaC232Ec17243Bd29Af82DFd86c52a8CE6eC",
	97: "0xa078C56BF88760c919D8B428676342652A216A28",
};

export const HELPER_ADDRESS: any = {
	1: "0xDc89527bA1c823d2F71f9172f2B6B2C8b109dEA7",
	4: "0xf47e7eDbc068A514D5486c4089c5e5f78a10306a",
	56: "0x0D9351e45DCF1a4f4B5E9a5e3CC438C0Bd2880C9",
	137: "0xDc89527bA1c823d2F71f9172f2B6B2C8b109dEA7",
	43114: "0x1bE3Bae550aD62a24172F7039a3f95B990A88Ffb",
	80001: "0x709b758600AE0C932D6394999D2C1016f93179Fb",
	97: "0x2e2af362DBCF31FA69a8733f6E3E6A7Abd4876c7",
};

export const REDEEM_TOKEN_ADDRESS: any = {
	1: "0x69Beb13BB6CF25F62b0cdbE91aaE2d3a7458559F",
	4: "0x3aB3E303D37AB51C260d809cB873e68a3A03134B",
	56: "0x3A6bcaAED8c73152a9218E43A68e0BEEB7e17015",
	137: "0xCA5d427aF96E9846F7d192e64034f0666431FdCe",
	43114: "0xCA5d427aF96E9846F7d192e64034f0666431FdCe",
	80001: "0x3A03b4b1A8347C6f1b1295d03BA2D3E2A8Cd8AC8",
	97: "0x8051f77273eAbA84A862976e17f94eBC2c55Cd27",
};

export enum supportedChainId {
	Mainnet = 1,
	Rinkeby = 4,
	BscMainnet = 56,
	BscTestNet = 97,
	PolygonMainnet = 137,
	PolygonTestNet = 80001,
	AvalancheMainnet = 43114,
}

export const paymentTokenCurrency: any = {
	USDC: {
		address: {
			1: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
			4: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
			56: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
			97: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
			137: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
			80001: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
			43114: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
		},
		symbol: {
			1: "USDC",
			4: "USDC",
			56: "USDC",
			97: "USDC",
			137: "USDC",
			80001: "USDC",
			43114: "USDC",
		},
		logo: {
			1: USDCCoin,
			4: USDCCoin,
			56: USDCCoin,
			97: USDCCoin,
			137: USDCCoin,
			80001: USDCCoin,
			43114: USDCCoin,
		},
		fullName: {
			1: "USD Coin",
			4: "USD Coin",
			56: "USD Coin",
			97: "USD Coin",
			137: "USD Coin",
			80001: "USD Coin",
			43114: "USD Coin",
		},
	},
	USDT: {
		address: {
			1: "0xdac17f958d2ee523a2206206994597c13d831ec7",
			4: "0x8D00A3A163533eD274C7C8dE5Cd9C6F3A2612092",
			56: "0x55d398326f99059fF775485246999027B3197955",
			97: "0xE97c988D9B0E45D0711067B86ab0621A56237534",
			137: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
			80001: "0x3813e82e6f7098b9583FC0F33a962D02018B6803",
			43114: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
		},
		symbol: {
			1: "USDT",
			4: "USDT",
			56: "USDT",
			97: "USDT",
			137: "USDT",
			80001: "USDT",
			43114: "USDT",
		},
		logo: {
			1: USDTCoin,
			4: USDTCoin,
			56: USDTCoin,
			97: USDTCoin,
			137: USDTCoin,
			80001: USDTCoin,
			43114: USDTCoin,
		},
		fullName: {
			1: "Tether Usd",
			4: "Tether Usd",
			56: "Tether Usd",
			97: "Tether Usd",
			137: "Tether Usd",
			80001: "Tether Usd",
			43114: "Tether Usd",
		},
	},
	DAI: {
		address: {
			1: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
			4: "0x2c5084dEF7B032102a16fF636CACB99Fc3305A66",
			56: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
			97: "0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1",
			137: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
			80001: "0x5A7315fBA549946506f2E4E07126433dfe1c1698",
			43114: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
		},
		symbol: {
			1: "DAI",
			4: "DAI",
			56: "DAI",
			97: "DAI",
			137: "DAI",
			80001: "DAI",
			43114: "DAI",
		},
		logo: {
			1: DAICoin,
			4: DAICoin,
			56: DAICoin,
			97: DAICoin,
			137: DAICoin,
			80001: DAICoin,
			43114: DAICoin,
		},
		fullName: {
			1: "DAI StableCoin",
			4: "DAI StableCoin",
			56: "DAI StableCoin",
			97: "DAI StableCoin",
			137: "DAI StableCoin",
			80001: "DAI StableCoin",
			43114: "DAI StableCoin",
		},
	},
	BUSD: {
		address: {
			1: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
			4: "0x5B93f7D63Ce480013272B0a0090aB9Ff3614C455",
			56: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
			97: "0x8E870D67F660D95d5be530380D0eC0bd388289E1",
			137: "0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7",
			80001: "0xdfD34b818d52FbFA167557eE9EF4386bfbb65419",
			43114: "0x8E870D67F660D95d5be530380D0eC0bd388289E1",
		},
		symbol: {
			1: "BUSD",
			4: "BUSD",
			56: "BUSD",
			97: "BUSD",
			137: "BUSD",
			80001: "BUSD",
			43114: "BUSD",
		},
		logo: {
			1: BUSDCoin,
			4: BUSDCoin,
			56: BUSDCoin,
			97: BUSDCoin,
			137: BUSDCoin,
			80001: BUSDCoin,
			43114: BUSDCoin,
		},
		fullName: {
			1: "Binance USD",
			4: "Binance USD",
			56: "Binance USD",
			137: "Binance USD",
			43114: "Binance USD",
			80001: "Binance USD",
			97: "Binance USD",
		},
	},
	NATIVE: {
		address: {
			1: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
			4: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
			137: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
			56: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
			97: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
			80001: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
			43114: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
		},
		symbol: {
			1: "ETH",
			4: "ETH",
			56: "BNB",
			97: "BNB",
			137: "MATIC",
			80001: "MATIC",
			43114: "AVAX",
		},
		fullName: {
			1: "ETHEREUM (ETH)",
			4: "ETHEREUM (ETH)",
			56: "BINANCE (BNB)",
			97: "BINANCE (BNB)",
			137: "POLYGON (MATIC)",
			80001: "POLYGON (MATIC)",
			43114: "AVALANCHE (AVAX)",
		},
		logo: {
			1: ETHCoin,
			4: ETHCoin,
			56: BNBCoin,
			97: BNBCoin,
			137: MATICCoin,
			80001: MATICCoin,
			43114: AVAXCoin,
		},
	},
};

export const logoCurrency: any = {
	USDT: USDTCoin,
	USDC: USDCCoin,
	DAI: DAICoin,
	ETH: ETHCoin,
	FBS: BUSDCoin,
	BKN: BUSDCoin,
	"BKN-6": DAICoin,
	BUSD: BUSDCoin,
	AVAX: AVAXCoin,
	MATIC: MATICCoin,
	BNB: BNBCoin,
};

export const INDEXDB_OBJECT_STORE = ["auction_completed", "auction_live", "auction_upcomming"];
