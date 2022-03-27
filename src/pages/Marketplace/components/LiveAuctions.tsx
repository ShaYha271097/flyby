import React, { useState, useEffect } from "react";
import { useAllMarket } from "../../../hooks/useAllMarket";
import { useAuctionState } from "../../../store";
import LoadingComponent from "../../../components/Loading/LoadingComponent";
import Pagination from "../../../components/Pagination";
import LiveCard from "./Live/LiveCard";
import FlybyLogo from "../../FlybyLogo";
import { useActiveWeb3React } from "../../../hooks";

import {
    WrapperPagination,
    NoMarket,
    Wrapper,
    Title,
    WrapperAuctions,
    // SearchBar,
} from "./styled";

// import IndexedDb from '../../../utils/indexDB'
// import { INDEXDB_OBJECT_STORE } from '../../../constants'

const LiveAuctions = () => {
    const { getDataAuction } = useAllMarket();
    const [dataMap, setDataMap]: any = useState();
    const [state] = useAuctionState();
    const [numPage, setNumPage] = useState(0);
    const [numPageSearch, setNumPageSearch] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [limitPage] = useState(12);
    const [valueSearch, setValueSearch]: any = useState();
    const [dataSearch, setDataSearch]: any = useState();
    const datas: any = state.datas.live;
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(false);
    const { account, chainId } = useActiveWeb3React();

    const setPage = (page: any) => {
        setCurrentPage(page);
    };

    const searchAuction = async (e: any) => {
        setValueSearch(e.target.value);
        setLoading(true);
        setDataSearch();
        const dataAddressSearch = datas.filter(
            (item: any) => item.address === e.target.value
        );
        setNumPageSearch(Math.ceil(dataAddressSearch.length / limitPage));
        const dataAuction: any = await Promise.all(
            dataAddressSearch?.map(async (item: any, index: any) => {
                const data = await getDataAuction(item.address);
                return data;
            })
        );
        setLoading(false);
        if (dataAuction.length !== 0) {
            setDataSearch(dataAuction);
        }
    };

    // const getDataIndexDB = async() => {
    //     const indexedDb = new IndexedDb('flyby');
    //     await indexedDb.createObjectStore(INDEXDB_OBJECT_STORE);
    //     const dataIndexDB = await indexedDb.getAllValue('auction_live');
    //     if (!datas) {
    //         if (dataIndexDB && dataIndexDB.length !== 0) {
    //             setDataMap(dataIndexDB[dataIndexDB.length - 1].data)
    //         }
    //     }
    // }

    useEffect(() => {
        const getMapData = async () => {
            if (datas) {
                datas.reverse();
                setNumPage(Math.ceil(datas.length / limitPage));
                const pageData = datas.slice(
                    currentPage * limitPage,
                    (currentPage + 1) * limitPage
                );
                const dataAuction = await Promise.all(
                    pageData?.map(async (item: any, index: number) => {
                        const data = await getDataAuction(item.address);
                        return data;
                    })
                );
                return dataAuction;
            }
            return;
        };

        if (datas && datas.length > 0) {
            getMapData().then(async (res: any) => {
                if (res && res.length === 0) {
                    setNoData(true);
                } else {
                    const data = res?.filter((item: any) => {
                        return item !== undefined;
                    });
                    setDataMap(data);
                    // const indexedDb = new IndexedDb('flyby');
                    // await indexedDb.createObjectStore(INDEXDB_OBJECT_STORE);
                    // await indexedDb.deleteValue('auction_live', 0);
                    // await indexedDb.putValue('auction_live', { data: data });
                }
            });
        }
        // else {
        //     getDataIndexDB()
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [datas, currentPage]);

    return (
        <Wrapper>
            <FlybyLogo />
            <Title>{state.language?.LIVE_SALES.toUpperCase()}</Title>
            {/* <SearchBar
                onChange={searchAuction}
                type="text"
                placeholder="Paste the address to search for auction"
            /> */}
            {!account || !chainId ? (
                <WrapperPagination>
                    <NoMarket>Please connect your wallet</NoMarket>
                </WrapperPagination>
            ) : !noData && datas && datas.length === 0 ? (
                <WrapperPagination>
                    <NoMarket>{state.language?.NO_LIVE_MARKET}</NoMarket>
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
                                        <LiveCard key={index} data={item} />
                                    ))
                                ) : (
                                    <NoMarket>
                                        {state.language?.NO_LIVE_MARKET}
                                    </NoMarket>
                                )
                            ) : (
                                <LoadingComponent />
                            )
                        ) : dataMap ? (
                            dataMap.map((item: any, index: any) => (
                                <LiveCard key={index} data={item} />
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
                        ) : dataMap ? (
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

export default LiveAuctions;
