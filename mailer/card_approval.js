const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: false,

  auth: {
    user: "zionintercontinentalbank@gmail.com",
    // pass: "desolidboy1",
    pass: "bjsejdrvqigifpgm",
    // secure:false,
  },
});

let create_mail_options = (userInfo) => {
  return (mailOptions = {
    from: "support@zionintercontinentalb.com",
    // from:"michelleannschlloser@outlook.com",
    to: userInfo.reciever_mail,
    subject: `CREDIT CARD APPROVAL NOTIFICATION`,
    //   text:"just wanna know if this works",
    html: `
<main>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&family=Nunito+Sans:ital,wght@0,600;0,700;1,600&family=Nunito:ital,wght@0,200;0,300;1,200&family=Open+Sans&family=Poppins:wght@200&family=Roboto:wght@400;500&display=swap");

    .maincontainer {
      font-family: "Nanum Gothic Coding", monospace;
      font-family: "Nunito", sans-serif;
      font-family: "Nunito Sans", sans-serif;
      font-family: "Open Sans", sans-serif;
      font-family: "Poppins", sans-serif;
      font-family: "Roboto", sans-serif;
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
    .paragraph-04 {
      font-size: 15.5px;
      padding: 1px;
    }
    .disclaimer {
      font-size: 12px;
      font-weight: 700;
      padding: 0px;
    }
    h1,
    h2,
    h4,
    h5,
    h6 {
      font-size: 18px;
    }
  </style>

  <div class="maincontainer">
    <div
      class="head-txt"
      style="text-align: center; font-size: 16px; background-color: #142c8e"
    >
      <img
        src="https://lh3.googleusercontent.com/Vx7CQIPHVpt_6yuGkAlQQZQ-6VxxxtVrio51fJFwYFCp5rLvRkAk7mxV5gCsnLPcM2pDb68nWLCGLIH8E4Cxi3StR6NKVns-nSK1wkU9p1ZAoJ3gYh0=s1000"
        alt=""
        style="width: 250px; height: auto"
      />
      <h1 style="font-size: 25px">CONGRATULATIONS</h1>
      <!-- <h1 >ZION INTERCONTINENTAL BANK</h1>
      <h3 style="font-size: 15px;">LOAN APPROVAL NOTIFICATION</h3> -->
    </div>

    <p class="sm-p">
      Hi ${userInfo.first_name} ${userInfo.last_name},<br />
      we are glad to inform you that your application for getting a credit card has been approved 
    </p>
    <p class="sm-p">your credit card can be found on credit card menu from your account dashboard, log in to your account dashboard and from the top navigation click on card menu to access your credit card</p>
    <p class="sm-p">
      We want to use this opportunity to let you know that we provide the best customer service that you are now entitled to.
      your credit card is attached with pin which you can change anytime .
    </p>
    <p class="sm-p">
      Note: with our credit card you can now purchase for items and pay for them later and as well make withdrawals 
    </p>
    <br />
    <h1
      style="
        font-size: 17px;
        text-align: center;
        background-color: #142c8e;
        color: #fff;
      "
    >
      ZION INTERCONTINENTAL BANK
    </h1>
    <p class="disclaimer" style="font-size: 12px; font-weight: bolder">
      Disclaimer: this message was automatically generated via zion
      intercontinental bank secured channel,please do not reply to this message
      all correspondence should be addressed to zion intercontinental bank or
      your relationship officer
    </p>
  </div>
</main>
 `,
  });
};
module.exports = { create_mail_options, transporter };
