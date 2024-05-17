import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import SmallArticle from "./SmallArticle";
import useGetSpecificNews from "../../../api/Company/News/useGetSpecificNews";

//Display all news articles
function AllNews() {
    const {symbol} = useParams();
    const data = useGetSpecificNews(symbol);

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