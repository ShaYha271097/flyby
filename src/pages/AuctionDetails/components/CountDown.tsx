/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";

import { getTimeCountDown } from "../../../utils/getTimeCountDown";
import moment from "moment-timezone";

const CountDown = ({ dataAuction }: { dataAuction: any }) => {
    const [timeCoundDown, setTimeCoundDown]: any = useState();
    const [, setSeconds] = useState(0);
    const t: any = useRef();

    useEffect(() => {
        if (dataAuction) {
            const now = new Date().getTime();
            if (now < Number(dataAuction.data.startTime) * 1000) {
                const tick = () => {
                    const live = new Date(
                        Number(dataAuction.data.startTime) * 1000
                    );
                    const time = moment
                        .utc(live, "YYYY-MM-DD HH:mm:ss")
                        .format("YYYY-MM-DD HH:mm:ss");
                    const timeCound = getTimeCountDown(time);
                    setTimeCoundDown(timeCound);
                    setSeconds((prevSeconds) => prevSeconds + 1);
                };
                t.current = setInterval(() => tick(), 1000);
            } else if (now > Number(dataAuction.data.endTime) * 1000) {
            } else {
                const tick = () => {
                    const live = new Date(
                        Number(dataAuction.data.endTime) * 1000
                    );
                    const time = moment
                        .utc(live, "YYYY-MM-DD HH:mm:ss")
                        .format("YYYY-MM-DD HH:mm:ss");
                    const timeCound = getTimeCountDown(time);
                    setTimeCoundDown(timeCound);
                    setSeconds((prevSeconds) => prevSeconds + 1);
                };
                t.current = setInterval(() => tick(), 1000);
            }
        }
    }, []);

    if (
        timeCoundDown &&
        Number(timeCoundDown.dd) === 0 &&
        Number(timeCoundDown.hh) === 0 &&
        Number(timeCoundDown.mm) === 0 &&
        Number(timeCoundDown.ss) === 0
    ) {
        window.location.reload();
    }

    return (
        <>
            {!timeCoundDown ? (
                <>
                    <div>
                        <span>00</span>
                        <span>Days</span>
                    </div>
                    <span>:</span>
                    <div>
                        <span>00</span>
                        <span>Hrs</span>
                    </div>
                    <span>:</span>
                    <div>
                        <span>00</span>
                        <span>Mins</span>
                    </div>
                    <span>:</span>
                    <div>
                        <span>00</span>
                        <span>Secs</span>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <span>
                            {timeCoundDown.dd <= 0
                                ? "00"
                                : timeCoundDown.dd < 10
                                ? "0" + timeCoundDown.dd
                                : timeCoundDown.dd}
                        </span>
                        <span>Days</span>
                    </div>
                    <span>:</span>
                    <div>
                        <span>{timeCoundDown.hh}</span>
                        <span>Hrs</span>
                    </div>
                    <span>:</span>
                    <div>
                        <span>{timeCoundDown.mm}</span>
                        <span>Mins</span>
                    </div>
                    <span>:</span>
                    <div>
                        <span>{timeCoundDown.ss}</span>
                        <span>Secs</span>
                    </div>
                </>
            )}
        </>
    );
};

export default CountDown;
