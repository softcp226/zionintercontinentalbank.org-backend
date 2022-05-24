const express = require("express");
const Router = express.Router();
const verifyToken = require("../secure-admin-api/verifyToken");
// const User = require("../model/user");
const Admin = require("../model/admin");
const Loan = require("../model/loan");
const validate_delete_loan = require("../validations/validate_delete_loan");

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_delete_loan(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    // const user = await User.findById(req.body.user);
    // if (!user)
    //   return res.status(400).json({
    //     error: true,
    //     errMessage: "The user that requested for this loan was not found",
    //   });

    const loan = await Loan.findById(req.body.loan);
    if (!loan)
      return res.status(400).json({
        error: true,
        errMessage: "loan not found please refresh page and try again",
      });

    loan.set({ status: "failed" });
    await loan.save();

    // await user.set({
    //   balance: user.balance + parseInt(loan.loan_amount),
    // });
    // await user.save();
    res
      .status(200)
      .json({ error: false, message: "you successfully deleted a loan" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
