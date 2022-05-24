const User = require("../model/user");
const hashPassword = require("../hash/hashPassword");

const create_new_user = async (req, passport) => {
  let password = await hashPassword(req.body.password);

  let currentdate = new Date();
  let datetime = `${
    currentdate.getMonth() + 1
  }-${currentdate.getDate()}-${currentdate.getFullYear()}  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

  let account_number = Math.floor(Math.random() * 11000000000);
  //  account_number.length <
  account_number = account_number.toString();
  if (account_number.length < 10) {
    account_number = `${account_number}2`;
  }
  const user = await new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    user_name: req.body.user_name,
    DOB: req.body.DOB,
    gender: req.body.gender,
    residential_address: req.body.residential_address,
    country: req.body.country,
    zip_code: req.body.zip_code,
    name_and_address_of_employer: req.body.name_and_address_of_employer,
    beneficiary_legal_name: req.body.beneficiary_legal_name,
    beneficiary_occupation: req.body.beneficiary_occupation,
    beneficiary_email_address: req.body.beneficiary_email_address,
    beneficiary_mobile_number: req.body.beneficiary_mobile_number,
    relationship_with_beneficiary: req.body.relationship_with_beneficiary,
    beneficiary_age: req.body.beneficiary_age,
    security_question_one: req.body.security_question_one,
    security_answer_one: req.body.security_answer_one,
    password,
    pin: req.body.pin,
    account_type: req.body.account_type,
    account_number,
    balance: 0,
    enrollment_date: datetime,
    passport,
    // is_active: false,
    // is_suspended: false,
  });

  const user_result = await user.save();

  return user_result;
};

module.exports = create_new_user;
