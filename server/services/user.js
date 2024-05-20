const User = require("../models/user");
const {
    getPriceService,
    getQuoteService,
    getLogoService
} = require("./company");

//******************************************************************Investment History***************************************************** */
const userHistoryService = (user) => {
    try {
        const options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const entries = user.history.entries;
        const length = entries.length - 1;
        const step = Math.ceil(length / length);
        var labels = [];
        var values = [];

        for (var i=0; i<length; i+=step)
        {
            const time = entries[i].time.toLocaleString("en-US", options);
            const value = entries[i].total_value;
            labels.push(time);
            values.push(value);
        }

        //Add the most recent entry
        const finalTime = entries[length].time.toLocaleString("en-US", options);
        const finalValue = entries[length].total_value;
        labels.push(finalTime);
        values.push(finalValue);
        return {
            labels, 
            values
        };
    }
    catch(err) {
        console.log(err);
    }
}

//******************************************************************Portfolio Value***************************************************** */
const portfolioValueService = async (user) => {
    try {
        const username = user.username;
        const investments = user.investments;
        const stocks = investments.stocks;
        const cash = parseFloat(investments.cash);
        let stock_list = investments.stock_list;
        let oldTotal = cash;
        let newTotal = cash;

        //Add up each stock's purchase price
        for (const stock of stocks) {
            oldTotal += parseFloat(stock.price_purchased);
        }   

        //for each unique stock, get its current price, percent change and logo
        var stockInfoList = [];
        for (const stock of stock_list) {
            const symbol = stock.symbol;
            const shares = stock.count;

            //current price
            const current_price_res = await getPriceService(symbol);
            const current_price = current_price_res.result;

            //percent change
            const quote_res = await getQuoteService(symbol);
            const percent_change = quote_res.percent_change;

            //logo
            const logo_res = await getLogoService(symbol);
            const logo = logo_res.result;

            //Add to new total value of investments
            newTotal += (parseFloat(current_price) * parseFloat(shares));
            stockInfoList.push({
                "symbol": symbol,
                "shares": shares,
                "currentPrice": current_price,
                "percentChange": percent_change,
                "logo": logo
            });
        }

        //Place an entry into user's history
        await User.findByIdAndUpdate(
            user._id,
            { $push: { 'history.entries': { time: new Date(), total_value: newTotal } } },
            { new: true }
        );
        console.log("Updated user " + user.username + " with total value of " + newTotal + " and " + stock_list.length + " unique stocks");
        
        stock_list = stockInfoList;
        console.log(stock_list);

        return {
            username, 
            cash,
            stocks,
            stock_list,
            oldTotal,
            newTotal,
        };
    }
    catch(err) {
        console.log(err);
    }
}
//******************************************************************PROFILE***************************************************** */
const profileService = async (req) => {
    try {
        //get user
        const user = await User.findOne({
            username: req.session.userid
        });

        //if valid user
        if (user) {
            //Total portfolio value
            const {username, cash, stocks, stock_list, oldTotal, newTotal} = await portfolioValueService(user);
            const change = (newTotal - oldTotal) / oldTotal;
            const percentChange = change * 100;

            //portfolio entries for graph
            const {labels, values} = userHistoryService(user);

            return {
                "user": username,
                "cash": cash.toFixed(2),
                "stocks": stocks,
                "stock_symbols": stock_list,
                "oldTotal": oldTotal.toFixed(2),
                "newTotal": newTotal.toFixed(2),
                "percentChange": percentChange.toFixed(2),
                "labels": labels,
                "values": values
            };
        }
    }
    catch(err) {
        console.log(err);
    }
};

//******************************************************************NUM SHARES***************************************************** */
const numSharesService = async(req) => {
    try {
        //How many shares of this stock does the user own?
        const symbol = req.params.symbol;
        var shares = 0;

        if(req.session.userid)
        {
            const user = await User.findOne({
                username: req.session.userid
            });

            const stock_list = user.investments.stock_list;
            for(const stock of stock_list)
            {
                //Found a match
                if(stock.symbol == symbol)
                    shares = stock.count;
            }
        }
        return {
            "shares": shares
        };
    }
    catch(err) {
        console.log(err);
    }
}

//******************************************************************BUY/SELL***************************************************** */
const buySellService = async (req) => {
    try {
        //params
        const action = req.body.action;
        const symbol = req.body.symbol;
        const price = req.body.price;
        const shares = req.body.shares;
        const company = req.body.name;

        //get user
        const user = await User.findOne({
            username: req.session.userid
        });

        if(!user)
            return {
                "status": 500,
                "message": "Something went wrong"
            };

        var investments = user.investments;
        var stock_symbols = investments.stock_list;
        var cash = investments.cash;
        
        //buy
        if(action.toLowerCase() === "buy")
        {
            //Prevent bulk buy because it takes too much time on MongoDB
            if(Number(shares) > 50) {
                return {
                    "status": 400,
                    "message": "Please buy in small increments (no more than 50 shares at once)"
                }
            }

            //Does user have enough cash?
            const amountToDeduct = shares * price;
            if(cash < amountToDeduct) {
                return {
                    "message": "Insufficient funds"
                };
            }

            //Subtract amount from cash
            var update = await User.updateOne(
                {username: user.username},
                {$set: {
                    "investments.cash": cash - amountToDeduct
                }}
            );

            //Increment count if already have this stock
            var already_have = false;
            stock_symbols.forEach(stock => {
                const current_count = stock.count;

                if(stock.symbol === symbol) {
                    already_have = true;
                    User.updateOne(
                        {
                            username: user.username,
                        },
                        {$set: {
                            "investments.stock_list.$[element].count": Number(current_count + Number(shares))
                        }},
                        { arrayFilters: [ { "element.symbol": { $eq: symbol } } ] }
                    )
                    .then(response => console.log(response));
                }
            })

            //if not, add it 
            if(!already_have)
            {
                update = await User.updateOne(
                    {username: user.username},
                    {$push: {
                        "investments.stock_list": {
                            symbol: symbol,
                            company: company,
                            count: shares
                        }
                    }}
                );
            }

            //For every share, enter one entry into 'stocks'
            for(let i=0; i<shares; i++)
            {
                update = await User.updateOne(
                    {username: user.username},
                    {$push: {
                        "investments.stocks": {
                            symbol: symbol,
                            company: company,
                            price_purchased: price
                        }
                    }}
                );
            }
        }
                        
        //if action is sell
        else
        {
            const shares_to_sell = shares;
            const shares_owned = req.body.sharesOwned;

            //Prevent bulk sell because it takes too much time on mongoDB
            if(Number(shares_to_sell) > 50) {
                return {
                    "message": "Please sell in small increments (no more than 50 shares at once)"
                };
            }    

            //Add amount to cash
            var update = await User.updateOne(
                {username: user.username},
                {$set: {
                    "investments.cash": cash + (shares_to_sell * price)
                }}
            );

            //if selling all stocks, remove this stock from stock_list
            if(shares_to_sell == shares_owned)
            {
                const dte = await User.updateOne(
                    {
                        username: user.username,
                    },
                    {
                        $pull: {
                            "investments.stock_list": {symbol: symbol}
                        }
                    }
                )
                // .then(response => console.log(response));
            }
            else
            {
                //else update stock_list
                stock_symbols.forEach(stock => {
                    const current_count = stock.count;

                    if(stock.symbol === symbol) {
                        User.updateOne(
                            {
                                username: user.username,
                            },
                            {$set: {
                                "investments.stock_list.$[element].count": Number(current_count - Number(shares_to_sell))
                            }},
                            { arrayFilters: [ { "element.symbol": { $eq: symbol } } ] }
                        )
                        .then(response => console.log(response));
                    }
                })
            }

            //Remove from all_stocks
            var all_stocks = user.investments.stocks;
            var removed = 0;
            var ids = [];

            for(let i=0; i<all_stocks.length; i++)
            {
                if(all_stocks[i].symbol === symbol)
                {
                    ids.push(all_stocks[i]._id);
                    removed++;
                }

                if(removed == shares_to_sell) {
                    console.log("break")
                    break;
                }
            }

            for(let i=0; i<ids.length; i++)
            {
                const dte = await User.updateOne(
                    {
                        username: user.username,
                    },
                    {
                        $pull: {
                            "investments.stocks": {_id: ids[i]}
                        }
                    }
                )
            }  
        }        
        return {
            "message": "success"
        };
    }
    catch(err) {
        console.log(err);
    }
}

//*****************************************************************DEPOSIT/WITHDRAW***************************************************** */
const despositWithdrawService = async (username, option, amount) => {
    try {
        const user = await User.findOne({
            username: username,
        });

        //if user doesn't exist for some reason
        if(!user)
        {
            return {
                "status": 500,
                "message": "Something went wrong"
            };
        }

        //current balance
        const current_cash = user.investments.cash;

        if(option.toLowerCase() === 'deposit')
        {
            try {
                var update = await User.updateOne(
                    {username: username},
                    {$set: {
                        "investments.cash": (current_cash + amount)
                    }}
                )
            }
            catch(err) {
                console.log(err);
            }
        }
        else
        {
            //trying to withdraw more than they have
            if(current_cash < amount) {
                return {
                    "status": 401,
                    "message": "Insufficient funds"
                };
            }
            try {
                var update = await User.updateOne(
                    {username: username},
                    {$set: {
                        "investments.cash": (current_cash - amount)
                    }}
                )
            }
            catch(err) {
                console.log(err);
            }
        }
        return {
            "status": 201,
            "message": "success"
        };
    }
    catch(err) {
        console.log(err);
    }
}
module.exports = {
    profileService,
    numSharesService,
    buySellService,
    despositWithdrawService
}