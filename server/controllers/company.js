const {
    getSymbolsService,
    getPriceService,
    getQuoteService,
    getDescriptionService,
    getHistoryService,
    getNewsService,
    getLogoService,
    getInfoService,
    addSymbolsToMongoService
} = require("../services/company");

//******************************************************************getSYMBOLS()***************************************************** */
const getSymbols = async (req, res) => {
    const query = req.params.symbol.toUpperCase();
    const limit = parseInt(req.query.limit) || 0;
    const result = await getSymbolsService(query, limit);
    return res.send(result);
}

//******************************************************************getPRICE()***************************************************** */
const getPrice = async (req, res) => {
    const symbol = req.params.symbol;
    const response = await getPriceService(symbol);
    return res.send(response);
}

//******************************************************************getQUOTE()***************************************************** */
const getQuote = async (req, res) => {
    const symbol = req.params.symbol;
    const response = await getQuoteService(symbol);
    return res.send(response);
}

//******************************************************************getDESCRIPTION()***************************************************** */
const getDescription = async (req, res) => {
    const symbol = req.params.symbol;
    const response = await getDescriptionService(symbol);
    return res.send(response);
}
//******************************************************************getHISTORY()***************************************************** */
const getHistory = async (req, res) => {
    const symbol = req.params.symbol;
    const result = await getHistoryService(symbol);
    return res.send(result);
}

//******************************************************************getNEWS()***************************************************** */
const getNews = async (req, res) => {
    const symbol = req.params.symbol;
    const result = await getNewsService(symbol);
    return res.send(result);
}

//******************************************************************getNEWS()***************************************************** */
const getLogo = async (req, res) => {
    const symbol = req.params.symbol;
    const result = await getLogoService(symbol);
    return res.send(result);
}

//******************************************************************getINFO()***************************************************** */
const getInfo = async (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    const result = await getInfoService(symbol);
    return res.send(result);
}

//add entire stock list to mongodb
const addSymbolsToMongo = async (req, res) => {
    const result = await addSymbolsToMongoService();
    return res.send(result);
}


module.exports = {
    getSymbols,
    getHistory,
    getPrice,
    getQuote,
    getDescription,
    getNews,
    getLogo,
    getInfo, 
    addSymbolsToMongo
}