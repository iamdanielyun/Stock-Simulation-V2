// import {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import ListItem from '@mui/material/ListItem';
// import Divider from '@mui/material/Divider';
// import Chip from '@mui/material/Chip';

// const Root = styled('div')(({ theme }) => ({
//     width: '100%',
//     position: 'relative',
//     ...theme.typography.body2,
//     color: theme.palette.text.secondary,
//     '& > :not(style) ~ :not(style)': {
//       marginTop: theme.spacing(2),
//     },
//   }));

//   const StyledDivider = styled(Divider)({
//     position: 'relative'
//   })

//   const StyledListItem = styled(ListItem)({
//     maxHeight: '15%', // Adjust the height of each list item as needed
//     overflowY: 'auto',
//     position: 'absolute'
//   });

//   const content = (
//     <p>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}</p>
//   );

// var g_symbol = "";

// //Handle when user selects one of the symbols listed
// // function handle(setClicked, symbol) {
// //     setClicked(true); 
// //     document.getElementById("dropdown_menu").style.display = "none";
// //     document.getElementById("searchFormSymbol").value = symbol;
// //     g_symbol = symbol;
// // }

// function SymbolsDropdown(props) {
//     // console.log("HEY");
//     // const [data, setData] = useState([]);
//     // const navigate = useNavigate();
//     // var [clicked, setClicked] = useState(false);
     
//     // useEffect(() => {
//     //     fetch(`${process.env.REACT_APP_url}/api/symbols_like/${props.data}`, {
//     //         credentials: 'include'
//     //     })
//     //     .then(response => response.json())
//     //     .then(data => setData(data.data))
//     //     .catch(err => console.log(err));
//     // }, [props.data]);

//     const sample = [
//         "A",
//         "AA",
//         "AAL",
//         "AAP",
//         "AAPL",
//         "AMZN",
//     ]
//     return (
//         <div className="search-form-dropdown">
//             <Root>
//                 {content}
//                 <StyledDivider></StyledDivider>
//                 {content}
//                 <Divider></Divider>
//                     <StyledListItem>{content}</StyledListItem>
//                 <Divider></Divider>
//                     {content}
//                 <Divider></Divider>
//                     {content}
//                 <Divider></Divider>
//                     {content}
//             </Root>
//             {/* List out all the symbols like what the user searched */}
//             {/* <div className='list-group'>
//                 hello
//                 {data.length > 0 ? 
//                 data.map((instrument,i) => {
//                     const symbol = instrument.symbol;
//                     const name = instrument.instrument_name;

//                     return (
//                         <Link to={{
//                             pathname: `/company/${symbol}`
//                           }} key={i} className="list-group-item list-group-item-action" onClick={() => handle(setClicked, symbol)}>
//                                 <b>{symbol}</b> 
//                                 <p className="instrument_name">{name}</p>
//                           </Link>
//                     )})
//                     : <h5>No results</h5>
//                 }
//             </div>       */}
//         </div>
        
//     )
// }

// export default SymbolsDropdown;
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

const StyledListItem = styled(ListItem)({
  overflowY: 'auto',
  maxHeight: '20vh',
});

const ContentTypography = styled(Typography)({
  fontSize: '0.9rem', 
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
                            <StyledListItem>
                                <ContentTypography>
                                    {/* Each symbol */}
                                    <DropdownItem 
                                        symbol={item.symbol} 
                                        company={item.companyName}
                                    />
                                </ContentTypography>
                                </StyledListItem>
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
