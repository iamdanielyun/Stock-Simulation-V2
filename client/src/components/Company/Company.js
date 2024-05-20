import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import StockInfo from "./Stock/StockInfo";
import News from "./News/News";
import useGetStockInfo from "../../api/Company/Stock/useGetStockInfo";
import useGetSpecificNews from "../../api/Company/News/useGetSpecificNews";
import useGetNumShares from "../../api/Profile/useGetNumShares";

function Company() {
    const { symbol } = useParams();
    const stockData = useGetStockInfo(symbol);
    const newsData = useGetSpecificNews(symbol);
    const sharesOwned = useGetNumShares(symbol);

    return (
        <div className="company-container">
            {stockData == null || stockData.name == null
            ?
                <div className='company-container-loading'>
                    <center>
                        <CircularProgress />
                    </center>
                </div>
                
            :
                <>
                    <StockInfo sharesOwned={sharesOwned} data={stockData}/>
                    <News data={newsData} symbol={symbol}/>
                </>
            }
        </div>
    );
}

export default Company;
