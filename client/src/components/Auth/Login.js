import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const [msg, setMsg] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log("HEY!")
        const username = document.getElementsByName("login_username")[0].value;
        const password = document.getElementsByName("login_password")[0].value;
        
        fetch(`${process.env.REACT_APP_url}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);

            if(data.status === 201) {
                navigate("/profile");
                window.location.reload(true);   
            }
            else {
                setMsg(data.message);
                navigate("/login");
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="login">
            <center>
                <h1>Welcome back!</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name="login_username" class="underline" placeholder="Username"/>
                    <input type="password" name="login_password" class="underline" placeholder="Password"/>

                    {/* Display Error msg if any */}
                    {msg != "" ? 
                    <div className="error-msg">
                        *{msg}*
                    </div>
                    : null
                    }
                    <button class="button-36" type="submit">Login</button>
                    <h6>Don't have an account? <a href="/register"><u>Register</u></a></h6>
                </form>
            </center>
            
        </div>
    )
}

export default Login;