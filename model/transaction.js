const connectDB = require("./dbConnector");
const mongoose = require("mongoose");
const { number } = require("joi");
connectDB("connected to transaction database");
require("./user");
const transactionSchema = mongoose.Schema({
  full_name: String,
  phone_number: String,
  country: String,

  address_line: String,
  zip_code: String,
  swift_code: String,
  bank_name: String,
  account_name: String,
  account_number: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    // required: true,
  },
  sender_02:String,
  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    // required: true,
  },
  transaction_date: {
    type: String,
    required: true,
    // default: Date.now(),
  },
  refrence_number: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  debit: {
    type: String,
    // required: true,
  },
  credit: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "success", "failed"],
  },
});

const Transaction = mongoose.model("transaction", transactionSchema);
module.exports = Transaction;
