const express = require("express");
const login_post = require("../controllers/login");
const router = express.Router();

router.post("/:code", login_post);

module.exports = router;
