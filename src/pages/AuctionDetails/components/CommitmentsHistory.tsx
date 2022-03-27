import React from "react";
import styled from "styled-components";
import { shortAddress } from "../../../utils";
import { useActiveWeb3React } from "../../../hooks";
import { nativeCurrency } from "../../../constants";

const CommitmentsHistory = ({ datas }: { datas: any }) => {
    const { chainId }: any = useActiveWeb3React();
    const CommitItem = ({ data }: { data: any }) => {
        const addressLink =
            "https://" +
            nativeCurrency.URLScan[chainId] +
            "/address/" +
            data.address;
        const txLink =
            "https://" + nativeCurrency.URLScan[chainId] + "/tx/" + data.txHash;
        const blockLink =
            "https://" +
            nativeCurrency.URLScan[chainId] +
            "/block/countdown/" +
            data.block;
        return (
            <Row>
                <div>
                    <a
                        href={addressLink}
                        target="_blank noreferer"
                        className="external-link"
                    >
                        {shortAddress(data.address)}
                    </a>
                </div>
                <div>{parseFloat(data.amount.toFixed(9))}</div>
                <div>{parseFloat(data.tokenClaimable.toFixed(9))}</div>
                <div>
                    <a
                        href={txLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="external-link"
                    >
                        {shortAddress(data.txHash)}
                    </a>
                </div>
                <div>
                    <a
                        href={blockLink}
                        target="_blank noreferer"
                        className="external-link"
                    >
                        {data.block}
                    </a>
                </div>
            </Row>
        );
    };

    return (
        <Wrapper>
            <Column>
                <Row>
                    <div>Address</div>
                    <div>Amount</div>
                    <div>Tokens claimable</div>
                    <div>Tx hash</div>
                    <div>Block</div>
                </Row>
                {datas?.map((item: any, index: any) => {
                    return <CommitItem key={index} data={item} />;
                })}
            </Column>
        </Wrapper>
    );
};

export default CommitmentsHistory;

const Row = styled.div`
    display: grid;
    grid-template-columns: 15% 15% 20% 15% 15%;
    grid-gap: 5%;
    width: 100%;
    font-style: italic;
    div {
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    @media (max-width: 768px) {
        grid-template-columns: 20% 20% 20% 20% 20%;
        grid-gap: 1%;
    }

    .external-link {
        color: #fff;
        text-decoration: underline;
        &:hover {
            text-shadow: 2px 2px 10px #fff;
        }
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 660px;
    @media (max-width: 576px) {
        min-width: 500px;
    }
`;

const Wrapper = styled.div`
    background: #ffffff4f;
    border-radius: 22px;
    padding: 1.5rem;
    width: 100%;
    max-width: calc(1200px + 2rem);
    @media (max-width: 1113px) {
        width: 90%;
        overflow: auto;
    }
    @media (max-width: 1092px) {
        width: 80%;
        overflow: auto;
        min-width: 492px;
    }
    @media (max-width: 768px) {
        border-radius: 16px;
    }
    @media (max-width: 576px) {
        max-width: calc(100vw - 5rem);
        width: 100%;
        border-radius: 14px;
    }
    @media (max-width: 566px) {
        transform: scale(0.8);
    }
    @media (max-width: 442px) {
        min-width: 429px;
    }
    @media (max-width: 390px) {
        min-width: 405px;
    }
    @media (max-width: 349px) {
        min-width: 390px;
    }
`;
