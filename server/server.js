const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require("cors");
const server = express();
require('dotenv').config();

// imports from other files
const auth = require("./routes/auth");
const company = require("./routes/company");
const user = require("./routes/user");
const { portfolioValueJob } = require("./services/investmentsCron");

//Cors
const corsOptions = {
    origin: 'http://localhost:3000',
    //origin: 'https://stocksimulation.onrender.com',
    credentials: true, // Enable credentials (e.g., cookies, authorization headers)
};

//Mongodb store for storing sessions
const store = new MongoDBStore({
    uri: process.env.mongoDBuri,
    collection: 'sessions',
    ttl: 14 * 24 * 60 * 60,
    autoRemove: 'native',
});

//Middlewares
server.use(cors(corsOptions));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(session({
    store: store,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,    //milliseconds in a day
        secure: false,
        //secure: true,
        //sameSite: 'none',
        httpOnly: true,
    },  
    secret: [process.env.sessionSecret],
    saveUninitialized: false,
    resave: false
}));

//Connect routers
server.use(cors(corsOptions));
server.use("/auth", auth);
server.use("/auth", user);
server.use("/api", company);

//Connect to MongoDB Atlas
mongoose.connect(process.env.mongoDBuri);

server.get("/", async (req, res) => {
    res.send("HELLO WORLD");
})

server.listen(process.env.PORT, () => {
    console.log("Listening...");
})

//get entire value of every user's portfolio every hour
portfolioValueJob.start();