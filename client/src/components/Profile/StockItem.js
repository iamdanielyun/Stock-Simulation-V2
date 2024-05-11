import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

function StockItem(props) {
    const data = props.data;
    const symbol = data.symbol;
    const shares = data.shares;
    const currentPrice = data.currentPrice;
    const percentChange = Number(data.percentChange).toFixed(2);
    const logo = data.logo;

    //Green if up, red if down
    const arrow_class = percentChange > 0 ? "positive_arrow" : "negative_arrow";

    return (
        <Link to={`/company/${symbol}`}>
        <ListItem>
            <ListItemButton>
                <ListItemAvatar>
                    <Avatar
                    alt={`Oops!`}
                    src={logo}
                    />
                </ListItemAvatar>
                <ListItemText 
                    primary={
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <div>
                                <span style={{ fontSize: '1.1rem', fontFamily: 'Palatino' }}>{symbol}</span>
                                <span style={{ fontSize: '0.7rem', fontFamily: 'Palatino' }}> x{shares}</span>
                            </div>
                            <div style={{display: "flex", flexDirection: "column",}}>
                                <span style={{ fontSize: '0.9rem', fontFamily: 'Palatino' }}><b>${currentPrice}</b></span>
                                <span className={arrow_class} style={{ fontSize: '0.8rem', fontFamily: 'Palatino' }}><b> {percentChange}%</b></span>
                            </div>
                        </div>
                    } 
                />
            </ListItemButton>
        </ListItem>
        </Link>

    )
}

export default StockItem;