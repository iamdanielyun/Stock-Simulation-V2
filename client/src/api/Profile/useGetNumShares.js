import { useState, useEffect } from "react";

function useGetNumShares(symbol) {
    const [data, setData] = useState(null);
    useEffect(() => {
        if(symbol && symbol !== "")
        {
            //Check how many shares the user owns
            fetch(`${process.env.REACT_APP_url}/auth/numShares/${symbol}`, {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                setData(data.shares);
            })
            .catch(err => console.error("Error fetching num shares owned by user:", err));
        }
    }, [symbol])

    return data;
}

export default useGetNumShares;