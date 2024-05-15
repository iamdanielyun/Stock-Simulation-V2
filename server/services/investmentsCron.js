const cron = require('node-cron');
const User = require("../models/user");
const { getPriceService } = require("./company");

//Get the entire value of every user's portfolio every hour
const getPortfolioValue = async () => {
    
    console.log("starting job...");
    try {
        //Get all users
        const users = await User.find();
        for (const user of users)
        {
            const investments = user.investments;
            const stocks = investments.stock_list;      
            const cash = investments.cash;
            var totalValue = cash;

            //For each unique stock, get current price
            for (const stock of stocks)
            {
                const symbol = stock.symbol;
                const numShares = stock.count;

                //Get current price of this stock
                const { result } = await getPriceService(symbol);

                //Add currentPrice * numshares to total value
                totalValue += parseFloat(result * numShares);
            }

            //2 decimal points
            totalValue = totalValue.toFixed(2);

            //Current time
            const time = new Date();

            //Update
            await User.findByIdAndUpdate(
                user._id,
                { $push: { 'history.entries': { time: time, total_value: totalValue } } },
                { new: true }
            );
            console.log("Updated user " + user.username + " with total value of " + totalValue + " and " + stocks.length + " unique stocks");
        }
    }
    catch (err) {
        console.log(err);
    }
}

//cron job for the above service (runs every hour)
const portfolioValueJob = cron.schedule("0 * * * *", getPortfolioValue, {
    scheduled: false,
    timezone: "America/New_York"
})

module.exports = {
    portfolioValueJob
}