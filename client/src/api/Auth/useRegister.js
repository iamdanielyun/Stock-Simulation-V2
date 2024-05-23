import { useNavigate } from "react-router-dom";

function useRegister() {    
    const navigate = useNavigate();
    const register = (setMsg, setLoading, username, password, confirmation) => {
        fetch(`${process.env.REACT_APP_url}/auth/register`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
                confirmation: confirmation
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setLoading(false);
            if(data.status === 201) {
                navigate("/profile");
                window.location.reload(true);   
            }
            else {
                setMsg(data.message);
            }
        })
        .catch(err => console.log(err));
    }
    return { register };
}

export default useRegister;
