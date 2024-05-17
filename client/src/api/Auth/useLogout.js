import { useNavigate } from "react-router-dom";

function useLogout() {    
    const navigate = useNavigate();
    const logout = () => {
        fetch(`${process.env.REACT_APP_url}/auth/logout`, {
            method: "POST",
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            if(data.message === "success")
            {
                navigate("/");
                window.location.reload(true);
            }
        })
        .catch(err => console.log(err));
    }
    return { logout };
}

export default useLogout;
