import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import StockInfo from "./Stock/StockInfo";
import News from "./News/News";
import useGetStockInfo from "../../api/Stock/useGetStockInfo";

function Company() {
    const { symbol } = useParams();
    const [stockData, setStockData] = useState(null);
    const [newsData, setNewsData] = useState(null);
    const [sharesOwned, setSharesOwned] = useState(0);
    // const stockData = useGetStockInfo(symbol);

    useEffect(() => {
        if (symbol && symbol !== "") {

            // Fetch stock data
            fetch(`${process.env.REACT_APP_url}/api/stock_info/${symbol}`, {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                setStockData(data);
                console.log("stockdata: " + JSON.stringify(data));
            })
            .catch(err => console.error("Error fetching stock data:", err));

            // Fetch news data
            fetch(`${process.env.REACT_APP_url}/api/news/${symbol}`, {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                setNewsData(data.result);
            })
            .catch(err => console.error("Error fetching news data:", err));

            //Check how many shares the user owns
            fetch(`${process.env.REACT_APP_url}/auth/numShares/${symbol}`, {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                setSharesOwned(data.shares);
            })
            .catch(err => console.error("Error fetching num shares owned by user:", err));
        }
    }, [symbol]);

    return (
        <div className="company-container">
            {stockData == null || stockData.name == null
            ?
                <center>
                    <CircularProgress />
                </center>
            :
                <>
                    <StockInfo sharesOwned={sharesOwned} data={stockData}/>
                    <News data={newsData} symbol={symbol}/>
                </>
            }
        </div>
    );
}

export default Company;
