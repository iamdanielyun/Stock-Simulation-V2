import {useState, useEffect} from 'react';
import {motion} from "framer-motion";
import CircularProgress from '@mui/material/CircularProgress';
import Cat from "../icons/Cat3.jpeg";

const link1 = "https://www.bankrate.com/investing/stock-market-basics-for-beginners/";
const link2 = "https://www.investopedia.com/articles/basics/06/invest1000.asp";

function Home() {
    
    const [loading, setLoading] = useState(true);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 1}}
                style={{
                    alignItems: "center",
                    height: "100vh",
                    willChange: 'transform',  
                    transformOrigin: 'center center',
                }}
            >
            
            <div className='home'>
                <div className='home-description'>
                    <div className='home-description-greeting'>
                        <h1><b>Welcome!</b></h1>
                    </div>
                    <div className='home-description-message'>
                        <p>
                            Dive into the world of trading where you can test your strategies
                            and take unlimited risks. <a href="/login">Get started</a> now on your journey to becoming a market maestro!
                        </p>
                        <p>
                            Here are some helpful links:
                        </p>
                        <p className='home-description-message-helpful-links'>
                            <a target="blank" href={link1}>Stock market basics: 9 tips for beginners</a>
                            <a target="blank" href={link2}>How to Invest in Stocks: A Beginner’s Guide</a>
                        </p>
                    </div>
                </div>
                <div className='home-image'>
                    {loading ? <CircularProgress /> : null
                    }
                    <img 
                        onLoad={() => setLoading(false)}
                        src={Cat} 
                    />
                </div>
            </div>
            
            </motion.div>
        </>
    )
}

export default Home;