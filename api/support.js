const express = require("express");
const Router = express.Router();
const verifyToken = require("../secureApi/verifyToken");
const validate_support = require("../validations/validate_support");
const Message = require("../model/support");
Router.post("/", verifyToken, async (req, res) => {
  const support_isvalid = validate_support(req.body);
  if (support_isvalid != true)
    return res.status(400).json({ error: true, errMessage: support_isvalid });
  try {
    const message = await new Message({
      user: req.body.user,
      message: req.body.message,
    });
    const result = await message.save();
    res.status(200).json({ error: false, message:"message sent" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
