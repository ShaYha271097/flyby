import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import LoadingLogo from "../../assets/base64/Loading/logospace.json";
import Point from "../../assets/base64/Loading/point_loading.json";
import FlybyLoading from "../../assets/FlybyLoading.png";

const LoadingComponent = () => {
    const [, setImageLoadingLogo]: any = useState();
    const [imageLoadingLogoPoint, setImageLoadingLogoPoint]: any = useState();

    const configIndexedData = async () => {
        const logoLoading = await localStorage.getItem("flyby_logo_loading");
        if (logoLoading) {
            setImageLoadingLogo(logoLoading);
        } else {
            localStorage.setItem("flyby_logo_loading", LoadingLogo.data);
            setImageLoadingLogo(LoadingLogo.data);
        }
        const pointLoading = await localStorage.getItem(
            "flyby_logo_loading_point"
        );
        if (pointLoading) {
            setImageLoadingLogoPoint(pointLoading);
        } else {
            localStorage.setItem("flyby_logo_loading_point", Point.data);
            setImageLoadingLogoPoint(Point.data);
        }
    };

    useEffect(() => {
        configIndexedData();
    }, []);

    return (
        <>
            <Wrapper>
                <Loading className="loading">
                    <div>
                        <WrapperPointOutside padding="16%">
                            <WarperInside>
                                <ImgIconPoint
                                    className="icon1"
                                    src={imageLoadingLogoPoint}
                                    alt=""
                                />
                                <ImgIconPoint
                                    className="icon2"
                                    src={imageLoadingLogoPoint}
                                    alt=""
                                />
                                <ImgIconPoint
                                    className="icon3"
                                    src={imageLoadingLogoPoint}
                                    alt=""
                                />
                            </WarperInside>
                        </WrapperPointOutside>
                        <ImageLoading src={FlybyLoading} alt="" />
                    </div>
                </Loading>
            </Wrapper>
        </>
    );
};

const rotateAnimationOutside = keyframes`
    0% {
        transform: rotate(-358deg);
    }
    100% {
        transform: rotate(0deg);
    }
`;

const ImageLoading = styled.img`
    width: 100%;
    height: 100%;
`;

const WarperInside = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    .icon1 {
        position: absolute;
        left: 137px;
        bottom: 83px;
    }
    .icon2 {
        position: absolute;
        right: 125px;
        bottom: 107px;
    }
    .icon3 {
        position: absolute;
        top: 141px;
        left: 35px;
    }
`;

const WrapperPointOutside = styled.div<{ padding?: string }>`
    width: 100%;
    height: 100%;
    position: absolute;
    padding: ${({ padding }) => padding};
    transform: rotate(-45deg);
    animation: ${rotateAnimationOutside} 7s linear infinite;
`;

const ImgIconPoint = styled.img<{ margin?: string }>`
    width: 15px;
    height: 15px;
    z-index: 2;
    margin: ${({ margin }) => (margin ? margin : "0")};
`;

const Wrapper = styled.div`
    width: 0 !important;
    height: 0;
    position: absolute;
    top: 62%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Loading = styled.div`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 180px;
    height: 180px;
`;

export default LoadingComponent;
