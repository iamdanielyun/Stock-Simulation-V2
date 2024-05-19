import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import RedAlert from '../Alert/RedAlert';
import useBuySell from '../../api/Profile/useBuySell';
import useCheckAuth from "../../api/Auth/useCheckAuth";

function PurchaseForm(props) {
    const [msg, setMsg] = useState("");
    const [action, setAction] = useState("Buy");
    const [shares, setShares] = useState(1);
    const {authenticated} = useCheckAuth();
    const {sharesOwned} = props;
    const {buySellStock} = useBuySell();

    //Purchase function
    function purchase(e) {
        e.preventDefault(); 
        const symbol = props.symbol;
        const price = props.price;
        const name =  props.name;

        if(shares <= 0)
            setMsg("Please enter a valid number of shares");
        else if(action.toLowerCase() == "sell" && shares > sharesOwned)     //trying to sell more than what they own
            setMsg("That's more than what you own!");
        else
            buySellStock(setMsg, action, symbol, shares, sharesOwned, price, name);
    }
  
    const menuItemStyle = {
        fontFamily: "Palatino"
    };

    const buttonStyle = {
        width: "7%",
        fontFamily: "Palatino"
    };

    return(
        <form onSubmit={(e) => purchase(e)} className="stock-purchase-form">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Select
                    value={action}
                    onChange={e => {setAction(e.target.value)}}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{width: "15%", marginBottom: "0.5%", fontFamily: "Palatino"}}
                    >
                    <MenuItem sx={menuItemStyle} value="Buy">Buy</MenuItem>

                    {sharesOwned > 0 
                    ?
                        <MenuItem sx={menuItemStyle} value="Sell">Sell</MenuItem>
                    :
                        <MenuItem disabled sx={menuItemStyle} value="Sell">Sell</MenuItem>
                    }
                </Select>
                <TextField
                    type="number"
                    placeholder="# shares"
                    value={shares}
                    onChange={e => {setShares(e.target.value)}}
                    inputProps={{
                        min: 1,     //minimum of 1 share  
                        step: 1     //only buy whole number shares
                    }}
                    variant="outlined"
                    sx={{ 
                        width: "15%", 
                        marginBottom: "0.5%", 
                        '& input': {
                            textAlign: "center", // Center the input text
                        },
                        '& input::placeholder': { // Style the placeholder text
                            fontFamily: "Palatino", 
                            textAlign: "center",
                        } 
                    }}
                />

                {/* Disable buy button if unathenticated */}
                {authenticated && action != null 
                ?
                    <Button type="submit" variant="outlined" sx={buttonStyle}>
                        {action}
                    </Button>
                :
                    <div className="stock-purchase-unauthenticated">
                        <Button type="submit" variant="outlined" disabled sx={buttonStyle}>
                            {action == null ? <strong>...</strong> : action}
                        </Button>
                        <p>
                            Please <Link to={{pathname: "/login"}}>login</Link>
                        </p>
                    </div>
                }

                {/* Display error msg */}
                {msg !== "" && msg !== "success" ? (
                    <>
                        <RedAlert message={msg} marginTop="2"/>
                    </>
                ) : null}
            </div>
        </form>
    )
}

export default PurchaseForm;