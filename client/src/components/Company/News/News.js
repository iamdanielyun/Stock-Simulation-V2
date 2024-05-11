// import {useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import BigArticle from "./BigArticle";
// import SmallArticle from './SmallArticle';

// function News(props) {

//     const [data, setData] = useState([]);

//     useEffect(() => {
//         fetch(`${process.env.REACT_APP_url}/api/news/${props.data}`, {
//             credentials: 'include'
//         })
//         .then(response => response.json())
//         .then(data => {
//             setData(data.result);
//         })
//         .catch(err => console.log(err));
//     }, [])

//     if(data != null && typeof(data) != 'undefined' && data.length > 0)
//     {
    
//         var res = [];
//         for(var i = 0; i < data.length; i++)
//         {
//             const article = data[i];
            
//             //only render this article if it has an image
//             if(article.image != "")
//             {
//                 var params = {
//                     "date": new Date(article.datetime * 1000).toLocaleDateString('en-us', 
//                             {year:"numeric", month:"numeric", day:"numeric"}),
//                     "headline": article.headline,
//                     "image": article.image,
//                     "related": article.related,
//                     "source": article.source,
//                     "summary": article.summary,
//                     "url": article.url
//                 };
//                 res.push(params);
//             }
//         }

//         const sample = {
//             "date": "4/19/2024",
//             "headline": "Netflix Joins Apple, Meta in Withholding Key Data From Investors",
//             "image": "https://s.yimg.com/ny/api/res/1.2/ZnouO6SYVp7rmqgEzX9X7g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://media.zenfs.com/en/insidermonkey.com/d42b3f86d4df4fc661c1ab873312fc9b",
//             "source": "Yahoo",
//             "summary": "Visa (NYSE:V) and Mastercard (NYSE:MA) just reached what many are calling a landmark agreement. In response to a class-action lawsuit, the two payments processors agreed to lower ",
//             "url": "https://finnhub.io/api/news?id=438fdb39c695fd22502a9887a8261d65ebb588ba72cc85c3e26048ac68c4d16b"
//         }
//         return (
//             <div className="news-container">

//                 {/* Main 2 big articles */}
//                 <div className="news-big-article">
//                     <BigArticle data={res[0]}/>
//                     <BigArticle data={res[1]}/>
//                 </div>
                
//                 {/* 3 small articles on next line */}
//                 <div className="news-small-article">
//                     <SmallArticle data={res[2]}/>
//                     <SmallArticle data={res[3]}/>
//                     <SmallArticle data={res[4]}/>
//                 </div>

//                 {/* View all news */}
//                 <div className="news-view-more">
//                     <Link to={{
//                         pathname: `/company/${props.data}/news`
//                     }}>
//                         View more
//                     </Link>
//                 </div>
//             </div>
//         )
//     }
// }

// export default News;

import React from 'react';
import { Link } from 'react-router-dom';
import BigArticle from "./BigArticle";
import SmallArticle from './SmallArticle';

function News({ data, symbol }) {
    if (data && data.length > 0) {
        const res = data.filter(article => article.image != "").slice(0, 5).map(article => ({
            date: new Date(article.datetime * 1000).toLocaleDateString('en-us', { year: "numeric", month: "numeric", day: "numeric" }),
            headline: article.headline,
            image: article.image,
            related: article.related,
            source: article.source,
            summary: article.summary,
            url: article.url
        }));

        return (
            <div className="news-container">
                {/* Main 2 big articles */}
                <div className="news-big-article">
                    <BigArticle data={res[0]} />
                    <BigArticle data={res[1]} />
                </div>

                {/* 3 small articles on next line */}
                <div className="news-small-article">
                    <SmallArticle data={res[2]} />
                    <SmallArticle data={res[3]} />
                    <SmallArticle data={res[4]} />
                </div>

                {/* View all news */}
                <div className="news-view-more">
                    <Link to={{
                        pathname: `/company/${symbol}/news`
                    }}>
                        View more
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="news-container">
                <h3>No news available</h3>
            </div>
        );
    }
}

export default News;
