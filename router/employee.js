const express = require("express");
const {
  emp_get,
  emp_put,
  emp_post,
  emp_patch,
  emp_delete,
} = require("../controllers/employee");
const router = express.Router();

router.get("/", emp_get);
router.post("/", emp_post);
router.put("/:id", emp_put);
router.patch("/:id", emp_patch);
router.delete("/:id", emp_delete);

module.exports = router;
