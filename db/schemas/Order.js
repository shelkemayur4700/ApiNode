const mongoose = require("mongoose");
const { Schema } = mongoose;

const Orderschema = new Schema({
  userName: {
    type: String,
  },
  totalAmount: {
    type: Number,
  },
  products: [String],
});
const Order = mongoose.model("Order", Orderschema);
module.exports = Order;
