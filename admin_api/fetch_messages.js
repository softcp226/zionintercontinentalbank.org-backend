const express = require("express");
const Router = express.Router();
const verifyToken = require("../secure-admin-api/verifyToken");
const Message = require("../model/support");
const validate_admin = require("../validations/validate-admin-fetchuser");
Router.post("/", verifyToken, async (req, res) => {
  const admin_isvalid = validate_admin(req.body);
  if (admin_isvalid != true)
    return res.status(400).json({ error: true, errMessage: admin_isvalid });
  try {
    const message = await Message.find().populate("user");
    if (message.length < 1)
      return res.status(400).json({
        error: true,
        errMessage: "Sorry, no support message was found",
      });
    res.status(200).json({ error: false, message: message });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.post("/delete_message", verifyToken, async (req, res) => {
  const admin_isvalid = validate_admin(req.body);
  if (admin_isvalid != true)
    return res.status(400).json({ error: true, errMessage: admin_isvalid });
  try {
    const message = await Message.findByIdAndDelete(req.body.message);
    if (message.length < 1)
      return res.status(400).json({
        error: true,
        errMessage: "Sorry, can't delete the message you requested to delete",
      });
    res
      .status(200)
      .json({
        error: false,
        message: "you successfully deleted the selected message ",
      });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;
