const express = require("express");
const Router = express.Router();
const Transaction = require("../model/transaction");
const verifyToken = require("../secureApi/verifyToken");
const validate_fetch_transactions = require("../validations/validate_fetchuser");
const User=require("../model/user")
Router.post("/", verifyToken, async (req, res) => {
  const isvalid = validate_fetch_transactions(req.body);
  if (isvalid != true)
    return res.status(400).json({ error: true, errMessage: isvalid });
  try {
    const user = await User.findById(req.body.user);
    if(!user)return res.status(403).json({error:false,errMessage:"Please login again to view transaction history"})
    // const loan = await Loan.find({ user: req.body.user });
    const transaction = await Transaction.find({
      $or: [{ sender: req.body.user }, { reciever: req.body.user }],
    })

      .populate("sender")
      // .select("first_name last_name");
    if (transaction.length < 1)
      return res.status(404).json({
        error: true,
        errMessage: "you have not made any transaction at the moment",
      });
      
    res
      .status(200)
      .json({
        error: false,
        message: transaction,
        user_balance:user.balance
      });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
