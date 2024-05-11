const User = require("../models/user");
const {
    profileService,
    numSharesService,
    buySellService,
    despositWithdrawService
} = require("../services/user");

//******************************************************************PROFILE***************************************************** */
const profile = async (req, res) => {
    const result = await profileService(req);
    return res.send(result);
}

//******************************************************************NUM SHARES***************************************************** */
const numShares = async (req, res) => {
    const result = await numSharesService(req);
    return res.send(result);
}

//******************************************************************BUY/SELL***************************************************** */
const action = async (req, res) => {
    const result = await buySellService(req);
    return res.send(result);
}

//*****************************************************************DEPOSIT/WITHDRAW***************************************************** */
const d_w = async (req, res) => {
    const username = req.session.userid;
    const amount = Number(req.body.amount);
    const option = req.body.option;
    // const password = req.body.password;
    const result = await despositWithdrawService(username, option, amount);
    return res.send(result);
}

module.exports = {
    profile,
    numShares,
    action,
    d_w
}