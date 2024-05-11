import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();
    const [msg, setMsg] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const username = document.getElementsByName("register_username")[0].value;
        const password = document.getElementsByName("register_password")[0].value;
        const confirmation = document.getElementsByName("register_confirmation")[0].value;

        fetch(`${process.env.REACT_APP_url}/auth/register`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
                confirmation: confirmation
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
                navigate("/register");
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="login">
            <center>
                <h1>Hi there!</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name="register_username" class="underline" placeholder="Username"/>
                    <input type="password" name="register_password" class="underline" placeholder="Password"/>
                    <input type="password" name="register_confirmation" class="underline" placeholder="Confirm password"/>

                    {/* Display Error msg if any */}
                    {msg != "" ? 
                    <div className="error-msg">
                        *{msg}*
                    </div>
                    : null
                    }

                    <button class="button-36" type="submit">Register</button>
                    <h6>Already have an account? <a href="/login"><u>Login</u></a></h6>
                </form>
            </center>
            
        </div>
    )
}

export default Register;