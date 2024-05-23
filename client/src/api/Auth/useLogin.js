import { useNavigate } from "react-router-dom";

function useLogin() {    
    const navigate = useNavigate();
    const login = (setMsg, setLoading, username, password) => {
        fetch(`${process.env.REACT_APP_url}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
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
    return { login };
}

export default useLogin;
