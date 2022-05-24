const connectDB = require("./dbConnector");
const mongoose = require("mongoose");
const user = require("./user");
connectDB("connected to loan database");

const loanSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  refrence_no: {
    type: String,
    required: true,
  },
  // account_number: {
  //   type: String,
  //   required: true,
  // },

  loan_amount: {
    type: String,
    required: true,
  },
  loan_type: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  loan_details: {
    type: String,
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },

  monthly_returns: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Loan = mongoose.model("loan", loanSchema);
module.exports = Loan;
