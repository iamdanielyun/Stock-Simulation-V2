import { useState, useEffect } from "react";

function useGetProfile() {
    const [stocks, setStocks] = useState(null);
    const [cash, setCash] = useState("...");
    const [newTotal, setNewTotal] = useState(0);
    const [percentChange, setPercentChange] = useState(0);

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

    return {
        stocks,
        cash,
        newTotal,
        percentChange
    };
}

export default useGetProfile;