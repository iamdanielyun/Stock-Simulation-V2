const bcrypt = require("bcrypt");
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
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Enter user into database with hashed password
        const new_user = new User({
            username: username,
            password: hashedPassword, 
            'investments.cash': 50000,           //start with $50000
            'history.time_created': new Date(),  //add time created
            'history.entries': [{ time: new Date(), total_value: 50000 }]
        });
        await new_user.save();

        //Set session
        req.session.userid = username;
        await req.session.save();

        //Send ok message
        return {
            "status": 201,
            "message": "User created"
        };
    } 
    catch (error) {
        console.error("Error creating user:", error);
        return {
            "status": 500,
            "message": "Internal Server Error"
        };
    }
}

//******************************************************************LOGIN***************************************************** */
const loginService = async (req, username, password) => {

    // If missing any fields
    if (!(username && password)) {
        return {
            "status": 401,
            "message": "Missing one of the fields"
        };
    }

    try {
        // Get user by username
        const user = await User.findOne({ username: username });

        // Check if user exists
        if (!user) {
            return {
                "status": 401,
                "message": "Wrong username and/or password"
            };
        }

        // Compare hashed passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match
        if (!passwordMatch) {
            return {
                "status": 401,
                "message": "Wrong username and/or password"
            };
        }

        // Set session
        req.session.userid = username;
        await req.session.save();

        return {
            "status": 201,
            "message": "Session created"
        };
    } 
    catch (error) {
        console.error("Error logging in:", error);
        return {
            "status": 500,
            "message": "Internal Server Error"
        };
    }
}

//******************************************************************LOGOUT***************************************************** */
const logoutService = (req, res) => {
    console.log("session: " + req.session.userid);
    console.log("Cookie.secure: " + JSON.stringify(req.headers.cookie.includes("Secure")));
    console.log("Cookie.sameSite: " + JSON.stringify(req.headers.cookie.includes("SameSite")));

    req.session.destroy(err => {
        if(err) {
            console.error(err);
            res.status(201).json({
                "status": 201,
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

//******************************************************************GUEST LOGIN***************************************************** */
const guestLoginService = async (req) => {

    try {
        const randomNumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
        const guestUsername = `guest${randomNumber}`;
        const guest = new User({
            username: guestUsername,
            password: "This doesn't matter", 
            'investments.cash': 50000,           //start with $50000
            'history.time_created': new Date(),  //add time created
            'history.entries': [{ time: new Date(), total_value: 50000 }]
        });
        await guest.save();
    
        //Set session
        req.session.userid = guestUsername;
        await req.session.save();

        return {
            "status": 201,
            "message": "Session created"
        };
    }
    catch(err) {
        console.error("Error guest login:", err);
        return {
            "status": 500,
            "message": "Internal Server Error"
        };
    }
};

module.exports = {
    registerService,
    loginService,
    logoutService,
    guestLoginService,
}