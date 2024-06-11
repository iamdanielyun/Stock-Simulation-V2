import {useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import useLogin from '../../api/Auth/useLogin';
import useGuestLogin from '../../api/Auth/useGuestLogin';
import RedAlert from "../Alert/RedAlert";

function Login() {
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const {login} = useLogin();
    const {guestLogin} = useGuestLogin();

    //handle regular login
    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const username = document.getElementsByName("login_username")[0].value;
        const password = document.getElementsByName("login_password")[0].value;
        login(setMsg, setLoading, username, password);
    }

    //handle guest login
    function handleGuestSubmit(e) {
        e.preventDefault();
        setLoading(true);
        guestLogin(setMsg, setLoading);
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
                    {loading ? <CircularProgress /> : <button class="button-36" type="submit">Login</button>}
                    <h6 className='login-no-account'>Don't have an account? <a href="/register">Register</a></h6>

                    <h6 style={{marginBottom: "2%"}}>OR</h6>
                    <button class="button-36" onClick={handleGuestSubmit}>Continue as guest</button>
                </form>
            </center>
            
        </div>
    )
}

export default Login;