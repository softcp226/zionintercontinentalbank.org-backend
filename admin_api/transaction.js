const express = require("express");
const Router = express.Router();
const verifyToken = require("../secure-admin-api/verifyToken");
const User = require("../model/user");
const Admin = require("../model/admin");
const Transaction = require("../model/transaction");
const validate_transaction = require("../validations/validate_admin_transaction");
const admin_create_credit_transaction = require("../shape-model/admin-create-credit-transaction");
const admin_create_dedit_transaction = require("../shape-model/admin-create-debit-transaction");

Router.post("/", verifyToken, async (req, res) => {
  const transaction_request_isvalid = validate_transaction(req.body);
  if (transaction_request_isvalid != true)
    return res
      .status(400)
      .json({ error: true, errMessage: transaction_request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });

    const user = await User.findOne({
      account_number: req.body.account_number,
    });
    if (!user)
      return res.status(403).json({
        error: true,
        errMessage:
          "An unexpected error occured,Seems the user you were trying to credit/debit no longer exist",
      });
    if (user.is_suspended != false)
      return res.status(403).json({
        error: true,
        errMessage:
          "An error occured,the user you are trying to credit/debit is suspended",
      });
    if (user.is_active != true)
      return res.status(403).json({
        error: true,
        errMessage:
          "An error occured,the user you are trying to credit/debit isnot active",
      });

    if (req.body.credit != true) {
      if (user.balance < parseInt(req.body.amount))
        return res.status(403).json({
          error: true,
          errMessage:
            "Insufficient fund please you cant debit this user at the moment",
        });
      await admin_create_dedit_transaction(req, user._id);

      const debit_result = await user.set({
        balance: parseInt(user.balance) - parseInt(req.body.amount),
      });
      await debit_result.save();
      return res
        .status(200)
        .json({ error: false, message: "Success, you debited the user" });
    }

    await admin_create_credit_transaction(req, user._id);
    //  await admin_create_dedit_transaction(req, user._id);
    const credit_result = await user.set({
      balance: parseInt(user.balance) + parseInt(req.body.amount),
    });
    await credit_result.save();
    return res
      .status(200)
      .json({ error: false, message: "Success, you credited the user" });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
