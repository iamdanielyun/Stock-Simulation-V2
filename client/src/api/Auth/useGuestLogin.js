import { useNavigate } from "react-router-dom";

function useGuestLogin() {    
    const navigate = useNavigate();
    const guestLogin = (setMsg, setLoading) => {
        fetch(`${process.env.REACT_APP_url}/auth/login_guest`, {
            method: "POST",
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
    return { guestLogin };
}

export default useGuestLogin;
