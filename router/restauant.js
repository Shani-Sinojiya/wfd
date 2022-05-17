const express = require("express");
const {
  rest_get,
  rest_post,
  rest_patch,
  rest_delete,
  rest_put,
} = require("../controllers/restaurant");
const router = express.Router();

router.get("/", rest_get);
router.post("/", rest_post);
router.put("/:id", rest_put);
router.patch("/:id", rest_patch);
router.delete("/:id", rest_delete);

module.exports = router;
