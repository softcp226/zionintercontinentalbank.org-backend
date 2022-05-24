const connectDB = require("./dbConnector");
const mongoose = require("mongoose");
connectDB("connected to pend-transaction database");
require("./user");
require("./transaction");
const pend_transactionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  debit_transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "transaction",
    // required: true,
  },
  credit_transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "transaction",
    // required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

const Pend_transaction = mongoose.model(
  "pend_transaction",
  pend_transactionSchema
);
module.exports = Pend_transaction;
