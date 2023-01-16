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
    to: userInfo.reciever,
    subject: `Account Registration Notification`,
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
      <h1 style=" text-align: center; font-size: 16px; color: #142c8e;">ZION INTERCONTINENTAL BANK</h1>
      <h3 style="font-size: 15px;">NEW ACCOUNT NOTIFICATION</h3>
    </div>

    <p class="sm-p">
      Dear ${userInfo.first_name} ${userInfo.last_name}, Thank you so much for allowing us to help you
      with your ${userInfo.account_type} opening. We are committed to providing our
      customers with the highest level of service and the most innovative
      banking products that are possible. We are very glad you chose us as your
      financial institution and hope you will take advantage of our wide variety
      of savings, investment and loan products which are designed to meet your
      needs
    </p>
    <p class="sm-p">
      For more detailed informations about our loans,Credit Cards or other
      financial services, please contact our customer support or the
      relationship officer that would be assigned to you shortly
    </p>

    <div class="paragraph-03">
      <h4 style="color: #142c8e">ACCOUNT DETAILS</h4>
      <p>Account Number: ${userInfo.account_number}</p>
      <p>Account Type: ${userInfo.account_type}</p>
      <p>Account Pin:  ${userInfo.account_pin}</p>
      <p>Account Password:**** (used for registration)</p>
    </div class="paragraph-04">
    <h5 style="color: red">STATUS:     INACTIVE</h5>
    <p class="sm-p">
      incase you have any questions do not hesitate to contact us and we will
      reach out to you as soon as possible
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

transporter.sendMail(
  create_mail_options({
    first_name: "Justin",
    last_name: "Bieber",
    account_type: "savings",
    account_number: "73694648574",
    reciever: "chideranwofe02@gmail.com",
    account_pin: "1000",
  }),
  (err, info) => {
    if (err) return console.log(err.message);
    console.log(info);
    // return res.status(400).json({
    //   error: true,
    //   errMessage: `Encounterd an error while trying to send an email to you: ${err.message}, try again`,
    // });
  },
);
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
