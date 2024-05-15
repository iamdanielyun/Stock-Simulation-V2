import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
  
const StyledListItem = styled(ListItem)({
    maxHeight: '10vh',
    marginBottom: "5%"
});
  
const ContentTypography = styled(Typography)({
    fontSize: '0.9rem', 
    fontFamily: "Palatino"
});

function DropdownItem(props) {

    const symbol = props.symbol;
    var company = props.company;
    
    //Trim company if its too long
    if(company.length > 35)
        company = company.substring(0, 35) + "...";

    //Trim 
    return(
        <>
            <Link to={{pathname: `/company/${symbol}`}}>
                <StyledListItem>
                    <ContentTypography>
                        <p>
                            <h3><b>{symbol}</b></h3> 
                            {company} 
                        </p>
                    </ContentTypography>
                </StyledListItem>
            </Link>
        </>
    )
}

export default DropdownItem;