const User = require("../models/user");

//******************************************************************REGISTER***************************************************** */
const registerService = async (req, username, password, confirmation) => {

     //If missing any fields
     if(!(username && password && confirmation)) {
        return {
            "status": 401,
            "message": "Missing one of the fields"
        };
    }

    //if password != confirmation
    if(password != confirmation) {
        return {
            "status": 401,
            "message": "Password does not match confirmation"
        };
    }

     //Check if user already exists
     const user = await User.findOne({
        username: username
    });

    if(user) {
        return {
            "status": 401,
            "message": "Username taken"
        };
    }

    //Enter user into database
    const new_user = new User({
        username: username,
        password: password, 
        'investments.cash': 1000       //start with $1000
    }).save();

    //Set session
    req.session.userid = username;
    await req.session.save();

    //Send ok message
    return {
        "status": 201,
        "message": "User created"
    };
}

//******************************************************************LOGIN***************************************************** */
const loginService = async (req, username, password) => {

    //If missing any fields
    if(!(username && password)) {
        return {
            "status": 401,
            "message": "Missing one of the fields"
        };
    }

    //Get user
    const user = await User.findOne({
        username: username,
        password: password
    });

    if(!user) {
        return {
            "status": 401,
            "message": "Wrong username and/or password"
        };
    }

    //Set session
    req.session.userid = username;
    await req.session.save()

    return {
        "status": 201,
        "message": "Session created"
    };
}

//******************************************************************LOGOUT***************************************************** */
const logoutService = (req, res) => {
    console.log("session: " + req.session.userid);
    console.log("Cookie.secure: " + JSON.stringify(req.headers.cookie.includes("Secure")));
    console.log("Cookie.sameSite: " + JSON.stringify(req.headers.cookie.includes("SameSite")));

    req.session.destroy(err => {
        if(err) {
            console.error(err);
            res.status(500).json({
                "status": 500,
                "message": "failure"
            });
        } else {
            res.clearCookie('cookie', { path: '/' });
            console.log("logged out user");
            res.status(201).json({
                "status": 201,
                "message": "success"
            });
        }
    });
};

module.exports = {
    registerService,
    loginService,
    logoutService
}