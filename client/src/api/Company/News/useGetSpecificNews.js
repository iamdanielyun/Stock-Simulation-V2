import { useState, useEffect } from "react";

function useGetSpecificNews(symbol) {
    const [data, setData] = useState(null);
    useEffect(() => {
        if(symbol && symbol !== "")
        {
            // Fetch news data
            fetch(`${process.env.REACT_APP_url}/api/news/${symbol}`, {
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                setData(data.result);
            })
            .catch(err => console.error("Error fetching news data:", err));
        }
    }, [symbol])

    return data;
}

export default useGetSpecificNews;