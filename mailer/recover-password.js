const nodemailer = require("nodemailer");

const smtpTransport = require("nodemailer-smtp-transport");

// const transporter = nodemailer.createTransport(
//   smtpTransport({
//     host: "mail.zionintercontinentalb.com",
//     secureConnection: false,
//     tls: {
//       rejectUnauthorized: false,
//     },
//     port: 587,
//     auth: {
//       user: "support@zionintercontinentalb.com",
//       pass: "zionintercontinentalbank1@1",
//     },
//   }),
// );

let transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: false,

  auth: {
    user: "zionintercontinentalbank1@gmail.com",
    // pass: "desolidboy1",
    pass: "izowrolqzvimocrm",
    // secure:false,
  },
});

let create_mail_options = (userInfo) => {
  return (mailOptions = {
    from: "support@zionintercontinentalb.org",
    // from:"michelleannschlloser@outlook.com",
    to: userInfo.reciever_mail,
    subject: `ACCOUNT RECOVERY`,
    //   text:"just wanna know if this works",
    html: `
  <main>
   
  <style>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&family=Nunito+Sans:ital,wght@0,600;0,700;1,600&family=Nunito:ital,wght@0,200;0,300;1,200&family=Open+Sans&family=Poppins:wght@200&family=Roboto:wght@400;500&display=swap');

.maincontainer{
font-family: 'Nanum Gothic Coding', monospace;
font-family: 'Nunito', sans-serif;
font-family: 'Nunito Sans', sans-serif;
font-family: 'Open Sans', sans-serif;
font-family: 'Poppins', sans-serif;
font-family: 'Roboto', sans-serif;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      font-weight: 100;
      line-height: 2.5;
    }
    .cordial {
      font-size: 16px;
    
    }
    .head-txt {
      text-align: center;
      background-color: #142c8e;
      font-size: 20px;
      color: #fff;
    }
    .paragraph-01,
    .paragraph-02 {
      font-size: 15.5px;
      padding: 1px;
    }
    .paragraph-03 {
      font-weight: 400;
      font-size: 15.5px;
      padding: 1px;
      color: green;
    }
    .paragraph-04{
      font-size: 15.5px;
      padding: 1px; 
    }
    .disclaimer{
        font-size: 12px;
        font-weight: 700;
        padding: 0px;
    }
    h1,h2,h4,h5,h6{
        font-size: 18px;
    }
  </style>

  <div class="maincontainer">
    <div class="head-txt">
    <h1 style="  font-size: 17px; text-align: center; background-color:  #142c8e; color: #fff;" >ZION INTERCONTINENTAL BANK</h1>
      <h3 style="font-size: 18px; text-align: center;">ACCOUNT RECOVERY</h3>
    </div>

    <p >
      Dear ${userInfo.first_name} ${userInfo.last_name},<br> your request to reset your account password has been recieved.<br>
 
 <br>     <a
        href="${userInfo.reset_link}"
        style="
          color: #fff;
          background-color: #0d6efd;
          border-color: #0d6efd;
          text-decoration: none;
          padding: 5px;
          border-radius: 2px;
        "
        >RESET PASSWORD</a
      >
       <br><br>
            or follow the link below to reset your password if the button does not work
    </p>

     <p >
     ${userInfo.reset_link}
     </p>

    <p >
      For your protection, if you did not request a new password  do not take any action regarding to this email
    </p>


    <br />
    <h1 style="  font-size: 17px; text-align: center; background-color:  #142c8e; color: #fff;" >ZION INTERCONTINENTAL BANK</h1>
    <p class="disclaimer" style="font-size: 12px; font-weight: bolder;">
      Disclaimer: this message was automatically generated via zion intercontinental bank secured channel,please do not reply to this message
      all correspondence should be addressed to zion intercontinental bank or
      your relationship officer
    </p>
  </div>
</main>
 `,
  });
};
module.exports = { create_mail_options, transporter };
// transporter.sendMail(mailOptions, (err, info) => {
//   if (err)
//     return res
//       .status(400)
//       .json({ error: true, errMessage: `an error occured: ${err.message}` });
//   // console.log(info)
//   return res.status(200).json({ error: false, message: "message sent" });
//   // console.log("message sent",info)
// });

// //   if (err)
// //     return { error: true, errMessage: `an error occured: ${err.message}` };
// //   // console.log(info)
// //   return { error: false, message: "message sent" };
// // });
// };
