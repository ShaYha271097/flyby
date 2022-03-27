/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import RocketsImg from "../../assets/images/rockets.png";
import SpaceIcon from "../../assets/images/icon4Home/SpaceIcon.png";
import SpaceLegend from "../../assets/images/icon4Home/SpaceLegend.png";
import Startup from "../../assets/images/icon4Home/Startup.png";
import coin1 from "../../assets/images/coin/coin1.png";
import coin2 from "../../assets/images/coin/coin2.png";
import coin3 from "../../assets/images/coin/coin3.png";
import coin4 from "../../assets/images/coin/coin4.png";

import {
    Wrapper,
    Rockets,
    Line1,
    ImgLine1,
    TxtLine1,
    TxtLine0,
    FlybyImg,
    TxtIconImg,
    TxtLive,
    IconMainnet,
    IconImg,
    Empty,
    IconOutside,
    LegendTxtInsdie,
} from "./styled";
import FlybyLogo from "../FlybyLogo";
import { NavLink } from "react-router-dom";

const Home = () => {
    const [, setSeconds] = useState(0);
    const t: any = useRef();



    useEffect(() => {
        function tick() {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }
        t.current = setInterval(() => tick(), 1000);
    }, []);

    return (
        <Wrapper>
            <FlybyLogo />
            <FlybyImg>
                <Line1>
                    <ImgLine1>
                        <img
                            className="LegendImg"
                            src={SpaceLegend}
                            alt="SpaceLegend"
                        />
                        <TxtLive>
                            <NavLink to="/live" className="HoverHome">Live</NavLink>
                        </TxtLive>
                        <TxtLine0 to="/live" className="Legend">
                            <LegendTxtInsdie>
                                <p className="HoverHome">forbitspace FBS</p>
                            </LegendTxtInsdie>
                        </TxtLine0>
                    </ImgLine1>
                    <ImgLine1>
                        <TxtIconImg>Space Launchpad</TxtIconImg>
                        <TxtIconImg>Multi Chain</TxtIconImg>
                        <TxtIconImg className="LastTxtIcon">
                            Attractive Solution
                        </TxtIconImg>
                        <IconImg>
                            <img
                                className="SpaceIcon"
                                src={SpaceIcon}
                                alt="SpaceIcon"
                            />
                            <IconOutside>
                                <IconMainnet>
                                    <img className="coin1" src={coin1} alt="" />
                                    <img className="coin2" src={coin2} alt="" />
                                    <img className="coin3" src={coin3} alt="" />
                                    <img className="coin4" src={coin4} alt="" />
                                </IconMainnet>
                            </IconOutside>
                        </IconImg>
                        <Empty></Empty>
                    </ImgLine1>
                    <ImgLine1>
                        <img
                            className="StartupImg"
                            src={Startup}
                            alt="SpaceStartup"
                        />
                        <TxtLine1 className="TxtStartup">
                            <LegendTxtInsdie>
                                Preparing to launch
                            </LegendTxtInsdie>
                        </TxtLine1>
                    </ImgLine1>
                </Line1>
                <Rockets>
                    <img src={RocketsImg} alt="rockets" />
                </Rockets>
            </FlybyImg>
        </Wrapper>
    );
};

export default Home;
