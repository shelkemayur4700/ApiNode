const express = require("express");
const {
  placeOrder,
  getTotalOrderAmount,
} = require("../controllers/ordercontroller");
const router = express.Router();

router.post("/", placeOrder);
router.get("/total", getTotalOrderAmount);

module.exports = router;
