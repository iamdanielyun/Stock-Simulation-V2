// import {useState, useEffect} from 'react';
// import StockChart from './StockChart';
// import PurchaseForm from '../PurchaseForm';

// function Stock(props) {
   
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         if(props.data != "" && typeof(props) !== 'undefined') 
//         {
//             fetch(`${process.env.REACT_APP_url}/api/stock_info/${props.data}`, {
//                 credentials: 'include'
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log("D" + JSON.stringify(data)); 
//                 setData(data);
//             })
//             .catch(err => console.log(err));
//         }
//         else
//             console.log("STOP")
//     }, [props.data])
    
//     if(data != null)
//     {
//         console.log("changeeee" + data.change)
//         const current_price = Number(data.current_price).toFixed(2);
//         const description = data.description;
//         const symbol = data.symbol;
//         const name = data.name;
//         const change = Number(data.change).toFixed(2);
//         const percent_change = Number(data.percent_change).toFixed(2);
//         const exchange = data.exchange;
//         const history = data.history;
//         const arrow = change > 0 ? "↑" : "↓";
//         const arrow_class = change > 0 ? "positive_arrow" : "negative_arrow";
//         const down = arrow_class == "negative_arrow" ? true : false;

//         //Values for history chart
//         const history_props = {
//             title: symbol,
//             data: history
//         };

//         return (
//             <div className="stock-container">
//                 <div className="stock-title">

//                     {/* Company name and price */}
//                     <h1><strong>{name}</strong></h1>
//                     ({exchange}: {symbol})

//                     <div className="stock-price">
//                         ${current_price} <b className={arrow_class}>({percent_change}%)</b>
//                     </div>
//                 </div>
                
//                 {/* Purchase form */}
//                 <PurchaseForm price={current_price} name={name} symbol={symbol}/>

//                 {/* Company Summary */}
//                 <div className='stock-description'>
//                     {description}
//                 </div>

//                 {/* Stock chart */}
                // <div className="stock-chart">
                //     {/* {(history === 'Company History Unavailable' || JSON.stringify(history) === '{}' || !history_props) 
                //         ? 
                //             <h5>Company History Unavailable</h5> 
                //         : 
                //             <StockChart data={history_props} down={down}/>
                //     } */}
                // </div>
//             </div>
//         )
//     }
//     else
//     {
//         return (
//             <center>
//                 <h1><b>...</b></h1>
//             </center>
//         )
//     }
    
// }

// export default Stock;

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
