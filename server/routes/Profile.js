const express = require("express");
const router  = express.Router();
const {auth} = require("../middleware/auth");
const { getUserDetails } = require("../controllers/Profile")

router.get("/getUserDetails",getUserDetails);

module.exports = router