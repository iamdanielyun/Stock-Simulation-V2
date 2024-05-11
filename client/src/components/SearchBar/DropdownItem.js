import { Link } from 'react-router-dom';

function DropdownItem(props) {

    const symbol = props.symbol;
    var company = props.company;
    
    //Trim company if its too long
    if(company.length > 45)
        company = company.substring(0, 45) + "...";

    //Trim 
    return(
        <>
            <Link 
                to={{pathname: `/company/${symbol}`}} 
                style={{
                    fontFamily: `Palatino`, 
                }}>
                    <p>
                        <h3><b>{symbol}</b></h3> 
                        {company} 
                    </p>
            </Link>
        </>
    )
}

export default DropdownItem;