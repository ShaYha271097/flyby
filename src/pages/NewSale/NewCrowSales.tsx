import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";
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
import Flybylogo from "../FlybyLogo";
import {
    Wrapper,
    Title,
    ButtonPrevious,
    ButtonNext,
    RowBetween,
} from "./styled";

import { paymentTokenCurrency } from "../../constants";
import Step1 from "./Step_Crowsale/step_1";
import Step2 from "./Step_Crowsale/step_2";
import Step3 from "./Step_Crowsale/step_3";
import Review from "./Step_Crowsale/review";

export enum fields {
    startDate = "startDate",
    startTime = "startTime",
    endDate = "endDate",
    endTime = "endTime",
}

const now = new Date();

const NewCrowSale = () => {
    const [step, setStep] = useState(1);
    const [auctionType, setAuctionType] = useState("crowdsale");
    const { account }: any = useActiveWeb3React();
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(0);
    const [allowance, setAllowance] = useState(0);
    const [addressErr, setAddressErr] = useState("");
    const [amountErr, setAmountErr] = useState("");
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [paymentCurrency, setPaymentCurrency] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [rate, setRate]: any = useState("");
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
    const [
        tokensPaymentInTokensSale,
        setTokensPaymentInTokensSale,
    ]: any = useState("");

    const history = useHistory();

    const isToken = useIsToken();
    const isTokenDecimalsEighteen = useIsTokenDecimalsEighteen();
    const approve = useApproveToken();
    const { createCrowSale } = useCreateAuction();
    const { getBalance, getAllowance, getName, getSymbol } = useGetToken(
        address,
        account
    );
    const { chainId }: any = useActiveWeb3React();
    const getDecimalPaymentCurrency = useGetToken(paymentCurrency, account)
        .getDecimals;

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

    const handleSetRate = async (value: string) => {
        if (value === "" || inputRegex.test(escapeRegExp(value))) {
            setRate(value);
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
        if (
            step === 2 &&
            (!address || !amount || allowance === 0 || Number(amount) === 0)
        ) {
            valid = true;
        }
        if (step === 3) {
            if (
                auctionType === "crowdsale" &&
                (!paymentCurrency ||
                    !minPrice ||
                    !rate ||
                    Number(minPrice) > Number(amount) * Number(rate))
            ) {
                valid = true;
                console.log("aa");
            }

            const st = new Date(`${startDate} ${startTime}`).getTime() / 1000;
            const et = new Date(`${endDate} ${endTime}`).getTime() / 1000;

            if (Number(minPrice) > Number(amount) * Number(rate)) {
                setTimeValid("Amount of FBS and ");
            }

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
        console.log(
            Number(minPrice),
            Number(amount) * Number(rate),
            Number(minPrice) > Number(amount) * Number(rate)
        );
        return (
            <>
                <ButtonNext
                    disabled={valid}
                    onClick={() => {
                        if (step < 4) setStep(step + 1);
                        if (step === 4 && valid === false)
                            handleCreateAuction();
                    }}
                >
                    {step === 4 ? "DEPLOY" : step === 3 ? "REVIEW" : "NEXT"}
                </ButtonNext>
            </>
        );
    };

    const handleCreateAuction = async () => {
        if (auctionType === "crowdsale") {
            const amountNumber = toHexBigNumber(amount, 18);
            const amountHex = ethers.BigNumber.from(
                amountNumber.toString()
            ).toHexString();

            const decimalPaymentCurrency =
                paymentCurrency === paymentTokenCurrency.NATIVE.address[chainId]
                    ? 18
                    : await getDecimalPaymentCurrency();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const minPriceNumber = toHexBigNumber(
                minPrice,
                decimalPaymentCurrency
            );
            const minPriceHex = ethers.utils.parseUnits(
                rate,
                decimalPaymentCurrency
            );

            const rateNumber = toHexBigNumber(rate, 18);
            const rateHex = ethers.BigNumber.from(
                rateNumber.toString()
            ).toHexString();

            const response = await createCrowSale(1, address, amountHex, [
                Flyby[chainId],
                address,
                paymentCurrency,
                amountHex,
                new Date(`${startDate} ${startTime}`).getTime() / 1000,
                new Date(`${endDate} ${endTime}`).getTime() / 1000,
                rateHex,
                minPriceHex,
                account,
                ADDRESS_NULL,
                account,
            ]);
            if (response) history.push(`/auctions/${response}`);
            return response;
        }
        return;
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
            <Flybylogo />
            {step !== 4 ? (
                <Title>{state.language?.CREATE_CROW_SALE}</Title>
            ) : (
                <Title>{state.language?.CONFIRM_CROW_SALE}</Title>
            )}
            <StepCircle percent={step} />
            {step === 1 ? (
                <>
                    <Step1 handleSelectAuctionType={handleSelectAuctionType} />
                </>
            ) : step === 2 ? (
                <>
                    <Step2
                        addressErr={addressErr}
                        address={address}
                        handleSelectToken={handleSelectToken}
                        amountErr={amountErr}
                        amount={amount}
                        onInputAmount={onInputAmount}
                        allowance={allowance}
                        symbol={symbol}
                        name={name}
                        balance={balance}
                        handleApprove={handleApprove}
                    />
                </>
            ) : step === 3 ? (
                <>
                    <Step3
                        paymentCurrency={paymentCurrency}
                        minPrice={minPrice}
                        handleChangeMinPrice={handleChangeMinPrice}
                        setPaymentCurrency={setPaymentCurrency}
                        rate={rate}
                        handleSetTime={handleSetTime}
                        handleGetTime={handleGetTime}
                        timeValid={timeValid}
                        setRate={handleSetRate}
                        tokensPaymentInTokensSale={tokensPaymentInTokensSale}
                        setTokensPaymentInTokensSale={
                            setTokensPaymentInTokensSale
                        }
                        symbol={symbol}
                        amount={amount}
                    />
                </>
            ) : (
                <>
                    <Review
                        name={name}
                        address={address}
                        symbol={symbol}
                        amount={amount}
                        rate={rate}
                        paymentCurrency={paymentCurrency}
                        account={account}
                        minPrice={minPrice}
                        startDate={startDate}
                        startTime={startTime}
                        endDate={endDate}
                        endTime={endTime}
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
                    PREVIOUS
                </ButtonPrevious>
                <ButtonClick />
            </RowBetween>
        </Wrapper>
    );
};

export default NewCrowSale;
