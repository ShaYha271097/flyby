import React, { useEffect, useState, useRef } from "react";

import Text from "../../../components/Text";
import CountDownCircleDetail from "../../../components/ProcessCircle/CountDownCircleDetail";
import { inputRegex } from "../../../utils";
import { escapeRegExp } from "../../../utils";
import Slider from "react-rangeslider";
import { useActiveWeb3React } from "../../../hooks/index";
import { getTimeCountDown } from "utils/getTimeCountDown";
import moment from "moment-timezone";
import { useMulticallContract, useRedeemTokenContract, useMulticallContractWeb3 } from "hooks/useContract";
import { ethers } from "ethers";
import { useParams } from "react-router";

import { InnerCard, Column, WrapperCircle, WrapperAction, ButtonAction, SliderWrapper, CommitBar, CommitButton } from "../styled";
import { useAuctionState } from "../../../store";
import { REDEEM_TOKEN_ADDRESS } from "../../../constants";
import { TextErr } from "pages/NewSale/styled";
import { logoCurrency } from "../../../constants";

const TabCommit = ({
	updateAuctionData,
	amountForSale,
	amountRaised,
	idTemplate,
	minRaise,
	dataAuction,
	reservePrice,
	auctionPrice,
	startPrice,
	endTime,
	startTime,
	currentTokenPrice,
	timeNow,
	hasAdminRole,
	valueRange,
	handleChange,
	setCommitValue,
	commitValue,
	approveStatus,
	commit,
	callApprove,
	finalize,
	handleConfirmFinalizeAuction,
	// setOpen,
	tokensClaim,
	handleClaimTokenUser,
	remainingAmount,
	commitments,
	auctionSuccess,
	// rateView,
	// setValueRange,
	currentPrice,
	totalTokensClaimable,
	balance,
}: any) => {
	const t: any = useRef();
	const { id }: any = useParams();
	const { chainId, account }: any = useActiveWeb3React();
	const minimum = [1, 4, 137, 80001, 43114, 43113].includes(chainId) ? 999 : 300;
	const invalidCommitValue =
		(Number(commitValue) < minimum || Number(commitValue) > 9999) && (idTemplate === 1 || idTemplate === 3)
			? `Invalid value! The limit of amount tokens commit is between ${minimum}$ and 9999$.`
			: commitValue > balance
			? "Insufficient balance of " + dataAuction.data.paymentCurrencyInfo.symbol
			: "";
	const [, prevSeccond] = useState(0);
	const [state, actions] = useAuctionState();
	const redeemContract = useRedeemTokenContract();
	const [amountTokensClaimed, setAmountTokensClaimed] = useState(0);
	const [lockedDataClaimable, setLockedDataClaimable]: any[] = useState();
	const multicall = useMulticallContract();
	const multicallWeb3 = useMulticallContractWeb3();
	const hasLockedToken = Number(commitments) === 0;
	const auctionHasNoCompleted = timeNow >= Number(dataAuction?.data.startTime) * 1000 && timeNow < Number(dataAuction?.data.endTime) * 1000;
	const auctionCompleted = timeNow > Number(dataAuction?.data.endTime) * 1000;
	const fullPeriodDay = idTemplate === 2 ? 86400 * 60 : idTemplate === 1 ? 86400 * 150 : 86400 * 230;
	const fullTimeToClaim = Number(endTime) + fullPeriodDay;
	const logoPaymentCurrency: any = logoCurrency[dataAuction.data.paymentCurrencyInfo.symbol];
	const auctionIsUpcoming = timeNow < startTime * 1000;
	const nextTimeUnix =
		chainId === 1 || chainId === 4
			? idTemplate === 2
				? timeNow / 1000 >= endTime
					? fullTimeToClaim
					: 0
				: idTemplate === 1
				? timeNow / 1000 >= endTime + (fullPeriodDay * 120) / 150
					? fullTimeToClaim
					: timeNow / 1000 >= endTime + (fullPeriodDay * 90) / 150
					? endTime + (fullPeriodDay * 120) / 150
					: timeNow / 1000 >= endTime + (fullPeriodDay * 60) / 150
					? endTime + (fullPeriodDay * 90) / 150
					: endTime + (fullPeriodDay * 60) / 150
				: timeNow / 1000 >= endTime + (fullPeriodDay * 180) / 230
				? fullTimeToClaim
				: timeNow / 1000 >= endTime + (fullPeriodDay * 130) / 230
				? endTime + (fullPeriodDay * 180) / 230
				: timeNow / 1000 >= endTime + (fullPeriodDay * 80) / 230
				? endTime + (fullPeriodDay * 130) / 230
				: endTime + (fullPeriodDay * 80) / 230
			: idTemplate === 2
			? timeNow / 1000 >= endTime
				? fullTimeToClaim
				: 0
			: idTemplate === 1
			? timeNow / 1000 >= endTime + (fullPeriodDay * 120) / 150
				? fullTimeToClaim
				: timeNow / 1000 >= endTime + (fullPeriodDay * 90) / 150
				? endTime + (fullPeriodDay * 120) / 150
				: timeNow / 1000 >= endTime + (fullPeriodDay * 60) / 150
				? endTime + (fullPeriodDay * 90) / 150
				: endTime + (fullPeriodDay * 60) / 150
			: timeNow / 1000 >= endTime + (fullPeriodDay * 180) / 230
			? fullTimeToClaim
			: timeNow / 1000 >= endTime + (fullPeriodDay * 130) / 230
			? endTime + (fullPeriodDay * 180) / 230
			: timeNow / 1000 >= endTime + (fullPeriodDay * 80) / 230
			? endTime + (fullPeriodDay * 130) / 230
			: endTime + (fullPeriodDay * 80) / 230;

	const nextTimeDate = new Date(Number(nextTimeUnix) * 1000);
	const nextTimeFormat = moment.utc(nextTimeDate, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
	const nextTimeClaim = getTimeCountDown(nextTimeFormat);
	const updateWhenClaimableTime = nextTimeUnix * 1000 === timeNow;
	const auctionEnded = timeNow / 1000 >= endTime;
	const [updatelockedDataClaimable, setUpdatelockedDataClaimable] = useState(false);
	const arrAmountTokenClaimable =
		lockedDataClaimable && lockedDataClaimable.length > 0
			? lockedDataClaimable.map((item: any) => {
					return Number(ethers.utils.formatUnits(item[0], 18));
			  })
			: [];

	const tokensClaimable = arrAmountTokenClaimable && arrAmountTokenClaimable.length > 0 ? arrAmountTokenClaimable.reduce((a: number, b: number) => a + b) : 0;
	// const totalTokenReceived = commitValue ? commitValue / currentTokenPrice : 0
	const totalCommitments = ethers.utils.formatUnits(dataAuction.data.commitmentsTotal, dataAuction.data.paymentCurrencyInfo.decimals);
	const totalTokenReceived = commitValue
		? idTemplate === 1 || idTemplate === 3
			? Number(commitValue) / currentTokenPrice
			: (Number(commitValue) / (Number(commitValue) + Number(totalCommitments))) * amountForSale
		: 0;

	const claimToken = async () => {
		const data = lockedDataClaimable?.map((item: any) => {
			console.log(dataAuction.data.tokenInfo.addr, item[3], item[4], item[0]);
			return {
				target: REDEEM_TOKEN_ADDRESS[chainId],
				callData: redeemContract?.interface.encodeFunctionData("withdrawTokens", [dataAuction.data.tokenInfo.addr, id, item[3], item[4], item[0], account]),
			};
		});
		actions.updateTransactionPending(true);
		const gasLimit = await multicallWeb3?.methods.aggregate(data).estimateGas({ from: account });
		await multicallWeb3?.methods.aggregate(data).send({ from: account, gasLimit: gasLimit });
		actions.updateTransactionPending(false);
		setUpdatelockedDataClaimable(!updatelockedDataClaimable);
	};

	const onChangeCommitValue = async (value: string) => {
		if (inputRegex.test(escapeRegExp(value))) {
			setCommitValue(value);
		}
	};

	useEffect(() => {
		const tick = () => {
			prevSeccond((second) => second + 1);
		};
		t.current = setInterval(() => tick(), 1000);
	}, []);

	useEffect(() => {
		const getLockedItemIdsOfUser = async () => {
			return await redeemContract?.getLockedItemIdsOfUser(account, dataAuction.data.tokenInfo.addr, id);
		};
		if (account && redeemContract && finalize && !hasAdminRole) {
			getLockedItemIdsOfUser()
				.then(async (data) => {
					return data.map((id: any) => {
						return {
							target: REDEEM_TOKEN_ADDRESS[chainId],
							callData: redeemContract?.interface.encodeFunctionData("getLockedItemAtId", [id]),
						};
					});
				})
				.then(async (data) => {
					return await multicall?.aggregate(data);
				})
				.then((data) => {
					return data[1].map((item: any) => {
						return redeemContract?.interface.decodeFunctionResult("getLockedItemAtId", item);
					});
				})
				.then(async (res) => {
					const noWithdrawItems = res.filter((item: any) => Number(ethers.utils.formatUnits(item[0], 18)) != 0 && Number(ethers.utils.formatUnits(item[1], 0)) <= timeNow / 1000);
					const withdrawedItems = res.filter((item: any) => Number(ethers.utils.formatUnits(item[0], 18)) == 0);
					setLockedDataClaimable(noWithdrawItems);
					if (totalTokensClaimable) {
						const tokensClaimableFiltered = idTemplate === 1 ? (totalTokensClaimable * withdrawedItems.length) / 4 : (totalTokensClaimable * withdrawedItems.length) / 2;
						setAmountTokensClaimed(tokensClaimableFiltered);
					}
				})
				.catch((err) => {
					console.log("get locked data failed: ", err);
				});
		}
	}, [
		account,
		redeemContract,
		updateWhenClaimableTime,
		finalize,
		hasAdminRole,
		updatelockedDataClaimable,
		idTemplate,
		updateAuctionData,
		dataAuction.data.tokenInfo.addr,
		id,
		chainId,
		multicall,
		totalTokensClaimable,
		timeNow,
	]);

	return (
		<>
			<InnerCard>
				<Text size="1rem">
					Amount for sale:{" "}
					<span style={{ fontWeight: "bold" }}>
						{amountForSale?.toLocaleString()} {dataAuction.data.tokenInfo.symbol}
					</span>
				</Text>
				{idTemplate === 1 || idTemplate === 3 ? (
					<Text size="1rem">
						Remaining amount:{" "}
						<span style={{ fontWeight: "bold" }}>
							{remainingAmount.toLocaleString()} {dataAuction.data.tokenInfo.symbol}
						</span>
					</Text>
				) : (
					<></>
				)}
				<Text size="1rem">
					Amount raised:{" "}
					<span style={{ fontWeight: "bold" }}>
						{amountRaised ? parseFloat(amountRaised) : 0} {dataAuction.data?.paymentCurrencyInfo.symbol}
					</span>
				</Text>
				{idTemplate === 2 || idTemplate === 1 || idTemplate === 3 ? (
					<>
						{idTemplate === 2 ? (
							<Text size="1rem">
								Min raise:{" "}
								<span style={{ fontWeight: "bold" }}>
									{minRaise ? parseFloat(minRaise) : 0} {dataAuction.data?.paymentCurrencyInfo.symbol}
								</span>
							</Text>
						) : (
							<></>
						)}
					</>
				) : (
					<>
						{idTemplate !== 2 ? (
							<Text size="1rem">
								Reserve price:{" "}
								<span style={{ fontWeight: "bold" }}>
									{!isNaN(reservePrice) ? parseFloat(reservePrice.toFixed(2)) : 0} {dataAuction.data?.paymentCurrencyInfo.symbol}
								</span>
							</Text>
						) : (
							<></>
						)}
						<Text size="1rem">
							Aution price:{" "}
							<span style={{ fontWeight: "bold" }}>
								{!isNaN(auctionPrice) ? parseFloat(auctionPrice.toFixed(2)) : 0} {dataAuction.data?.paymentCurrencyInfo.symbol}
							</span>
						</Text>
						<Text size="1rem">
							Starting price:{" "}
							<span style={{ fontWeight: "bold" }}>
								{!isNaN(startPrice) ? parseFloat(startPrice.toFixed(2)) : 0} {dataAuction.data?.paymentCurrencyInfo.symbol}
							</span>
						</Text>
						{idTemplate === 2 ? (
							<>
								<Text size="1rem">
									End price:{" "}
									<span style={{ fontWeight: "bold" }}>
										{!isNaN(reservePrice) ? parseFloat(Number(reservePrice).toFixed(4)) : 0} {dataAuction.data?.paymentCurrencyInfo.symbol}
									</span>
								</Text>
								<Text size="1rem">
									Current price of auction:{" "}
									<span style={{ fontWeight: "bold" }}>
										{!isNaN(currentPrice) ? parseFloat(currentPrice.toFixed(9)) : 0} {dataAuction.data?.paymentCurrencyInfo.symbol}
									</span>
								</Text>
							</>
						) : (
							<></>
						)}
					</>
				)}
				{!hasAdminRole && auctionEnded && auctionSuccess ? (
					<>
						<Text size="1rem">
							Amount of tokens claimed: <span style={{ fontWeight: "bold" }}>{amountTokensClaimed}</span>
						</Text>
						<Text className="timeCount" size="1rem">
							The next time to claim : <span style={{ fontWeight: "bold" }}>{`${nextTimeClaim.dd}d : ${nextTimeClaim.hh}h : ${nextTimeClaim.mm}m : ${nextTimeClaim.ss}s`}</span>
						</Text>
					</>
				) : (
					<></>
				)}
				<Column>
					{auctionCompleted && !hasAdminRole && auctionSuccess ? (
						<WrapperCircle>
							{tokensClaimable === 0 ? <CountDownCircleDetail /> : <CountDownCircleDetail startTime={timeNow / 1000} endTime={nextTimeUnix} />}
							<Text size="0.875rem" style={{ textAlign: "center" }}>
								Tokens claimable: <br />
								{tokensClaimable} {dataAuction.data.tokenInfo.symbol}{" "}
							</Text>
						</WrapperCircle>
					) : (
						<WrapperCircle>
							{auctionIsUpcoming ? (
								<CountDownCircleDetail coin={logoPaymentCurrency} startTime={timeNow / 1000} endTime={startTime} />
							) : (
								<CountDownCircleDetail coin={logoPaymentCurrency} startTime={startTime} endTime={endTime} />
							)}
							<Text size="1rem" style={{ textAlign: "center" }}>
								{idTemplate === 2 ? "Current" : ""} Token price: <br /> {!isNaN(currentTokenPrice) ? parseFloat(currentTokenPrice.toFixed(9)) : 0} {dataAuction.data?.paymentCurrencyInfo.symbol} /{" "}
								{dataAuction.data?.tokenInfo.symbol}
							</Text>
						</WrapperCircle>
					)}
				</Column>
				{dataAuction && auctionHasNoCompleted ? (
					hasAdminRole ? (
						<></>
					) : (
						<>
							{/* <Row>
                                <Text size="1rem">AMOUNT</Text>
                                <Text size="1rem">&nbsp;BALANCE</Text>
                            </Row> */}

							<Text size="1rem">Commitment</Text>
							<SliderWrapper className="slider">
								<Slider min={0} max={Number(remainingAmount)} value={valueRange} onChange={handleChange} />
							</SliderWrapper>
							<CommitBar>
								<input
									onChange={(e: any) => {
										onChangeCommitValue(e.target.value);
									}}
									type="text"
									pattern="^[0-9]*[.,]?[0-9]*$"
									inputMode="decimal"
									autoComplete="off"
									placeholder={"0.0 " + dataAuction.data?.paymentCurrencyInfo.symbol}
									value={commitValue}
								/>

								{!commitValue || commitValue === 0 || state.transactionPending || invalidCommitValue || commitValue > remainingAmount ? (
									<CommitButton disabled>{!approveStatus ? "Commit" : "Approve"}</CommitButton>
								) : (
									<CommitButton
										onClick={() => {
											!approveStatus ? commit() : callApprove();
										}}
									>
										{!approveStatus ? "Commit" : "Approve"}
									</CommitButton>
								)}
							</CommitBar>
							{idTemplate === 1 || idTemplate === 3 ? (
								<Text>
									Total tokens received: {parseFloat(totalTokenReceived.toFixed(4)).toLocaleString()} {dataAuction.data.tokenInfo.symbol}
								</Text>
							) : (
								<Text>
									Maximum tokens received: {parseFloat(totalTokenReceived.toFixed(4)).toLocaleString()} {dataAuction.data.tokenInfo.symbol}
								</Text>
							)}
							{invalidCommitValue ? <TextErr>{invalidCommitValue}</TextErr> : <></>}
						</>
					)
				) : auctionCompleted ? (
					hasAdminRole ? (
						!finalize && !state.transactionPending ? (
							<WrapperAction>
								<ButtonAction onClick={() => handleConfirmFinalizeAuction()}>Finalize</ButtonAction>
							</WrapperAction>
						) : (
							<WrapperAction>
								<ButtonAction disabled>Finalize</ButtonAction>
							</WrapperAction>
						)
					) : !finalize || (hasLockedToken && tokensClaimable === 0) || (!auctionSuccess && hasLockedToken) ? (
						<WrapperAction>
							<ButtonAction disabled>
								{!hasLockedToken ? `Wait to lock your ${dataAuction.data.tokenInfo.symbol}` : `Claim ${dataAuction.data.tokenInfo.symbol} (${dataAuction.data.tokenInfo.symbol})`}
							</ButtonAction>
						</WrapperAction>
					) : (
						<WrapperAction>
							{finalize && !state.transactionPending ? (
								auctionSuccess ? (
									<ButtonAction
										onClick={() => {
											!hasLockedToken ? handleClaimTokenUser() : claimToken();
										}}
									>
										{!hasLockedToken ? `Confirm to lock your ${dataAuction.data.tokenInfo.symbol}` : `Claim ${dataAuction.data.tokenInfo.name} (${dataAuction.data.tokenInfo.symbol})`}
									</ButtonAction>
								) : (
									<ButtonAction onClick={handleClaimTokenUser}>
										Claim {dataAuction.data.tokenInfo.name} ({dataAuction.data.tokenInfo.symbol})
									</ButtonAction>
								)
							) : auctionSuccess ? (
								<ButtonAction disabled>
									Claim {dataAuction.data.tokenInfo.name} ({dataAuction.data.tokenInfo.symbol})
								</ButtonAction>
							) : (
								<ButtonAction disabled>
									Claim {dataAuction.data.tokenInfo.name} ({dataAuction.data.tokenInfo.symbol})
								</ButtonAction>
							)}
						</WrapperAction>
					)
				) : (
					<></>
				)}
			</InnerCard>
		</>
	);
};

export default TabCommit;
