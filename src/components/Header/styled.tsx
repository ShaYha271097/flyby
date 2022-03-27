import styled from "styled-components";
import { RowBetween } from "../Row";

export const GroupButton = styled(RowBetween)`
    gap: 1rem;
    @media (max-width: 363px) {
        gap: 0.5rem;
    }
`;

export const Loader = styled.div`
    width: 20px;
    height: 20px;
    border: 2px solid #0065ad;
    border-right: 2px solid transparent;
    border-radius: 50%;

    animation: spinning linear 2s infinite;
    @keyframes spinning {
        to {
            transform: rotate(360deg);
        }
    }
`;

export const Wrapper = styled.div<{ width?: string }>`
    background: none;
    // height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 1rem 2rem;
    margin-right: 10px;
    @media (max-width: 900px) {
        width: fit-content;
        justify-content: space-between;
    }
    @media (max-width: 576px) {
        height: 60px;
    }
    @media (max-width: 349px) {
        padding: 1rem 1rem;
    }
`;

export const WrapperLogo = styled.div`
    @media (min-width: 901px) {
        display: none;
    }
    img {
        width: 50px;
        @media (max-width: 576px) {
            width: 45px;
        }
    }

    position: absolute;
    left: 35px;
    top: 10px;
    @media (max-width: 339px) {
        left: 11px;
    }
`;
export const WrapperIntro = styled.div`
    @media (max-width: 1226px) {
        display: none;
        div {
            justify-content: end;
        }
    }
`;
export const Intro = styled.div`
    position: absolute;
    background-color: #09033a47;
    border-radius: 10px;
    width: 380px;
    padding: 3px 10px;
    top: 38px;
    display: none;
    @media (max-width: 450px) {
        top: 36px;
        width: 350px;
    }
    @media (max-width: 405px) {
        width: 310px;
        left: 0px;
    }
    @media (max-width: 352px) {
        width: 300px;
        left: -10px;
    }
`;

export const WrapperIntroResponsive = styled.div`
    display: none;
    @media (max-width: 1200px) {
        div {
            justify-content: end;
            gap: 30px;
        }
        padding: 0.5rem 0 0 1rem;
    }
    @media (max-width: 850px) {
        display: none;
    }
`;

export const IconAccount = styled.div`
    height: 1rem;
    width: 1rem;
    border-radius: 1.125rem;
`;
export const ButtonForbitOutside = styled.div`
    @media (min-width: 1227px) {
        display: none;
    }
    @media (max-width: 590px) {
        position: absolute;
        left: 30px;
    }
`;
// export const ButtonForbit = styled.div`
//     position: relative;
//     display: none;
//     background-color: #4ea4e57d;
//     border-radius: 8px;
//     width: 35px;
//     height: 35px;
//     &:hover {
//         background-color: #4fa5e3;
//         .IntroForbit {
//             display: block;
//         }
//     }
//     img {
//         width: 100%;
//         padding: 5px;
//     }
//     .IntroLogo {
//         @media (max-width: 1226px) {
//             display: block;
//         }
//     }
//     @media (max-width: 1226px) {
//         display: block;
//     }
//     @media (max-width: 450px) {
//         height: 31px;
//         width: 31px;
//     }
// `;

export const AccountStatus = styled.div`
    display: flex;
    gap: 5px;
    border-radius: 12px;
    align-items: center;
    height: 36px;
    background-image: linear-gradient(
        to right,
        #00aedb 0%,
        #14fd31 60%,
        #1b0d93 90%
    );
    @media (max-width: 768px) {
        border-radius: 8px;
    }
    @media (max-width: 450px) {
        height: 31px;
    }
`;

export const WrapperMainHeader = styled.div<{ background: string }>`
    background: ${({ background }) => background};
    display: flex;
    justify-content: end;
    position: relative;
    @media (max-width: 1200px) {
        flex-direction: row-reverse;
    }
    @media (max-width: 900px) {
        display: flex;
        flex-direction: row-reverse;
    }
`;

export const Balance = styled.div`
    padding-left: 8px;
    font-size: 15px;
    width: 100%;
    @media (max-width: 480px) {
        display: none;
    }
`;

export const Account = styled.div`
    background-image: linear-gradient(
        to right,
        #00f024 0%,
        #09b3ca 38%,
        #1a7ade 80%
    );
    padding: 8px 12px;
    border-radius: 10px;
    display: flex;
    gap: 5px;
    font-size: 15px;
    cursor: pointer;
    background-size: 200%;
    background-position: left;
    border: 1px solid #aefec7;
    @media (max-width: 900px) {
        padding: 8px 10px;
    }
    @media (max-width: 450px) {
        border-radius: 8px;
    }
    transition: all ease-in-out 0.5s;
    box-shadow: 0px 0px 8px -2px #000000;

    &:hover {
        background-position: right;
    }
`;

export const ButtonMenuMobile = styled.div<{ isOpen: boolean }>`
display: flex;
flex-direction: column;
gap: 0.4rem;
background: #4bce9ee8;
width; fit-content;
height: fit-content;
padding: 0.5rem;
border-radius: 5px;
cursor: pointer;
@media(min-width: 901px) {
    display: none;
}


span {
    width: 20px;
    height: 2px;
    background: white;
    transition: all ease-in-out 0.2s;
}

span:nth-child(1) {
    width: ${({ isOpen }) => (isOpen ? "5px" : "20px")};
}

span:nth-child(3) {
    width: ${({ isOpen }) => (isOpen ? "10px" : "20px")};
}

`;

export const ChangeNetwork = styled.div`
    display: flex;
    background: linear-gradient(to right, #7cf95b, #4da2ea);
    padding: 0px 1rem;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
`;
