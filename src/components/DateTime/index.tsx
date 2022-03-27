import React from "react";
import styled from "styled-components";
import { fields } from "../../pages/NewSale/NewAuction";

const DateTime = ({ setTime, getTime }: { setTime: any; getTime: any }) => {
    return (
        <>
            <Text size="2em">Auction Start &amp; End*</Text>
            <WrapperTime>
                <StartTime>
                    <Hours
                        type="date"
                        value={getTime(fields.startDate)}
                        onChange={(e) => {
                            setTime(e.target.value, fields.startDate);
                        }}
                    />
                    <Splice />
                    <Time
                        type="time"
                        value={getTime(fields.startTime)}
                        onChange={(e) => {
                            setTime(e.target.value, fields.startTime);
                        }}
                    />
                </StartTime>
                <StartTime>
                    <Hours
                        type="date"
                        value={getTime(fields.endDate)}
                        onChange={(e) => {
                            setTime(e.target.value, fields.endDate);
                        }}
                    />
                    <Splice />
                    <Time
                        type="time"
                        value={getTime(fields.endTime)}
                        onChange={(e) => {
                            setTime(e.target.value, fields.endTime);
                        }}
                    />
                </StartTime>
            </WrapperTime>
        </>
    );
};

const Text = styled.p<{ size?: string }>`
    color: white;
    font-size: ${({ size }) => (size ? size : "0.875rem")};
    margin: 10px 0 0;
`;
const Input = styled.input<{ err?: boolean }>`
    border: none;
    padding: 10px;
    color: white;
    outline: none;
    background: transparent;

    &::placeholder {
        color: white;
    }
`;

const WrapperTime = styled.div`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 20px;
    margin: 1rem 0;
`;

const StartTime = styled.div`
    width: 100%;
    max-width: 300px;
    display: flex;
    border: 2px solid #fff;
    border-radius: 12px;

    @media screen and (min-width: 992px) {
        max-width: 288px;
    }
    @media screen and (max-width: 991px) {
        max-width: 100%;
    }
    @media screen and (max-width: 768px) {
        max-width: 48%;
    }
    @media screen and (max-width: 576px) {
        max-width: 100%;
    }
`;

const Splice = styled.div`
    height: 100%;
    width: 2px;
    background: #fff;
`;

const Hours = styled(Input)`
    text-align: center;
    cursor: pointer;
    width: 100%;
    max-width: 290px;

    @media screen and (max-width: 576px) {
        max-width: 80%;
    }

    @media screen and (max-width: 991px) {
        max-width: 80%;
    }
`;

const Time = styled(Input)`
    text-align: center;
    cursor: pointer;
    width: 60%;
    max-width: 290px;
`;

export default DateTime;
