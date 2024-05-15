import {useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import SmallArticle from "./SmallArticle";

const sample = {
    "date": "4/19/2024",
    "headline": "Netflix Joins Apple, Meta in Withholding Key Data From Investors",
    "image": "https://s.yimg.com/ny/api/res/1.2/ZnouO6SYVp7rmqgEzX9X7g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://media.zenfs.com/en/insidermonkey.com/d42b3f86d4df4fc661c1ab873312fc9b",
    "source": "Yahoo",
    "summary": "Visa (NYSE:V) and Mastercard (NYSE:MA) just reached what many are calling a landmark agreement. In response to a class-action lawsuit, the two payments processors agreed to lower ",
    "url": "https://finnhub.io/api/news?id=438fdb39c695fd22502a9887a8261d65ebb588ba72cc85c3e26048ac68c4d16b"
}

//Display all news articles
function AllNews() {
    const {symbol} = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_url}/api/news/${symbol}`, {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setData(data.result);
        })
        .catch(err => console.log(err))
    }, [])
    if(data != null && typeof(data) != undefined)
    {
        var res = [];

        for(var i = 0; i < data.length; i++)
        {
            const article = data[i];
            
            //only render this article if it has an image
            if(article.image != "")
            {
                var params = {
                    "date": new Date(article.datetime * 1000).toLocaleDateString('en-us', 
                            {year:"numeric", month:"numeric", day:"numeric"}),
                    "headline": article.headline,
                    "image": article.image,
                    "related": article.related,
                    "source": article.source,
                    "summary": article.summary,
                    "url": article.url
                };
                res.push(params);
            }
        }
        return (
            <div className="company-container">
                <div className="news-container">
                    <div className="news-view-more-top-stories">
                        <h1>
                            Top Stories
                        </h1>
                    </div>
                    {/* Map over the array and render SmallArticle for each index */}
                    <div className="news-grid">
                        {res.map((params, index) => (
                            <SmallArticle key={index} data={params} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    else
    {
        return (
            <div className="company-container">
                <div className="company-content">
                    <div className="news-container">
                        {/* Map over the array and render SmallArticle for each index */}
                        <div className="news-grid">
                            <center><CircularProgress /></center>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AllNews;