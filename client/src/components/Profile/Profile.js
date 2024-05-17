import { useState, useEffect } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import StockItem from './StockItem';
import DepositForm from './DepositForm';
import InvestmentsGraph from './InvestmentsGraph';
import useCheckAuth from "../../api/Auth/useCheckAuth";

function Profile() {

    const [stocks, setStocks] = useState(null);
    const [cash, setCash] = useState("...");
    const [newTotal, setNewTotal] = useState(0);
    const [percentChange, setPercentChange] = useState(0);
    const {authenticated, username} = useCheckAuth();
    
    //Get profile data
    useEffect(() => {
        fetch(`${process.env.REACT_APP_url}/auth/profile`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            setStocks(data.stock_symbols);
            setCash(data.cash);
            setNewTotal(data.newTotal);
            setPercentChange(data.percentChange);
        })
        .catch(err => console.log(err));
    }, [])

    const stockss = [
        {
            "symbol": "AAPL",
            "shares": 5,
            "currentPrice": "182.74",
            "percentChange": "1.05",
            "logo": "https://api.twelvedata.com/logo/apple.com"
        },
        {
            "symbol": "TSLA",
            "shares": 11,
            "currentPrice": "174.72",
            "percentChange": "2.01",
            "logo": "https://api.twelvedata.com/logo/tesla.com"
        },
        {
            "symbol": "MSFT",
            "shares": 17,
            "currentPrice": "410.52",
            "percentChange": "-3.24",
            "logo": "https://api.twelvedata.com/logo/microsoft.com"
        },
        {
            "symbol": "AMZN",
            "shares": 2,
            "currentPrice": "188.01",
            "percentChange": "1.51",
            "logo": "https://api.twelvedata.com/logo/amazon.com"
        },
        {
            "symbol": "GOOG",
            "shares": 26,
            "currentPrice": "171.16",
            "percentChange": "-2.21",
            "logo": "https://api.twelvedata.com/logo/google.com"
        },
        {
            "symbol": "NVDA",
            "shares": 50,
            "currentPrice": "904.12",
            "percentChange": "1.11",
            "logo": "https://api.twelvedata.com/logo/nvidia.com"
        },
        {
            "symbol": "AAL",
            "shares": 32,
            "currentPrice": "14.42",
            "percentChange": "2.42",
            "logo": "https://api.twelvedata.com/logo/americanairlines.com"
        },
        {
            "symbol": "AMD",
            "shares": 5,
            "currentPrice": "153.62",
            "percentChange": "-3.43",
            "logo": "https://api.twelvedata.com/logo/amd.com"
        },
        {
            "symbol": "AAPL",
            "shares": 5,
            "currentPrice": "182.74",
            "percentChange": "1.05",
            "logo": "https://api.twelvedata.com/logo/apple.com"
        },
        {
            "symbol": "TSLA",
            "shares": 11,
            "currentPrice": "174.72",
            "percentChange": "2.01",
            "logo": "https://api.twelvedata.com/logo/tesla.com"
        },
        {
            "symbol": "MSFT",
            "shares": 17,
            "currentPrice": "410.52",
            "percentChange": "-3.24",
            "logo": "https://api.twelvedata.com/logo/microsoft.com"
        },
        {
            "symbol": "AMZN",
            "shares": 2,
            "currentPrice": "188.01",
            "percentChange": "1.51",
            "logo": "https://api.twelvedata.com/logo/amazon.com"
        },
        {
            "symbol": "GOOG",
            "shares": 26,
            "currentPrice": "171.16",
            "percentChange": "-2.21",
            "logo": "https://api.twelvedata.com/logo/google.com"
        },
        {
            "symbol": "NVDA",
            "shares": 50,
            "currentPrice": "904.12",
            "percentChange": "1.11",
            "logo": "https://api.twelvedata.com/logo/nvidia.com"
        },
        {
            "symbol": "AAL",
            "shares": 32,
            "currentPrice": "14.42",
            "percentChange": "2.42",
            "logo": "https://api.twelvedata.com/logo/americanairlines.com"
        },
        {
            "symbol": "AMD",
            "shares": 5,
            "currentPrice": "153.62",
            "percentChange": "-3.43",
            "logo": "https://api.twelvedata.com/logo/amd.com"
        },
    ];

    if(authenticated)
    {
        //Green if up, red if down
        const arrow_class = percentChange >= 0 ? "positive_arrow" : "negative_arrow";

        return (
            <div className="profile-container">
                <div className="profile-content">

                    {/* Graph */}
                    <div className="profile-investments-graph" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end" }}>
                            <span style={{ fontSize: '3rem', fontFamily: 'Palatino' }}><b>${newTotal}</b></span>
                            <span className={arrow_class} style={{ fontSize: '2.1rem', fontFamily: 'Palatino' }}><b>{percentChange}%</b></span>
                        </div>
                        <InvestmentsGraph />
                    </div>

                    {/* Investments + cash */}
                    <div className="profile-investments-list">

                        {/* Deposit/withdraw form */}
                        <DepositForm cash={cash}/>
                        
                        <Divider></Divider>
                        
                        {/* Stock list */}
                        <List dense sx={{ width: '100%'}}>

                            {/* Data is loading */}
                            { !stocks ? <center><CircularProgress /></center> : null }

                            {/* Data loaded */}
                            {
                                (stocks && stocks.length == 0) 
                            ? 
                                <h3><center>Start trading today!</center></h3> 
                            : 
                                (stocks && stocks.map((stock) => {
                                    return (
                                        <StockItem data={stock}/>
                                    )
                                }))
                            }
                        </List>
                    </div>
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div className='profile-container'>
                <center><CircularProgress /></center>
            </div>
        )
    }
}

export default Profile;