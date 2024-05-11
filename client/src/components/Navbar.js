import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import useCheckAuth from "./Auth/useCheckAuth";
import SearchForm from "./SearchBar/SearchForm";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {
    const authenticated = useCheckAuth();    
    const location = useLocation();
    const home = "<SS />"
    return (
        <div>
            <nav className="navbar">
                <ul className="left-item">
                    <li key={"username"}>
                        <Link to={"/"}><strong>{home}</strong></Link>
                    </li>
                </ul>
          
                <ul className="nav-list">
                    <li key={"search-form"} className="search-form">
                        <SearchForm />
                    </li>
                    <li key={"profile"}>
                        <Link to={"/profile"}><AccountCircleIcon style={{fontSize: "40px"}}/></Link>
                    </li>

                    {authenticated 
                    ? 
                        <li key={"logout"}>
                            <Link to={"/logout"}><LogoutIcon  style={{fontSize: "40px"}}/></Link>
                        </li>
                    : 
                        <li key={"login"}>
                            <Link to={"/login"}><LoginIcon  style={{fontSize: "40px"}}/></Link>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;