const express = require("express");
const Router = express.Router();
const verifyToken = require("../secure-admin-api/verifyToken");
const User = require("../model/user");
const Admin = require("../model/admin");
const Loan = require("../model/loan");
const validate_approve_loan = require("../validations/validate_approve_loan");
const { create_mail_options, transporter } = require("../mailer/loan_approval");

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_approve_loan(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "The user that requested for this loan was not found",
      });

    const loan = await Loan.findById(req.body.loan);
    if (!loan)
      return res.status(400).json({
        error: true,
        errMessage: "loan not found please refresh page and try again",
      });

    loan.set({ status: "success" });
    await loan.save();

    await user.set({
      balance: user.balance + parseInt(loan.loan_amount),
    });
    await user.save();

    transporter.sendMail(
      create_mail_options({
        reciever_mail: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info);
        // return res.status(400).json({
        //   error: true,
        //   errMessage: `Encounterd an error while trying to send an email to you: ${err.message}, try again`,
        // });
      }
    );

    res
      .status(200)
      .json({ error: false, message: "you successfully approved a loan" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;

