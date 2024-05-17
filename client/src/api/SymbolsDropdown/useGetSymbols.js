import { useState, useEffect } from "react";

function useGetSymbols(query) {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_url}/api/symbols_like/${query}?limit=15`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            setData(data.result); 
            console.log("data: " + JSON.stringify(data))
        })
        .catch(err => console.log(err));
    }, [query])

    return data;
}

export default useGetSymbols;