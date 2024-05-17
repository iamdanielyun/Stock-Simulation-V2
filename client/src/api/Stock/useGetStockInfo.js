import { useState, useEffect } from "react";

function useGetStockInfo(symbol) {
    const [data, setData] = useState(null);
    useEffect(() => {
        if(symbol && symbol !== "")
        {
            // Fetch stock data
            fetch(`${process.env.REACT_APP_url}/api/stock_info/${symbol}`, {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                setData(data);
                console.log("stockdata: " + JSON.stringify(data));
            })
            .catch(err => console.error("Error fetching stock data:", err));
        }
    }, [symbol])

    return data;
}

export default useGetStockInfo;