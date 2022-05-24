const express = require("express");
const Router = express.Router();
const Loan = require("../model/loan");
const validate_loan_application = require("../validations/validate-loan-application");
let refrence_no = 0;
const verifyToken = require("../secureApi/verifyToken");
const User=require("../model/user")
Router.post("/", verifyToken, async (req, res) => {
  const isvalid = validate_loan_application(req.body);
  if (isvalid != true)
    return res.status(400).json({ error: true, errMessage: isvalid });

  try {

    const user=await User.findById(req.body.user);
    if(!user) res.status(400).json({ error: true, errMessage: "Please login again to apply for a loan" });
    const loan = await new Loan({
      user: req.body.user,
      refrence_no: `Refrence No#${++refrence_no}`,
      account_number: req.body.account_number,
      loan_amount: req.body.loan_amount,
      loan_type: req.body.loan_type,
      duration: req.body.duration,
      loan_details: req.body.loan_details,
      interest: `${Math.floor(Math.random() * 14) + 6}%`,
      monthly_returns: `${Math.floor(Math.random() * 3) + 2}%`,
      status: "pending",
    });
    const result = await loan.save();
    res.status(200).json({ error: false, message: result });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
