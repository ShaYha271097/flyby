import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { useHistory } from "react-router-dom";
import { ethers } from "ethers";
import { isAddress } from "@ethersproject/address";
import { MaxUint256 } from "@ethersproject/constants";

import { useGetToken } from "../../hooks";
import { useActiveWeb3React } from "../../hooks";
import { MARKET_ADDRESS as Flyby } from "../../constants";
import { useIsToken, useIsTokenDecimalsEighteen } from "../../hooks";
import { useApproveToken } from "../../hooks/useAppoveToken";
import { escapeRegExp } from "../../utils";
import { useCreateAuction } from "../../hooks/useCreateAuction";
import { useAuctionState } from "../../store";
import { toHexBigNumber } from "../../utils";
import { ADDRESS_NULL } from "../../constants";
import { inputRegex } from "../../utils";
import StepCircle from "../../components/StepCircle";
import { paymentTokenCurrency } from "../../constants";
import FlybyLogo from "../FlybyLogo";
import {
    Wrapper,
    Title,
    ButtonPrevious,
    ButtonNext,
    RowBetween,
} from "./styled";

import Step1 from "./Step_Auction/step_1";
import Step2 from "./Step_Auction/step_2";
import Step3 from "./Step_Auction/step_3";
import Review from "./Step_Auction/review";

export enum fields {
    startDate = "startDate",
    startTime = "startTime",
    endDate = "endDate",
    endTime = "endTime",
}

const now = new Date();

const NewSale = () => {
    const [step, setStep] = useState(1);
    const { chainId }: any = useActiveWeb3React();
    const [auctionType, setAuctionType] = useState("");
    const { account }: any = useActiveWeb3React();
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(0);
    const [allowance, setAllowance] = useState(0);
    const [addressErr, setAddressErr] = useState("");
    const [amountErr, setAmountErr] = useState("");
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [paymentCurrency, setPaymentCurrency]: any = useState({
        address: {},
    });
    const [minPrice, setMinPrice] = useState("");
    const [startingPrice, setStartingPrice] = useState("");
    const [endedPrice, setEndedPrice] = useState("");
    const [startDate, setStartDate] = useState(
        moment.utc(now.getTime() + 172800000).format("YYYY-MM-DD")
    );
    const [startTime, setStartTime] = useState("00:00:00");
    const [endDate, setEndDate] = useState(
        moment.utc(now.getTime() + 777600000).format("YYYY-MM-DD")
    );
    const [endTime, setEndTime] = useState("00:00:00");
    const [timeValid, setTimeValid] = useState("");
    const [state, actions] = useAuctionState();
    const history = useHistory();

    const isToken = useIsToken();
    const isTokenDecimalsEighteen = useIsTokenDecimalsEighteen();
    const approve = useApproveToken();
    const { createAuctionBatch, createAuctionDutch } = useCreateAuction();
    const { getBalance, getAllowance, getName, getSymbol } = useGetToken(
        address,
        account
    );
    const getDecimalPaymentCurrency = useGetToken(
        paymentCurrency.address[chainId],
        account
    ).getDecimals;

    const handleSelectAuctionType = (type: string) => {
        setAuctionType(type);
    };

    const onInputAmount = (value: string) => {
        if (value === "" || inputRegex.test(escapeRegExp(value))) {
            if (Number(value) <= balance) {
                setAmount(value);
                setAmountErr("");
            } else setAmountErr("Insufficient Balance");
        } else setAmountErr("Input number");
    };

    const handleSelectToken = async (address: string) => {
        if (isAddress(address)) {
            const token = await isToken(address);
            const tokenDecimalEighteen = await isTokenDecimalsEighteen(address);
            if (token) {
                if (tokenDecimalEighteen) {
                    setAddress(address);
                    setAddressErr("");
                } else setAddressErr("Token is not decimals 18");
            } else setAddressErr("Token not found");
        } else setAddressErr("Invalid address");
    };

    const handleApprove = async () => {
        const call = await approve(address, Flyby[chainId], MaxUint256);
        await actions.updateTransactionPending(true);
        await call.wait();
        actions.updateTransactionPending(false);
        getAllowance(Flyby[chainId]).then((res: any) => {
            setAllowance(res);
        });
    };

    const handleChangeMinPrice = async (value: string) => {
        if (value === "" || inputRegex.test(escapeRegExp(value))) {
            setMinPrice(value);
        }
    };

    const handleChangeStartingPrice = async (value: string) => {
        if (value === "" || inputRegex.test(escapeRegExp(value))) {
            setStartingPrice(value);
        }
    };

    const handleChangeEndedPrice = async (value: string) => {
        if (value === "" || inputRegex.test(escapeRegExp(value))) {
            setEndedPrice(value);
        }
    };

    const handleSetTime = (value: string, field: any) => {
        if (field === fields.startDate) {
            setStartDate(value);
        }
        if (field === fields.startTime) {
            setStartTime(value);
        }
        if (field === fields.endDate) {
            setEndDate(value);
        }
        if (field === fields.endTime) {
            setEndTime(value);
        }
    };

    const handleGetTime = (field: any) => {
        if (field === fields.startDate) {
            return startDate;
        }
        if (field === fields.startTime) {
            return startTime;
        }
        if (field === fields.endDate) {
            return endDate;
        }
        if (field === fields.endTime) {
            return endTime;
        }
        return;
    };

    const ButtonClick = () => {
        let valid = false;
        if (step === 1 && !auctionType) {
            valid = true;
        }
        if (step === 2 && (!address || !amount || allowance === 0)) {
            valid = true;
        }
        if (step === 3) {
            if (
                auctionType === "dutch" &&
                (!paymentCurrency ||
                    !startingPrice ||
                    !endedPrice ||
                    Number(startingPrice) < Number(endedPrice) ||
                    Number(endedPrice) <= 0)
            ) {
                valid = true;
            }
            if (auctionType === "batch" && (!paymentCurrency || !minPrice)) {
                valid = true;
            }

            const st = new Date(`${startDate} ${startTime}`).getTime() / 1000;
            const et = new Date(`${endDate} ${endTime}`).getTime() / 1000;

            if (
                Number(st) >= Number(et) ||
                Number(st) <= Number(now.getTime()) / 1000
            ) {
                setTimeValid("Please check your setting time");
                valid = true;
            } else {
                setTimeValid("");
            }
        }
        if (state.transactionPending) {
            valid = true;
        }
        return (
            <>
                <ButtonNext
                    disabled={valid}
                    onClick={() => {
                        if (step < 4) setStep(step + 1);
                        if (step === 4) handleCreateAuction();
                    }}
                >
                    {step === 4 ? "DEPLOY" : step === 3 ? "REVIEW" : "NEXT"}
                </ButtonNext>
            </>
        );
    };

    const handleCreateAuction = async () => {
        if (auctionType === "batch") {
            const amountNumber = toHexBigNumber(amount, 18);
            const decimalPaymentCurrency =
                paymentCurrency.address[chainId] ===
                paymentTokenCurrency.NATIVE.address[chainId]
                    ? 18
                    : await getDecimalPaymentCurrency();
            const minPriceNumber = toHexBigNumber(
                minPrice,
                decimalPaymentCurrency
            );
            const amountHex = ethers.BigNumber.from(
                amountNumber.toString()
            ).toHexString();
            const minPriceHex = ethers.BigNumber.from(
                minPriceNumber.toString()
            ).toHexString();
            const response = await createAuctionBatch(
                2,
                address,
                amountHex,
                // account,// ,fundWallet
                [
                    Flyby[chainId],
                    address,
                    amountHex,
                    new Date(`${startDate} ${startTime}`).getTime() / 1000,
                    new Date(`${endDate} ${endTime}`).getTime() / 1000,
                    paymentCurrency.address[chainId],
                    minPriceHex,
                    account,
                    ADDRESS_NULL,
                    account,
                ]
            );
            if (response) history.push(`/auctions/${response}`);
            return response;
        } else {
            const amountNumber = toHexBigNumber(amount, 18);
            const decimalPaymentCurrency =
                paymentCurrency.address[chainId] ===
                paymentTokenCurrency.NATIVE.address[chainId]
                    ? 18
                    : await getDecimalPaymentCurrency();
            const startingPriceNumber = toHexBigNumber(
                startingPrice,
                decimalPaymentCurrency
            );
            const endedPriceNumber = toHexBigNumber(
                endedPrice,
                decimalPaymentCurrency
            );
            const amountHex = ethers.BigNumber.from(
                amountNumber.toString()
            ).toHexString();
            const startingPriceHex = ethers.BigNumber.from(
                startingPriceNumber.toString()
            ).toHexString();
            const endedPriceHex = ethers.BigNumber.from(
                endedPriceNumber.toString()
            ).toHexString();
            const response = await createAuctionDutch(
                3,
                address,
                amountHex,
                // account,// ,fundWallet
                [
                    Flyby[chainId],
                    address,
                    amountHex,
                    new Date(`${startDate} ${startTime}`).getTime() / 1000,
                    new Date(`${endDate} ${endTime}`).getTime() / 1000,
                    paymentCurrency.address[chainId],
                    startingPriceHex,
                    endedPriceHex,
                    account,
                    ADDRESS_NULL,
                    account,
                ]
            );
            if (response) history.push(`/auctions/${response}`);
            return response;
        }
    };

    useEffect(() => {
        if (address) {
            getBalance().then((res: any) => {
                setBalance(res);
            });
            getAllowance(Flyby[chainId]).then((res: any) => {
                setAllowance(res);
            });
            getName().then((res: any) => {
                setName(res);
            });
            getSymbol().then((res: any) => {
                setSymbol(res);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, getAllowance, getBalance, getName, getSymbol, allowance]);

    return (
        <Wrapper>
            <FlybyLogo />
            {step !== 4 ? (
                <Title>{state.language?.CREATE_AUCTION}</Title>
            ) : (
                <Title>{state.language?.CONFIRM_YOUR_AUCTION_SETUP}</Title>
            )}
            <StepCircle percent={step} />
            {step === 1 ? (
                <>
                    <Step1
                        handleSelectTypeAuction={handleSelectAuctionType}
                        auctionType={auctionType}
                    />
                </>
            ) : step === 2 ? (
                <>
                    <Step2
                        addressErr={addressErr}
                        amountErr={amountErr}
                        amount={amount}
                        onInputAmount={onInputAmount}
                        allowance={allowance}
                        address={address}
                        handleApprove={handleApprove}
                        handleSelectToken={handleSelectToken}
                        symbol={symbol}
                        balance={balance}
                        name={name}
                    />
                </>
            ) : step === 3 ? (
                <>
                    <Step3
                        paymentCurrency={paymentCurrency}
                        setPaymentCurrency={setPaymentCurrency}
                        auctionType={auctionType}
                        minPrice={minPrice}
                        handleChangeMinPrice={handleChangeMinPrice}
                        startingPrice={startingPrice}
                        handleChangeStartingPrice={handleChangeStartingPrice}
                        endedPrice={endedPrice}
                        handleChangeEndedPrice={handleChangeEndedPrice}
                        handleSetTime={handleSetTime}
                        handleGetTime={handleGetTime}
                        timeValid={timeValid}
                    />
                </>
            ) : (
                <>
                    <Review
                        auctionType={auctionType}
                        address={address}
                        symbol={symbol}
                        amount={amount}
                        paymentCurrency={paymentCurrency}
                        account={account}
                        startingPrice={startingPrice}
                        endedPrice={endedPrice}
                        minPrice={minPrice}
                        startDate={startDate}
                        endDate={endDate}
                        startTime={startTime}
                        endTime={endTime}
                        name={name}
                    />
                </>
            )}

            <RowBetween className="button-group">
                <ButtonPrevious
                    disabled={step === 1 ? true : false}
                    onClick={() => {
                        if (step > 1) setStep(step - 1);
                    }}
                >
                    {state.language?.PREVIOUS.toUpperCase()}
                </ButtonPrevious>
                <ButtonClick />
            </RowBetween>
        </Wrapper>
    );
};

export default NewSale;
