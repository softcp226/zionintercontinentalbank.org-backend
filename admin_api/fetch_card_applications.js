const express = require("express");
const Router = express.Router();
const verifyToken = require("../secure-admin-api/verifyToken");
const Card_application = require("../model/card-application");
const Admin = require("../model/admin");
const validate_admin_fetch_card_application = require("../validations/validate-admin-fetchuser");
Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_admin_fetch_card_application(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    const card_applications = await Card_application.find().populate("user");
    if (card_applications.length < 1)
      return res
        .status(400)
        .json({
          error: true,
          errMessage: "No user has applied for a card at the moment",
        });
    res.status(200).json({ error: false, message: card_applications });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
