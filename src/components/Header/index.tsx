import React, { useEffect, useState, useRef } from "react";
import { Button } from "../Button";
import { injected } from "../../connectors";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useNativeBalances } from "../../hooks";
import { shortAddress } from "../../utils";
import Jazzicon from "jazzicon";
import Logo from "../Logo";
import { useAuctionState } from "../../store";
import ModalAccount from "../ModalAccount";
import LogoFlyby from "../../assets/FlybyLoading.png";
import {
	GroupButton,
	Loader,
	Wrapper,
	WrapperLogo,
	IconAccount,
	AccountStatus,
	Balance,
	Account,
	ButtonMenuMobile,
	WrapperIntro,
	WrapperIntroResponsive,
	WrapperMainHeader,
	// ButtonForbit,
	// Intro,
	// ButtonForbitOutside,
} from "./styled";
import { nativeCurrency } from "../../constants/index";
import { useActiveWeb3React } from "../../hooks";
import Network from "components/Network";
import Introduce from "../Introduce";
//
import { useDispatch, useSelector } from "react-redux";
import { RootState, toggleWalletModalx } from "../theme/store";

const Header = ({ menuOpen, setMenuOpen }: { menuOpen: any; setMenuOpen: any }) => {
	const walletModalOpen = useSelector((state: RootState) => state.walletModalOpen);
	const dispatch = useDispatch();

	const { activate, account } = useWeb3React();
	const { balance } = useNativeBalances(account);
	const { chainId }: any = useActiveWeb3React();
	const [balanceNative, setBalanceNative] = useState(0);
	const [openModalAccount, setOpenModalAccount] = useState(false);
	const ref = useRef<HTMLDivElement>();
	const [state] = useAuctionState();
	const { transactionPending } = state;
	const [, setDefaultAccount]: any = useState();
	const [, setDefaultChainId]: any = useState();
	const [wrongNetwork, setWrongNetWork]: any = useState(false);
	const [backgroundMenu, setBackgroundMenu]: any = useState("none");
	const ConnectWallet = () => {
		dispatch(toggleWalletModalx());
		// return activate(injected, undefined, true).catch((error) => {
		//     if (error instanceof UnsupportedChainIdError) {
		//         activate(injected);
		//     } else {
		//     }
		// });
	};

	const eventScroll = () => {
		if (window.scrollY > 200) {
			setBackgroundMenu("linear-gradient(to bottom, #0000008a, transparent)");
		} else {
			setBackgroundMenu("none");
		}
	};

	useEffect(() => {
		if (account)
			balance().then((res: any) => {
				setBalanceNative(Number(res.toString() / 1e18));
			});
		if (account && ref.current) {
			ref.current.innerHTML = "";
			ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
		}
		setDefaultAccount(account);
		setDefaultChainId(chainId);
	}, [account, balance, chainId]);

	// useEffect(() => {
	//     activate(injected, undefined, true)
	//         .then(() => {
	//             setWrongNetWork(false);
	//         })
	//         .catch((error) => {
	//             if (error instanceof UnsupportedChainIdError) {
	//                 activate(injected);
	//                 setWrongNetWork(true);
	//             } else {
	//                 setWrongNetWork(false);
	//             }
	//         });
	// }, [chainId]);

	useEffect(() => {
		window.addEventListener("scroll", eventScroll);
	}, []);

	return (
		<WrapperMainHeader background={backgroundMenu}>
			<Wrapper>
				<ModalAccount isOpen={walletModalOpen} onDismiss={ConnectWallet} />
				<WrapperLogo>
					<img src={LogoFlyby} alt="" />
				</WrapperLogo>
				<WrapperIntro>
					<Introduce />
				</WrapperIntro>
				<GroupButton>
					{/* <ButtonForbitOutside>
                        <ButtonForbit>
                            <img src={imgForbit} alt="" />
                            <Intro className="IntroForbit">
                                <Introduce />
                            </Intro>
                        </ButtonForbit>
                    </ButtonForbitOutside> */}
					<Network />
					{wrongNetwork ? (
						<Button background="rgb(255, 67, 67)">Wrong Network</Button>
					) : account ? (
						<AccountStatus>
							<Balance>
								{balanceNative.toFixed(5)} {nativeCurrency.symbol[chainId]}
							</Balance>
							<Account onClick={ConnectWallet}>
								{shortAddress(account)}
								{transactionPending ? <Loader /> : <IconAccount ref={ref as any}></IconAccount>}
							</Account>
						</AccountStatus>
					) : (
						<Button onClick={ConnectWallet} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
							Connect
						</Button>
					)}
					<ButtonMenuMobile onClick={() => setMenuOpen(!menuOpen)} isOpen={menuOpen}>
						<span></span>
						<span></span>
						<span></span>
					</ButtonMenuMobile>
				</GroupButton>
			</Wrapper>
			<WrapperIntroResponsive>
				<Introduce />
			</WrapperIntroResponsive>
		</WrapperMainHeader>
	);
};

export default Header;
