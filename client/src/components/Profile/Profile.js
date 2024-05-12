import { useState, useEffect } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import StockItem from './StockItem';
import useCheckAuth from '../Auth/useCheckAuth';
import DepositForm from './DepositForm';

function Profile() {

    const [user, setUser] = useState(null);
    const [stocks, setStocks] = useState(null);
    const [cash, setCash] = useState("...");
    const authenticated = useCheckAuth();
    
    //Get profile data
    useEffect(() => {
        fetch(`${process.env.REACT_APP_url}/auth/profile`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            setUser(data.user);
            setStocks(data.stock_symbols);
            setCash(data.cash);
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
        return (
            <div className="profile-container">
                <div className="profile-welcome">
                    <h3>Welcome, {user ? user : "uh oh"}</h3>
                </div>

                <div className="profile-content">
                    

                    <div className="profile-investments-list">

                        {/* Deposit/withdraw form */}
                        <DepositForm cash={cash}/>
                        
                        <Divider></Divider>
                        
                        {/* Stock list */}
                        <List dense sx={{ width: '100%', bgcolor: '#b1b6c1' }}>

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
                    <div className="profile-investments-graph">
                        {/* <h4>Total Investing</h4> */}
                    </div>
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div className='profile-container'>
                <center>Please login</center>
            </div>
        )
    }
}

export default Profile;