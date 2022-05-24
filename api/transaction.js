//will ork in a way that transaction will updated to either pending failed or success
const express = require("express");
const Router = express.Router();
const verify_token = require("../secureApi/verifyToken");
const validate_transaction = require("../validations/validate_transaction");
const User = require("../model/user");
const create_credit_transaction = require("../shape-model/create-credit-transaction");
const create_debit_transaction = require("../shape-model/create-debit-transaction");
const create_pend_transaction = require("../shape-model/create_pend_transaction");
const { create_mail_options, transporter } = require("../mailer/otp_message");

Router.post("/", verify_token, async (req, res) => {
  const transaction_isvalid = validate_transaction(req.body);
  if (transaction_isvalid != true)
    return res
      .status(400)
      .json({ error: true, errMessage: transaction_isvalid });

  try {
    let sender = await User.findById(req.body.user);
    if (!sender)
      return res.status(400).json({
        error: true,
        errMessage: "please login again to transfer fund",
      });
    if (sender.balance < parseInt(req.body.amount))
      return res.status(400).json({
        error: true, 
        errMessage:
          "Insufficient fund, please credit your account and try again",
      });
    const reciever = await User.findOne({
      account_number: req.body.account_number,
    });

    if (!reciever) {
      const debit_transaction_result = await create_debit_transaction(req);
      let otp = Math.floor(Math.random() * 11000);
      let pend_transaction_result = await create_pend_transaction({
        user: req.body.user,
        debit_transaction: debit_transaction_result._id,
        // credit_transaction: null,
        otp,
      });
      if (pend_transaction_result.error)
        return res.status(400).json({
          error: true,
          errMessage: pend_transaction_result.errMessage,
        });
      transporter.sendMail(
        create_mail_options({
          first_name: sender.first_name,
          last_name: sender.last_name,
          otp,
          reciever_mail: sender.email,
        }),
        (err, info) => {
          if (err) return console.log(err.message);
          console.log(info);
        }
      );
     return res.status(200).json({ error: false, message: debit_transaction_result });
    } else {
      if (reciever._id == req.body.user)
        return res.status(403).json({
          error: true,
          errMessage: "invalid request, you can't transfer fund to yourself",
        });
      let sender_02=`${sender.first_name} ${sender.last_name}`
      const credit_transaction_result = await  create_credit_transaction(
        req,
        reciever._id,
        sender_02
      );
      const debit_transaction_result = await create_debit_transaction(req);

      let otp = Math.floor(Math.random() * 10000);
      let pend_transaction_result =await create_pend_transaction({
        user: req.body.user,
        debit_transaction: debit_transaction_result._id,
        credit_transaction: credit_transaction_result._id,
        otp,
      });

       if (pend_transaction_result.error)
         return res.status(400).json({
           error: true,
           errMessage: pend_transaction_result.errMessage,
         });
         
      transporter.sendMail(
        create_mail_options({
          first_name: sender.first_name,
          last_name: sender.last_name,
          otp,
          reciever_mail: sender.email,
        }),
        (err, info) => {
          if (err) return console.log(err.message);
          console.log(info);
        }
      );
      res.status(200).json({ error: false, message: debit_transaction_result });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
