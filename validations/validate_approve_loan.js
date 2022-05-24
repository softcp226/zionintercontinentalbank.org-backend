const Joi = require("joi");
const validate_approve_loan = (req) => {
  const schema = Joi.object({
    admin: Joi.string().required().max(1000),
    user: Joi.string().required().max(1000),
    loan: Joi.string().required().max(1000),
    // loan_amount: Joi.string().required().max(1000),
  });
  const result = schema.validate({
    admin: req.admin,
    user: req.user,
    loan: req.loan,
    // loan_amount: req.loan_amount,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_approve_loan;
