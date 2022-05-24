const Joi = require("joi");

const validateUser = (user) => {
  const schema = Joi.object({
    first_name: Joi.string().required().min(3),
    last_name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    user_name: Joi.string().min(6).required(),
    DOB: Joi.string().required(),
    gender: Joi.string().required(),
    residential_address: Joi.string().required(),
    country: Joi.string().required(),
    zip_code: Joi.string().required(),
    name_and_address_of_employer: Joi.string().required(),
    beneficiary_legal_name: Joi.string().required(),
    beneficiary_occupation: Joi.string().required(),
    beneficiary_email_address: Joi.string().email().required(),
    beneficiary_mobile_number: Joi.string().required(),
    relationship_with_beneficiary: Joi.string().required(),
    beneficiary_age: Joi.string().required(),
    security_question_one: Joi.string().required(),
    security_answer_one: Joi.string().required(),
    password: Joi.string().min(8).required(),
    pin: Joi.string().min(4).required(),
    account_type: Joi.string().required(),
  });
  const result = schema.validate({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    user_name: user.user_name,
    DOB: user.DOB,
    gender: user.gender,
    residential_address: user.residential_address,
    country: user.country,
    zip_code: user.zip_code,
    name_and_address_of_employer: user.name_and_address_of_employer,
    beneficiary_legal_name: user.beneficiary_legal_name,
    beneficiary_occupation: user.beneficiary_occupation,
    beneficiary_email_address: user.beneficiary_email_address,
    beneficiary_mobile_number: user.beneficiary_mobile_number,
    relationship_with_beneficiary: user.relationship_with_beneficiary,
    beneficiary_age: user.beneficiary_age,
    security_question_one: user.security_question_one,
    security_answer_one: user.security_answer_one,
    password: user.password,
    pin: user.pin,
    account_type: user.account_type,
  });
  if (result.error) return result.error.message;
  return true;
};

// console.log(validateUser({first_name:"chidera", last_name:"emma", email:"email@gmail.com",phone:"+23467637737j"}));
module.exports = validateUser;
