import {useState, useEffect} from 'react';
import {motion} from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home(props) {

    const [data, setData] = useState(null);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const input = document.getElementsByName("homePageSymbol")[0].value.toUpperCase();
        const trimmed = input.trim();
        if(trimmed == "")
        {
            setMsg("Provide a valid symbol");
            return;
        }

        //Check if this symbol is valid
        fetch(`${process.env.REACT_APP_url}/api/current_price/${input}`, {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data != null) {
                setData(data.data);
                navigate(`company/${input}`);
                window.location.reload(true); 
            } else {
                setMsg("Provide a valid symbol");
            }
        })
        .catch(err => console.log(err));
    }
    return (
        <div className="home">
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
                <div className="login">
                    <center>
                        <h2>Enter ticker symbol...</h2>
                        <br></br>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="input-container">
                                <input type="text" name="homePageSymbol" class="underline" placeholder="e.g. AAPL" autoComplete="off"/>

                                {/* Error msg */}
                                {msg != "" ? 
                                    <div className="error-msg">
                                        <br />
                                        *{msg}*
                                    </div>
                                : 
                                    null
                                }
                                <button class="button-37" type="submit">Get Quote</button>
                            </div>
                        </form>
                    </center>
                </div>
            </motion.div>
        </div>
    )
}

export default Home;