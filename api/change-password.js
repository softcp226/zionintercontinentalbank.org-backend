const express = require("express");
const Router = express.Router();
const verifyToken = require("../secureApi/verifyToken");
const hashPassword = require("../hash/hashPassword");
const validate_change_password = require("../validations/validate_change_password");
const User = require("../model/user");
Router.post("/", verifyToken, async (req, res) => {
  const pwd_in_goodshape = validate_change_password(req.body);
  if (pwd_in_goodshape != true)
    return res.status(400).json({ error: true, errMessage: pwd_in_goodshape });
  try {
    const user = await User.findOne({ _id: req.body.user });
    if (!user)
      return res.status(404).json({
        error: true,
        errMessage: "Please login again to change your password",
      });

    const password = await hashPassword(req.body.password);
    user.set({
      password: password,
      pin: req.body.pin,
    });
    const result = await user.save();
    res.status(200).json({
      error: false,
      message:
        "congratulations, you successfully updated your password and pin",
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
