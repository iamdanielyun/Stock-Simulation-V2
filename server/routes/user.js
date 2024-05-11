const express = require("express");
const router = express.Router();
const { authenticated } = require("../controllers/auth");
const {
    profile,
    numShares,
    action,
    d_w
} = require("../controllers/user");

router.get("/numShares/:symbol", numShares)
router.get("/profile", authenticated, profile);
router.post("/action", authenticated, action);
router.post("/d_w", authenticated, d_w);
module.exports = router;
