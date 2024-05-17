import {useState} from 'react';
import useRegister from '../../api/Auth/useRegister';
import RedAlert from '../Alert/RedAlert';

function Register() {
    const [msg, setMsg] = useState("");
    const {register} = useRegister();

    function handleSubmit(e) {
        e.preventDefault();

        const username = document.getElementsByName("register_username")[0].value;
        const password = document.getElementsByName("register_password")[0].value;
        const confirmation = document.getElementsByName("register_confirmation")[0].value;
        register(setMsg, username, password, confirmation);
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
                        <RedAlert message={msg} marginTop="5" />
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