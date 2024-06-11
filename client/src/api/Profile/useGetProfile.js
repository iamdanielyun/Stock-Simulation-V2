import { useState, useEffect } from "react";

function useGetProfile() {
    const [stocks, setStocks] = useState(null);
    const [cash, setCash] = useState("...");
    const [newTotal, setNewTotal] = useState(0);
    const [percentChange, setPercentChange] = useState(0);
    const [labels, setLabels] = useState([]);
    const [values, setValues] = useState([]);

    //Get profile data
    useEffect(() => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        fetch(`${process.env.REACT_APP_url}/auth/profile?timeZone=${encodeURIComponent(userTimeZone)}`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            setStocks(data.stock_symbols);
            setCash(data.cash);
            setNewTotal(data.newTotal);
            setPercentChange(data.percentChange);
            setLabels(data.labels);
            setValues(data.values);
        })
        .catch(err => console.log(err));
    }, [])

    return {
        stocks,
        cash,
        newTotal,
        percentChange,
        labels,
        values
    };
}

export default useGetProfile;