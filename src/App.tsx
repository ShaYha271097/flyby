import React, { useState, Suspense, lazy } from "react";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { NetworkContextName } from "./constants";
import getLibrary from "./utils/getLibrary";
import Marketplace from "./pages/Marketplace";
import {
    WrapperApp,
    WrapperMain,
    WrapperHeader,
    WrapperPages,
    FooterWrapper,
    FooterWrapper1,
    Wrapper,
} from "./styled";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

const AuctionDetails = lazy(() => import("./pages/AuctionDetails"));
// const SetDocuments = lazy(() => import("./pages/SetDocument"));
// const Home = lazy(() => import("./pages/Home"));
const NewAuction = lazy(() => import("./pages/NewSale/NewAuction"));
const NewCrowdSale = lazy(() => import("./pages/NewSale/NewCrowSales"));
const NewPrivateSale = lazy(() => import("./pages/NewSale/NewPrivateSale"));
// const Header = lazy(() => import("./components/Header"));
// const Sidebar = lazy(() => import("./components/Sidebar"));
const Web3ReactManager = lazy(() => import("./components/Web3ReactManager"));
// const Footer = lazy(() => import("./components/Footer"));

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNav, setShowNav] = useState(false);
    window.addEventListener("scroll", () => {
        // console.log("scroll -----------> ", window.scrollY);
        window.scrollY > 80 ? setShowNav(true) : setShowNav(false);
    });
    return (
        <HashRouter>
            <Web3ReactProvider getLibrary={getLibrary}>
                <Web3ProviderNetwork getLibrary={getLibrary}>
                    <Wrapper>
                        <WrapperApp>
                            <div />
                            <Sidebar
                                menuOpen={menuOpen}
                                onCloseMenu={() => setMenuOpen(false)}
                            />
                            <WrapperMain id="wrapper-main-right">
                                <WrapperHeader>
                                    <Header
                                        menuOpen={menuOpen}
                                        setMenuOpen={setMenuOpen}
                                    />
                                </WrapperHeader>
                                <Suspense fallback="">
                                    <div />
                                    <WrapperPages>
                                        <Web3ReactManager>
                                            <Switch>
                                                {/* <Route
                                                exact
                                                path="/home"
                                                component={Home}
                                            /> */}
                                                <Route exact path="/live">
                                                    <Marketplace page="live" />
                                                </Route>
                                                <Route exact path="/upcoming">
                                                    <Marketplace page="upcoming" />
                                                </Route>
                                                <Route exact path="/past">
                                                    <Marketplace page="past" />
                                                </Route>
                                                <Route
                                                    path="/auctions/:id"
                                                    component={AuctionDetails}
                                                />
                                                <Route
                                                path="/factory/new-auction"
                                                component={NewAuction}
                                            />
                                                <Route
                                                    path="/factory/new-crowdsale"
                                                    component={NewCrowdSale}
                                                />{/*private sale round 1 - templateId 1*/}
                                                
                                                <Route
                                                    path="/factory/new-privatesale"
                                                    component={NewPrivateSale} 
                                                />{/*private sale round 2 - templateId 3*/}
                                                <Route path="*">
                                                    <Redirect to="/live" />
                                                </Route>
                                            </Switch>
                                        </Web3ReactManager>
                                    </WrapperPages>
                                </Suspense>
                                <FooterWrapper className="footer1">
                                    <Footer />
                                </FooterWrapper>
                            </WrapperMain>
                        </WrapperApp>
                    </Wrapper>
                    <FooterWrapper1>
                        <Footer />
                    </FooterWrapper1>
                </Web3ProviderNetwork>
            </Web3ReactProvider>
        </HashRouter>
    );
}
