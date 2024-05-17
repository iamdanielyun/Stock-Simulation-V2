import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import SearchForm from "./SearchBar/SearchForm";
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useCheckAuth from "../api/Auth/useCheckAuth";
import useLogout from "../api/Auth/useLogout";

function Navbar() {
    const {authenticated} = useCheckAuth();    
    const location = useLocation();
    const {logout} = useLogout();

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
                        <Link to={"/profile"}>
                            <Button sx={{display: "flex", flexDirection: "column", color: "black"}}>
                                <AccountCircleIcon style={{fontSize: "40px"}}/>
                                <span>Profile</span>
                            </Button>
                        </Link>
                    </li>

                    {authenticated 
                    ? 
                        <li key={"logout"}>
                            <Button onClick={logout} sx={{display: "flex", flexDirection: "column"}}>
                                <LogoutIcon style={{fontSize: "40px"}}/> 
                                <span>Logout</span>
                            </Button>
                            {/* <Link to={"/logout"}><LogoutIcon  style={{fontSize: "40px"}}/></Link> */}
                        </li>
                    : 
                        <li key={"login"}>
                            <Link to={"/login"}>
                                <Button sx={{display: "flex", flexDirection: "column", color: "black"}}>
                                    <LoginIcon style={{fontSize: "40px"}}/>
                                    <span>Login</span>
                                </Button>
                            </Link>
                        </li>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;