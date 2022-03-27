import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Pagination = ({
    setPages,
    num,
    currentPage,
}: {
    setPages: any;
    num: any;
    currentPage: any;
}) => {
    const [page, setPage]: any = useState([]);

    useEffect(() => {
        var elm: any[] = [];
        for (let i = 0; i < Number(num); i++) {
            elm.push(
                <>
                    <Page onClick={() => setPages(i)}>{i + 1}</Page>
                </>
            );
        }
        setPage(elm);
    }, [num]);

    const handleClickFirstPage = () => {
        setPages(0);
    };
    const handleClickPrevPage = () => {
        setPages(currentPage - 1);
    };
    const handleClickNextPage = () => {
        setPages(currentPage + 1);
    };
    const handleClickLastPage = () => {
        setPages(page.length - 1);
    };

    return (
        <>
            <Wrapper>
                {currentPage >= 1 ? (
                    <>
                        <StepButton onClick={handleClickFirstPage}>
                            {"<<"}
                        </StepButton>
                        <StepButton onClick={handleClickPrevPage}>
                            {"<"}
                        </StepButton>
                    </>
                ) : (
                    <></>
                )}

                {page.map((res: any, index: any) => {
                    return index === currentPage ||
                        index === currentPage - 1 ||
                        index === currentPage + 1 ? (
                        <div
                            key={index}
                            className={index === currentPage ? "current" : ""}
                        >
                            {res}
                        </div>
                    ) : (
                        <></>
                    );
                })}
                {currentPage <= page.length - 2 ? (
                    <>
                        <StepButton onClick={handleClickNextPage}>
                            {">"}
                        </StepButton>
                        <StepButton onClick={handleClickLastPage}>
                            {">>"}
                        </StepButton>
                    </>
                ) : (
                    <></>
                )}
            </Wrapper>
        </>
    );
};

const StepButton = styled.button`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1px solid white;
    background-color: white;
    color: #0ab79f;
    font-size: 12px;
    &:hover {
        color: #fff;
        background-color: #65cfa3;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 3px;
    align-items: center;
    div {
        p {
            border-width: 2.5px;
            border-color: #fff;
            color: #fff;
            border-radius: 50%;
        }
    }
    div.current {
        p {
            border-color: #37fab3;
        }
    }
`;

const Page = styled.p`
    margin: 0;
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    border-radius: 50%;
`;

export default Pagination;
