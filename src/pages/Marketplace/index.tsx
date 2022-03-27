/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { useAllMarket } from "../../hooks/useAllMarket";
import { useAuctionState } from "../../store";
// import LoadingComponent from '../../components/Loading/LoadingComponent'
import { useActiveWeb3React } from "hooks";

const LivePage = React.lazy(() => import("./components/LiveAuctions"));
const UpcomingPage = React.lazy(() => import("./components/UpcomingAuctions"));
const CompletedPage = React.lazy(() =>
    import("./components/CompletedAuctions")
);

const Marketplace = ({ page }: { page: string }) => {
    const { chainId } = useActiveWeb3React();
    const [state, actions] = useAuctionState();
    // const { datas } = state;
    const { classifyMarkets } = useAllMarket();

    useEffect(() => {
        classifyMarkets().then((res: any) => {
            actions.updateDatas(res);
        });
    }, [chainId]);

    return page === "live" ? (
        <LivePage />
    ) : page === "upcoming" ? (
        <UpcomingPage />
    ) : (
        <CompletedPage />
    );
};
export default Marketplace;
