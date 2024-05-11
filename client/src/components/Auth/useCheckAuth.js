import {useState, useEffect} from 'react';

function useCheckAuth() {

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_url}/auth/return_auth`, {
            method: 'GET',
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data => data.authenticated === true ? setAuthenticated(true) : null)
        .catch(err => console.log(err));
    }, [])

    return authenticated;
}

export default useCheckAuth;