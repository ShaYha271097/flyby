import React from "react";
import Text from "../../components/Text";
import LogoFlyby from "../../assets/FlybyLoading.png";
import { Row } from "../../components/Row";
import styled from "styled-components";

const FlybyLogo = () => {
    return (
        <FLyby>
            <RowFlyby>
                <Img>
                    <img src={LogoFlyby} alt="" />
                </Img>

                <Text className="LogoFlyby" size="3.5rem">
                    flyby Launchpad
                </Text>
            </RowFlyby>
        </FLyby>
    );
};

export default FlybyLogo;

export const FLyby = styled.div`
    display: flex;
`;

export const Img = styled.div`
    display: flex;
    img {
        width: 100px;
        height: auto;
    }
    @media (max-width: 900px) {
        display: none;
    }
`;

export const RowFlyby = styled(Row)`
    display: flex;
    align-items: center;
    .LogoFlyby {
        font-style: italic;
        font-size: 3rem;
        @media (max-width: 576px) {
            font-size: 2.5rem;
        @media (max-width: 501px) {
            font-size: 2.3rem;
        }
        @media (max-width: 414px) {
            font-size: 2.1rem;
        }
        @media (max-width: 386px) {
            font-size: 1.8rem;
        }
       
      
    }
  
`;
