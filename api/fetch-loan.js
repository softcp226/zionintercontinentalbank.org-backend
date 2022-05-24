const express = require("express");
const Router = express.Router();
const verifyToken = require("../secureApi/verifyToken");
const Loan = require("../model/loan");
const verify_user = require("../validations/validate_fetchuser");
Router.post("/", verifyToken, async (req, res) => {
  const user_isvalid = verify_user(req.body);
  if (user_isvalid != true)
    return res.status(400).json({ error: true, errMessage: user_isvalid });
  try {
    const loan = await Loan.find({ user: req.body.user });
    if (loan.length < 1)
      return res.status(400).json({
        error: true,
        errMessage: "Sorry, you have not applied for any loan at the moment",
      });
    res.status(200).json({ error: false, message: loan });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.messages });
  }
});
module.exports = Router;
