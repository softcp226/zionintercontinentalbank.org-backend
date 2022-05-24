const express = require("express");
const Router = express.Router();
const verifyToken = require("../secure-admin-api/verifyToken");
const Card = require("../model/card");
const Card_application = require("../model/card-application");
const Admin = require("../model/admin");
const User = require("../model/user");
const { create_mail_options, transporter } = require("../mailer/card_approval");
const validate_admin_issue_card = require("../validations/validate_admin_issue_card");

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_admin_issue_card(req.body);
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
        errMessage:
          "The user that requested for this credit card was not found",
      });

    const card = await new Card({
      user: req.body.user,
      card_number: req.body.card_number,
      card_type: req.body.card_type,
      card_expiry_date: req.body.card_expiry_date,
      card_cvv: req.body.card_cvv,
      card_pin: req.body.card_pin,
    });
    await card.save();
    await Card_application.findOneAndDelete({ user: req.body.user });

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
      .json({ error: false, message: "you successfully issued a card out" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
