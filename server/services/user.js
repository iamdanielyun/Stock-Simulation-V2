const User = require("../models/user");
const {
    getPriceService,
    getQuoteService,
    getLogoService
} = require("./company");

//******************************************************************PROFILE***************************************************** */
const profileService = async (req) => {

    //get user
    const user = await User.findOne({
        username: req.session.userid
    });

    var username = null;
    var investments = null;
    var stock_list = null;
    var stocks = null;
    var cash = null;

    //if valid user
    if (user) {
        username = user.username;
        investments = user.investments;
        stock_list = investments.stock_list;
        stocks = investments.stocks;
        cash = Number(investments.cash).toFixed(2);
        console.log(stock_list);

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

            stockInfoList.push({
                "symbol": symbol,
                "shares": shares,
                "currentPrice": current_price,
                "percentChange": percent_change,
                "logo": logo
            });
        }

        stock_list = stockInfoList;
        console.log(stock_list);

    }
    return {
        "user": username,
        "cash": cash,
        "stocks": stocks,
        "stock_symbols": stock_list
    };
};

//******************************************************************NUM SHARES***************************************************** */
const numSharesService = async(req) => {

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

//******************************************************************BUY/SELL***************************************************** */
const buySellService = async (req) => {
    
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

        return {
            "message": "success"
        };
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

        return {
            "message": "success"
        };
    }
}

//*****************************************************************DEPOSIT/WITHDRAW***************************************************** */
const despositWithdrawService = async (username, option, amount) => {
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
module.exports = {
    profileService,
    numSharesService,
    buySellService,
    despositWithdrawService
}