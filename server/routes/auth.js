const express = require("express");
const router = express.Router();
const {
  authenticated,
  return_auth,
  register,
  login,
  logout
} = require("../controllers/auth");

router.get("/return_auth", return_auth);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticated, logout);
module.exports = router;
