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
