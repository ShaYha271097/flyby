import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../../assets/base64/logo_dark.json";
import RocketFlyby from "../../assets/images/flybyRocket.png";
// import { LazyLoadImage } from 'react-lazy-load-image-component'
// import IndexedDb from '../../utils/indexDB'

const LogoComponent = () => {
    const [image, setImage]: any = useState();

    const configIndexedData = async () => {
        const logo = await localStorage.getItem("flyby_logo");
        if (logo) {
            setImage(logo);
        } else {
            localStorage.setItem("flyby_logo", LogoImg.data);
            setImage(LogoImg.data);
        }
    };

    useEffect(() => {
        configIndexedData();
    }, []);

    return (
        <>
            <Wrapper to="/home">
                <Logo>
                    <Img className="logo" src={image} alt="logo" />
                    <Img className="Rocket" src={RocketFlyby} alt="logo" />
                </Logo>
            </Wrapper>
        </>
    );
};

export default LogoComponent;

const Wrapper = styled(NavLink)`
    display: flex;
    gap: 5px;
`;

const Logo = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    .logo {
        width: 70%;
    }
    .Rocket {
        width: 30%;
        margin-left: -23px;
    }
    @media (max-width: 900px) {
        .Rocket {
            margin-left: -9px;
        }
    }
`;

const Img = styled.img``;
