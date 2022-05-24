const express = require("express");
const Router = express.Router();
const verifyToken = require("../secure-admin-api/verifyToken");
// const User = require("../model/user");
const Admin = require("../model/admin");
const Card_application = require("../model/card-application");
const validate_delete_card_application = require("../validations/validate_delete_card_application");

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_delete_card_application(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });

    const card_application = await Card_application.findByIdAndDelete(
      req.body.card_application
    );
    if (!card_application)
      return res.status(400).json({
        error: true,
        errMessage: "The card request you wanted to delete was not found",
      });

    res
      .status(200)
      .json({
        error: false,
        message: "you successfully deleted an application",
      });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
