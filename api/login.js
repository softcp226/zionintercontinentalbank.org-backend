const express = require("express");
const Router = express.Router();
const validate_login = require("../validations/validateLogin");
const genToken_01 = require("../secureApi/genToken_01");
const genToken = require("../secureApi/genToken");
const verifyToken_01 = require("../secureApi/verifyToken_01");
const validate_checkpin = require("../validations/validate_checkpin");
const compare_password = require("../hash/compare_password");
const User = require("../model/user");

Router.post("/", async (req, res) => {
  const isvalid = validate_login(req.body);
  if (isvalid != true)
    return res.status(400).json({ error: true, errMessage: isvalid });

  try {
    const user = await User.findOne({ user_name: req.body.user_name });
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "invalid user name or password ",
      });
    const password_match = await compare_password(
      req.body.password,
      user.password
    );
    if (!password_match)
      return res.status(400).json({
        error: true,
        errMessage: "invalid user name or password ",
      });
    const token_01 = genToken_01(user._id);
    res.status(200).json({
      error: false,
      message: { token_01, user: user._id, is_active: user.is_active },
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.post("/checkpin", verifyToken_01, async (req, res) => {
  const isvalid = validate_checkpin(req.body);
  // console.log(!isvalid);
  if (isvalid != true)
    return res.status(400).json({ error: true, errMessage: isvalid });

  try {
    const user = await User.findOne({ _id: req.body.user, pin: req.body.pin });
    if (!user)
      return res.status(404).json({
        error: true,
        errMessage: "Invalid pin,please check pin and try again",
      });

    const token = genToken(user._id);
    res.status(200).json({
      error: false,
      message: {
        token,
        user: user._id,
        is_active: user.is_active,
        deactivated_by_admin: user.deactivated_by_admin,
      },
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;
