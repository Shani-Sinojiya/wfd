const express = require("express");
const router = express.Router();
const {
  restFood_post,
  restFood_get,
  restFood_patch,
} = require("../controllers/foodrequest");

router.get("/", restFood_get);
router.post("/", restFood_post);
router.patch("/", restFood_patch);

module.exports = router;
