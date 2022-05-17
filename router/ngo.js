const express = require("express");
const {
  ngo_get,
  ngo_post,
  ngo_patch,
  ngo_delete,
  ngo_put,
} = require("../controllers/ngo");
const router = express.Router();

router.get("/", ngo_get);
router.post("/", ngo_post);
router.put("/:id", ngo_put);
router.patch("/:id", ngo_patch);
router.delete("/:id", ngo_delete);

module.exports = router;
