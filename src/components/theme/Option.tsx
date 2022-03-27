import React from "react";
import styled from "styled-components";
// import { ExternalLink } from "../../theme";
import { ExternalLink } from "./index";

const InfoCard = styled.button<{ active?: boolean }>`
    padding: 1rem;
    outline: none;
    transition: all ease-in-out 0.3s;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    border: none !important;
    align-self: center;
`;

const OptionCard = styled(InfoCard as any)`
    display: flex;
    align-items: center;
    margin-top: 2rem;
    padding: 1rem;
    text-align: center;
    justify-content: center;
    background: none !important;
`;

const OptionCardLeft = styled.div`
    ${({ theme }) => theme.flexColumnNoWrap};
    justify-content: center;
    height: 100%;
`;

const OptionCardClickable = styled(OptionCard as any)<{ clickable?: boolean }>`
    margin-top: 0;
    opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
`;

const HeaderText = styled.div`
    ${({ theme }) => theme.flexRowNoWrap};
    color: ${(props) =>
        props.color === "blue"
            ? ({ theme }) => theme.primary1
            : ({ theme }) => theme.text1};
    font-size: 12.5px;
    font-weight: 500;
    align-self: center;
    white-space: nowrap;
    @media (max-width: 576px) {
        font-size: 12px;
    }
`;
// ${({ theme }) => theme.mediaWidth.upToMedium`
//   align-items: flex-end;
// `};
const IconWrapper = styled.div<{ size?: number | null }>`
    ${({ theme }) => theme.flexColumnNoWrap};
    align-items: center;
    justify-content: center;
    & > img,
    span {
        height: ${({ size }) => (size ? size + "px" : "24px")};
        width: ${({ size }) => (size ? size + "px" : "24px")};
    }
    align-self: center;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 26%;
    justify-content: center;
    border-radius: 10px;
    padding: 5px;
    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    &:hover {
        background: #92818121;
    }
    @media (min-width: 1024px) {
        width: 18%;
    }
    @media (max-width: 615px) {
        width: 25%;
    }
    @media (max-width: 440px) {
        transform: scale(0.9);
        padding: 0;
    }
    @media (max-width: 403px) {
        width: 40%;
    }
`;

export default function Option({
    link = null,
    clickable = true,
    size,
    onClick = null,
    color,
    header,
    subheader = null,
    icon,
    active = false,
    id,
}: {
    link?: string | null;
    clickable?: boolean;
    size?: number | null;
    onClick?: null | (() => void);
    color: string;
    header: React.ReactNode;
    subheader: React.ReactNode | null;
    icon: string;
    active?: boolean;
    id: string;
}) {
    const content = (
        <Wrapper>
            <OptionCardClickable
                id={id}
                onClick={onClick}
                clickable={clickable && !active}
                active={active}
                className="mode_line"
            >
                <OptionCardLeft>
                    <IconWrapper size={50}>
                        <img src={icon} alt={"Icon"} />
                    </IconWrapper>
                </OptionCardLeft>
            </OptionCardClickable>
            <HeaderText className="text">{header}</HeaderText>
        </Wrapper>
    );
    if (link) {
        // return <ExternalLink href={link}>{content}</ExternalLink>;
        return (
            <Wrapper>
                <ExternalLink href={link}>
                    <OptionCardClickable
                        id={id}
                        onClick={onClick}
                        clickable={clickable && !active}
                        active={active}
                        className="mode_line"
                    >
                        <OptionCardLeft>
                            <IconWrapper size={50}>
                                <img src={icon} alt={"Icon"} />
                            </IconWrapper>
                        </OptionCardLeft>
                    </OptionCardClickable>
                    <HeaderText className="text">{header}</HeaderText>
                </ExternalLink>
            </Wrapper>
        );
    }

    return content;
}
