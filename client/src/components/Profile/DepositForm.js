import {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import RedAlert from '../Alert/RedAlert';
import useDepositWithdraw from '../../api/Profile/useDepositWithdraw';

function DepositForm(props) {
    const [action, setAction] = useState('Deposit');
    const [amount, setAmount] = useState(100);
    const [msg, setMsg] = useState("");
    const { depositWithdraw } = useDepositWithdraw();
    const cash = props.cash;

    //Submit deposit/withdraw form
    function handleSubmit(e) {
        e.preventDefault();

        //invalid amount
        if(amount == ""|| amount == null || amount <= 0)
            setMsg("Please enter a valid amount");
        else
            depositWithdraw(setMsg, action, amount);
    }

    return (
        <ListItem sx={{display: "flex", flexDirection: "column"}}>
                <ListItemText 
                    primary={
                        <h3 style={{fontFamily: "Palatino"}}>Buying power: ${cash}</h3>
                    }
                />
                <form onSubmit={e => handleSubmit(e)} style={{display: "flex", flexDirection: "row", justifyContent: "center", gap: "1%"}}>
                    <Select
                        value={action}
                        onChange={e => {setAction(e.target.value)}}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{width: "30%"}}
                        >
                        <MenuItem value="Deposit">Deposit</MenuItem>
                        <MenuItem value="Withdraw">Withdraw</MenuItem>
                    </Select>
                    <TextField 
                        id="standard-number" 
                        value={amount}
                        onChange={e => {setAmount(e.target.value); console.log(amount)}}
                        type="number"
                        label="$ Amount" 
                        variant="outlined" 
                        inputProps={{min: 0.01, step: .01}}
                        sx={{width: "30%"}}
                    />
                    <Button 
                        type="submit" 
                        variant="outlined"
                        sx={{width: "30%"}}
                    >
                        {action}
                    </Button>
                </form>
                
                {/* Display error */}
                { (msg != "" && msg != "success") ? <RedAlert message={msg} marginTop="5"/> : null }
        </ListItem>
    )
}

export default DepositForm;