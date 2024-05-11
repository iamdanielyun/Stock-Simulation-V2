const express = require("express");
const router = express.Router();
const {
    getSymbols,
    getHistory,
    getPrice,
    getQuote,
    getDescription,
    getNews,
    getLogo,
    getInfo,
    test
} = require("../controllers/company");

router.get("/symbols_like/:symbol", getSymbols);
router.get("/history/:symbol", getHistory);
router.get("/current_price/:symbol", getPrice);
router.get("/quote/:symbol", getQuote);
router.get("/description/:symbol", getDescription);
router.get("/news/:symbol", getNews);
router.get("/logo/:symbol", getLogo);
router.get("/stock_info/:symbol", getInfo);

// router.get("/test/:symbol", test);
module.exports = router;
