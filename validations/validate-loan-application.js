const Joi = require("joi");

const validate_loan_application = (req) => {
  const schema = Joi.object({
    user: Joi.string().max(1000).required(),
    // account_number: Joi.number().required().max(1000),
    loan_amount: Joi.string().required().max(1000),
    loan_type: Joi.string().required().max(1000),
    duration: Joi.string().required().max(1000),
    loan_details: Joi.string().required().max(1000),
  });

  const result = schema.validate({
    user: req.user,
    // account_number: req.account_number,
    loan_amount: req.loan_amount,
    loan_type: req.loan_type,
    duration: req.duration,
    loan_details: req.loan_details,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_loan_application;
