import { useState, useEffect } from 'react';

function useCheckAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState("user");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_url}/auth/return_auth`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            setAuthenticated(data.authenticated === true);
            setUsername(data.username);
            setLoading(false);  
        })
        .catch(err => {
            console.log(err);
            setLoading(false);  
        });
    }, []);

    return { authenticated, username, loading };  
}

export default useCheckAuth;
