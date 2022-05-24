const express = require("express");
const Router = express.Router();
const verifyToken = require("../secureApi/verifyToken");
const validateFetchUser = require("../validations/validate_fetchuser");
const User = require("../model/user");

Router.post("/", verifyToken, async (req, res) => {
  // console.log("norm req ip", req.ip);
  const isvalid = validateFetchUser(req.body);
  if (isvalid != true)
    return res.status(400).json({ error: true, errMessage: isvalid });
  try {
    const user = await User.findOne({ _id: req.body.user }).select("-password");
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "An unexpected error, please login and try again",
      });
    res.status(200).json({ error: false, message: user,ip_address:req.ip });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
