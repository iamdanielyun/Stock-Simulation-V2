import { useState, useEfect } from "react";
import { useNavigate } from "react-router-dom";

function useBuySell() {    
    const navigate = useNavigate();

    //Purchase stock
    const buySellStock = (setMsg, action, symbol, shares, sharesOwned, price, name) => {
        fetch(`${process.env.REACT_APP_url}/auth/action`, {
            method: "POST",
            body: JSON.stringify({
                action: action,
                symbol: symbol,
                shares: shares,
                sharesOwned: sharesOwned,   //for selling
                price: price,
                name: name
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setMsg(data.message);

            if(data.message === "success")
            {
                navigate("/profile");
                window.location.reload(true);      
            }
        })
        .catch(err => console.log(err));
    }
    return { buySellStock };
}

export default useBuySell;
