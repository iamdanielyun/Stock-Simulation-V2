const Stock = require("../models/stock");
const axios = require("axios");
const {
    twelvedataPrice,
    twelvedataQuote,
    twelvedataHistory,
    twelvedataLogo
} = require("./twelvedata");

//******************************************************************getSYMBOLS()***************************************************** */
const getSymbolsService = async (query, limit) => {
    
    //Find all symbols starting with query or contains query
    const regexPattern = new RegExp("^" + query);
    const results = await Stock.find({
        symbol: {"$regex": regexPattern}
    })
    .limit(limit);

    // Sort the results by word length in increasing order
    results.sort((a, b) => a.symbol.length - b.symbol.length);
    
    return {
        "result": results
    };
}

//******************************************************************getPRICE()***************************************************** */
const getPriceService = async (symbol) => {
    const data = await twelvedataPrice(symbol);
    const currentPrice = data.price != null ? Number(data.price).toFixed(2) : null;
    return {
        "result": currentPrice
    }
}

//******************************************************************getQUOTE()***************************************************** */
const getQuoteService = async (symbol) => {
    const data = await twelvedataQuote(symbol);
    const name = data.name;
    const exchange = data.exchange;
    const change = data.change;
    const percentChange = data.percent_change;
    return {
        "symbol": symbol,
        "name": name,
        "exchange": exchange,
        "change": change,
        "percent_change": percentChange,
    };
}

//******************************************************************getLOGO()***************************************************** */
const getLogoService = async (symbol) => {
    const data = await twelvedataLogo(symbol);
    const imageUrl = data.url;
    return {
        "result": imageUrl
    };
}

//******************************************************************getHISTORY()***************************************************** */
const getHistoryService = async (symbol) => {
    const data = await twelvedataHistory(symbol);
    const values = data.values;
    var history = [];

    if(values != null)
    {
        for(var i = 0; i < values.length; i++)
        {
            const date = values[i].datetime;
            const closing_price = values[i].close;
            history.push({
                "Close": closing_price,
                "Date": date
            });
        }
    }
    return {
        "result": history
    }
}

//******************************************************************getNEWS()***************************************************** */
const getNewsService = async (symbol) => {
    const to = new Date();
    var to_day = to.getDate();
    var to_month = to.getMonth() + 1;
    const to_year = to.getFullYear();

    const from = new Date(to.getDate()-31);     //4 weeks (past month)
    var from_day = from.getDate();
    var from_month = from.getMonth() + 1;
    const from_year = from.getFullYear();

    //Add zeros in front of the dates if necessary
    if (to_day < 10) 
        to_day = `0${to_day}`;
    
    if (to_month < 10) 
        to_month = `0${to_month}`;

    if (from_day < 10) 
        from_day = `0${from_day}`;
    
    if (from_month < 10) 
        from_month = `0${from_month}`;
    

    const options = {
        method: 'GET',
        url: "https://finnhub.io/api/v1/company-news",
        params: {
            token: process.env.finnhub,
            symbol: symbol,
            from: `${from_year}-${from_month}-${from_day}`,
            to: `${to_year}-${to_month}-${to_day}`
        }
    };
    const response = await axios.request(options);
    const data = response.data;
    var news = null;

    //if valid
    if(data.length > 0)
        news = data;

    console.log("**********NEWS**********");
    console.log("News: " + news);
    return {
        "result": news
    };

}

//******************************************************************getDESCRIPTION()***************************************************** */
const getDescriptionService = async (symbol) => {
    const options = {
        method: 'GET',
        url: `https://financialmodelingprep.com/api/v3/profile/${symbol}`,
        params: {
            apikey: process.env.financialprep,
        }
    };
    const response = await axios.request(options);
    const data = response.data;
    var description = null;

    //if valid
    if(data.length > 0)
        description = data[0].description;

    console.log("*********DESCRIPTION**********");
    console.log("Description: " + description);
    return {
        "result": description
    };
}

//******************************************************************getINFO()***************************************************** */
const getInfoService = async (symbol) => {

    //current price
    const current_price_res = await getPriceService(symbol);
    const current_price = current_price_res.result;

    //quote
    const quote_res = await getQuoteService(symbol);
    const name = quote_res.name;
    const exchange = quote_res.exchange;
    const change = quote_res.change;
    const percent_change = quote_res.percent_change;

    //history 
    const history_res = await getHistoryService(symbol);
    const history = history_res.result;

    //description
    const description_res = await getDescriptionService(symbol);
    const description = description_res.result;

    return {
        "current_price" : current_price,
        "symbol" : symbol,
        "name" : name, 
        "exchange" : exchange, 
        "change" : change,
        "percent_change" : percent_change,
        "history" : history,
        "description" : description,
    }
}

//add symbols to mongoDB (just a one time thing)
const addSymbolsToMongoService = async () => {
    const options = {
        method: 'GET',
        url: 'https://api.twelvedata.com/stocks',
        params: {
          show_plan: true,
          apikey: process.env.twelvedata,
        },
    };
    const response = await axios.request(options);
    const data = response.data.data;

    for(var i = 0; i < data.length; i++)
    {
        const cur = data[i];
        const symbol = cur.symbol;
        const name = cur.name;
        const currency = cur.currency;
        const exchange = cur.exchange;
        const country = cur.country;
        const type = cur.type;
        const accessPlan = cur.access.plan;

        //Only if country == "United States" and plan is basic
        if(country == "United States" && accessPlan == "Basic")
        {
            const stock = new Stock({
                symbol: symbol,
                companyName: name,
                country: country,
                currency: currency,
                exchange: exchange,
                accessPlan: accessPlan,
                type: type
            })
            .save()
            .then(() => console.log(stock));
        }
    }

    return "ALL GOOD";
}
module.exports = {
    getSymbolsService,
    getPriceService,
    getQuoteService,
    getDescriptionService,
    getHistoryService,
    getNewsService,
    getLogoService,
    getInfoService,
    addSymbolsToMongoService
}