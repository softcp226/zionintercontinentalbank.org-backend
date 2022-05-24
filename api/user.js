const expres = require("express");
const Router = expres.Router();
const {
  create_mail_options,
  transporter,
} = require("../mailer/reg_success_mail");
const create_new_user = require("../shape-model/create-new-user");
const validateUser = require("../validations/validateUser");
const User = require("../model/user");
const cloudinary = require("../file_handler/cloudinary");
const upload = require("../file_handler/multer");
const genToken = require("../secureApi/genToken_01");

const fs = require("fs");

Router.post("/", upload.any("passport"), async (req, res) => {
  const isvalid = validateUser(req.body);
  if (isvalid != true)
    return res.status(400).json({ error: true, errMessage: isvalid });

  try {
    const user_exist = await User.findOne({ user_name: req.body.user_name });
    if (user_exist)
      return res.status(400).json({
        error: true,
        errMessage:
          "The USER NAME you enterd is already associated with another account please try a diffrent one",
      });

    // console.log(req.files);
    const uploader = async (path) => await cloudinary.uploads(path, "passport");
    let passport_url;
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      passport_url = newPath;
      fs.unlinkSync(path);
    }
    console.log(passport_url);
    if (passport_url.error)
      return res.status(400).json({
        error: true,
        errMessage:
          "Something went wrong in the server while trying to upload your passport, please check passport and try again",
      });

    let user_result = await create_new_user(req, passport_url.url);
    const token_01 = genToken(user_result._id);
    console.log(user_result);
    transporter.sendMail(
      create_mail_options({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        account_type: req.body.account_type,
        account_number: user_result.account_number,
        reciever:user_result.email,
        account_pin: req.body.pin,
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info)
        // return res.status(400).json({
        //   error: true,
        //   errMessage: `Encounterd an error while trying to send an email to you: ${err.message}, try again`,
        // });
      }
    );

    return res.status(200).json({
      error: false,
      message: { token_01, is_active: user_result.is_active },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

module.exports = Router;
