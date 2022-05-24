const express = require("express");
const Router = express.Router();
const verifyToken = require("../secureApi/verifyToken");
const Card_request = require("../model/card-application");
const validate_card_application = require("../validations/validate_card_application");
const User = require("../model/user");
const Card = require("../model/card");

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_card_application(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });
  try {
    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "Please login again to apply for card",
      });

    const card2 = await Card.findOne({ user: req.body.user });
    if (card2)
      return res.status(400).json({
        error: true,
        errMessage: "You have been issued a card, check your credit card menu",
      });

    const card = await new Card_request({
      user: req.body.user,
      account_number: req.body.account_number,
      card_type: req.body.card_type,
      card_pin: req.body.card_pin,
    });
    await card.save();
    res.status(200).json({ error: false, message: "Success" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
