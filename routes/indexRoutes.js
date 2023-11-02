const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { current } = require("../controllers/indexController");
const router = express.Router();

router.get("/current", isAuthenticated, current);

module.exports = router;
