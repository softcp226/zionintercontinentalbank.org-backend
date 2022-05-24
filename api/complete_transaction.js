const express = require("express");
const Router = express.Router();
const verify_token = require("../secureApi/verifyToken");
const validate_complete_transaction = require("../validations/validate_complete_transaction");
const User = require("../model/user");
const Transaction = require("../model/transaction");
const Pend_transaction = require("../model/pend-transaction");
const {
  credit_create_mail_options,
  credit_transporter,
} = require("../mailer/credit_alert");
const {
  debit_create_mail_options,
  debit_transporter,
} = require("../mailer/debit_alert");

Router.post("/", verify_token, async (req, res) => {
  const isvalid = validate_complete_transaction(req.body);
  if (isvalid != true)
    return res.status(400).json({ error: true, errMessage: isvalid });
  try {
    const pd_transaction = await Pend_transaction.findOne({
      user: req.body.user,
      otp: req.body.otp,
    });
    if (!pd_transaction) {
      let transaction_result = await Transaction.find({
        $or: [
          { sender: req.body.user, status: "pending" },
          { reciever: req.body.user, status: "pending" },
        ],
      });
      console.log(transaction_result);
      transaction_result.forEach(async (transaction) => {
        await transaction.set({ status: "failed" });
        transaction.save();
      });

      return res.status(400).json({
        error: true,
        errMessage:
          "Invalid 'OTP', please check if transaction was initiated and try again",
      });
    }

    const user = await User.findById(pd_transaction.user);
    if (!user)
      return res.status(403).json({
        error: true,
        errMessage: "Please login again to complete transaction",
      });
    if (user.is_suspended != false)
      return res.status(403).json({
        error: true,
        errMessage:
          "Your account has been temporarily suspended due to suspicious activities, if you think it was a mistake do not hesitate to contact the customer care",
      });

    let db_transaction_result = await Transaction.findById(
      pd_transaction.debit_transaction
    );

    let cd_transaction_result = await Transaction.findById(
      pd_transaction.credit_transaction
    );

    if (user.balance < db_transaction_result.amount)
      return res.status(400).json({
        error: true,
        errMessage:
          "Insufficient fund, please credit your account and try again",
      });
    if (db_transaction_result) {
      const db_result = await user.set({
        balance: user.balance - db_transaction_result.amount,
      });
      await db_result.save();
      let last_db_tr_r = await db_transaction_result.set({
        status: "success",
      });
      await last_db_tr_r.save();
    }
    let cd_user;
    if (cd_transaction_result) {
      cd_user = await User.findById(cd_transaction_result.reciever);
      if (!cd_user) {
        return res.status(400).json({
          error: true,
          errMessage:
            "An unexpected error occured seems the user you were trying to transfer fund to no longer exist",
        });
      }
      const cd_result = await cd_user.set({
        balance:
          parseInt(cd_user.balance) + parseInt(db_transaction_result.amount),
      });
      let last_cd_tr_r = await cd_transaction_result.set({
        status: "success",
      });
      await last_cd_tr_r.save();
      await cd_result.save();
    }
    await Pend_transaction.findByIdAndDelete(pd_transaction._id);
    let currentdate = new Date();
     let datetime = `${
       currentdate.getMonth() + 1
     }-${currentdate.getDate()}-${currentdate.getFullYear()}  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;
  
    let ref = Math.floor(Math.random() * 1000);

    console.log("cd email", cd_user);
    credit_transporter.sendMail(
      credit_create_mail_options({
        reciever_mail: cd_user ? cd_user.email : "",
        datetime: datetime || null,
        refrence_number: cd_transaction_result
          ? cd_transaction_result.refrence_number
          : "",
        description: cd_transaction_result
          ? cd_transaction_result.description
          : "",
        status: cd_transaction_result ? cd_transaction_result.status : "",
        amount: cd_transaction_result ? cd_transaction_result.credit : "",
        balance: cd_user ? cd_user.balance : "",
        sender: `${user.first_name} ${user.last_name}` || null,
      }),
      (err, info) => {
        if (err) return console.log("credit err", err.message);
        console.log("credit info", info);
      }
    );

    debit_transporter.sendMail(
      debit_create_mail_options({
        reciever_mail: user.email,
        datetime,
        refrence_number: db_transaction_result.refrence_number,
        description: db_transaction_result.description,
        status: db_transaction_result.status,
        amount: db_transaction_result.amount,
        balance: user.balance,
      }),
      (err, info) => {
        if (err) return console.log("debit err", err.message);
        console.log("debit info", info);
      }
    );
    res.status(200).json({ error: false, message: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
