const {
    registerService,
    loginService,
    logoutService
} = require("../services/auth");

//Check authentication middleware
const authenticated = (req, res, next) => {
    if(req.session) 
    {
        if(!req.session.userid) {
            console.log("Need user id");
            res.send("Not authenticated")
        }
        else {
            next();
        }
    }
    else{
        console.log("No session in the first place.");
        res.send("No session in the first place.");
    }   
}

//Return the authentication status of user
const return_auth = (req, res) => {
    res.send({
        "authenticated": req.session.userid != undefined,
        "username": req.session.userid ? req.session.userid : "user"
    })
}

//******************************************************************REGISTER***************************************************** */
const register = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmation = req.body.confirmation;
    const result = await registerService(req, username, password, confirmation);
    return res.send(result);
}

//******************************************************************LOGIN***************************************************** */
const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = await loginService(req, username, password);
    return res.send(result);
}

//******************************************************************LOGOUT***************************************************** */
const logout = (req, res) => {
    logoutService(req, res);
}

module.exports = {
    authenticated,
    return_auth,
    register,
    login,
    logout
}