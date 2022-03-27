import React, { useEffect, useState } from "react";

import { useAllMarket } from "../../../hooks/useAllMarket";
import { useAuctionState } from "../../../store";
import Pagination from "../../../components/Pagination";
import {
    WrapperPagination,
    NoMarket,
    Wrapper,
    Title,
    WrapperAuctions,
    SearchBar,
} from "./styled";
import LoadingComponent from "../../../components/Loading/LoadingComponent";
import CompleteCard from "./Complete/CompleteCard";
import FlybyLogo from "../../../pages/FlybyLogo";
import { useActiveWeb3React } from "../../../hooks";
// import IndexedDb from '../../../utils/indexDB'
// import { INDEXDB_OBJECT_STORE } from '../../../constants'

const UpcomingAuctions = () => {
    const { getDataAuction } = useAllMarket();
    const [dataMap, setDataMap]: any = useState();
    const [state] = useAuctionState();
    const [numPage, setNumPage] = useState(0);
    const [numPageSearch, setNumPageSearch] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [limitPage] = useState(12);
    const [valueSearch, setValueSearch]: any = useState();
    const [dataSearch, setDataSearch]: any = useState();
    const datas: any = state.datas.completed;
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(false);
    const { account, chainId } = useActiveWeb3React();
    const hiddenAuctions = ["0x2b822DD37E0B8295434F0E50Da7250Fa4D4C4e2c"];
    const accountHasHiddenAuctions = [
        "0x00B91B2F8aFE87FCDc2b3fFA9ee2278cd1E4DDf8",
        "0xF5b85B1A7Ec0685A1dc349aa04dD36A6EB5Efb5F",
    ];

    const setPage = (page: any) => {
        setCurrentPage(page);
    };

    const getMapData = async () => {
        datas.reverse();
        setNumPage(Math.ceil(datas.length / limitPage));
        const pageData: any =
            datas.slice(
                currentPage * limitPage,
                (currentPage + 1) * limitPage
            ) || [];
        const dataAuction = await Promise.all(
            pageData?.map(async (item: any, index: any) => {
                const data = await getDataAuction(item.address);
                return data;
            })
        );
        return dataAuction;
    };

    // const searchAuction = async (e: any) => {
    //     setValueSearch(e.target.value);
    //     setLoading(true);
    //     setDataSearch();
    //     const dataAddressSearch = datas.filter(
    //         (item: any) => item.address === e.target.value
    //     );
    //     setNumPageSearch(Math.ceil(dataAddressSearch.length / limitPage));
    //     const dataAuction: any = await Promise.all(
    //         dataAddressSearch?.map(async (item: any, index: any) => {
    //             const data = await getDataAuction(item.address);
    //             return data;
    //         })
    //     );
    //     setLoading(false);
    //     if (dataAuction.length !== 0) {
    //         setDataSearch(dataAuction);
    //     }
    // };

    // const getDataIndexDB = async() => {
    //     const indexedDb = new IndexedDb('flyby');
    //     await indexedDb.createObjectStore(INDEXDB_OBJECT_STORE);
    //     const dataIndexDB = await indexedDb.getAllValue('auction_completed');
    //     if (!datas) {
    //         if (dataIndexDB && dataIndexDB.length !== 0) {
    //             setDataMap(dataIndexDB[dataIndexDB.length - 1].data)
    //         }
    //     }
    // }

    useEffect(() => {
        if (datas && datas.length > 0) {
            getMapData().then(async (res: any) => {
                if (res && res.length === 0) {
                    setNoData(true);
                } else {
                    const data = res?.filter((item: any) => {
                        if (
                            account &&
                            accountHasHiddenAuctions.includes(account)
                        ) {
                            return !accountHasHiddenAuctions.includes(account)
                                ? item !== undefined &&
                                      !hiddenAuctions.includes(item.address)
                                : item !== undefined;
                        }
                        // else return item !== undefined
                        else return item === 0;
                    });
                    setDataMap(data);
                }
            });
        }
    }, [datas, currentPage, account]);

    return (
        <Wrapper>
            <FlybyLogo />
            <Title>{state.language?.COMPLETED_SALES.toUpperCase()}</Title>
            {/* <SearchBar
                onChange={searchAuction}
                type="text"
                placeholder="Paste the address to search for auction"
            /> */}
            {!account || !chainId ? (
                <WrapperPagination>
                    <NoMarket>Please connect your wallet</NoMarket>
                </WrapperPagination>
            ) : (!noData && datas && datas.length === 0) ||
              (dataMap && dataMap.length === 0) ? (
                <WrapperPagination>
                    <NoMarket>{state.language?.NO_COMPLETED_MARKET}</NoMarket>
                </WrapperPagination>
            ) : !dataMap ? (
                <LoadingComponent />
            ) : (
                <>
                    <WrapperAuctions>
                        {valueSearch ? (
                            !loading ? (
                                dataSearch ? (
                                    dataSearch.map((item: any, index: any) => (
                                        <CompleteCard key={index} data={item} />
                                    ))
                                ) : (
                                    <NoMarket>
                                        {state.language?.NO_COMPLETED_MARKET}
                                    </NoMarket>
                                )
                            ) : (
                                <LoadingComponent />
                            )
                        ) : dataMap && dataMap.length > 0 ? (
                            dataMap.map((item: any, index: any) => (
                                <CompleteCard key={index} data={item} />
                            ))
                        ) : (
                            <></>
                        )}
                    </WrapperAuctions>
                    <WrapperPagination>
                        {valueSearch ? (
                            !loading ? (
                                dataSearch ? (
                                    <Pagination
                                        setPages={setPage}
                                        num={numPageSearch}
                                        currentPage={currentPage}
                                    />
                                ) : (
                                    <></>
                                )
                            ) : (
                                <></>
                            )
                        ) : dataMap && dataMap.length > 0 ? (
                            <Pagination
                                setPages={setPage}
                                num={numPage}
                                currentPage={currentPage}
                            />
                        ) : (
                            <></>
                        )}
                    </WrapperPagination>
                </>
            )}
        </Wrapper>
    );
};

export default UpcomingAuctions;
