import React from 'react';
import PurchaseForm from '../PurchaseForm';
import StockChart from './StockChart';

function StockInfo({ data, sharesOwned }) {
    if (!data) {
        return (
            <center>
                <h1><b>Loading...</b></h1>
            </center>
        );
    }

    const { current_price, description, symbol, name, change, percent_change, exchange, history } = data;
    const formattedChange = Number(change).toFixed(2);
    const formattedPercentChange = Number(percent_change).toFixed(2);
    const arrow = change > 0 ? "↑" : "↓";
    const arrow_class = change > 0 ? "positive_arrow" : "negative_arrow";
    const down = arrow_class === "negative_arrow";

    // Values for history chart
    const history_props = {
        title: symbol,
        data: history
    };

    return (
        <div className="stock-container">
            <div className="stock-title">
                {
                    name.length > 35 ? 
                    <h2><strong>{name}</strong></h2> :
                    <h1><strong>{name}</strong></h1>
                }
                ({exchange}: {symbol})
                <div className="stock-price">
                    ${current_price} <b className={arrow_class}>({formattedPercentChange}%)</b>
                </div>
            </div>
            
            {/* Purchase form */}
            <PurchaseForm price={current_price} name={name} symbol={symbol} sharesOwned={sharesOwned}/>

            {/* Company Summary */}
            <div className='stock-description'>
                {description == null
                ?
                    <h5>Company description unavailable at the moment</h5>
                :
                    description
                }
            </div>

            {/* Stock chart */}
            <div className="stock-chart">
                {(history == null || JSON.stringify(history) === '[]' || !history_props) 
                ? 
                    <h5>Company History Unavailable</h5> 
                : 
                    <StockChart data={history_props} down={down}/>
                }
            </div>
        </div>
    );
}

export default StockInfo;
