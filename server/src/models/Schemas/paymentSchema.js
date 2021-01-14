const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  ifsc: String,
  accNum: String,
});

const paymentSchema = new mongoose.Schema({
  _id: false,
  onlinePayment: Boolean,
  type: String,
  upiID: String,
  bankInfo: [bankSchema],
});

module.exports = paymentSchema;
