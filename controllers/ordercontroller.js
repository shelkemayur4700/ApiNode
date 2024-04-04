const { saveOrder, calculateTotalOrder } = require("../db/db");
// CREATING ORDER
const placeOrder = async (req, res, next) => {
  try {
    let orderResponse = await saveOrder(req.body);
    if (orderResponse) {
      res.json({
        status: "sucess",
        orderResponse,
      });
    }
  } catch (error) {
    next(error);
  }
};
// GET TOTALORDER AMOUNTS OF USER
const getTotalOrderAmount = async (req, res, next) => {
  try {
    const orderamount = await calculateTotalOrder(req.query.name);
    if (orderamount) {
      res.json({
        status: "success",
        orderamount,
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { placeOrder, getTotalOrderAmount };
