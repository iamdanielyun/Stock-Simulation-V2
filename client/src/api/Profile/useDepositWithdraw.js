import { useNavigate } from "react-router-dom";

function useDepositWithdraw() {    
    const navigate = useNavigate();

    //Purchase stock
    const depositWithdraw = (setMsg, action, amount) => {
        fetch(`${process.env.REACT_APP_url}/auth/d_w`, {
            method: "POST",
            body: JSON.stringify({
                option: action,
                amount: amount,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setMsg(data.message);

            if(data.message === "success")
            {
                navigate("/profile");
                window.location.reload(true);      
            }
        })
        .catch(err => console.log(err));
    }
    return { depositWithdraw };
}

export default useDepositWithdraw;
