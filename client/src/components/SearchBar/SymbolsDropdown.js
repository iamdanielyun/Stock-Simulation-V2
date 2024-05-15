import { useState, useEffect } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import DropdownItem from './DropdownItem';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  position: 'relative',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

const StyledDivider = styled(Divider)({
  position: 'relative',
  width: '110%'
});

function SymbolsDropdown(props) {
    const sample = ["A", "AA", "AAL", "AAP", "AAPL", "AMZN"];
    const [data, setData] = useState(null);

    //Get related symbols to keyword
    useEffect(() => {
        fetch(`${process.env.REACT_APP_url}/api/symbols_like/${props.data}?limit=15`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            setData(data.result); 
            console.log("data: " + JSON.stringify(data))
        })
        .catch(err => console.log(err));
    }, [props.data]);

    if(data != null)
    {
        
    
    return (
        <div className="search-form-dropdown">
            <Root>
                <Grid container spacing={1}>
                    {data != null && data.length > 0 && data.map((item, index) => (
                        <Grid item xs={12} key={index}>
                            {/* Each symbol */}
                            <DropdownItem 
                                symbol={item.symbol} 
                                company={item.companyName}
                            />
                            <StyledDivider />
                        </Grid>
                    ))}
                </Grid>
            </Root>
        </div>
    );
    }
}

export default SymbolsDropdown;
