import {useState} from 'react';
import useLogin from '../../api/Auth/useLogin';
import RedAlert from "../Alert/RedAlert";

function Login() {
    const [msg, setMsg] = useState("");
    const {login} = useLogin();

    function handleSubmit(e) {
        e.preventDefault();
        console.log("HEY!")
        const username = document.getElementsByName("login_username")[0].value;
        const password = document.getElementsByName("login_password")[0].value;
        login(setMsg, username, password);
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
                            <RedAlert message={msg} marginTop="5" />
                        </div>
                    : null
                    }
                    <button class="button-36" type="submit">Login</button>
                    <h6 className='login-no-account'>Don't have an account? <a href="/register">Register</a></h6>
                </form>
            </center>
            
        </div>
    )
}

export default Login;