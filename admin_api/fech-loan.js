const express = require("express");
const Router = express.Router();
const verifyToken = require("../secure-admin-api/verifyToken");
const Loan = require("../model/loan");
const validate_admin = require("../validations/validate-admin-fetchuser");
Router.post("/", verifyToken, async (req, res) => {
  const admin_isvalid = validate_admin(req.body);
  if (admin_isvalid != true)
    return res.status(400).json({ error: true, errMessage: admin_isvalid });
  try {
    const loan = await Loan.find({ status: "pending" }).populate("user");
    if (loan.length < 1)
      return res.status(400).json({
        error: true,
        errMessage: "Sorry, no pending loan request was found",
      });
    res.status(200).json({ error: false, message: loan });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.messages });
  }
});
module.exports = Router;
