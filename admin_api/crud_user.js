const express = require("express");
const Router = express.Router();
const verifyToken = require("../secure-admin-api/verifyToken");
const User = require("../model/user");
const Admin = require("../model/admin");
const validate_request = require("../validations/validate_admin_user_request");

Router.post("/activate_user", verifyToken, async (req, res) => {
  const request_is_valid = validate_request(req.body);
  if (request_is_valid != true)
    return res.status(400).json({ error: true, errMessage: request_is_valid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });

    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(403).json({
        error: true,
        errMessage:
          "OOps seems the user no longer exist please refresh page and try again",
      });
    const user_result = await user.set({
      is_active: user.is_active != true ? true : false,
      deactivated_by_admin: user.is_active == true ? true : false,
    });
    console.log(user.is_active);
    await user_result.save();
    res.status(200).json({
      error: false,
      message:
        user_result.is_active != true
          ? "You Successfully deactivated the user"
          : "You Successfully activated the user",
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.post("/suspend_user", verifyToken, async (req, res) => {
  const request_is_valid = validate_request(req.body);
  if (request_is_valid != true)
    return res.status(400).json({ error: true, errMessage: request_is_valid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });

    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(403).json({
        error: true,
        errMessage:
          "OOps seems the user no longer exist please refresh page and try again",
      });
    const user_result = await user.set({
      is_suspended: user.is_suspended != true ? true : false,
    });
    await user_result.save();
    res.status(200).json({
      error: false,
      message:
        user_result.is_suspended != true
          ? "You Successfully unsuspended the user"
          : "You Successfully suspended the user",
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.post("/delete_user", verifyToken, async (req, res) => {
  const request_is_valid = validate_request(req.body);
  if (request_is_valid != true)
    return res.status(400).json({ error: true, errMessage: request_is_valid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });

    await User.findByIdAndDelete(req.body.user);
    res
      .status(200)
      .json({ error: false, message: "You successfully deleted a user" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;
