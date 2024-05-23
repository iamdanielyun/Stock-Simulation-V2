import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import DropdownItem from './DropdownItem';
import useGetSymbols from '../../api/SymbolsDropdown/useGetSymbols';

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
    // const sample = ["A", "AA", "AAL", "AAP", "AAPL", "AMZN"];
    const sample = [
        {
            "symbol": "AAPL",
            "companyName": "Aaple Inc."
        },
        {
            "symbol": "TSLA",
            "companyName": "Tesla Inc."
        }
    ]
    const query = props.data;
    const data = useGetSymbols(query);

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
