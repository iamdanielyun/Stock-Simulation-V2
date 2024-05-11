import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const [result, setResult] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_url}/auth/logout`, {
            method: "POST",
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setResult(data.message);

            if(data.message === "success")
            {
                navigate("/");
                window.location.reload(true);
            }
        })
        .catch(err => console.log(err));
    }, [])

    return (
        <div className="home">
            <h1><b>...</b></h1>
        </div>
    )
}

export default Logout;