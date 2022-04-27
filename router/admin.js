const express = require("express");
const {
  adminlogin_post,
  adminlogin_post_create,
} = require("../controllers/admin");
const router = express.Router();

router.post("/", adminlogin_post);
router.post("/signup", adminlogin_post_create);

module.exports = router;
